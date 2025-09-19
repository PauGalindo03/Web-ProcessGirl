import type { Direccion } from "./user";
import type { Role } from "./user";

/**
 * Datos que el usuario puede enviar al registrarse
 */
export interface RegisterUserInput {
  email: string;
  password: string;
  nombres: string;
  apellidos: string;
  username: string;
  direccion: {
    pais: string;
    calle?: string;
    numero?: string;
    colonia?: string;
    codigoPostal?: string;
    ciudad?: string;
    estado?: string;
  };
}

/**
 * Respuesta que incluye token y datos de usuario
 * Usado por: register, login
 */
export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    nombres: string;
    apellidos: string;
    nombreCompleto: string;
    role: Role;

    username?: string;
    direccion?: Direccion;
    fotoPerfilUrl?: string | null;
  };
}

/**
 * Respuesta de solo mensaje
 * Usado por: verifyUserEmail, denyRegistration, resendVerificationEmail, requestChangeEmailCode
 */
export type MessageResponse = { message: string; success?: boolean };

/**
 * Respuesta específica de verificación de contraseña
 * Usado por: verifyPassword
 */
export type VerifyPasswordResponse = { success: true; message: string };
