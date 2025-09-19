'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

//import styles from "../VerificaCorreo.module.css";

import { useAlerta } from '@/context/AlertaContext';
import { verifyEmail } from '@/services/authService';

export default function VerificarToken() {
  const { mostrarAlerta } = useAlerta();
  const router = useRouter();
  const params = useSearchParams();
  const token = params?.get('token');

  useEffect(() => {
    const verificar = async () => {
      if (!token) {
        mostrarAlerta('Token no proporcionado.', 'error');
        return;
      }

      try {
        const res = await verifyEmail(token);
        mostrarAlerta(res.message, 'success');
        setTimeout(() => router.push('/auth/login'), 3000);
      } catch (err: unknown) {
        const mensaje =
          err instanceof Error
            ? err.message
            : typeof err === 'object' && err !== null && 'message' in err
            ? String((err as { message?: unknown }).message)
            : 'No se pudo verificar tu correo.';
        mostrarAlerta(mensaje, 'error');
      }
    };

    verificar();
  }, [token, router, mostrarAlerta]);

  return (
    <section>
      <h2>Verificando tu cuenta...</h2>
      <p>Estamos procesando tu verificación. Esto puede tardar unos segundos.</p>
    </section>
  );
}
