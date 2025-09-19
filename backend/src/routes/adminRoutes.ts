import { Router } from "express";

// Controladores
import categoriaCtrl from "../controllers/categoria.controller.js";
import configuracionCtrl from "../controllers/configuracion.controller.js";
import contactoCtrl from "../controllers/contacto.controller.js";
import faqCtrl from "../controllers/faq.controller.js";
import paquetesCtrl from "../controllers/paquetePD.controller.js";
import productosCtrl from "../controllers/productoDigital.controller.js";
import testimoniosCtrl from "../controllers/testimonio.controller.js";
import usuariosCtrl from "../config/user/user.controller.js";

// Middlewares
import {autenticarToken, autorizar} from "../middleware/auth.js";

const router = Router();

console.log("[ROUTES] adminRoutes.ts cargado");

// Middleware para todos los endpoints de admin
router.use(autenticarToken);
const verificarAdmin = autorizar("admin");
console.log("[ROUTES] Verificación de autenticación activada");

// ───────────── RUTAS ADMIN ─────────────

// CRUD de Categorías
router
  .route("/categorias").all(verificarAdmin)
  .get(categoriaCtrl.getAll)
  .post(categoriaCtrl.create);
router
  .route("/categorias/:id").all(verificarAdmin)
  .put(categoriaCtrl.update)
  .delete(categoriaCtrl.delete);

// Configuración
router
  .route("/configuracion").all(verificarAdmin)
  .get(configuracionCtrl.get)
  .put(configuracionCtrl.update);

// CRUD de Contacto
router
  .route("/contactos").all(verificarAdmin)
  .get(contactoCtrl.getAll)
  .post(contactoCtrl.create);
router
  .route("/contactos/:id").all(verificarAdmin)
  .put(contactoCtrl.update)
  .delete(contactoCtrl.delete);

// FAQ
router
  .route("/faqs").all(verificarAdmin)
  .get(faqCtrl.getAllFAQs)
  .post(faqCtrl.createFAQ);
router
  .route("/faqs/:id").all(verificarAdmin)
  .put(faqCtrl.updateFAQ)
  .delete(faqCtrl.deleteFAQ);

// Paquetes
router
  .route("/paquetes") .all(verificarAdmin)
  .get(paquetesCtrl.getAll)
  .post(paquetesCtrl.create);
router
  .route("/paquetes/:id").all(verificarAdmin)
  .put(paquetesCtrl.update)
  .delete(paquetesCtrl.remove);

// Productos
router
  .route("/productos").all(verificarAdmin)
  .get(productosCtrl.getAll)
  .post(productosCtrl.create);

router
  .route("/productos/:id").all(verificarAdmin)
  .put(productosCtrl.update)
  .delete(productosCtrl.remove);

// Testimonios
router
  .route("/testimonios").all(verificarAdmin)
  .get(testimoniosCtrl.getAll);
router
  .route("/testimonios/:id").all(verificarAdmin)
  .put(testimoniosCtrl.update)
  .delete(testimoniosCtrl.delete);

// Usuarios
router
  .route("/usuarios").all(verificarAdmin)
  .get(usuariosCtrl.getAll)
  .post(usuariosCtrl.create);
router
  .route("/usuarios/:id").all(verificarAdmin)
  .put(usuariosCtrl.update)
  .delete(usuariosCtrl.eliminar);

  export default router;