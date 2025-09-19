"use client"
import React, { useState } from "react";

import type { ProductoDigital } from "@types";

import styles from "./CollectionSection.module.css";
import ProductCard from "./ProductCard";

type Props = {
  title: string;
  productos: ProductoDigital[];
  onWant: (p: ProductoDigital) => void;
};

const PAGE_SIZE = 6; // 👈 ajusta según tu diseño

export default function CollectionsSection({
  title,
  productos,
  onWant,
}: Props) {
  const [page, setPage] = useState(1);

  if (!productos || productos.length === 0) return null;

  const totalPages = Math.ceil(productos.length / PAGE_SIZE);
  const paginated = productos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className={styles.section}>
      <h3 className={`titulo-bi ${styles.heading}`}>{title}</h3>

      <div className={styles.grid}>
        {paginated.map((p) => (
          <ProductCard key={p._id} producto={p} onWant={onWant} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={styles.pageButton}
          >
            ←
          </button>
          <span className={styles.pageIndicator}>
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={styles.pageButton}
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}
