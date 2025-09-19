import styles from "./Metodologia.module.css";

import { ParseAndRender } from "@/components/common";

interface MetodologiaProps {
  data: {
    titulo: string;
    subtexto: string;
  };
}

export default function Metodologia({ data }: MetodologiaProps) {
  return (
    <section className={styles.metodologiaSection}>
      <h2 className={`${styles.titulo} titulo-bi`}>{data.titulo}</h2>
      <div className={styles.subtextoMetodologia}>
        {ParseAndRender(data.subtexto)}
      </div>

      <div className={styles.processFlowDiagram}>
        <div className={`${styles.flowItem} ${styles.item1}`}>
          <strong>Sencillo:</strong> sistemas fáciles de usar desde el día uno.
        </div>
        <i className={`bi bi-arrow-down ${styles.flowArrow}`} />

        <div className={`${styles.flowItem} ${styles.item2}`}>
          <strong>Personalizable:</strong> tú eliges cómo adaptarlo a tu vida.
        </div>
        <i className={`bi bi-arrow-down ${styles.flowArrow}`} />

        <div className={`${styles.flowItem} ${styles.item3}`}>
          <strong>Integral:</strong> cuidamos tu mente, tu tiempo y tus
          finanzas.
        </div>
        <i className={`bi bi-arrow-down ${styles.flowArrow}`} />

        <div className={`${styles.flowItem} ${styles.item4}`}>
          <strong>Progresivo:</strong> creces 1% cada día, sin forzarte.
        </div>

        <div className={styles.flowCenter}>
          <span>Tú</span>
          <i className="bi bi-arrow-repeat" />
        </div>
      </div>
    </section>
  );
}
