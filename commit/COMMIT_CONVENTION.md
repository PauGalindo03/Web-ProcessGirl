# 🧠 Convención de Commits — ProcessGirl

Este proyecto usa [Conventional Commits](https://www.conventionalcommits.org/) para mantener un historial limpio y automatizable.

## 📌 Formato
<tipo>[opcional: ámbito]: descripción breve


Ejemplos:

- `feat: agrega validación en formulario de contacto`
- `fix(backend): corrige error de conexión con MongoDB`
- `chore: actualiza scripts de reinicio`
- `docs: documenta flujo de datos en README`

## 🔤 Tipos comunes

| Tipo       | Uso                                                |
|------------|----------------------------------------------------|
| `feat`     | Nueva funcionalidad                                |
| `fix`      | Corrección de errores                              |
| `chore`    | Tareas menores o mantenimiento                     |
| `refactor` | Reestructuración sin cambiar comportamiento        |
| `docs`     | Cambios en documentación                           |
| `style`    | Cambios visuales o de formato                      |
| `test`     | Agregar o modificar pruebas                        |
| `perf`     | Mejoras de rendimiento                             |
| `ci`       | Cambios en integración continua                    |
| `build`    | Cambios en dependencias, scripts, Docker, etc.     |

## ✅ Recomendaciones

- Usa verbos en infinitivo: `agrega`, `corrige`, `actualiza`
- Sé conciso pero claro
- Usa ámbito si aplica: `(frontend)`, `(backend)`, `(auth)`

## 🚫 Ejemplos inválido
- `cambios varios`
- `update`
- `fixes`
- `commit final`

---

Con esta convención, tus commits serán legibles, automatizables y compatibles con herramientas como changelogs, CI/CD y revisión de código.
