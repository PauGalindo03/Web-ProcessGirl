import { useState, useEffect, useCallback } from "react";

import type {
  Carrito,
  CarritoItem,
  CarritoItemProducto as _CarritoItemProducto,
  CarritoItemPaquete,
  ProductoDigital,
  PaquetePD,
} from "@types";

import { CarritoService } from "@/services/carritoService";

export interface Totales {
  totalBruto: number;
  totalDescuentos: number;
  totalFinal: number;
}

export const useCarrito = (userId?: string) => {
  const [carritoService] = useState(() => new CarritoService(userId));
  const [items, setItems] = useState<CarritoItem[]>([]);
  const [totales, setTotales] = useState<Totales>({
    totalBruto: 0,
    totalDescuentos: 0,
    totalFinal: 0,
  });
  const [loading, setLoading] = useState(false);
  const [carritoTipo, setCarritoTipo] = useState<"persistente" | "temporal">(
    "temporal"
  );

  // =======================
  // Obtener carrito
  // =======================
  const fetchCarrito = useCallback(async () => {
    setLoading(true);
    try {
      const carrito: Carrito = await carritoService.getCarrito();
      setItems(carrito.items);
      setCarritoTipo(carrito.tipo);
      const totales = await carritoService.calcularTotales();
      setTotales(totales);
    } finally {
      setLoading(false);
    }
  }, [carritoService]);

  useEffect(() => {
    fetchCarrito();
  }, [fetchCarrito]);

  // =======================
  // Agregar item
  // =======================
  const addItem = async (item: ProductoDigital | PaquetePD | CarritoItem) => {
    function isPaquete(
      item: ProductoDigital | PaquetePD | CarritoItem
    ): item is PaquetePD | CarritoItemPaquete {
      return item && item.tipo === "paquete" && "productos" in item;
    }

    setLoading(true);

    try {
      let adaptedItem: CarritoItem | null = null;

      if (item.tipo === "producto") {
        adaptedItem = {
          _id: item._id,
          tipo: "producto",
          item: item as ProductoDigital,
          precioBase: item.precioBase ?? 0,
          precioFinal: item.precioFinal ?? 0,
          descuento: item.descuento,
        };
      }
      if (isPaquete(item)) {
        adaptedItem = {
          _id: item._id,
          tipo: "paquete",
          titulo: item.titulo,
          productos: item.productos as ProductoDigital[],
          precioFinal: item.precioFinal ?? 0,
          descuento: item.descuento,
        };
      }

      if (!adaptedItem) {
        console.warn("Tipo de item no reconocido:", item);
        return;
      }

      const newItems = await carritoService.addItem(adaptedItem);
      setItems(newItems);
      const totales = await carritoService.calcularTotales();
      setTotales(totales);
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // Remover item por índice o _id
  // =======================
  const removeItem = async (indexOrId: string | number) => {
    setLoading(true);
    try {
      const newItems = await carritoService.removeItem(indexOrId);
      setItems(newItems);
      const totales = await carritoService.calcularTotales();
      setTotales(totales);
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // Limpiar carrito
  // =======================
  const clearCarrito = async () => {
    setLoading(true);
    try {
      const newItems = await carritoService.clearCarrito();
      setItems(newItems);
      setTotales({ totalBruto: 0, totalDescuentos: 0, totalFinal: 0 });
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // Merge carrito temporal con persistente
  // =======================
  const mergeCarrito = async () => {
    setLoading(true);
    try {
      const newItems = await carritoService.mergeCarrito();
      setItems(newItems);
      const totales = await carritoService.calcularTotales();
      setTotales(totales);
      setCarritoTipo("persistente");
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    totales,
    loading,
    carritoTipo,
    fetchCarrito,
    addItem,
    removeItem,
    clearCarrito,
    mergeCarrito,
  };
};
