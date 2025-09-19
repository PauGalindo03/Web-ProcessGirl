"use client"
import styles from "./Hero.module.css";

import { ParseAndRender } from "@/components/common";
import { useUI } from "@/context/UIContext"

interface HeroProps {
  data: {
    titulo: string;
    subtitulo: string;
    cta: string;
  };
}
export default function Hero({ data }: HeroProps) {
  const { isMobile } = useUI();
  if (!data) return null;
  
  return (
    <section className={styles.heroSection}>
      <div>
        <h1 className={`titulo-bi ${styles.titulo}`}>{data.titulo}</h1>
        <div className={styles.subtituloHero}>
          {ParseAndRender(data.subtitulo)}
        </div>
        <a href="/sistemas" className={isMobile ? "btn-cta" : "btn-cta2"}>
          {data.cta}
        </a>
      </div>
    </section>
  );
}
