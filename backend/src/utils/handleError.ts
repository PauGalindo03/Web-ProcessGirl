import type { Response } from "express";

export function handleError(res: Response, error: any, status = 400) {
  const message =
    error?.message ||
    (typeof error === "string" ? error : "Error inesperado");

  res.status(status).json({ message });
}
