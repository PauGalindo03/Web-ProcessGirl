import type { Types } from "mongoose";
import type { ITestimonioDocument } from "../models/Testimonio.js";
import type { Testimonio } from "../../../packages/types/testimonio.js";
import { mapProductoDigital } from "./productoDigital.js";
import { mapPaquetePD } from "./paquetePD.js";
import { mapUsuario } from "./user.js";

export function mapTestimonio(doc: ITestimonioDocument): Testimonio {
  return {
    _id: doc._id.toString(),
    ...(doc.estado ? { estado: doc.estado } : {}),
    nombre: doc.nombre,
    ...(doc.testimonio ? { testimonio: doc.testimonio } : {}),
    ...(doc.img && doc.img.length > 0 ? { img: doc.img } : {}),
    user:
      typeof doc.user === "object" && doc.user !== null && "_id" in doc.user
        ? mapUsuario(doc.user as any)
        : (doc.user as Types.ObjectId).toString(),
    rating: doc.rating,
    ...(doc.producto
      ? {
          producto:
            typeof (doc.producto as any)._id === "object"
              ? mapProductoDigital(doc.producto as any)
              : doc.producto.toString(),
        }
      : {}),
    ...(doc.paquete
      ? {
          paquete:
            typeof (doc.paquete as any)._id === "object"
              ? mapPaquetePD(doc.paquete as any)
              : doc.paquete.toString(),
        }
      : {}),
    ...(doc.createdAt ? { createdAt: doc.createdAt.toISOString() } : {}),
    ...(doc.updatedAt ? { updatedAt: doc.updatedAt.toISOString() } : {}),
  };
}
