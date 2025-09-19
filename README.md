# 🧠 ProcessGirl — Arquitectura y Flujo de Datos

## 🔄 Flujo de Datos

1. **Frontend (Componentes / Pages)**  
   - El usuario interactúa con formularios, botones o vistas.  
   - Se dispara una acción que usa un **hook** o **contexto**.

2. **Frontend Hooks / Context**  
   - Llaman a un **servicio de frontend**.  
   - Manejan estado global (ej. `AuthContext`, `useAuth`).

3. **Frontend Services**  
   - Realizan peticiones HTTP (`fetch` o `axios`) al backend.  
   - Transforman la respuesta en objetos tipados (`packages/types`).

4. **Backend Rutas (`/api`)**  
   - Reciben la petición y la dirigen al **controller** correspondiente.  
   - Validan accesos según el tipo de ruta:  
     - `/admin` → Solo admins  
     - `/user` → Usuarios autenticados  
     - `/public` → Acceso libre

5. **Backend Controllers**  
   - Manejan `req` y `res`.  
   - Invocan a los **servicios del backend**.  
   - Devuelven respuesta JSON (`success`, `error`, `data`).

6. **Backend Services**  
   - Contienen la lógica de negocio (validaciones, reglas, cálculos).  
   - Interactúan con los **modelos Mongoose**.  
   - Devuelven datos listos para el controller.

7. **Modelos Mongoose**  
   - Definen la estructura de los datos en MongoDB.  
   - Aplican validaciones de esquema y tipos.

8. **Respuesta al Frontend**  
   - El controller responde al **servicio frontend**.  
   - Los hooks/context actualizan el estado global.  
   - Los componentes renderizan la información.

---

## 🔁 Diagrama de Flujo

```text
[ Usuario / UI ]
        │
        ▼
[ Frontend Componentes (React/Next.js) ]
        │
        ▼
[ Hooks / Context (useX, AuthContext, etc.) ]
        │
        ▼
[ Frontend Services (axios -> /api) ]
        │
        ▼
─────────── Petición HTTP ────────────
        │
        ▼
[ Backend Rutas (/admin, /user, /public) ]
        │
        ▼
[ Controllers (manejan req/res) ]
        │
        ▼
[ Services (lógica de negocio) ]
        │
        ▼
[ Modelos Mongoose (MongoDB) ]
        │
        ▼
─────────── Respuesta JSON ────────────
        │
        ▼
[ Frontend Service -> actualiza Hook/Context ]
        │
        ▼
[ Componentes -> Renderizan datos en la UI ]

## ⚙️ Scripts de Desarrollo

### 🧼 Frontend — `reset-frontend.ps1`

Este script limpia y reinstala el entorno de desarrollo del frontend:

```powershell
# Ir a la carpeta del frontend
cd "C:\Users\pauli\Desktop\ProcessGirl_Final\frontend"

# Eliminar node_modules y lockfile
Remove-Item -Recurse -Force node_modules
Remove-Item -Force pnpm-lock.yaml

# Limpiar caché de pnpm
pnpm store prune

# Reinstalar dependencias
pnpm install

# Confirmar instalación
pnpm list --depth=0

### 🧼 Backend — `setup-dev.ps1`

Este script reinicia el entorno backend y levanta los contenedores Docker:

```powershell
Write-Host "Limpiando entorno..."
Remove-Item -Recurse -Force node_modules, dist, package-lock.json

Write-Host "Reinstalando dependencias..."
npm install

Write-Host "Reiniciando Docker..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

Write-Host "Entorno reiniciado correctamente."

Write-Host "Esperando a que los servicios estén saludables..."
Start-Sleep -Seconds 10

Write-Host "Estado de los contenedores:"
docker ps --filter "name=process-girl" --format "table {{.Names}}\t{{.Status}}"

Write-Host "Entorno listo. Backend: http://localhost:5000"
