"use client";
import { motion } from "framer-motion";
import Link from "next/link";

import type { PaquetePD } from "@types";

import styles from "./PaqueteGridDesktop.module.css";

interface Props {
  productos: PaquetePD["productos"];
}

export default function PaqueteGridDesktop({ productos }: Props) {
  return (
    <div className={styles.gridProductos}>
      {productos.map((p, i) => (
        <motion.div
          key={p._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={styles.cardProducto}
        >
          <Link
            href={`/sistemas/producto/${p.sku ?? p._id}`}
            className={styles.cardLink}
          >
            <img
              src={p.imagenes?.[0] ?? "/img/placeholder-catalog.png"}
              alt={p.titulo}
              className={styles.cardImg}
            />
            <div className={styles.cardOverlay}>
              <h3>{p.titulo}</h3>
              <p>Precio: ${p.precioBase}</p>
              {(p.descuento ?? 0) > 0 && <p>Descuento: {p.descuento}%</p>}
              <p>Precio final: ${p.precioFinal}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
