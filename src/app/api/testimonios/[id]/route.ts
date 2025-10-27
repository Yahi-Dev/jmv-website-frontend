// app/api/testimonios/[id]/route.ts
import { NextRequest } from 'next/server';
import prisma from '@/src/lib/prisma';
import { getOrSetCache } from '@/src/lib/redis';
import { sendSuccess, sendBadRequest, sendNotFound, sendServerError } from '@/src/utils/httpResponse';

const ITEM_CACHE_KEY = (id: number) => `testimonios:${id}`;
const CACHE_TTL = 3600; // 1 hora en segundos

/**
 * GET /api/testimonios/[id]
 * Obtiene un testimonio por ID con cache y validación.
 */
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = Number(context.params.id);

    // ✅ Validación robusta del ID
    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
      return sendBadRequest('ID de testimonio inválido', {
        idProvided: context.params.id,
        expected: 'Número entero positivo',
        example: '/api/testimonios/123'
      });
    }

    // ✅ Usar cache con manejo de errores
    const data = await getOrSetCache(
      ITEM_CACHE_KEY(id), 
      async () => {
        console.log(`🔍 Buscando testimonio ID: ${id} en base de datos...`);
        
        const testimonio = await prisma.testimonios.findUnique({
          where: { id },
          select: {
            id: true,
            nombre: true,
            mensaje: true,
            reputacion: true,
            iglesia: true,
            deleted: true,
            createdDate: true,
            modifiedDate: true,
            createdById: true,
            modifiedById: true,
            // Campos de auditoría si son necesarios
          }
        });

        // ✅ Verificar existencia y estado
        if (!testimonio) {
          console.warn(`❌ Testimonio ID ${id} no encontrado`);
          throw new Error('NOT_FOUND');
        }

        if (testimonio.deleted) {
          console.warn(`❌ Testimonio ID ${id} está eliminado`);
          throw new Error('DELETED');
        }

        console.log(`✅ Testimonio ID ${id} encontrado: ${testimonio.nombre}`);
        
        return {
          id: testimonio.id,
          nombre: testimonio.nombre,
          mensaje: testimonio.mensaje,
          reputacion: testimonio.reputacion,
          iglesia: testimonio.iglesia,
          createdDate: testimonio.createdDate,
          modifiedDate: testimonio.modifiedDate,
          // Podemos agregar campos calculados si es necesario
          tieneModificaciones: testimonio.modifiedDate !== null,
          antiguedad: Math.floor(
            (new Date().getTime() - new Date(testimonio.createdDate).getTime()) / 
            (1000 * 60 * 60 * 24)
          ) // Días desde creación
        };
      }, 
      CACHE_TTL
    );

    // ✅ Respuesta exitosa con metadata
    return sendSuccess({
      Data: data,
      Total: 1 // Siempre 1 para un item individual
    }, `Testimonio "${data.nombre}" obtenido exitosamente`);

  } catch (error) {
    // ✅ Manejo específico de diferentes tipos de error
    if (error instanceof Error) {
      switch (error.message) {
        case 'NOT_FOUND':
          return sendNotFound(`No se encontró el testimonio con ID ${context.params.id}`, {
            suggestion: "Verifica que el ID sea correcto o que el testimonio exista"
          });
        
        case 'DELETED':
          return sendNotFound(`El testimonio con ID ${context.params.id} fue eliminado`, {
            suggestion: "Los testimonios eliminados no están disponibles"
          });
      }
    }

    console.error('[GET_TESTIMONIO_BY_ID_ERROR] ID:', context.params.id, error);
    
    return sendServerError(
      `Error al obtener el testimonio con ID ${context.params.id}`, 
      error
    );
  }
}