"use client";
import type { ProductoDigital } from "@types";

import styles from "./modules/ProductoPage.module.css";
import ProductoCTAFlotante from "./ProductoCTAFlotante";
import ProductoDetalles from "./ProductoDetalles";
import ProductoImagen from "./ProductoImagen";
import ProductoInfo from "./ProductoInfo";
import ProductoPrecioBox from "./ProductoPrecioBox";
import ProductoTestimonios from "./ProductoTestimonios";

import { useUI } from "@/context/UIContext";
import { useCarrito } from "@/hooks/useCarrito";
import { useUser } from "@/hooks/useUser";

type Props = { producto: ProductoDigital };

export default function ProductoPage({ producto }: Props) {
  const carrito = useCarrito();
  const { isMobile } = useUI();
  const { user } = useUser();

  if (!producto) {
    return (
      <div className={styles.error}>Este producto no está disponible.</div>
    );
  }

  const handleAddToCart = () => {
    carrito.addItem({ ...producto, tipo: "producto" });
  };

  return (
    <section className={styles.page}>
      <div className={styles.grid}>
        {/* 🧱 Columna izquierda */}
        {isMobile && (
          <ProductoPrecioBox producto={producto} onCTA={handleAddToCart} />
        )}
        <div className={styles.colIzquierda}>
          <ProductoImagen producto={producto} />
          {!isMobile && (
            <>
              <ProductoPrecioBox producto={producto} onCTA={handleAddToCart} />
              <ProductoDetalles producto={producto} />
            </>
          )}
        </div>

        {/* 🧱 Columna derecha */}
        <div className={styles.colDerecha}>
          <ProductoInfo producto={producto} />
          {isMobile && <ProductoDetalles producto={producto} />}
        </div>
      </div>

      <ProductoTestimonios producto={producto} user={user} />
      <ProductoCTAFlotante producto={producto} />
    </section>
  );
}
