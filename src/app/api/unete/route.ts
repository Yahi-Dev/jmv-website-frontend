// src/app/api/unete/route.ts
import { NextRequest } from 'next/server'
import prisma from '@/src/lib/prisma'
import { uneteRateLimit } from '@/src/lib/rate-limit'
import { solicitudUneteSchema } from '@/src/features/unete/schema'
import { requireAdmin } from '@/src/lib/server-auth'
import {
  sendBadRequest,
  sendCreated,
  sendServerError,
  sendSuccess,
  sendTooManyRequests,
} from '@/src/utils/httpResponse'

// Listado de solicitudes (solo administradores).
export async function GET(req: NextRequest) {
  try {
    const guard = await requireAdmin()
    if (!guard.ok) return guard.response

    const { searchParams } = new URL(req.url)
    const take = Math.min(Math.max(Number.parseInt(searchParams.get('take') || '50'), 1), 200)
    const skip = Math.max(Number.parseInt(searchParams.get('skip') || '0'), 0)

    const [solicitudes, total] = await Promise.all([
      prisma.solicitudUnete.findMany({
        where: { deleted: false },
        orderBy: { createdDate: 'desc' },
        take,
        skip,
      }),
      prisma.solicitudUnete.count({ where: { deleted: false } }),
    ])

    return sendSuccess(
      { Data: solicitudes, Total: total, Page: Math.floor(skip / take) + 1 },
      'Solicitudes obtenidas correctamente'
    )
  } catch (error) {
    console.error('Error al listar solicitudes de unión:', error)
    return sendServerError('No se pudieron obtener las solicitudes', error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req)

    // Anti-spam por IP (5 solicitudes/hora).
    if (ip) {
      const rl = await uneteRateLimit.check(ip)
      if (rl.isBlocked) {
        return sendTooManyRequests(
          `Has enviado demasiadas solicitudes. Intenta nuevamente en ${rl.retryAfter} segundos.`,
          rl.retryAfter
        )
      }
    }

    const body = await req.json().catch(() => null)
    if (!body) return sendBadRequest('Cuerpo de la solicitud inválido')

    const parsed = solicitudUneteSchema.safeParse(body)
    if (!parsed.success) {
      const first = parsed.error.issues[0]
      return sendBadRequest(first?.message || 'Datos inválidos', {
        fieldErrors: parsed.error.flatten().fieldErrors,
      })
    }

    const d = parsed.data

    try {
      await prisma.solicitudUnete.create({
        data: {
          nombre: d.nombre,
          apellidos: d.apellidos,
          email: d.email,
          telefono: d.telefono,
          edad: d.edad,
          provincia: d.provincia,
          parroquia: d.parroquia ? d.parroquia : null,
          motivacion: d.motivacion,
          disponibilidad: d.disponibilidad ? d.disponibilidad : null,
          createdByIp: ip ?? null,
        },
      })
    } catch (err: any) {
      // Si la tabla aún no se ha migrado en la BD (P2021), degradar con un
      // mensaje claro en vez de un 500 opaco.
      if (err?.code === 'P2021') {
        console.error('Tabla solicitudes_unete inexistente; ejecuta prisma db push', err)
        return sendServerError(
          'El formulario no está disponible temporalmente. Intenta más tarde.'
        )
      }
      throw err
    }

    return sendCreated({}, 'Solicitud recibida correctamente')
  } catch (error) {
    console.error('Error en solicitud de unión:', error)
    return sendServerError('No se pudo procesar tu solicitud', error)
  }
}

function getClientIP(req: NextRequest): string | null {
  // x-real-ip (Vercel) y cf-connecting-ip (Cloudflare) no son falsificables por
  // el cliente; se prefieren antes que x-forwarded-for.
  const realIP = req.headers.get('x-real-ip')
  const cfConnectingIP = req.headers.get('cf-connecting-ip')
  const forwarded = req.headers.get('x-forwarded-for')

  if (realIP) return realIP
  if (cfConnectingIP) return cfConnectingIP
  if (forwarded) {
    const ips = forwarded.split(',').map((s) => s.trim()).filter(Boolean)
    return ips[0] || null
  }
  return null
}
