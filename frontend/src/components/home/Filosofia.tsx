import styles from "./Filosofia.module.css";

import { ParseAndRender } from "@/components/common";

interface Filosofia {
  data: {
    titulo: string;
    subtitulo: string;
    texto: string;
    microcopy: string;
  };
}

export default function Hero({ data }: Filosofia) {
  return (
    <section className={styles.filosofiaSection}>
      <h2 className={`titulo-bi ${styles.titulo}`}>{data.titulo}</h2>
      <div className={styles.subtituloFilosofia}>
        {ParseAndRender(data.subtitulo)}
      </div>
      <div className={styles.textoFilosofia}>
        {ParseAndRender(data.texto)}
      </div>
      <p className="microcopy">{data.microcopy}</p>
    </section>
  );
}
