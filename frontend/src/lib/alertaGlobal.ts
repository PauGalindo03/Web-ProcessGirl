// src/utils/alertaGlobal.ts
let mostrarAlertaExterna: ((mensaje: string, tipo?: 'error' | 'success' | 'info') => void) | null = null;

export function registrarAlertaGlobal(fn: typeof mostrarAlertaExterna) {
  mostrarAlertaExterna = fn;
}

export function alertaGlobal(mensaje: string, tipo: 'error' | 'success' | 'info' = 'info') {
  if (mostrarAlertaExterna) {
    mostrarAlertaExterna(mensaje, tipo);
  } else {
    console.warn('No se ha registrado mostrarAlertaGlobal');
  }
}
