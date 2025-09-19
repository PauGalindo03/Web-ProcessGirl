import { Schema, model, Types } from "mongoose";
import type { IProductoDigitalDocument } from "./ProductoDigital.js";
import ProductoDigital from "./ProductoDigital.js";
import PaquetePD from "./PaquetePD.js";

export interface ICarritoItemProducto {
  _id: Types.ObjectId
  tipo: 'producto'
  item: Types.ObjectId | IProductoDigitalDocument
  precioBase: number
  precioFinal: number
  descuento?: number
}

export interface ICarritoItemPaquete {
  _id: Types.ObjectId
  tipo: 'paquete'
  titulo: string
  productos: (Types.ObjectId | IProductoDigitalDocument)[]
  precioFinal: number
  descuento?: number
}

export type ICarritoItem = ICarritoItemProducto | ICarritoItemPaquete

export interface ICarrito extends Document {
  user?: Types.ObjectId
  items: ICarritoItem[]
  actualizado?: Date
  createdAt?: Date
  updatedAt?: Date
}
// Schemas
const CarritoItemProductoSchema = new Schema<ICarritoItemProducto>(
  {
    tipo: { type: String, enum: ["producto"], required: true },
    item: { type: Schema.Types.ObjectId, ref: "ProductoDigital", required: true },
    precioBase: { type: Number, required: true },
    precioFinal: { type: Number, required: true },
    descuento: { type: Number, default: 0 },
  },
);

const CarritoItemPaqueteSchema = new Schema<ICarritoItemPaquete>(
  {
    tipo: { type: String, enum: ["paquete"], required: true },
    titulo: { type: String, required: true },
    productos: [{ type: Schema.Types.ObjectId, ref: "ProductoDigital", required: true }],
    precioFinal: { type: Number, required: true },
    descuento: { type: Number, default: 0 },
  },
);

// Discriminador base
const CarritoItemSchema = new Schema(
  { tipo: { type: String, required: true } },
  { discriminatorKey: "_tipoInterno",}
);

CarritoItemSchema.discriminator("producto", CarritoItemProductoSchema);
CarritoItemSchema.discriminator("paquete", CarritoItemPaqueteSchema);

// Carrito principal
const CarritoSchema = new Schema<ICarrito>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },
    items: [CarritoItemSchema],
    actualizado: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

CarritoSchema.pre("save", async function (next) {
  for (const item of this.items) {
    if (item.tipo === "producto") {
      const producto = await ProductoDigital.findById(item.item);
      if (producto) {
        const base = producto.precioBase || 0;
        const descuento = producto.descuento || 0;
        item.precioFinal = base - (base * descuento) / 100;
      }
    }

    if (item.tipo === "paquete") {
      const paquete = await PaquetePD.findById(item._id).populate("productos");
      if (paquete && Array.isArray(paquete.productos)) {
        const base = paquete.productos.reduce((acc, p) => {
          const precio = (p as any).precioBase || 0;
          return acc + precio;
        }, 0);
        const descuento = paquete.descuento || 0;
        item.precioFinal = base - (base * descuento) / 100;
      }
    }
  }

  next();
});

export default model<ICarrito>("Carrito", CarritoSchema);
