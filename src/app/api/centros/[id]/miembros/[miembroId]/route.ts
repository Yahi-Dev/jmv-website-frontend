// src/app/api/centros/[id]/miembros/[miembroId]/route.ts
import { NextRequest } from "next/server"
import prisma from "@/src/lib/prisma"
import {
  sendSuccess,
  sendBadRequest,
  sendNotFound,
  sendServerError,
} from "@/src/utils/httpResponse"
import { miembroUpdateSchema } from "@/src/features/centros/schema/validation"
import { auth } from "@/src/lib/auth"

// ── PUT /api/centros/[id]/miembros/[miembroId] ────────────────────────────────
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; miembroId: string }> }
) {
  try {
    const { miembroId: midParam } = await params
    const miembroId = Number.parseInt(midParam)
    if (isNaN(miembroId)) return sendBadRequest("ID inválido")

    const existing = await prisma.miembroCentroJmv.findFirst({ where: { id: miembroId, deleted: false } })
    if (!existing) return sendNotFound("Miembro no encontrado")

    const body = await req.json()
    const parsed = miembroUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return sendBadRequest("Datos inválidos", { fieldErrors: parsed.error.flatten().fieldErrors })
    }

    const session = await auth.api.getSession({ headers: Object.fromEntries(req.headers) })
    const userEmail = session?.user?.email ?? "sistema@jmv.org"

    const data = parsed.data
    const updated = await prisma.miembroCentroJmv.update({
      where: { id: miembroId },
      data: {
        ...(data.nombre !== undefined ? { nombre: data.nombre } : {}),
        ...(data.imagenUrl !== undefined ? { imagenUrl: data.imagenUrl } : {}),
        ...(data.descripcion !== undefined ? { descripcion: data.descripcion } : {}),
        ...(data.cargo !== undefined ? { cargo: data.cargo } : {}),
        modifiedDate: new Date(),
        modifiedById: userEmail,
      },
    })

    return sendSuccess({ Data: updated }, "Miembro actualizado exitosamente")
  } catch (error) {
    return sendServerError("Error al actualizar el miembro", error)
  }
}

// ── DELETE /api/centros/[id]/miembros/[miembroId] ─────────────────────────────
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; miembroId: string }> }
) {
  try {
    const { miembroId: midParam } = await params
    const miembroId = Number.parseInt(midParam)
    if (isNaN(miembroId)) return sendBadRequest("ID inválido")

    const existing = await prisma.miembroCentroJmv.findFirst({ where: { id: miembroId, deleted: false } })
    if (!existing) return sendNotFound("Miembro no encontrado")

    const session = await auth.api.getSession({ headers: Object.fromEntries(req.headers) })
    const userEmail = session?.user?.email ?? "sistema@jmv.org"

    await prisma.miembroCentroJmv.update({
      where: { id: miembroId },
      data: { deleted: true, deletedDate: new Date(), deletedById: userEmail },
    })

    return sendSuccess({}, "Miembro eliminado exitosamente")
  } catch (error) {
    return sendServerError("Error al eliminar el miembro", error)
  }
}
