// src/app/api/centros/[id]/comunidades/[comunidadId]/route.ts
import { NextRequest } from "next/server"
import prisma from "@/src/lib/prisma"
import {
  sendSuccess,
  sendBadRequest,
  sendNotFound,
  sendServerError,
} from "@/src/utils/httpResponse"
import { comunidadUpdateSchema } from "@/src/features/centros/schema/validation"
import { auth } from "@/src/lib/auth"

// ── PUT /api/centros/[id]/comunidades/[comunidadId] ───────────────────────────
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; comunidadId: string }> }
) {
  try {
    const { comunidadId: cidParam } = await params
    const comunidadId = Number.parseInt(cidParam)
    if (isNaN(comunidadId)) return sendBadRequest("ID inválido")

    const existing = await prisma.comunidadJmv.findFirst({ where: { id: comunidadId, deleted: false } })
    if (!existing) return sendNotFound("Comunidad no encontrada")

    const body = await req.json()
    const parsed = comunidadUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return sendBadRequest("Datos inválidos", { fieldErrors: parsed.error.flatten().fieldErrors })
    }

    const session = await auth.api.getSession({ headers: Object.fromEntries(req.headers) })
    const userEmail = session?.user?.email ?? "sistema@jmv.org"

    const data = parsed.data
    const updated = await prisma.comunidadJmv.update({
      where: { id: comunidadId },
      data: {
        ...(data.nombre !== undefined ? { nombre: data.nombre } : {}),
        ...(data.imagenUrl !== undefined ? { imagenUrl: data.imagenUrl } : {}),
        ...(data.cantidadMiembros !== undefined ? { cantidadMiembros: data.cantidadMiembros } : {}),
        ...(data.inicioDate !== undefined ? { inicioDate: new Date(data.inicioDate) } : {}),
        ...(data.etapa !== undefined ? { etapa: data.etapa } : {}),
        ...(data.etiquetas !== undefined ? { etiquetas: data.etiquetas } : {}),
        modifiedDate: new Date(),
        modifiedById: userEmail,
      },
    })

    return sendSuccess({ Data: updated }, "Comunidad actualizada exitosamente")
  } catch (error) {
    return sendServerError("Error al actualizar la comunidad", error)
  }
}

// ── DELETE /api/centros/[id]/comunidades/[comunidadId] ────────────────────────
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; comunidadId: string }> }
) {
  try {
    const { comunidadId: cidParam } = await params
    const comunidadId = Number.parseInt(cidParam)
    if (isNaN(comunidadId)) return sendBadRequest("ID inválido")

    const existing = await prisma.comunidadJmv.findFirst({ where: { id: comunidadId, deleted: false } })
    if (!existing) return sendNotFound("Comunidad no encontrada")

    const session = await auth.api.getSession({ headers: Object.fromEntries(req.headers) })
    const userEmail = session?.user?.email ?? "sistema@jmv.org"

    await prisma.comunidadJmv.update({
      where: { id: comunidadId },
      data: { deleted: true, deletedDate: new Date(), deletedById: userEmail },
    })

    return sendSuccess({}, "Comunidad eliminada exitosamente")
  } catch (error) {
    return sendServerError("Error al eliminar la comunidad", error)
  }
}
