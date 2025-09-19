"use client";
import Image from "next/image";

import styles from "./Footer.module.css";

import { useCachedConfiguracion } from "@/hooks/cached/useCachedConfiguracion";

export default function Footer() {
  const config = useCachedConfiguracion();
  const currentYear = new Date().getFullYear();
  const redes = config?.redesSociales ?? [];

  if (!config) return null; // o un fallback visual mínimo

  return (
    <footer>
      <div className={styles.iconosRedes}>
        {redes.length > 0 && (
          <ul className={styles.socialLinks}>
            {redes.map((red) => (
              <li key={red.url}>
                <a
                  href={red.url}
                  title={red.nombre}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visita nuestro ${red.nombre}`}
                >
                  {red.iconoUrl?.startsWith("bi ") ? (
                    <i className={red.iconoUrl} />
                  ) : red.iconoUrl ? (
                    <Image
                      src={red.iconoUrl}
                      alt={red.nombre}
                      className={styles.socialIconImg}
                      width={24}
                      height={24}
                      unoptimized
                    />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        )}

        <p>
          &copy; {currentYear} Process Girl.{" "}
          <a
            href="/derechos"
            className={styles.derechosLink}
          >
            Todos los derechos reservados.
          </a>
        </p>
      </div>
    </footer>
  );
}
