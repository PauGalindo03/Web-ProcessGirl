import type { Categoria } from "@types";

import { fallbackProductos } from "./fallProductos";

export function buildFallbackCategorias(): Categoria[] {
  const FCT = fallbackProductos.find(p => p.sku === "FCT-003")!;
  const UGrl = fallbackProductos.find(p => p.sku === "UGrl-002")!;
  const GST = fallbackProductos.find(p => p.sku === "GST-001")!;

  return [
    {
      _id: "cat-finanzas",
      estado: "Activo",
      nombre: "Finanzas",
      productosDigitales: [FCT],
      textoFiltro: "transforma tus finanzas",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "cat-productividad",
      estado: "Activo",
      nombre: "Productividad",
      productosDigitales: [UGrl],
      textoFiltro: "transforma tu caos",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "cat-edicion-limitada",
      estado: "Activo",
      nombre: "Edición Limitada",
      productosDigitales: [GST],
      textoFiltro: "no te pierdas",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

export const fallbackCategorias: Categoria[] = buildFallbackCategorias();
