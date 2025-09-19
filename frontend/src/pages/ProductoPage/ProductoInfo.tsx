"use client";
import type { ProductoDigital } from "@types";

import styles from "./modules/ProductoInfo.module.css";

type Props = {
  producto: ProductoDigital;
};

export default function ProductoInfo({ producto }: Props) {
  const { titulo, precioBase, precioFinal, descripcion, descripcionLarga } = producto;

  return (
    <div className={styles.infoBox}>
      <h1 className={styles.titulo}>{titulo}</h1>

      <div className={styles.precioBox}>
        <span className={styles.precioFinal}>
          {precioFinal ? `$${precioFinal}` : "Gratis"}
        </span>
        {precioBase > (precioFinal ?? 0) && (
          <span className={styles.precioBase}>${precioBase}</span>
        )}
      </div>

      {descripcion && (
        <p className={styles.descripcion}>{descripcion}</p>
      )}

      {descripcionLarga && (
        <div
          className={styles.descripcionLarga}
          dangerouslySetInnerHTML={{ __html: descripcionLarga }}
        />
      )}
    </div>
  );
}
