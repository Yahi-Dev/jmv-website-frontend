import { NextRequest } from 'next/server';
import prisma from '@/src/lib/prisma';
import { sendBadRequest, sendCreated, sendNotFound, sendServerError, sendSuccess } from '@/src/utils/httpResponse';
import { Prisma } from '@prisma/client';
import { formacionCreateSchema, formacionUpdateSchema } from '@/src/features/formacion/schema/validation';
import { auth } from '@/src/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = (searchParams.get("search") ?? "").trim()
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const where: Prisma.FormacionWhereInput = {
      deleted: false,
      ...(search
        ? {
            OR: [
              { titulo: { contains: search, mode: 'insensitive' } },
              { descripcion: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    }

    const [formaciones, total] = await Promise.all([
      prisma.formacion.findMany({
        where,
        orderBy: { createdDate: "desc" },
        skip,
        take: limit,
      }),
      prisma.formacion.count({ where })
    ])

    return sendSuccess({
      Data: formaciones,
      Total: total,
      Page: page
    }, "Formaciones obtenidas exitosamente")

  } catch (error: unknown) {
    console.error("Error fetching formaciones:", error)
    return sendServerError("Error al obtener las formaciones", error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = formacionCreateSchema.safeParse(body);

    if (!parsed.success) {
      const errorDetails = parsed.error.flatten();
      console.error("Validation error:", errorDetails);
      
      return sendBadRequest('Datos inválidos. Por favor verifica los datos ingresados', {
        fieldErrors: errorDetails.fieldErrors,
        formErrors: errorDetails.formErrors
      });
    }
    
    const session = await auth.api.getSession({ 
      headers: Object.fromEntries(req.headers) 
    });

    const user = {
      name: session?.user?.name ?? "Sistema",
      email: session?.user?.email ?? "sistema@jmv.org",
    };

    const data = parsed.data;
    
    const created = await prisma.formacion.create({
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        modulo: data.modulo,
        enlace: data.enlace,
        ruta: data.ruta,
        createdDate: new Date(),
        createdById: user.email,
      }
    });

    return sendCreated({
      Data: created
    }, "Formación creada exitosamente");

  } catch (error) {
    console.error("Server error:", error);
    return sendServerError(
      "Error interno del servidor al crear la formación", 
      error instanceof Error ? error : new Error("Error desconocido")
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));
    
    if (!Number.isInteger(id) || id <= 0) {
      return sendBadRequest('ID inválido');
    }

    const body = await request.json();
    const parsed = formacionUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return sendBadRequest('Datos inválidos', parsed.error.flatten());
    }

    const existing = await prisma.formacion.findUnique({ where: { id } });
    if (!existing) {
      return sendNotFound('Formación no encontrada');
    }

    const session = await auth.api.getSession({ 
      headers: Object.fromEntries(request.headers) 
    });

    const updated = await prisma.formacion.update({
      where: { id },
      data: {
        ...parsed.data,
        modifiedDate: new Date(),
        modifiedById: session?.user?.email ?? "sistema@jmv.org",
      }
    });

    return sendSuccess({
      Data: updated
    }, "Formación actualizada exitosamente");

  } catch (error) {
    console.error("Update error:", error);
    return sendServerError("Error al actualizar formación", error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    const id = idParam !== null ? Number(idParam) : null;
    
    if (id === null || !Number.isInteger(id) || id <= 0) {
      return sendBadRequest('ID inválido. Debe proporcionar un ID numérico válido');
    }

    const formacion = await prisma.formacion.findUnique({ 
      where: { id },
    });

    if (!formacion) {
      return sendNotFound(`No se encontró la formación con ID ${id}`);
    }

    if (formacion.deleted) {
      return sendBadRequest('La formación ya fue eliminada anteriormente');
    }

    const session = await auth.api.getSession({ 
      headers: Object.fromEntries(request.headers) 
    });

    await prisma.formacion.update({ 
      where: { id }, 
      data: { 
        deleted: true,
        deletedDate: new Date(),
        deletedById: session?.user?.email ?? "sistema@jmv.org",
      } 
    });

    return sendSuccess({
      Data: {
        id: formacion.id,
        titulo: formacion.titulo,
        mensaje: "Formación eliminada correctamente",
        eliminadoEl: new Date().toISOString()
      }
    }, `Formación "${formacion.titulo}" eliminada correctamente`);

  } catch (error) {
    console.error('Error deleting formación:', error);
    return sendServerError("Error interno del servidor al eliminar la formación", error);
  }
}