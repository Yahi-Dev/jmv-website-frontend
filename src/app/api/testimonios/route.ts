import { NextRequest } from 'next/server';
import prisma from '@/src/lib/prisma';
import { sendBadRequest, sendCreated, sendNotFound, sendServerError, sendSuccess } from '@/src/utils/httpResponse';
import { Prisma } from '@prisma/client';
import { testimonioCreateSchema, testimonioUpdateSchema } from '@/src/features/testimonios/schema/validation';
import { auth } from '@/src/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = (searchParams.get("search") ?? "").trim()
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const where: Prisma.TestimoniosWhereInput = {
      deleted: false,
      ...(search
        ? {
            OR: [
              { nombre: { contains: search } },
              { mensaje: { contains: search } },
              { iglesia: { contains: search } },
            ],
          }
        : {}),
    }

    // Ejecutar en paralelo para mejor performance
    const [testimonios, total] = await Promise.all([
      prisma.testimonios.findMany({
        where,
        orderBy: { createdDate: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          nombre: true,
          mensaje: true,
          reputacion: true,
          iglesia: true,
          createdDate: true,
          // Solo campos necesarios
        }
      }),
      prisma.testimonios.count({ where })
    ])

    return sendSuccess({
      Data: testimonios,
      Total: total,
      Page: page
    }, "Testimonios obtenidos exitosamente")

  } catch (error: unknown) {
    console.error("Error fetching testimonios:", error)
    return sendServerError("Error al obtener los testimonios", error)
  }
}




export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = testimonioCreateSchema.safeParse(body);

    if (!parsed.success) {
      const errorDetails = parsed.error.flatten();
      console.error("Validation error:", errorDetails);
      
      // ✅ USANDO sendBadRequest CON LOS ERRORES DE VALIDACIÓN
      return sendBadRequest('Datos inválidos. Por favor verifica los datos ingresados', {
        fieldErrors: errorDetails.fieldErrors,
        formErrors: errorDetails.formErrors
      });
    }
    
    // Obtener sesión del usuario
    const session = await auth.api.getSession({ 
      headers: Object.fromEntries(req.headers) 
    });

    const user = {
      name: session?.user?.name ?? "Sistema",
      email: session?.user?.email ?? "sistema@jmv.org",
      avatar: session?.user?.image ?? "",
    };

    const data = parsed.data;
    
    // Crear el testimonio
    const created = await prisma.testimonios.create({
      data: {
        nombre: data.nombre,
        mensaje: data.mensaje,
        reputacion: data.reputacion ?? 5,
        iglesia: data.iglesia,

        createdDate: new Date(),
        createdById: user.email,
      }
    });

    // ✅ USANDO sendCreated PARA RECURSO CREADO EXITOSAMENTE
    return sendCreated({
      Data: created
    }, "Testimonio creado exitosamente");

  } catch (error) {
    console.error("Server error:", error);
    
    // ✅ USANDO sendServerError PARA ERRORES INTERNOS
    return sendServerError(
      "Error interno del servidor al crear el testimonio", 
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
    const parsed = testimonioUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return sendBadRequest('Datos inválidos', parsed.error.flatten());
    }

    const existing = await prisma.testimonios.findUnique({ where: { id } });
    if (!existing) {
      return sendNotFound('Testimonio no encontrado');
    }

    const session = await auth.api.getSession({ 
      headers: Object.fromEntries(request.headers) 
    });

    const updated = await prisma.testimonios.update({
      where: { id },
      data: {
        ...parsed.data,
        modifiedDate: new Date(),
        modifiedById: session?.user?.email ?? "sistema@jmv.org",
      }
    });

    return sendSuccess({
      Data: updated
    }, "Testimonio actualizado exitosamente");

  } catch (error) {
    console.error("Update error:", error);
    return sendServerError("Error al actualizar testimonio", error);
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

    const testimonio = await prisma.testimonios.findUnique({ 
      where: { id },
      select: {
        id: true,
        nombre: true,
        mensaje: true,
        iglesia: true,
        reputacion: true,
        deleted: true 
      }
    });

    if (!testimonio) {
      return sendNotFound(`No se encontró el testimonio con ID ${id}`);
    }

    if (testimonio.deleted) {
      return sendBadRequest('El testimonio ya fue eliminado anteriormente', {
        testimonio: {
          id: testimonio.id,
          nombre: testimonio.nombre,
          eliminadoAnteriormente: true
        },
        suggestion: "No es necesario eliminar el testimonio nuevamente"
      });
    }

    const session = await auth.api.getSession({ 
      headers: Object.fromEntries(request.headers) 
    });

    await prisma.testimonios.update({ 
      where: { id }, 
      data: { 
        deleted: true,
        deletedDate: new Date(),
        deletedById: session?.user?.email ?? "sistema@jmv.org",
      } 
    });

    return sendSuccess({
      Data: {
        id: testimonio.id,
        nombre: testimonio.nombre,
        mensaje: "Testimonio eliminado correctamente",
        eliminadoEl: new Date().toISOString()
      }
    }, `Testimonio "${testimonio.nombre}" eliminado correctamente`);

  } catch (error) {
    console.error('Error deleting testimonio:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Record to update not found')) {
        return sendNotFound('El testimonio no existe o ya fue eliminado');
      }
      
      if (error.message.includes('Foreign key constraint')) {
        return sendBadRequest(
          'No se puede eliminar el testimonio debido a referencias existentes',
          {
            suggestion: "Contacta al administrador del sistema"
          }
        );
      }
    }

    return sendServerError(
      "Error interno del servidor al eliminar el testimonio", 
      error
    );
  }
}