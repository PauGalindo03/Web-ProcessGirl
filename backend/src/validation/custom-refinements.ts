/* ==========================================================================
  Custom Refinements
  ========================================================================== */
import { z } from "zod";
import { configuracionSchemaBase } from "./zod-schemas.js";


/* ==========================================================================
  Sub Schemas
  ========================================================================== */

/* Configuración */
const hexColor = z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Color inválido");

/* SobreMi */
export const valorSchema = z.object({
  titulo: z.string(),
  texto: z.string(),
});

/* Página de inicio */
export const heroSchema = z.object({
  titulo: z.string(),
  subtitulo: z.string(),
  cta: z.string(),
});

export const filosofiaSchema = z.object({
  titulo: z.string(),
  subtitulo: z.string(),
  texto: z.string(),
  microcopy: z.string(),
});

export const metodologiaSchema = z.object({
  titulo: z.string(),
  subtexto: z.string(),
});

export const ctaBlockSchema = z.object({
  titulo: z.string(),
  subtitulo: z.string(),
});

export const testimoniosSchema = z.object({
  titulo: z.string(),
});

/* ==========================================================================
  Schemas
  ========================================================================== */

/* ------
CONFIGURACIÓN
------ */
export const coloresSchema = z.object({
  principal: hexColor,
  secundario: hexColor,
  principalAcento: hexColor,
  menu: hexColor,
  submenuFondo: hexColor,
  textoClaro: hexColor,
  textoSemiClaro: hexColor,
  textoSemiObscuro: hexColor,
  textoObscuro: hexColor,
  acentoObscuro: hexColor,
});

export const paginaActivaSchema = z.object({
  key: z.string(),
  nombre: z.string(),
  ruta: z.string(),
  activo: z.boolean(),
});

export const divisaSchema = z.object({
  codigo: z.string().length(3),
  nombre: z.string(),
  simbolo: z.string(),
  activo: z.boolean(),
});

export const sobreMiSchema = z.object({
  textoPrincipal: z.string(),
  ceo: z.string(),
  mision: z.string(),
  vision: z.string(),
  photoUrl: z.string(),
  valores: z.array(valorSchema),
});

export const paginaInicioSchema = z.object({
  hero: heroSchema,
  filosofia: filosofiaSchema,
  metodologia: metodologiaSchema,
  ctaBlocks: z.array(ctaBlockSchema),
  testimonios: testimoniosSchema,
});

export const redSocialSchema = z.object({
  nombre: z.string(),
  url: z.string(),
  iconoUrl: z.string(),
});

export const filtroSchema = z.object({
  textoFiltroGratis: z.string(),
});

export const configuracionSchema = configuracionSchemaBase.extend({
  colores: coloresSchema,
  paginasActivas: z.array(paginaActivaSchema),
  divisas: z.array(divisaSchema),
  sobreMi: sobreMiSchema,
  paginaInicio: paginaInicioSchema,
  redesSociales: z.array(redSocialSchema),
  filtros: filtroSchema,
});