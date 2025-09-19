'use client';
import { useEffect } from 'react';

import styles from './Overlay.module.css';

type OverlayProps = {
  onClose: () => void;
  ariaLabel?: string;
  className?: string;
};

export default function AccessibleOverlay({
  onClose,
  ariaLabel = 'Cerrar superposición',
  className = '',
}: OverlayProps) {
  // Cierre con tecla Esc
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      className={`${styles.overlay} ${className}`}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClose();
      }}
    />
  );
}
