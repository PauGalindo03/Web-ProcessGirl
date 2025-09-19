// src/app/hooks/useProductosDigitales.ts
"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import type { ProductoDigital } from "@types";

import { fallbackProductos } from "@/fallbacks/fallProductos";
import * as productoService from "@/services/productoDigitalService";

const LOCAL_KEY = "ProcessGirl_productos";
const CACHE_DURATION_MS = 12 * 60 * 60 * 1000; // 12h
const LIMITED_POLL_MS = 15 * 1000; // 15s para ediciones limitadas
const FULL_REFRESH_MS = 5 * 60 * 1000; // 5min full refresh
const USE_FAKE = process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true";

export function useCachedProductosDigitales() {
  const [productos, setProductos] = useState<ProductoDigital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ref para controlar intervalos
  const pollRef = useRef<number | null>(null);
  const fullRef = useRef<number | null>(null);

  // Normalizar precio final simple (puedes reemplazar por lógica real)
  const normalize = (p: ProductoDigital): ProductoDigital => {
    const precioBase = p.precioBase ?? 0;
    const descuento = p.descuento ?? 0;
    const precioFinal = p.precioFinal ?? Math.round((precioBase * (1 - (descuento / 100))) * 100) / 100;
    return { ...p, precioFinal };
  };

  const fetchAll = useCallback(async (opts?: { minimal?: boolean }) => {
    if (USE_FAKE) {
      setProductos(fallbackProductos.map(normalize));
      return;
    }

    setLoading(!opts?.minimal);
    setError(null);
    try {
      const data = await productoService.obtenerPublicos(); // todos públicos
      const normalized = data.map(normalize);
      setProductos(normalized);

      // guardar cache solo si no hay ediciones limitadas
      const hasLimited = normalized.some(p => p.esEdicionLimitada);
      if (!hasLimited) {
        try {
          localStorage.setItem(LOCAL_KEY, JSON.stringify(normalized));
          localStorage.setItem(`${LOCAL_KEY}_timestamp`, Date.now().toString());
        } catch {}
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error al cargar productos");
      // fallback a cache
      try {
        const cached = localStorage.getItem(LOCAL_KEY);
        if (cached) setProductos(JSON.parse(cached));
      } catch {}
    } finally {
      setLoading(false);
    }
  }, []);

  // Poll específico solo para productos limitados: pide solo su disponibilidad (si tu API admite un endpoint, úsalo).
  // Aquí hacemos fetchAll minimal para refrescar cantidades.
  const pollLimited = useCallback(async () => {
    if (USE_FAKE) return;
    try {
      // Llamamos al backend con una petición "ligera" si tu API tiene, si no, llamamos fetchAll({ minimal: true })
      await fetchAll({ minimal: true });
    } catch {}
  }, [fetchAll]);

  useEffect(() => {
    if (USE_FAKE) {
      setProductos(fallbackProductos.map(normalize));
      return;
    }

    // 1) intentar cache
    try {
      const cached = localStorage.getItem(LOCAL_KEY);
      const timestamp = localStorage.getItem(`${LOCAL_KEY}_timestamp`);
      if (cached && timestamp) {
        const parsed: ProductoDigital[] = JSON.parse(cached);
        const expired = Date.now() - parseInt(timestamp, 10) > CACHE_DURATION_MS;
        const hasLimited = parsed.some(p => p.esEdicionLimitada);
        if (!expired && !hasLimited) {
          setProductos(parsed);
        }
      }
    } catch {}

    // 2) fetch inicial completo
    fetchAll();

    // 3) set polling:
    // -- pollLimited cada LIMITED_POLL_MS
    pollRef.current = window.setInterval(() => {
      // Solo poll si existen productos limitados en el estado actual
      const hasLimitedNow = productos.some(p => p.esEdicionLimitada);
      if (hasLimitedNow) pollLimited();
    }, LIMITED_POLL_MS);

    // -- full refresh menos frecuente
    fullRef.current = window.setInterval(() => {
      fetchAll();
    }, FULL_REFRESH_MS);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (fullRef.current) clearInterval(fullRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAll]);

  return { productos, loading, error, refresh: fetchAll, setProductos };
}
