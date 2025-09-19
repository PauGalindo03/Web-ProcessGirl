# 🚀 Arquitectura del Proyecto

Este proyecto sigue una arquitectura **separada por capas** (backend y frontend), lo que permite mantener un código organizado, escalable y fácil de mantener.

---

## 🗂️ Backend

### 1. Modelos (Mongoose + Interfaces)

Definen la estructura de los datos en MongoDB.

```ts
// models/User.ts
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  nombres: string;
  apellidos: string;
  role: "admin" | "user";
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  role: { type: String, default: "user" },
});

export const User = model<IUser>("User", UserSchema);
```

### 2. Services

Contienen la lógica del negocio. Validaciones, cálculos, reglas, etc...

```ts
// services/authService.ts
import { User } from "../models/User";
import bcrypt from "bcrypt";

export const registerUser = async (data: Partial<IUser>) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("El correo ya está registrado");

  const hashedPassword = await bcrypt.hash(data.password!, 10);
  const newUser = new User({ ...data, password: hashedPassword });

  return await newUser.save();
};
```

### 3. Controllers

Intermediarios entre las rutas y los servicios.

```ts
// controllers/authController.ts
import { Request, Response } from "express";
import { registerUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ success: true, user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
```

### 4. Rutas

Definen los endpoints de la API.

```ts
// routes/authRoutes.ts
import { Router } from "express";
import { register } from "../controllers/authController";

const router = Router();

router.post("/register", register);

export default router;
```

### 5. App.ts
Configura la aplicación

```ts
// app.ts
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI!);

app.listen(4000, () => console.log("Backend corriendo en http://localhost:4000"));

```


