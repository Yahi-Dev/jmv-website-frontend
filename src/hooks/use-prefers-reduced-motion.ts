"use client"

import { useEffect, useState } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

/**
 * Devuelve `true` cuando el sistema operativo del usuario tiene activada la
 * preferencia "reducir movimiento". Cumple con WCAG 2.3.3.
 *
 * Durante SSR / primer render devuelve `false` para no bloquear la animación
 * inicial; se actualiza tras hidratar.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mq = window.matchMedia(QUERY)
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setReduced(e.matches)
    handler(mq)
    if (mq.addEventListener) {
      mq.addEventListener("change", handler)
      return () => mq.removeEventListener("change", handler)
    }
    // Safari < 14
    mq.addListener(handler as (e: MediaQueryListEvent) => void)
    return () => mq.removeListener(handler as (e: MediaQueryListEvent) => void)
  }, [])

  return reduced
}
