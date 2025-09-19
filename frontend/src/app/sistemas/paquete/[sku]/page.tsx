import { notFound } from "next/navigation";

import { ClientRenderer } from "@/components/common";
import { fallbackPaquetes } from "@/fallbacks/fallPaquetes";
import PaquetePage from "@/pages/PaquetePage/PaquetePage";
import { getPublicBySku } from "@/services/paquetePDService";

export async function generateStaticParams() {
  // Esto solo se usa en build time o en modo fake
  return fallbackPaquetes.map(p => ({ sku: p.sku }));
}
type PageParams = Promise<{ sku: string }>;

export default async function Page({ params }: { params: PageParams }) {
  try {
    const { sku } = await params;
    const paquete = await getPublicBySku(sku);
    if (!paquete) notFound();
    return <ClientRenderer Component={PaquetePage} props={{ paquete }} />;
  } catch (err) {
    console.error("Error al cargar paquete:", err);
    notFound();
  }
}
