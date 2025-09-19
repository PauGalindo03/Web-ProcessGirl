import styles from "./CtaBlocks.module.css";

import { ParseAndRender } from "@/components/common";

export interface CTABlock {
  titulo: string;
  subtitulo: string;
}

interface CTA_BlocksProps {
  blocks: CTABlock[];
}

export default function CTA_Blocks({ blocks }: CTA_BlocksProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div>
      {blocks.map((block, index) => (
        <section
          key={index}
          className={`${styles.ctaBlock} ${
            index % 2 === 0 ? styles.ctaRosa : styles.ctaAzul
          }`}
        >
          <h2 className="titulo-2">{block.titulo}</h2>
          <div className={`${styles.parrafo} texto-1`}>
            {ParseAndRender(block.subtitulo)}
          </div>
        </section>
      ))}
    </div>
  );
}
