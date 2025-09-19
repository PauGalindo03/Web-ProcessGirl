// src/services/authService.ts
import type { AuthResponse, MessageResponse } from "@types";

import api from "./api";

// ────────── Login ──────────
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", { email, password });
  return data;
};

// ────────── Registro ──────────
export const register = async (
  userData: Partial<AuthResponse["user"]> & { password: string }
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/register", userData);
  return data;
};

// ────────── Verificar email ──────────
export const verifyEmail = async (token: string): Promise<MessageResponse> => {
  const { data } = await api.post<MessageResponse>("/auth/verify-email", { token });
  return data;
};

// ────────── Reenviar correo de verificación ──────────
export const resendVerificationEmail = async (email: string): Promise<MessageResponse> => {
  const { data } = await api.post<MessageResponse>("/auth/resend-verification-email", { email });
  return data;
};

// ────────── Verificar contraseña ──────────
export const verifyPassword = async (userId: string, password: string) => {
  const { data } = await api.post<{ success: boolean; message: string }>("/auth/verify-password", {
    userId,
    password,
  });
  return data;
};

// ────────── Solicitar código de cambio de email ──────────
export const requestChangeEmailCode = async (userId: string, newEmail: string): Promise<MessageResponse> => {
  const { data } = await api.post<MessageResponse>("/auth/request-change-email-code", {
    userId,
    newEmail,
  });
  return data;
};

// ────────── Checar estado de verificación ──────────
export const checkVerificationStatus = async (
  email: string
): Promise<{ isEmailVerified: boolean; expiresAt?: string }> => {
  const { data } = await api.post('/auth/check-verification-status', { email });
  return data;
};

