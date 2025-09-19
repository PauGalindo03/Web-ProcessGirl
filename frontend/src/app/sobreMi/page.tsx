import { notFound } from "next/navigation";

import { getServerConfiguracion } from "@/lib/serverModels";
import SobreMiPage from "@/pages/SobreMiPage/SobreMiPage";

export default async function Page() {
  try {
    const config = await getServerConfiguracion();
    if (!config?.sobreMi) notFound();
    return <SobreMiPage sobreMi={config.sobreMi} />;
  } catch (err) {
    console.error("Error al cargar configuración",err);
  }
}
