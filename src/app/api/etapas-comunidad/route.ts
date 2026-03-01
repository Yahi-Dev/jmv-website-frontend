// src/app/api/etapas-comunidad/route.ts
import { NextRequest } from "next/server"
import prisma from "@/src/lib/prisma"
import {
  sendSuccess,
  sendCreated,
  sendBadRequest,
  sendServerError,
} from "@/src/utils/httpResponse"

// ── GET /api/etapas-comunidad ─────────────────────────────────────────────────
export async function GET() {
  try {
    const etapas = await prisma.etapaComunidadJmv.findMany({
      where: { activo: true },
      orderBy: { nombre: "asc" },
    })
    return sendSuccess({ Data: etapas, Total: etapas.length }, "Etapas obtenidas")
  } catch (error) {
    return sendServerError("Error al obtener las etapas", error)
  }
}

// ── POST /api/etapas-comunidad ────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const nombre = (body?.nombre ?? "").toString().trim()
    if (!nombre || nombre.length > 100)
      return sendBadRequest("El nombre de la etapa es requerido (máx. 100 caracteres)")

    const existing = await prisma.etapaComunidadJmv.findFirst({ where: { nombre } })
    if (existing) {
      if (!existing.activo) {
        const reactivated = await prisma.etapaComunidadJmv.update({
          where: { id: existing.id },
          data: { activo: true },
        })
        return sendCreated({ Data: reactivated }, "Etapa reactivada exitosamente")
      }
      return sendBadRequest("Ya existe una etapa con ese nombre")
    }

    const etapa = await prisma.etapaComunidadJmv.create({ data: { nombre } })
    return sendCreated({ Data: etapa }, "Etapa creada exitosamente")
  } catch (error) {
    return sendServerError("Error al crear la etapa", error)
  }
}
