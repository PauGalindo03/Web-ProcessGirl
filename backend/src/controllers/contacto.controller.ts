// src/controllers/contacto.controller.ts
import type { Request, Response } from "express";
import * as ContactoService from "@services/contactoService.js";
import type { ContactoInput } from "@types";
import { handleError } from "@utils/handleError";

// Public
export const getPublicAll = async (_req: Request, res: Response) => {
  try {
    const contactos = await ContactoService.getPublicContactos();
    res.json(contactos);
  } catch (error: any) {
    handleError(res, error.message, 500, "Error al obtener contactos públicos")
  }
};

// Admin
export const getAll = async (_req: Request, res: Response) => {
  try {
    const contactos = await ContactoService.getAllContactos();
    res.json(contactos);
  } catch (error: any) {
    handleError(res, error.message, 500, "Error al obtener contactos")
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const contacto = await ContactoService.createContacto(req.body as ContactoInput);
    res.status(201).json(contacto);
  } catch (error: any) {
    if (error.code === 11000) return handleError(res, error.message, 409, "Conflicto de orden");
    handleError(res, error.message, 400, "Error al crear contacto");
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      return handleError(res, "ID de contacto requerido", 400);
    }
    const contacto = await ContactoService.updateContacto(id, req.body as ContactoInput);
    res.json({ mensaje: "Contacto actualizado", contacto });
  } catch (error: any) {
    if (error.code === 11000) return handleError(res, error.message, 409, "Conflicto de orden");
    handleError(res, error.message, 500, "Error al actualizar contacto");
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      return handleError(res, "ID de contacto requerido", 400);
    }
    await ContactoService.deleteContacto(id);
    res.json({ mensaje: "Contacto eliminado" });
  } catch (error: any) {
    handleError(res, error.message, 500, "Error al eliminar contacto");
  }
};

export default { getPublicAll, getAll, create, update, delete: remove };
