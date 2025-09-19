// src/components/common/Modal.tsx
'use client';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';
import Overlay from './Overlay';

import { useLockBodyScroll } from '@/hooks/utils/useLockBodyScroll';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  ariaLabel?: string;
  className?: string;
  size?: 'lg' | 'xl' | 'fullscreen';
  showCloseButton?: boolean;
  dismissOnOverlayClick?: boolean;
};

export default function Modal({
  children,
  onClose,
  ariaLabel = 'Ventana modal',
  className = '',
  size = 'lg',
  showCloseButton = true,
  dismissOnOverlayClick = false,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(true);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const sizeClass =
    size === 'fullscreen'
      ? styles.fullscreen
      : size === 'xl'
      ? styles.xl
      : styles.lg;

  if (typeof window === 'undefined') return null;

  return createPortal(
    <>
      <Overlay onClose={dismissOnOverlayClick ? onClose : () => {}} />

      <div className={styles.modalWrapper}>
        {showCloseButton && (
          <button
            type="button"
            className="cerrar"
            onClick={onClose}
            aria-label="Cerrar ventana modal"
          >
            &times;
          </button>
        )}

        <div
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          tabIndex={-1}
          ref={modalRef}
          className={`${styles.modalContent} ${sizeClass} ${className}`}
        >
          {children}
        </div>
      </div>
    </>,
    document.getElementById('modal-root')!
  );
}
