// src/app/api/consejos/historial/route.ts
import { NextRequest } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'
import prisma from '@/src/lib/prisma'
import { sendServerError, sendSuccess } from '@/src/utils/httpResponse'
import { getOrSetCache } from '@/src/lib/redis'
import { withPublicCache } from '@/src/lib/http-cache'
import { maskMiembroContacto } from '@/src/lib/mask'

function fetchHistorial() {
  return prisma.consejoNacional.findMany({
    where: {
      isActual: false,
      deleted: false
    },
    include: {
      miembros: {
        where: { deleted: false },
        include: {
          // Solo se usa la imagen del usuario en la UI; no se expone name/email.
          user: {
            select: {
              image: true
            }
          }
        }
      }
    },
    orderBy: { fechaInicio: 'desc' }
  })
}

export async function GET(req: NextRequest) {
  try {
    const isAdmin = !!getSessionCookie(req)

    let consejosHistoricos
    if (isAdmin) {
      consejosHistoricos = await fetchHistorial()
    } else {
      // Anónimos: cacheado (TTL 300s) y con contacto de miembros enmascarado.
      consejosHistoricos = await getOrSetCache(
        'cache:consejo:historial:public',
        async () => {
          const list = await fetchHistorial()
          return list.map((c) => ({
            ...c,
            miembros: c.miembros.map(maskMiembroContacto),
          }))
        },
        300
      )
    }

    return withPublicCache(req, sendSuccess({
      Data: consejosHistoricos,
      Total: consejosHistoricos.length
    }, "Consejos históricos obtenidos exitosamente"), { sMaxAge: 300, swr: 900 })
  } catch (error) {
    console.error("Error fetching consejos históricos:", error)
    return sendServerError("Error al obtener los consejos históricos", error)
  }
}
