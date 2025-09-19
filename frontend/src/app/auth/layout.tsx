"use client";
import { usePathname } from "next/navigation";

import type { ReactNode } from "react";

import styles from "./AuthLayout.module.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isRegistro = pathname === "/auth/register";
  return (
    <div className={styles.authContainer}>
      <section
        className={`${styles.authBox} ${isRegistro ? styles.authBoxRegistro : ""}`}
      >
        <h1 className={`titulo-bi ${styles.title}`}>
          Bienvenida a Process Girl
        </h1>
        <h2 className={`texto-dec ${styles.subtitle}`}>
          ✨tu espacio para crecer, organizarte y brillar✨
        </h2>
        <p className={styles.cta}>Accede o crea tu cuenta para continuar</p>
        <div className={styles.authContent}>{children}</div>
      </section>
    </div>
  );
}
