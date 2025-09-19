import mongoose, { Schema, Document, Types } from 'mongoose'
import type { IProductoDigitalDocument } from './ProductoDigital.js'

export interface IPaquetePD {
  productos: Types.ObjectId[] | IProductoDigitalDocument[]
  paquete: number
  sku: string
  titulo: string

  estado?: 'Activo' | 'En Producción' | 'Pendiente'
  tipo?: string
  descripcion?: string

  precio?: number
  descuento?: number
  linkEntrega?: string

  createdAt?: Date
  updatedAt?: Date
}

export interface IPaquetePDDocument extends IPaquetePD, Document<Types.ObjectId> {
  precioFinal?: number
}

const paquetePDSchema = new Schema<IPaquetePDDocument>(
  {
    estado: {
      type: String,
      enum: ['Activo', 'En Producción', 'Pendiente'],
      default: 'En Producción',
      required: true,
    },
    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductoDigital', default: [] }],
    paquete: { type: Number, required: true, unique: true },
    tipo: { type: String, default: 'paquete' },
    sku: { type: String, required: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, default: '' },
    precio: { type: Number, default: 0 },
    descuento: { type: Number, default: 0 },
    linkEntrega: { type: String, default: '' },
  },
  { timestamps: true }
)

paquetePDSchema.virtual('precioFinal').get(function (this: IPaquetePDDocument) {
  if (Array.isArray(this.productos) && this.productos.length > 0) {
    const base = this.productos.reduce((acc, p) => {
      if (typeof (p as any).precioFinal === 'number') {
        return acc + (p as any).precioFinal
      }
      return acc
    }, 0)
    const desc = this.descuento || 0
    return base - (base * desc) / 100
  }
  return 0
})

paquetePDSchema.pre('save', function (next) {
  if (!this.linkEntrega && this._id) {
    const safeId = encodeURIComponent(this._id.toString())
    this.linkEntrega = `pages/subpaginas/paquete-entrega.html?id=${safeId}`
  }
  next()
})

const PaquetePD = mongoose.model<IPaquetePDDocument>('PaquetePD', paquetePDSchema)
export default PaquetePD