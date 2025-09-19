import type { ProductoDigital } from "@types";

export function buildFallbackProductos(): ProductoDigital[] {
  return [
    {
      _id: "123",
      estado: "Activo",
      paquete: [], // se rellena en fallPaquetes
      categoria: [], // se rellena en fallCategorias
      tipo: "producto",
      sku: "GST-001",
      titulo: "Get your Shit Together",
      descripcion: "Prueba",
      descripcionLarga:
        "Este e-book gratuito te introducirá en el camino a ser tu mejor versión",
      imagenes: [],
      precioBase: 1200,
      descuento: 20,
      esEdicionLimitada: true,
      disponibilidad: 10,
      fechaEdicionLimitada: undefined,
      link: "link",
      precioFinal: 960,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "1234",
      estado: "Activo",
      paquete: [],
      categoria: [],
      tipo: "producto",
      sku: "UGrl-002",
      titulo: "University Girl",
      descripcion: "Prueba",
      descripcionLarga:
        "Esta plantilla te ayudará a ver todo tu progreso universitario",
      imagenes: [],
      precioBase: 463,
      descuento: 10,
      esEdicionLimitada: false,
      disponibilidad: 0,
      fechaEdicionLimitada: undefined,
      link: "link",
      precioFinal: 416.7,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "1235",
      estado: "Activo",
      paquete: [],
      categoria: [],
      tipo: "producto",
      sku: "FCT-003",
      titulo: "Finanzas con tacones",
      descripcion: "Prueba",
      descripcionLarga:
        "Esta plantilla de notion te ayuda a lograr tu libertad financiera",
      imagenes: [],
      precioBase: 120,
      descuento: 0,
      esEdicionLimitada: false,
      disponibilidad: 0,
      fechaEdicionLimitada: undefined,
      link: "link",
      precioFinal: 120,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

export const fallbackProductos: ProductoDigital[] = buildFallbackProductos();
