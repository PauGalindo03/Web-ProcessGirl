// Cuando necesitas saber si está cargando, si hubo error, o quieres control total
import { useState, useEffect, useCallback } from "react";

import type { Configuracion } from "@types";

import { fallbackConfiguracion } from "@/fallbacks/fallConfiguracion";
import * as configuracionService from "@/services/configuracionService";

const LOCAL_KEY = "ProcessGirl_config";

export function useConfiguracion() {
  const [config, setConfig] = useState<Configuracion | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConfiguracion = useCallback(async () => {
    setLoading(true);
    setError(null);

    // 1. Leer desde localStorage si existe
    const cached = localStorage.getItem(LOCAL_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setConfig(parsed);
      } catch {
        console.warn("Configuración en localStorage corrupta");
      }
    }

    // 2. Hacer fetch real en segundo plano
    try {
      const data = await configuracionService.getConfiguracion();
      setConfig(data);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    } catch (err: unknown) {
      console.warn("Fallo al obtener configuración, usando fallback");
      setConfig(fallbackConfiguracion);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(fallbackConfiguracion));
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al cargar configuración");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const actualizarConfiguracion = useCallback(
    async (newConfig: Configuracion) => {
      setLoading(true);
      setError(null);
      try {
        const data = await configuracionService.updateConfiguracion(newConfig);
        setConfig(data);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
        return data;
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error al actualizar configuración");
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchConfiguracion();
  }, [fetchConfiguracion]);

  return {
    config,
    loading,
    error,
    fetchConfiguracion,
    actualizarConfiguracion,
  };
}
