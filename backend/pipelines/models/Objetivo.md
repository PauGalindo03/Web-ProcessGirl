# Objetivo
Convertir cada modelo y definición de datos en una única fuente de verdad que abarque:

## 1. Esquemas de validación

Partir de tus definiciones (por ejemplo esquemas de Mongoose o de tu propio dominio) y generar automáticamente `zod-schemas.ts`.  
Cada entidad tiene un `XSchemaBase` con la estructura y validaciones de Zod.

## 2. Refinamientos personalizados

Separar en `custom-refinements.ts` cualquier lógica adicional de validación o transformación que no provenga del modelo base.  
Ahí defines directamente `XSchema`.

## 3. Barrel unificado

Con `generate-all.ts` se crea `all-schemas.ts` que:

- Renombra automáticamente `XSchemaBase` as `XSchema` cuando no hay refinamiento personalizado.  
- Exporta `XSchema` directamente desde `custom-refinements.ts` cuando existe.  

Así garantizas que, al importar `XSchema`, siempre obtienes la versión final correcta (base o refinada).

## 4. Validadores de runtime

Generas helpers en `validation/validators.ts` para invocar tus esquemas de Zod en runtime (por ejemplo dentro de endpoints o middlewares).

## 5. Interfaces o tipos para el frontend

Con `generate-transformers.ts` importas dinámicamente `all-schemas`, filtras las exportaciones que terminan en `Schema` y generas los tipos/interfaces TypeScript que reflejan la forma validada.  

Esto asegura que el frontend:

- Conozca la estructura de datos exacta (sin copiar campos a mano).  
- Mantenga tipado estático equivalente al runtime de Zod en el backend.  
