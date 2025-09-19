import type { Estado } from './general'

export type CategoriaFaq =
  | 'General'
  | 'Pagos'
  | 'Sistemas & Productos'
  | 'Envíos'
  | 'Cuenta'
  | 'Otros'

export interface Faq {
  _id: string
  estado: Estado
  pregunta: string
  
  isUserLoggedIn?: boolean
  correo?: string
  respuesta?: string
  categoria?: CategoriaFaq
  orden?: number
  createdAt?: string // ISO string
  updatedAt?: string // ISO string
}

// Tipo para creación/edición
export type FaqInput = Omit<Faq, '_id' | 'createdAt' | 'updatedAt'>
