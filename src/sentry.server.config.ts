// src/sentry.server.config.ts
// Inicialización de Sentry para el runtime Node (Server Components, route
// handlers, etc.). Se carga desde src/instrumentation.ts -> register().
//
// El DSN es público por diseño (viaja en el bundle del cliente). Se permite
// sobrescribirlo por variable de entorno. El envío solo ocurre en producción
// para no generar ruido durante el desarrollo local.
import * as Sentry from "@sentry/nextjs"

const dsn =
  process.env.SENTRY_DSN ||
  process.env.NEXT_PUBLIC_SENTRY_DSN ||
  "https://036960d956fbd8ce955f0d544ee0fc8a@o4511640216403968.ingest.us.sentry.io/4511640223547392"

Sentry.init({
  dsn,
  enabled: process.env.NODE_ENV === "production",
  // 10% de transacciones en producción; 100% en desarrollo.
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  debug: false,
})
