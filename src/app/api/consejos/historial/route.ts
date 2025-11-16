// src/app/api/consejos/historial/route.ts
import { NextRequest } from 'next/server'
import prisma from '@/src/lib/prisma'
import { sendServerError, sendSuccess } from '@/src/utils/httpResponse'

export async function GET() {
  try {
    const consejosHistoricos = await prisma.consejoNacional.findMany({
      where: { 
        isActual: false,
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
          }
        }
      },
      orderBy: { fechaInicio: 'desc' }
    })

    return sendSuccess({
      Data: consejosHistoricos,
      Total: consejosHistoricos.length
    }, "Consejos históricos obtenidos exitosamente")
  } catch (error) {
    console.error("Error fetching consejos históricos:", error)
    return sendServerError("Error al obtener los consejos históricos", error)
  }
}