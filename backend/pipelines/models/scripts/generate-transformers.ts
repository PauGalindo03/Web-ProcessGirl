// backend/scripts/generate-transformers.ts
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

// 0) Handlers globales para errores no atrapados
process.on("uncaughtException", (err) => {
  console.error(
    "💥 uncaughtException en generate-transformers:",
    err,
    "\n",
    err?.stack
  );
  process.exit(1);
});
process.on("unhandledRejection", (reason) => {
  console.error(
    "💥 unhandledRejection en generate-transformers:",
    reason,
    "\n",
    (reason as any)?.stack
  );
  process.exit(1);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async function main() {
  try {
    // 1) Determinar la ruta base de los esquemas
    const baseSchemasPath = path.resolve(
      __dirname,
      "../validation/all-schemas"
    );
    // 2) Detectar extensión existente
    const exts = [".ts", ".js"];
    const foundExt = exts.find((ext) => fs.existsSync(baseSchemasPath + ext));
    if (!foundExt) {
      throw new Error(
        `No se encontró all-schemas.{ts,js} en ${baseSchemasPath}`
      );
    }
    const schemaFilePath = baseSchemasPath + foundExt;

    // 3) Convertir a URL válido para import dinámico
    const schemaFileUrl = pathToFileURL(schemaFilePath).href;
    const schemas = await import(schemaFileUrl);
    console.log("📦 Schemas cargados:", Object.keys(schemas).join(", "));

    // 4) Generar interfaces para el frontend
    const outDir = path.resolve(__dirname, "../../../frontend/src/lib/types");
    const outFile = path.join(outDir, "interfaces_frontend.ts");
    const header =
      `// Auto-generated ${new Date().toISOString()}\n\n` +
      `import { z } from "zod";\n` +
      `import * as schemas from "../../../../backend/pipeline-data/validation/all-schemas";\n\n`;

    const body = Object.keys(schemas)
      .filter((key) => key.endsWith("Schema"))
      .map((schemaName) => {
        const typeName = schemaName.replace(/Schema$/, "");
        return `export type ${typeName} = z.infer<typeof schemas.${schemaName}>;`;
      })
      .join("\n");

    // 5) Escribir fichero
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outFile, header + body + "\n", "utf8");
    console.log(`✅ Interfaces generadas en ${outFile}`);
  } catch (err) {
    console.error("❌ Error generando transformers:", err);
    process.exit(1);
  }
})();
