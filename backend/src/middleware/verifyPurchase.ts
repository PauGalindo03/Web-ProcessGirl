// middleware/verifyPurchase.ts
import type { Request, Response, NextFunction } from "express";
import User from "../config/user/User.js";

// Verifica que el usuario haya comprado un producto, paquete o servicio
export const verifyPurchase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id; // viene del middleware de auth
    if (!userId)
      return res.status(401).json({ error: "Usuario no autenticado" });

    const { itemId, tipo } = req.body; // tipo: 'producto' | 'paquete' | 'servicio'
    if (!itemId || !tipo) {
      return res.status(400).json({ error: "Se requiere itemId y tipo" });
    }

    const user = await User.findById(userId).select("historialCompras");
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const haComprado = (user.historialCompras || []).some((pedido) =>
      (pedido.items || []).some(
        (item) => item.itemId === itemId && item.tipo === tipo
      )
    );

    if (!haComprado) {
      return res
        .status(403)
        .json({
          error: "Debes haber comprado este ítem para dejar un testimonio",
        });
    }

    next();
  } catch (error: any) {
    console.error("Error en verifyPurchase:", error);
    res.status(500).json({ error: "Error interno", message: error.message });
  }
};
