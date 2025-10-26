"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type React from "react";
import { Lock, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { authClient } from "@/src/lib/auth-client";

type ResetPasswordResponse = {
  data?: { status: boolean } | null;
  error?: { status?: number; message?: string } | null;
};

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setProcessing(false);
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setProcessing(false);
      return;
    }

    try {
      const { data, error: respError } = await authClient.resetPassword({
        newPassword: password,
        token,
      }) as ResetPasswordResponse;

      if (data?.status === true) {
        setSuccess(true);
      }

      if (respError) {
        setError(respError.message ?? "Ocurrió un error al restablecer la contraseña");
      }
    } catch {
      setError("Ocurrió un error inesperado");
    } finally {
      setProcessing(false);
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <Card className="w-full max-w-md border-0 shadow-xl bg-white/95 backdrop-blur">
          <CardContent className="p-6 text-center">
            <p className="text-destructive">Token inválido o expirado</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <Card className="w-full max-w-md border-0 shadow-xl bg-white/95 backdrop-blur">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h2 className="mb-2 text-2xl font-bold text-primary">¡Contraseña Actualizada!</h2>
            <p className="mb-4 text-muted-foreground">
              Tu contraseña ha sido restablecida exitosamente.
            </p>
            <Button asChild>
              <a href="/login">Ir al Inicio de Sesión</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur">
            <CardHeader className="pb-8 space-y-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                  <Lock className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-primary">
                  Nueva Contraseña
                </CardTitle>
                <CardDescription className="mt-2 text-base">
                  Ingresa tu nueva contraseña
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Nueva Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-12 pl-10 border-2 focus:border-primary"
                      required
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      disabled={processing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirmar Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="h-12 pl-10 border-2 focus:border-primary"
                      required
                      value={confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
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
                      Restableciendo...
                    </>
                  ) : (
                    "Restablecer Contraseña"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}