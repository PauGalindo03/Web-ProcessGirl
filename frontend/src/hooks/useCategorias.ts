import { useState, useCallback, useEffect } from "react";

import type { Categoria } from "@types";

import { CategoriaService } from "@/services/categoriaService";

const service = new CategoriaService();

interface UseCategoriasProps {
  isAdmin?: boolean;
}

export function useCategorias({ isAdmin = false }: UseCategoriasProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategorias = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const dataRaw = isAdmin
        ? await service.getAllAdmin()
        : await service.getAllPublic();

      // Normalizar datos para que cumplan la interfaz Categoria
      const data: Categoria[] = dataRaw.map((cat) => ({
        _id: cat._id!,
        estado: cat.estado || "Activo",
        productosDigitales: cat.productosDigitales || [],
        nombre: cat.nombre || "",
        textoFiltro: cat.textoFiltro,
        createdAt: cat.createdAt,
        updatedAt: cat.updatedAt,
      }));

      setCategorias(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error al cargar categorías");
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  return { categorias, loading, error, refetch: fetchCategorias };
}
