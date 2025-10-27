// app/api/testimonios/latest/route.ts
import { NextRequest } from 'next/server';
import prisma from '@/src/lib/prisma';
import { getOrSetCache } from '@/src/lib/redis';
import { sendSuccess, sendBadRequest, sendServerError } from '@/src/utils/httpResponse';

const LATEST_CACHE_KEY = "testimonios-latest";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const count = parseInt(searchParams.get("count") || "3");

    if (count <= 0 || count > 100) {
      return sendBadRequest('El parámetro count debe ser entre 1 y 100');
    }

    const cacheKey = `${LATEST_CACHE_KEY}-${count}`;
    
    const data = await getOrSetCache(cacheKey, async () => {
      console.log(`🔍 Obteniendo los últimos ${count} testimonios...`);
      
      // Obtener los últimos testimonios ordenados por fecha de creación descendente
      const testimonios = await prisma.testimonios.findMany({
        where: { 
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
        orderBy: { 
          createdDate: "desc" // Ordenar por los más recientes primero
        },
        take: count // Limitar a la cantidad solicitada
      });

      console.log(`✅ ${testimonios.length} testimonios más recientes obtenidos`);
      
      return testimonios;
    }, 300); // 5 minutos de cache (puedes ajustar según necesites)

    return sendSuccess({
      Data: data,
      Total: data.length
    }, `${data.length} testimonios más recientes obtenidos exitosamente`);

  } catch (error) {
    console.error("Error fetching latest testimonios:", error);
    return sendServerError("Error al obtener testimonios recientes", error);
  }
}