// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { loginRateLimit } from './lib/rate-limit'

// Rutas que requieren rate limiting
const protectedRoutes = [
  '/api/auth/sign-in/email',
  '/login',
  '/forgot-password'
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Verificar si es una ruta protegida
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Obtener IP real (considerando proxies)
  const ip = getClientIP(request)
  
  if (!ip) {
    return NextResponse.next()
  }

  // Verificar rate limit
  const rateLimitResult = await loginRateLimit.check(ip)

  if (rateLimitResult.isBlocked) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests',
        message: `IP temporarily blocked. Try again in ${rateLimitResult.retryAfter} seconds.`,
        retryAfter: rateLimitResult.retryAfter
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          'Retry-After': rateLimitResult.retryAfter?.toString() || '3600'
        }
      }
    )
  }

  // Agregar headers informativos
  const response = NextResponse.next()
  response.headers.set('X-RateLimit-Limit', '10')
  response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())
  response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString())

  return response
}

function getClientIP(request: NextRequest): string | null {
  try {
    // Intentar obtener IP real considerando headers de proxy
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const cfConnectingIP = request.headers.get('cf-connecting-ip') // Cloudflare
    
    if (forwarded) {
      const ips = forwarded.split(',').map(ip => ip.trim())
      return ips[0] || null
    }
    
    if (cfConnectingIP) {
      return cfConnectingIP
    }
    
    if (realIP) {
      return realIP
    }
    
    // Para desarrollo local, usar una IP por defecto
    if (process.env.NODE_ENV === 'development') {
      return '127.0.0.1'
    }
    
    return null
  } catch {
    return null
  }
}

export const config = {
  matcher: [
    '/api/auth/:path*',
    '/login',
    '/forgot-password'
  ]
}