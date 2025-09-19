"use client";
import Link from "next/link";

import type { Dispatch, SetStateAction } from "react";

import styles from "./CartDropdown.module.css";

import {CarritoLista,Totales,BotonesCTA} from "@/components/carrito";
import {AnimatedIcon} from "@/components/common";
import { useCarrito } from "@/hooks/useCarrito";

interface CartDropdownProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function CartDropdown({
  visible,
  setVisible,
}: CartDropdownProps) {
  const { items, totales, clearCarrito } = useCarrito();

  return (
    <>
      {/* Botón para abrir/cerrar */}
      <button
        className={styles.abrirCarrito}
        onClick={() => setVisible(!visible)}
      >
        <AnimatedIcon icon="bag-heart" animation="pulseOnHover" color="rosa" />
        <span className={styles.cuentaFueraCarrito}>{items.length}</span>
      </button>

      {/* Dropdown */}
      {visible && (
        <div className={`${styles.divCarrito} ${styles.visible}`}>
          <div className={styles.cartHeader}>
            <h2 className="titulo-bi titulo-md">Tu carrito</h2>
            <button
              type="button"
              title="Cerrar carrito"
              className={`${styles.cerrarCarrito} icono-rosa`}
              onClick={() => setVisible(false)}
            >
              <AnimatedIcon
                icon="bi bi-x-circle"
                animation="pulseOnHover"
                color="rosa"
              />
            </button>
          </div>

          {items.length === 0 ? (
            <div className={styles.carritoVacio}>
              <p>Tu carrito está vacío 👀</p>
              <p>¿Lista para tu transformación?</p>
              <div className={styles.botonGlowUp}>
                <Link href="/sistemas" className="btn-cta2">
                  Quiero tener mi glow up
                </Link>
              </div>
            </div>
          ) : (
            <>
              <CarritoLista items={items} />
              <Totales totales={totales} />
              <BotonesCTA onVaciar={clearCarrito} />
            </>
          )}
        </div>
      )}
    </>
  );
}
