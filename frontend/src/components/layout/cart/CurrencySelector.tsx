"use client";
import { useState, useEffect, useRef } from "react";

import styles from "./CurrencySelector.module.css";

import { useCurrency } from "@/context/CurrenciesContext";

export default function CurrencySelector() {
  const { selectedCurrency, setCurrency, allActiveCurrencies } = useCurrency();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // ✅ Inicializa loading según si ya hay divisas
  const [loading, setLoading] = useState(allActiveCurrencies.length === 0);

  // ✅ Actualiza loading si llegan divisas después
  useEffect(() => {
    if (allActiveCurrencies.length > 0) {
      setLoading(false);
    }
  }, [allActiveCurrencies]);

  // ✅ Solo muestra "Cargando..." si no hay divisas aún
  if (loading && allActiveCurrencies.length === 0) {
    return <div className={styles.loading}>Cargando divisas...</div>;
  }

  // ✅ Solo muestra error si no hay divisas y ya terminó la carga
  if (!loading && allActiveCurrencies.length === 0) {
    return <div className={styles.error}>No hay divisas disponibles</div>;
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.selector}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        {selectedCurrency.codigo}
      </button>

      <ul className={`${styles.options} ${open ? styles.show : ""}`}>
        {allActiveCurrencies.map((c) => (
          <li key={c.codigo}>
            <button
              type="button"
              className={styles.currencyButton}
              onClick={() => {
                setCurrency(c.codigo);
                setOpen(false);
              }}
            >
              {c.codigo}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
