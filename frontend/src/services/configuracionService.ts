import type { Configuracion } from "@types";

import api from "./api";

// Obtener configuración
export async function getConfiguracion(): Promise<Configuracion> {
  const res = await api.get<Configuracion>("public/configuracion");
  return res.data;
}

// Actualizar configuración
export async function updateConfiguracion(config: Configuracion): Promise<Configuracion> {
  const res = await api.put<Configuracion>("public/configuracion", config);
  return res.data;
}
