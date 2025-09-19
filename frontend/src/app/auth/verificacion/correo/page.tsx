'use client';
import styles from '../VerificaCorreo.module.css';

import { useVerificacion } from '@/hooks/utils/useVerificacion';

export default function VerificaCorreo() {
  const {
    email,
    setEmail,
    tiempoRestante,
    cargando,
    reenviar,
  } = useVerificacion({ autoDetectParams: true });;

  const minutos = tiempoRestante ? Math.floor(tiempoRestante / 60000) : 0;
  const segundos = tiempoRestante ? Math.floor((tiempoRestante % 60000) / 1000) : 0;

  return (
    <section className={styles.container}>
      <h2>Verifica tu correo</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
        placeholder="Tu correo"
      />

      {tiempoRestante !== null && tiempoRestante > 0 && (
        <>
          <p>Tu enlace expira en <strong>{minutos}:{segundos.toString().padStart(2, '0')}</strong></p>
          <button onClick={reenviar} disabled={cargando || !email} className={styles.boton}>
            {cargando ? 'Reenviando...' : 'Reenviar correo'}
          </button>
        </>
      )}
    </section>
  );
}
