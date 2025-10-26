// lib/auth.ts
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
    provider: "mysql"
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
    },

    // AÑADE ESTA CONFIGURACIÓN PARA EL RESET DE PASSWORD
    resetPassword: {
      // Tiempo de expiración del token (opcional, por defecto es 1 hora)
      expiresIn: 60 * 60, // 1 hora en segundos
      
      // Callback después de reset exitoso (opcional)
      onSuccess: async (user: any) => {
        // Enviar email de confirmación
        const html = passwordUpdatedTemplate({
          userName: user?.firstName || "Usuario JMV",
          appName: "JMV República Dominicana",
          logoUrl: logoUrl,
          supportEmail: "soporte@jmv.org",
        });

        await sendEmail({
          to: user.email,
          subject: "Contraseña actualizada - JMV",
          html,
          text: passwordUpdatedText({ appName: "JMV República Dominicana" }),
        });
      },
    },
  },

  plugins: [nextCookies()],
});