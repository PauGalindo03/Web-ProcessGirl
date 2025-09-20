import type { Request, Response } from "express";
import ConfigService from "@services/configuracionService.js";
import { handleError } from "@utils/handleError";

// GET configuración
export const get = async (_req: Request, res: Response) => {
  try {
    const config = await ConfigService.getConfiguracion();
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");

    res.json(config);
  } catch (err) {
    handleError(res, "Error interno del servidor al obtener la configuración", 500)
  }
};

// UPDATE configuración
export const update = async (req: Request, res: Response) => {
  try {
    const updatedConfig = await ConfigService.updateConfiguracion(req.body);
    res.json(updatedConfig);
  } catch (err) {
    handleError(res, "Error interno al guardar la configuración.", 500);
  }
};

export default { get, update };
