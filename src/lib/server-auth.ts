// src/lib/server-auth.ts
import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";
import { sendUnauthorized } from "@/src/utils/httpResponse";

export async function getServerSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    return session;
  } catch (error) {
    console.error("Error getting server session:", error);
    return null;
  }
}

export async function getServerUser() {
  const session = await getServerSession();
  if (!session?.user) return null;

  return {
    id: session.user.id ?? "",
    userName: (session.user as any).userName ?? "",
    email: session.user.email ?? "",
    firstName: (session.user as any).firstName ?? "",
    lastName: (session.user as any).lastName ?? "",
    isActive: (session.user as any).isActive ?? true,
  };
}

/**
 * Guard de autorización para rutas de mutación (solo usuarios autenticados).
 * Úsalo al INICIO de cada handler POST/PUT/DELETE de administración:
 *
 *   const guard = await requireAdmin();
 *   if (!guard.ok) return guard.response;
 *   // usa guard.email para createdById / modifiedById / deletedById
 *
 * Cierra el acceso anónimo a las mutaciones. (La asignación de roles vía
 * ADMIN_EMAILS puede añadirse aquí más adelante sin tocar las rutas.)
 */
export async function requireAdmin() {
  const session = await getServerSession();
  if (!session?.user) {
    return {
      ok: false as const,
      response: sendUnauthorized("Debes iniciar sesión para realizar esta acción"),
    };
  }
  return {
    ok: true as const,
    session,
    email: session.user.email ?? "sistema@jmv.org",
  };
}