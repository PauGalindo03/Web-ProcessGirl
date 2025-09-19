// src/services/genericUploadService.ts
import type { Document, Model } from "mongoose";
import CloudinaryService from "./cloudinaryService.js";

interface UploadOptions {
  model: Model<Document>;
  documentId?: string;
  imageField: string;
  folderContext: string;
  replaceNames?: string[];
}

interface IGenericDoc extends Document {
  [key: string]: any; // o mejor: imagenes?: string[];
}

class GenericUploadService {
  static async uploadFiles(
    files: Express.Multer.File[],
    options: UploadOptions
  ): Promise<{ urls: string[]; results: any; updatedDocument?: Document }> {
    const { model, documentId, imageField, folderContext, replaceNames = [] } = options;

    let documentToUpdate: any = null;
    if (documentId) {
      documentToUpdate = await model.findById(documentId);
      if (!documentToUpdate) throw new Error("Documento no encontrado");
    }

    const uploadedResults: any[] = [];

    for (const file of files) {
      const baseName = CloudinaryService.getSanitizedBaseName(file.originalname);
      const targetFolder = folderContext;

      const result = await CloudinaryService.uploadFile(file.path, {
        folder: targetFolder,
        public_id: baseName,
        resource_type: "auto",
        overwrite: Array.isArray(replaceNames) && replaceNames.includes(file.originalname),
      });

      uploadedResults.push({
        url: result.secure_url,
        public_id: result.public_id,
        originalName: file.originalname,
      });

      if (documentToUpdate && imageField) {
        if (!Array.isArray(documentToUpdate[imageField])) documentToUpdate[imageField] = [];
        if (replaceNames.includes(file.originalname)) {
          documentToUpdate[imageField] = documentToUpdate[imageField].filter(
            (imgUrl: string) => CloudinaryService.getPublicIdFromUrl(imgUrl) !== result.public_id
          );
        }
        documentToUpdate[imageField].push(result.secure_url);
      }
    }

    if (documentToUpdate) await documentToUpdate.save();

    return {
      urls: uploadedResults.map(r => r.url),
      results: uploadedResults,
      updatedDocument: documentToUpdate || undefined,
    };
  }

  static async deleteFile(
    public_id: string,
    model?: Model<Document>,
    documentId?: string,
    imageField?: string,
    imageUrl?: string
  ) {
    const cloudResult = await CloudinaryService.deleteFile(public_id);

    let updatedDocument: any = null;
    if (model && documentId && imageField && imageUrl) {
      updatedDocument = await model.findById(documentId);
      if (updatedDocument && Array.isArray(updatedDocument[imageField])) {
        updatedDocument[imageField] = updatedDocument[imageField].filter((img: string) => img !== imageUrl);
        await updatedDocument.save();
      }
    }

    return { cloudResult, updatedDocument };
  }

  static async renameFile(
    oldImageUrl: string,
    newFilename: string,
    model: Model<Document>,
    documentId: string,
    imageField: string,
    folderContext: string
  ) {
    const doc = await model.findById(documentId) as IGenericDoc;
    
    if (!doc) throw new Error("Documento no encontrado");

    const oldPublicId = CloudinaryService.getPublicIdFromUrl(oldImageUrl);
    if (!oldPublicId) throw new Error("No se pudo extraer el public_id de la URL antigua");

    const newPublicId = `${folderContext}/${CloudinaryService.getSanitizedBaseName(newFilename)}`;

    const renameResult = await CloudinaryService.renameFile(oldPublicId, newPublicId);

    const index = doc[imageField].indexOf(oldImageUrl);
    if (index > -1) {
      doc[imageField][index] = renameResult.secure_url;
      await doc.save();
    }

    return { newImageUrl: renameResult.secure_url, updatedDocument: doc };
  }
}

export default GenericUploadService;
