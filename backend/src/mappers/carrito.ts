import type {
  ICarritoItem,
  ICarritoItemProducto,
  ICarritoItemPaquete,
} from '../models/Carrito.js'
import type { CarritoItem, CarritoItemProducto, CarritoItemPaquete } from '../../../packages/types/carrito.js'
import { mapProductoDigital } from './productoDigital.js'

export function toPlanoItem(item: ICarritoItem): CarritoItem {
  if (item.tipo === 'producto') {
    const prod = (item as ICarritoItemProducto).item as any
    const plano: CarritoItemProducto = {
      _id: item._id.toString(),
      tipo: 'producto',
      item: mapProductoDigital(prod),
      precioBase: prod.precioBase,
      precioFinal: item.precioFinal,
    }

    if (item.descuento !== undefined) plano.descuento = item.descuento
    if (item.link !== undefined) plano.link = item.link

    return plano
  }

  if (item.tipo === 'paquete') {
    const pack = item as ICarritoItemPaquete
    const plano: CarritoItemPaquete = {
      _id: pack._id.toString(),
      tipo: 'paquete',
      titulo: pack.titulo,
      productos: (pack.productos as any[]).map(mapProductoDigital),
      precioFinal: pack.precioFinal,
    }

    if (pack.descuento !== undefined) plano.descuento = pack.descuento
    if (pack.link !== undefined) plano.link = pack.link

    return plano
  }

  throw new Error('Tipo de item desconocido')
}