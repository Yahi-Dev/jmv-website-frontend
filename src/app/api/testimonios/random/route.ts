// app/api/testimonios/random/route.ts
import { NextRequest } from 'next/server';
import prisma from '@/src/lib/prisma';
import { sendSuccess, sendBadRequest, sendServerError } from '@/src/utils/httpResponse';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const count = parseInt(searchParams.get("count") || "3");

    if (count <= 0 || count > 100) {
      return sendBadRequest('El parámetro count debe ser entre 1 y 100');
    }

    console.log(`🔍 Obteniendo ${count} testimonios aleatorios...`);
    
    // Obtener todos los testimonios no eliminados
    const totalTestimonios = await prisma.testimonios.count({
      where: { deleted: false }
    });

    if (totalTestimonios === 0) {
      return sendSuccess({
        Data: [],
        Total: 0
      }, "No hay testimonios disponibles");
    }

    // Si hay menos testimonios que el count solicitado, devolver todos
    const takeCount = Math.min(count, totalTestimonios);

    // Obtener IDs aleatorios
    const randomIds = await prisma.$queryRaw<{id: number}[]>`
      SELECT id FROM "Testimonios" 
      WHERE deleted = false 
      ORDER BY RANDOM() 
      LIMIT ${takeCount}
    `;

    if (randomIds.length === 0) {
      return sendSuccess({
        Data: [],
        Total: 0
      }, "No se encontraron testimonios aleatorios");
    }

    // Obtener los testimonios completos
    const testimonios = await prisma.testimonios.findMany({
      where: {
        id: { in: randomIds.map(r => r.id) },
        deleted: false
      },
      select: {
        id: true,
        nombre: true,
        mensaje: true,
        reputacion: true,
        iglesia: true,
        createdDate: true,
      },
      orderBy: { createdDate: "desc" }
    });

    console.log(`✅ ${testimonios.length} testimonios aleatorios obtenidos`);

    return sendSuccess({
      Data: testimonios,
      Total: testimonios.length
    }, `${testimonios.length} testimonios aleatorios obtenidos exitosamente`);

  } catch (error) {
    console.error("Error fetching random testimonios:", error);
    return sendServerError("Error al obtener testimonios aleatorios", error);
  }
}