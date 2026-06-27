// app/api/testimonios/[id]/route.ts
import { NextRequest } from 'next/server';
import prisma from '@/src/lib/prisma';
import { sendSuccess, sendBadRequest, sendNotFound, sendServerError } from '@/src/utils/httpResponse';

/**
 * GET /api/testimonios/[id]
 * Obtiene un testimonio por ID con validación.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  try {
    const id = Number(idParam);

    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
      return sendBadRequest('ID de testimonio inválido', {
        idProvided: idParam,
        expected: 'Número entero positivo',
        example: '/api/testimonios/123',
      });
    }

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
      },
    });

    if (!testimonio) {
      return sendNotFound(`No se encontró el testimonio con ID ${idParam}`, {
        suggestion: 'Verifica que el ID sea correcto o que el testimonio exista',
      });
    }

    if (testimonio.deleted) {
      return sendNotFound(`El testimonio con ID ${idParam} fue eliminado`, {
        suggestion: 'Los testimonios eliminados no están disponibles',
      });
    }

    const data = {
      id: testimonio.id,
      nombre: testimonio.nombre,
      mensaje: testimonio.mensaje,
      reputacion: testimonio.reputacion,
      iglesia: testimonio.iglesia,
      createdDate: testimonio.createdDate,
      modifiedDate: testimonio.modifiedDate,
      tieneModificaciones: testimonio.modifiedDate !== null,
      antiguedad: Math.floor(
        (new Date().getTime() - new Date(testimonio.createdDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ),
    };

    return sendSuccess(
      { Data: data, Total: 1 },
      `Testimonio "${data.nombre}" obtenido exitosamente`
    );
  } catch (error) {
    console.error('[GET_TESTIMONIO_BY_ID_ERROR]', error);
    return sendServerError(`Error al obtener el testimonio con ID ${idParam}`, error);
  }
}
