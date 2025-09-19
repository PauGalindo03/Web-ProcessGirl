// src/services/paquetePDService.ts
import type {
  PaquetePD,
  PaquetePDInput,
} from "@types";

import api from "./api";

import { fallbackPaquetes } from "@/fallbacks/fallPaquetes";

const USE_FAKE = process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true";

// =======================
// Obtener paquetes activos (público)
// =======================
export async function getPublicAll(): Promise<PaquetePD[]> {
  const res = await api.get<PaquetePD[]>("public/paquetePD");
  return res.data;
}

// =======================
// Obtener los paquetes públicos por ID
// =======================
export async function getPublicById(id: string): Promise<PaquetePD | null> {
  if (USE_FAKE) {
    const paquete = fallbackPaquetes.find((p) => p._id === id);
    return paquete ?? null;
  }
  try {
    const res = await api.get<PaquetePD>(`public/paquetePD/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error en getPublicById:", err);
    return null;
  }
}

export async function getPublicBySku(sku: string): Promise<PaquetePD | null> {
  if (USE_FAKE) {
    return fallbackPaquetes.find(p => p.sku === sku) ?? null;
  }

  try {
    const res = await api.get<PaquetePD>(`public/paquetePD/sku/${sku}`);
    return res.data;
  } catch (err) {
    console.error("Error en getPublicBySku (paquete):", err);
    return null;
  }
}

// =======================
// Obtener todos los paquetes (admin)
// =======================
export async function getAll(): Promise<PaquetePD[]> {
  const res = await api.get<PaquetePD[]>("admin/paquetePD");
  return res.data;
}

// =======================
// Crear paquete
// =======================
export async function create(data: PaquetePDInput): Promise<PaquetePD> {
  const res = await api.post<PaquetePD>("admin/paquetePD", data);
  return res.data;
}

// =======================
// Actualizar paquete
// =======================
export async function update(
  id: string,
  data: PaquetePDInput
): Promise<PaquetePD> {
  const res = await api.put<PaquetePD>(`admin/paquetePD/${id}`, data);
  return res.data;
}

// =======================
// Eliminar paquete
// =======================
export async function remove(id: string): Promise<{ mensaje: string }> {
  const res = await api.delete<{ mensaje: string }>(`admin/paquetePD/${id}`);
  return res.data;
}
