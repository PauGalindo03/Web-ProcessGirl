import type { ProductoDigital } from "./productoDigital";

export type Carrito = CarritoPersistente | CarritoTemporal;

export interface CarritoPersistente {
  _id: string;
  tipo: 'persistente';
  user: string;
  items: CarritoItem[];
  actualizado?: string;
}

export interface CarritoTemporal {
  _id: string;
  tipo: 'temporal';
  user: 'temp';
  items: CarritoItem[];
  actualizado?: string;
}

export type CarritoItem = CarritoItemProducto | CarritoItemPaquete;

export interface CarritoItemProducto {
  _id: string;
  tipo: "producto";
  item: ProductoDigital;
  precioBase: number;
  precioFinal: number;
  descuento?: number;
}

export interface CarritoItemPaquete {
  _id: string;
  tipo: "paquete";
  titulo: string;
  productos: ProductoDigital[];
  precioFinal: number;
  descuento?: number;
}
