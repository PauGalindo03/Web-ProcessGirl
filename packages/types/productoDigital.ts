import type { PaquetePD } from "./paquetePD";
import type { Categoria } from "./categoria";
import type { Estado } from './general';

export interface ProductoDigital {
  _id: string;
  estado: Estado;
  tipo: "producto";
  sku: string;
  titulo: string;
  esEdicionLimitada: boolean;

  paquete?: PaquetePD[]; // IDs de paquetes
  categoria?: Categoria[]; // IDs de categorías

  descripcion?: string;
  descripcionLarga?: string;
  imagenes?: string[];

  precioBase: number;
  descuento?: number;

  disponibilidad?: number;
  fechaEdicionLimitada?: string; // ISO string

  link?: string;
  precioFinal?: number;

  createdAt?: string;
  updatedAt?: string;
}

// 🔹 Tipo para creación/edición
export type ProductoDigitalInput = Omit<
  ProductoDigital,
  '_id' | 'createdAt' | 'updatedAt' | 'precioFinal' | 'link'
>
