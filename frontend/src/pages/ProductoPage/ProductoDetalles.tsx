"use client";
import type { ProductoDigital } from "@types";

import styles from "./modules/ProductoDetalles.module.css";

type Props = {
  producto: ProductoDigital;
};

export default function ProductoDetalles({ producto }: Props) {
  const { sku, categoria, paquete } = producto;

  return (
    <section className={styles.detalles}>
      <h2 className={styles.titulo}>Detalles del producto</h2>
      <ul className={styles.lista}>
        <li>
          <strong>SKU:</strong> {sku}
        </li>

        {Array.isArray(categoria) && categoria.length > 0 && (
          <li>
            <strong>Categorías:</strong>{" "}
            {categoria.map((c) => c.nombre).join(", ")}
          </li>
        )}

        {Array.isArray(paquete) && paquete.length > 0 && (
          <li>
            <strong>Incluido en:</strong>{" "}
            {paquete.map((p) => (
              <a
                key={p._id}
                href={`/sistemas/paquete/${p.sku}`}
                className={styles.link}
              >
                {p.titulo}
              </a>
            ))}
          </li>
        )}
      </ul>
    </section>
  );
}
