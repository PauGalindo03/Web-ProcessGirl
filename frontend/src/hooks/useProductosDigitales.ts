// src/app/hooks/useProductosDigitales.ts
import { useState, useEffect, useCallback } from 'react';

import type { ProductoDigital } from "@types";

import * as productoService from '@/services/productoDigitalService';

export function useProductosDigitales(isAdmin = false) {
  const [productos, setProductos] = useState<ProductoDigital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = isAdmin
        ? await productoService.obtenerTodos()
        : await productoService.obtenerPublicos();

      // Aseguramos campos obligatorios
      const parsed: ProductoDigital[] = data.map(p => ({
        _id: p._id!,
        estado: p.estado ?? "Activo",
        paquete: p.paquete ?? [],
        categoria: p.categoria ?? [],
        tipo: p.tipo ?? "producto",
        sku: p.sku ?? "",
        titulo: p.titulo ?? "",
        descripcion: p.descripcion,
        descripcionLarga: p.descripcionLarga,
        imagenes: p.imagenes ?? [],
        precioBase: p.precioBase,
        descuento: p.descuento,
        esEdicionLimitada: p.esEdicionLimitada ?? false,
        disponibilidad: p.disponibilidad,
        fechaEdicionLimitada: p.fechaEdicionLimitada,
        link: p.link,
        precioFinal: p.precioFinal,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }));

      setProductos(parsed);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  return { productos, loading, error, refresh: fetchProductos };
}
