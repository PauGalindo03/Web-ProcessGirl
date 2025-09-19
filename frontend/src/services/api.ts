// src/services/api.ts
import axios from 'axios';

import { alertaGlobal } from '@/lib/alertaGlobal'; // función que puedes definir para mostrar alertas fuera de componentes

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://backend:5000/api/public',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Middleware para agregar token automáticamente
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

// Middleware para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Error de red o backend caído
      alertaGlobal('No se pudo conectar con el servidor. Intenta más tarde.', 'error');
    } else if (error.response.status >= 500) {
      alertaGlobal('Error interno del servidor. Estamos trabajando en ello.', 'error');
    }
    return Promise.reject(error);
  }
);

export default api;
