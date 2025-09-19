import mongoose, { Schema, Document } from 'mongoose'
import type { Faq } from '../../../packages/types/faq.js'

export interface IFaq
  extends Omit<Faq, '_id' | 'createdAt' | 'updatedAt'> {
  createdAt?: Date
  updatedAt?: Date
}

export interface IFaqDocument extends IFaq, Document {}

const faqSchema = new Schema<IFaqDocument>(
  {
    estado: {
      type: String,
      enum: ['Activo', 'En Producción', 'Pendiente'],
      default: 'En Producción',
      required: true,
    },
    isUserLoggedIn: { type: Boolean, default: false },
    correo: { type: String, trim: true },
    pregunta: {
      type: String,
      required: [true, 'La pregunta es obligatoria.'],
      trim: true,
      unique: true,
    },
    respuesta: { type: String, default: '', trim: true },
    categoria: {
      type: String,
      enum: ['General', 'Pagos', 'Sistemas & Productos', 'Envíos', 'Cuenta', 'Otros'],
      trim: true,
      default: 'General',
    },
    orden: { type: Number, default: 1, required: true },
  },
  { timestamps: true }
)

export default mongoose.model<IFaqDocument>('FAQ', faqSchema)
