// src/app/api/actividades/route.ts
import { NextRequest } from "next/server"
import prisma from "@/src/lib/prisma"
import {
  sendSuccess,
  sendCreated,
  sendBadRequest,
  sendServerError,
} from "@/src/utils/httpResponse"
import { actividadCreateSchema } from "@/src/features/actividades/schema/validation"
import { auth } from "@/src/lib/auth"
import { Prisma } from "@prisma/client"

function generateSlug(titulo: string, id: number): string {
  const base = titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
  return `${base}-${id}`
}

// ── GET /api/actividades ───────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = (searchParams.get("search") ?? "").trim()
    const centroIdParam = searchParams.get("centroId")
    const centroId = centroIdParam ? Number.parseInt(centroIdParam) : undefined
    const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(100, Math.max(1, Number.parseInt(searchParams.get("limit") || "50")))
    const skip = (page - 1) * limit

    const where: Prisma.ActividadJmvWhereInput = {
      deleted: false,
      ...(centroId && !isNaN(centroId) ? { centroId } : {}),
      ...(search
        ? {
            OR: [
              { titulo: { contains: search } },
              { resumen: { contains: search } },
            ],
          }
        : {}),
    }

    const [actividades, total] = await Promise.all([
      prisma.actividadJmv.findMany({
        where,
        include: { centro: { select: { id: true, nombreParroquia: true } } },
        orderBy: { fecha: "desc" },
        skip,
        take: limit,
      }),
      prisma.actividadJmv.count({ where }),
    ])

    return sendSuccess(
      { Data: actividades, Total: total, Page: page },
      "Actividades obtenidas exitosamente"
    )
  } catch (error) {
    console.error("Error fetching actividades:", error)
    return sendServerError("Error al obtener las actividades", error)
  }
}

// ── POST /api/actividades ──────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = actividadCreateSchema.safeParse(body)

    if (!parsed.success) {
      const errors = parsed.error.flatten()
      return sendBadRequest("Datos inválidos. Por favor verifica los campos", {
        fieldErrors: errors.fieldErrors,
        formErrors: errors.formErrors,
      })
    }

    const session = await auth.api.getSession({
      headers: Object.fromEntries(req.headers),
    })
    const userEmail = session?.user?.email ?? "sistema@jmv.org"

    const data = parsed.data

    const actividad = await prisma.actividadJmv.create({
      data: {
        slug: `temp-${Date.now()}`,
        titulo: data.titulo,
        centroId: data.centroId,
        resumen: data.resumen,
        fecha: new Date(data.fecha),
        imagenUrl: data.imagenUrl,
        etiquetas: data.etiquetas,
        createdDate: new Date(),
        createdById: userEmail,
      },
    })

    const slug = generateSlug(data.titulo, actividad.id)
    const updated = await prisma.actividadJmv.update({
      where: { id: actividad.id },
      data: { slug },
      include: { centro: { select: { id: true, nombreParroquia: true } } },
    })

    return sendCreated({ Data: updated }, "Actividad creada exitosamente")
  } catch (error) {
    console.error("Error creating actividad:", error)
    return sendServerError("Error al crear la actividad", error)
  }
}
