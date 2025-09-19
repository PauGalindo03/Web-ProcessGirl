import mongoose, { Schema, Document } from "mongoose"
import type { Contacto as ContactoPlano } from "../../../packages/types/contacto.js"

export interface IContacto extends Omit<ContactoPlano, "_id" | "createdAt" | "updatedAt"> {
  createdAt?: Date
  updatedAt?: Date
}

export interface IContactoDocument extends IContacto, Document {}

const contactoSchema = new Schema<IContactoDocument>(
  {
    estado: {
      type: String,
      enum: ["Activo", "En Producción", "Pendiente"],
      default: "En Producción",
      required: true,
    },
    objetivo: { type: String, required: true },
    titulo: { type: String, required: true },
    texto: { type: String, required: true },
    cta: { type: String, required: true },
    orden: { type: Number, required: true, unique: true },
    enlace: { type: String, default: "" },
    preview: { type: String, default: "" },
  },
  { timestamps: true }
)

export default mongoose.model<IContactoDocument>("Contacto", contactoSchema)
