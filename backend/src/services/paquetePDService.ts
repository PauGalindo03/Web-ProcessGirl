import mongoose, { Types } from 'mongoose'
import PaquetePDModel from '../models/PaquetePD.js'
import ProductoDigital from '../models/ProductoDigital.js'
import { calcularPrecios } from '../utils/pricing.js'
import type { PaquetePD, PaquetePDInput } from '../../../packages/types/paquetePD.js'
import { mapPaquetePD } from '../mappers/paquetePD.js'

type ProductoParaCalculo = { precio: number; descuento?: number }

// ✅ Obtener paquetes activos (público)
export async function getPublicAll(): Promise<PaquetePD[]> {
  const docs = await PaquetePDModel.find({ estado: 'Activo' })
    .sort({ paquete: 1 })
    .populate('productos')
  return docs.map(mapPaquetePD)
}

export async function getPublicById(id: string): Promise<PaquetePD | null> {
  const doc = await PaquetePDModel.findOne({ _id: id, estado: "Activo" }).populate("productos");
  return doc ? mapPaquetePD(doc) : null;
}

export async function getPublicBySku(sku: string): Promise<PaquetePD | null> {
  const doc = await PaquetePDModel.findOne({ sku, estado: "Activo" }).populate("productos");
  return doc ? mapPaquetePD(doc) : null;
}

// ✅ Obtener todos (admin)
export async function getAll(): Promise<PaquetePD[]> {
  const docs = await PaquetePDModel.find()
    .sort({ paquete: 1 })
    .populate('productos')
  return docs.map(mapPaquetePD)
}

// ✅ Crear paquete
export async function create(data: PaquetePDInput): Promise<PaquetePD> {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const ultimo = await PaquetePDModel.findOne().sort({ paquete: -1 }).session(session)
    const nuevoNumero = ultimo?.paquete ? ultimo.paquete + 1 : 1

    const productosCompletos = data.productos?.length
      ? await ProductoDigital.find({ _id: { $in: data.productos } })
      : []

    const productosParaCalculo: ProductoParaCalculo[] = productosCompletos.map((prod) => ({
      precio: prod.precioBase || 0,
      descuento: prod.descuento || 0,
    }))

    const infoPrecios = calcularPrecios({
      descuento: data.descuento || 0,
      productos: productosParaCalculo,
    })

    const nuevoPaquete = new PaquetePDModel({
      ...data,
      paquete: nuevoNumero,
      precio: infoPrecios.totalFinal,
    })

    await nuevoPaquete.save({ session })

    if (data.productos?.length) {
      await ProductoDigital.updateMany(
        { _id: { $in: data.productos } },
        { $addToSet: { paquete: nuevoPaquete._id } },
        { session }
      )
    }

    await session.commitTransaction()
    await nuevoPaquete.populate('productos')
    return mapPaquetePD(nuevoPaquete)
  } catch (err) {
    await session.abortTransaction()
    throw err
  } finally {
    session.endSession()
  }
}

// ✅ Actualizar paquete
export async function update(id: string, data: Partial<PaquetePDInput>): Promise<PaquetePD> {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { productos: newProductIds = [], ...updateData } = data

    const paqueteAntes = await PaquetePDModel.findById(id)
    if (!paqueteAntes) throw new Error('Paquete no encontrado')

    const oldProductIds = paqueteAntes.productos.map((p) => p.toString())
    const productsToAdd = newProductIds.filter((pid) => !oldProductIds.includes(pid.toString()))
    const productsToRemove = oldProductIds.filter(
      (pid) => !newProductIds.map((id) => id.toString()).includes(pid)
    )

    const paqueteActualizado = await PaquetePDModel.findByIdAndUpdate(
      id,
      { ...updateData, productos: newProductIds },
      { new: true, session }
    ).populate('productos')

    if (!paqueteActualizado) throw new Error('No se pudo actualizar paquete')

    await ProductoDigital.updateMany(
      { _id: { $in: productsToAdd } },
      { $addToSet: { paquete: paqueteActualizado._id } },
      { session }
    )

    await ProductoDigital.updateMany(
      { _id: { $in: productsToRemove } },
      { $pull: { paquete: paqueteActualizado._id } },
      { session }
    )

    await session.commitTransaction()
    return mapPaquetePD(paqueteActualizado)
  } catch (err) {
    await session.abortTransaction()
    throw err
  } finally {
    session.endSession()
  }
}

// ✅ Eliminar paquete
export async function remove(id: string): Promise<{ mensaje: string }> {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const paqueteEliminado = await PaquetePDModel.findById(id).session(session)
    if (!paqueteEliminado) throw new Error('Paquete no encontrado')

    await ProductoDigital.updateMany(
      { paquete: paqueteEliminado._id },
      { $pull: { paquete: paqueteEliminado._id } },
      { session }
    )

    await paqueteEliminado.deleteOne({ session })
    await PaquetePDModel.updateMany(
      { paquete: { $gt: paqueteEliminado.paquete } },
      { $inc: { paquete: -1 } },
      { session }
    )

    await session.commitTransaction()
    return { mensaje: 'Paquete eliminado y relaciones limpiadas' }
  } catch (err) {
    await session.abortTransaction()
    throw err
  } finally {
    session.endSession()
  }
}
