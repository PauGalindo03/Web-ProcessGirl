import type { Usuario } from "@types";

import { fallbackProductos } from "./fallProductos";

function buildFallUser(): Usuario {
  return {
    _id: "user1",
    email: "pau@example.com",
    nombres: "Pau",
    apellidos: "Dev",
    role: "admin",
    username: "pau_dev",
    fotoPerfilUrl: "/images/perfil-pau.png",
    isEmailVerified: true,
    fechaRegistro: "",

    direccion: {
      pais: "México",
      calle: "Laurel",
      numero: "30",
      colonia: "BellaVista",
      codigoPostal: "78910",
      ciudad: "Jiutepec",
      estado: "Morelos",
    },

    historialCompras: [
      {
        pedidoId: "pedido-001",
        fechaCompra: new Date("2025-08-15"),
        totalPedido: 1800,
        items: [
          {
            itemId: "prod-fake-001",
            tipo: "producto",
            nombre: "Get your Shit Together",
            precioPagado: 960,
            linkDescarga: "/descargas/gyst.pdf",
          },
          {
            itemId: "prod-fake-002",
            tipo: "producto",
            nombre: "Finanzas con tacones",
            precioPagado: 840,
            linkDescarga: "/descargas/fct.notion",
          },
        ],
      },
    ],

    cupones: [
      {
        codigo: "BIENVENIDA20",
        tipoDescuento: "porcentaje",
        activo: true,
        aplicado: true,
        descripcion: "20% de descuento en tu primera compra",
        terminos: "Válido solo una vez",
        valor: 20,
        fechaExpiracion: new Date("2025-12-31"),
      },
    ],

    plantillasFavoritas: [fallbackProductos[0], fallbackProductos[1]],

    nombreCompleto: "Pau Dev",
    direccionCompleta: "Laurel 30, BellaVista, 78910, Jiutepec, Morelos, México",
  };
}

export const fallUser: Usuario = buildFallUser();
