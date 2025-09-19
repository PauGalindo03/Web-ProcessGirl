// src/hooks/useVerificacionCompleta.ts
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useAlerta } from '@/context/AlertaContext';
import { checkVerificationStatus, resendVerificationEmail } from '@/services/authService';

export function useVerificacion({ autoDetectParams = false }: { autoDetectParams?: boolean } = {}) {
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState<{ isEmailVerified: boolean; expiresAt?: string } | null>(null);
  const [tiempoRestante, setTiempoRestante] = useState<number | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const params = useSearchParams();
  const { mostrarAlerta } = useAlerta();

  // Detectar email y expiresAt desde URL si se activa autoDetectParams
  useEffect(() => {
    if (!autoDetectParams || !params) return;

    const emailParam = params.get('email');
    const expiresParam = params.get('expiresAt');

    if (emailParam) setEmail(emailParam);
    if (expiresParam) {
      const fecha = new Date(expiresParam);
      setEstado({ isEmailVerified: false, expiresAt: fecha.toISOString() });
    }
  }, [autoDetectParams, params]);

  // Temporizador si hay expiresAt
  useEffect(() => {
    if (!estado?.expiresAt) return;

    const expirationDate = new Date(estado.expiresAt);
    const updateTiempo = () => {
      const restante = expirationDate.getTime() - Date.now();
      setTiempoRestante(restante > 0 ? restante : 0);
      if (restante <= 0) {
        mostrarAlerta('Tu enlace de verificación ha expirado. Regístrate de nuevo.', 'error');
        router.push('/auth/register');
      }
    };

    updateTiempo();
    const interval = setInterval(updateTiempo, 1000);
    return () => clearInterval(interval);
  }, [estado?.expiresAt, mostrarAlerta, router]);

  const revisar = async (correo: string): Promise<string | null> => {
    setCargando(true);
    setError(null);
    try {
      const data = await checkVerificationStatus(correo);
      setEstado(data);
      setEmail(correo);
      return null;
    } catch (err: unknown) {
      const mensaje =
        err instanceof Error
          ? err.message
          : typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message?: unknown }).message)
          : 'No se encontró el correo o hubo un error.';
      setError(mensaje);
      return mensaje;
    } finally {
      setCargando(false);
    }
  };

  const reenviar = async (): Promise<string | null> => {
    setCargando(true);
    setError(null);
    try {
      await resendVerificationEmail(email);
      return null;
    } catch (err: unknown) {
      const mensaje =
        err instanceof Error
          ? err.message
          : typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message?: unknown }).message)
          : 'Error al reenviar el correo.';
      setError(mensaje);
      return mensaje;
    } finally {
      setCargando(false);
    }
  };

  return {
    email,
    setEmail,
    estado,
    cargando,
    error,
    tiempoRestante,
    revisar,
    reenviar,
  };
}
