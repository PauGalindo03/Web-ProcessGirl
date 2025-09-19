import type { Estado } from './general';

export interface Contacto {
  _id: string;
  estado: Estado;
  objetivo: string;
  titulo: string;
  texto: string;
  cta: string;
  orden: number;
  enlace?: string;
  preview?: string;
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
}

export type ContactoInput = Omit<Contacto, '_id' | 'createdAt' | 'updatedAt'>

