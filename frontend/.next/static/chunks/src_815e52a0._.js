(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/auth/verificacion/VerificaCorreo.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "alertaUrgente": "VerificaCorreo-module__bxP9MW__alertaUrgente",
  "boton": "VerificaCorreo-module__bxP9MW__boton",
  "container": "VerificaCorreo-module__bxP9MW__container",
  "input": "VerificaCorreo-module__bxP9MW__input",
  "mensaje": "VerificaCorreo-module__bxP9MW__mensaje",
});
}),
"[project]/src/hooks/utils/useVerificacion.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/hooks/useVerificacionCompleta.ts
__turbopack_context__.s([
    "useVerificacion",
    ()=>useVerificacion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.3_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.3_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AlertaContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AlertaContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/authService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
function useVerificacion() {
    let { autoDetectParams = false } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _s();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [estado, setEstado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tiempoRestante, setTiempoRestante] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [cargando, setCargando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { mostrarAlerta } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AlertaContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAlerta"])();
    // Detectar email y expiresAt desde URL si se activa autoDetectParams
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useVerificacion.useEffect": ()=>{
            if (!autoDetectParams || !params) return;
            const emailParam = params.get('email');
            const expiresParam = params.get('expiresAt');
            if (emailParam) setEmail(emailParam);
            if (expiresParam) {
                const fecha = new Date(expiresParam);
                setEstado({
                    isEmailVerified: false,
                    expiresAt: fecha.toISOString()
                });
            }
        }
    }["useVerificacion.useEffect"], [
        autoDetectParams,
        params
    ]);
    // Temporizador si hay expiresAt
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useVerificacion.useEffect": ()=>{
            if (!(estado === null || estado === void 0 ? void 0 : estado.expiresAt)) return;
            const expirationDate = new Date(estado.expiresAt);
            const updateTiempo = {
                "useVerificacion.useEffect.updateTiempo": ()=>{
                    const restante = expirationDate.getTime() - Date.now();
                    setTiempoRestante(restante > 0 ? restante : 0);
                    if (restante <= 0) {
                        mostrarAlerta('Tu enlace de verificación ha expirado. Regístrate de nuevo.', 'error');
                        router.push('/auth/register');
                    }
                }
            }["useVerificacion.useEffect.updateTiempo"];
            updateTiempo();
            const interval = setInterval(updateTiempo, 1000);
            return ({
                "useVerificacion.useEffect": ()=>clearInterval(interval)
            })["useVerificacion.useEffect"];
        }
    }["useVerificacion.useEffect"], [
        estado === null || estado === void 0 ? void 0 : estado.expiresAt,
        mostrarAlerta,
        router
    ]);
    const revisar = async (correo)=>{
        setCargando(true);
        setError(null);
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkVerificationStatus"])(correo);
            setEstado(data);
            setEmail(correo);
            return null;
        } catch (err) {
            const mensaje = err instanceof Error ? err.message : typeof err === 'object' && err !== null && 'message' in err ? String(err.message) : 'No se encontró el correo o hubo un error.';
            setError(mensaje);
            return mensaje;
        } finally{
            setCargando(false);
        }
    };
    const reenviar = async ()=>{
        setCargando(true);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resendVerificationEmail"])(email);
            return null;
        } catch (err) {
            const mensaje = err instanceof Error ? err.message : typeof err === 'object' && err !== null && 'message' in err ? String(err.message) : 'Error al reenviar el correo.';
            setError(mensaje);
            return mensaje;
        } finally{
            setCargando(false);
        }
    };
    return {
        email,
        setEmail,
        estado,
        cargando,
        error,
        tiempoRestante,
        revisar,
        reenviar
    };
}
_s(useVerificacion, "EVoUfGZB9AD8XVPkOS10KkSQ7hA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AlertaContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAlerta"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/auth/verificacion/correo/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VerificaCorreo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.3_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$verificacion$2f$VerificaCorreo$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/auth/verificacion/VerificaCorreo.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$utils$2f$useVerificacion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/utils/useVerificacion.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function VerificaCorreo() {
    _s();
    const { email, setEmail, tiempoRestante, cargando, reenviar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$utils$2f$useVerificacion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVerificacion"])({
        autoDetectParams: true
    });
    ;
    const minutos = tiempoRestante ? Math.floor(tiempoRestante / 60000) : 0;
    const segundos = tiempoRestante ? Math.floor(tiempoRestante % 60000 / 1000) : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$verificacion$2f$VerificaCorreo$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "Verifica tu correo"
            }, void 0, false, {
                fileName: "[project]/src/app/auth/verificacion/correo/page.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "email",
                value: email,
                onChange: (e)=>setEmail(e.target.value),
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$verificacion$2f$VerificaCorreo$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                placeholder: "Tu correo"
            }, void 0, false, {
                fileName: "[project]/src/app/auth/verificacion/correo/page.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            tiempoRestante !== null && tiempoRestante > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Tu enlace expira en ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    minutos,
                                    ":",
                                    segundos.toString().padStart(2, '0')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auth/verificacion/correo/page.tsx",
                                lineNumber: 31,
                                columnNumber: 34
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auth/verificacion/correo/page.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: reenviar,
                        disabled: cargando || !email,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$verificacion$2f$VerificaCorreo$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].boton,
                        children: cargando ? 'Reenviando...' : 'Reenviar correo'
                    }, void 0, false, {
                        fileName: "[project]/src/app/auth/verificacion/correo/page.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/auth/verificacion/correo/page.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(VerificaCorreo, "v9hdGZV86Nd9iX6HGV74VYeA8/A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$utils$2f$useVerificacion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVerificacion"]
    ];
});
_c = VerificaCorreo;
var _c;
__turbopack_context__.k.register(_c, "VerificaCorreo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_815e52a0._.js.map