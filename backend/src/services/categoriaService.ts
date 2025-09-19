import Categoria from '../models/Categoria.js'
import ProductoDigital from '../models/ProductoDigital.js'
import type { Categoria as CategoriaPlano, CategoriaInput } from '../../../packages/types/categoria.js'
import { mapCategoria } from '../mappers/categoria.js'

export class CategoriaService {
  // Obtener todas las categorías (solo nombres y estado) - público
  async getAllPublic(): Promise<CategoriaPlano[]> {
    const categorias = await Categoria.find({}, 'nombre estado textoFiltro')
      .sort({ nombre: 1 })
      .lean({ virtuals: true })

    return categorias.map(mapCategoria)
  }

  // Obtener todas las categorías (admin)
  async getAllAdmin(): Promise<CategoriaPlano[]> {
    const categorias = await Categoria.find()
      .sort({ nombre: 1 })
      .populate('productosDigitales')
      .lean({ virtuals: true })

    return categorias.map(mapCategoria)
  }

  // Crear categoría
  async createCategoria(data: CategoriaInput): Promise<CategoriaPlano> {
    const nuevaCategoria = new Categoria({
      nombre: data.nombre,
      textoFiltro: data.textoFiltro?.trim() !== '' ? data.textoFiltro : data.nombre,
      estado: data.estado,
    })

    await nuevaCategoria.save()
    return mapCategoria(nuevaCategoria)
  }

  // Actualizar categoría
  async updateCategoria(id: string, updateData: Partial<CategoriaInput>): Promise<CategoriaPlano> {
    const categoria = await Categoria.findById(id)
    if (!categoria) throw new Error('Categoría no encontrada')

    if (updateData.nombre) categoria.nombre = updateData.nombre
    if (updateData.textoFiltro !== undefined) categoria.textoFiltro = updateData.textoFiltro
    if (updateData.estado) categoria.estado = updateData.estado

    await categoria.save()
    return mapCategoria(categoria)
  }

  // Eliminar categoría
  async deleteCategoria(id: string): Promise<{ message: string }> {
    // Limpiar referencias en productos
    await ProductoDigital.updateMany({ categoria: id }, { $set: { categoria: null } })

    const categoriaEliminada = await Categoria.findByIdAndDelete(id)
    if (!categoriaEliminada) throw new Error('Categoría no encontrada')

    return { message: 'Categoría eliminada correctamente' }
  }
}
