// src/app/api/centros/[id]/miembros/route.ts
import { NextRequest } from "next/server"
import prisma from "@/src/lib/prisma"
import {
  sendSuccess,
  sendCreated,
  sendBadRequest,
  sendNotFound,
  sendServerError,
} from "@/src/utils/httpResponse"
import { miembroCreateSchema } from "@/src/features/centros/schema/validation"
import { auth } from "@/src/lib/auth"

// ── GET /api/centros/[id]/miembros ────────────────────────────────────────────
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params
    const centroId = Number.parseInt(idParam)
    if (isNaN(centroId)) return sendBadRequest("ID inválido")

    const centro = await prisma.centroJmv.findFirst({ where: { id: centroId, deleted: false } })
    if (!centro) return sendNotFound("Centro no encontrado")

    const miembros = await prisma.miembroCentroJmv.findMany({
      where: { centroId, deleted: false },
      orderBy: { createdDate: "asc" },
    })

    return sendSuccess({ Data: miembros, Total: miembros.length }, "Miembros obtenidos")
  } catch (error) {
    return sendServerError("Error al obtener los miembros", error)
  }
}

// ── POST /api/centros/[id]/miembros ───────────────────────────────────────────
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params
    const centroId = Number.parseInt(idParam)
    if (isNaN(centroId)) return sendBadRequest("ID inválido")

    const centro = await prisma.centroJmv.findFirst({ where: { id: centroId, deleted: false } })
    if (!centro) return sendNotFound("Centro no encontrado")

    const body = await req.json()
    const parsed = miembroCreateSchema.safeParse(body)
    if (!parsed.success) {
      return sendBadRequest("Datos inválidos", { fieldErrors: parsed.error.flatten().fieldErrors })
    }

    const session = await auth.api.getSession({ headers: Object.fromEntries(req.headers) })
    const userEmail = session?.user?.email ?? "sistema@jmv.org"

    const miembro = await prisma.miembroCentroJmv.create({
      data: {
        centroId,
        nombre: parsed.data.nombre,
        imagenUrl: parsed.data.imagenUrl,
        descripcion: parsed.data.descripcion,
        cargo: parsed.data.cargo,
        createdDate: new Date(),
        createdById: userEmail,
      },
    })

    return sendCreated({ Data: miembro }, "Miembro agregado exitosamente")
  } catch (error) {
    return sendServerError("Error al agregar el miembro", error)
  }
}
