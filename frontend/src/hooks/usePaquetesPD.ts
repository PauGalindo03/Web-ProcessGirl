// src/app/hooks/usePaquetesPD.ts
import { useState, useEffect, useCallback } from 'react';

import type { PaquetePD } from "@types";

import * as paqueteService from '@/services/paquetePDService';

export function usePaquetesPD(isAdmin = false) {
  const [paquetes, setPaquetes] = useState<PaquetePD[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPaquetes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = isAdmin
        ? await paqueteService.getAll()
        : await paqueteService.getPublicAll();

      // Aseguramos que los campos obligatorios tengan valor
      const paquetesParsed: PaquetePD[] = data.map(p => ({
        _id: p._id!,
        estado: p.estado ?? "Activo",
        productos: p.productos ?? [],
        paquete: p.paquete ?? 0,
        tipo: p.tipo ?? "paquete",
        sku: p.sku ?? "",
        titulo: p.titulo ?? "",
        descripcion: p.descripcion,
        precio: p.precio,
        descuento: p.descuento,
        linkEntrega: p.linkEntrega,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }));

      setPaquetes(paquetesParsed);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error al cargar paquetes");
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchPaquetes();
  }, [fetchPaquetes]);

  return { paquetes, loading, error, refresh: fetchPaquetes };
}
