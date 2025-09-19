// app/page.tsx
import styles from "./page.module.css";

//import { Testimonios } from "@/components/common";
import { Hero, CtaBlocks, Metodologia, Filosofia } from "@/components/home";
import { getServerConfiguracion } from "@/lib/serverModels";

export default async function Home() {
  const config = await getServerConfiguracion();
  // agregar testimonios en const
  const { hero, metodologia, filosofia, ctaBlocks } =
    config.paginaInicio;

  return (
    <main className={styles.main}>
      <Hero data={hero} />
      <CtaBlocks blocks={ctaBlocks} />
      <Metodologia data={metodologia} />
      <Filosofia data={filosofia} />
      {/* <Testimonios titulo={testimonios.titulo} /> */}
    </main>
  );
}
