import type { Testimonio, TestimonioInput } from "@types";

import api from './api'

// =======================
// Obtener testimonios activos (público)
// =======================
export async function getPublicAll(): Promise<Testimonio[]> {
  const res = await api.get<Testimonio[]>('public/testimonios')
  return res.data
}

// =======================
// Obtener todos los testimonios (admin)
// =======================
export async function getAll(): Promise<Testimonio[]> {
  const res = await api.get<Testimonio[]>('admin/testimonios')
  return res.data
}

// =======================
// Crear testimonio
// =======================
export async function create(data: TestimonioInput): Promise<Testimonio> {
  const res = await api.post<Testimonio>('public/testimonios', data)
  return res.data
}

// =======================
// Actualizar testimonio
// =======================
export async function update(id: string, data: Partial<TestimonioInput>): Promise<Testimonio> {
  const res = await api.put<Testimonio>(`admin/testimonios/${id}`, data)
  return res.data
}

// =======================
// Eliminar testimonio
// =======================
export async function remove(id: string): Promise<void> {
  await api.delete(`admin/testimonios/${id}`)
}
