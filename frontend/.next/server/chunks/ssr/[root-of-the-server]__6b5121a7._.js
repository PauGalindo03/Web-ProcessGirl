module.exports = [
"[project]/.next-internal/server/app/sistemas/paquete/[sku]/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/fallbacks/fallProductos.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildFallbackProductos",
    ()=>buildFallbackProductos,
    "fallbackProductos",
    ()=>fallbackProductos
]);
function buildFallbackProductos() {
    return [
        {
            _id: "123",
            estado: "Activo",
            paquete: [],
            categoria: [],
            tipo: "producto",
            sku: "GST-001",
            titulo: "Get your Shit Together",
            descripcion: "Prueba",
            descripcionLarga: "Este e-book gratuito te introducirá en el camino a ser tu mejor versión",
            imagenes: [],
            precioBase: 1200,
            descuento: 20,
            esEdicionLimitada: true,
            disponibilidad: 10,
            fechaEdicionLimitada: undefined,
            link: "link",
            precioFinal: 960,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            _id: "1234",
            estado: "Activo",
            paquete: [],
            categoria: [],
            tipo: "producto",
            sku: "UGrl-002",
            titulo: "University Girl",
            descripcion: "Prueba",
            descripcionLarga: "Esta plantilla te ayudará a ver todo tu progreso universitario",
            imagenes: [],
            precioBase: 463,
            descuento: 10,
            esEdicionLimitada: false,
            disponibilidad: 0,
            fechaEdicionLimitada: undefined,
            link: "link",
            precioFinal: 416.7,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            _id: "1235",
            estado: "Activo",
            paquete: [],
            categoria: [],
            tipo: "producto",
            sku: "FCT-003",
            titulo: "Finanzas con tacones",
            descripcion: "Prueba",
            descripcionLarga: "Esta plantilla de notion te ayuda a lograr tu libertad financiera",
            imagenes: [],
            precioBase: 120,
            descuento: 0,
            esEdicionLimitada: false,
            disponibilidad: 0,
            fechaEdicionLimitada: undefined,
            link: "link",
            precioFinal: 120,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ];
}
const fallbackProductos = buildFallbackProductos();
}),
"[project]/src/fallbacks/fallPaquetes.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildFallbackPaquetes",
    ()=>buildFallbackPaquetes,
    "fallbackPaquetes",
    ()=>fallbackPaquetes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$fallbacks$2f$fallProductos$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/fallbacks/fallProductos.ts [app-rsc] (ecmascript)");
;
function buildFallbackPaquetes() {
    const GST = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$fallbacks$2f$fallProductos$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fallbackProductos"].find((p)=>p.sku === "GST-001");
    const UGrl = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$fallbacks$2f$fallProductos$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fallbackProductos"].find((p)=>p.sku === "UGrl-002");
    const FCT = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$fallbacks$2f$fallProductos$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fallbackProductos"].find((p)=>p.sku === "FCT-003");
    return [
        {
            _id: "1",
            titulo: "Finanzas con tacones",
            sku: "FCT",
            paquete: 1,
            productos: [
                FCT,
                GST,
                UGrl
            ],
            estado: "Activo",
            tipo: "paquete",
            descripcion: "Paquete digital de finanzas para mujeres jóvenes",
            precio: 100,
            descuento: 0,
            linkEntrega: "/paquetes/fct",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            precioFinal: 100
        },
        {
            _id: "2",
            titulo: "Get Your Shit Together",
            sku: "GST",
            paquete: 2,
            productos: [
                FCT,
                GST,
                UGrl
            ],
            estado: "Activo",
            tipo: "paquete",
            descripcion: "Paquete gratuito de organización personal",
            precio: 0,
            descuento: 0,
            linkEntrega: "/paquetes/gst",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            precioFinal: 0
        },
        {
            _id: "3",
            titulo: "Process to Glow",
            sku: "PTG",
            paquete: 3,
            productos: [
                FCT,
                GST,
                UGrl
            ],
            estado: "Activo",
            tipo: "paquete",
            descripcion: "Paquete de productividad y bienestar",
            precio: 150,
            descuento: 10,
            linkEntrega: "/paquetes/ptg",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            precioFinal: 135
        }
    ];
}
const fallbackPaquetes = buildFallbackPaquetes();
}),
"[project]/src/pages/PaquetePage/PaquetePage.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.3_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/pages/PaquetePage/PaquetePage.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/pages/PaquetePage/PaquetePage.tsx <module evaluation>", "default");
}),
"[project]/src/pages/PaquetePage/PaquetePage.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.3_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/pages/PaquetePage/PaquetePage.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/pages/PaquetePage/PaquetePage.tsx", "default");
}),
"[project]/src/pages/PaquetePage/PaquetePage.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$PaquetePage$2f$PaquetePage$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/pages/PaquetePage/PaquetePage.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$PaquetePage$2f$PaquetePage$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/pages/PaquetePage/PaquetePage.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$PaquetePage$2f$PaquetePage$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/services/api.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/services/api.ts
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$12$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/axios@1.12.2/node_modules/axios/lib/axios.js [app-rsc] (ecmascript)");
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$12$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: ("TURBOPACK compile-time value", "http://localhost:5000/api") || "http://backend:5000/api/public",
    headers: {
        "Content-Type": "application/json"
    }
});
// Middleware para agregar token automáticamente
api.interceptors.request.use((config)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return config;
});
const __TURBOPACK__default__export__ = api;
}),
"[project]/src/services/paquetePDService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/services/paquetePDService.ts
__turbopack_context__.s([
    "create",
    ()=>create,
    "getAll",
    ()=>getAll,
    "getPublicAll",
    ()=>getPublicAll,
    "getPublicById",
    ()=>getPublicById,
    "getPublicBySku",
    ()=>getPublicBySku,
    "remove",
    ()=>remove,
    "update",
    ()=>update
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$fallbacks$2f$fallPaquetes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/fallbacks/fallPaquetes.ts [app-rsc] (ecmascript)");
;
;
const USE_FAKE = ("TURBOPACK compile-time value", "true") === "true";
async function getPublicAll() {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get("public/paquetePD");
    return res.data;
}
async function getPublicById(id) {
    if ("TURBOPACK compile-time truthy", 1) {
        const paquete = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$fallbacks$2f$fallPaquetes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fallbackPaquetes"].find((p)=>p._id === id);
        return paquete ?? null;
    }
    //TURBOPACK unreachable
    ;
}
async function getPublicBySku(sku) {
    if ("TURBOPACK compile-time truthy", 1) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$fallbacks$2f$fallPaquetes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fallbackPaquetes"].find((p)=>p.sku === sku) ?? null;
    }
    //TURBOPACK unreachable
    ;
}
async function getAll() {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get("admin/paquetePD");
    return res.data;
}
async function create(data) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].post("admin/paquetePD", data);
    return res.data;
}
async function update(id, data) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].put(`admin/paquetePD/${id}`, data);
    return res.data;
}
async function remove(id) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].delete(`admin/paquetePD/${id}`);
    return res.data;
}
}),
"[project]/src/app/sistemas/paquete/[sku]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.3_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.3_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.3_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/common/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$utils$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/utils/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$fallbacks$2f$fallPaquetes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/fallbacks/fallPaquetes.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$PaquetePage$2f$PaquetePage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/PaquetePage/PaquetePage.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$paquetePDService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/paquetePDService.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function generateStaticParams() {
    // Esto solo se usa en build time o en modo fake
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$fallbacks$2f$fallPaquetes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fallbackPaquetes"].map((p)=>({
            sku: p.sku
        }));
}
async function Page({ params }) {
    try {
        const { sku } = await params;
        const paquete = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$paquetePDService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPublicBySku"])(sku);
        if (!paquete) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$utils$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ClientRenderer"], {
            Component: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$PaquetePage$2f$PaquetePage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
            props: {
                paquete
            }
        }, void 0, false, {
            fileName: "[project]/src/app/sistemas/paquete/[sku]/page.tsx",
            lineNumber: 19,
            columnNumber: 12
        }, this);
    } catch (err) {
        console.error("Error al cargar paquete:", err);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
}
}),
"[project]/src/app/sistemas/paquete/[sku]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/sistemas/paquete/[sku]/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6b5121a7._.js.map