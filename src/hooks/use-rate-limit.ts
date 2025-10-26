// src/hooks/use-rate-limit.ts
import { useState, useCallback } from 'react'

interface RateLimitState {
  isBlocked: boolean
  attempts: number
  remaining: number
  resetTime: number
  retryAfter?: number
}

export function useRateLimit() {
  const [rateLimit, setRateLimit] = useState<RateLimitState | null>(null)

  const checkRateLimit = useCallback(async (endpoint: string = '/api/auth/sign-in/email') => {
    try {
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
      }
    } catch (error) {
      console.error('Error checking rate limit:', error)
    }
    
    return null
  }, [])

  return {
    rateLimit,
    checkRateLimit
  }
}