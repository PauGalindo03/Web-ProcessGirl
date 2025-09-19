"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { TestimonioInput, ProductoDigital, Usuario } from "@types";

import styles from "./modules/ProductoTestimonios.module.css";

import { AnimatedIcon } from "@/components/common";
import { useTestimonios } from "@/hooks/useTestimonio";
import * as testimonioService from "@/services/testimonioService";

type Props = {
  producto: ProductoDigital;
  user?: Usuario | null;
};

export default function ProductoTestimonios({ producto, user }: Props) {
  const router = useRouter();
  const { testimonios, refresh } = useTestimonios(false);
  const [testimonio, setTestimonio] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [clickedStar, setClickedStar] = useState<number | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonio.trim()) return;

    if (!user || !user._id || !user.username) {
      router.push("/login");
      return;
    }

    setSubmitting(true);

    const payload: TestimonioInput = {
      nombre: user.username, // ahora TypeScript sabe que es string
      testimonio,
      rating,
      producto: producto._id,
      user: user._id,
    };

    await testimonioService.create(payload);

    setTestimonio("");
    setRating(5);
    setSubmitting(false);
    refresh();
  };

  return (
    <section className={styles.testimonios}>
      <h2>Testimonios</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.stars} onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((r) => (
            <span
              aria-label="Calificar producto"
              key={r}
              role="button"
              tabIndex={0}
              onClick={() => {
                setRating(r);
                setClickedStar(r);
                setTimeout(() => setClickedStar(null), 300);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setRating(r);
                  setClickedStar(r);
                  setTimeout(() => setClickedStar(null), 300);
                }
              }}
              onMouseMove={() => setHoverRating(r)}
            >
              <AnimatedIcon
                className={styles.estrella}
                default={false}
                icon={r <= (hoverRating || rating) ? "star-fill" : "star"}
                animation={
                  r === clickedStar
                    ? "rebote"
                    : r <= (hoverRating || rating)
                      ? "rosa"
                      : ""
                }
              />
            </span>
          ))}
        </div>

        <textarea
          placeholder="Escribe tu testimonio"
          value={testimonio}
          onChange={(e) => setTestimonio(e.target.value)}
          required
        />

        <button className="btn-cta" type="submit" disabled={submitting}>
          {submitting ? "Enviando..." : "Enviar testimonio"}
        </button>
      </form>

      <div className={styles.lista}>
        {testimonios
          .filter((t) => t.producto === producto._id)
          .map((t) => (
            <div key={t._id} className={styles.item}>
              <strong>{t.nombre}</strong> — {t.rating}
              <p>{t.testimonio}</p>
            </div>
          ))}
      </div>
    </section>
  );
}
