// src/app/api/eventos/[id]/route.ts
import { NextRequest } from "next/server"
import prisma from "@/src/lib/prisma"
import {
  sendSuccess,
  sendBadRequest,
  sendNotFound,
  sendServerError,
} from "@/src/utils/httpResponse"
import { eventoUpdateSchema } from "@/src/features/eventos/schema/validation"
import { auth } from "@/src/lib/auth"

// ── GET /api/eventos/[id] ─────────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params

    const evento = await prisma.evento.findFirst({
      where: {
        deleted: false,
        ...(isNaN(Number(idParam))
          ? { slug: idParam }
          : { id: Number(idParam) }),
      },
    })

    if (!evento) {
      return sendNotFound("Evento no encontrado")
    }

    return sendSuccess({ Data: evento }, "Evento obtenido exitosamente")
  } catch (error) {
    console.error("Error fetching evento:", error)
    return sendServerError("Error al obtener el evento", error)
  }
}

// ── PUT /api/eventos/[id] ─────────────────────────────────────────────────────
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = Number(idParam)

    if (!Number.isInteger(id) || id <= 0) {
      return sendBadRequest("ID inválido")
    }

    const body = await req.json()
    const parsed = eventoUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return sendBadRequest("Datos inválidos", {
        fieldErrors: parsed.error.flatten().fieldErrors,
      })
    }

    const existing = await prisma.evento.findUnique({
      where: { id, deleted: false },
    })

    if (!existing) {
      return sendNotFound("Evento no encontrado")
    }

    const session = await auth.api.getSession({
      headers: Object.fromEntries(req.headers),
    })

    const data = parsed.data
    const updated = await prisma.evento.update({
      where: { id },
      data: {
        ...(data.titulo !== undefined && { titulo: data.titulo }),
        ...(data.descripcionBreve !== undefined && { descripcionBreve: data.descripcionBreve }),
        ...(data.descripcionCompleta !== undefined && { descripcionCompleta: data.descripcionCompleta || null }),
        ...(data.imagenUrl !== undefined && { imagenUrl: data.imagenUrl }),
        ...(data.ubicacion !== undefined && { ubicacion: data.ubicacion }),
        ...(data.fecha !== undefined && { fecha: new Date(data.fecha) }),
        ...(data.hora !== undefined && { hora: data.hora }),
        ...(data.email !== undefined && { email: data.email || null }),
        ...(data.telefono !== undefined && { telefono: data.telefono || null }),
        ...(data.etiquetas !== undefined && { etiquetas: data.etiquetas }),
        ...(data.actividades !== undefined && { actividades: data.actividades }),
        ...(data.agenda !== undefined && { agenda: data.agenda }),
        ...(data.requisitos !== undefined && { requisitos: data.requisitos }),
        modifiedDate: new Date(),
        modifiedById: session?.user?.email ?? "sistema@jmv.org",
      },
    })

    return sendSuccess({ Data: updated }, "Evento actualizado exitosamente")
  } catch (error) {
    console.error("Error updating evento:", error)
    return sendServerError("Error al actualizar el evento", error)
  }
}

// ── DELETE /api/eventos/[id] ──────────────────────────────────────────────────
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = Number(idParam)

    if (!Number.isInteger(id) || id <= 0) {
      return sendBadRequest("ID inválido")
    }

    const evento = await prisma.evento.findUnique({ where: { id } })

    if (!evento) {
      return sendNotFound("Evento no encontrado")
    }

    if (evento.deleted) {
      return sendBadRequest("El evento ya fue eliminado")
    }

    const session = await auth.api.getSession({
      headers: Object.fromEntries(req.headers),
    })

    await prisma.evento.update({
      where: { id },
      data: {
        deleted: true,
        deletedDate: new Date(),
        deletedById: session?.user?.email ?? "sistema@jmv.org",
      },
    })

    return sendSuccess(
      { Data: { id } },
      `Evento "${evento.titulo}" eliminado correctamente`
    )
  } catch (error) {
    console.error("Error deleting evento:", error)
    return sendServerError("Error al eliminar el evento", error)
  }
}
