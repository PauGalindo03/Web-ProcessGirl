// src/config/auth/auth.types.ts
import type { IDireccion } from "../user/User.js";

/**
 * Respuesta que incluye token y datos de usuario
 * Usado por: register, login
 */
export interface IAuthResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    nombres: string;
    apellidos: string;
    nombreCompleto: string;
    role: "admin" | "user";
    username?: string;
    direccion?: IDireccion;
    fotoPerfilUrl?: string | null;
  };
}

/**
 * Respuesta de solo mensaje
 * Usado por: verifyUserEmail, denyRegistration, resendVerificationEmail, requestChangeEmailCode
 */
export type IMessageResponse = { message: string; success?: boolean };

/**
 * Respuesta específica de verificación de contraseña
 * Usado por: verifyPassword
 */
export type IVerifyPasswordResponse = { success: true; message: string };

export type IVerificationStatus =
  | { isEmailVerified: true }
  | { isEmailVerified: false; expiresAt: Date };
