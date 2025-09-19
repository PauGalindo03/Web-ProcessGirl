import type {Estado} from "./general"

export interface Colores {
  principal: string;
  secundario: string;
  principalAcento: string;
  menu: string;
  submenuFondo: string;
  textoClaro: string;
  textoSemiClaro: string;
  textoSemiObscuro: string;
  textoObscuro: string;
  acentoObscuro: string;
}

export interface PaginaActiva {
  key: string;
  nombre: string;
  ruta: string;
  activo: boolean;
}

export interface Divisa {
  codigo: string;
  nombre: string;
  simbolo: string;
  activo: boolean;
}

export interface Valor {
  titulo: string;
  texto: string;
}

export interface SobreMi {
  textoPrincipal: string;
  ceo: string;
  mision: string;
  vision: string;
  photoUrl: string;
  valores: Valor[];
}

export interface Hero {
  titulo: string;
  subtitulo: string;
  cta: string;
}

export interface Filosofia {
  titulo: string;
  subtitulo: string;
  texto: string;
  microcopy: string;
}

export interface Metodologia {
  titulo: string;
  subtexto: string;
}

export interface CTABlock {
  titulo: string;
  subtitulo: string;
}

export interface PaginaInicio {
  hero: Hero;
  filosofia: Filosofia;
  metodologia: Metodologia;
  ctaBlocks: CTABlock[];
  testimonios: { titulo: string };
}

export interface RedSocial {
  nombre: string;
  url: string;
  iconoUrl: string;
}

export interface Ofertas {
  linkOfertas: string;
  estado: Estado;
  titulo: string;
  descripcion: string;
  cta: string;
}

export interface Filtros {
  textoFiltroGratis: string;
}

export interface Configuracion {
  _id: string;
  colores: Colores;
  logoUrl: string;
  faviconUrl: string;
  smallLogoUrl: string;
  paginasActivas: PaginaActiva[];
  divisas: Divisa[];
  sobreMi: SobreMi;
  paginaInicio: PaginaInicio;
  redesSociales: RedSocial[];
  ofertas: Ofertas[];
  filtros: Filtros;
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
}
