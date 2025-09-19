import type { Request, Response } from "express";
import * as testimonioService from "../services/testimonioService.js";
import type { Testimonio, TestimonioInput } from "../../../packages/types/testimonio.js";

// ✅ Obtener testimonios públicos
export const getPublicAll = async (_req: Request, res: Response) => {
  try {
    const testimonios = await testimonioService.getPublicAll();
    res.json(testimonios);
  } catch (error: any) {
    res.status(500).json({
      error: "Error al obtener testimonios públicos",
      message: error.message,
    });
  }
};

// ✅ Obtener todos los testimonios (admin)
export const getAll = async (_req: Request, res: Response) => {
  try {
    const testimonios = await testimonioService.getAll();
    res.json(testimonios);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error al obtener testimonios", message: error.message });
  }
};

// ✅ Crear testimonio
export const create = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id
    if (!userId) {
      return res.status(401).json({ error: 'Usuario no autenticado' })
    }

    const nuevoTestimonio = await testimonioService.create(req.body as Testimonio, userId)
    res.status(201).json(nuevoTestimonio)
  } catch (error: any) {
    res.status(400).json({
      error: 'Error al crear testimonio',
      message: error.message
    })
  }
}

// ✅ Actualizar testimonio
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "El parámetro 'id' es requerido" });
    }

    const actualizado = await testimonioService.update(id, req.body as TestimonioInput);
    if (!actualizado)
      return res.status(404).json({ error: "Testimonio no encontrado" });
    res.json({ mensaje: "Testimonio actualizado", testimonio: actualizado });
  } catch (error: any) {
    res.status(500).json({
      error: "Error al actualizar testimonio",
      message: error.message,
    });
  }
};

// ✅ Eliminar testimonio
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "El parámetro 'id' es requerido" });
    }

    await testimonioService.remove(id);
    res.json({ mensaje: "Testimonio eliminado" });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error al eliminar testimonio", message: error.message });
  }
};

export default { getPublicAll, getAll, create, update, delete: remove };
