// src/app/api/cargos-centro/route.ts
import { NextRequest } from "next/server"
import prisma from "@/src/lib/prisma"
import {
  sendSuccess,
  sendCreated,
  sendBadRequest,
  sendServerError,
} from "@/src/utils/httpResponse"

// ── GET /api/cargos-centro ────────────────────────────────────────────────────
export async function GET() {
  try {
    const cargos = await prisma.cargoCentroJmv.findMany({
      where: { activo: true },
      orderBy: { nombre: "asc" },
    })
    return sendSuccess({ Data: cargos, Total: cargos.length }, "Cargos obtenidos")
  } catch (error) {
    return sendServerError("Error al obtener los cargos", error)
  }
}

// ── POST /api/cargos-centro ───────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const nombre = (body?.nombre ?? "").toString().trim()
    if (!nombre || nombre.length > 100)
      return sendBadRequest("El nombre del cargo es requerido (máx. 100 caracteres)")

    const existing = await prisma.cargoCentroJmv.findFirst({ where: { nombre } })
    if (existing) {
      if (!existing.activo) {
        const reactivated = await prisma.cargoCentroJmv.update({
          where: { id: existing.id },
          data: { activo: true },
        })
        return sendCreated({ Data: reactivated }, "Cargo reactivado exitosamente")
      }
      return sendBadRequest("Ya existe un cargo con ese nombre")
    }

    const cargo = await prisma.cargoCentroJmv.create({ data: { nombre } })
    return sendCreated({ Data: cargo }, "Cargo creado exitosamente")
  } catch (error) {
    return sendServerError("Error al crear el cargo", error)
  }
}
