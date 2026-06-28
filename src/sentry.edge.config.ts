// src/sentry.edge.config.ts
// Inicialización de Sentry para el runtime Edge (donde corre src/proxy.ts y las
// rutas edge). Se carga desde src/instrumentation.ts -> register().
import * as Sentry from "@sentry/nextjs"

const dsn =
  process.env.SENTRY_DSN ||
  process.env.NEXT_PUBLIC_SENTRY_DSN ||
  "https://036960d956fbd8ce955f0d544ee0fc8a@o4511640216403968.ingest.us.sentry.io/4511640223547392"

Sentry.init({
  dsn,
  enabled: process.env.NODE_ENV === "production",
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  debug: false,
})
