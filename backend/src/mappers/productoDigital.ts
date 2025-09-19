import type { IProductoDigitalDocument } from '../models/ProductoDigital.js'
import type { ProductoDigital } from '../../../packages/types/productoDigital.js'
import { mapPaquetePD } from './paquetePD.js'
import { mapCategoria } from './categoria.js'
import type { IPaquetePDDocument } from '../models/PaquetePD.js'
import type { ICategoriaDocument } from '../models/Categoria.js'

export function mapProductoDigital(doc: IProductoDigitalDocument): ProductoDigital {
  return {
    _id: doc._id.toString(),
    estado: doc.estado,
    tipo: "producto",
    sku: doc.sku,
    titulo: doc.titulo,
    esEdicionLimitada: doc.esEdicionLimitada,
    precioBase: doc.precioBase ?? 0,

    // Solo incluimos paquetes populados
    paquete: Array.isArray(doc.paquete)
      ? doc.paquete
          .filter((p): p is IPaquetePDDocument => typeof (p as any)._id === 'object')
          .map((p) => mapPaquetePD(p))
      : [],

    // Solo incluimos categorías populadas
    categoria: Array.isArray(doc.categoria)
      ? doc.categoria
          .filter((c): c is ICategoriaDocument => typeof (c as any)._id === 'object')
          .map((c) => mapCategoria(c))
      : [],

    ...(doc.descripcion ? { descripcion: doc.descripcion } : {}),
    ...(doc.descripcionLarga ? { descripcionLarga: doc.descripcionLarga } : {}),
    ...(doc.imagenes && doc.imagenes.length > 0 ? { imagenes: doc.imagenes } : {}),
    ...(doc.descuento !== undefined ? { descuento: doc.descuento } : {}),
    ...(doc.disponibilidad !== undefined ? { disponibilidad: doc.disponibilidad } : {}),
    ...(doc.fechaEdicionLimitada ? { fechaEdicionLimitada: doc.fechaEdicionLimitada.toISOString() } : {}),
    ...(doc.link ? { link: doc.link } : {}),
    precioFinal: doc.precioFinal,
    ...(doc.createdAt ? { createdAt: doc.createdAt.toISOString() } : {}),
    ...(doc.updatedAt ? { updatedAt: doc.updatedAt.toISOString() } : {}),
  }
}
