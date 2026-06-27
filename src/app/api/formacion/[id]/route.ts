import { NextRequest } from 'next/server';
import prisma from '@/src/lib/prisma';
import { sendSuccess, sendBadRequest, sendNotFound, sendServerError } from '@/src/utils/httpResponse';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  try {
    const id = Number(idParam);

    if (Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
      return sendBadRequest('ID de formación inválido', {
        idProvided: idParam,
        expected: 'Número entero positivo',
        example: '/api/formacion/123',
      });
    }

    const formacion = await prisma.formacion.findUnique({
      where: { id },
    });

    if (!formacion) {
      return sendNotFound(`No se encontró la formación con ID ${idParam}`);
    }

    if (formacion.deleted) {
      return sendNotFound(`La formación con ID ${idParam} fue eliminada`);
    }

    return sendSuccess(
      { Data: formacion, Total: 1 },
      `Formación "${formacion.titulo}" obtenida exitosamente`
    );
  } catch (error) {
    console.error('[GET_FORMACION_BY_ID_ERROR]', error);
    return sendServerError(`Error al obtener la formación con ID ${idParam}`, error);
  }
}
