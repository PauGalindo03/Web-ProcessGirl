"use client";
import { useState } from "react";

import type { Contacto } from "@types";

import styles from "./ContactoPage.module.css";

import { Modal } from "@/components/common";

type Props = {
  contactos: Contacto[];
};

export default function ContactoPage({ contactos }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const openModal = (enlace?: string) => {
    const bloqueados = ["wa.me", "canva.com"];
    const esBloqueado = enlace && bloqueados.some((d) => enlace.includes(d));
    if (enlace && !esBloqueado) {
      setModalSrc(enlace);
      setError(false);
    } else {
      setModalSrc("/img/contacto.png");
      setError(true);
    }
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalSrc(null);
    setError(false);
  };

  return (
    <section className={styles.contactSection}>
      <h1 className={`${styles.title} titulo-bi`}>Contáctame</h1>
      <div className={styles.cards}>
        {contactos.map((c) => (
          <div key={c._id} className={styles.card}>
            <h2>{c.titulo}</h2>
            <p>{c.texto}</p>
            <button className={styles.cta} onClick={() => openModal(c.enlace)}>
              {c.cta}
            </button>
          </div>
        ))}
      </div>

      {modalOpen && (
        <Modal onClose={closeModal} ariaLabel="Contenido de contacto">
          {error ? (
            <div className={styles.fallback}>
              <img src="/img/contacto.png" alt="Fallback contacto" />
              <p>No se ha podido cargar el enlace</p>
            </div>
          ) : (
            <iframe
              className={styles.iframe}
              src={modalSrc ?? ""}
              title="Contenido de contacto"
              onError={() => {
                setError(true);
                setModalSrc("/img/contacto.png");
              }}
            />
          )}
        </Modal>
      )}
    </section>
  );
}
