import { auth } from "@/src/lib/auth";
import { sendEmail } from "@/src/lib/mailer";
import prisma from "@/src/lib/prisma";
import { passwordUpdatedTemplate, passwordUpdatedText } from "@/src/utils/email-templates";
import { NextResponse } from "next/server";

const logoUrl = process.env.NEXT_PUBLIC_APP_URL_LOGO;

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    console.log("📧 Reset password request recibida:", {
      token: token ? "✅ Presente" : "❌ Faltante",
      newPassword: newPassword ? "✅ Presente" : "❌ Faltante"
    });

    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Token y nueva contraseña son requeridos" },
        { status: 400 }
      );
    }

    let result;

    try {
      // Opción 1: Token en el body
      result = await auth.api.resetPassword({
        body: {
          newPassword: newPassword,
          token: token,
        },
      });
      console.log("✅ Reset password con token en body:", result);
    } catch (error1: any) {
      console.log("❌ Error con token en body:", error1.message);

      try {
        // Opción 2: Token como query parameter
        result = await auth.api.resetPassword({
          body: {
            newPassword: newPassword,
          },
          query: {
            token: token,
          },
        });
        console.log("✅ Reset password con token en query:", result);
      } catch (error2: any) {
        console.log("❌ Error con token en query:", error2.message);
        throw new Error(`No se pudo resetear la contraseña: ${error2.message}`);
      }
    }

    // Verificar el resultado
    if (result && result.status === true) {
      console.log("🎉 Reset password exitoso, enviando email de confirmación...");

      try {
        // Método alternativo: Buscar usuario por el token de reset
        // Better Auth almacena los tokens en la tabla verification
        const verification = await prisma.verification.findFirst({
          where: {
            value: token,
            expiresAt: { gt: new Date() }
          },
          select: {
            userId: true
          }
        });

        let userEmail = null;
        let userName = "Usuario JMV";

        if (verification?.userId) {
          // Buscar usuario por ID
          const user = await prisma.user.findUnique({
            where: { id: verification.userId },
            select: { email: true, firstName: true, name: true, userName: true }
          });
          
          if (user) {
            userEmail = user.email;
            userName = user.firstName || user.name || user.userName || userName;
            console.log("✅ Usuario encontrado por verification:", { email: userEmail, name: userName });
          }
        }

        // Si no encontramos por verification, intentar método alternativo
        if (!userEmail) {
          console.log("🔍 Buscando usuario por método alternativo...");
          
          // Buscar en los logs recientes de reset password
          // O buscar usuarios que hayan solicitado reset recientemente
          const recentUser = await prisma.user.findFirst({
            where: {
              // Aquí podrías agregar alguna condición si tienes un campo que indique
              // que el usuario solicitó reset recientemente
            },
            orderBy: {
              updatedAt: 'desc'
            },
            select: { email: true, firstName: true, name: true, userName: true }
          });
          
          if (recentUser?.email) {
            userEmail = recentUser.email;
            userName = recentUser.firstName || recentUser.name || recentUser.userName || userName;
            console.log("✅ Usuario encontrado por método alternativo:", { email: userEmail, name: userName });
          }
        }

        if (userEmail) {
          const html = passwordUpdatedTemplate({
            userName: userName,
            appName: "JMV República Dominicana",
            logoUrl,
            supportEmail: "soporte@jmv.org",
          });

          const emailResult = await sendEmail({
            to: userEmail,
            subject: "Contraseña actualizada - JMV",
            html,
            text: passwordUpdatedText({ appName: "JMV República Dominicana" }),
          });

          console.log("✅ Email de confirmación enviado exitosamente a:", userEmail);
          console.log("📨 Resultado del envío:", emailResult);
        } else {
          console.error("❌ No se pudo determinar a qué usuario enviar el email de confirmación");
          console.log("💡 Sugerencia: Revisa la tabla verification en la base de datos");
        }
      } catch (emailError) {
        console.error("❌ Error enviando email de confirmación:", emailError);
        // No fallar la operación principal por error de email
      }

      return NextResponse.json({
        success: true,
        message: "Contraseña restablecida exitosamente"
      });
    } else {
      console.log("❌ Reset password falló:", result);
      return NextResponse.json(
        {
          success: false,
          message: "Error al restablecer la contraseña"
        },
        { status: 400 }
      );
    }

  } catch (error: any) {
    console.error("💥 Reset password API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error interno del servidor"
      },
      { status: 500 }
    );
  }
}