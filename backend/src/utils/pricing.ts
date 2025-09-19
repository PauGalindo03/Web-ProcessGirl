export interface IProducto {
  precio: number;
  promocion?: number; // porcentaje individual del producto (ej: 10 para 10%)
  [key: string]: any; // para cualquier otra propiedad
}

export interface IPaquete {
  promocion?: number; // porcentaje general del paquete
  productos: IProducto[];
  [key: string]: any; // otras propiedades opcionales
}

export interface IInfoPreciosProducto {
  precioReal: number;
  descuento: number;
  precioConDescuento: number;
}

export interface IResultadoCalculoPrecios {
  productosConPrecios: IInfoPreciosProducto[];
  precioFinalPaquete: number; // suma de productos con descuento individual
  totalSinDescuentoPd: number;
  totalConDescuentoPd: number;
  porcentajeDescuentoPd: string;
  descuentoPd: number;
  porcentajeDescuentoPaquete: number;
  descuentoPaquete: number;
  sumaTotalSinDescuentos: number;
  sumaTotalDescuentos: number;
  porcentajeTotalDescuentos: string;
  restaTotal: number;
  totalFinal: number;
  error?: string;
}

export function calcularPrecios(paqueteData: IPaquete): IResultadoCalculoPrecios {
  if (!paqueteData || !Array.isArray(paqueteData.productos)) {
    console.error("Error: paqueteData inválido", paqueteData);
    return {
      productosConPrecios: [],
      precioFinalPaquete: 0,
      totalSinDescuentoPd: 0,
      totalConDescuentoPd: 0,
      porcentajeDescuentoPd: "0.0",
      descuentoPd: 0,
      porcentajeDescuentoPaquete: 0,
      descuentoPaquete: 0,
      sumaTotalSinDescuentos: 0,
      sumaTotalDescuentos: 0,
      porcentajeTotalDescuentos: "0.0",
      restaTotal: 0,
      totalFinal: 0,
      error: "Datos de paquete inválidos"
    };
  }

  let totalSinDescuentoPd = 0;
  let totalConDescuentoPd = 0;
  let descuentoPd = 0;

  const productosConPrecios: IInfoPreciosProducto[] = paqueteData.productos.map(producto => {
    const precioReal = Math.max(0, producto.precio || 0);
    const descuento = (producto.promocion && producto.promocion > 0 && producto.promocion <= 100)
      ? +(precioReal * (producto.promocion / 100)).toFixed(2)
      : 0;
    const precioConDescuento = +(precioReal - descuento).toFixed(2);

    totalSinDescuentoPd += precioReal;
    totalConDescuentoPd += precioConDescuento;
    descuentoPd += descuento;

    return { precioReal, descuento, precioConDescuento };
  });

  const precioFinalPaquete = +totalConDescuentoPd.toFixed(2); // suma de productos con descuento individual

  const porcentajeDescuentoPd = totalSinDescuentoPd > 0
    ? ((descuentoPd / totalSinDescuentoPd) * 100).toFixed(1)
    : "0.0";

  const porcentajeDescuentoPaquete = (paqueteData.promocion && paqueteData.promocion > 0 && paqueteData.promocion <= 100)
    ? paqueteData.promocion
    : 0;

  const descuentoPaquete = +(totalConDescuentoPd * (porcentajeDescuentoPaquete / 100)).toFixed(2);
  const totalFinal = +(totalConDescuentoPd - descuentoPaquete).toFixed(2);
  const sumaTotalSinDescuentos = totalSinDescuentoPd;
  const sumaTotalDescuentos = descuentoPd + descuentoPaquete;
  const porcentajeTotalDescuentos = sumaTotalSinDescuentos > 0
    ? ((sumaTotalDescuentos / sumaTotalSinDescuentos) * 100).toFixed(1)
    : "0.0";
  const restaTotal = sumaTotalDescuentos;

  return {
    productosConPrecios,
    precioFinalPaquete,
    totalSinDescuentoPd: +totalSinDescuentoPd.toFixed(2),
    totalConDescuentoPd: +totalConDescuentoPd.toFixed(2),
    porcentajeDescuentoPd,
    descuentoPd: +descuentoPd.toFixed(2),
    porcentajeDescuentoPaquete,
    descuentoPaquete,
    sumaTotalSinDescuentos: +sumaTotalSinDescuentos.toFixed(2),
    sumaTotalDescuentos: +sumaTotalDescuentos.toFixed(2),
    porcentajeTotalDescuentos,
    restaTotal: +restaTotal.toFixed(2),
    totalFinal
  };
}
