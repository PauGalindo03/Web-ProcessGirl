import { useLayoutEffect } from 'react';

export function useLockBodyScroll(active: boolean) {
  useLayoutEffect(() => {
    if (!active) return;
    // guardamos el overflow original
    const original = window.getComputedStyle(document.body).overflow;
    // bloqueamos el scroll
    document.body.style.overflow = 'hidden';
    // opcional: bloquear overscroll en móviles
    document.documentElement.style.overscrollBehavior = 'none';
    return () => {
      // restauramos
      document.body.style.overflow = original;
      document.documentElement.style.overscrollBehavior = '';
    };
  }, [active]);
}
