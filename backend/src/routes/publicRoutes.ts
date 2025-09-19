// src/routes/publicRoutes.ts
import { Router } from 'express';

import carritoCtrl from "../controllers/carrito.controller.js";
import categoriaCtrl from "../controllers/categoria.controller.js";
import configuracionCtrl from "../controllers/configuracion.controller.js";
import contactoCtrl from "../controllers/contacto.controller.js";
import faqCtrl from "../controllers/faq.controller.js";
import paquetesCtrl from "../controllers/paquetePD.controller.js";
import productosCtrl from "../controllers/productoDigital.controller.js";
import testimoniosCtrl from "../controllers/testimonio.controller.js";

const router = Router();

console.log('[ROUTES] publicRoutes.ts cargado');

// ───────────── RUTAS PÚBLICAS ─────────────

// ─────── Carrito ───────
// Temporal para usuarios no registrados (sin login)
router.route('/carrito')
  .get(carritoCtrl.getCarrito)
  .post(carritoCtrl.addItem)
  .delete(carritoCtrl.clearCarrito);

router.delete('/carrito/:index', carritoCtrl.removeItem);

// ─────── Productos y Paquetes ───────
// Solo lectura para cualquier usuario
router.get('/productos', productosCtrl.getPublicAll);
router.get('/productos/:id', productosCtrl.getPublicById);
router.get('/productos/sku/:sku', paquetesCtrl.getPublicBySku);

router.get('/paquetes', paquetesCtrl.getPublicAll);
router.get('/paquetes/:id', paquetesCtrl.getPublicById);
router.get('/paquetes/sku/:sku', paquetesCtrl.getPublicBySku);

// ─────── Otros ───────
// Solo lectura para cualquier usuario (logueado o no logueado)
router.get('/categorias', categoriaCtrl.getPublicAll);

router.get('/configuracion', configuracionCtrl.get);

router.get('/contactos', contactoCtrl.getPublicAll);

router.route('/faqs')
    .get(faqCtrl.getActiveFAQs) // cualquier persona puede ver las FAQs activas
    .post(faqCtrl.sendContactMessage); // cualquier persona puede enviar una pregunta

// Testimonios
router.route('/testimonios')
  .get(testimoniosCtrl.getPublicAll)

export default router;
