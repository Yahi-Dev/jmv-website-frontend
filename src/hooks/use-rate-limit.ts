// src/hooks/use-rate-limit.ts
import { useState, useCallback, useEffect } from 'react'

interface RateLimitState {
  isBlocked: boolean
  attempts: number
  remaining: number
  resetTime: number
  retryAfter?: number
}

export function useRateLimit() {
  const [rateLimit, setRateLimit] = useState<RateLimitState | null>(null)
  const [loading, setLoading] = useState(true)

  const checkRateLimit = useCallback(async (endpoint: string = '/api/auth/sign-in/email') => {
    try {
      setLoading(true)
      const response = await fetch('/api/rate-limit/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ endpoint }),
      })

      if (response.ok) {
        const data = await response.json()
        setRateLimit(data)
        return data
      } else {
        // Si hay error, asumir que no hay bloqueo para no interrumpir el flujo
        console.warn('Rate limit check failed, allowing request')
        return null
      }
    } catch (error) {
      console.error('Error checking rate limit:', error)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Verificar automáticamente al montar el componente
  useEffect(() => {
    checkRateLimit()
  }, [checkRateLimit])

  return {
    rateLimit,
    loading,
    checkRateLimit,
    refresh: () => checkRateLimit()
  }
}