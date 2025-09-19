import type { Request, Response } from "express";
import { CarritoService } from "../services/carritoService.js";

// Obtener carrito + totales
export async function getCarrito(req: Request, res: Response) {
  try {
    const userId = req.user?._id;
    const carritoService = new CarritoService(userId);
    const carrito = await carritoService.getCarrito();
    const totales = await carritoService.calcularTotales();

    res.json({ items: carrito, totales });
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener carrito", message: error.message });
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
    res.status(500).json({ error: "Error al agregar item", message: error.message });
  }
}

// Eliminar item por índice o _id
export async function removeItem(req: Request, res: Response) {
  try {
    const userId = req.user?._id;
    const carritoService = new CarritoService(userId);
    const { indexOrId } = req.params;

    if (typeof indexOrId === "undefined") {
      return res.status(400).json({ error: "Falta el parámetro indexOrId" });
    }

    const parsed = isNaN(Number(indexOrId)) ? indexOrId : Number(indexOrId);
    const carritoActualizado = await carritoService.removeItem(parsed);
    const totales = await carritoService.calcularTotales();

    res.json({ items: carritoActualizado, totales });
  } catch (error: any) {
    res.status(500).json({ error: "Error al eliminar item", message: error.message });
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
    res.status(500).json({ error: "Error al limpiar carrito", message: error.message });
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
    res.status(500).json({ error: "Error al combinar carritos", message: error.message });
  }
}

export default {
  getCarrito,
  addItem,
  removeItem,
  clearCarrito,
  mergeCarrito,
};
