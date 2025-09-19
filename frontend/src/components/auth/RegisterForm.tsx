"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./Form.module.css";

import { useAlerta } from "@/context/AlertaContext";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterForm() {
  const { registerUser } = useAuth();
  const { mostrarAlerta } = useAlerta();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    nombres: "",
    apellidos: "",
    username: "",
    direccion: {
      pais: "",
      calle: "",
      numero: "",
      colonia: "",
      codigoPostal: "",
      ciudad: "",
      estado: "",
    },
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(form);
      mostrarAlerta("Registro exitoso. Verifica tu correo.", "success");
      router.push(`/auth/verificacion/correo?email=${encodeURIComponent(form.email)}`);
    } catch (err) {
      const mensaje =
        err instanceof Error ? err.message : "Error al registrar.";
      mostrarAlerta(mensaje, "error");
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.form}>
      <input
        className={styles.input}
        type="text"
        value={form.nombres}
        onChange={(e) => setForm({ ...form, nombres: e.target.value })}
        placeholder="*Nombres"
        required
      />
      <input
        className={styles.input}
        type="text"
        value={form.apellidos}
        onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
        placeholder="*Apellidos"
        required
      />
      <input
        className={styles.input}
        type="text"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        placeholder="Username"
      />
      <input
        className={styles.input}
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="*Correo"
        required
      />
      <input
        className={styles.input}
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="*Contraseña"
        required
      />

      {/* 🏠 Sección de dirección */}
      <section className={styles.direccion}>
        <h3 className={styles.subtitulo}>Dirección</h3>
        {[
          { key: "pais", label: "*País", required: true },
          { key: "estado", label: "Estado" },
          { key: "ciudad", label: "Ciudad" },
          { key: "colonia", label: "Colonia" },
          { key: "calle", label: "Calle" },
          { key: "numero", label: "Número" },
          { key: "codigoPostal", label: "Código Postal" },
        ].map(({ key, label, required }) => (
          <input
            key={key}
            className={styles.input}
            type="text"
            value={form.direccion[key as keyof typeof form.direccion]}
            onChange={(e) =>
              setForm({
                ...form,
                direccion: {
                  ...form.direccion,
                  [key]: e.target.value,
                },
              })
            }
            placeholder={label}
            required={required}
          />
        ))}
      </section>

      <button className={styles.boton} type="submit">
        Registrarme
      </button>
      <a href="/auth/login" className={styles.link}>
        ¿Ya tienes cuenta? Inicia sesión
      </a>
      <a href="/auth/verificacion/status" className={styles.link}>
        ¿Ya te registraste pero no te llegó el correo?
      </a>
    </form>
  );
}
