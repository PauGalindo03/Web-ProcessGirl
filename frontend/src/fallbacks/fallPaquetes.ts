import type { PaquetePD } from "@types";

import { fallbackProductos } from "./fallProductos";

export function buildFallbackPaquetes(): PaquetePD[] {
  const GST = fallbackProductos.find(p => p.sku === "GST-001")!;
  const UGrl = fallbackProductos.find(p => p.sku === "UGrl-002")!;
  const FCT = fallbackProductos.find(p => p.sku === "FCT-003")!;

  return [
    {
      _id: "1",
      titulo: "Finanzas con tacones",
      sku: "FCT",
      paquete: 1,
      productos: [FCT, GST,UGrl],
      estado: "Activo",
      tipo: "paquete",
      descripcion: "Paquete digital de finanzas para mujeres jóvenes",
      precio: 100,
      descuento: 0,
      linkEntrega: "/paquetes/fct",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      precioFinal: 100,
    },
    {
      _id: "2",
      titulo: "Get Your Shit Together",
      sku: "GST",
      paquete: 2,
      productos: [FCT, GST,UGrl],
      estado: "Activo",
      tipo: "paquete",
      descripcion: "Paquete gratuito de organización personal",
      precio: 0,
      descuento: 0,
      linkEntrega: "/paquetes/gst",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      precioFinal: 0,
    },
    {
      _id: "3",
      titulo: "Process to Glow",
      sku: "PTG",
      paquete: 3,
      productos: [FCT, GST,UGrl],
      estado: "Activo",
      tipo: "paquete",
      descripcion: "Paquete de productividad y bienestar",
      precio: 150,
      descuento: 10,
      linkEntrega: "/paquetes/ptg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      precioFinal: 135,
    },
  ];
}

export const fallbackPaquetes: PaquetePD[] = buildFallbackPaquetes();
