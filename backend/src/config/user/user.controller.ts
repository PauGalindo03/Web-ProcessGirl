// src/controllers/user.controller.ts
import type { Request, Response } from "express";
import * as UserService from "../user/userService.js";

// Helper para obtener el userId del req.user
function requireUserId(req: Request): string {
  if (!req.user?._id) throw new Error("No autorizado");
  return req.user._id as string;
}

// ────────── Controllers ──────────

// Obtener todos los usuarios (admin)
export const getAll = async (_req: Request, res: Response) => {
  try {
    const usuarios = await UserService.getAllUsers();
    res.json(usuarios);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error al obtener usuarios", message: error.message });
  }
};

// Obtener perfil propio
export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const usuario = await UserService.getUserById(requireUserId(req));
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error al obtener perfil", message: error.message });
  }
};

// Crear nuevo usuario (admin)
export const create = async (req: Request, res: Response) => {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.nombres ||
      !req.body.apellidos ||
      !req.body.direccion?.pais
    ) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const nuevoUsuario = await UserService.createUser(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error al crear usuario", message: error.message });
  }
};

// Actualizar usuario por ID (admin)
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password, ...updateData } = req.body;

    if (password)
      return res
        .status(400)
        .json({ error: "No se puede actualizar la contraseña aquí" });
    if (!id) return res.status(400).json({ error: "ID de usuario requerido" });

    const usuarioActualizado = await UserService.updateUserById(id, updateData);
    if (!usuarioActualizado)
      return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(usuarioActualizado);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error al actualizar usuario", message: error.message });
  }
};

// Actualizar perfil propio
export const updateMyProfile = async (req: Request, res: Response) => {
  try {
    const usuarioActualizado = await UserService.updateMyProfile(
      req.user!._id,
      req.body,
      req.file
    );
    res.json(usuarioActualizado);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error al actualizar perfil", message: error.message });
  }
};

// Cambiar contraseña propia
export const changeMyPassword = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const result = await UserService.changeMyPassword(
      req.user!._id,
      oldPassword,
      newPassword
    );
    res.json(result);
  } catch (error: any) {
    res.status(500).json({
      error: "Error al cambiar la contraseña",
      message: error.message,
    });
  }
};

// Eliminar usuario por ID (admin)
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID de usuario requerido" });

    const result = await UserService.deleteUserById(id);
    res.json(result);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error al eliminar usuario", message: error.message });
  }
};

export const getPredefinedAvatars = async (_req: Request, res: Response) => {
  try {
    const avatars = await UserService.getPredefinedAvatars();
    res.json(avatars);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleFavoriteTemplate = async (req: Request, res: Response) => {
  try {
    const { plantillaId } = req.params;
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }
    if (!plantillaId) {
      return res.status(400).json({ error: "ID de plantilla requerido" });
    }

    const user = await UserService.toggleFavoriteTemplate(
      userId.toString(),
      plantillaId
    );

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addCouponToUser = async (req: Request, res: Response) => {
  try {
    const { couponCode } = req.body;
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const user = await UserService.addCouponToUser(
      userId.toString(),
      couponCode
    );

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ────────── Export default ──────────
export default {
  getAll,
  getMyProfile,
  create,
  update,
  updateMyProfile,
  changeMyPassword,
  eliminar: remove,
  getPredefinedAvatars,
  toggleFavoriteTemplate,
  addCouponToUser,
};
