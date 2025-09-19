"use client";
import { useState, useEffect, useCallback, useRef } from "react";

import type { PaquetePD } from "@types";

import { fallbackPaquetes } from "@/fallbacks/fallPaquetes";
import * as paqueteService from "@/services/paquetePDService";

const LOCAL_KEY = "ProcessGirl_paquetes";
const CACHE_DURATION_MS = 12 * 60 * 60 * 1000; // 12h
const LIMITED_POLL_MS = 15 * 1000;
const FULL_REFRESH_MS = 5 * 60 * 1000;
const USE_FAKE = process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true";

/**
 * Normaliza un paquete, asegurando que precioFinal esté calculado.
 */
const normalize = (p: PaquetePD): PaquetePD => {
  const precio = p.precio ?? 0;
  const descuento = p.descuento ?? 0;
  const precioFinal =
    p.precioFinal ?? Math.round(precio * (1 - descuento / 100) * 100) / 100;
  return { ...p, precioFinal };
};

/**
 * Intenta cargar paquetes desde localStorage si no han expirado.
 */
const loadCachedPaquetes = (): PaquetePD[] | null => {
  try {
    const cached = localStorage.getItem(LOCAL_KEY);
    const timestamp = localStorage.getItem(`${LOCAL_KEY}_timestamp`);
    if (cached && timestamp) {
      const expired = Date.now() - parseInt(timestamp, 10) > CACHE_DURATION_MS;
      if (!expired) return JSON.parse(cached);
    }
  } catch {}
  return null;
};

export function useCachedPaquetesPD() {
  const [paquetes, setPaquetes] = useState<PaquetePD[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pollRef = useRef<number | null>(null);
  const fullRef = useRef<number | null>(null);

  const fetchAll = useCallback(async (opts?: { minimal?: boolean }) => {
    if (USE_FAKE) {
      setPaquetes(fallbackPaquetes.map(normalize));
      return;
    }

    setLoading(!opts?.minimal);
    setError(null);

    try {
      const data = await paqueteService.getPublicAll();
      const normalized = data.map(normalize);
      setPaquetes(normalized);

      const hasLimited = normalized.some(p =>
        p.productos.some(pr => pr.esEdicionLimitada)
      );
      if (!hasLimited) {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(normalized));
        localStorage.setItem(`${LOCAL_KEY}_timestamp`, Date.now().toString());
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error al cargar paquetes");

      const cached = loadCachedPaquetes();
      setPaquetes(cached ?? fallbackPaquetes);
    } finally {
      setLoading(false);
    }
  }, []);

  const pollLight = useCallback(async () => {
    if (!USE_FAKE) await fetchAll({ minimal: true });
  }, [fetchAll]);

  useEffect(() => {
    if (USE_FAKE) {
      setPaquetes(fallbackPaquetes.map(normalize));
      return;
    }

    const cached = loadCachedPaquetes();
    if (cached) setPaquetes(cached);

    fetchAll();

    pollRef.current = window.setInterval(() => {
      pollLight();
    }, LIMITED_POLL_MS);

    fullRef.current = window.setInterval(() => {
      fetchAll();
    }, FULL_REFRESH_MS);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (fullRef.current) clearInterval(fullRef.current);
    };
  }, [fetchAll, pollLight]);

  return { paquetes, loading, error, refresh: fetchAll, setPaquetes };
}
