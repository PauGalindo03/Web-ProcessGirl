import Carrito from "../models/Carrito.js"
import type { ICarritoItem } from "../models/Carrito.js"
import type { CarritoItem } from "../../../packages/types/carrito.js"
import { toPlanoItem } from "../mappers/carrito.js"

export class CarritoService {
  private carritoTemp: ICarritoItem[] = []

  constructor(private userId?: string) {}

  private isRegistered(): boolean {
    return !!this.userId
  }

  // =======================
  // GET Carrito
  // =======================
  async getCarrito(): Promise<CarritoItem[]> {
    if (this.isRegistered()) {
      const carrito = await Carrito.findOne({ user: this.userId })
        .populate("items.item")
        .populate("items.productos")
        .lean({ virtuals: true })

      return carrito?.items.map(toPlanoItem) || []
    }
    return this.carritoTemp.map(toPlanoItem)
  }

  // =======================
  // ADD Item
  // =======================
  async addItem(item: ICarritoItem): Promise<CarritoItem[]> {
    if (this.isRegistered()) {
      let carrito = await Carrito.findOne({ user: this.userId })
        .populate("items.item")
        .populate("items.productos")

      if (!carrito) carrito = new Carrito({ user: this.userId, items: [] })

      carrito.items.push(item)
      carrito.actualizado = new Date()
      await carrito.save()

      return carrito.items.map(toPlanoItem)
    }

    this.carritoTemp.push(item)
    return this.carritoTemp.map(toPlanoItem)
  }

  // =======================
  // REMOVE Item
  // =======================
  async removeItem(itemIndexOrId: number | string): Promise<CarritoItem[]> {
    if (this.isRegistered()) {
      const carrito = await Carrito.findOne({ user: this.userId })
        .populate("items.item")
        .populate("items.productos")

      if (!carrito) throw new Error("Carrito no encontrado")

      carrito.items = carrito.items.filter((item, index) =>
        typeof itemIndexOrId === "number"
          ? index !== itemIndexOrId
          : (item as any)._id?.toString() !== itemIndexOrId
      )

      carrito.actualizado = new Date()
      await carrito.save()

      return carrito.items.map(toPlanoItem)
    }

    if (typeof itemIndexOrId === "number") {
      this.carritoTemp.splice(itemIndexOrId, 1)
    }
    return this.carritoTemp.map(toPlanoItem)
  }

  // =======================
  // CLEAR Carrito
  // =======================
  async clearCarrito(): Promise<CarritoItem[]> {
    if (this.isRegistered()) {
      const carrito = await Carrito.findOne({ user: this.userId })
        .populate("items.item")
        .populate("items.productos")

      if (!carrito) throw new Error("Carrito no encontrado")

      carrito.items = []
      carrito.actualizado = new Date()
      await carrito.save()

      return carrito.items.map(toPlanoItem)
    }

    this.carritoTemp = []
    return this.carritoTemp.map(toPlanoItem)
  }

  // =======================
  // MERGE Carrito temporal con persistente
  // =======================
  async mergeCarrito(carritoTemporal: ICarritoItem[]): Promise<CarritoItem[]> {
    if (!this.isRegistered()) return carritoTemporal.map(toPlanoItem)

    const carrito = await Carrito.findOne({ user: this.userId })
      .populate("items.item")
      .populate("items.productos")

    if (!carrito) {
      const nuevoCarrito = new Carrito({
        user: this.userId,
        items: carritoTemporal,
        actualizado: new Date(),
      })
      await nuevoCarrito.save()
      return nuevoCarrito.items.map(toPlanoItem)
    }

    const combinado = [...carrito.items]

    for (const tempItem of carritoTemporal) {
      const yaExiste = carrito.items.some((item) => {
        if (item.tipo !== tempItem.tipo) return false

        if (item.tipo === "producto" && tempItem.tipo === "producto") {
          return item.item.toString() === tempItem.item.toString()
        }

        if (item.tipo === "paquete" && tempItem.tipo === "paquete") {
          return item._id?.toString() === tempItem._id?.toString()
        }

        return false
      })

      if (!yaExiste) {
        combinado.push(tempItem)
      }
    }

    carrito.items = combinado
    carrito.actualizado = new Date()
    await carrito.save()

    return carrito.items.map(toPlanoItem)
  }

  // =======================
  // Calcular totales
  // =======================
  async calcularTotales(): Promise<{
    totalBruto: number
    totalDescuentos: number
    totalFinal: number
  }> {
    const items = await this.getCarrito()

    let totalBruto = 0
    let totalDescuentos = 0

    for (const item of items) {
      if (item.tipo === "producto") {
        const base = item.item.precioBase || 0
        const descuento = item.item.descuento
          ? (base * item.item.descuento) / 100
          : 0

        totalBruto += base
        totalDescuentos += descuento
      }

      if (item.tipo === "paquete") {
        const base = item.productos.reduce(
          (acc, p) => acc + (p.precioBase || 0),
          0
        )
        const descuentoProductos = item.productos.reduce(
          (acc, p) =>
            acc + ((p.precioBase || 0) * (p.descuento || 0)) / 100,
          0
        )
        const descuentoPaquete = item.descuento
          ? (base * item.descuento) / 100
          : 0

        totalBruto += base
        totalDescuentos += descuentoProductos + descuentoPaquete
      }
    }

    return {
      totalBruto,
      totalDescuentos,
      totalFinal: totalBruto - totalDescuentos,
    }
  }
}
