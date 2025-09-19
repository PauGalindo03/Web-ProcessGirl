import type { Usuario, UsuarioInput, Cupon } from "@types";

import api from './api'

// =======================
// Obtener todos los usuarios (admin)
// =======================
export async function getAllUsers(): Promise<Usuario[]> {
  const res = await api.get<Usuario[]>('/users/admin')
  return res.data
}

// =======================
// Obtener usuario por ID
// =======================
export async function getUserById(userId: string): Promise<Usuario> {
  const res = await api.get<Usuario>(`/users/${userId}`)
  return res.data
}

// =======================
// Crear usuario
// =======================
export async function createUser(data: UsuarioInput): Promise<Usuario> {
  const res = await api.post<Usuario>('/users', data)
  return res.data
}

// =======================
// Actualizar usuario por ID
// =======================
export async function updateUserById(
  userId: string,
  data: Partial<UsuarioInput>
): Promise<Usuario> {
  const res = await api.put<Usuario>(`/users/${userId}`, data)
  return res.data
}

// =======================
// Eliminar usuario
// =======================
export async function deleteUserById(userId: string) {
  await api.delete(`/users/${userId}`)
}

// =======================
// Actualizar perfil propio
// =======================
export async function updateMyProfile(data: FormData): Promise<Usuario> {
  const res = await api.put<Usuario>('/users/me', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

// =======================
// Cambiar contraseña propia
// =======================
export async function changeMyPassword(oldPassword: string, newPassword: string) {
  const res = await api.put('/users/me/password', { oldPassword, newPassword })
  return res.data
}

// =======================
// Obtener avatares predefinidos
// =======================
export async function getPredefinedAvatars(): Promise<string[]> {
  const res = await api.get<string[]>('/users/avatars/predefined')
  return res.data
}

// =======================
// Toggle plantilla favorita
// =======================
export async function toggleFavoriteTemplate(plantillaId: string): Promise<Usuario> {
  const res = await api.post<Usuario>(`/users/me/favorites/${plantillaId}`)
  return res.data
}

// =======================
// Agregar cupón al usuario
// =======================
export async function addCouponToUser(couponData: Partial<Cupon>): Promise<Usuario> {
  const res = await api.post<Usuario>('/users/me/coupons', couponData)
  return res.data
}
