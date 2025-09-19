// src/middleware/auth.ts
import type { Request, Response, NextFunction } from "express";
import type { Types } from "mongoose";
import jwt from "jsonwebtoken";
import User from "../config/user/User.js";
import type { IUser } from "../config/user/User.js";

// Tipado del payload del JWT
interface JwtPayload {
  userId: string;
  role: IUser["role"];
}


// ────────── Middleware obligatorio ──────────
export async function autenticarToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No autorizado" });
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await User.findById(payload.userId, "email nombres apellidos role") as (IUser & { _id: Types.ObjectId }) | null;
    if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

    req.user = {
      _id: user._id.toString(),
      email: user.email,
      nombreCompleto: `${user.nombres} ${user.apellidos}`,
      role: user.role,
    };

    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
}

// ────────── Middleware opcional ──────────
export async function autenticarTokenOpcional(req: Request, _res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await User.findById(payload.userId, "email nombres apellidos role") as (IUser & { _id: Types.ObjectId }) | null;
    if (!user) return next();

    req.user = {
      _id: user._id.toString(),
      email: user.email,
      nombreCompleto: `${user.nombres} ${user.apellidos}`,
      role: user.role,
    };

    next();
  } catch (err) {
    next();
  }
}

// ────────── Middleware de autorización por roles ──────────
export function autorizar(roles: IUser["role"] | IUser["role"][]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const rolesPermitidos = Array.isArray(roles) ? roles : [roles];
    if (!rolesPermitidos.includes(req.user.role)) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    next();
  };
}

export default { autenticarToken, autenticarTokenOpcional, autorizar };
