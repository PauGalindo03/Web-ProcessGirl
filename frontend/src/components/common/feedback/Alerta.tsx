"use client"
import { useState, useEffect, useCallback } from 'react';

import styles from './Alerta.module.css';

type AlertaProps = {
  tipo: 'error' | 'success' | 'info' | 'confirmacion';
  mensaje: string;
  onClose: (resultado?: boolean) => void;
};

export default function Alerta({ tipo, mensaje, onClose }: AlertaProps) {
  const [visible, setVisible] = useState(true);

  const cerrar = useCallback(
    (resultado?: boolean) => {
      setVisible(false);
      setTimeout(() => onClose(resultado), 300);
    },
    [onClose]
  );

  useEffect(() => {
    if (tipo !== 'error' && tipo !== 'confirmacion') {
      const timer = setTimeout(() => cerrar(), 2500);
      return () => clearTimeout(timer);
    }
  }, [tipo, cerrar]);

  return (
    <div className={`${styles.alerta} ${styles[tipo]} ${visible ? styles.visible : ''}`} role="alert">
      <div className={styles.mensaje}>{mensaje}</div>

      {tipo !== 'confirmacion' && (
        <button type="button" className={styles.cerrar} onClick={() => cerrar()} aria-label="Cerrar">
          &times;
        </button>
      )}

      {tipo === 'confirmacion' && (
        <div className={styles.botones}>
          <button type="button" className={styles.ok} onClick={() => cerrar(true)}>
            ACEPTAR
          </button>
          <button type="button" className={styles.cancel} onClick={() => cerrar(false)}>
            CANCELAR
          </button>
        </div>
      )}
    </div>
  );
}
