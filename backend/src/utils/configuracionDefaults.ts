// Configuración por defecto
export function getDefaultBackendConfiguration() {
  const defaultColores = {
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
  };

  return {
    colores: defaultColores,
    logoUrl: "",
    faviconUrl: "",
    smallLogoUrl: "",
    paginasActivas: [
      { key: "inicio", nombre: "Inicio", ruta: "/", activo: true },
      {
        key: "sistemas",
        nombre: "Sistemas",
        ruta: "/sistemas",
        activo: true,
      },
      {
        key: "sobreMi",
        nombre: "Sobre Mí",
        ruta: "/sobreMi",
        activo: true,
      },
      {
        key: "contactame",
        nombre: "Contáctame",
        ruta: "/contactame",
        activo: true,
      },
    ],
    divisas: [
      { codigo: "MXN", nombre: "Peso Mexicano", simbolo: "$", activo: true },
    ],
    sobreMi: {
      textoPrincipal: "",
      photoUrl: "",
      ceo: "",
      mision: "",
      vision: "",
      valores: [],
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
          titulo: "💋 El problema no es el tiempo.",
          subtitulo:
            "Todas tenemos 24 horas, pero no todas tenemos un sistema que nos ayude a usarlas con intención. Las mujeres vivimos atrapadas entre trabajo, estudios, familia, salud, proyectos… y solemos dejar al final lo más importante: nosotras mismas.\n\nProcess Girl nace para cambiar eso. 🌷",
        },
        {
          titulo: "Empieza gratis",
          subtitulo:
            'Descarga "Get Your Shit Together" gratis y prueba lo fácil que es organizar tu vida desde lo que realmente importa: tú.',
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
        linkOfertas: "/sistemas/GST",
        titulo: "Oferta destacada",
        descripcion: `No te pierdas "Get your shit together" completamente GRATIS`,
        cta: "Ver oferta",
      },
    ],
    filtros: { textoFiltroGratis: "Gratis" },
  };
}

// Validar color hex
export function isValidHexColor(color?: string): boolean {
  if (!color) return false;
  return /^#([0-9A-F]{3}){1,2}$/i.test(color);
}
