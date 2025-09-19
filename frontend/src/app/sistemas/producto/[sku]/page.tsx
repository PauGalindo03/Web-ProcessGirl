// src/app/sistemas/producto/[sku]/page.tsx
import { notFound } from "next/navigation";

import { ClientRenderer } from "@/components/common";
import { fallbackProductos } from "@/fallbacks/fallProductos";
import ProductoPage from "@/pages/ProductoPage/ProductoPage";
import { getPublicBySku } from "@/services/productoDigitalService";

export async function generateStaticParams() {
  return fallbackProductos.map((p) => ({ sku: p.sku }));
}

type PageParams = Promise<{ sku: string }>;

export default async function Page({ params }: { params: PageParams }) {
  try {
    const { sku } = await params;
    const producto = await getPublicBySku(sku);
    if (!producto) notFound();
    return <ClientRenderer Component={ProductoPage} props={{ producto }} />;
  } catch (err) {
    console.error("Error al cargar producto:", err);
    notFound();
  }
}
