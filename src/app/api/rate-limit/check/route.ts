// src/app/api/rate-limit/check/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { loginRateLimit } from '@/src/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    
    if (!ip) {
      return NextResponse.json(
        { error: 'Could not determine IP address' },
        { status: 400 }
      )
    }

    const rateLimitResult = await loginRateLimit.getRemaining(ip)

    return NextResponse.json(rateLimitResult)
  } catch (error) {
    console.error('Rate limit check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function getClientIP(request: NextRequest): string | null {
  try {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    
    if (forwarded) {
      const ips = forwarded.split(',').map(ip => ip.trim())
      return ips[0] || null
    }
    
    return realIP || null
  } catch {
    return null
  }
}