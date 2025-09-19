// src/controllers/paquetePD.controller.ts
import type { Request, Response } from "express";
import * as paqueteService from "../services/paquetePDService.js";

export const getPublicAll = async (_req: Request, res: Response) => {
  try {
    const data = await paqueteService.getPublicAll();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Error al obtener paquetes públicos", message: err.message });
  }
};

export const getPublicById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID no proporcionado" });

    const data = await paqueteService.getPublicById(id);
    if (!data) return res.status(404).json({ error: "Paquete no encontrado" });

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Error al obtener paquete", message: err.message });
  }
};

export const getPublicBySku = async (req: Request, res: Response) => {
  try {
    const { sku } = req.params;
    if (!sku) return res.status(400).json({ error: "SKU no proporcionado" });

    const data = await paqueteService.getPublicById(sku);
    if (!data) return res.status(404).json({ error: "Paquete no encontrado" });

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Error al obtener paquete", message: err.message });
  }
};


export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await paqueteService.getAll();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Error al obtener paquetes", message: err.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const data = await paqueteService.create(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Error al crear paquete", message: err.message });
  }
};

export const update = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const data = await paqueteService.update(req.params.id, req.body);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Error al actualizar paquete", message: err.message });
  }
};

export const remove = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const data = await paqueteService.remove(req.params.id);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Error al eliminar paquete", message: err.message });
  }
};

export default { getPublicAll, getPublicById, getPublicBySku, getAll, create, update, remove };
