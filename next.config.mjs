import { withSentryConfig } from "@sentry/nextjs"

/** @type {import('next').NextConfig} */

// Cabeceras de seguridad aplicadas a todas las rutas.
// La CSP es intencionalmente permisiva en script/style/img/font para NO romper
// el sitio (estilos inline + next/font + imágenes de Cloudinary/picsum), pero
// bloquea lo de alto valor y cero riesgo: object-src, frame-ancestors, base-uri,
// form-action. Una CSP estricta basada en nonce puede adoptarse más adelante.
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "connect-src 'self' https:",
  "media-src 'self' https: data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
]

const nextConfig = {
  images: {
    // Optimización vía la CDN de Cloudinary mediante un loader custom
    // (f_auto/q_auto/c_limit/w). Las imágenes que no son de Cloudinary se
    // sirven sin cambios. No usa el optimizador de Vercel (sin cuota) y no
    // requiere remotePatterns. Ver src/lib/cloudinary-loader.ts.
    loader: "custom",
    loaderFile: "./src/lib/cloudinary-loader.ts",
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}

// withSentryConfig añade la subida de source maps (solo si hay SENTRY_AUTH_TOKEN
// en el entorno de build) y la instrumentación de Sentry. NO modifica las
// cabeceras de seguridad ni la CSP de arriba. Compatible con Turbopack.
export default withSentryConfig(nextConfig, {
  org: "ampirics",
  project: "javascript-nextjs",
  // Sube source maps a Sentry solo si el token está presente (no rompe el build local).
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // Logs del plugin solo en CI.
  silent: !process.env.CI,
  // Mejor resolución de stack traces.
  widenClientFileUpload: true,
  // Borra los source maps locales tras subirlos (no se exponen públicamente).
  sourcemaps: { deleteSourcemapsAfterUpload: true },
})
