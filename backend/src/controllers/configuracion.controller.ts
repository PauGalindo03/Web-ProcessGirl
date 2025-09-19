import type { Request, Response } from "express";
import ConfigService from "../services/configuracionService.js";

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
    console.error("Error al obtener la configuración:", err);
    res.status(500).json({ message: "Error interno del servidor al obtener la configuración." });
  }
};

// UPDATE configuración
export const update = async (req: Request, res: Response) => {
  try {
    const updatedConfig = await ConfigService.updateConfiguracion(req.body);
    res.json(updatedConfig);
  } catch (err) {
    console.error("Error al guardar la configuración:", err);
    res.status(500).json({ message: "Error interno al guardar la configuración." });
  }
};

export default { get, update };
