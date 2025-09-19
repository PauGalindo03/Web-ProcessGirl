"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import type { ProductoDigital } from "@types";

import styles from "./ProductCard.module.css";


const PLACEHOLDER = "/img/placeholder-catalog.png";

type Props = {
  producto: ProductoDigital;
  onWant: (p: ProductoDigital) => void;
};

export default function ProductCard({ producto, onWant }: Props) {
  const {
    titulo,
    imagenes,
    precioBase,
    precioFinal,
    descuento,
    disponibilidad,
    esEdicionLimitada,
    descripcion,
    sku,
  } = producto;

  const hasImg = imagenes && imagenes.length > 0;
  const isSoldOut =
    esEdicionLimitada &&
    typeof disponibilidad === "number" &&
    disponibilidad <= 0;

  return (
    <motion.article
      layout
      whileHover={{
        scale: 1.02,
        boxShadow: "var(--shadow-pink)",
        cursor: "pointer",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`${styles.card} ${styles.cardDark}`}
    >
      <Link
        href={`/sistemas/producto/${sku ?? producto._id}`}
        className={styles.cardLink}
      >
        {esEdicionLimitada && (
          <div className={styles.badges}>
            {typeof descuento === "number" && descuento > 0 && (
              <span className={`${styles.badge} ${styles.badgeDiscount}`}>
                -{descuento}%
              </span>
            )}
            <span className={`${styles.badge} ${styles.badgeLimited}`}>
              Edición limitada
            </span>
            {isSoldOut && (
              <span className={`${styles.badge} ${styles.badgeSoldOut}`}>
                Agotado
              </span>
            )}
          </div>
        )}

        <div className={`${styles.imageWrapper} ${styles.imageWrapperMd}`}>
          <img
            src={hasImg ? imagenes![0] : PLACEHOLDER}
            alt={titulo}
            aria-label={`Imagen de ${titulo}`}
            className={styles.image}
          />
          {esEdicionLimitada && typeof disponibilidad === "number" && (
            <div className={styles.stock}>
              {disponibilidad <= 5
                ? `¡Solo quedan ${disponibilidad}!`
                : `Quedan ${disponibilidad}`}
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className={`${styles.title} ${styles.titleMd}`}>{titulo}</h3>
          {descripcion && (
            <p className={`${styles.description} ${styles.descriptionDark}`}>
              {descripcion}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 mt-2">
          <div>
            <div className={styles.priceLabel}>Inversión</div>
            <div className={styles.priceValue}>
              <span className={styles.precioFinal}>
                {precioFinal ? `$${precioFinal}` : "Gratis"}
              </span>
              {precioBase > precioFinal! && (
                <span className={styles.precioBase}>${precioBase}</span>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            <button
              onClick={(e) => {
                e.preventDefault(); // evita que Link navegue
                e.stopPropagation(); // evita que el click burbujee
                onWant(producto);
              }}
              disabled={esEdicionLimitada && isSoldOut}
              className={`btn-cta titulo-sm ${
                isSoldOut ? styles.buttonDisabled : styles.buttonActive
              }`}
            >
              {isSoldOut ? "Agotado" : "Lo quiero"}
            </button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
