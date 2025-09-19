import type { ProductoDigital } from "./productoDigital";

export type Role = "admin" | "user";

export interface Cupon {
  codigo: string;
  tipoDescuento:
  | "porcentaje"
  | "fijo"
  | "acceso gratuito"
  | "primera compra"
  | "cantidad comprada";
  activo: boolean;
  aplicado: boolean;
  descripcion?: string;
  terminos?: string;
  valor?: number; // porcentaje o fijo
  condicionCantidad?: number;
  fechaExpiracion?: Date;
}

export interface HistorialItem {
  itemId: string;
  tipo: "producto" | "paquete";
  nombre: string;
  precioPagado: number;
  linkDescarga?: string;
}

export interface HistorialCompra {
  pedidoId: string;
  fechaCompra: Date;
  items: HistorialItem[];
  totalPedido: number;
}

// Dirección como subesquema
export interface Direccion {
  pais: string;
  calle?: string;
  numero?: string;
  colonia?: string;
  codigoPostal?: string;
  ciudad?: string;
  estado?: string;
}

export interface Usuario {
  _id: string
  email: string
  nombres: string
  apellidos: string
  role: Role
  username?: string
  fotoPerfilUrl?: string | null
  historialCompras?: any[] // o tipar como en tu modelo si lo necesitas
  plantillasFavoritas?: ProductoDigital[]
  cupones?: any[] // idem
  fechaRegistro?: string
  direccion?: {
    pais: string
    calle?: string
    numero?: string
    colonia?: string
    codigoPostal?: string
    ciudad?: string
    estado?: string
  }
  isEmailVerified: boolean
  nombreCompleto?: string
  direccionCompleta?: string
  createdAt?: string
  updatedAt?: string
}

// 🔹 Tipo para creación/edición de usuario (registro o admin)
export type UsuarioInput = Omit<
  Usuario,
  '_id' | 'createdAt' | 'updatedAt' | 'nombreCompleto' | 'direccionCompleta'
> & {
  password?: string // opcional en update, requerido en registro
}

// 🔹 Tipo para login
export interface UsuarioLoginInput {
  email: string
  password: string
}

// Para actualizar perfil propio
export type UpdateProfilePayload = Partial<UsuarioInput> & {
  removeFotoPerfil?: boolean
  predefinedAvatarUrl?: string
}