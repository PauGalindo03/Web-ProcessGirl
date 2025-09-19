// src/controllers/contacto.controller.ts
import type { Request, Response } from "express";
import * as ContactoService from "../services/contactoService.js";
import type { ContactoInput } from "../../../packages/types/contacto.js";

// Public
export const getPublicAll = async (_req: Request, res: Response) => {
  try {
    const contactos = await ContactoService.getPublicContactos();
    res.json(contactos);
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener contactos públicos", message: error.message });
  }
};

// Admin
export const getAll = async (_req: Request, res: Response) => {
  try {
    const contactos = await ContactoService.getAllContactos();
    res.json(contactos);
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener contactos", message: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const contacto = await ContactoService.createContacto(req.body as ContactoInput);
    res.status(201).json(contacto);
  } catch (error: any) {
    if (error.code === 11000) return res.status(409).json({ error: "Conflicto de orden", message: error.message });
    res.status(400).json({ error: "Error al crear contacto", message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ error: "ID de contacto requerido" });
    }
    const contacto = await ContactoService.updateContacto(id, req.body as ContactoInput);
    res.json({ mensaje: "Contacto actualizado", contacto });
  } catch (error: any) {
    if (error.code === 11000) return res.status(409).json({ error: "Conflicto de orden", message: error.message });
    res.status(500).json({ error: "Error al actualizar contacto", message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ error: "ID de contacto requerido" });
    }
    await ContactoService.deleteContacto(id);
    res.json({ mensaje: "Contacto eliminado" });
  } catch (error: any) {
    res.status(500).json({ error: "Error al eliminar contacto", message: error.message });
  }
};

export default { getPublicAll, getAll, create, update, delete: remove };
