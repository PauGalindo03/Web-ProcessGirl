import Testimonio from '../models/Testimonio.js'
import ProductoDigital from '../models/ProductoDigital.js'
import PaquetePD from '../models/PaquetePD.js'
import type { Testimonio as TestimonioPlano, TestimonioInput } from '../../../packages/types/testimonio.js'
import { mapTestimonio } from '../mappers/testimonio.js'

// ✅ Obtener testimonios públicos (solo activos)
export async function getPublicAll(): Promise<TestimonioPlano[]> {
  const docs = await Testimonio.find({ estado: 'Activo' })
    .sort({ createdAt: -1 })
    .populate('user', 'nombre')
    .populate('producto', 'titulo')
    .populate('paquete', 'titulo')

  return docs.map(mapTestimonio)
}

// ✅ Obtener todos (admin)
export async function getAll(): Promise<TestimonioPlano[]> {
  const docs = await Testimonio.find()
    .sort({ createdAt: -1 })
    .populate('user', 'nombre')
    .populate('producto', 'titulo')
    .populate('paquete', 'titulo')

  return docs.map(mapTestimonio)
}

// ✅ Crear testimonio
export async function create(
  data: Omit<TestimonioInput, 'user'>,
  userId: string
): Promise<TestimonioPlano> {
  // Validar producto o paquete si fueron proporcionados
  if (data.producto) {
    const prod = await ProductoDigital.findById(data.producto)
    if (!prod) throw new Error('Producto no encontrado')
  }
  if (data.paquete) {
    const pack = await PaquetePD.findById(data.paquete)
    if (!pack) throw new Error('Paquete no encontrado')
  }

  // Asignar el usuario autenticado
  const nuevoTestimonio = await new Testimonio({
    ...data,
    user: userId
  }).save()

  await nuevoTestimonio.populate(['user', 'producto', 'paquete'])
  return mapTestimonio(nuevoTestimonio)
}


// ✅ Actualizar testimonio
export async function update(id: string, data: Partial<TestimonioInput>): Promise<TestimonioPlano | null> {
  const actualizado = await Testimonio.findByIdAndUpdate(id, data, { new: true })
    .populate('user', 'nombre')
    .populate('producto', 'titulo')
    .populate('paquete', 'titulo')

  return actualizado ? mapTestimonio(actualizado) : null
}

// ✅ Eliminar testimonio
export async function remove(id: string): Promise<void> {
  await Testimonio.findByIdAndDelete(id)
}
