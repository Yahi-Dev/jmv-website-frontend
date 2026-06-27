// src/app/api/consejos/actual/route.ts
import { NextRequest } from 'next/server'
import prisma from '@/src/lib/prisma'
import { sendBadRequest, sendNotFound, sendServerError, sendSuccess } from '@/src/utils/httpResponse'
import { requireAdmin } from "@/src/lib/server-auth"
import { getPublicCached } from "@/src/lib/redis"

export async function GET(req: NextRequest) {
  try {
    // El consejo actual cambia muy rara vez: se sirve desde caché Upstash a
    // visitantes anónimos (TTL 120s). Los administradores ven datos frescos.
    const consejoActual = await getPublicCached(
      req,
      'cache:consejo:actual',
      () => prisma.consejoNacional.findFirst({
        where: {
          isActual: true,
          deleted: false
        },
        include: {
          miembros: {
            where: { deleted: false },
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
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
      }),
      120
    )

    if (!consejoActual) {
      return sendNotFound('No hay consejo actual configurado')
    }

    return sendSuccess({
      Data: consejoActual
    }, "Consejo actual obtenido exitosamente")
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