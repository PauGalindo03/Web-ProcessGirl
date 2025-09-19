import mongoose from 'mongoose'
import ContactoModel from '../models/Contacto.js'
import type { Contacto, ContactoInput } from '../../../packages/types/contacto.js'

// 🔹 Mapper: Documento Mongoose → Contacto plano
function toPlanoContacto(doc: any): Contacto {
  return {
    _id: doc._id.toString(),
    estado: doc.estado,
    objetivo: doc.objetivo,
    titulo: doc.titulo,
    texto: doc.texto,
    cta: doc.cta,
    orden: doc.orden,
    ...(doc.enlace ? { enlace: doc.enlace } : {}),
    ...(doc.preview ? { preview: doc.preview } : {}),
    ...(doc.createdAt ? { createdAt: doc.createdAt.toISOString() } : {}),
    ...(doc.updatedAt ? { updatedAt: doc.updatedAt.toISOString() } : {}),
  }
}

// ✅ Obtener contactos públicos (solo activos)
export async function getPublicContactos(): Promise<Contacto[]> {
  const docs = await ContactoModel.find({ estado: 'Activo' })
    .sort({ orden: 1 })
    .lean()
  return docs.map(toPlanoContacto)
}

// ✅ Obtener todos los contactos (admin)
export async function getAllContactos(): Promise<Contacto[]> {
  const docs = await ContactoModel.find().sort({ orden: 1 }).lean()
  return docs.map(toPlanoContacto)
}

// ✅ Crear contacto
export async function createContacto(data: ContactoInput): Promise<Contacto> {
  const ultimo = await ContactoModel.findOne().sort({ orden: -1 }).lean()
  const nuevoOrden = ultimo ? ultimo.orden + 1 : 1

  const nuevoContacto = await new ContactoModel({ ...data, orden: nuevoOrden }).save()
  return toPlanoContacto(nuevoContacto.toObject())
}

// ✅ Actualizar contacto (parcial)
export async function updateContacto(
  id: string,
  updateData: Partial<ContactoInput>
): Promise<Contacto | null> {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const contactoActual = await ContactoModel.findById(id).session(session)
    if (!contactoActual) throw new Error('Contacto no encontrado')

    const { orden: nuevoOrden, ...otrosDatos } = updateData
    const ordenViejo = contactoActual.orden

    if (nuevoOrden !== undefined && nuevoOrden !== ordenViejo) {
      const nuevoNum = parseInt(nuevoOrden.toString(), 10)
      if (isNaN(nuevoNum) || nuevoNum <= 0) throw new Error('Valor de orden inválido')

      if (nuevoNum < ordenViejo) {
        await ContactoModel.updateMany(
          { orden: { $gte: nuevoNum, $lt: ordenViejo } },
          { $inc: { orden: 1 } }
        ).session(session)
      } else if (nuevoNum > ordenViejo) {
        await ContactoModel.updateMany(
          { orden: { $gt: ordenViejo, $lte: nuevoNum } },
          { $inc: { orden: -1 } }
        ).session(session)
      }

      contactoActual.orden = nuevoNum
    }

    Object.assign(contactoActual, otrosDatos)
    await contactoActual.save({ session })

    await session.commitTransaction()
    session.endSession()

    return toPlanoContacto(contactoActual.toObject())
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

// ✅ Eliminar contacto + reordenar
export async function deleteContacto(id: string): Promise<void> {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const eliminado = await ContactoModel.findByIdAndDelete(id).session(session)
    if (!eliminado) throw new Error('Contacto no encontrado para eliminar')

    await ContactoModel.updateMany(
      { orden: { $gt: eliminado.orden } },
      { $inc: { orden: -1 } }
    ).session(session)

    await session.commitTransaction()
    session.endSession()
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}
