// src/app/api/centros/[id]/route.ts
import { NextRequest } from "next/server"
import prisma from "@/src/lib/prisma"
import {
  sendSuccess,
  sendBadRequest,
  sendNotFound,
  sendServerError,
} from "@/src/utils/httpResponse"
import { centroUpdateSchema } from "@/src/features/centros/schema/validation"
import { auth } from "@/src/lib/auth"

const INCLUDE = {
  miembros: { where: { deleted: false }, orderBy: { createdDate: "asc" as const } },
  comunidades: { where: { deleted: false }, orderBy: { createdDate: "asc" as const } },
  ultimaActividad: { select: { id: true, titulo: true, fecha: true } },
  _count: { select: { comunidades: true, miembros: true } },
}

// ── GET /api/centros/[id] ─────────────────────────────────────────────────────
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params
    const isNumeric = !isNaN(Number(idParam))

    const centro = await prisma.centroJmv.findFirst({
      where: {
        deleted: false,
        ...(isNumeric ? { id: Number(idParam) } : { slug: idParam }),
      },
      include: INCLUDE,
    })

    if (!centro) return sendNotFound("Centro no encontrado")
    return sendSuccess({ Data: centro }, "Centro obtenido exitosamente")
  } catch (error) {
    return sendServerError("Error al obtener el centro", error)
  }
}

// ── PUT /api/centros/[id] ─────────────────────────────────────────────────────
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params
    const id = Number.parseInt(idParam)
    if (isNaN(id) || id < 1) return sendBadRequest("ID inválido")

    const existing = await prisma.centroJmv.findFirst({ where: { id, deleted: false } })
    if (!existing) return sendNotFound("Centro no encontrado")

    const body = await req.json()
    const parsed = centroUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return sendBadRequest("Datos inválidos", { fieldErrors: parsed.error.flatten().fieldErrors })
    }

    const session = await auth.api.getSession({ headers: Object.fromEntries(req.headers) })
    const userEmail = session?.user?.email ?? "sistema@jmv.org"

    const data = parsed.data
    const updated = await prisma.centroJmv.update({
      where: { id },
      data: {
        ...(data.nombreParroquia !== undefined ? { nombreParroquia: data.nombreParroquia } : {}),
        ...(data.ubicacion !== undefined ? { ubicacion: data.ubicacion } : {}),
        ...(data.cantidadMiembrosActivos !== undefined ? { cantidadMiembrosActivos: data.cantidadMiembrosActivos } : {}),
        ...(data.nombreCoordinadora !== undefined ? { nombreCoordinadora: data.nombreCoordinadora } : {}),
        ...(data.telefono !== undefined ? { telefono: data.telefono } : {}),
        ...(data.correo !== undefined ? { correo: data.correo } : {}),
        ...(data.resumen !== undefined ? { resumen: data.resumen } : {}),
        ...(data.anioFundacion !== undefined ? { anioFundacion: data.anioFundacion } : {}),
        ...(data.imagenUrl !== undefined ? { imagenUrl: data.imagenUrl } : {}),
        ...(data.etiquetas !== undefined ? { etiquetas: data.etiquetas } : {}),
        ...("ultimaActividadId" in data ? { ultimaActividadId: data.ultimaActividadId ?? null } : {}),
        modifiedDate: new Date(),
        modifiedById: userEmail,
      },
      include: INCLUDE,
    })

    return sendSuccess({ Data: updated }, "Centro actualizado exitosamente")
  } catch (error) {
    return sendServerError("Error al actualizar el centro", error)
  }
}

// ── DELETE /api/centros/[id] ──────────────────────────────────────────────────
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params
    const id = Number.parseInt(idParam)
    if (isNaN(id) || id < 1) return sendBadRequest("ID inválido")

    const existing = await prisma.centroJmv.findFirst({ where: { id, deleted: false } })
    if (!existing) return sendNotFound("Centro no encontrado")

    const session = await auth.api.getSession({ headers: Object.fromEntries(req.headers) })
    const userEmail = session?.user?.email ?? "sistema@jmv.org"

    await prisma.centroJmv.update({
      where: { id },
      data: { deleted: true, deletedDate: new Date(), deletedById: userEmail },
    })

    return sendSuccess({}, "Centro eliminado exitosamente")
  } catch (error) {
    return sendServerError("Error al eliminar el centro", error)
  }
}
