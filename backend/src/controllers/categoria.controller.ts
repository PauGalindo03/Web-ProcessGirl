import type { Request, Response } from "express";
import { CategoriaService } from "../services/categoriaService.js";

const categoriaService = new CategoriaService();

// Rutas públicas
export const getPublicAll = async (_req: Request, res: Response) => {
  try {
    const categorias = await categoriaService.getAllPublic();
    res.json(categorias);
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener categorías", message: error.message });
  }
};

// Rutas admin
export const getAll = async (_req: Request, res: Response) => {
  try {
    const categorias = await categoriaService.getAllAdmin();
    res.json(categorias);
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener categorías", message: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { nombre, textoFiltro } = req.body;
    if (!nombre) return res.status(400).json({ error: "El nombre de la categoría es requerido" });

    const nuevaCategoria = await categoriaService.createCategoria(nombre);
    res.status(201).json(nuevaCategoria);
  } catch (error: any) {
    if (error.code === 11000) return res.status(409).json({ error: "Ya existe la categoría" });
    res.status(500).json({ error: "Error al crear categoría", message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID de categoría requerido" });
    }

    const categoriaActualizada = await categoriaService.updateCategoria(id, updateData);
    res.json(categoriaActualizada);
  } catch (error: any) {
    if (error.code === 11000) return res.status(409).json({ error: "Nombre de categoría ya existe" });
    res.status(500).json({ error: "Error al actualizar categoría", message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID de categoría requerido" });
    }
    const result = await categoriaService.deleteCategoria(id);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: "Error al eliminar categoría", message: error.message });
  }
};

export default { getPublicAll, getAll, create, update, delete: remove };
