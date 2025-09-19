// src/services/carritoService.ts
import type {
  Carrito,
  CarritoItem,
  CarritoItemProducto,
  CarritoItemPaquete,
  CarritoPersistente,
} from "@types";

import api from "./api";

const STORAGE_KEY = "carritoTemp";

function loadCarritoTemp(): CarritoItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCarritoTemp(items: CarritoItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // fallback silencioso
  }
}

export class CarritoService {
  private carritoTemp: CarritoItem[] = loadCarritoTemp();
  private userId?: string;

  constructor(userId?: string) {
    this.userId = userId;
  }

  private isRegistered(): boolean {
    return !!this.userId;
  }

  async getCarrito(): Promise<Carrito> {
    if (this.isRegistered()) {
      const res = await api.get<CarritoPersistente>("/user/carrito");
      return { ...res.data, tipo: "persistente" };
    }

    return {
      _id: "temp",
      tipo: "temporal",
      user: "temp",
      items: this.carritoTemp,
      actualizado: new Date().toISOString(),
    };
  }

  async addItem(item: CarritoItem): Promise<CarritoItem[]> {
    if (this.isRegistered()) {
      const res = await api.post<CarritoItem[]>("/user/carrito", item);
      return res.data;
    }

    this.carritoTemp.push(item as CarritoItem);
    saveCarritoTemp(this.carritoTemp);
    return this.carritoTemp;
  }

  async removeItem(indexOrId: string | number): Promise<CarritoItem[]> {
    if (this.isRegistered()) {
      const res = await api.delete<CarritoItem[]>(`/user/carrito/${indexOrId}`);
      return res.data;
    }

    if (typeof indexOrId === "number") {
      this.carritoTemp.splice(indexOrId, 1);
    } else {
      this.carritoTemp = this.carritoTemp.filter(
        (item) => item._id !== indexOrId
      );
    }

    saveCarritoTemp(this.carritoTemp);
    return this.carritoTemp;
  }

  async clearCarrito(): Promise<CarritoItem[]> {
    if (this.isRegistered()) {
      const res = await api.delete<CarritoItem[]>("/user/carrito");
      return res.data;
    }

    this.carritoTemp = [];
    saveCarritoTemp(this.carritoTemp);
    return this.carritoTemp;
  }

  async mergeCarrito(): Promise<CarritoItem[]> {
    if (!this.isRegistered()) return this.carritoTemp;

    const res = await api.get<CarritoPersistente>("/user/carrito");
    const persistenteItems = res.data.items;
    const combinado = [...persistenteItems];

    for (const tempItem of this.carritoTemp) {
      const yaExiste = persistenteItems.some((item) => {
        if (item.tipo !== tempItem.tipo) return false;
        if (item.tipo === "producto" && tempItem.tipo === "producto") {
          return item.item._id === tempItem.item._id;
        }
        if (item.tipo === "paquete" && tempItem.tipo === "paquete") {
          return item._id === tempItem._id;
        }
        return false;
      });

      if (!yaExiste) {
        combinado.push(tempItem);
      }
    }

    const updated = await api.put<CarritoItem[]>("/user/carrito", combinado);
    this.carritoTemp = [];
    saveCarritoTemp(this.carritoTemp);
    return updated.data;
  }

  async calcularTotales(): Promise<{
    totalBruto: number;
    totalDescuentos: number;
    totalFinal: number;
  }> {
    const carrito = await this.getCarrito();
    let totalBruto = 0;
    let totalDescuentos = 0;

    for (const item of carrito.items) {
      if (item.tipo === "producto") {
        const prod = item as CarritoItemProducto;
        const subtotal = prod.item?.precioBase ?? prod.precioBase ?? 0;
        const descuento = prod.item?.descuento
          ? (subtotal * prod.item.descuento) / 100
          : prod.descuento
          ? (subtotal * prod.descuento) / 100
          : 0;
        totalBruto += subtotal;
        totalDescuentos += descuento;
      }

      if (item.tipo === "paquete") {
        const pack = item as CarritoItemPaquete;
        const subtotalPaquete = pack.productos.reduce(
          (acc, p) => acc + (p.precioBase || 0),
          0
        );
        const descuentoProductos = pack.productos.reduce(
          (acc, p) => acc + ((p.precioBase || 0) * (p.descuento || 0)) / 100,
          0
        );
        const descuentoPaquete = pack.descuento
          ? (subtotalPaquete * pack.descuento) / 100
          : 0;
        totalBruto += subtotalPaquete;
        totalDescuentos += descuentoProductos + descuentoPaquete;
      }
    }

    return {
      totalBruto,
      totalDescuentos,
      totalFinal: totalBruto - totalDescuentos,
    };
  }
}
