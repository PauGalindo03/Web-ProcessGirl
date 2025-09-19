import type { ProductoDigital } from './productoDigital'
import type { Estado } from './general'

export interface Categoria {
  _id: string
  estado: Estado
  nombre: string
  productosDigitales?: ProductoDigital[] // en frontend ya recibes los objetos completos
  textoFiltro?: string
  createdAt?: string // ISO string
  updatedAt?: string // ISO string
}

// 🔹 Tipo para crear/editar categoría
export type CategoriaInput = Omit<Categoria, '_id' | 'createdAt' | 'updatedAt'>
