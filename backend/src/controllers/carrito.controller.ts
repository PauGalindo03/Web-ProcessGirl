import type { Request, Response } from "express";
import { CarritoService } from "@services/carritoService.js";
import { handleError } from "@utils/handleError";

// Obtener carrito + totales
export async function getCarrito(req: Request, res: Response) {
  try {
    const userId = req.user?._id;
    const carritoService = new CarritoService(userId);
    const carrito = await carritoService.getCarrito();
    const totales = await carritoService.calcularTotales();

    res.json({ items: carrito, totales });
  } catch (error: any) {
    handleError(res, error.message, 500, "Error al obtener carrito");
  }
}

// Agregar item al carrito
export async function addItem(req: Request, res: Response) {
  try {
    const userId = req.user?._id;
    const carritoService = new CarritoService(userId);
    const item = req.body;

    const carritoActualizado = await carritoService.addItem(item);
    const totales = await carritoService.calcularTotales();

    res.json({ items: carritoActualizado, totales });
  } catch (error: any) {
    handleError(res, error.message, 500, "Error al agregar item")
  }
}

// Eliminar item por índice o _id
export async function removeItem(req: Request, res: Response) {
  try {
    const userId = req.user?._id;
    const carritoService = new CarritoService(userId);
    const { indexOrId } = req.params;

    if (typeof indexOrId === "undefined") {
      return handleError(res, "Falta el parámetro indexOrId", 400)
    }

    const parsed = isNaN(Number(indexOrId)) ? indexOrId : Number(indexOrId);
    const carritoActualizado = await carritoService.removeItem(parsed);
    const totales = await carritoService.calcularTotales();

    res.json({ items: carritoActualizado, totales });
  } catch (error: any) {
    handleError(res, 500, error.message, "Error al eliminar item")
  }
}


// Limpiar carrito
export async function clearCarrito(req: Request, res: Response) {
  try {
    const userId = req.user?._id;
    const carritoService = new CarritoService(userId);

    const carritoVacio = await carritoService.clearCarrito();
    res.json({
      items: carritoVacio,
      totales: { totalBruto: 0, totalDescuentos: 0, totalFinal: 0 },
    });
  } catch (error: any) {
    handleError(res, 500, error.message, "Error al limpiar carrito")
  }
}

// Merge carrito temporal con persistente
export async function mergeCarrito(req: Request, res: Response) {
  try {
    const userId = req.user?._id;
    const carritoTemporal = req.body.items;
    const carritoService = new CarritoService(userId);

    const itemsActualizados = await carritoService.mergeCarrito(carritoTemporal);
    const totales = await carritoService.calcularTotales();

    res.json({ items: itemsActualizados, totales });
  } catch (error: any) {
    handleError(res, 500, error.message, "Error al combinar carritos")
  }
}

export default {
  getCarrito,
  addItem,
  removeItem,
  clearCarrito,
  mergeCarrito,
};
