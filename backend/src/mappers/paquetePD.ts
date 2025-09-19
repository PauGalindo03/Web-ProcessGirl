import type { IPaquetePDDocument } from '../models/PaquetePD';
import type { PaquetePD } from '../../../packages/types/paquetePD';
import type { IProductoDigitalDocument } from '../models/ProductoDigital';
import { mapProductoDigital } from './productoDigital';

export function mapPaquetePD(doc: IPaquetePDDocument): PaquetePD {
  return {
    _id: doc._id.toString(),
    ...(doc.estado ? { estado: doc.estado } : {}),
    paquete: doc.paquete,
    sku: doc.sku,
    titulo: doc.titulo,
    tipo: "paquete",
    ...(doc.descripcion ? { descripcion: doc.descripcion } : {}),
    ...(doc.precio !== undefined ? { precio: doc.precio } : {}),
    ...(doc.descuento !== undefined ? { descuento: doc.descuento } : {}),
    ...(doc.linkEntrega ? { linkEntrega: doc.linkEntrega } : {}),
    ...(typeof doc.precioFinal === 'number' ? { precioFinal: doc.precioFinal } : {}),

    // 🔹 Ahora TS sabe que siempre son IProductoDigitalDocument
    productos: Array.isArray(doc.productos)
      ? (doc.productos as IProductoDigitalDocument[]).map(mapProductoDigital)
      : [],

    ...(doc.createdAt ? { createdAt: doc.createdAt.toISOString() } : {}),
    ...(doc.updatedAt ? { updatedAt: doc.updatedAt.toISOString() } : {}),
  };
}
