import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITestimonio {
  estado?: "Activo" | "En Producción";
  nombre: string;              // nombre visible del usuario o alias
  testimonio?: string;
  img?: string[];              // URLs de imágenes
  user: Types.ObjectId;        // referencia al usuario que lo deja
  rating: number;              // de 1 a 5

  // Opcional: para calificar un producto, paquete o servicio general
  producto?: Types.ObjectId;   // referencia a ProductoDigital
  paquete?: Types.ObjectId;    // referencia a PaquetePD

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITestimonioDocument extends ITestimonio, Document<Types.ObjectId> {}

const testimoniosSchema = new Schema<ITestimonioDocument>(
  {
    estado: {
      type: String,
      enum: ["Activo", "En Producción"],
      default: "En Producción",
      required: true,
    },
    nombre: { type: String, required: true },
    testimonio: { type: String, default: "" },
    img: { type: [String], default: [] },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    producto: { type: Schema.Types.ObjectId, ref: "ProductoDigital" },
    paquete: { type: Schema.Types.ObjectId, ref: "PaquetePD" },
  },
  { timestamps: true }
);

const Testimonio = mongoose.model<ITestimonioDocument>("Testimonio", testimoniosSchema);

export default Testimonio;