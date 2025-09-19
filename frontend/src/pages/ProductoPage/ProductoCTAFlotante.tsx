"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { ProductoDigital } from "@types";

import styles from "./modules/ProductoCTAFlotante.module.css";

import { useCarrito } from "@/hooks/useCarrito";
import { useUser } from "@/hooks/useUser";

type Props = {
  producto: ProductoDigital;
};

export default function ProductoCTAFlotante({ producto }: Props) {
  const { user, toggleFavorite } = useUser();
  const { addItem } = useCarrito();
  const router = useRouter();
  const [hideCTA, setHideCTA] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);

  const handleAddToCart = () => {
    addItem({ ...producto, tipo: "producto" });
  };

  const handleFavorito = () => {
    if (!user) {
      router.push("/login");
    } else {
      toggleFavorite(producto._id);
    }
  };

  const isSoldOut =
    producto.esEdicionLimitada &&
    typeof producto.disponibilidad === "number" &&
    producto.disponibilidad <= 0;

  useEffect(() => {
    const footer = document.querySelector("footer");
    footerRef.current = footer as HTMLElement;

    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHideCTA(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    !hideCTA && (
      <div className={styles.ctaFlotante}>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isSoldOut}
          className={styles.boton}
        >
          {isSoldOut ? "Agotado" : "Agregar al carrito"}
        </button>
        <button
          type="button"
          onClick={handleFavorito}
          className={styles.corazon}
        >
          ❤️
        </button>
      </div>
    )
  );
}
