import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./prisma";
import { sendEmail } from "./mailer";
import { 
  passwordUpdatedTemplate, 
  passwordUpdatedText, 
  resetPasswordTemplate, 
  resetPasswordText 
} from "@/src/utils/email-templates";

const logoUrl = process.env.NEXT_PUBLIC_APP_URL_LOGO; 

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "mysql" }),
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
      createdDate: { 
        type: "date", 
        input: false, 
        defaultValue: "now" 
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    allowSignUp: false,
    password: {
      minLength: 6,
      maxLength: 128,
    },

    sendResetPassword: async ({ user, url }) => {
      const html = resetPasswordTemplate({
        url,
        userName: user?.firstName || user.userName || "Usuario",
        appName: "JMV República Dominicana",
        logoUrl: logoUrl,
        supportEmail: "soporte@jmv.com",
      });

      await sendEmail({
        to: user.email,
        subject: "Restablece tu contraseña - JMV",
        html,
        text: resetPasswordText({ url, appName: "JMV República Dominicana" }),
      });
    },
    
    onPasswordReset: async ({ user }) => {
      const html = passwordUpdatedTemplate({
        userName: user?.firstName || user.userName || "Usuario",
        appName: "JMV República Dominicana",
        logoUrl: logoUrl,
        supportEmail: "soporte@jmv.com",
      });

      await sendEmail({
        to: user.email,
        subject: "Contraseña actualizada - JMV",
        html,
        text: passwordUpdatedText({ appName: "JMV República Dominicana" }),
      });
    },
  },
  
  plugins: [nextCookies()], // ← CRÍTICO: Añadir este plugin
});