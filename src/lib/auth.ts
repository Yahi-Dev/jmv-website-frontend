// lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./prisma";
import { resetPasswordTemplate, resetPasswordText } from "../utils/email-templates";
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
      // Tu lógica de envío de email aquí
      const html = resetPasswordTemplate({
        url,
        userName: user?.name || "Usuario JMV",
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
  },

  plugins: [nextCookies()],
});