"use client";
import { motion } from "framer-motion";
import Link from "next/link";

import type { PaquetePD } from "@types";

import styles from "./PaqueteListaMobile.module.css";

interface Props {
  productos: PaquetePD["productos"];
}

export default function PaqueteListaMobile({ productos }: Props) {
  return (
    <div className={styles.listaProductos}>
      <h2 className={styles.subtitulo}>Incluye:</h2>
      <ul>
        {productos.map((p, i) => (
          <motion.li
            key={p._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={styles.itemProducto}
          >
            <article className={styles.productoCard}>
              <Link
                href={`/sistemas/producto/${p.sku ?? p._id}`}
                className={styles.productoLink}
              >
                <span className={styles.numero}>{i + 1}</span>
                <div className={styles.infoProducto}>
                  <strong>{p.titulo}</strong>
                  <p className={styles.productoDesc}>{p.descripcion}</p>
                </div>
                <img
                  src={p.imagenes?.[0] ?? "/img/placeholder-catalog.png"}
                  alt={p.titulo}
                  className={styles.productoImgRight}
                />
              </Link>
            </article>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
