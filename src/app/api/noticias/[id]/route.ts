// src/app/api/noticias/[id]/route.ts
import { NextRequest } from "next/server"
import prisma from "@/src/lib/prisma"
import {
  sendSuccess,
  sendBadRequest,
  sendNotFound,
  sendServerError,
} from "@/src/utils/httpResponse"
import { noticiaUpdateSchema } from "@/src/features/noticias/schema/validation"
import { auth } from "@/src/lib/auth"

// ── GET /api/noticias/[id] ─────────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params

    const noticia = await prisma.noticia.findFirst({
      where: {
        deleted: false,
        ...(isNaN(Number(idParam))
          ? { slug: idParam }
          : { id: Number(idParam) }),
      },
    })

    if (!noticia) {
      return sendNotFound("Noticia no encontrada")
    }

    return sendSuccess({ Data: noticia }, "Noticia obtenida exitosamente")
  } catch (error) {
    console.error("Error fetching noticia:", error)
    return sendServerError("Error al obtener la noticia", error)
  }
}

// ── PUT /api/noticias/[id] ─────────────────────────────────────────────────────
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
    const parsed = noticiaUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return sendBadRequest("Datos inválidos", {
        fieldErrors: parsed.error.flatten().fieldErrors,
      })
    }

    const existing = await prisma.noticia.findUnique({
      where: { id, deleted: false },
    })

    if (!existing) {
      return sendNotFound("Noticia no encontrada")
    }

    const session = await auth.api.getSession({
      headers: Object.fromEntries(req.headers),
    })

    const data = parsed.data
    const updated = await prisma.noticia.update({
      where: { id },
      data: {
        ...(data.titulo !== undefined && { titulo: data.titulo }),
        ...(data.descripcionBreve !== undefined && { descripcionBreve: data.descripcionBreve }),
        ...(data.descripcionCompleta !== undefined && { descripcionCompleta: data.descripcionCompleta || null }),
        ...(data.imagenUrl !== undefined && { imagenUrl: data.imagenUrl }),
        ...(data.ubicacion !== undefined && { ubicacion: data.ubicacion }),
        ...(data.fecha !== undefined && { fecha: new Date(data.fecha) }),
        ...(data.hora !== undefined && { hora: data.hora || null }),
        ...(data.tipo !== undefined && { tipo: data.tipo }),
        ...(data.etiquetas !== undefined && { etiquetas: data.etiquetas }),
        ...(data.destacada !== undefined && { destacada: data.destacada }),
        modifiedDate: new Date(),
        modifiedById: session?.user?.email ?? "sistema@jmv.org",
      },
    })

    return sendSuccess({ Data: updated }, "Noticia actualizada exitosamente")
  } catch (error) {
    console.error("Error updating noticia:", error)
    return sendServerError("Error al actualizar la noticia", error)
  }
}

// ── DELETE /api/noticias/[id] ──────────────────────────────────────────────────
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

    const noticia = await prisma.noticia.findUnique({ where: { id } })

    if (!noticia) {
      return sendNotFound("Noticia no encontrada")
    }

    if (noticia.deleted) {
      return sendBadRequest("La noticia ya fue eliminada")
    }

    const session = await auth.api.getSession({
      headers: Object.fromEntries(req.headers),
    })

    await prisma.noticia.update({
      where: { id },
      data: {
        deleted: true,
        deletedDate: new Date(),
        deletedById: session?.user?.email ?? "sistema@jmv.org",
      },
    })

    return sendSuccess(
      { Data: { id } },
      `Noticia "${noticia.titulo}" eliminada correctamente`
    )
  } catch (error) {
    console.error("Error deleting noticia:", error)
    return sendServerError("Error al eliminar la noticia", error)
  }
}
