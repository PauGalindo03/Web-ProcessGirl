import type { CarritoTemporal, CarritoPersistente } from "@types";

import { fallbackProductos } from "./fallProductos";

function buildFallbackCarritos() {
  const GST = fallbackProductos.find(p => p.sku === "GST-001")!;
  const FCT = fallbackProductos.find(p => p.sku === "FCT-003")!; // corregido SKU

  const persistente: CarritoPersistente = {
    _id: "carrito-fake-001",
    tipo: "persistente",
    user: "usuario-fake-001",
    actualizado: new Date().toISOString(),
    items: [
      {
        _id: "item-prod-001",
        tipo: "producto",
        item: GST,
        precioBase: 1200,
        precioFinal: 960,
        descuento: 20,
      },
      {
        _id: "item-pack-001",
        tipo: "paquete",
        titulo: "Finanzas con Tacones Pack",
        productos: [GST, FCT],
        precioFinal: 1800,
        descuento: 10,
      },
    ],
  };

  const temporal: CarritoTemporal = {
    _id: "tem",
    tipo: "temporal",
    user: "temp",
    actualizado: new Date().toISOString(),
    items: [
      {
        _id: "item-prodTem-001",
        tipo: "producto",
        item: GST,
        precioBase: 1200,
        precioFinal: 960,
        descuento: 20,
      },
      {
        _id: "item-packTem-001",
        tipo: "paquete",
        titulo: "Finanzas con Tacones Pack",
        productos: [GST, FCT],
        precioFinal: 1800,
        descuento: 10,
      },
    ],
  };

  return { persistente, temporal };
}

export const { persistente: fallbackCarritoPers, temporal: fallbackCarritoTemp } =
  buildFallbackCarritos();
