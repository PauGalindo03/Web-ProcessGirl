import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import User from './User.js'
import type { IUser, ICupon } from './User.js'
import CloudinaryService from '../cloudinary/cloudinaryService.js'
import { mapUsuario } from '../../mappers/user.js'
import type { Usuario, UsuarioInput } from '../../../../packages/types/user.js'

const PREDEFINED_AVATARS_FOLDER = 'process_girl_profile_pics/avatar.js'
const USER_AVATARS_BASE_FOLDER = 'process_girl_profile_pics/user_avatars.js'

// ✅ Obtener todos los usuarios (admin)
export async function getAllUsers(): Promise<Usuario[]> {
  const docs = await User.find({}, '-password').sort({ fechaRegistro: -1 })
  return docs.map(mapUsuario)
}

// ✅ Obtener usuario por ID
export async function getUserById(userId: string): Promise<Usuario | null> {
  const doc = await User.findById(userId, '-password').populate(
    'plantillasFavoritas',
    'titulo imagenes precio promocion id'
  )
  return doc ? mapUsuario(doc) : null
}

// ✅ Actualizar usuario por ID (admin)
export async function updateUserById(id: string, updateData: Partial<UsuarioInput>): Promise<Usuario | null> {
  const doc = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
    select: '-password',
  })
  return doc ? mapUsuario(doc) : null
}

// ✅ Actualizar mi perfil (usuario autenticado)
type UpdateProfileBody = Partial<UsuarioInput> & {
  removeFotoPerfil?: boolean
  predefinedAvatarUrl?: string
}
export async function updateMyProfile(
  userId: string,
  body: UpdateProfileBody,
  file?: Express.Multer.File
): Promise<Usuario | null> {
  const { nombres, apellidos, username, removeFotoPerfil, predefinedAvatarUrl } = body

  const fieldsToUpdate: Partial<IUser> = {}
  if (nombres) fieldsToUpdate.nombres = nombres
  if (apellidos) fieldsToUpdate.apellidos = apellidos
  if (username) fieldsToUpdate.username = username

  const user = await User.findById(userId)
  if (!user) throw new Error('Usuario no encontrado')

  let newFotoPerfilUrl: string | null = user.fotoPerfilUrl ?? null

  const deleteOldCustomAvatar = async () => {
    if (user.fotoPerfilUrl) {
      const oldPublicId = CloudinaryService.getPublicIdFromUrl(user.fotoPerfilUrl)
      const userSpecificFolder = `${USER_AVATARS_BASE_FOLDER}/${user.role}/${userId}`
      if (oldPublicId && oldPublicId.startsWith(userSpecificFolder)) {
        await CloudinaryService.deleteFile(oldPublicId).catch(console.error)
      }
    }
  }

  if (removeFotoPerfil) {
    await deleteOldCustomAvatar()
    newFotoPerfilUrl = null
  } else if (predefinedAvatarUrl) {
    await deleteOldCustomAvatar()
    newFotoPerfilUrl = predefinedAvatarUrl
  } else if (file) {
    await deleteOldCustomAvatar()
    const result = await CloudinaryService.uploadFile(file.path, {
      folder: `${USER_AVATARS_BASE_FOLDER}/${user.role}/${userId}`,
      public_id: 'profile_pic',
      overwrite: true,
      resource_type: 'image',
    })
    newFotoPerfilUrl = result.secure_url
  }

  fieldsToUpdate.fotoPerfilUrl = newFotoPerfilUrl

  const updated = await User.findByIdAndUpdate(
    userId,
    { $set: fieldsToUpdate },
    { new: true, runValidators: true, select: '-password' }
  )

  return updated ? mapUsuario(updated) : null
}

// ✅ Cambiar mi contraseña
export async function changeMyPassword(userId: string, oldPassword: string, newPassword: string) {
  const user = await User.findById(userId).select('+password')
  if (!user) throw new Error('Usuario no encontrado')

  const isMatch = await user.comparePassword(oldPassword)
  if (!isMatch) throw new Error('Contraseña actual incorrecta')

  user.password = await bcrypt.hash(newPassword, 10)
  await user.save()
  return { message: 'Contraseña actualizada correctamente' }
}

// ✅ Crear usuario (admin)
export async function createUser(userData: UsuarioInput & { password: string }): Promise<Usuario> {
  const hashedPassword = await bcrypt.hash(userData.password, 10)
  const nuevoUsuario = new User({ ...userData, password: hashedPassword })
  await nuevoUsuario.save()
  return mapUsuario(nuevoUsuario)
}

// ✅ Eliminar usuario (admin)
export async function deleteUserById(id: string) {
  const usuarioEliminado = await User.findByIdAndDelete(id)
  if (!usuarioEliminado) throw new Error('Usuario no encontrado')
  return { message: 'Usuario eliminado correctamente' }
}

// ✅ Obtener avatares predefinidos
export async function getPredefinedAvatars(): Promise<string[]> {
  const files = await CloudinaryService.listFiles(PREDEFINED_AVATARS_FOLDER)
  return files.map((file: { secure_url: string }) => file.secure_url)
}

// ✅ Alternar plantilla favorita
export async function toggleFavoriteTemplate(userId: string, plantillaId: string): Promise<Usuario | null> {
  const user = await User.findById(userId)
  if (!user) throw new Error('Usuario no encontrado')

  const objectId = new mongoose.Types.ObjectId(plantillaId)
  const index = (user.plantillasFavoritas || []).findIndex((id) => id.toString() === plantillaId)

  if (!user.plantillasFavoritas) user.plantillasFavoritas = []

  if (index >= 0) {
    user.plantillasFavoritas.splice(index, 1)
  } else {
    user.plantillasFavoritas.push(objectId)
  }

  await user.save()
  await user.populate('plantillasFavoritas', 'titulo imagenes precio promocion id')
  return mapUsuario(user)
}

// ✅ Agregar cupón al usuario
export async function addCouponToUser(userId: string, couponData: Partial<ICupon>): Promise<Usuario | null> {
  const user = await User.findById(userId)
  if (!user) throw new Error('Usuario no encontrado')

  if (!user.cupones) user.cupones = []

  const exists = user.cupones.some((c) => c.codigo === couponData.codigo?.toUpperCase())
  if (!exists) {
    const newCoupon: ICupon = {
      codigo: couponData.codigo?.toUpperCase() || '',
      descripcion: couponData.descripcion || '',
      terminos: couponData.terminos || '',
      tipoDescuento: couponData.tipoDescuento || 'porcentaje',
      valor: couponData.valor || 0,
      condicionCantidad: couponData.condicionCantidad || 0,
      fechaExpiracion: couponData.fechaExpiracion || new Date('2100-01-01'),
      activo: couponData.activo ?? true,
      aplicado: couponData.aplicado ?? false,
    }

    user.cupones.push(newCoupon)
    await user.save()
  }

  return mapUsuario(user)
}
