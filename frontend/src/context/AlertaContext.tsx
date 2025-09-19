// context/AlertaContext.tsx
"use client"
import { createContext, useContext, useState, useEffect } from "react";

import type { ReactNode } from "react";

import { Alerta } from "@/components/common";
import { registrarAlertaGlobal } from '@/lib/alertaGlobal'

type AlertaTipo = "info" | "success" | "error" | "confirmacion";

interface AlertaContextType {
  mostrarAlerta: (mensaje: string, tipo?: AlertaTipo) => Promise<boolean | void>;
}

const AlertaContext = createContext<AlertaContextType | undefined>(undefined);

export const AlertaProvider = ({ children }: { children: ReactNode }) => {
  const [alerta, setAlerta] = useState<{
    mensaje: string;
    tipo: AlertaTipo;
    resolver: (value?: boolean) => void;
  } | null>(null);

  const mostrarAlerta = (mensaje: string, tipo: AlertaTipo = 'info') => {
    return new Promise<boolean | void>((resolve) => {
      setAlerta({ mensaje, tipo, resolver: resolve });
    });
  };

  useEffect(() => {
    registrarAlertaGlobal((mensaje, tipo) => {
      mostrarAlerta(mensaje, tipo);
    });
  }, []);

  const handleClose = (resultado?: boolean) => {
    if (alerta?.resolver) alerta.resolver(resultado);
    setAlerta(null);
  };

  return (
    <AlertaContext.Provider value={{ mostrarAlerta }}>
      {children}
      {alerta && (
        <Alerta mensaje={alerta.mensaje} tipo={alerta.tipo} onClose={handleClose} />
      )}
    </AlertaContext.Provider>
  );
};

export const useAlerta = () => {
  const context = useContext(AlertaContext);
  if (!context) throw new Error("useAlerta debe usarse dentro de AlertaProvider");
  return context;
};
