// src/config/auth/authRoutes.ts
import { Router } from 'express';
import * as AuthController from './auth.controller.js';
import { autenticarToken } from '../../middleware/auth.js';
import usuariosCtrl from '../user/user.controller.js';

const router = Router();

console.log('[ROUTES] authRoutes.ts cargado');

// ───────────── RUTAS PÚBLICAS ─────────────
// Registro y login
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Verificación de email
router.get('/verify-email/:token', AuthController.verifyUserEmail);
router.get('/deny-registration/:token', AuthController.denyRegistration);
router.post('/resend-verification', AuthController.resendVerificationEmail);
router.post('/check-verification-status', AuthController.checkVerificationStatus);

// Flujo de cambio de correo y verificación de contraseña
router.post('/request-email-code', AuthController.requestChangeEmailCode);
router.post('/verify-password', AuthController.verifyPassword);

// ───────────── RUTAS PROTEGIDAS ─────────────
router.use(autenticarToken);

router.get('/predefined-avatars', usuariosCtrl.getPredefinedAvatars);
router.put('/change-password', usuariosCtrl.changeMyPassword);

export default router;
