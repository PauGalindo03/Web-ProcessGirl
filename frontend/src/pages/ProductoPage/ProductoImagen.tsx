"use client";
import { useState } from "react";

import type { ProductoDigital } from "@types";

import styles from "./modules/ProductoImagen.module.css";

import ModalGaleria from "@/components/common/media/ModalGaleria";

type Props = {
  producto: ProductoDigital;
};

export default function ProductoImagen({ producto }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const mainImage =
    producto.imagenes?.find((img) => img.endsWith("cuadrada.png")) ??
    "/img/placeholder-catalog.png";

  const isSoldOut =
    producto.esEdicionLimitada &&
    typeof producto.disponibilidad === "number" &&
    producto.disponibilidad <= 0;

  return (
    <div className={styles.imagenBox}>
      <div className={styles.imagenWrapper}>
        <img src={mainImage} alt={producto.titulo} className={styles.imagen} />

        {producto.esEdicionLimitada && (
          <div className={styles.badge}>Edición limitada</div>
        )}

        {producto.esEdicionLimitada &&
          typeof producto.disponibilidad === "number" && (
            <p className={styles.stock}>
              {isSoldOut
                ? "Agotado"
                : `Disponibles: ${producto.disponibilidad}`}
            </p>
          )}

        {producto.imagenes && producto.imagenes.length > 1 && (
          <button
            className={styles.verMas}
            onClick={() => setModalOpen(true)}
            type="button"
          >
            Ver más
          </button>
        )}
      </div>

      {modalOpen && (
        <ModalGaleria
          imagenes={producto.imagenes}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
