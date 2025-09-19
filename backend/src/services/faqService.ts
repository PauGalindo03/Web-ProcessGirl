// backend/src/services/faq.ts
import mongoose from "mongoose"
import FAQModel from "../models/Faq.js"
import type { Faq, FaqInput } from "../../../packages/types/faq.js"
import { sendContactEmail } from "./emailService.js"

function toPlanoFaq(doc: any): Faq {
  return {
    _id: doc._id.toString(),
    estado: doc.estado,
    isUserLoggedIn: doc.isUserLoggedIn ?? undefined,
    correo: doc.correo || undefined,
    pregunta: doc.pregunta,
    respuesta: doc.respuesta || undefined,
    categoria: doc.categoria || undefined,
    orden: doc.orden ?? undefined,
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  }
}

export async function getActiveFAQs(): Promise<Faq[]> {
  const docs = await FAQModel.find({ estado: "Activo" }).sort({ orden: 1 }).lean()
  return docs.map(toPlanoFaq)
}

export async function getAllFAQs(): Promise<Faq[]> {
  const docs = await FAQModel.find().sort({ orden: 1 }).lean()
  return docs.map(toPlanoFaq)
}

export async function createFAQ(data: FaqInput): Promise<Faq> {
  const lastFaq = await FAQModel.findOne().sort({ orden: -1 }).lean()
  const newOrden = (lastFaq?.orden ?? 0) + 1
  const faq = await new FAQModel({ ...data, orden: newOrden }).save()
  return toPlanoFaq(faq.toObject())
}

export async function updateFAQ(id: string, data: FaqInput): Promise<Faq | null> {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const faqToUpdate = await FAQModel.findById(id).session(session)
    if (!faqToUpdate) throw new Error("FAQ no encontrada.")

    const oldOrden = faqToUpdate.orden ?? 0
    if (data.orden !== undefined && data.orden !== oldOrden) {
      const newOrden = data.orden
      if (newOrden < oldOrden) {
        await FAQModel.updateMany(
          { orden: { $gte: newOrden, $lt: oldOrden } },
          { $inc: { orden: 1 } }
        ).session(session)
      } else {
        await FAQModel.updateMany(
          { orden: { $gt: oldOrden, $lte: newOrden } },
          { $inc: { orden: -1 } }
        ).session(session)
      }
    }

    Object.assign(faqToUpdate, data)
    await faqToUpdate.save({ session })
    await session.commitTransaction()
    return toPlanoFaq(faqToUpdate.toObject())
  } catch (err) {
    await session.abortTransaction()
    throw err
  } finally {
    session.endSession()
  }
}

export async function deleteFAQ(id: string): Promise<void> {
  await FAQModel.findByIdAndDelete(id)
}

/**
 * Envía un mensaje de contacto y lo guarda como FAQ pendiente.
 */
export async function handleContactMessage(
  nombre: string,
  email: string,
  asunto: string,
  mensaje: string
): Promise<void> {
  await sendContactEmail(nombre, email, asunto, mensaje)

  const faqData: FaqInput = {
    pregunta: mensaje.trim() || asunto.trim() || `Mensaje sin contenido - ${Date.now()}`,
    respuesta: "",
    categoria: "General",
    estado: "Pendiente",
    correo: email,
  }

  await createFAQ(faqData)
}

export default {
  getActiveFAQs,
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  handleContactMessage,
}
