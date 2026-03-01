// src/app/api/actividades/[id]/route.ts
import { NextRequest } from "next/server"
import prisma from "@/src/lib/prisma"
import {
  sendSuccess,
  sendBadRequest,
  sendNotFound,
  sendServerError,
} from "@/src/utils/httpResponse"
import { actividadUpdateSchema } from "@/src/features/actividades/schema/validation"
import { auth } from "@/src/lib/auth"

const INCLUDE = {
  centro: { select: { id: true, nombreParroquia: true } },
}

// ── GET /api/actividades/[id] ─────────────────────────────────────────────────
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params
    const isNumeric = !isNaN(Number(idParam))

    const actividad = await prisma.actividadJmv.findFirst({
      where: {
        deleted: false,
        ...(isNumeric ? { id: Number(idParam) } : { slug: idParam }),
      },
      include: INCLUDE,
    })

    if (!actividad) return sendNotFound("Actividad no encontrada")
    return sendSuccess({ Data: actividad }, "Actividad obtenida exitosamente")
  } catch (error) {
    return sendServerError("Error al obtener la actividad", error)
  }
}

// ── PUT /api/actividades/[id] ─────────────────────────────────────────────────
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params
    const id = Number.parseInt(idParam)
    if (isNaN(id) || id < 1) return sendBadRequest("ID inválido")

    const existing = await prisma.actividadJmv.findFirst({ where: { id, deleted: false } })
    if (!existing) return sendNotFound("Actividad no encontrada")

    const body = await req.json()
    const parsed = actividadUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return sendBadRequest("Datos inválidos", { fieldErrors: parsed.error.flatten().fieldErrors })
    }

    const session = await auth.api.getSession({ headers: Object.fromEntries(req.headers) })
    const userEmail = session?.user?.email ?? "sistema@jmv.org"

    const data = parsed.data
    const updated = await prisma.actividadJmv.update({
      where: { id },
      data: {
        ...(data.titulo !== undefined ? { titulo: data.titulo } : {}),
        ...(data.centroId !== undefined ? { centroId: data.centroId } : {}),
        ...(data.resumen !== undefined ? { resumen: data.resumen } : {}),
        ...(data.fecha !== undefined ? { fecha: new Date(data.fecha) } : {}),
        ...(data.imagenUrl !== undefined ? { imagenUrl: data.imagenUrl } : {}),
        ...(data.etiquetas !== undefined ? { etiquetas: data.etiquetas } : {}),
        modifiedDate: new Date(),
        modifiedById: userEmail,
      },
      include: INCLUDE,
    })

    return sendSuccess({ Data: updated }, "Actividad actualizada exitosamente")
  } catch (error) {
    return sendServerError("Error al actualizar la actividad", error)
  }
}

// ── DELETE /api/actividades/[id] ──────────────────────────────────────────────
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params
    const id = Number.parseInt(idParam)
    if (isNaN(id) || id < 1) return sendBadRequest("ID inválido")

    const existing = await prisma.actividadJmv.findFirst({ where: { id, deleted: false } })
    if (!existing) return sendNotFound("Actividad no encontrada")

    const session = await auth.api.getSession({ headers: Object.fromEntries(req.headers) })
    const userEmail = session?.user?.email ?? "sistema@jmv.org"

    await prisma.actividadJmv.update({
      where: { id },
      data: { deleted: true, deletedDate: new Date(), deletedById: userEmail },
    })

    return sendSuccess({}, "Actividad eliminada exitosamente")
  } catch (error) {
    return sendServerError("Error al eliminar la actividad", error)
  }
}
