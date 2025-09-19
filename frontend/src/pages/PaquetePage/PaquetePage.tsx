"use client";
import { motion } from "framer-motion";

import type { PaquetePD } from "@types";

import PaqueteGridDesktop from "./PaqueteGridDesktop";
import PaqueteHeader from "./PaqueteHeader";
import PaqueteListaMobile from "./PaqueteListaMobile";
import styles from "./PaquetePage.module.css";
import PaqueteValorBox from "./PaqueteValorBox";

import { useUI } from "@/context/UIContext";
import { useCarrito } from "@/hooks/useCarrito";

type Props = { paquete: PaquetePD };

export default function PaquetePage({ paquete }: Props) {
  const carrito = useCarrito();
  const { isMobile } = useUI();

  if (!paquete || !paquete.productos?.length || paquete.precioFinal == null) {
    return <div className={styles.error}>Este paquete no está disponible.</div>;
  }

  const { titulo, descripcion, productos } = paquete;

  const valorOriginal = productos.reduce(
    (acc, p) => acc + (p.precioBase ?? 0),
    0
  );
  const subtotalProductos = productos.reduce(
    (acc, p) => acc + (p.precioFinal ?? p.precioBase ?? 0),
    0
  );
  const descuentoPaquete = paquete.descuento ?? 0;
  const precioPaquete = subtotalProductos * (1 - descuentoPaquete / 100);
  const ahorro = valorOriginal - precioPaquete;

  const handleCTA = () => {
    carrito.addItem({ ...paquete, tipo: "paquete" });
    window.location.href = "/checkout";
  };
  const handleCTA2 = () => {
    carrito.addItem({ ...paquete, tipo: "paquete" });
  };

  return (
    <section className={styles.page}>
      <PaqueteHeader titulo={titulo} descripcion={descripcion} />
      <PaqueteValorBox
        valorOriginal={valorOriginal}
        precioPaquete={precioPaquete}
        ahorro={ahorro}
        onCTA={handleCTA}
      />
      {isMobile ? (
        <PaqueteListaMobile productos={productos} />
      ) : (
        <PaqueteGridDesktop productos={productos} />
      )}
      <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(0, 200, 255, 0.6)",
                background: "radial-gradient(circle, #6da7cc, #ddeffa)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={styles.portalButton}
              onClick={handleCTA2}
            >
              Agregar al carrito
            </motion.button>
    </section>
  );
}
