// Cuando quieres mostrar algo rápido y resiliente, sin preocuparte por el backend
"use client";
import { useState, useEffect } from "react";

import type { Configuracion } from "@types";

import { fallbackConfiguracion } from "@/fallbacks/fallConfiguracion";
import * as configuracionService from "@/services/configuracionService";

const LOCAL_KEY = "ProcessGirl_config";
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 horas

export function useCachedConfiguracion(): Configuracion {
  const [config, setConfig] = useState<Configuracion>(fallbackConfiguracion);

  useEffect(() => {
    const loadFromCache = () => {
      try {
        const cached = localStorage.getItem(LOCAL_KEY);
        const timestamp = localStorage.getItem(`${LOCAL_KEY}_timestamp`);
        if (cached && timestamp) {
          const expired = Date.now() - parseInt(timestamp, 10) > CACHE_DURATION_MS;
          if (!expired) {
            setConfig(JSON.parse(cached));
            return true; // ya cargamos cache válido
          }
        }
      } catch (err) {
        console.warn("Error leyendo configuración cacheada:", err);
      }
      return false;
    };

    // primero intenta cargar cache
    const hasCache = loadFromCache();

    // luego intenta refrescar desde backend (aunque haya cache)
    const fetchConfiguracion = async () => {
      try {
        const data = await configuracionService.getConfiguracion();
        setConfig(data);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
        localStorage.setItem(`${LOCAL_KEY}_timestamp`, Date.now().toString());
      } catch (err) {
        if (!hasCache) {
          console.warn("Fallo al obtener configuración, usando fallback",err);
        } else {
          console.warn("Fallo al actualizar configuración, usando cache existente");
        }
      }
    };

    fetchConfiguracion();
  }, []);

  return config;
}
