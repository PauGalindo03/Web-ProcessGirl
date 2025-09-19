"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

import type { Divisa } from "@types";
import type { ReactNode } from "react";

import { fallbackConfiguracion } from "@/fallbacks/fallConfiguracion";
import { useCachedConfiguracion } from "@/hooks/cached/useCachedConfiguracion";

const BASE_CURRENCY = "MXN";
const EXCHANGE_RATE_API_URL = `https://open.er-api.com/v6/latest/${BASE_CURRENCY}`;
const CACHE_DURATION_MS = 4 * 60 * 60 * 1000;

type CurrencyContextType = {
  selectedCurrency: Divisa;
  setCurrency: (codigo: string) => void;
  allActiveCurrencies: Divisa[];
  obtenerTasaDeCambio: (target: string) => Promise<number>;
  convertirPrecio: (precio: number, target: string) => Promise<number>;
};

const CurrencyContext = createContext<CurrencyContextType>({
  selectedCurrency: fallbackConfiguracion.divisas.find((c) => c.codigo === BASE_CURRENCY)!,
  setCurrency: () => {},
  allActiveCurrencies: fallbackConfiguracion.divisas,
  obtenerTasaDeCambio: async () => 1,
  convertirPrecio: async (precio) => precio,
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const config = useCachedConfiguracion();

  const [allActiveCurrencies, setAllActiveCurrencies] = useState<Divisa[]>(fallbackConfiguracion.divisas);
  const [selectedCurrency, setSelectedCurrency] = useState<Divisa>(
    fallbackConfiguracion.divisas.find((c) => c.codigo === BASE_CURRENCY)!
  );

  // Inicializa desde localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("selectedCurrency");
      if (stored) {
        const found =
          fallbackConfiguracion.divisas.find((c) => c.codigo === stored) ??
          fallbackConfiguracion.divisas.find((c) => c.codigo === BASE_CURRENCY)!;
        setSelectedCurrency(found);
      }
    } catch (err) {
      console.warn("Error leyendo divisa seleccionada:", err);
    }
  }, []);

  // Actualiza divisas cuando cambia la configuración
  useEffect(() => {
    if (config?.divisas) {
      const activas = config.divisas.filter((d) => d.activo);
      const tieneSoloMXN = activas.length === 1 && activas[0].codigo === BASE_CURRENCY;

      const final = activas.length === 0 || tieneSoloMXN
        ? fallbackConfiguracion.divisas
        : activas;

      setAllActiveCurrencies(final);
      localStorage.setItem("currencies", JSON.stringify(final));
      localStorage.setItem("currenciesTimestamp", Date.now().toString());
    }
  }, [config]);

  const setCurrency = (codigo: string) => {
    const currency =
      allActiveCurrencies.find((c) => c.codigo === codigo) ??
      fallbackConfiguracion.divisas.find((c) => c.codigo === BASE_CURRENCY)!;
    setSelectedCurrency(currency);
    localStorage.setItem("selectedCurrency", currency.codigo);
    window.dispatchEvent(new CustomEvent("currencyChanged", { detail: { newCurrency: currency.codigo } }));
  };

  const obtenerTasaDeCambio = async (targetCurrency: string) => {
    if (!EXCHANGE_RATE_API_URL || targetCurrency === BASE_CURRENCY) return 1;

    const cached = localStorage.getItem("exchangeRates");
    if (cached) {
      try {
        const { rates, timestamp, base } = JSON.parse(cached);
        if (
          base === BASE_CURRENCY &&
          Date.now() - timestamp < CACHE_DURATION_MS &&
          rates[targetCurrency]
        ) {
          return rates[targetCurrency];
        }
      } catch (err) {
        console.warn("Error parseando cache de tasas:", err);
      }
    }

    try {
      const res = await fetch(EXCHANGE_RATE_API_URL);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      localStorage.setItem("exchangeRates", JSON.stringify({
        rates: data.rates,
        timestamp: Date.now(),
        base: BASE_CURRENCY,
      }));
      return data.rates[targetCurrency] || 1;
    } catch (err) {
      console.warn("Error obteniendo tasa de cambio, usando 1 por defecto", err);
      return 1;
    }
  };

  const convertirPrecio = async (precioEnBase: number, target: string) => {
    const tasa = await obtenerTasaDeCambio(target);
    return precioEnBase * tasa;
  };

  return (
    <CurrencyContext.Provider
      value={{ selectedCurrency, setCurrency, allActiveCurrencies, obtenerTasaDeCambio, convertirPrecio }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
