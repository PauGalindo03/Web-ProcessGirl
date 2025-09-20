import type { Response } from "express";

export function handleError(
  res: Response,
  error: any,
  status = 500,
  context?: string
) {
  const message =
    error?.message || (typeof error === "string" ? error : "Error inesperado");

  res.status(status).json({
    error: context ? `Error al ${context}` : "Error",
    message,
  });
}
