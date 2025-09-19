import { Router } from 'express';
import adminRoutes from './adminRoutes.js';
import publicRoutes from './publicRoutes.js';
import userRoutes from './userRoutes.js';
import authRoutes from '../config/auth/authRoutes.js';

const router = Router();

router.use('/admin', adminRoutes);
router.use('/public', publicRoutes);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);

export default router;