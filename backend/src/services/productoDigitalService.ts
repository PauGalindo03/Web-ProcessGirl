import ProductoDigital from "../models/ProductoDigital.js";
import type { ProductoDigital as ProductoDigitalType } from "../../../packages/types/productoDigital.js"; 
import PaquetePD from "../models/PaquetePD.js";
import type { ProductoDigitalInput } from "../../../packages/types/productoDigital.js";
import { mapProductoDigital } from "../mappers/productoDigital.js";

// ✅ Crear producto
export async function crearProducto(data: ProductoDigitalInput) {
  const producto = await new ProductoDigital(data).save();
  await producto.populate(["categoria", "paquete"]);
  return mapProductoDigital(producto);
}

// ✅ Obtener productos públicos (solo activos)
export async function obtenerPublicos() {
  const docs = await ProductoDigital.find({ estado: "Activo" })
    .sort({ titulo: 1 })
    .populate(["categoria", "paquete"]);
  return docs.map(mapProductoDigital);
}

export async function getPublicById(id: string): Promise<ProductoDigitalType | null> {
  const doc = await ProductoDigital.findOne({ _id: id, estado: "Activo" }).populate(["categoria", "paquete"]);
  return doc ? mapProductoDigital(doc) : null;
}

export async function getPublicBySku(sku: string): Promise<ProductoDigitalType | null> {
  const doc = await ProductoDigital.findOne({ sku, estado: "Activo" }).populate(["categoria", "paquete"]);
  return doc ? mapProductoDigital(doc) : null;
}

// ✅ Obtener todos (admin)
export async function obtenerTodos() {
  const docs = await ProductoDigital.find()
    .sort({ titulo: 1 })
    .populate(["categoria", "paquete"]);
  return docs.map(mapProductoDigital);
}

// ✅ Actualizar producto + mantener relaciones con paquetes
export async function actualizarProducto(id: string, updateData: Partial<ProductoDigitalInput>) {
  const productoAntes = await ProductoDigital.findById(id);
  if (!productoAntes) return null;

  const oldPackageIds = productoAntes.paquete?.map((pId: any) => pId.toString()) || [];
  const newPackageIds = (updateData.paquete || []).map((pId: any) => pId.toString());

  const actualizado = await ProductoDigital.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).populate(["categoria", "paquete"]);

  if (!actualizado) return null;

  const packagesToAddProduct = newPackageIds.filter((pId) => !oldPackageIds.includes(pId));
  const packagesToRemoveProduct = oldPackageIds.filter((pId) => !newPackageIds.includes(pId));

  await PaquetePD.updateMany(
    { _id: { $in: packagesToAddProduct } },
    { $addToSet: { productos: actualizado._id } }
  );
  await PaquetePD.updateMany(
    { _id: { $in: packagesToRemoveProduct } },
    { $pull: { productos: actualizado._id } }
  );

  return mapProductoDigital(actualizado);
}

// ✅ Eliminar producto + limpiar relaciones
export async function eliminarProducto(id: string) {
  const producto = await ProductoDigital.findById(id);
  if (!producto) return null;

  await PaquetePD.updateMany({ productos: id }, { $pull: { productos: id } });
  await producto.deleteOne();

  return mapProductoDigital(producto);
}
