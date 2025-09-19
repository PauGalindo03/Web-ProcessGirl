import type { Estado } from './general'
import type { ProductoDigital } from './productoDigital'
import type { PaquetePD } from './paquetePD'
import type { Usuario } from './user' // nuevo tipo plano de usuario

export interface Testimonio {
  _id: string
  estado?: Estado
  nombre: string
  testimonio?: string
  img?: string[]
  user: Usuario | string // si está populado → Usuario, si no → ID
  rating: number
  producto?: ProductoDigital | string
  paquete?: PaquetePD | string
  createdAt?: string
  updatedAt?: string
}

export type TestimonioInput = Omit<Testimonio, '_id' | 'createdAt' | 'updatedAt'>
