// src/app/api/rate-limit/reset/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { loginRateLimit } from '@/src/lib/rate-limit'
import { requireAdmin } from '@/src/lib/server-auth'

export async function POST(request: NextRequest) {
  try {
    // Solo usuarios autenticados pueden resetear el rate limit.
    // Esto impide que un atacante bloqueado por fuerza bruta limpie su
    // propio contador. El reset legítimo ocurre tras un login exitoso,
    // momento en el que la cookie de sesión ya está presente.
    const guard = await requireAdmin()
    if (!guard.ok) return guard.response

    const ip = getClientIP(request)

    if (!ip) {
      return NextResponse.json(
        { error: 'Could not determine IP address' },
        { status: 400 }
      )
    }

    // Resetear intentos para esta IP
    const success = await loginRateLimit.resetAttempts(ip)

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Rate limit reset successfully'
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to reset rate limit' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Rate limit reset error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function getClientIP(request: NextRequest): string | null {
  try {
    // x-real-ip (Vercel) y cf-connecting-ip (Cloudflare) los fija el proveedor
    // y NO son falsificables por el cliente. Se prefieren antes que
    // x-forwarded-for, cuyo primer valor sí puede falsear el cliente.
    const realIP = request.headers.get('x-real-ip')
    const cfConnectingIP = request.headers.get('cf-connecting-ip')
    const forwarded = request.headers.get('x-forwarded-for')

    if (realIP) return realIP
    if (cfConnectingIP) return cfConnectingIP
    if (forwarded) {
      const ips = forwarded.split(',').map(ip => ip.trim()).filter(Boolean)
      return ips[0] || null
    }

    return null
  } catch {
    return null
  }
}
