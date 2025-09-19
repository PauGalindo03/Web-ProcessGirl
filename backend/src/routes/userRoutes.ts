import express from "express";
import multer from "multer";

import carritoCtrl from "../controllers/carrito.controller.js";
import testimonioCtrl from "../controllers/testimonio.controller.js";
import usuariosCtrl from "../config/user/user.controller.js";

import { autenticarToken, autorizar } from "../middleware/auth.js";
import { verifyPurchase } from "../middleware/verifyPurchase.js";

const router = express.Router();
const upload = multer({ storage: multer.diskStorage({}) }); // almacenamiento temporal
const verificarUser = autorizar("user");

router.use(autenticarToken);


// Carrito para usuarios registrados
router
    .route("/carrito").all(verificarUser)
    .get(carritoCtrl.getCarrito)
    .post(carritoCtrl.addItem)
    .delete(carritoCtrl.clearCarrito);

router
    .route("/carrito/:index").all(verificarUser)
    .delete(carritoCtrl.removeItem);

router.route("/carrito/merge")
  .put(carritoCtrl.mergeCarrito);

// Testimonios
router
    .route("/testimonios").all(verificarUser, verifyPurchase)
    .post(testimonioCtrl.create);
    router
    .route("/testimonios/:id").all(verificarUser, verifyPurchase)
    .put(testimonioCtrl.update)
    .delete(testimonioCtrl.delete);

// Perfil
router
    .route("/me")
    .get(usuariosCtrl.getMyProfile)
    .put(upload.single("fotoPerfil"), usuariosCtrl.updateMyProfile)
    .delete(usuariosCtrl.eliminar);


// Contraseña
router.put("/change-password", usuariosCtrl.changeMyPassword);

// Favoritos
router.post("/plantillas/:plantillaId/toggle-favorite", usuariosCtrl.toggleFavoriteTemplate);

// Cupón
router.post("/cupones", usuariosCtrl.addCouponToUser);

// Avatares predefinidos
router.get("/avatars/predefined", usuariosCtrl.getPredefinedAvatars);

export default router;
