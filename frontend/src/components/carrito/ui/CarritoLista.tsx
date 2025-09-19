"use client";
import Link from "next/link";

import type { ProductoDigital, CarritoItem, CarritoItemProducto } from "@types";

import styles from "./CarritoLista.module.css";

import { AnimatedIcon } from "@/components/common";
import { useCarrito } from "@/context/CarritoContext";
import { useProductosDigitales } from "@/hooks/useProductosDigitales";

interface CarritoListaProps {
  items: CarritoItem[];
}

export default function CarritoLista({ items }: CarritoListaProps) {
  const { removeItem } = useCarrito();
  const { productos } = useProductosDigitales();

  if (!items || items.length === 0) return null;

  const productosActivosIds = productos
    .map((p) => p._id)
    .filter((id): id is string => typeof id === "string");

  const esNoDisponible = (item: CarritoItem) => {
    if (item.tipo === "paquete") {
      return item.productos.every((p) => !productosActivosIds.includes(p._id));
    }
    // producto
    return !item.item || !productosActivosIds.includes(item.item._id);
  };

  const calcularPrecioFinal = (p: ProductoDigital) => {
    const base = p.precioBase || 0;
    const descuento = p.descuento ? (base * p.descuento) / 100 : 0;
    return base - descuento;
  };

  const getTitulo = (item: CarritoItem) =>
    item.tipo === "paquete"
  ? item.titulo ?? ""
  : item.item?.titulo ?? ""

  return (
    <div className={styles.contenedorProductosCarrito}>
      {items.map((item) => {
        const noDisponible = esNoDisponible(item);

        if (noDisponible) {
          return (
            <div key={item._id} className="product-cont no-disponible">
              <div className="info">
                <h4 className="texto-dec titulo-tachado">
                  {getTitulo(item)} (No disponible)
                </h4>
                <p>
                  {item.tipo === "paquete"
                    ? "Este paquete ya no está disponible."
                    : "Este producto ya no está disponible."}
                </p>
              </div>
              <button
                className="btn-eliminar-producto"
                onClick={() => removeItem(item._id)}
                title="Eliminar"
                aria-label={`Eliminar ${getTitulo(item)}`}
              >
                <AnimatedIcon icon="bi bi-trash3" />
              </button>
            </div>
          );
        }

        if (item.tipo === "paquete") {
          return (
            <div key={item._id} className={styles.productoCont}>
              <div className={styles.info}>
                <h4>
                  <Link href={`/sistema/${item._id}`} className={styles.link}>
                    {item.titulo}
                  </Link>
                </h4>
                <p>Precio: ${item.precioFinal}</p>
                <ul>
                  {item.productos.map((p, i) => (
                    <li key={i}>
                      <Link href={`/producto/${p._id}`} className={styles.link}>
                        {p.titulo}
                      </Link>{" "}
                      - ${p.precioFinal ?? calcularPrecioFinal(p)}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="btn-eliminar-producto"
                onClick={() => removeItem(item._id)}
                title="Eliminar"
                aria-label={`Eliminar ${item.titulo}`}
              >
                <AnimatedIcon icon="bi bi-trash3" />
              </button>
            </div>
          );
        }

        const producto = item as CarritoItemProducto;

        return (
          <div key={item._id} className={styles.productoCont}>
            <div className={styles.info}>
              <h4>
                <Link
                  href={`/producto/${producto.item._id}`}
                  className={styles.link}
                >
                  {producto.item.titulo}
                </Link>
              </h4>
              <p>Precio: ${producto.precioFinal}</p>
            </div>
            <button
              className="btn-eliminar-producto"
              onClick={() => removeItem(producto._id)}
              title="Eliminar"
              aria-label={`Eliminar ${producto.item.titulo}`}
            >
              <AnimatedIcon icon="bi bi-trash3" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
