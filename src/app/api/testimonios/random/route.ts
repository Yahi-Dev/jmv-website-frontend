// app/api/testimonios/random/route.ts
import { NextRequest } from 'next/server';
import prisma from '@/src/lib/prisma';
import { sendSuccess, sendBadRequest, sendServerError } from '@/src/utils/httpResponse';
import { withPublicCache } from '@/src/lib/http-cache';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const count = parseInt(searchParams.get("count") || "3");

    if (count <= 0 || count > 100) {
      return sendBadRequest('El parámetro count debe ser entre 1 y 100');
    }

    const total = await prisma.testimonios.count({ where: { deleted: false } });

    if (total === 0) {
      return sendSuccess({ Data: [], Total: 0 }, "No hay testimonios disponibles");
    }

    // Muestreo barato por OFFSET aleatorio en vez de ORDER BY RANDOM() (que hace
    // full scan + sort de toda la tabla en cada request). Aprovecha el índice
    // [deleted, createdDate] y nunca lee más de `takeCount` filas.
    const takeCount = Math.min(count, total);
    const maxSkip = Math.max(0, total - takeCount);
    const skip = Math.floor(Math.random() * (maxSkip + 1));

    const testimonios = await prisma.testimonios.findMany({
      where: { deleted: false },
      select: {
        id: true,
        nombre: true,
        mensaje: true,
        reputacion: true,
        iglesia: true,
        createdDate: true,
      },
      orderBy: { createdDate: "desc" },
      skip,
      take: takeCount,
    });

    // Caché de CDN corta (30s) para anónimos: ofrece descarga masiva del origen
    // conservando rotación frecuente del muestreo aleatorio.
    return withPublicCache(req, sendSuccess(
      { Data: testimonios, Total: testimonios.length },
      `${testimonios.length} testimonios obtenidos exitosamente`
    ), { sMaxAge: 30, swr: 120 });
  } catch (error) {
    console.error("Error fetching random testimonios:", error);
    return sendServerError("Error al obtener testimonios aleatorios", error);
  }
}
