// src/lib/http-cache.ts
import type { NextRequest } from "next/server"
import type { NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

/**
 * Aplica cabeceras de caché de CDN a una respuesta de LECTURA PÚBLICA.
 *
 * - Visitantes anónimos (sin cookie de sesión): la respuesta es cacheable en
 *   el edge de Vercel (`s-maxage` + `stale-while-revalidate`). Así el tráfico
 *   masivo de las páginas públicas se sirve desde la CDN sin tocar el origen.
 * - Usuarios autenticados (admin): `private, no-store` → siempre datos frescos,
 *   nunca se cachean en la CDN.
 *
 * Se añade `Vary: Cookie` para que la versión cacheada de anónimos NUNCA se
 * sirva a un usuario con sesión (clave de caché distinta). Funciona porque los
 * visitantes públicos del sitio no reciben cookies; si en el futuro se añaden
 * cookies de analítica al frontend público, conviene revisar esta estrategia.
 *
 * Nota: `s-maxage` solo afecta a la caché compartida (CDN); el navegador no
 * cachea (no se emite `max-age`), por lo que el usuario siempre revalida.
 */
export function withPublicCache<T extends NextResponse>(
  req: NextRequest,
  res: T,
  opts: { sMaxAge?: number; swr?: number } = {}
): T {
  const { sMaxAge = 60, swr = 300 } = opts

  if (getSessionCookie(req)) {
    res.headers.set("Cache-Control", "private, no-store")
  } else {
    res.headers.set(
      "Cache-Control",
      `public, s-maxage=${sMaxAge}, stale-while-revalidate=${swr}`
    )
  }
  res.headers.set("Vary", "Cookie")
  return res
}
