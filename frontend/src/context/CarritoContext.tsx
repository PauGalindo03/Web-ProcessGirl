"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import type { Carrito, CarritoItem } from "@types";
import type { ReactNode } from "react";

import { CarritoService } from "@/services/carritoService";

type Totales = {
  totalBruto: number;
  totalDescuentos: number;
  totalFinal: number;
};

type CarritoContextType = {
  carrito: Carrito | null;
  carritoTipo: Carrito["tipo"] | null;
  items: CarritoItem[];
  totales: Totales;
  loading: boolean;
  addItem: (item: Partial<CarritoItem>) => Promise<void>;
  removeItem: (indexOrId: string | number) => Promise<void>;
  clearCarrito: () => Promise<void>;
  mergeCarrito: () => Promise<void>;
  refreshCarrito: () => Promise<void>;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<Carrito | null>(null);
  const [items, setItems] = useState<CarritoItem[]>([]);
  const [totales, setTotales] = useState<Totales>({
    totalBruto: 0,
    totalDescuentos: 0,
    totalFinal: 0,
  });
  const [loading, setLoading] = useState(true);

  const carritoService = useMemo(() => new CarritoService(), []);

  const refreshCarrito = useCallback(async () => {
    setLoading(true);
    try {
      const data = await carritoService.getCarrito();
      setCarrito(data);
      setItems(data.items);
      const t = await carritoService.calcularTotales();
      setTotales(t);
    } finally {
      setLoading(false);
    }
  }, [carritoService]);

  useEffect(() => {
    refreshCarrito();
  }, [refreshCarrito]);

  const addItem = async (item: Partial<CarritoItem>) => {
    if (
      !item ||
      !item.tipo ||
      !item.precioFinal ||
      !item._id || // ✅ validamos que _id exista
      (item.tipo === "producto" && !("item" in item)) ||
      (item.tipo === "paquete" && !("productos" in item))
    ) {
      console.warn("Item inválido:", item);
      return;
    }

    // ✅ Type assertion segura
    await carritoService.addItem(item as CarritoItem);
    await refreshCarrito();
  };

  const removeItem = async (indexOrId: string | number) => {
    await carritoService.removeItem(indexOrId);
    await refreshCarrito();
  };

  const clearCarrito = async () => {
    await carritoService.clearCarrito();
    await refreshCarrito();
  };

  const mergeCarrito = async () => {
    await carritoService.mergeCarrito();
    await refreshCarrito();
  };

  const carritoTipo = carrito?.tipo ?? null;

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        carritoTipo,
        items,
        totales,
        loading,
        addItem,
        removeItem,
        clearCarrito,
        mergeCarrito,
        refreshCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context)
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return context;
};
