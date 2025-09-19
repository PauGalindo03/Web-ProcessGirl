"use client";

import { useEffect } from "react";

import type { Testimonio } from "@types";

import styles from "./Testimonios.module.css";

import { useTestimonios } from "@/hooks/useTestimonio";

interface TestimoniosProps {
  titulo: string;
}

export default function Testimonios({ titulo }: TestimoniosProps) {
  const { testimonios, loading, error } = useTestimonios(false);

  // Efecto para letras interactivas en el título
  useEffect(() => {
    const tituloEl = document.querySelector(
      `.${styles.tituloTestimonios}`
    ) as HTMLElement | null;
    if (!tituloEl) return;

    const texto = tituloEl.textContent?.trim() ?? "";
    tituloEl.innerHTML = "";

    texto.split("").forEach((letra) => {
      const span = document.createElement("span");
      span.classList.add("letra"); // sigue usando "letra" ya que es hijo del módulo
      span.textContent = letra;
      tituloEl.appendChild(span);
    });
  }, []);

  if (loading) return <p>Cargando testimonios...</p>;
  if (error) return <p>Error al cargar testimonios: {error}</p>;
  if (testimonios.length === 0) return null;

  return (
    <section className={styles.carruselTestimonios}>
      <h2 className={styles.tituloTestimonios}>{titulo}</h2>

      <div className={styles.carruselTrack}>
        {renderTestimonios(testimonios)}
        {renderTestimonios(testimonios)} {/* duplicado para loop */}
      </div>
    </section>
  );
}

function renderTestimonios(testimonios: Testimonio[]) {
  return testimonios.map((t) => (
    <div key={t._id} className={styles.testimonioCard}>
      <div className={styles.testimonioImagenContainer}>
        {t.img && t.img.length > 0 ? (
          <img src={t.img[0]} alt={`Foto de ${t.nombre}`} loading="lazy" />
        ) : (
          <i className={`bi bi-person-circle ${styles.testimonioPlaceholderIcon}`} />
        )}
      </div>

      <div className={styles.testimonioContenido}>
        <cite className={styles.testimonioAutor}>{t.nombre}</cite>
        <p className={styles.testimonioTexto}>&quot;{t.testimonio}&quot;</p>
      </div>
    </div>
  ));
}
