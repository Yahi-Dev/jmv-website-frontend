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

type PasswordResetResponse = {
  data?: { status: boolean } | null;
  error?: { status?: number; message?: string } | null;
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { data, error: respError } = await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      }) as PasswordResetResponse;

      if (data?.status === true) {
        setSuccessMessage("Se ha enviado un enlace de restablecimiento a tu correo electrónico.");
        setEmail("");
      }

      if (respError) {
        setError(respError.message ?? "Ocurrió un error al solicitar el restablecimiento");
      }
    } catch {
      setError("Ocurrió un error inesperado");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur">
            <CardHeader className="pb-8 space-y-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-primary">
                  Recuperar Contraseña
                </CardTitle>
                <CardDescription className="mt-2 text-base">
                  Te enviaremos un enlace para restablecer tu contraseña
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {successMessage && (
                <div className="p-4 text-sm text-green-600 border border-green-200 rounded-md bg-green-50">
                  {successMessage}
                </div>
              )}

              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Correo Electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="h-12 pl-10 border-2 focus:border-primary"
                      required
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      disabled={processing}
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 text-sm border rounded-md text-destructive bg-destructive/10 border-destructive/20">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold"
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Volver al inicio de sesión
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}