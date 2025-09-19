"use client";
import styles from "./PaqueteHeader.module.css";

interface Props {
  titulo: string;
  descripcion?: string;
}

export default function PaqueteHeader({ titulo, descripcion }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={`titulo-bi ${styles.titulo}`}>{titulo}</h1>
      <p className={`texto-dec ${styles.descripcion}`}>
        {descripcion ??
          "Este paquete fue cuidadosamente curado para ofrecerte lo mejor en contenido digital."}
      </p>
    </header>
  );
}
