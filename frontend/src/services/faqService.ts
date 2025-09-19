// src/services/faqService.ts
import type { Faq, FaqInput } from "@types";

import api from './api';

// =======================
// Lectura pública (FAQs activas)
// =======================
export async function getActiveFAQs(): Promise<Faq[]> {
  const res = await api.get<Faq[]>('public/faq/active');
  return res.data;
}

// =======================
// Admin: obtener todas
// =======================
export async function getAllFAQs(): Promise<Faq[]> {
  const res = await api.get<Faq[]>('admin/faq');
  return res.data;
}

// =======================
// Crear FAQ
// =======================
export async function createFAQ(data: FaqInput): Promise<Faq> {
  const res = await api.post<Faq>('admin/faq', data)
  return res.data
}

// =======================
// Actualizar FAQ
// =======================
export async function updateFAQ(id: string, data: FaqInput): Promise<Faq> {
  const res = await api.put<Faq>(`admin/faq/${id}`, data)
  return res.data
}

// =======================
// Eliminar FAQ
// =======================
export async function deleteFAQ(id: string): Promise<{ message: string }> {
  const res = await api.delete<{ message: string }>(`admin/faq/${id}`);
  return res.data;
}