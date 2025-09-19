# Flujo General del Pipeline

Este pipeline automatiza la generación de esquemas, validadores y tipos sincronizados entre backend y frontend. Cada paso transforma los modelos en artefactos reutilizables y tipados.

---

## 🧬 Paso 1: Generar esquemas base de Zod

**Script:** `generate-zod.ts`  
**Salida:** `validation/zod-schemas.ts`

- Convierte cada modelo en un `XSchemaBase` usando Zod.
- Incluye validaciones, defaults, enums, etc.
- No contiene lógica personalizada.

---

## 🧪 Paso 2: Agregar refinamientos personalizados

**Archivo:** `validation/custom-refinements.ts`

- Define `XSchema` con lógica adicional (`.refine()`, `.transform()`, etc).
- Si existe un refinamiento para `X`, se usa este en lugar del base.

---

## 📦 Paso 3: Generar barrel unificado

**Script:** `generate-all.ts`  
**Salida:** `validation/all-schemas.ts`

- Detecta todos los `XSchemaBase` y `XSchema`.
- Si existe refinamiento → exporta `XSchema` desde `custom-refinements.ts`.
- Si no existe refinamiento → exporta `XSchemaBase as XSchema` desde `zod-schemas.ts`.
- Resultado: un único punto de entrada con todos los esquemas finales.

---

## 🔍 Paso 4: Generar validadores de runtime (opcional)

**Script:** `generate-validators.js`  
**Salida:** `validation/validators.ts`

- Crea funciones que usan los esquemas para validar datos en runtime.
- Útil para endpoints, controladores, middlewares.

---

## 🚀 Paso 5: Generar tipos de respuesta para endpoints

**Script:** `generate-endpoint-response-types.js`  
**Salida:** `validation/endpoint-response-types.ts`

- Genera tipos que representan las respuestas esperadas de cada endpoint.
- Se basa en los esquemas de `all-schemas.ts`.
- Permite tipar correctamente los controladores y servicios del backend.

---

## 🧩 Paso 6: Generar tipos para el frontend

**Script:** `generate-transformers.ts`  
**Salida:** `frontend/src/lib/types/interfaces_frontend.ts`

- Importa dinámicamente `all-schemas.ts`.
- Filtra todas las exportaciones que terminan en `Schema`.
- Genera `export type X = z.infer<typeof schemas.XSchema>` para cada entidad.
- El frontend obtiene tipos sincronizados con el backend sin duplicación manual.

---

## ✅ Resultado final

- Todos los modelos tienen validación, refinamiento y tipos sincronizados.
- El frontend y backend comparten una única fuente de verdad (`XSchema`).
- Los cambios en modelos se propagan automáticamente al ejecutar el pipeline.
