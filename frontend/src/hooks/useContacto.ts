// src/app/hooks/useContactos.ts
import { useState, useEffect, useCallback } from "react";

import type { Contacto } from "@types";

import * as contactoService from "@/services/contactoService";

export function useContactos(isAdmin = false) {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContactos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = isAdmin
        ? await contactoService.getAllContactos()
        : await contactoService.getPublicContactos();

      // Aseguramos que los campos obligatorios tengan valor
      const contactosParsed: Contacto[] = data.map((c) => ({
        _id: c._id!,
        estado: c.estado ?? "Activo",
        objetivo: c.objetivo ?? "",
        titulo: c.titulo ?? "",
        texto: c.texto ?? "",
        cta: c.cta ?? "",
        orden: c.orden ?? 0,
        enlace: c.enlace,
        preview: c.preview,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      }));

      setContactos(contactosParsed);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error al cargar contactos");
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchContactos();
  }, [fetchContactos]);

  return { contactos, loading, error, refresh: fetchContactos };
}
