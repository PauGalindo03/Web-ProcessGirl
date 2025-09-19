## 🔄 Flujo de Datos

1. **Frontend (Componentes / Pages)**  
   - El usuario interactúa con un formulario o botón en la UI.  
   - Se dispara una acción que usa un **hook** o **contexto**.  

2. **Frontend Hooks / Context**  
   - Llaman a un **service de frontend**.  
   - Manejan estado global (ejemplo: `AuthContext`, `useAuth`).  

3. **Frontend Services**  
   - Se encargan de hacer `fetch` o `axios` hacia la API del backend.  
   - Transforman la respuesta en objetos tipados (`src/types`).  

4. **Backend Rutas (Endpoints /api)**  
   - Reciben la petición y la dirigen al **controller** correspondiente.  
   - Validan accesos según el tipo de ruta:  
     - `/admin` → Solo usuarios con rol administrador.  
     - `/user` → Usuarios autenticados.  
     - `/public` → Acceso libre (sin autenticación).  

5. **Backend Controllers**  
   - Manejan `req` y `res`.  
   - Invocan a los **services del backend**.  
   - Devuelven una respuesta en formato JSON (`success` o `error`).  

6. **Backend Services**  
   - Contienen la **lógica de negocio** (validaciones, cálculos, reglas).  
   - Se apoyan en los **modelos Mongoose** para consultar o modificar datos.  
   - Devuelven datos listos para el controller.  

7. **Backend Modelos (Mongoose)**  
   - Definen la estructura de los datos en la base de datos.  
   - Aplican validaciones de esquema y tipos.  

8. **Respuesta al Frontend**  
   - El controller responde al **frontend service** con los datos.  
   - Los hooks/context actualizan el estado global.  
   - Los componentes renderizan la información al usuario.  

## 🔄 Flujo de Datos (Diagrama)

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
─────────── Petición HTTP (GET/POST/PUT/DELETE) ────────────
        │
        ▼
[ Backend Rutas (/admin, /user, /public) ]
        │
        ▼
[ Controllers (manejan req/res) ]
        │
        ▼
[ Services (lógica de negocio, validaciones) ]
        │
        ▼
[ Modelos Mongoose (MongoDB) ]
        │
        ▼
─────────── Respuesta JSON ────────────
        │
        ▼
[ Backend Controller -> responde al Frontend Service ]
        │
        ▼
[ Frontend Service -> actualiza Hook/Context ]
        │
        ▼
[ Componentes -> Renderizan datos en la UI ]


---