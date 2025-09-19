import type { Estado } from './general'
import type { ProductoDigital } from './productoDigital'

export interface PaquetePD {
  _id: string
  estado?: Estado
  paquete: number
  sku: string
  titulo: string
  tipo: "paquete" 
  descripcion?: string
  precio?: number
  descuento?: number
  linkEntrega?: string
  precioFinal?: number
  productos: ProductoDigital[]
  createdAt?: string
  updatedAt?: string
}

export type PaquetePDInput = Omit<PaquetePD, '_id' | 'createdAt' | 'updatedAt'>