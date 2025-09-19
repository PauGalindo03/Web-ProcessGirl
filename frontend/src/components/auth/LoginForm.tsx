"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from './Form.module.css';

import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, user } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      if (user?.role === "admin") {
        router.push("/admin/panel");
      } else {
        router.push("/user/panel");
      }
    } catch (err) {
      console.error("Error al iniciar sesión", err);
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <input
        className={styles.input}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo"
        required
      />
      <input
        className={styles.input}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <button className={styles.boton} type="submit">Iniciar sesión</button>

      <a href="/auth/forgot-password" className={styles.link}>
        ¿Olvidaste tu contraseña?
      </a>

      <a href="/auth/register" className={styles.link}>
        ¿No tienes cuenta? Regístrate aquí
      </a>
    </form>
  );
}
