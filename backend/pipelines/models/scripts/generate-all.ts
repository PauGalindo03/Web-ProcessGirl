/* ------------------------------
	1. Genera los schemas zod
    - generate-zod.ts -> validation/zod-schemas.ts
  2. Genera los validadores
    - generate-validators.js -> validation/validators.ts
  3. Crear las interfaces del frontend
	------------------------------ */
import fs from "fs";
import path from "path";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

if (process.env.NODE_ENV === "production") process.exit(0);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  // 1) Generar esquemas
  await import("./generate-zod");

  const vDir = resolve(__dirname, "../validation");
  fs.mkdirSync(vDir, { recursive: true });
  const baseSrc = fs.readFileSync(path.join(vDir, "zod-schemas.ts"), "utf-8");
  const customSrc = fs.readFileSync(
    path.join(vDir, "custom-refinements.ts"),
    "utf-8"
  );

  // 2) Extraer nombres
  // 1) Extraemos todos los matches como (string|undefined)[]
  const rawBase = Array.from(
    baseSrc.matchAll(/export\s+const\s+(\w+SchemaBase)/g),
    (m) => m[1]
  );

  // 2) Filtramos los undefined y normalizamos
  const baseMatches = rawBase
    .filter((s): s is string => typeof s === "string")
    .map((s) => s.replace(/Base$/, ""));

  // 3) Hacemos lo mismo para los custom
  const rawCustom = Array.from(
    customSrc.matchAll(/export\s+const\s+(\w+Schema)(?!Base)/g),
    (m) => m[1]
  );

  const customMatches = rawCustom.filter(
    (s): s is string => typeof s === "string"
  );

  // Ahora baseMatches y customMatches son string[] 100% libres de undefined

  // 3) Agrupar por archivo de origen
  const exportsMap: Record<string, Set<string>> = {};
  const handled = new Set<string>();

  function addToMap(fromFile: string, name: string) {
    if (!exportsMap[fromFile]) exportsMap[fromFile] = new Set();
    exportsMap[fromFile].add(name);
  }

  // Para cada schema base decidimos custom vs fallback
  for (const alias of baseMatches) {
    const isCustom = customMatches.includes(alias);
    const fromFile = isCustom ? "./custom-refinements" : "./zod-schemas";
    addToMap(fromFile, alias);
    handled.add(alias);
  }

  // Añadir refinamientos sueltos que no vinieron de un baseSchema
  for (const name of customMatches) {
    if (!handled.has(name)) {
      addToMap("./custom-refinements", name);
    }
  }

  // 4) Generar barrel agrupado
  const barrelLines: string[] = [
    "// Este fichero se regenera automáticamente por generate-all.ts",
    "",
  ];

  for (const [fromFile, namesSet] of Object.entries(exportsMap)) {
    const names = Array.from(namesSet).sort();

    if (fromFile === "./zod-schemas") {
      // Renombramos XSchemaBase como XSchema
      const exportsList = names.map((n) => `${n}Base as ${n}`).join(", ");
      barrelLines.push(`export { ${exportsList} } from "${fromFile}";`);
    } else {
      // En custom-refinements ya vienen en formato XSchema
      barrelLines.push(`export { ${names.join(", ")} } from "${fromFile}";`);
    }
  }

  // 5) Escribir all-schemas.ts
  fs.writeFileSync(
    path.join(vDir, "all-schemas.ts"),
    barrelLines.join("\n") + "\n",
    "utf-8"
  );

  // … sigue con generate-endpoint-response-types.js y generate-transformers.js
  const timestamp = Date.now();
  await import(`./generate-endpoint-response-types.ts?update=${timestamp}`);
  await import(`./generate-transformers.ts?update=${timestamp}`);

  await import(`./generate-endpoint-interfaces.ts?update=${timestamp}`);

  console.log("🎉 Todos los scripts han sido procesados.");
})();

/**
 * En lugar de importar directamente de zod-schemas.ts o de custom-refinements.ts:
 * import {
  categoriaSchemaBase,
  configuracionSchemaBase,
  coloresSchema,
  paginaInicioSchema,
  // …etc
} from "ruta/a/validation/all-schemas";

 */
