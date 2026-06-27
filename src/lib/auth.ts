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
    // Registro público deshabilitado: los administradores se crean por seed/invitación.
    // (Evita que cualquiera se auto-registre y obtenga una sesión válida.)
    allowSignUp: false,

    sendResetPassword: async ({ user, url }) => {
      try {
        const html = resetPasswordTemplate({
          url,
          userName: (user as any)?.firstName || user?.name || "Usuario JMV",
          appName: "JMV República Dominicana",
          logoUrl: logoUrl,
          supportEmail: "soporte@jmv.org",
        });

        await sendEmail({
          to: user.email,
          subject: "Restablece tu contraseña - JMV",
          html,
          text: resetPasswordText({ url, appName: "JMV República Dominicana" }),
        });
      } catch (error) {
        console.error("Error enviando email de reset password");
        throw error; // Relanzar para que Better Auth maneje el error
      }
    },

    resetPassword: {
      expiresIn: 60 * 60,
      onSuccess: async (user: any) => {
        try {
          let userEmail = user?.email;
          let userName = user?.firstName || user?.name;

          // Si no tenemos email, resolver por id (sin heurísticas que adivinen).
          if (!userEmail && user?.id) {
            const dbUser = await prisma.user.findUnique({
              where: { id: user.id },
              select: { email: true, firstName: true, name: true },
            });
            if (dbUser) {
              userEmail = dbUser.email;
              userName = dbUser.firstName || dbUser.name || userName;
            }
          }

          if (!userEmail) return;

          const html = passwordUpdatedTemplate({
            userName: userName || "Usuario JMV",
            appName: "JMV República Dominicana",
            logoUrl,
            supportEmail: "soporte@jmv.org",
          });

          await sendEmail({
            to: userEmail,
            subject: "Contraseña actualizada - JMV",
            html,
            text: passwordUpdatedText({ appName: "JMV República Dominicana" }),
          });
        } catch {
          // No interrumpir el flujo de reset por un fallo de email.
        }
      },
    },
  },

  plugins: [nextCookies()],
});