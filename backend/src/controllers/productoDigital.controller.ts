// src/controllers/productoDigital.controller.ts
import type { Request, Response } from "express";
import * as productoService from "../services/productoDigitalService.js";
import type { ProductoDigital } from "../../../packages/types/productoDigital.js";

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
  } catch (error: any) {
    res.status(500).json({ error: "Error al crear producto", message: error.message });
  }
}

// ✅ Obtener públicos
export async function getPublicAll(req: Request, res: Response) {
  try {
    const productos = await productoService.obtenerPublicos();
    res.json(productos);
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener productos públicos", message: error.message });
  }
}

export const getPublicById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID no proporcionado" });

    const data = await productoService.getPublicById(id);
    if (!data) return res.status(404).json({ error: "Producto no encontrado" });

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Error al obtener producto", message: err.message });
  }
};

export const getPublicBySku = async (req: Request, res: Response) => {
  try {
    const { sku } = req.params;
    if (!sku) return res.status(400).json({ error: "SKU no proporcionado" });

    const data = await productoService.getPublicById(sku);
    if (!data) return res.status(404).json({ error: "Producto no encontrado" });

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Error al obtener producto", message: err.message });
  }
};


// ✅ Obtener todos
export async function getAll(req: Request, res: Response) {
  try {
    const productos = await productoService.obtenerTodos();
    res.json(productos);
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener productos", message: error.message });
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
  } catch (error: any) {
    res.status(500).json({ error: "Error al actualizar producto", message: error.message });
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
  } catch (error: any) {
    res.status(500).json({ error: "Error al eliminar producto", message: error.message });
  }
}

export default { create, getPublicAll, getPublicById, getPublicBySku, getAll, update, remove };