import { NextRequest } from 'next/server'
import prisma from '@/src/lib/prisma'
import { sendBadRequest, sendNotFound, sendServerError, sendSuccess } from '@/src/utils/httpResponse'
import { consejoUpdateSchema } from '@/src/features/consejos/schema/validation'
import { auth } from '@/src/lib/auth'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params
    const id = parseInt(idString)
    
    if (isNaN(id)) {
      return sendBadRequest('ID de consejo inválido')
    }

    const body = await req.json()
    const parsed = consejoUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return sendBadRequest('Datos inválidos', {
        formErrors: parsed.error.flatten().formErrors,
        fieldErrors: parsed.error.flatten().fieldErrors
      })
    }

    const session = await auth.api.getSession({
      headers: Object.fromEntries(req.headers)
    })

    // Verificar que el consejo existe
    const existingConsejo = await prisma.consejoNacional.findFirst({
      where: { id, deleted: false }
    })

    if (!existingConsejo) {
      return sendNotFound('Consejo no encontrado')
    }

    // Si este consejo se marca como actual, desmarcar el anterior
    if (parsed.data.isActual) {
      await prisma.consejoNacional.updateMany({
        where: { isActual: true, id: { not: id } },
        data: { isActual: false }
      })
    }

    // Construir datos de actualización manejando valores vacíos
    const updateData: any = {
      modifiedDate: new Date(),
      modifiedById: session?.user?.email ?? "sistema@jmv.org"
    }

    // Solo actualizar campos que fueron proporcionados
    if (parsed.data.periodo !== undefined) {
      updateData.periodo = parsed.data.periodo
    }
    
    if (parsed.data.fechaInicio !== undefined) {
      updateData.fechaInicio = new Date(parsed.data.fechaInicio)
    }
    
    if (parsed.data.fechaFin !== undefined) {
      updateData.fechaFin = parsed.data.fechaFin ? new Date(parsed.data.fechaFin) : null
    }
    
    if (parsed.data.lema !== undefined) {
      updateData.lema = parsed.data.lema === '' ? null : parsed.data.lema
    }
    
    if (parsed.data.fotoUrl !== undefined) {
      updateData.fotoUrl = parsed.data.fotoUrl === '' ? null : parsed.data.fotoUrl
    }
    
    if (parsed.data.isActual !== undefined) {
      updateData.isActual = parsed.data.isActual
    }

    const consejo = await prisma.consejoNacional.update({
      where: { id },
      data: updateData,
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
      }
    })

    return sendSuccess({
      Data: consejo
    }, "Consejo actualizado exitosamente")
  } catch (error) {
    console.error("Error updating consejo:", error)
    return sendServerError("Error al actualizar el consejo", error)
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params
    const id = parseInt(idString)
    
    if (isNaN(id)) {
      return sendBadRequest('ID de consejo inválido')
    }

    const session = await auth.api.getSession({
      headers: Object.fromEntries(req.headers)
    })

    // Verificar que el consejo existe
    const existingConsejo = await prisma.consejoNacional.findFirst({
      where: { id, deleted: false }
    })

    if (!existingConsejo) {
      return sendNotFound('Consejo no encontrado')
    }

    // Soft delete del consejo y sus miembros
    await prisma.$transaction(async (tx) => {
      // Soft delete de miembros
      await tx.miembroConsejo.updateMany({
        where: { consejoId: id },
        data: {
          deleted: true,
          deletedDate: new Date(),
          deletedById: session?.user?.email ?? "sistema@jmv.org"
        }
      })

      // Soft delete del consejo
      await tx.consejoNacional.update({
        where: { id },
        data: {
          deleted: true,
          deletedDate: new Date(),
          deletedById: session?.user?.email ?? "sistema@jmv.org"
        }
      })
    })

    return sendSuccess({
      Data: { id }
    }, "Consejo eliminado exitosamente")
  } catch (error) {
    console.error("Error deleting consejo:", error)
    return sendServerError("Error al eliminar el consejo", error)
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params
    const id = parseInt(idString)
    
    if (isNaN(id)) {
      return sendBadRequest('ID de consejo inválido')
    }

    const consejo = await prisma.consejoNacional.findFirst({
      where: { id, deleted: false },
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
      }
    })

    if (!consejo) {
      return sendNotFound('Consejo no encontrado')
    }

    return sendSuccess({
      Data: consejo
    }, "Consejo obtenido exitosamente")
  } catch (error) {
    console.error("Error fetching consejo:", error)
    return sendServerError("Error al obtener el consejo", error)
  }
}