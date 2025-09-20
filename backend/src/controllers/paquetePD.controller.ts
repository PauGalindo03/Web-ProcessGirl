// src/controllers/paquetePD.controller.ts
import type { Request, Response } from "express";
import * as paqueteService from "@services/paquetePDService.js";
import { handleError } from "@utils/handleError";

export const getPublicAll = async (_req: Request, res: Response) => {
  try {
    const data = await paqueteService.getPublicAll();
    res.json(data);
  } catch (err) {
    handleError(res, err, 500, "obtener paquetes públicos");
  }
};

export const getPublicById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "ID no proporcionado" });

  try {
    const data = await paqueteService.getPublicById(id);
    if (!data) return res.status(404).json({ error: "Paquete no encontrado" });

    res.json(data);
  } catch (err) {
    handleError(res, err, 500, "obtener paquete por ID");
  }
};

export const getPublicBySku = async (req: Request, res: Response) => {
  const { sku } = req.params;
  if (!sku) return res.status(400).json({ error: "SKU no proporcionado" });

  try {
    const data = await paqueteService.getPublicById(sku);
    if (!data) return res.status(404).json({ error: "Paquete no encontrado" });

    res.json(data);
  } catch (err) {
    handleError(res, err, 500, "obtener paquete por SKU");
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await paqueteService.getAll();
    res.json(data);
  } catch (err) {
    handleError(res, err, 500, "obtener todos los paquetes");
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const data = await paqueteService.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    handleError(res, err, 500, "crear paquete");
  }
};

export const update = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const data = await paqueteService.update(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    handleError(res, err, 500, "actualizar paquete");
  }
};

export const remove = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const data = await paqueteService.remove(req.params.id);
    res.json(data);
  } catch (err) {
    handleError(res, err, 500, "eliminar paquete");
  }
};

export default {
  getPublicAll,
  getPublicById,
  getPublicBySku,
  getAll,
  create,
  update,
  remove,
};
