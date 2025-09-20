import type { Request, Response } from "express";
import { CategoriaService } from "@services/categoriaService.js";
import { handleError } from "@utils/handleError";

const categoriaService = new CategoriaService();

// Rutas públicas
export const getPublicAll = async (_req: Request, res: Response) => {
  try {
    const categorias = await categoriaService.getAllPublic();
    res.json(categorias);
  } catch (error: any) {
    handleError(res, error.message, 500, "Error al obtener categorías")
  }
};

// Rutas admin
export const getAll = async (_req: Request, res: Response) => {
  try {
    const categorias = await categoriaService.getAllAdmin();
    res.json(categorias);
  } catch (error: any) {
    handleError(res, error.message, 500, "Error al obtener categorías")
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { nombre, textoFiltro } = req.body;
    if (!nombre) return res.status(400).json({ error: "El nombre de la categoría es requerido" });

    const nuevaCategoria = await categoriaService.createCategoria(nombre);
    res.status(201).json(nuevaCategoria);
  } catch (error: any) {
    if (error.code === 11000) return handleError(res, "Ya existe categoría", 409);
    handleError(res, error.message, 500, "Error al crear categoría");
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return handleError(res, "ID de categoría requerido", 400);
    }

    const categoriaActualizada = await categoriaService.updateCategoria(id, updateData);
    res.json(categoriaActualizada);
  } catch (error: any) {
    if (error.code === 11000) return handleError(res, "Ya existe categoría", 409);
    handleError(res, error.message, 500, "Error al actualizar categoría");
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return handleError(res, "ID de categoría requerido", 400);
    }
    const result = await categoriaService.deleteCategoria(id);
    res.json(result);
  } catch (error: any) {
    handleError(res, error.message, 500, "Error al eliminar categoría");
  }
};

export default { getPublicAll, getAll, create, update, delete: remove };
