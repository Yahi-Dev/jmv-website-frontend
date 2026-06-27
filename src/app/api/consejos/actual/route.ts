// src/app/api/consejos/actual/route.ts
import { NextRequest } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'
import prisma from '@/src/lib/prisma'
import { sendBadRequest, sendNotFound, sendServerError, sendSuccess } from '@/src/utils/httpResponse'
import { requireAdmin } from "@/src/lib/server-auth"
import { getOrSetCache } from "@/src/lib/redis"
import { withPublicCache } from "@/src/lib/http-cache"
import { maskMiembroContacto } from "@/src/lib/mask"

function fetchConsejoActual() {
  return prisma.consejoNacional.findFirst({
    where: {
      isActual: true,
      deleted: false
    },
    include: {
      miembros: {
        where: { deleted: false },
        include: {
          // Solo se usa la imagen del usuario en la UI; no se expone name/email
          // del usuario para reducir PII en la respuesta pública.
          user: {
            select: {
              image: true
            }
          }
        },
        orderBy: [
          { cargo: 'asc' }, // Ordenar por cargo
          { estado: 'asc' }  // Titulares primero
        ]
      }
    }
  })
}

export async function GET(req: NextRequest) {
  try {
    const isAdmin = !!getSessionCookie(req)

    let consejoActual
    if (isAdmin) {
      // Administradores: datos completos y frescos (sin caché).
      consejoActual = await fetchConsejoActual()
    } else {
      // Visitantes anónimos: respuesta cacheada (TTL 120s) con email/teléfono
      // de los miembros ENMASCARADOS en el servidor — el dato real nunca sale
      // del backend ni se guarda en Redis.
      consejoActual = await getOrSetCache(
        'cache:consejo:actual:public',
        async () => {
          const c = await fetchConsejoActual()
          if (!c) return c
          return { ...c, miembros: c.miembros.map(maskMiembroContacto) }
        },
        120
      )
    }

    if (!consejoActual) {
      return sendNotFound('No hay consejo actual configurado')
    }

    return withPublicCache(req, sendSuccess({
      Data: consejoActual
    }, "Consejo actual obtenido exitosamente"), { sMaxAge: 120, swr: 600 })
  } catch (error) {
    console.error("Error fetching consejo actual:", error)
    return sendServerError("Error al obtener el consejo actual", error)
  }
}

export async function PUT(req: NextRequest) {
  try {
    const guard = await requireAdmin()
    if (!guard.ok) return guard.response

    const body = await req.json()
    const { consejoId } = body

    if (!consejoId) {
      return sendBadRequest('ID de consejo requerido')
    }

    // Verificar que el consejo existe
    const consejo = await prisma.consejoNacional.findFirst({
      where: { id: consejoId, deleted: false }
    })

    if (!consejo) {
      return sendNotFound('Consejo no encontrado')
    }

    // Desmarcar todos los consejos como actual
    await prisma.consejoNacional.updateMany({
      where: { isActual: true },
      data: { isActual: false }
    })

    // Marcar el nuevo consejo como actual
    await prisma.consejoNacional.update({
      where: { id: consejoId },
      data: { isActual: true }
    })

    return sendSuccess({
      Data: { consejoId }
    }, "Consejo actual actualizado exitosamente")
  } catch (error) {
    console.error("Error updating consejo actual:", error)
    return sendServerError("Error al actualizar el consejo actual", error)
  }
}