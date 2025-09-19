# 🧠 Pipeline de Generación Automática

Este pipeline convierte tus modelos en una fuente de verdad única que sincroniza validación, tipos y transformaciones entre backend y frontend. Está diseñado para eliminar duplicación manual, mantener consistencia y facilitar la evolución del sistema.

---

## 📦 ¿Qué genera este pipeline?

- **Esquemas Zod** (`XSchemaBase`) con validaciones, defaults y enums.
- **Refinamientos personalizados** (`XSchema`) con lógica adicional.
- **Barrel unificado** (`all-schemas.ts`) que exporta los esquemas finales.
- **Validadores de runtime** para usar en endpoints y middlewares.
- **Tipos de respuesta para endpoints** (`endpoint-response-types.ts`).
- **Interfaces para el frontend** (`interfaces_frontend.ts`) sincronizadas con los esquemas.

---

## 🧬 ¿Cómo se ejecuta?

Desde el backend, corre:

```bash
ts-node scripts/generate-all.ts
npm run generate:all
npm run generate:zod
npm run generate:transformers
