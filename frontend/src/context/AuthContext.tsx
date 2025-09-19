"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

import type { Usuario, RegisterUserInput, AuthResponse } from "@types";
import type { AxiosError } from "axios";
import type { ReactNode } from "react";

import { login, register } from "@/services/authService";

export interface AuthContextType {
  user: Usuario | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  usuarioLogueado: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (userData: RegisterUserInput) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Helper para mapear AuthResponse.user a User completo
function mapUserFromAuthResponse(
  authUser: AuthResponse["user"],
  _password?: string
): Usuario {
  return {
    ...authUser,
    historialCompras: [],
    plantillasFavoritas: [],
    cupones: [],
    isEmailVerified: false,
  };
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const usuarioLogueado = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Si tienes un endpoint tipo /me, aquí podrías hacer:
      // fetchUserFromToken(storedToken).then(setUser).catch(() => logout());
    }
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const data: AuthResponse = await login(email, password);
      const mappedUser = mapUserFromAuthResponse(data.user, password);

      setUser(mappedUser);
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;

      const errorMsg =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Error al iniciar sesión";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData: RegisterUserInput) => {
    try {
      setLoading(true);
      setError(null);

      const data: AuthResponse = await register(userData);
      const mappedUser = mapUserFromAuthResponse(data.user, userData.password);

      setUser(mappedUser);
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const errorMsg =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Error al registrar usuario";

      setError(errorMsg);
      throw new Error(errorMsg); // 👈 esto es clave para que el componente lo capture
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        usuarioLogueado,
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
