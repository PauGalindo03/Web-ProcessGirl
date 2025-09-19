"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { ProductoDigital } from "@types";

import styles from "./modules/ProductoPage.module.css";
import ProductoTestimonios from "./ProductoTestimonios";

import { ModalGaleria } from "@/components/common";
import { useUI } from "@/context/UIContext";
import { useCarrito } from "@/hooks/useCarrito";
import { useUser } from "@/hooks/useUser";

type Props = {
  producto: ProductoDigital;
};

export default function ProductoLayout({ producto }: Props) {
  const { isMobile } = useUI();
  const router = useRouter();
  const { addItem } = useCarrito();
  const [modalOpen, setModalOpen] = useState(false);
  const { user, toggleFavorite } = useUser();

  const handleAddToCart = () => addItem({ ...producto, tipo: "producto" });
  const handleFavorito = () => {
    if (!user) {
      router.push("/login");
    } else {
      toggleFavorite(producto._id);
    }
  };

  const hasImgs = producto.imagenes && producto.imagenes.length > 0;
  const mainImage = hasImgs
    ? producto.imagenes![0]
    : "/img/placeholder-catalog.png";

  return (
    <section className={styles.page}>
      {/* 🧠 Responsive: título y precios arriba */}
      {isMobile && (
        <header className={styles.headerMobile}>
          <h1 className={styles.titulo}>{producto.titulo}</h1>
          <div className={styles.precioBox}>
            <span className={styles.precioFinal}>
              {producto.precioFinal ? `$${producto.precioFinal}` : "Gratis"}
            </span>
            {producto.precioBase > (producto.precioFinal ?? 0) && (
              <span className={styles.precioBase}>${producto.precioBase}</span>
            )}
          </div>
        </header>
      )}

      <div className={styles.grid}>
        {/* 🖼 Imagen + badges + ver más */}
        <div className={styles.imagenBox}>
          <div className={styles.imagenWrapper}>
            <img
              src={mainImage}
              alt={producto.titulo}
              className={styles.imagen}
            />
            {producto.esEdicionLimitada && (
              <div className={styles.badge}>Edición limitada</div>
            )}
            {producto.disponibilidad && producto.esEdicionLimitada && (
              <p className={styles.stock}>
                Disponibles: {producto.disponibilidad}
              </p>
            )}
            <button
              type="button"
              className={styles.verMas}
              onClick={() => setModalOpen(true)}
            >
              Ver más
            </button>
          </div>

          {/* 🛒 CTA + ❤️ + detalles */}
          <div className={styles.botones}>
            <button type="button" onClick={handleAddToCart}>
              Agregar al carrito
            </button>
            <button type="button" onClick={handleFavorito}>
              ❤️ Favorito
            </button>
          </div>

          <div className={styles.detalles}>
            <p>
              <strong>SKU:</strong> {producto.sku}
            </p>
            <ul className={styles.detallesLista}>
              {Array.isArray(producto.categoria) &&
                producto.categoria.length > 0 && (
                  <li>
                    <strong>Categorías:</strong>{" "}
                    {producto.categoria.map((c) => c.nombre).join(", ")}
                  </li>
                )}

              {Array.isArray(producto.paquete) &&
                producto.paquete.length > 0 && (
                  <li>
                    <strong>Incluido en:</strong>{" "}
                    {producto.paquete.map((p) => (
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
          </div>
        </div>

        {/* 📝 Título + precios + descripción */}
        <div className={styles.infoBox}>
          {!isMobile && (
            <>
              <h1 className={styles.titulo}>{producto.titulo}</h1>
              <div className={styles.precioBox}>
                <span className={styles.precioFinal}>
                  {producto.precioFinal ? `$${producto.precioFinal}` : "Gratis"}
                </span>
                {producto.precioBase > (producto.precioFinal ?? 0) && (
                  <span className={styles.precioBase}>
                    ${producto.precioBase}
                  </span>
                )}
              </div>
            </>
          )}
          {producto.descripcion && (
            <p className={styles.descripcion}>{producto.descripcion}</p>
          )}
          {producto.descripcionLarga && (
            <div
              className={styles.descripcionLarga}
              dangerouslySetInnerHTML={{ __html: producto.descripcionLarga }}
            />
          )}
        </div>
      </div>

      {/* 💬 Testimonios */}
      <ProductoTestimonios producto={producto} user={user} />

      {/* 🔍 Modal galería */}
      {modalOpen && (
        <ModalGaleria
          imagenes={producto.imagenes}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* 📱 CTA flotante en mobile */}
      {isMobile && (
        <div className={styles.ctaFlotante}>
          <button onClick={handleAddToCart}>Agregar al carrito</button>
          <button onClick={handleFavorito}>❤️</button>
        </div>
      )}
    </section>
  );
}
