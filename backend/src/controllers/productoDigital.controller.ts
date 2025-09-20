// src/controllers/productoDigital.controller.ts
import type { Request, Response } from "express";
import type { ProductoDigital } from "@types";
import * as productoService from "@services/productoDigitalService.js";
import { handleError } from "@utils/handleError";

// ✅ Crear producto
export async function create(req: Request, res: Response) {
  try {
    if (typeof req.body.imagenes === "string") {
      req.body.imagenes = req.body.imagenes
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
    }

    const producto = await productoService.crearProducto(req.body as ProductoDigital);
    res.status(201).json(producto);
  } catch (error) {
    handleError(res, error, 500, "crear producto");
  }
}

// ✅ Obtener públicos
export async function getPublicAll(req: Request, res: Response) {
  try {
    const productos = await productoService.obtenerPublicos();
    res.json(productos);
  } catch (error) {
    handleError(res, error, 500, "obtener productos públicos");
  }
}

export const getPublicById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "ID no proporcionado" });

  try {
    const data = await productoService.getPublicById(id);
    if (!data) return res.status(404).json({ error: "Producto no encontrado" });

    res.json(data);
  } catch (error) {
    handleError(res, error, 500, "obtener producto por ID");
  }
};

export const getPublicBySku = async (req: Request, res: Response) => {
  const { sku } = req.params;
  if (!sku) return res.status(400).json({ error: "SKU no proporcionado" });

  try {
    const data = await productoService.getPublicById(sku);
    if (!data) return res.status(404).json({ error: "Producto no encontrado" });

    res.json(data);
  } catch (error) {
    handleError(res, error, 500, "obtener producto por SKU");
  }
};

// ✅ Obtener todos
export async function getAll(req: Request, res: Response) {
  try {
    const productos = await productoService.obtenerTodos();
    res.json(productos);
  } catch (error) {
    handleError(res, error, 500, "obtener todos los productos");
  }
}

// ✅ Actualizar
export async function update(req: Request, res: Response) {
  try {
    if (typeof req.body.imagenes === "string") {
      req.body.imagenes = req.body.imagenes
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
    }

    const actualizado = await productoService.actualizarProducto(req.params.id as string, req.body);
    if (!actualizado) {
      res.status(404).json({ mensaje: "Producto no encontrado" });
      return;
    }

    res.json({ mensaje: "Producto actualizado", producto: actualizado });
  } catch (error) {
    handleError(res, error, 500, "actualizar producto");
  }
}

// ✅ Eliminar
export async function remove(req: Request, res: Response) {
  try {
    const eliminado = await productoService.eliminarProducto(req.params.id as string);
    if (!eliminado) {
      res.status(404).json({ mensaje: "Producto no encontrado" });
      return;
    }
    res.json({ mensaje: "Producto eliminado y relaciones limpiadas" });
  } catch (error) {
    handleError(res, error, 500, "eliminar producto");
  }
}

export default {
  create,
  getPublicAll,
  getPublicById,
  getPublicBySku,
  getAll,
  update,
  remove,
};
