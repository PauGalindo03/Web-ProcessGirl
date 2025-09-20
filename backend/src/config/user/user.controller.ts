import type { Request, Response } from "express";
import * as UserService from "../user/userService.js";
import { handleError } from "@utils/handleError";

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
  } catch (error) {
    handleError(res, error, 500, "obtener usuarios");
  }
};

// Obtener perfil propio
export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const usuario = await UserService.getUserById(requireUserId(req));
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    handleError(res, error, 500, "obtener perfil");
  }
};

// Crear nuevo usuario (admin)
export const create = async (req: Request, res: Response) => {
  try {
    const { email, password, nombres, apellidos, direccion } = req.body;
    if (!email || !password || !nombres || !apellidos || !direccion?.pais) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const nuevoUsuario = await UserService.createUser(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    handleError(res, error, 500, "crear usuario");
  }
};

// Actualizar usuario por ID (admin)
export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password, ...updateData } = req.body;

  if (password) {
    return res.status(400).json({ error: "No se puede actualizar la contraseña aquí" });
  }
  if (!id) {
    return res.status(400).json({ error: "ID de usuario requerido" });
  }

  try {
    const usuarioActualizado = await UserService.updateUserById(id, updateData);
    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuarioActualizado);
  } catch (error) {
    handleError(res, error, 500, "actualizar usuario");
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
  } catch (error) {
    handleError(res, error, 500, "actualizar perfil");
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
  } catch (error) {
    handleError(res, error, 500, "cambiar la contraseña");
  }
};

// Eliminar usuario por ID (admin)
export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID de usuario requerido" });
  }

  try {
    const result = await UserService.deleteUserById(id);
    res.json(result);
  } catch (error) {
    handleError(res, error, 500, "eliminar usuario");
  }
};

export const getPredefinedAvatars = async (_req: Request, res: Response) => {
  try {
    const avatars = await UserService.getPredefinedAvatars();
    res.json(avatars);
  } catch (error) {
    handleError(res, error, 500, "obtener avatares");
  }
};

export const toggleFavoriteTemplate = async (req: Request, res: Response) => {
  const { plantillaId } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }
  if (!plantillaId) {
    return res.status(400).json({ error: "ID de plantilla requerido" });
  }

  try {
    const user = await UserService.toggleFavoriteTemplate(
      userId.toString(),
      plantillaId
    );
    res.json(user);
  } catch (error) {
    handleError(res, error, 500, "actualizar favoritos");
  }
};

export const addCouponToUser = async (req: Request, res: Response) => {
  const { couponCode } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  try {
    const user = await UserService.addCouponToUser(
      userId.toString(),
      couponCode
    );
    res.json(user);
  } catch (error) {
    handleError(res, error, 500, "agregar cupón");
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
