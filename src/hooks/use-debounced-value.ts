"use client"

import { useEffect, useState } from "react"

/**
 * Devuelve `value` retrasado por `delay` ms. Útil para evitar refetch en cada
 * pulsación dentro de inputs de búsqueda.
 *
 * Ejemplo:
 *   const debounced = useDebouncedValue(search, 350)
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])

  return debounced
}
