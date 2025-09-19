import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import * as allSchemas from "../../../validation/all-schemas.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 1. Detecta todos los schemas
const schemaNames = Object.keys(allSchemas)
  .filter((key) => key.endsWith("Schema"))
  .map((key) => key.replace(/Schema$/, ""));

// 2. Construye el contenido del archivo
const header = `// Auto-generated ${new Date().toISOString()}\n\n`;
const imports = `import type {\n  ${schemaNames
  .map((name) => `${name}Procesado`)
  .join(",\n  ")}\n} from "./interfaces_frontend";\n\n`;

const body = `export type EndpointResponseTypes = {\n${schemaNames
  .map((name) => {
    const plural = ["faq", "categoria", "productoDigital", "paquetePD", "testimonios", "contacto"];
    const type = plural.includes(name) ? `${name}Procesado[]` : `${name}Procesado`;
    return `  ${name}: ${type};`;
  })
  .join("\n")}\n};\n`;

const outDir = path.resolve(__dirname, "../../../frontend/src/lib/types");
const outFile = path.join(outDir, "endpoint_response_types.ts");

fs.writeFileSync(outFile, header + imports + body, "utf8");
console.log(`✅ endpoint_response_types.ts generado en ${outFile}`);
