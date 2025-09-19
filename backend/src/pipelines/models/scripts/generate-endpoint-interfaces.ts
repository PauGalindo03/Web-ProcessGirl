// backend/scripts/generate-endpoint-interfaces.ts
import * as allSchemas from "../../../src/validation/all-schemas.js";
console.log(allSchemas);
import { z, ZodObject } from "zod";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

// Si necesitas propiedades extra en el Procesado, defínelas aquí:
const extraFields: Record<string, Record<string, string>> = {
  // Ejemplo:
  // Configuracion: { fullUrl: "string" },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Convierte un tipo Zod en su string TypeScript
 */
function getZodShape(schema: ZodObject<any>): Record<string, any> {
  const def = (schema as any)._def;
  return typeof def.shape === "function" ? def.shape() : def.shape;
}

function unwrap(schema: any): any {
  while (
    schema instanceof z.ZodOptional ||
    schema instanceof z.ZodNullable ||
    schema instanceof z.ZodDefault
  ) {
    schema = schema._def.innerType;
  }
  return schema;
}

function zodToTs(schema: any): string {
  schema = unwrap(schema);

  if (schema instanceof z.ZodString) return "string";
  if (schema instanceof z.ZodNumber) return "number";
  if (schema instanceof z.ZodBoolean) return "boolean";
  if (schema instanceof z.ZodDate) return "Date";
  if (schema instanceof z.ZodLiteral) return JSON.stringify(schema.value);
  if (schema instanceof z.ZodEnum)
    return schema.options.map((opt) => JSON.stringify(opt)).join(" | ");
  if ((schema as any)._def.typeName === "ZodNativeEnum") {
    return Object.values((schema as any)._def.values)
      .map((v: any) => JSON.stringify(v))
      .join(" | ");
  }

  if (schema instanceof z.ZodArray) {
    return `${zodToTs(schema.element)}[]`;
  }

  if (schema instanceof z.ZodUnion) {
    return schema.options.map((opt) => zodToTs(opt)).join(" | ");
  }

  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const fields = Object.entries(shape)
      .map(([key, val]) => `${key}: ${zodToTs(val)}`)
      .join("; ");
    return `{ ${fields} }`;
  }

  if (schema instanceof z.ZodRecord) {
    return `{ [key: string]: ${zodToTs(schema.valueType)} }`;
  }

  if (schema._def?.typeName === "ZodTuple") {
  const items = schema._def.items;
  return `[${items.map(zodToTs).join(", ")}]`;
}


  if (schema._def?.typeName === "ZodEffects") {
  schema = schema._def?.schema;
}


  if (schema instanceof z.ZodAny) return "unknown";

  return "unknown";
}

/**
 * 1) Construye frontendInterfaces a partir de todos los XSchema exportados
 */
const frontendInterfaces = Object.entries(allSchemas)
  .filter(([exportName]) => exportName.endsWith("Schema"))
  .reduce((out, [schemaName, schema]) => {
    const base = schemaName.replace(/Schema$/, "");
    const ifaceName = `${base}Procesado`;
    console.log(`SCHEMANAME: ${schemaName}:`, schema.constructor.name);

    const def = schema as ZodObject<any>;
    const shape = getZodShape(def);

    const fields: Record<string, string> = {};
    for (const [prop, zodType] of Object.entries(shape)) {
      fields[prop] = zodToTs(zodType);
      console.log(`🔍 ${schemaName}.${prop}:`, zodType?.constructor?.name);
    }

    out[ifaceName] = {
      ...fields,
      ...(extraFields[base] || {}),
    };

    console.log(`✅ Campos para ${ifaceName}:`, fields);
    return out;
  }, {} as Record<string, Record<string, string>>);

/**
 * 2) Escribe el archivo interfaces_frontend.ts
 */
function writeInterfacesFile() {
  const outDir = path.resolve(__dirname, "../../../frontend/src/lib/types");
  if (!fs.existsSync(outDir)) {
    throw new Error(`Output directory does not exist: ${outDir}`);
  }

  const outFile = path.join(outDir, "interfaces_frontend.ts");
  const header = `// Auto-generated ${new Date().toISOString()}\n\n`;

  const body = Object.entries(frontendInterfaces)
    .map(([iface, fields]) => {
      const props = Object.entries(fields)
        .map(([key, type]) => `  ${key}: ${type};`)
        .join("\n");
      Object.entries(fields).forEach(([key, type]) => {
        console.log(`📝 ${iface}.${key}: ${type}`);
      });

      return [`export interface ${iface} {`, props, `}\n`].join("\n");
    })
    .join("\n");

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, header + body, "utf8");
  console.log(
    `✅ ${
      Object.keys(frontendInterfaces).length
    } interfaces escritas en ${outFile}`
  );
}

// 3) Ejecutar generación
writeInterfacesFile();