// src/app/api/consejos/miembros/route.ts
import { NextRequest } from 'next/server'
import prisma from '@/src/lib/prisma'
import { sendBadRequest, sendCreated, sendServerError } from '@/src/utils/httpResponse'
import { miembroCreateSchema } from '@/src/features/consejos/schema/validation'
import { auth } from '@/src/lib/auth'
import { requireAdmin } from "@/src/lib/server-auth"

export async function POST(req: NextRequest) {
  try {
    const guard = await requireAdmin()
    if (!guard.ok) return guard.response

    const body = await req.json()
    const parsed = miembroCreateSchema.safeParse(body)

    if (!parsed.success) {
      return sendBadRequest('Datos inválidos', {
        formErrors: parsed.error.flatten().formErrors,
        fieldErrors: parsed.error.flatten().fieldErrors
      })
    }

    const session = await auth.api.getSession({
      headers: Object.fromEntries(req.headers)
    })

    const miembro = await prisma.miembroConsejo.create({
      data: {
        ...parsed.data,
        trayectoria: parsed.data.trayectoria || undefined,
        createdById: session?.user?.email ?? "sistema@jmv.org"
      } as any,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true
          }
        },
        consejo: true
      }
    })

    return sendCreated({
      Data: miembro
    }, "Miembro agregado exitosamente al consejo")
  } catch (error) {
    console.error("Error creating miembro:", error)
    return sendServerError("Error al agregar miembro al consejo", error)
  }
}