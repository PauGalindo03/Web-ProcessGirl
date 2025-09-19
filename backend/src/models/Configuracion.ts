import mongoose, { Schema } from "mongoose";
import type { Configuracion as ConfigPlano } from "../../../packages/types/configuracion.js";

export interface IConfig
  extends Omit<ConfigPlano, "_id" | "createdAt" | "updatedAt"> {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IConfigDocument extends IConfig, Document {}

const configuracionSchema = new Schema<IConfigDocument>(
  {
    colores: {
      principal: { type: String },
      secundario: { type: String },
      principalAcento: { type: String },
      menu: { type: String },
      submenuFondo: { type: String },
      textoClaro: { type: String },
      textoSemiClaro: { type: String },
      textoSemiObscuro: { type: String },
      textoObscuro: { type: String },
      acentoObscuro: { type: String },
    },
    logoUrl: { type: String, default: "" },
    faviconUrl: { type: String, default: "" },
    smallLogoUrl: { type: String, default: "" },

    paginasActivas: [
      {
        key: { type: String, required: true },
        nombre: { type: String, required: true },
        ruta: { type: String, required: true },
        activo: { type: Boolean, default: true },
      },
    ],
    divisas: [
      {
        codigo: { type: String, required: true, unique: true, uppercase: true },
        nombre: { type: String, required: true },
        simbolo: { type: String, required: true },
        activo: { type: Boolean, default: true },
      },
    ],

    sobreMi: {
      textoPrincipal: { type: String, default: "" },
      ceo: { type: String, default: "" },
      mision: { type: String, default: "" },
      vision: { type: String, default: "" },
      photoUrl: { type: String, default: "" },
      valores: [
        {
          titulo: { type: String, default: "" },
          texto: { type: String, default: "" },
        },
      ],
    },

    paginaInicio: {
      hero: {
        titulo: {
          type: String,
        },
        subtitulo: {
          type: String,
        },
        cta: { type: String },
      },
      filosofia: {
        titulo: { type: String },
        subtitulo: {
          type: String,
        },
        texto: {
          type: String,
        },
        microcopy: {
          type: String,
        },
      },
      metodologia: {
        titulo: { type: String },
        subtexto: {
          type: String,
        },
      },
      ctaBlocks: [
        {
          titulo: { type: String, default: "" },
          subtitulo: { type: String, default: "" },
        },
      ],
      testimonios: {
        titulo: { type: String },
      },
    },

    redesSociales: [
      {
        nombre: { type: String, required: true },
        url: { type: String, required: true },
        iconoUrl: { type: String, default: "" },
      },
    ],

    ofertas: [
      {
        estado: {
          type: String,
          enum: ["Activo", "En Producción", "Pendiente"],
          default: "En Producción",
          required: true,
        },
        linkOfertas: { type: String, required: true },
        titulo: { type: String, required: true },
        descripcion: { type: String, required: true },
        cta: { type: String, required: true },
      },
    ],
    filtros: {
      textoFiltroGratis: { type: String, default: "Gratis" },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IConfigDocument>(
  "Configuracion",
  configuracionSchema
);
