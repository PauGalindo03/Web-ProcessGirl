"use client";
import { motion } from "framer-motion";

import styles from "./PaqueteValorBox.module.css";

interface Props {
  valorOriginal: number;
  precioPaquete: number;
  ahorro: number;
  onCTA: () => void;
}

export default function PaqueteValorBox({
  valorOriginal,
  precioPaquete,
  ahorro,
  onCTA,
}: Props) {
  return (
    <div className={styles.valorBox}>
      <div className={styles.valorItem}>
        <span className={styles.label}>Valor original:</span>
        <span className={styles.valor}>${valorOriginal.toFixed(2)}</span>
      </div>
      <div className={styles.valorItem}>
        <span className={styles.label}>Precio del paquete:</span>
        <span className={styles.precioFinal}>${precioPaquete.toFixed(2)}</span>
      </div>
      {ahorro > 0 && (
        <div className={styles.valorItem}>
          <span className={styles.label}>Ahorro total:</span>
          <span className={styles.ahorro}>${ahorro.toFixed(2)}</span>
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
          ¡Acceder al paquete ahora!
        </motion.button>
    </div>
  );
}
