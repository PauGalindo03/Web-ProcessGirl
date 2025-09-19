import type { ICategoriaDocument } from '../models/Categoria.js'
import type { Categoria } from '../../../packages/types/categoria.js'
import { mapProductoDigital } from './productoDigital.js'

export function mapCategoria(doc: ICategoriaDocument): Categoria {
  const categoria: Categoria = {
    _id: String(doc._id),
    estado: doc.estado,
    nombre: doc.nombre,
    textoFiltro:
      doc.textoFiltro && doc.textoFiltro.trim() !== ''
        ? doc.textoFiltro
        : doc.nombre,
  }

  if (doc.createdAt) {
    categoria.createdAt = doc.createdAt.toISOString()
  }

  if (doc.updatedAt) {
    categoria.updatedAt = doc.updatedAt.toISOString()
  }

  if (Array.isArray(doc.productosDigitales)) {
    categoria.productosDigitales = doc.productosDigitales.map((p) =>
      mapProductoDigital(p as any)
    )
  }

  return categoria
}
