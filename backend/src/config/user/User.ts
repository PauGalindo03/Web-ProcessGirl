import mongoose, { Document, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

export type Role = "admin" | "user";

export interface ICupon {
  codigo: string;
  tipoDescuento:
    | "porcentaje"
    | "fijo"
    | "acceso gratuito"
    | "primera compra"
    | "cantidad comprada";
  activo: boolean;
  aplicado: boolean;
  descripcion?: string;
  terminos?: string;
  valor?: number; // porcentaje o fijo
  condicionCantidad?: number;
  fechaExpiracion?: Date;
}

export interface IHistorialItem {
  itemId: string;
  tipo: "producto" | "paquete";
  nombre: string;
  precioPagado: number;
  linkDescarga?: string;
}

export interface IHistorialCompra {
  pedidoId: string;
  fechaCompra: Date;
  items: IHistorialItem[];
  totalPedido: number;
}

// Dirección como subesquema
export interface IDireccion {
  pais: string;
  calle?: string;
  numero?: string;
  colonia?: string;
  codigoPostal?: string;
  ciudad?: string;
  estado?: string;
}

export interface IUser extends Document {
  email: string;
  username: string;
  nombres: string;
  apellidos: string;
  password: string;
  fotoPerfilUrl?: string | null;
  role: Role;
  fechaRegistro?: Date;
  historialCompras?: IHistorialCompra[];
  plantillasFavoritas?: Types.ObjectId[];
  cupones?: ICupon[];
  direccion?: IDireccion;

  // Campos de verificación de email
  isEmailVerified: boolean;
  accountVerificationToken?: string | null;
  accountVerificationTokenExpires?: Date | null;

  comparePassword(candidatePassword: string): Promise<boolean>;
  nombreCompleto?: string; // virtual
  direccionCompleta?: string; // virtual

  createdAt?: Date
  updatedAt?: Date
}

const cuponSchema = new Schema<ICupon>(
  {
    codigo: { type: String, required: true, uppercase: true, trim: true },
    descripcion: { type: String, trim: true },
    terminos: { type: String, trim: true },
    tipoDescuento: {
      type: String,
      enum: [
        "porcentaje",
        "fijo",
        "acceso gratuito",
        "primera compra",
        "cantidad comprada",
      ],
      default: "porcentaje",
      required: true,
    },
    valor: { type: Number, default: 0 },
    condicionCantidad: { type: Number, default: 0 },
    fechaExpiracion: Date,
    activo: { type: Boolean, default: true },
    aplicado: { type: Boolean, default: false },
  },
  { _id: false }
);

const direccionSchema = new Schema<IDireccion>(
  {
    calle: { type: String, trim: true },
    numero: { type: String, trim: true },
    colonia: { type: String, trim: true },
    codigoPostal: { type: String, trim: true },
    ciudad: { type: String, trim: true },
    estado: { type: String, trim: true },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "user"], default: "user", required: true},
    username: { type: String, unique: true },
    fotoPerfilUrl: { type: String, default: "" },
    historialCompras: { type: [Object], default: [] },
    plantillasFavoritas: [{ type: Schema.Types.ObjectId, ref: "Producto" }],
    cupones: [cuponSchema],
    fechaRegistro: { type: Date, default: Date.now },
    direccion: direccionSchema,

    isEmailVerified: { type: Boolean, default: false },
    accountVerificationToken: { type: String, select: false },
    accountVerificationTokenExpires: { type: Date, select: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual: Nombre completo
UserSchema.virtual("nombreCompleto").get(function (this: IUser) {
  return `${this.nombres} ${this.apellidos}`;
});

// Virtual: Dirección completa
UserSchema.virtual("direccionCompleta").get(function (this: IUser) {
  if (!this.direccion) return "";

  const capitalize = (str?: string) =>
    str
      ? str
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase())
          .trim()
      : "";

  const calle = capitalize(this.direccion.calle);
  const numero = this.direccion.numero?.trim() || "";
  const colonia = capitalize(this.direccion.colonia);
  const codigoPostal = this.direccion.codigoPostal?.trim() || "";
  const ciudad = capitalize(this.direccion.ciudad);
  const estado = capitalize(this.direccion.estado);
  const pais = capitalize(this.direccion.pais ?? "México"); // default si no se especifica

  const partes = [
    `${calle} ${numero}`.trim(),
    colonia,
    codigoPostal,
    ciudad,
    estado,
    pais,
  ].filter(Boolean); // elimina campos vacíos

  return partes.join(", ");
});

// Hash de contraseña antes de guardar
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Comparar contraseña
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
