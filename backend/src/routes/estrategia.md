publicRoutes

Accesible para cualquiera, incluso sin autenticación.

Ejemplos: /productos, /paquetes, /faq, /testimonios.

userRoutes (nuevo)

Accesible solo para usuarios registrados con token JWT.

Funciones típicas:

/perfil → GET datos de su perfil

/perfil → PUT para actualizar datos (foto, nombre, etc.)

/perfil/password → PUT para cambiar contraseña

/mis-ordenes → GET sus pedidos o carrito

Requiere middleware de autenticación, p.ej., autenticarToken.

adminRoutes

Accesible solo para usuarios con rol admin.

Funciones típicas:

CRUD de usuarios

CRUD de productos, paquetes, FAQ

Gestión de configuración, contactos, testimonios