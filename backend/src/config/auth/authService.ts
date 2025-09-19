import { Types } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import User from '../user/User.js'
import type { IUser } from '../user/User.js'
import type { RegisterUserInput, AuthResponse, MessageResponse, VerifyPasswordResponse } from '@types'
import { sendAccountVerificationEmail, sendChangeEmailCode } from '@services/emailService.js'

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRES_IN = '7d'

// Helper: Generar token JWT
const generarToken = (userId: string, role: IUser['role']) =>
  jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

// Helper: Construir objeto user para AuthResponse
const buildAuthUser = (user: IUser) => ({
  _id: (user._id as Types.ObjectId).toString(),
  email: user.email,
  nombres: user.nombres,
  apellidos: user.apellidos,
  nombreCompleto: `${user.nombres} ${user.apellidos}`,
  role: user.role,
  ...(user.username && { username: user.username }),
  ...(user.direccion && { direccion: user.direccion }),
  fotoPerfilUrl: user.fotoPerfilUrl ?? null,
})

// ────────── Registro ──────────
export async function register(userData: RegisterUserInput): Promise<AuthResponse> {
  const { email, password, nombres, apellidos, username, direccion } = userData

  if (!email || !password || !nombres || !apellidos || !username) {
    throw new Error('Faltan datos obligatorios')
  }

  const existing = await User.findOne({ email })
  if (existing) throw new Error('El correo ya está registrado')

  const hashedPassword = await bcrypt.hash(password, 10)

  const nuevoUsuario = new User({
    email,
    password: hashedPassword,
    nombres,
    apellidos,
    username,
    direccion: direccion || {},
    role: 'user',
    isEmailVerified: false,
    accountVerificationToken: crypto.randomBytes(32).toString('hex'),
    accountVerificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  })

  await nuevoUsuario.save()

  await sendAccountVerificationEmail(nuevoUsuario.email, nuevoUsuario.accountVerificationToken!)

  const token = generarToken((nuevoUsuario._id as Types.ObjectId).toString(), nuevoUsuario.role)

  return { token, user: buildAuthUser(nuevoUsuario) }
}

// ────────── Login ──────────
export async function login(email: string, password: string): Promise<AuthResponse> {
  const user = await User.findOne({ email }).select('+password +isEmailVerified')
  if (!user) throw new Error('Correo o contraseña incorrectos')

  if (!user.isEmailVerified) {
    throw new Error('Por favor, verifica tu correo electrónico antes de iniciar sesión.')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Correo o contraseña incorrectos')

  const token = generarToken((user._id as Types.ObjectId).toString(), user.role)

  return { token, user: buildAuthUser(user) }
}

// ────────── Verificar email ──────────
export async function verifyUserEmail(token: string): Promise<MessageResponse> {
  const user = await User.findOne({
    accountVerificationToken: token,
    accountVerificationTokenExpires: { $gt: new Date() },
  }).select('+accountVerificationToken +accountVerificationTokenExpires') as IUser | null

  if (!user) throw new Error('Token de verificación inválido o expirado')

  user.isEmailVerified = true
  user.accountVerificationToken = null
  user.accountVerificationTokenExpires = null

  await user.save()
  return { message: 'Correo verificado correctamente.' }
}

// ────────── Denegar registro ──────────
export async function denyRegistration(token: string): Promise<MessageResponse> {
  const user = await User.findOne({ accountVerificationToken: token })
  if (!user) throw new Error('Token inválido')

  await user.deleteOne()
  return { message: 'Registro cancelado y usuario eliminado.' }
}

// ────────── Reenviar correo de verificación ──────────
export async function resendVerificationEmail(email: string): Promise<MessageResponse> {
  const user = await User.findOne({ email })
  if (!user) throw new Error('Usuario no encontrado')
  if (user.isEmailVerified) throw new Error('Correo ya verificado')

  user.accountVerificationToken = crypto.randomBytes(32).toString('hex')
  user.accountVerificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000)

  await user.save()
  await sendAccountVerificationEmail(user.email, user.accountVerificationToken!)

  return { message: 'Se ha reenviado el correo de verificación.' }
}

// ────────── Verificar contraseña ──────────
export async function verifyPassword(userId: string, password: string): Promise<VerifyPasswordResponse> {
  const user = await User.findById(userId).select('+password')
  if (!user) throw new Error('Usuario no encontrado')

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Contraseña incorrecta')

  return { success: true, message: 'Contraseña verificada correctamente.' }
}

// ────────── Mandar código para cambio de email ──────────
export async function requestChangeEmailCode(userId: string, newEmail: string): Promise<MessageResponse> {
  const user = await User.findById(userId)
  if (!user) throw new Error('Usuario no encontrado')

  user.accountVerificationToken = crypto.randomBytes(32).toString('hex')
  user.accountVerificationTokenExpires = new Date(Date.now() + 15 * 60 * 1000)

  await user.save()
  await sendChangeEmailCode(newEmail, user.accountVerificationToken)

  return { message: 'Se ha enviado un código al nuevo correo electrónico.' }
}

export async function checkVerificationStatusByEmail(email: string) {
  const user = await User.findOne({ email });

  if (!user) throw new Error('Correo no encontrado.');

  if (user.isEmailVerified) {
    return { isEmailVerified: true };
  }

  return {
    isEmailVerified: false,
    expiresAt: user.accountVerificationTokenExpires,
  };
}

export default {
  register,
  login,
  verifyUserEmail,
  denyRegistration,
  resendVerificationEmail,
  verifyPassword,
  requestChangeEmailCode,
  checkVerificationStatusByEmail,
}
