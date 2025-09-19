import type { Types } from 'mongoose'
import type { IUser } from '../config/user/User.js'
import type { Usuario } from '../../../packages/types/user.js'

export function mapUsuario(doc: IUser): Usuario {
  return {
    _id: (doc._id as Types.ObjectId).toString(),
    email: doc.email,
    nombres: doc.nombres,
    apellidos: doc.apellidos,
    role: doc.role,
    ...(doc.username ? { username: doc.username } : {}),
    ...(doc.fotoPerfilUrl ? { fotoPerfilUrl: doc.fotoPerfilUrl } : {}),
    isEmailVerified: doc.isEmailVerified,
    ...(doc.fechaRegistro ? { fechaRegistro: doc.fechaRegistro.toISOString() } : {}),
    ...(doc.direccion ? { direccion: doc.direccion } : {}),
    ...(doc.nombreCompleto ? { nombreCompleto: doc.nombreCompleto } : {}),
    ...(doc.direccionCompleta ? { direccionCompleta: doc.direccionCompleta } : {}),
    ...(doc.createdAt ? { createdAt: (doc.createdAt as Date).toISOString() } : {}),
    ...(doc.updatedAt ? { updatedAt: (doc.updatedAt as Date).toISOString() } : {}),
  }
}
