// src/app/api/consejos/actual/route.ts
import { NextRequest } from 'next/server'
import prisma from '@/src/lib/prisma'
import { sendBadRequest, sendNotFound, sendServerError, sendSuccess } from '@/src/utils/httpResponse'

export async function GET() {
  try {
    const consejoActual = await prisma.consejoNacional.findFirst({
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
    })

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