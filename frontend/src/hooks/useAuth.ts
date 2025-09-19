import { useContext } from "react";

import type { AuthContextType } from "@/context/AuthContext"; // 👈 importar el tipo solo para tipar

import { AuthContext } from "@/context/AuthContext"; // 👈 importar el contexto, no el tipo

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
