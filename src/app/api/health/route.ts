// src/app/api/health/route.ts
//
// Endpoint de salud para monitoreo externo (uptime checks, load balancer,
// Vercel, etc.). Verifica la conectividad con dependencias críticas.
//
//   200 { status: "ok" }        → todo operativo
//   503 { status: "degraded" }  → la base de datos no responde
//
// Redis se trata como dependencia NO crítica: si falla, el sitio sigue
// funcionando (degradación elegante del caché y rate limit), por lo que no
// hace que el health check falle.
import { NextResponse } from 'next/server'
import prisma from '@/src/lib/prisma'
import { redis } from '@/src/lib/redis'

// Nunca cachear la respuesta de salud.
export const dynamic = 'force-dynamic'

export async function GET() {
  const checks: Record<string, 'ok' | 'down' | 'skipped'> = {}
  let healthy = true

  // Base de datos (crítica)
  try {
    await prisma.$queryRaw`SELECT 1`
    checks.database = 'ok'
  } catch {
    checks.database = 'down'
    healthy = false
  }

  // Redis / Upstash (no crítico)
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      await redis.ping()
      checks.redis = 'ok'
    } catch {
      checks.redis = 'down'
    }
  } else {
    checks.redis = 'skipped'
  }

  return NextResponse.json(
    {
      status: healthy ? 'ok' : 'degraded',
      checks,
      timestamp: new Date().toISOString(),
    },
    {
      status: healthy ? 200 : 503,
      headers: { 'Cache-Control': 'no-store' },
    }
  )
}
