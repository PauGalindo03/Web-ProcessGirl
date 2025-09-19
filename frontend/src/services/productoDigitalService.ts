// src/services/productoDigitalService.ts
import type {
  ProductoDigital,
  ProductoDigitalInput,
} from "@types";

import api from "./api";

import { fallbackProductos } from "@/fallbacks/fallProductos";

const USE_FAKE = process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true";

// =======================
// Obtener productos activos (público)
// =======================
export async function obtenerPublicos(): Promise<ProductoDigital[]> {
  const res = await api.get<ProductoDigital[]>("public/productoDigital");
  return res.data;
}

// =======================
// Obtener un producto por ID
// =======================
export async function getPublicById(
  id: string
): Promise<ProductoDigital | null> {
  if (USE_FAKE) {
    const paquete = fallbackProductos.find((p) => p._id === id);
    return paquete ?? null;
  }
  try {
    const res = await api.get<ProductoDigital>(`public/productoDigital/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error en getPublicById:", err);
    return null;
  }
}

export async function getPublicBySku(
  sku: string
): Promise<ProductoDigital | null> {
  if (USE_FAKE) {
    const paquete = fallbackProductos.find((p) => p.sku === sku) ?? null;
    return paquete ?? null;
  }
  try {
    const res = await api.get<ProductoDigital>(`public/productoDigital/sku/${sku}`);
    return res.data;
  } catch (err) {
    console.error("Error en getPublicBySku (producto):", err);
    return null;
  }
}

// =======================
// Obtener todos los productos (admin)
// =======================
export async function obtenerTodos(): Promise<ProductoDigital[]> {
  const res = await api.get<ProductoDigital[]>("admin/productoDigital");
  return res.data;
}

// =======================
// Crear producto
// =======================
export async function crearProducto(
  data: ProductoDigitalInput
): Promise<ProductoDigital> {
  const res = await api.post<ProductoDigital>("admin/productoDigital", data);
  return res.data;
}

// =======================
// Actualizar producto
// =======================
export async function actualizarProducto(
  id: string,
  data: Partial<ProductoDigitalInput>
): Promise<ProductoDigital> {
  const res = await api.put<ProductoDigital>(
    `admin/productoDigital/${id}`,
    data
  );
  return res.data;
}

// =======================
// Eliminar producto
// =======================
export async function eliminarProducto(id: string): Promise<ProductoDigital> {
  const res = await api.delete<ProductoDigital>(`admin/productoDigital/${id}`);
  return res.data;
}
