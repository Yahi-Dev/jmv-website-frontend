import { NextRequest } from 'next/server'
import prisma from '@/src/lib/prisma'
import { sendBadRequest, sendNotFound, sendServerError, sendSuccess } from '@/src/utils/httpResponse'
import { miembroUpdateSchema } from '@/src/features/consejos/schema/validation'
import { auth } from '@/src/lib/auth'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params
    const id = parseInt(idString)
    
    if (isNaN(id)) {
      return sendBadRequest('ID de miembro inválido')
    }

    const body = await req.json()
    const parsed = miembroUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return sendBadRequest('Datos inválidos', {
        formErrors: parsed.error.flatten().formErrors,
        fieldErrors: parsed.error.flatten().fieldErrors
      })
    }

    const session = await auth.api.getSession({
      headers: Object.fromEntries(req.headers)
    })

    // Verificar que el miembro existe
    const existingMiembro = await prisma.miembroConsejo.findFirst({
      where: { id, deleted: false }
    })

    if (!existingMiembro) {
      return sendNotFound('Miembro no encontrado')
    }

    const updateData: any = {
      ...parsed.data,
      modifiedDate: new Date(),
      modifiedById: session?.user?.email ?? "sistema@jmv.org"
    }

    // Manejar trayectoria si se proporciona
    if (parsed.data.trayectoria !== undefined) {
      updateData.trayectoria = parsed.data.trayectoria
    }

    const miembro = await prisma.miembroConsejo.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true
          }
        },
        consejo: true
      }
    })

    return sendSuccess({
      Data: miembro
    }, "Miembro actualizado exitosamente")
  } catch (error) {
    console.error("Error updating miembro:", error)
    return sendServerError("Error al actualizar el miembro", error)
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
      return sendBadRequest('ID de miembro inválido')
    }

    const session = await auth.api.getSession({
      headers: Object.fromEntries(req.headers)
    })

    // Verificar que el miembro existe
    const existingMiembro = await prisma.miembroConsejo.findFirst({
      where: { id, deleted: false }
    })

    if (!existingMiembro) {
      return sendNotFound('Miembro no encontrado')
    }

    // Soft delete del miembro
    await prisma.miembroConsejo.update({
      where: { id },
      data: {
        deleted: true,
        deletedDate: new Date(),
        deletedById: session?.user?.email ?? "sistema@jmv.org"
      }
    })

    return sendSuccess({
      Data: { id }
    }, "Miembro eliminado exitosamente")
  } catch (error) {
    console.error("Error deleting miembro:", error)
    return sendServerError("Error al eliminar el miembro", error)
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
      return sendBadRequest('ID de miembro inválido')
    }

    const miembro = await prisma.miembroConsejo.findFirst({
      where: { id, deleted: false },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true
          }
        },
        consejo: true
      }
    })

    if (!miembro) {
      return sendNotFound('Miembro no encontrado')
    }

    return sendSuccess({
      Data: miembro
    }, "Miembro obtenido exitosamente")
  } catch (error) {
    console.error("Error fetching miembro:", error)
    return sendServerError("Error al obtener el miembro", error)
  }
}