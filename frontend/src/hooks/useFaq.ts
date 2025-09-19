// src/app/hooks/useFaqs.ts
import { useState, useEffect, useCallback } from 'react';

import type { Faq } from "@types";

import * as faqService from '@/services/faqService';

export function useFaqs(isAdmin = false) {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFaqs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = isAdmin
        ? await faqService.getAllFAQs()
        : await faqService.getActiveFAQs();

      // Aseguramos que los campos obligatorios tengan valor
      const faqsParsed: Faq[] = data.map(f => ({
        _id: f._id!,
        estado: f.estado ?? "Activo",
        pregunta: f.pregunta ?? "",
        respuesta: f.respuesta,
        categoria: f.categoria ?? "General",
        orden: f.orden ?? 0,
        isUserLoggedIn: f.isUserLoggedIn,
        correo: f.correo,
        createdAt: f.createdAt,
        updatedAt: f.updatedAt,
      }));

      setFaqs(faqsParsed);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error al cargar FAQs");
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  return { faqs, loading, error, refresh: fetchFaqs };
}
