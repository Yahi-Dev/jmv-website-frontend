// src/app/api/centros/route.ts
import { NextRequest } from "next/server"
import prisma from "@/src/lib/prisma"
import {
  sendSuccess,
  sendCreated,
  sendBadRequest,
  sendServerError,
} from "@/src/utils/httpResponse"
import { centroCreateSchema } from "@/src/features/centros/schema/validation"
import { auth } from "@/src/lib/auth"
import { Prisma } from "@prisma/client"

function generateSlug(nombre: string, id: number): string {
  const base = nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
  return `${base}-${id}`
}

// ── GET /api/centros ───────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = (searchParams.get("search") ?? "").trim()
    const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(200, Math.max(1, Number.parseInt(searchParams.get("limit") || "50")))
    const skip = (page - 1) * limit

    const where: Prisma.CentroJmvWhereInput = {
      deleted: false,
      ...(search
        ? {
            OR: [
              { nombreParroquia: { contains: search } },
              { ubicacion: { contains: search } },
            ],
          }
        : {}),
    }

    const [centros, total] = await Promise.all([
      prisma.centroJmv.findMany({
        where,
        include: {
          _count: { select: { comunidades: true, miembros: true } },
          ultimaActividad: { select: { id: true, titulo: true, fecha: true } },
        },
        orderBy: { nombreParroquia: "asc" },
        skip,
        take: limit,
      }),
      prisma.centroJmv.count({ where }),
    ])

    return sendSuccess(
      { Data: centros, Total: total, Page: page },
      "Centros obtenidos exitosamente"
    )
  } catch (error) {
    console.error("Error fetching centros:", error)
    return sendServerError("Error al obtener los centros", error)
  }
}

// ── POST /api/centros ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = centroCreateSchema.safeParse(body)

    if (!parsed.success) {
      const errors = parsed.error.flatten()
      return sendBadRequest("Datos inválidos. Por favor verifica los campos", {
        fieldErrors: errors.fieldErrors,
        formErrors: errors.formErrors,
      })
    }

    const session = await auth.api.getSession({ headers: Object.fromEntries(req.headers) })
    const userEmail = session?.user?.email ?? "sistema@jmv.org"

    const data = parsed.data

    const centro = await prisma.centroJmv.create({
      data: {
        slug: `temp-${Date.now()}`,
        nombreParroquia: data.nombreParroquia,
        ubicacion: data.ubicacion,
        cantidadMiembrosActivos: data.cantidadMiembrosActivos,
        nombreCoordinadora: data.nombreCoordinadora,
        telefono: data.telefono,
        correo: data.correo,
        resumen: data.resumen,
        anioFundacion: data.anioFundacion,
        imagenUrl: data.imagenUrl,
        etiquetas: data.etiquetas,
        createdDate: new Date(),
        createdById: userEmail,
      },
    })

    const slug = generateSlug(data.nombreParroquia, centro.id)
    const updated = await prisma.centroJmv.update({
      where: { id: centro.id },
      data: { slug },
      include: { _count: { select: { comunidades: true, miembros: true } } },
    })

    return sendCreated({ Data: updated }, "Centro creado exitosamente")
  } catch (error) {
    console.error("Error creating centro:", error)
    return sendServerError("Error al crear el centro", error)
  }
}
