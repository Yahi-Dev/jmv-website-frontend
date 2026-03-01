// src/app/api/noticias/tipos/route.ts
import { NextRequest } from "next/server"
import prisma from "@/src/lib/prisma"
import {
  sendSuccess,
  sendCreated,
  sendBadRequest,
  sendServerError,
} from "@/src/utils/httpResponse"
import { z } from "zod"

const createTipoSchema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres").max(100, "Máximo 100 caracteres").trim(),
})

// ── GET /api/noticias/tipos ────────────────────────────────────────────────────
export async function GET() {
  try {
    const tipos = await prisma.noticiaTipo.findMany({
      where: { activo: true },
      orderBy: { nombre: "asc" },
    })
    return sendSuccess({ Data: tipos, Total: tipos.length }, "Tipos obtenidos exitosamente")
  } catch (error) {
    console.error("Error fetching tipos:", error)
    return sendServerError("Error al obtener los tipos", error)
  }
}

// ── POST /api/noticias/tipos ───────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = createTipoSchema.safeParse(body)

    if (!parsed.success) {
      return sendBadRequest("Nombre inválido", {
        fieldErrors: parsed.error.flatten().fieldErrors,
      })
    }

    const existing = await prisma.noticiaTipo.findUnique({
      where: { nombre: parsed.data.nombre },
    })

    if (existing) {
      if (!existing.activo) {
        const reactivated = await prisma.noticiaTipo.update({
          where: { id: existing.id },
          data: { activo: true },
        })
        return sendCreated({ Data: reactivated }, "Tipo reactivado exitosamente")
      }
      return sendBadRequest("Ya existe un tipo con ese nombre")
    }

    const tipo = await prisma.noticiaTipo.create({
      data: { nombre: parsed.data.nombre },
    })

    return sendCreated({ Data: tipo }, "Tipo creado exitosamente")
  } catch (error) {
    console.error("Error creating tipo:", error)
    return sendServerError("Error al crear el tipo", error)
  }
}
