import type { Valor } from "@types";

import styles from "./ValoresCard.module.css";

import { ParseAndRender } from "@/components/common";

type Props = {
  valores: Valor[];
};

export default function ValoresCards({ valores }: Props) {
  return (
    <section className={styles.valoresSection}>
      <h2 className={styles.title}>Valores</h2>
      <div className={styles.grid}>
        {valores.map((valor, i) => (
          <div key={i} className={styles.card}>
            <h3>{valor.titulo}</h3>
            <div className={styles.text}>
              {ParseAndRender(valor.texto)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
