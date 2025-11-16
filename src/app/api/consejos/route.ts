// src/app/api/consejos/route.ts
import { NextRequest } from 'next/server'
import prisma from '@/src/lib/prisma'
import { sendBadRequest, sendCreated, sendServerError, sendSuccess } from '@/src/utils/httpResponse'
import { consejoCreateSchema } from '@/src/features/consejos/schema/validation'
import { auth } from '@/src/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const consejos = await prisma.consejoNacional.findMany({
      where: { deleted: false },
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
      Data: consejos,
      Total: consejos.length
    }, "Consejos obtenidos exitosamente")
  } catch (error) {
    console.error("Error fetching consejos:", error)
    return sendServerError("Error al obtener los consejos", error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = consejoCreateSchema.safeParse(body)

    if (!parsed.success) {
      return sendBadRequest('Datos inválidos', {
        formErrors: parsed.error.flatten().formErrors,
        fieldErrors: parsed.error.flatten().fieldErrors
      })
    }

    const session = await auth.api.getSession({
      headers: Object.fromEntries(req.headers)
    })

    // Si este consejo se marca como actual, desmarcar el anterior
    if (parsed.data.isActual) {
      await prisma.consejoNacional.updateMany({
        where: { isActual: true },
        data: { isActual: false }
      })
    }

    const consejo = await prisma.consejoNacional.create({
      data: {
        ...parsed.data,
        fechaInicio: new Date(parsed.data.fechaInicio),
        fechaFin: parsed.data.fechaFin ? new Date(parsed.data.fechaFin) : null,
        createdById: session?.user?.email ?? "sistema@jmv.org"
      },
      include: {
        miembros: {
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
      }
    })

    return sendCreated({
      Data: consejo
    }, "Consejo creado exitosamente")
  } catch (error) {
    console.error("Error creating consejo:", error)
    return sendServerError("Error al crear el consejo", error)
  }
}