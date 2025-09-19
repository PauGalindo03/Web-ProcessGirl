"use client";
import Link from "next/link";

import styles from "./BotonesCTA.module.css"

interface BotonesCarritoProps {
  onVaciar: () => void;
}

export default function BotonesCarrito({ onVaciar }: BotonesCarritoProps) {
  return (
    <div className={`${styles.botonesCarrito} ${styles.botonesHeader}`}>
      <div className={styles.botonesSuperiores}>
        <button className="btn-cta3" onClick={onVaciar}>Vaciar carrito</button>
        <Link href="/carrito">
          <button className="btn-cta3">Ver carrito</button>
        </Link>
      </div>
      <button className={`btn-cta4 ${styles.botonInvertir}`}>Invertir</button>
    </div>
  );
}
