// src/components/auth/EstadoVerificacion.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styles from './EstadoVerificacion.module.css';

import { useAlerta } from '@/context/AlertaContext';
import { resendVerificationEmail } from '@/services/authService';

interface EstadoVerificacionProps {
  email: string;
  isEmailVerified: boolean;
  expiresAt?: string;
  onReenviar?: () => void; // ✅ esta línea es la clave
}

export default function EstadoVerificacion({
  email,
  isEmailVerified,
  expiresAt,
}: EstadoVerificacionProps) {
  const router = useRouter();
  const { mostrarAlerta } = useAlerta();
  const [cargando, setCargando] = useState(false);

  const tiempoRestante = expiresAt
    ? new Date(expiresAt).getTime() - Date.now()
    : null;

  const handleReenviar = async () => {
    setCargando(true);
    try {
      const res = await resendVerificationEmail(email);
      mostrarAlerta(res.message, 'success');
    } catch (err: unknown) {
      const mensaje =
        err instanceof Error
          ? err.message
          : typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message?: unknown }).message)
          : 'Error al reenviar el correo.';
      mostrarAlerta(mensaje, 'error');
    } finally {
      setCargando(false);
    }
  };

  if (isEmailVerified) {
    return (
      <div className={styles.estado}>
        <p>✅ Tu correo ya está verificado.</p>
        <button type="button" onClick={() => router.push('/auth/login')} className={styles.boton}>
          Iniciar sesión
        </button>
      </div>
    );
  }

  if (tiempoRestante !== null && tiempoRestante > 0) {
    const minutos = Math.floor(tiempoRestante / 60000);
    const segundos = Math.floor((tiempoRestante % 60000) / 1000);

    return (
      <div className={styles.estado}>
        <p>⏳ Tu correo aún no está verificado.</p>
        <p>
          El enlace expira en <strong>{minutos}:{segundos.toString().padStart(2, '0')}</strong>
        </p>
        <button type="button" onClick={handleReenviar} disabled={cargando} className={styles.boton}>
          {cargando ? 'Reenviando...' : 'Reenviar correo de verificación'}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.estado}>
      <p>❌ El enlace de verificación ha expirado.</p>
      <button type="button" onClick={() => router.push('/auth/register')} className={styles.boton}>
        Registrarme de nuevo
      </button>
    </div>
  );
}
