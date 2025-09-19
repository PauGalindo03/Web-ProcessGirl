"use client";
import { motion } from "framer-motion";

import type { ProductoDigital } from "@types";

import styles from "./modules/ProductoPrecioBox.module.css";

type Props = {
  producto: ProductoDigital;
  onCTA: () => void;
};

export default function ProductoPrecioBox({ producto, onCTA }: Props) {
  const { precioBase, precioFinal, descuento } = producto;

  const ahorro =
    precioBase && precioFinal ? precioBase - precioFinal : undefined;

  return (
    <div className={styles.valorBox}>
      <div className={styles.valorItem}>
        <span className={styles.label}>Precio base:</span>
        <span className={styles.valor}>${precioBase.toFixed(2)}</span>
      </div>
      <div className={styles.valorItem}>
        <span className={styles.label}>Precio final:</span>
        <span className={styles.precioFinal}>
          ${precioFinal?.toFixed(2) ?? precioBase.toFixed(2)}
        </span>
      </div>
      {ahorro && ahorro > 0 && (
        <div className={styles.valorItem}>
          <span className={styles.label}>Ahorro:</span>
          <span className={styles.ahorro}>${ahorro.toFixed(2)}</span>
        </div>
      )}
      {descuento && descuento > 0 && (
        <div className={styles.valorItem}>
          <span className={styles.label}>Descuento:</span>
          <span className={styles.descuento}>{descuento}%</span>
        </div>
      )}

      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 20px rgba(0, 200, 255, 0.6)",
          background: "radial-gradient(circle, #6da7cc, #ddeffa)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={styles.portalButton}
        onClick={onCTA}
      >
        Lo quiero
      </motion.button>
    </div>
  );
}
