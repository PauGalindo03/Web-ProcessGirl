// src/services/categoriaService.ts
import type { Categoria } from "@types";

import api from './api';

export class CategoriaService {
  // =======================
  // Obtener todas las categorías públicas (solo nombres y estado)
  // =======================
  async getAllPublic(): Promise<Categoria[]> {
    const res = await api.get<Categoria[]>('/categorias/public');
    return res.data;
  }

  // =======================
  // Obtener todas las categorías (admin)
  // =======================
  async getAllAdmin(): Promise<Categoria[]> {
    const res = await api.get<Categoria[]>('/categorias/admin');
    return res.data;
  }

  // =======================
  // Crear categoría
  // =======================
  async createCategoria(nombre: string, textoFiltro?: string): Promise<Categoria> {
    const res = await api.post<Categoria>('/categorias', { nombre, textoFiltro });
    return res.data;
  }

  // =======================
  // Actualizar categoría
  // =======================
  async updateCategoria(id: string, updateData: Partial<Categoria>): Promise<Categoria> {
    const res = await api.put<Categoria>(`/categorias/${id}`, updateData);
    return res.data;
  }


  // =======================
  // Eliminar categoría
  // =======================
  async deleteCategoria(id: string): Promise<{ message: string }> {
    const res = await api.delete<{ message: string }>(`/categorias/${id}`);
    return res.data;
  }
}
