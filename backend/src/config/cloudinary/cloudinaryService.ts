// src/services/cloudinaryService.ts
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import type { UploadApiOptions, UploadApiResponse } from "cloudinary";
import fs from "fs/promises";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error("Faltan variables de entorno de Cloudinary");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

class CloudinaryService {
  static cloudinary = cloudinary;

  static async uploadFile(
    filePath: string,
    options: UploadApiOptions
  ): Promise<UploadApiResponse> {
    try {
      const result = await cloudinary.uploader.upload(filePath, options);
      await fs.unlink(filePath);
      return result;
    } catch (err) {
      console.error("[Cloudinary Upload Error]", err);
      throw err;
    }
  }

  static async deleteFile(publicId: string): Promise<UploadApiResponse> {
    try {
      return await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.error("[Cloudinary Delete Error]", err);
      throw err;
    }
  }

  static async listFiles(folder: string) {
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .max_results(100)
      .execute();
    return result.resources;
  }

  static async renameFile(
    oldPublicId: string,
    newPublicId: string
  ): Promise<UploadApiResponse> {
    try {
      return await cloudinary.uploader.rename(oldPublicId, newPublicId, {
        overwrite: true,
      });
    } catch (err) {
      console.error("[Cloudinary Rename Error]", err);
      throw err;
    }
  }

  static getPublicIdFromUrl(url?: string): string | null {
    if (!url) return null;
    const regex = /\/upload\/(?:v\d+\/)?([^\.]+)/;
    const match = url.match(regex);
    return match?.[1] ?? null; // si match[1] es undefined, devuelve null
  }

  static sanitizeString(input: string): string {
    return input.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_\-\/\.]/g, "");
  }

  static getSanitizedBaseName(fullName: string): string {
    const parts = fullName.split(".");
    const baseName = parts.length > 1 ? parts.slice(0, -1).join(".") : fullName;
    return this.sanitizeString(baseName).replace(/[^a-zA-Z0-9_\-]/g, "");
  }
}

export default CloudinaryService;
