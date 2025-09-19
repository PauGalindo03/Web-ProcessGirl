import type { Request, Response } from "express";
import type { Document, Types } from "mongoose";
import CloudinaryService from "./cloudinaryService.js";
import Product from "../../models/ProductoDigital.js";
import Testimonio from "../../models/Testimonio.js";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { productoId, replaceNames = [], folderContext } = req.body;

    if (!req.files || (req.files as Express.Multer.File[]).length === 0)
      return res
        .status(400)
        .json({ error: "No se proporcionó ningún archivo." });

    const files = req.files as Express.Multer.File[];
    let documentToUpdate: any = null;
    let imageFieldName = "";
    let targetBaseFolder = folderContext || "";

    if (productoId) {
      if (folderContext === "testimonios") {
        documentToUpdate = await Testimonio.findById(productoId);
        imageFieldName = "img";
        targetBaseFolder = "testimonios";
      } else {
        documentToUpdate = await Product.findById(productoId);
        imageFieldName = "imagenes";
        const productSku = documentToUpdate.id
          ? CloudinaryService.sanitizeString(documentToUpdate.id)
          : documentToUpdate._id.toString();
        targetBaseFolder = `productos/${productSku}`;
      }

      if (!documentToUpdate)
        return res.status(404).json({ error: "Documento no encontrado" });
    }

    const uploadedResults: any[] = [];
    for (const file of files) {
      const baseName = CloudinaryService.getSanitizedBaseName(
        file.originalname
      );
      const result = await CloudinaryService.uploadFile(file.path, {
        folder: targetBaseFolder,
        public_id: baseName,
        resource_type: "auto",
        overwrite:
          Array.isArray(replaceNames) &&
          replaceNames.includes(file.originalname),
      });

      uploadedResults.push({
        url: result.secure_url,
        public_id: result.public_id,
        originalName: file.originalname,
      });

      if (documentToUpdate && imageFieldName) {
        if (Array.isArray(documentToUpdate[imageFieldName])) {
          documentToUpdate[imageFieldName] = documentToUpdate[
            imageFieldName
          ].filter(
            (imgUrl: string) =>
              CloudinaryService.getPublicIdFromUrl(imgUrl) !== result.public_id
          );
          documentToUpdate[imageFieldName].push(result.secure_url);
        } else {
          documentToUpdate[imageFieldName] = [result.secure_url];
        }
      }
    }

    if (documentToUpdate) await documentToUpdate.save();

    res.status(200).json({
      results: uploadedResults,
      product_images_after_operation: documentToUpdate
        ? documentToUpdate[imageFieldName]
        : undefined,
    });
  } catch (error: any) {
    console.error("[uploadImage] Error:", error);
    res
      .status(500)
      .json({ error: "Error al subir la imagen", detalle: error.message });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { public_id, itemId, tipo, imageUrl } = req.body;
    if (!public_id)
      return res.status(400).json({ error: "public_id es requerido" });

    const cloudResult = await CloudinaryService.deleteFile(public_id);

    let updatedDocument: Document & any = null; // tipado genérico
    let imageFieldName = "";

    if (itemId && imageUrl && tipo) {
      if (tipo === "testimonios") {
        const doc = await Testimonio.findById(itemId).exec();
        updatedDocument = doc as Document & { img: string[] };
        imageFieldName = "img";
      } else {
        const doc = await Product.findById(itemId).exec();
        updatedDocument = doc as Document & { imagenes: string[] };
        imageFieldName = "imagenes";
      }

      if (updatedDocument && Array.isArray(updatedDocument[imageFieldName])) {
        updatedDocument[imageFieldName] = updatedDocument[
          imageFieldName
        ].filter((img: string) => img !== imageUrl);
        await updatedDocument.save();
      }
    }

    res.status(200).json({
      success: true,
      public_id_deleted: public_id,
      cloudinary_result: cloudResult,
      images_after_operation: updatedDocument
        ? updatedDocument[imageFieldName]
        : undefined,
    });
  } catch (error: any) {
    console.error("[deleteImage] Error:", error);
    res
      .status(500)
      .json({ error: "Error al eliminar la imagen", detalle: error.message });
  }
};

export const renameImage = async (req: Request, res: Response) => {
  try {
    const { productoId, oldImageUrl, newFilename } = req.body;
    if (!productoId || !oldImageUrl || !newFilename)
      return res.status(400).json({ error: "Faltan parámetros requeridos" });

    const product = await Product.findById(productoId);
    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });

    const oldPublicId = CloudinaryService.getPublicIdFromUrl(oldImageUrl);
    if (!oldPublicId)
      return res.status(400).json({ error: "No se pudo extraer el public_id" });

    const productSku = product.sku
      ? CloudinaryService.sanitizeString(product.sku)
      : (product._id as Types.ObjectId).toString();
    const newPublicId = `productos/${productSku}/${CloudinaryService.getSanitizedBaseName(
      newFilename
    )}`;

    const renameResult = await CloudinaryService.renameFile(
      oldPublicId,
      newPublicId
    );

    if (!product.imagenes) product.imagenes = [];
    const index = product.imagenes.indexOf(oldImageUrl);
    if (index > -1) {
      product.imagenes[index] = renameResult.secure_url;
      product.imagenes.sort();
      await product.save();
    }

    res.status(200).json({
      success: true,
      newImageUrl: renameResult.secure_url,
      product_images_after_operation: product.imagenes,
    });
  } catch (error: any) {
    console.error("[renameImage] Error:", error);
    res
      .status(500)
      .json({ error: "Error al renombrar la imagen", detalle: error.message });
  }
};
