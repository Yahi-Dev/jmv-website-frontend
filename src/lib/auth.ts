import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./prisma";
import {
  resetPasswordTemplate,
  resetPasswordText,
  passwordUpdatedTemplate,
  passwordUpdatedText
} from "../utils/email-templates";
import { sendEmail } from "./mailer";

const logoUrl = process.env.NEXT_PUBLIC_APP_URL_LOGO;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXTAUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  user: {
    additionalFields: {
      userName: {
        type: "string",
        input: true,
        required: true
      },
      firstName: {
        type: "string",
        input: true
      },
      lastName: {
        type: "string",
        input: true
      },
      isActive: {
        type: "boolean",
        input: false,
        defaultValue: true
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    allowSignUp: true,

    sendResetPassword: async ({ user, url }) => {
      console.log("📧 Enviando email de reset password a:", user.email);
      
      try {
        const html = resetPasswordTemplate({
          url,
          userName: (user as any)?.firstName || user?.name || "Usuario JMV",
          appName: "JMV República Dominicana",
          logoUrl: logoUrl,
          supportEmail: "soporte@jmv.org",
        });

        const emailResult = await sendEmail({
          to: user.email,
          subject: "Restablece tu contraseña - JMV",
          html,
          text: resetPasswordText({ url, appName: "JMV República Dominicana" }),
        });

        console.log("✅ Email de reset password enviado:", emailResult);
      } catch (error) {
        console.error("❌ Error enviando email de reset password:", error);
        throw error; // Relanzar para que Better Auth maneje el error
      }
    },

    resetPassword: {
      expiresIn: 60 * 60,
      onSuccess: async (user: any) => {
        console.log("🔄 Ejecutando onSuccess para reset password");
        console.log("📋 Datos del usuario recibidos:", {
          id: user?.id,
          email: user?.email,
          name: user?.name,
          firstName: user?.firstName
        });

        try {
          let userEmail = user?.email;
          let userName = user?.firstName || user?.name;

          // Si no tenemos email, buscar en la base de datos
          if (!userEmail && user?.id) {
            console.log("🔍 Buscando usuario en BD con ID:", user.id);
            const dbUser = await prisma.user.findUnique({
              where: { id: user.id },
              select: { email: true, firstName: true, name: true },
            });
            
            if (dbUser) {
              userEmail = dbUser.email;
              userName = dbUser.firstName || dbUser.name || userName;
              console.log("✅ Usuario encontrado en BD:", { email: userEmail, name: userName });
            } else {
              console.warn("⚠️ Usuario no encontrado en BD con ID:", user.id);
            }
          }

          if (!userEmail) {
            console.error("❌ No se pudo obtener el email del usuario");
            return;
          }

          console.log("📧 Preparando email de confirmación para:", userEmail);

          const html = passwordUpdatedTemplate({
            userName: userName || "Usuario JMV",
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

        } catch (err) {
          console.error("💥 Error crítico en onSuccess:", err);
          // No relanzar el error para no interrumpir el flujo de reset
        }
      },
    },
  },

  plugins: [nextCookies()],
});