"use client";

import { useState } from "react";
import type React from "react";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import Link from "next/link";
import { authClient } from "@/src/lib/auth-client";
import { toast } from "sonner";

type PasswordResetResponse = {
  success?: boolean;
  error?: { 
    message?: string;
    code?: string;
  } | null;
};

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const result = await authClient.forgetPassword({
        email,
        redirectTo: "/reset-password",
      }) as PasswordResetResponse;

      if (result.success) {
        // Toast de éxito - siempre se muestra aunque el email no exista (por seguridad)
        toast.success("Si el correo existe, se ha enviado un enlace de restablecimiento.", {
          description: "Revisa tu bandeja de entrada y la carpeta de spam.",
          duration: 6000,
        });
        setEmail("");
      } else if (result.error) {
        // Toast de error específico
        toast.error("Error al enviar el enlace", {
          description: result.error.message ?? "Ocurrió un error al solicitar el restablecimiento",
          duration: 5000,
        });
      }
    } catch (err: any) {
      // Toast de error genérico
      toast.error("Error inesperado", {
        description: err?.message ?? "Ocurrió un error inesperado. Intenta nuevamente.",
        duration: 5000,
      });
      console.error("Password reset error:", err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-[0_20px_60px_rgba(0,0,0,0.1)] bg-white/95 backdrop-blur-xl">
            <CardHeader className="pb-8 space-y-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Recuperar Contraseña
                </CardTitle>
                <CardDescription className="mt-2 text-base text-gray-600">
                  Te enviaremos un enlace para restablecer tu contraseña
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Correo Electrónico
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                      <Mail size={20} />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      placeholder="usuario@jmv.org"
                      className="h-12 pl-12 text-gray-900 transition-all duration-200 bg-white border-2 border-gray-200 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                      disabled={processing}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full h-12 font-bold tracking-wider text-white uppercase transition-all duration-200 shadow-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary hover:shadow-xl focus:ring-4 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Enlace de Restablecimiento"
                  )}
                </Button>
              </form>

              <div className="text-center">
                <Link 
                  href="/login" 
                  className="inline-flex items-center text-sm font-medium transition-colors duration-200 text-primary hover:text-secondary hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 hover:-translate-x-1" />
                  Volver al inicio de sesión
                </Link>
              </div>

              <div className="p-4 mt-4 text-sm text-blue-700 border border-blue-200 rounded-lg bg-blue-50">
                <p className="text-center">
                  <strong>Importante:</strong> Por seguridad, siempre mostraremos el mismo mensaje sin revelar si el correo existe o no.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}