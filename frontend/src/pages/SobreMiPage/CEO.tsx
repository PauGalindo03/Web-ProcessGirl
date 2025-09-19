import type { SobreMi } from "@types";

import styles from "./CEO.module.css";

import { ParseAndRender } from "@/components/common";

type Props = {
  sobreMi: SobreMi;
};

export default function CEO({ sobreMi }: Props) {
  return (
    <section className={styles.seccionCeo}>
      <div className={styles.contenedorCeo}>
        <div className={styles.fotoCeo}>
          <img src={sobreMi.photoUrl} alt={`Foto de ${sobreMi.ceo}`} />
        </div>
        <div className={styles.textoCeo}>
          <h2 className={`${styles.tituloLocal} titulo-bi`}>CEO</h2>
          <h3 className={styles.desc}>
            {sobreMi.ceo}
          </h3>
          <div
            className={`${styles.textoPrincipal} ${styles.textoLocal} texto-1 texto-dec`}
          >
            {ParseAndRender(sobreMi.textoPrincipal)}
          </div>
        </div>
      </div>
    </section>
  );
}
