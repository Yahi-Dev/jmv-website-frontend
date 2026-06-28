// src/instrumentation.ts
// Hook de instrumentación de Next.js. Carga la config de Sentry según el
// runtime e instala el captador de errores de request (Server Components,
// route handlers, etc.). Next detecta este archivo automáticamente en src/.
import * as Sentry from "@sentry/nextjs"

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config")
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config")
  }
}

// Captura errores de Server Components, route handlers y middleware/proxy.
export const onRequestError = Sentry.captureRequestError
