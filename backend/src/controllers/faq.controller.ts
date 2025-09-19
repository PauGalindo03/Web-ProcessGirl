import type { Request, Response } from "express"
import faqService from "../services/faqService.js"
import type { Faq, FaqInput } from "../../../packages/types/faq.js"

interface ContactRequestBody {
  nombre: string
  email?: string
  asunto: string
  mensaje: string
}

export const sendContactMessage = async (
  req: Request<{}, {}, ContactRequestBody>,
  res: Response
) => {
  const nombre = req.body.nombre || req.user?.nombreCompleto || ""
  const email = req.body.email || req.user?.email || ""
  const { asunto, mensaje } = req.body

  if (!nombre || !asunto || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." })
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Formato de email inválido." })
  }

  try {
    await faqService.handleContactMessage(nombre, email, asunto, mensaje)
    res.status(200).json({ message: "Mensaje enviado con éxito. Te responderemos a la brevedad." })
  } catch (error: any) {
    console.error("Error al enviar mensaje de contacto:", error)
    if (error.code === 11000) {
      return res.status(409).json({
        error: "duplicate_faq_question",
        message: "Esta pregunta ya está pendiente de revisión de un administrador.",
      })
    }
    res.status(500).json({ error: "Error al enviar el mensaje.", details: error.message })
  }
}

export const getActiveFAQs = async (_req: Request, res: Response) => {
  try {
    const faqs: Faq[] = await faqService.getActiveFAQs()
    res.json(faqs)
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener FAQs activas." })
  }
}

export const getAllFAQs = async (_req: Request, res: Response) => {
  try {
    const faqs: Faq[] = await faqService.getAllFAQs()
    res.json(faqs)
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener todas las FAQs." })
  }
}

export const createFAQ = async (req: Request<{}, {}, Partial<Faq>>, res: Response) => {
  try {
    if (!req.body.pregunta) {
      return res.status(400).json({ error: "Pregunta es obligatoria." })
    }
    const newFaq = await faqService.createFAQ(req.body as Faq)
    res.status(201).json(newFaq)
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "Ya existe una FAQ con esa pregunta." })
    }
    res.status(500).json({ error: "Error al crear FAQ.", details: error.message })
  }
}

export const updateFAQ = async (
  req: Request<{ id: string }, {}, Partial<Faq> & { orden?: number }>,
  res: Response
) => {
  try {
    const updatedFaq = await faqService.updateFAQ(req.params.id, req.body as FaqInput)
    res.json(updatedFaq)
  } catch (error: any) {
    res.status(500).json({ error: "Error al actualizar FAQ.", details: error.message })
  }
}

export const deleteFAQ = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await faqService.deleteFAQ(req.params.id);
    res.json({ message: "FAQ eliminada correctamente." });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar FAQ.", details: error.message });
  }
};

export default {
  sendContactMessage,
  getActiveFAQs,
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
};
