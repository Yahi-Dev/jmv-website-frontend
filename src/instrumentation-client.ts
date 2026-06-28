// src/instrumentation-client.ts
// Inicialización de Sentry en el navegador. Next detecta este archivo en src/.
//
// IMPORTANTE (cero impacto visual): NO se incluye Session Replay ni el widget
// de Feedback. Sentry.init por sí solo no renderiza nada en la página, y al no
// usar Replay no hace falta tocar la CSP (no se requiere worker-src 'self' blob:).
import * as Sentry from "@sentry/nextjs"

const dsn =
  process.env.NEXT_PUBLIC_SENTRY_DSN ||
  "https://036960d956fbd8ce955f0d544ee0fc8a@o4511640216403968.ingest.us.sentry.io/4511640223547392"

Sentry.init({
  dsn,
  enabled: process.env.NODE_ENV === "production",
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  debug: false,
})

// Instrumenta las navegaciones del App Router para el tracing de cliente.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
