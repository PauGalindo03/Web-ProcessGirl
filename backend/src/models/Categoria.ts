import mongoose, { Schema, Document, Types } from "mongoose";
import type { IProductoDigitalDocument } from "./ProductoDigital.js";

export interface ICategoria {
  estado: "Activo" | "En Producción" | "Pendiente";
  nombre: string;
  
  productosDigitales?: Types.ObjectId[] | IProductoDigitalDocument[];  // IDs de productos
  textoFiltro?: string;

  // Timestamps opcionales
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategoriaDocument extends ICategoria, Document {}

const categoriaSchema = new Schema<ICategoriaDocument>(
  {
    estado: {
      type: String,
      enum: ["Activo", "En Producción", "Pendiente"],
      default: "En Producción",
      required: true,
    },
    nombre: { type: String, required: true, unique: true, trim: true },

    productosDigitales: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productoDigital",
      },
    ],

    textoFiltro: { type: String, default: "" },
  },
  { timestamps: true }
);

const Categoria = mongoose.model<ICategoriaDocument>("Categoria", categoriaSchema);
export default Categoria;
