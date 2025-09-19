// src/components/PackagesMagazine.tsx
"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

import type { PaquetePD } from "@types";

import styles from "./PackagesMagazine.module.css";


type Props = {
  paquetes: PaquetePD[];
};

export default function PackagesMagazine({ paquetes }: Props) {
  const router = useRouter();

  if (!paquetes || paquetes.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={`titulo-bi ${styles.heading}`}>Paquetes destacados</h2>
      <div className={styles.packagesGrid}>
        {paquetes.map((pkg) => {
          const imagenSrc =
            pkg.productos?.[0]?.imagenes?.[0]?.trim() ||
            "/img/placeholder-catalog.png";

          return (
            <motion.div
              key={pkg._id}
              className={styles.card}
              whileHover={{ y: -4 }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={imagenSrc}
                  alt={pkg.titulo}
                  className={styles.image}
                />
              </div>
              <div className={styles.name}>{pkg.titulo}</div>
              <button
                type="button"
                className={`btn-cta4 ${styles.button}`}
                onClick={() => router.push(`/sistemas/paquete/${pkg.sku}`)}
              >
                Ver paquete
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
