// backend/scripts/generate-zod.ts
import {
  Project,
  Node,
  SyntaxKind,
  ObjectLiteralExpression,
  PropertyAssignment,
  Expression,
} from "ts-morph";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helpers
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const lowerCamel = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

// Extrae "productoDigital" de "producto-digital.model.ts"
function modelNameFromFile(filePath: string): string {
  const base = path
    .basename(filePath, path.extname(filePath))
    .replace(/(?:model|schema)$/i, "");
  return base
    .split(/[-_]/)
    .map((seg, i) => (i === 0 ? seg : capitalize(seg)))
    .join("");
}

// Captura de errores
process.on("uncaughtException", (err) => {
  console.error(err);
  process.exit(1);
});
process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

// 1) Init ts-morph
const project = new Project({
  /* tsConfigFilePath: ... */
});
project.addSourceFilesAtPaths(path.resolve(__dirname, "../../models/**/*.ts"));

const zodImports = `import { z } from "zod";\n`;
const zodSchemas: string[] = [];

// 2) Recorrer cada archivo
for (const sf of project.getSourceFiles()) {
  const fileBasedName = modelNameFromFile(sf.getFilePath());

  // 3) Filtrar schemas de mongoose
  const varDecls = sf.getVariableDeclarations().filter((v) => {
    const init = v.getInitializer();
    return (
      Node.isNewExpression(init) &&
      init.getExpression().getText().includes("mongoose.Schema")
    );
  });

  // 3.1) Construir nameMap
  const nameMap: Record<string, string> = {};
  for (const v of varDecls) {
    const rawName = v.getName().replace(/Schema$/, "");
    const modelName =
      varDecls.length === 1 ? fileBasedName : lowerCamel(rawName);
    nameMap[rawName] = modelName;
  }

  // 4) Por cada declaration genera Zod
  for (const decl of varDecls) {
    let modelName = decl.getName().replace(/Schema$/, "");
    if (varDecls.length === 1) {
      modelName = fileBasedName;
    } else {
      modelName = lowerCamel(modelName);
    }

    const init = decl.getInitializer();
    if (!Node.isNewExpression(init)) continue;
    const [firstArg] = init.getArguments();
    if (!Node.isObjectLiteralExpression(firstArg)) continue;
    const objLit = firstArg as ObjectLiteralExpression;
    const fields: string[] = [];

    // 5) Iterar propiedades
    for (const member of objLit.getProperties()) {
      if (!Node.isPropertyAssignment(member)) continue;
      const key = member.getName();
      let val = member.getInitializer();
      let isArrayField = false;

      // 5.1) Unwrap arrays de objetos
      if (Node.isArrayLiteralExpression(val)) {
        const [firstElem] = val.getElements();
        if (Node.isObjectLiteralExpression(firstElem)) {
          isArrayField = true;
          val = firstElem;
        }
      }
      if (!val) continue;

      let zodType = "z.any()";
      let isRequired = true;
      let defaultValue: string | undefined;
      let enumValues: string[] | undefined;

      // 5.2) Caso compuesto con type, required, default, enum, ref
      if (Node.isObjectLiteralExpression(val)) {
        const propObj = val;

        // type
        const typeAssign = propObj
          .getProperty("type")
          ?.asKind(SyntaxKind.PropertyAssignment) as
          | PropertyAssignment
          | undefined;
        const typeInit = typeAssign?.getInitializer();
        if (typeInit && Node.isArrayLiteralExpression(typeInit)) {
          const first = typeInit.getElements()[0]!.getText();
          if (first.includes("String")) zodType = "z.array(z.string())";
          else if (first.includes("Number")) zodType = "z.array(z.number())";
          else if (first.includes("Boolean")) zodType = "z.array(z.boolean())";
          else zodType = "z.array(z.any())";
        } else if (typeInit) {
          const txt = typeInit.getText();
          if (txt.includes("String")) zodType = "z.string()";
          else if (txt.includes("Number")) zodType = "z.number()";
          else if (txt.includes("Boolean")) zodType = "z.boolean()";
          else if (txt.includes("ObjectId")) zodType = "z.string()";
        }

        // required
        const reqAssign = propObj
          .getProperty("required")
          ?.asKind(SyntaxKind.PropertyAssignment) as
          | PropertyAssignment
          | undefined;
        if (reqAssign?.getInitializer()?.getText() === "false") {
          isRequired = false;
        }

        // default
        const defAssign = propObj
          .getProperty("default")
          ?.asKind(SyntaxKind.PropertyAssignment) as
          | PropertyAssignment
          | undefined;
        if (defAssign) {
          const defInit = defAssign.getInitializer();
          if (defInit && Node.isArrayLiteralExpression(defInit)) {
            const lit = defInit.getText();
            defaultValue = lit;
            isRequired = false;
            if (zodType === "z.string()") zodType = "z.array(z.string())";
            else if (zodType === "z.number()") zodType = "z.array(z.number())";
          } else {
            defaultValue = defInit?.getText();
          }
        }

        // enum
        const enumAssign = propObj
          .getProperty("enum")
          ?.asKind(SyntaxKind.PropertyAssignment) as
          | PropertyAssignment
          | undefined;
        if (enumAssign) {
          const enumInit = enumAssign.getInitializer();
          if (enumInit && Node.isArrayLiteralExpression(enumInit)) {
            enumValues = enumInit
              .getElements()
              .map((e: Expression) => e.getText());
          }
        }

        // ref  <–––– aquí usamos nameMap
        const refAssign = propObj
          .getProperty("ref")
          ?.asKind(SyntaxKind.PropertyAssignment) as
          | PropertyAssignment
          | undefined;
        const rawRef = refAssign
          ?.getInitializer()
          ?.getText()
          .replace(/['"]/g, "");
        if (rawRef) {
          const mapped = nameMap[rawRef] ?? lowerCamel(rawRef);
          const refKey = mapped;
          let finalRefType = isArrayField
            ? `z.array(z.lazy(() => ${refKey}SchemaBase))`
            : `z.lazy(() => ${refKey}SchemaBase)`;

          if (defaultValue !== undefined) {
            const dv = defaultValue.trim();
            finalRefType +=
              dv === "null" ? `.nullable().default(null)` : `.default(${dv})`;
          }
          if (!isRequired) {
            finalRefType += `.optional()`;
          }

          fields.push(`  ${key}: ${finalRefType},`);
          console.log(`🔗 Referencia detectada: ${key} → ${finalRefType}`);
          continue;
        }
      }

      // 5.3) Caso simple (String, Number, Boolean, ObjectId)
      else if (Node.isIdentifier(val) || Node.isPropertyAccessExpression(val)) {
        const txt = val.getText();
        if (txt.includes("String")) zodType = "z.string()";
        else if (txt.includes("Number")) zodType = "z.number()";
        else if (txt.includes("Boolean")) zodType = "z.boolean()";
        else if (txt.includes("ObjectId")) zodType = "z.string()";
      }

      // 6) Montar finalType para no-ref
      let finalType = enumValues
        ? `z.enum([${enumValues.join(", ")}])`
        : zodType;
      if (defaultValue !== undefined) {
        const dv = defaultValue.trim();
        finalType +=
          dv === "null" ? `.nullable().default(null)` : `.default(${dv})`;
      }
      if (!isRequired) {
        finalType += `.optional()`;
      }
      if (isArrayField) {
        finalType = `z.array(${finalType})`;
      }

      fields.push(`  ${key}: ${finalType},`);
      console.log(`🧬 Campo detectado: ${key} → ${finalType}`);
    }

    // 7) Armar export + type
    // después: const y type comparten nombre
    const typeName = capitalize(modelName);
    const schemaVar = `${lowerCamel(modelName)}SchemaBase`;

    // 1) Genera solo el esquema (sin anotación circular)
    zodSchemas.push(
      `export const ${schemaVar} = z.object({\n${fields.join("\n")}\n});`
    );

    // 2) Después creas el alias recursivo permitido
    zodSchemas.push(`export type ${typeName} = z.infer<typeof ${schemaVar}>;`);
  }
}

// 8) Escribir file
const out = path.resolve(__dirname, "../validation/zod-schemas.ts");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, zodImports + "\n" + zodSchemas.join("\n\n"), "utf-8");
console.log(`✅ Zod schemas escritos en ${out}`);
