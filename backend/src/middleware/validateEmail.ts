// src/middlewares/validateEmail.ts
import type { Request, Response, NextFunction } from 'express';

export function validateEmail(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'El correo es obligatorio.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Formato de correo inválido.' });
  }

  next();
}
