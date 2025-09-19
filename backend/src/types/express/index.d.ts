// backend/src/types/express/index.d.ts
import type { Role } from "../../config/user/User.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        role: Role;
        email?: string;
        nombreCompleto?: string;
      };
      file?: Express.Multer.File;
      files?: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[];
    }
  }
}

