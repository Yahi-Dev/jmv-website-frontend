// src/app/api/noticias/route.ts
import { NextRequest } from "next/server"
import prisma from "@/src/lib/prisma"
import {
  sendSuccess,
  sendCreated,
  sendBadRequest,
  sendServerError,
} from "@/src/utils/httpResponse"
import { noticiaCreateSchema } from "@/src/features/noticias/schema/validation"
import { auth } from "@/src/lib/auth"
import { Prisma } from "@prisma/client"

// ── Slug generator ─────────────────────────────────────────────────────────────
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

// ── GET /api/noticias ──────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = (searchParams.get("search") ?? "").trim()
    const tipo = (searchParams.get("tipo") ?? "").trim()
    const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(100, Math.max(1, Number.parseInt(searchParams.get("limit") || "50")))
    const skip = (page - 1) * limit

    const where: Prisma.NoticiaWhereInput = {
      deleted: false,
      ...(tipo ? { tipo } : {}),
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

    const [noticias, total] = await Promise.all([
      prisma.noticia.findMany({
        where,
        orderBy: { fecha: "desc" },
        skip,
        take: limit,
      }),
      prisma.noticia.count({ where }),
    ])

    return sendSuccess(
      { Data: noticias, Total: total, Page: page },
      "Noticias obtenidas exitosamente"
    )
  } catch (error) {
    console.error("Error fetching noticias:", error)
    return sendServerError("Error al obtener las noticias", error)
  }
}

// ── POST /api/noticias ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = noticiaCreateSchema.safeParse(body)

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

    const noticia = await prisma.noticia.create({
      data: {
        slug: `temp-${Date.now()}`,
        titulo: data.titulo,
        descripcionBreve: data.descripcionBreve,
        descripcionCompleta: data.descripcionCompleta || null,
        imagenUrl: data.imagenUrl,
        ubicacion: data.ubicacion,
        fecha: new Date(data.fecha),
        hora: data.hora || null,
        tipo: data.tipo,
        etiquetas: data.etiquetas,
        destacada: data.destacada ?? false,
        createdDate: new Date(),
        createdById: userEmail,
      },
    })

    const slug = generateSlug(data.titulo, noticia.id)
    const updated = await prisma.noticia.update({
      where: { id: noticia.id },
      data: { slug },
    })

    return sendCreated({ Data: updated }, "Noticia creada exitosamente")
  } catch (error) {
    console.error("Error creating noticia:", error)
    return sendServerError("Error al crear la noticia", error)
  }
}
