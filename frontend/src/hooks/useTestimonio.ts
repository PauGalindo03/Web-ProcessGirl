// src/app/hooks/useTestimonios.ts
import { useState, useEffect, useCallback } from "react";

import type { Testimonio } from "@types";

import * as testimonioService from "@/services/testimonioService";

export function useTestimonios(isAdmin = false) {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = isAdmin
        ? await testimonioService.getAll()
        : await testimonioService.getPublicAll();

      // Aseguramos campos obligatorios y predeterminados
      const parsed: Testimonio[] = data.map((t) => ({
        _id: t._id!,
        estado: t.estado ?? "Activo",
        nombre: t.nombre ?? "Anonimo",
        testimonio: t.testimonio,
        img: t.img ?? [],
        user: t.user,
        rating: t.rating ?? 5,
        producto: t.producto,
        paquete: t.paquete,
        createdAt: t.createdAt
          ? new Date(t.createdAt).toISOString()
          : new Date().toISOString(),
        updatedAt: t.updatedAt
          ? new Date(t.updatedAt).toISOString()
          : new Date().toISOString(),
      }));

      setTestimonios(parsed);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error al cargar testimonios");
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchTestimonios();
  }, [fetchTestimonios]);

  return { testimonios, loading, error, refresh: fetchTestimonios };
}
