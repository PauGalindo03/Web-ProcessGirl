# 🚀 Arquitectura y Guía de Desarrollo

Este proyecto sigue una arquitectura **por capas** (backend y frontend) para mantener el código organizado, escalable y fácil de mantener.

---

## 🗂️ Frontend – Estructura
src/├── types/ # Tipos e interfaces (sin datos sensibles) 
    ├── services/ # Funciones que consumen el backend 
    ├── hooks/ # Lógica reutilizable para componentes 
    ├── components/ # UI y renderizado 
    └── pages/ # Rutas de Next.js

**Flujo de datos:**
[Component] → [Hook] → [Service] → [Backend API]

---


---

## 📦 Scripts principales

| Comando           | Descripción                   |
|-------------------|-------------------------------|
| `pnpm dev`        | Inicia servidor de desarrollo |
| `pnpm build`      | Genera build de producción    |
| `pnpm start`      | Sirve la build de producción  |
| `pnpm lint`       | Analiza el código con ESLint  |
| `pnpm lint --fix` | Corrige errores de lint       |
| `pnpm format`     | Formatea con Prettier         |
| `pnpm check`      | Lint + type-check + build     |

---

## 🔄 Actualización segura de dependencias

**Flujo recomendado:**

1. **Ver desactualizadas**

   ```bash
   pnpm outdated

   ```

2. **Actualizar herramientas de desarrollo**  
   pnpm run update:lint
   pnpm run check

3. **Actualizar librerías core**
pnpm run update:core
pnpm run check


4. **Actualizar todo lo demás**
pnpm run update:all
pnpm run check

5. **Actualizar todo lo demás**
pnpm run update:all
pnpm run check

---

## 🛡 Flujo recomendado antes de desplegar
1. **Ejecutar:**
pnpm run check

Ejecuta:
1. Lint
2. Type-check
3. Build de producción

Si todo pasa → desplegar en Render o Vercel.

---

## 🎯 Convenciones de código

- **Comillas simples** en imports y strings (`'` en lugar de `"`).
- **Sin variables sin usar** (`_` para ignorar).
- **Componentes/Hooks** en PascalCase.
- **Funciones/variables** en camelCase.
- **Formateo automático** con Prettier (`formatOnSave` en VS Code).
- **Accesibilidad**: `alt` en imágenes, `aria-*` cuando aplique.

---

## 📌 Resumen visual del flujo de trabajo
[Escribir código]
↓
[Guardar archivo] → Prettier formatea 
↓
[Commit] → Husky + lint-staged corrigen y validan 
↓
[Deploy] → Render/Vercel