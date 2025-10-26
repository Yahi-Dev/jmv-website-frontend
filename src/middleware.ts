// Alternativa: Middleware más conciso
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { loginRateLimit } from './lib/rate-limit'
import { sendTooManyRequests } from './utils/httpResponse';

const RATE_LIMITED_ENDPOINTS = {
  '/api/auth/sign-in/email': ['POST'], // Incrementa intentos
  '/api/auth/forgot-password': ['POST'], // Solo verifica bloqueo
  '/api/auth/reset-password': ['POST'] // Solo verifica bloqueo
} as const;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  
  // Verificar si es un endpoint protegido
  const endpointConfig = RATE_LIMITED_ENDPOINTS[pathname as keyof typeof RATE_LIMITED_ENDPOINTS];
  if (!endpointConfig || !endpointConfig.includes(method as any)) {
    return NextResponse.next();
  }

  const ip = getClientIP(request);
  if (!ip) return NextResponse.next();

  try {
    let rateLimitResult;
    
    if (pathname === '/api/auth/sign-in/email' && method === 'POST') {
      // ✅ Para login: incrementar intentos
      rateLimitResult = await loginRateLimit.incrementAttempt(ip);
    } else {
      // ✅ Para otros endpoints: solo verificar estado
      rateLimitResult = await loginRateLimit.getRemaining(ip);
    }

    if (rateLimitResult.isBlocked) {
      // ✅ SOLO USAR sendTooManyRequests CUANDO HAY BLOQUEO
      return sendTooManyRequests(
        `IP temporalmente bloqueada. Intenta nuevamente en ${rateLimitResult.retryAfter} segundos.`,
        rateLimitResult.retryAfter
      );
    }

    // ✅ Para flujo normal: NextResponse simple con headers informativos
    const response = NextResponse.next();
    if (pathname === '/api/auth/sign-in/email') {
      response.headers.set('X-RateLimit-Limit', '10');
      response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
      response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString());
    }
    
    return response;

  } catch (error) {
    // En caso de error en rate limiting, permitir el acceso
    console.error('Error en rate limiting:', error);
    return NextResponse.next();
  }
}

// getClientIP function remains the same...
function getClientIP(request: NextRequest): string | null {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    
    if (forwarded) {
      const ips = forwarded.split(',').map(ip => ip.trim());
      return ips[0] || null;
    }
    
    if (cfConnectingIP) return cfConnectingIP;
    if (realIP) return realIP;
    
    return process.env.NODE_ENV === 'development' ? '127.0.0.1' : null;
  } catch {
    return null;
  }
}

export const config = {
  matcher: [
    '/api/auth/sign-in/email',
    '/api/auth/forgot-password', 
    '/api/auth/reset-password'
  ]
};