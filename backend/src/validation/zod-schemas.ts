import { z } from "zod";

export const categoriaSchemaBase = z.object({
  _id: z.string(),
  estado: z.enum(['Activo', 'En Producción', 'Pendiente']).default('En Producción'),
  productosDigitales: z.array(z.lazy(() => productoDigitalSchemaBase)).optional(),
  nombre: z.string(),
  textoFiltro: z.string().default(''),
});

export type Categoria = z.infer<typeof categoriaSchemaBase>;

export const configuracionSchemaBase = z.object({
  _id: z.string(),
  colores: z.any(),
  logoUrl: z.string().default(''),
  faviconUrl: z.string().default(''),
  smallLogoUrl: z.string().default(''),
  paginasActivas: z.array(z.any()),
  divisas: z.array(z.any()),
  sobreMi: z.any(),
  paginaInicio: z.any(),
  redesSociales: z.array(z.any()),
  filtros: z.any(),
});

export type Configuracion = z.infer<typeof configuracionSchemaBase>;

export const contactoSchemaBase = z.object({
  _id: z.string(),
  estado: z.enum(['Activo', 'En Producción', 'Pendiente']).default('En Producción'),
  objetivo: z.string(),
  titulo: z.string(),
  texto: z.string(),
  cta: z.string(),
  orden: z.number(),
  enlace: z.string().default(""),
  preview: z.string().default(""),
});

export type Contacto = z.infer<typeof contactoSchemaBase>;

export const faqsSchemaBase = z.object({
  _id: z.string(),
  estado: z.enum(['Activo', 'En Producción', 'Pendiente']).default('En Producción'),
  isUserLoggedIn: z.boolean().default(false),
  correo: z.string().optional(),
  pregunta: z.string(),
  respuesta: z.string().default(''),
  categoria: z.enum(['General', 'Pagos', 'Sistemas & Productos', 'Envíos', 'Cuenta', 'Otros']).default('General'),
  orden: z.number().default(1),
});

export type Faqs = z.infer<typeof faqsSchemaBase>;

export const paquetePDSchemaBase = z.object({
  _id: z.string(),
  estado: z.enum(['Activo', 'En Producción', 'Pendiente']).default('En Producción'),
  productos: z.array(z.lazy(() => productoDigitalSchemaBase)).optional(),
  paquete: z.number(),
  tipo: z.string().default("paquete"),
  sku: z.string(),
  titulo: z.string(),
  descripcion: z.string().default(""),
  precio: z.number().default(0),
  promocion: z.number().default(0),
  linkEntrega: z.string().default(""),
});

export type PaquetePD = z.infer<typeof paquetePDSchemaBase>;

export const productoDigitalSchemaBase = z.object({
  _id: z.string(),
  estado: z.enum(['Activo', 'En Producción', 'Pendiente']).default('En Producción'),
  paquete: z.array(z.lazy(() => paquetePDSchemaBase)).default([]).optional(),
  categoria: z.lazy(() => categoriaSchemaBase),
  tipo: z.string().default("producto"),
  sku: z.string(),
  titulo: z.string(),
  descripcion: z.string().default(""),
  descripcionLarga: z.string().default(""),
  imagenes: z.array(z.string()).default([]).optional(),
  precio: z.number().default(0),
  promocion: z.number().default(0),
  link: z.string().default(""),
  esEdicionLimitada: z.boolean().default(false),
  disponibilidad: z.number().nullable().default(null),
  fechaEdicionLimitada: z.any().default(Date.now),
});

export type ProductoDigital = z.infer<typeof productoDigitalSchemaBase>;

export const testimoniosSchemaBase = z.object({
  estado: z.enum(['Activo', 'En Producción']).default('En Producción'),
  nombre: z.string(),
  testimonio: z.string().default(""),
  img: z.array(z.string()).default([]).optional(),
});

export type Testimonios = z.infer<typeof testimoniosSchemaBase>;