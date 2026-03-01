// src/app/api/eventos/route.ts
import { NextRequest } from "next/server"
import prisma from "@/src/lib/prisma"
import {
  sendSuccess,
  sendCreated,
  sendBadRequest,
  sendServerError,
} from "@/src/utils/httpResponse"
import { eventoCreateSchema } from "@/src/features/eventos/schema/validation"
import { auth } from "@/src/lib/auth"
import { Prisma } from "@prisma/client"

// ── Slug generator ────────────────────────────────────────────────────────────
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

// ── GET /api/eventos ──────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = (searchParams.get("search") ?? "").trim()
    const slug = searchParams.get("slug")
    const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(100, Math.max(1, Number.parseInt(searchParams.get("limit") || "50")))
    const skip = (page - 1) * limit

    // Lookup by slug for public detail page
    if (slug) {
      const evento = await prisma.evento.findUnique({
        where: { slug, deleted: false },
      })
      if (!evento) {
        return sendSuccess({ Data: null }, "Evento no encontrado")
      }
      return sendSuccess({ Data: evento }, "Evento obtenido exitosamente")
    }

    const where: Prisma.EventoWhereInput = {
      deleted: false,
      ...(search
        ? {
            OR: [
              { titulo: { contains: search } },
              { ubicacion: { contains: search } },
              { descripcionBreve: { contains: search } },
            ],
          }
        : {}),
    }

    const [eventos, total] = await Promise.all([
      prisma.evento.findMany({
        where,
        orderBy: { fecha: "asc" },
        skip,
        take: limit,
      }),
      prisma.evento.count({ where }),
    ])

    return sendSuccess(
      { Data: eventos, Total: total, Page: page },
      "Eventos obtenidos exitosamente"
    )
  } catch (error) {
    console.error("Error fetching eventos:", error)
    return sendServerError("Error al obtener los eventos", error)
  }
}

// ── POST /api/eventos ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = eventoCreateSchema.safeParse(body)

    if (!parsed.success) {
      const errors = parsed.error.flatten()
      console.error("Validation errors:", errors)
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

    // Create first to get the ID, then update slug
    const evento = await prisma.evento.create({
      data: {
        slug: `temp-${Date.now()}`,
        titulo: data.titulo,
        descripcionBreve: data.descripcionBreve,
        descripcionCompleta: data.descripcionCompleta || null,
        imagenUrl: data.imagenUrl,
        ubicacion: data.ubicacion,
        fecha: new Date(data.fecha),
        hora: data.hora,
        email: data.email || null,
        telefono: data.telefono || null,
        etiquetas: data.etiquetas,
        actividades: data.actividades ?? [],
        agenda: data.agenda ?? [],
        requisitos: data.requisitos,
        createdDate: new Date(),
        createdById: userEmail,
      },
    })

    // Update slug with real ID
    const slug = generateSlug(data.titulo, evento.id)
    const updated = await prisma.evento.update({
      where: { id: evento.id },
      data: { slug },
    })

    return sendCreated({ Data: updated }, "Evento creado exitosamente")
  } catch (error) {
    console.error("Error creating evento:", error)
    return sendServerError("Error al crear el evento", error)
  }
}
