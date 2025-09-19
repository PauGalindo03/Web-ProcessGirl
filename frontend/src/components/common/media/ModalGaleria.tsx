"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import styles from "./ModalGaleria.module.css";

import { Modal } from "@/components/common";

type Props = {
  imagenes?: string[];
  onClose: () => void;
};

export default function ModalGaleria({ imagenes = [], onClose }: Props) {
  const [index, setIndex] = useState(0);
  const total = imagenes.length;

  const prev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  if (!total) return null;

  return (
    <Modal onClose={onClose} ariaLabel="Galería de imágenes">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={styles.imageBox}
        >
          <img
            src={imagenes[index]}
            alt={`Imagen ${index + 1}`}
            className={styles.image}
          />

          {total > 1 && (
            <>
              <button className={styles.prev} onClick={prev}>
                ◀
              </button>
              <button className={styles.next} onClick={next}>
                ▶
              </button>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className={styles.counter}>
        {index + 1} / {total}
      </div>
    </Modal>
  );
}
