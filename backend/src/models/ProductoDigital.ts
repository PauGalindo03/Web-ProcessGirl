// src/models/ProductoDigital.ts
import mongoose, { Types, Document, Schema } from "mongoose";
import type { IPaquetePDDocument } from "./PaquetePD.js";
import type { ICategoriaDocument } from "./Categoria.js";

export interface IProductoDigital {
  estado: "Activo" | "En Producción" | "Pendiente";
  tipo: string;
  sku: string;
  titulo: string;
  esEdicionLimitada: boolean;

  paquete?: Types.ObjectId[] | IPaquetePDDocument[];  // IDs de paquetes
  categoria?: Types.ObjectId[] | ICategoriaDocument[];  // IDs de categorías

  descripcion?: string;
  descripcionLarga?: string;
  imagenes?: string[];

  precioBase?: number;
  descuento?: number;

  disponibilidad?: number;
  fechaEdicionLimitada?: Date;

  // Virtuales opcionales
  link?: string;
  precioFinal: number;

  // Timestamps opcionales
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductoDigitalDocument extends IProductoDigital, Document<Types.ObjectId> {
  precioFinal: number;
}

const productoDigitalSchema = new Schema<IProductoDigitalDocument>(
  {
    estado: {
      type: String,
      enum: ["Activo", "En Producción", "Pendiente"],
      default: "En Producción",
      required: true,
    },
    tipo: { type: String, default: "producto", required: true },
    sku: { type: String, required: true },
    titulo: { type: String, required: true },
    esEdicionLimitada: { type: Boolean, default: false, required: true },
    
    paquete: [
      { type: mongoose.Schema.Types.ObjectId, ref: "PaquetePD", default: [] },
    ],
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
    descripcion: { type: String, default: "" },
    descripcionLarga: { type: String, default: "" },
    imagenes: { type: [String], default: [] },

    precioBase: { type: Number, default: 0 },
    descuento: { type: Number, default: 0 },

    disponibilidad: { type: Number, default: null },
    fechaEdicionLimitada: { type: Date, default: Date.now },
    link: { type: String },
  },
  { timestamps: true }
);

// Virtual para precio final
productoDigitalSchema.virtual("precioFinal").get(function () {
  const base = this.precioBase || 0;
  const desc = this.descuento || 0; // ejemplo: 10 = 10%
  return base - (base*desc / 100);
});

// Pre hook para link automático
productoDigitalSchema.pre("save", function (next) {
  if (!this.link && this._id) {
    const safeId = encodeURIComponent(this._id.toString());
    this.link = `pages/subpaginas/producto-entrega.html?id=${safeId}`;
  }
  next();
});

const ProductoDigital = mongoose.model<IProductoDigitalDocument>(
  "ProductoDigital",
  productoDigitalSchema
);

export default ProductoDigital;
