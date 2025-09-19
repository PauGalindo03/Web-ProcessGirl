// src/app/hooks/useUser.ts
import { useState, useEffect, useCallback } from 'react';

import type { Usuario, Cupon } from "@types";

import { fallUser } from "@/fallbacks/fallUsuario";
import * as userService from '@/services/userService';

const usarFallback = process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true";

export function useUser(userId?: string) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [avatars, setAvatars] = useState<string[]>([]);

  // =======================
  // Cargar usuario por ID
  // =======================
  const fetchUser = useCallback(async () => {
  if (!userId) return;
  setLoading(true);
  setError(null);
  try {
    if (usarFallback) {
      console.warn("Usando fallback de usuario");
      setUser(fallUser);
      return;
    }

    const data = await userService.getUserById(userId);
    setUser(data);
  } catch (err: unknown) {
    if (usarFallback) {
      console.warn("Error real, usando fallback de usuario");
      setUser(fallUser);
    }

    if (err instanceof Error) setError(err.message);
    else setError("Error al cargar usuario");
  } finally {
    setLoading(false);
  }
}, [userId]);


  // =======================
  // Refrescar usuario
  // =======================
  const refresh = () => fetchUser();

  // =======================
  // Actualizar perfil
  // data: FormData para incluir foto
  // =======================
  const updateProfile = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await userService.updateMyProfile(data);
      setUser(updatedUser);
      return updatedUser;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Error al actualizar perfil');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // Cambiar contraseña
  // =======================
  const changePassword = async (oldPassword: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    try {
      return await userService.changeMyPassword(oldPassword, newPassword);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Error al cambiar contraseña');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // Toggle plantilla favorita
  // =======================
  const esFavorito = (plantillaId: string) =>
  user?.plantillasFavoritas?.some((p) => typeof p === "string"
    ? p === plantillaId
    : p._id === plantillaId
  );
  const toggleFavorite = async (plantillaId: string) => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await userService.toggleFavoriteTemplate(plantillaId);
      setUser(updatedUser);
      return updatedUser;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Error al actualizar favoritos');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // Agregar cupón
  // =======================
  const addCoupon = async (couponData: Partial<Cupon>) => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await userService.addCouponToUser(couponData);
      setUser(updatedUser);
      return updatedUser;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Error al agregar cupón');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // Cargar avatares predefinidos
  // =======================
  const fetchPredefinedAvatars = async () => {
    setLoading(true);
    setError(null);
    try {
      const urls = await userService.getPredefinedAvatars();
      setAvatars(urls);
      return urls;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Error al cargar avatares');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // Inicializar carga de usuario si existe userId
  // =======================
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    setUser,
    loading,
    error,
    avatars,
    refresh,
    updateProfile,
    changePassword,
    esFavorito,
    toggleFavorite,
    addCoupon,
    fetchPredefinedAvatars,
  };
}
