// src/services/contactoService.ts
import type { Contacto, ContactoInput } from "@types";

import api from "./api";

// =======================
// Obtener contactos públicos
// =======================
export async function getPublicContactos(): Promise<Contacto[]> {
  const res = await api.get<Contacto[]>("public/contactos");
  return res.data;
}

// =======================
// Obtener todos los contactos (admin)
// =======================
export async function getAllContactos(): Promise<Contacto[]> {
  const res = await api.get<Contacto[]>("admin/contactos");
  return res.data;
}

// =======================
// Crear contacto
// =======================
export async function createContacto(data: ContactoInput): Promise<Contacto> {
  const res = await api.post<Contacto>("admin/contactos", data)
  return res.data
}

// =======================
// Actualizar contacto
// =======================
export async function updateContacto(id: string, data: ContactoInput): Promise<Contacto> {
  const res = await api.put<Contacto>(`admin/contactos/${id}`, data)
  return res.data
}

// =======================
// Eliminar contacto
// =======================
export async function deleteContacto(id: string): Promise<{ message: string }> {
  const res = await api.delete<{ message: string }>(`admin/contactos/${id}`);
  return res.data;
}
