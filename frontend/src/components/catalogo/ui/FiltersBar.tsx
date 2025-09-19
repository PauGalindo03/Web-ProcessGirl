// src/components/catalogo/FiltersBar.tsx
"use client";
import React from "react";

import styles from "./FiltersBar.module.css";

type Props = {
  categories: string[];
  selected: string | null;
  onSelect: (cat: string | null) => void;
};

export default function FiltersBar({ categories, selected, onSelect }: Props) {
  return (
    <div className={styles.bar}>
      <button
        onClick={() => onSelect(null)}
        className={`${styles.button} ${
          selected === null ? styles.buttonActive : ""
        }`}
      >
        Transforma tu vida
      </button>
      {categories.map((cat, i) => (
        <button
          key={`${cat}-${i}`}
          onClick={() => onSelect(cat)}
          className={`${styles.button} ${
            selected === cat ? styles.buttonActive : ""
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
