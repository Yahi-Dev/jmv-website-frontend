import { NextRequest } from 'next/server';
import prisma from '@/src/lib/prisma';
import { getOrSetCache } from '@/src/lib/redis';
import { sendServerError, sendSuccess } from '@/src/utils/httpResponse';
import { Prisma } from '@prisma/client';


const CACHE_KEY = "testimonios-cache";


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = (searchParams.get("search") ?? "").trim()

    const where: Prisma.TestimoniosWhereInput = {
      deleted: false,
      ...(search
        ? {
            OR: [
              { nombre: { contains: search } },
            ],
          }
        : {}),
    }

    const testimonios = await prisma.testimonios.findMany({
      where,
      orderBy: { createdDate: "desc" },
    })

    const data = await getOrSetCache(CACHE_KEY, async () => {
      return testimonios.map((c) => ({ ...c }))
    })

    return sendSuccess({
      Data: data ?? [],
      Total: data?.length ?? 0
    }, "Testimonios obtenidos exitosamente")

  } catch (error: unknown) {
    console.error("Error fetching testimonios:", error)
    
    return sendServerError("Error al obtener los testimonios", error)
  }
}




// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const parsed = carruselCreateSchema.safeParse(body);

//     if (!parsed.success) {
//       const errorDetails = parsed.error.flatten();
//       console.error("Validation error:", errorDetails);
//       return badRequest('Datos inválidos', {
//         ...errorDetails,
//         message: "Por favor verifica los datos ingresados"
//       });
//     }

//     const exists = await prisma.carrusel.findFirst({ where: { name: parsed.data.name } });
//     if (exists) {
//       return badRequest('El nombre de carrusel ya existe');
//     }

//     const session = await auth.api.getSession({ headers: req.headers });

//     const user = {
//       name: session?.user?.name ?? "",
//       email: session?.user?.email ?? "",
//       avatar: session?.user?.image ?? "",
//     };

//     const data = parsed.data;
//     const created = await prisma.carrusel.create({
//       data: {
//         name: data.name ?? "",
//         location: data.location ?? "",
//         link: data.link ?? "",
//         position: data.position ?? 0,
//         is_active: data.is_active ?? true,
//         created_by: user.email,
//         created_at: new Date(),
//         updated_by: user.email,
//       }
//     });

//     await redis.del(CACHE_KEY);

//     return json({
//       success: true,
//       message: "Carrusel creado exitosamente",
//       data: created
//     }, { status: 201 });
//   } catch (error) {
//     console.error("Server error:", error);
//     return serverError(error instanceof Error ? error : new Error("Error desconocido"));
//   }
// }




// export async function PUT(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = Number(searchParams.get('id'));
    
//     if (!Number.isInteger(id) || id <= 0) return badRequest('Id inválido');

//     const body = await request.json();
//     const parsed = carruselUpdateSchema.safeParse(body);

//     if (!parsed.success) {
//       const errorDetails = parsed.error.flatten();
//       console.error("Validation error:", errorDetails);
//       return badRequest('Datos inválidos', {
//         ...errorDetails,
//         message: "Por favor verifica los datos ingresados"
//       });
//     }

//     const exists = await prisma.carrusel.findFirst(
//       { where: 
//         { name: parsed.data.name,
//           id: { not: id }
//         } 
//       });
//     if (exists) {
//       return badRequest('El nombre de carrusel ya existe');
//     }


//     const session = await auth.api.getSession({ headers: request.headers });

//     const user = {
//       name: session?.user?.name ?? "",
//       email: session?.user?.email ?? "",
//       avatar: session?.user?.image ?? "",
//     };

//     const data = parsed.data;
//     const updated = await prisma.carrusel.update({
//       where: { id },
//       data: {
//         ...data,
//         updated_at: new Date(),
//         updated_by: user.email,
//       }
//     });

//     await redis.del(CACHE_KEY);

//     return json({
//       success: true,
//       message: "Carrusel actualizado exitosamente",
//       data: updated
//     });
//   } catch (error) {
//     return serverError(error);
//   }
// }




// export async function DELETE(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const idParam = searchParams.get('id');
//     const id = idParam !== null ? Number(idParam) : null;
    
//     if (id === null || !Number.isInteger(id) || id <= 0) {
//       return badRequest('Id inválido');
//     }

//     const carrusel = await prisma.carrusel.findUnique({ 
//       where: { id },
//       select: {
//         id: true,
//         name: true,
//         location: true,
//         position: true,
//         is_active: true
//       }
//     });

//     if (!carrusel) {
//       return notFound('Carrusel no encontrado');
//     }

//     await prisma.carrusel.update({ where: { id }, data: { is_deleted: true } });

//     await redis.del(CACHE_KEY);

//     return json({ 
//       success: true,
//       message: `Carrusel "${carrusel.name}" eliminado correctamente` 
//     });

//   } catch (error) {
//     console.error('Error deleting carrusel:', error);
//     return serverError('Error interno del servidor al eliminar el carrusel');
//   }
// }