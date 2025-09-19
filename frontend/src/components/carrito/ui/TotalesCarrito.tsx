"use client";
import type { Totales } from "@/hooks/useCarrito";

import styles from "./TotalesCarrito.module.css";


interface TotalesCarritoProps {
  totales: Totales;
}

export default function TotalesCarrito({ totales }: TotalesCarritoProps) {
  return (
    <div className={styles.totalesCarrito}>
      <p>Total bruto: ${totales.totalBruto.toFixed(2)}</p>
      <p>Descuentos: ${totales.totalDescuentos.toFixed(2)}</p>
      <p className={styles.final}>Total final: ${totales.totalFinal.toFixed(2)}</p>
    </div>
  );
}
