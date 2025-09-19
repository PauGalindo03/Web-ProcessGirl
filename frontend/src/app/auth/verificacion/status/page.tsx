"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import styles from "../VerificaCorreo.module.css";

import { EstadoVerificacion } from "@/components/auth";
import { useAlerta } from "@/context/AlertaContext";
import { useVerificacion } from "@/hooks/utils/useVerificacion";

export default function VerificacionStatus() {
  const searchParams = useSearchParams();
  const emailParam = searchParams?.get("email");

  const [email, setEmail] = useState(emailParam || "");
  const { estado, cargando, error, revisar, reenviar } = useVerificacion();
  const { mostrarAlerta } = useAlerta();

  const revisarEstado = async () => {
    await revisar(email);
    if (error) mostrarAlerta(error, "error");
  };

  useEffect(() => {
    if (emailParam) revisar(emailParam);
  }, [emailParam, revisar]);

  return (
    <section className={styles.container}>
      <h2>Checar estado de verificación</h2>
      <p>Ingresa el correo con el que te registraste:</p>

      <input
        type="email"
        placeholder="Correo registrado"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />

      <button
        type="button"
        onClick={revisarEstado}
        disabled={cargando || !email}
        className={styles.boton}
      >
        {cargando ? "Verificando..." : "Checar estado"}
      </button>

      {estado && (
        <EstadoVerificacion
          email={email}
          isEmailVerified={estado.isEmailVerified}
          expiresAt={estado.expiresAt}
          onReenviar={async () => {
            const error = await reenviar();
            if (error) mostrarAlerta(error, "error");
            else mostrarAlerta("Correo reenviado correctamente.", "success");
          }}
        />
      )}
    </section>
  );
}
