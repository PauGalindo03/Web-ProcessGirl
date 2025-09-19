import type { Configuracion } from "@types";

function buildFallbackConfiguracion(): Configuracion {
  return {
    _id: "config-fake-001",
    colores: {
      principal: "#ef1e9f",
      secundario: "#6da7cc",
      principalAcento: "#fe61c2",
      menu: "#f2c1d1",
      submenuFondo: "#fef4f7",
      textoClaro: "#fbfafb",
      textoSemiClaro: "#655f5f",
      textoSemiObscuro: "#2e2e2e",
      textoObscuro: "#272525",
      acentoObscuro: "#b23f7c",
    },
    logoUrl: "",
    faviconUrl: "",
    smallLogoUrl: "",
    paginasActivas: [
      { key: "inicio", nombre: "Inicio", ruta: "/", activo: true },
      { key: "sistemas", nombre: "Sistemas", ruta: "/sistemas", activo: true },
      { key: "sobreMi", nombre: "Sobre mi", ruta: "/sobreMi", activo: true },
      {
        key: "contactame",
        nombre: "Contáctame",
        ruta: "/contactame",
        activo: true,
      },
    ],
    divisas: [
      { codigo: "MXN", nombre: "Peso Mexicano", simbolo: "$", activo: true },
      {
        codigo: "USD",
        nombre: "Dólar Estadounidense",
        simbolo: "US$",
        activo: true,
      },
    ],
    sobreMi: {
      textoPrincipal: "Soy Pau, fundadora de Process Girl.",
      ceo: "Pau Dev",
      mision: "Empoderar a mujeres de todas las edades y contextos, brindándoles herramientas, metodologías y sistemas prácticos que se adapten a su vida real, no a un ideal inalcanzable. Diseñamos soluciones que simplifican lo complejo, optimizan su tiempo y potencian sus talentos, para que puedan enfocarse en lo que realmente importa: alcanzar sus metas, vivir con propósito y construir un futuro sostenible para ellas y sus comunidades.",
      vision: "Ser la plataforma líder en organización personal con propósito.",
      photoUrl: "/img/ceo-placeholder.jpg",
      valores: [
        {
          titulo: "Autenticidad",
          texto: "Creamos desde la experiencia, no desde la perfección.",
        },
        { titulo: "Simplicidad", texto: "Menos ruido, más claridad." },
        {
          titulo: "Empatía",
          texto: "Escuchamos y entendemos las necesidades reales.",
        },
        {
          titulo: "Innovación",
          texto: "Buscamos soluciones creativas y efectivas.",
        },
        { titulo: "Colaboración", texto: "Trabajamos juntas para lograr más." },
        {
          titulo: "Resiliencia",
          texto: "Nos adaptamos y crecemos ante los retos.",
        },
      ],
    },
    paginaInicio: {
      hero: {
        titulo:
          "✨ No necesitas más motivación, necesitas un sistema que funcione para ti.",
        subtitulo:
          "Elige un sistema según tu momento de vida: finanzas, universidad, hábitos, bienestar o proyectos personales.",
        cta: "➡️ Quiero mi sistema ahora",
      },
      filosofia: {
        titulo: "✨ La vida que sueñas empieza con un 1% hoy.",
        subtitulo:
          "No necesitas hacerlo todo perfecto ni cambiar de un día a otro. Solo un sistema que crezca contigo, paso a paso.",
        texto:
          "Creemos en el poder de lo pequeño. Ese 1% que sumas cada día se convierte en la mujer que quieres ser. No en un mes, no en un año: en un camino real y sostenible.",
        microcopy:
          "📌 No son plantillas. Son sistemas vivos que evolucionan contigo.",
      },
      metodologia: {
        titulo: "🌺 Nuestra Metodología: Process Flow",
        subtexto:
          "Un método inspirado en la vida real, no en la perfección: Sencillo, Personalizable, Integral y Progresivo.",
      },
      ctaBlocks: [
        {
          titulo: "¿No sabes por dónde empezar?",
          subtitulo:
            "Explora los sistemas por categoría y encuentra el que se adapta a ti.",
        },
      ],
      testimonios: { titulo: "No lo digo yo, lo dicen ellas. 🩷" },
    },
    redesSociales: [
      {
        nombre: "Instagram",
        url: "https://instagram.com/processgirl",
        iconoUrl: "bi bi-instagram",
      },
      {
        nombre: "TikTok",
        url: "https://tiktok.com/@processgirl",
        iconoUrl: "bi bi-tiktok",
      },
    ],
    ofertas: [
      {
        estado: "Activo",
        linkOfertas: "/sistemas/productos/GST",
        titulo: "Oferta destacada",
        descripcion: `No te pierdas "Get your shit together" completamente GRATIS`,
        cta: "Ver oferta",
      },
    ],
    filtros: { textoFiltroGratis: "Gratis" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const fallbackConfiguracion = buildFallbackConfiguracion();
