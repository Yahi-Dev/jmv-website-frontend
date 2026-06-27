import { auth } from "@/src/lib/auth";
import { NextResponse } from "next/server";

/**
 * Restablece la contraseña a partir del token de better-auth.
 *
 * El correo de confirmación ("Contraseña actualizada") lo envía el hook
 * `resetPassword.onSuccess` de better-auth (src/lib/auth.ts), que resuelve al
 * usuario por su id. Aquí NO se intenta adivinar el destinatario: hacerlo
 * (p. ej. "el último usuario actualizado") podía notificar a la persona
 * equivocada y filtrar actividad de otras cuentas.
 */
export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Token y nueva contraseña son requeridos" },
        { status: 400 }
      );
    }

    let result;
    try {
      // Token en el body
      result = await auth.api.resetPassword({ body: { newPassword, token } });
    } catch {
      // Algunos clientes envían el token como query param
      result = await auth.api.resetPassword({ body: { newPassword }, query: { token } });
    }

    if (result && result.status === true) {
      return NextResponse.json({
        success: true,
        message: "Contraseña restablecida exitosamente",
      });
    }

    return NextResponse.json(
      { success: false, message: "Error al restablecer la contraseña" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error en reset-password:", error?.message ?? "desconocido");
    return NextResponse.json(
      { success: false, message: error?.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}
