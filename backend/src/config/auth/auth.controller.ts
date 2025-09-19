import type { Request, Response } from "express";
import * as authService from "./authService.js";
import { handleError } from "@utils/handleError";

// ───────────── REGISTRO ─────────────
export const register = async (req: Request, res: Response) => {
  try {
    const authResponse = await authService.register(req.body);
    res.status(201).json(authResponse);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};

// ───────────── LOGIN ─────────────
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const authResponse = await authService.login(email, password);
    res.status(200).json(authResponse);
  } catch (error: any) {
    handleError(res, error, 401);
  }
};

// ───────────── VERIFICACIÓN DE EMAIL ─────────────
export const verifyUserEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    if (!token) return res.status(400).json({ error: "Token requerido" });

    const result = await authService.verifyUserEmail(token);
    res.json(result);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};

// ───────────── DENEGAR REGISTRO ─────────────
export const denyRegistration = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    if (!token) return res.status(400).json({ error: "Token requerido" });

    const result = await authService.denyRegistration(token);
    res.json(result);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};

// ───────────── REENVIAR VERIFICACIÓN ─────────────
export const resendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await authService.resendVerificationEmail(email);
    res.json(result);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};

// ───────────── VERIFICAR CONTRASEÑA ─────────────
export const verifyPassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "No autorizado" });

    const { password } = req.body;
    const result = await authService.verifyPassword(userId, password);
    res.json(result);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};

export const requestChangeEmailCode = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const { newEmail } = req.body;

    if (!userId) return handleError(res, "Usuario no autenticado", 401);
    if (!newEmail) return handleError(res, "Debes proporcionar un nuevo correo electrónico", 400);

    const result = await authService.requestChangeEmailCode(
      userId.toString(),
      newEmail
    );
    res.status(200).json(result);
  } catch (error: any) {
    handleError(res, error, 500);
  }
};


export async function checkVerificationStatus(req: Request, res: Response) {
  const { email } = req.body;

  try {
    const result = await authService.checkVerificationStatusByEmail(email);
    res.json(result);
  } catch (error: any) {
    handleError(res, error.message || "Error al verificar estado.", 404)
  }
}

// ───────────── EXPORT DEFAULT ─────────────
export default {
  register,
  login,
  verifyUserEmail,
  denyRegistration,
  resendVerificationEmail,
  verifyPassword,
  requestChangeEmailCode,
  checkVerificationStatus,
};
