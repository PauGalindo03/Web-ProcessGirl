import type { SobreMi } from "@types";

import styles from "./Filosofia.module.css";
import ValoresCard from "./ValoresCard";

import { ParseAndRender } from "@/components/common";

type Props = {
  sobreMi: SobreMi;
};

export default function Filosofia({ sobreMi }: Props) {
  return (
    <section>
      {/* Misión y Visión */}
      <div className={styles.misionVision}>
        <div className={styles.mision}>
          <h2>Misión</h2>
          <div>{ParseAndRender(sobreMi.mision)}</div>
        </div>
        <div className={styles.vision}>
          <h2>Visión</h2>
          <div>{ParseAndRender(sobreMi.vision)}</div>
        </div>
      </div>

      {/* Valores con timeline */}
      {sobreMi.valores?.length > 0 && (
        <ValoresCard valores={sobreMi.valores} />
      )}
    </section>
  );
}
