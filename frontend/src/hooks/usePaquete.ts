// src/hooks/usePaquetePD.ts
"use client";
import { useState, useEffect } from "react";

import type { PaquetePD } from "@types";

import { fallbackPaquetes } from "@/fallbacks/fallPaquetes";
import * as paqueteService from "@/services/paquetePDService";

const USE_FAKE = process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true";

const normalize = (p: PaquetePD): PaquetePD => {
  const precio = p.precio ?? 0;
  const descuento = p.descuento ?? 0;
  const precioFinal =
    p.precioFinal ?? Math.round(precio * (1 - descuento / 100) * 100) / 100;
  return { ...p, precioFinal };
};

export function usePaquetePD(id: string) {
  const [paquete, setPaquete] = useState<PaquetePD | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetch = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = USE_FAKE
          ? fallbackPaquetes.find(p => p._id === id)
          : await paqueteService.getPublicById(id);

        setPaquete(data ? normalize(data) : null);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Error al cargar paquete");
        setPaquete(null);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  return { paquete, loading, error };
}
