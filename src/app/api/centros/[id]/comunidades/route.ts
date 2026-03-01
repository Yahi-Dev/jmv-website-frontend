// src/app/api/centros/[id]/comunidades/route.ts
import { NextRequest } from "next/server"
import prisma from "@/src/lib/prisma"
import {
  sendSuccess,
  sendCreated,
  sendBadRequest,
  sendNotFound,
  sendServerError,
} from "@/src/utils/httpResponse"
import { comunidadCreateSchema } from "@/src/features/centros/schema/validation"
import { auth } from "@/src/lib/auth"

// ── GET /api/centros/[id]/comunidades ─────────────────────────────────────────
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params
    const centroId = Number.parseInt(idParam)
    if (isNaN(centroId)) return sendBadRequest("ID inválido")

    const centro = await prisma.centroJmv.findFirst({ where: { id: centroId, deleted: false } })
    if (!centro) return sendNotFound("Centro no encontrado")

    const comunidades = await prisma.comunidadJmv.findMany({
      where: { centroId, deleted: false },
      orderBy: { createdDate: "asc" },
    })

    return sendSuccess({ Data: comunidades, Total: comunidades.length }, "Comunidades obtenidas")
  } catch (error) {
    return sendServerError("Error al obtener las comunidades", error)
  }
}

// ── POST /api/centros/[id]/comunidades ────────────────────────────────────────
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params
    const centroId = Number.parseInt(idParam)
    if (isNaN(centroId)) return sendBadRequest("ID inválido")

    const centro = await prisma.centroJmv.findFirst({ where: { id: centroId, deleted: false } })
    if (!centro) return sendNotFound("Centro no encontrado")

    const body = await req.json()
    const parsed = comunidadCreateSchema.safeParse(body)
    if (!parsed.success) {
      return sendBadRequest("Datos inválidos", { fieldErrors: parsed.error.flatten().fieldErrors })
    }

    const session = await auth.api.getSession({ headers: Object.fromEntries(req.headers) })
    const userEmail = session?.user?.email ?? "sistema@jmv.org"

    const comunidad = await prisma.comunidadJmv.create({
      data: {
        centroId,
        nombre: parsed.data.nombre,
        imagenUrl: parsed.data.imagenUrl,
        cantidadMiembros: parsed.data.cantidadMiembros,
        inicioDate: new Date(parsed.data.inicioDate),
        etapa: parsed.data.etapa,
        etiquetas: parsed.data.etiquetas,
        createdDate: new Date(),
        createdById: userEmail,
      },
    })

    return sendCreated({ Data: comunidad }, "Comunidad creada exitosamente")
  } catch (error) {
    return sendServerError("Error al crear la comunidad", error)
  }
}
