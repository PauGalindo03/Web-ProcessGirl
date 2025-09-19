// src/fallbacks/fallContactos.ts
import type { Contacto } from "@types";

export const fallbackContactos: Contacto[] = [
  {
    _id: "1",
    estado: "Activo",
    objetivo: "Agendar una reunión",
    titulo: "Agenda una cita",
    texto: "Reserva un espacio para conversar sobre tu proyecto y cómo puedo ayudarte.",
    cta: "Agendar ahora",
    orden: 1,
    enlace: "https://www.canva.com/design/DAGybE9Thy8/636Je__ueoKCq0PborYK0Q/view?utm_content=DAGybE9Thy8&utm_campaign=designshare&utm_medium=embeds&utm_source=link",
    preview: "/img/contacto.png"
  },
  {
    _id: "2",
    estado: "Activo",
    objetivo: "Enviar un mensaje",
    titulo: "Escríbeme",
    texto: "Envíame un mensaje directo y te responderé lo antes posible.",
    cta: "Enviar mensaje",
    orden: 2,
    enlace: "https://wa.me/7774593804",
    preview: "/img/contacto.png"
  },
  {
    _id: "3",
    estado: "Activo",
    objetivo: "Solicitar información",
    titulo: "Más información",
    texto: "Solicita detalles sobre mis servicios y propuestas personalizadas.",
    cta: "Solicitar info",
    orden: 3,
    enlace: "", // sin enlace para probar fallback
    preview: "/img/contacto.png"
  }
];
