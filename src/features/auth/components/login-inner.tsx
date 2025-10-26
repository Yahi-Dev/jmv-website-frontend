// src/features/auth/components/login-inner.tsx
"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent } from "@/src/components/ui/card";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import Link from "next/link";
import { authClient } from "@/src/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";
import { useRateLimit } from "@/src/hooks/use-rate-limit";
import { Alert, AlertDescription } from "@/src/components/ui/alert";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SignInError = { status?: number; message?: string };
type SignInResponse = { error?: SignInError | null };

export function LoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { rateLimit, checkRateLimit } = useRateLimit();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ CORREGIDO: Verificar rate limit solo una vez al cargar
  useEffect(() => {
    const initializeRateLimit = async () => {
      await checkRateLimit();
    };
    initializeRateLimit();
  }, []); // ✅ Solo al montar el componente

  useEffect(() => {
    if (searchParams.get("reset") === "success") {
      toast.success("Contraseña restablecida exitosamente");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // ✅ CORREGIDO: Solo verificar estado actual (no incrementar)
    const currentRateLimit = await checkRateLimit();
    if (currentRateLimit?.isBlocked) {
      setError(`Demasiados intentos fallidos. Intenta nuevamente en ${currentRateLimit.retryAfter} segundos.`);
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { error: signInError } = (await authClient.signIn.email({
        email,
        password,
        rememberMe,
        callbackURL: "/",
      })) as SignInResponse;

      if (signInError) {
        // ✅ El middleware ya incrementó el contador automáticamente
        // Solo actualizamos la UI
        await checkRateLimit();
        
        setError(
          signInError.status === 401
            ? "Credenciales inválidas. Por favor, verifica tu email y contraseña."
            : signInError.message ?? "Ocurrió un error al iniciar sesión"
        );
        setProcessing(false);
        return;
      }

      // ✅ LOGIN EXITOSO
      router.push("/");
    } catch {
      setError("Ocurrió un error inesperado");
      setProcessing(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Mostrar advertencia de rate limit
  const showRateLimitWarning = rateLimit && rateLimit.remaining <= 3 && !rateLimit.isBlocked;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="relative flex items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-5xl overflow-hidden border-0 bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-xl">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2">
              {/* Columna Izquierda - Formulario */}
              <div className="relative p-10 bg-gradient-to-br from-white via-card to-background lg:p-12">
                <div className="mb-10">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900">INICIAR SESIÓN</h1>
                  <div className="mt-3 h-1.5 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  <p className="mt-4 text-muted-foreground">Bienvenido de nuevo. Por favor ingresa a tu cuenta.</p>
                </div>

                {/* Alerta de Rate Limit */}
                {rateLimit?.isBlocked && (
                  <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <AlertDescription className="text-red-700">
                      IP temporalmente bloqueada por demasiados intentos fallidos. 
                      Intenta nuevamente en {rateLimit.retryAfter} segundos.
                    </AlertDescription>
                  </Alert>
                )}

                {showRateLimitWarning && (
                  <Alert className="mb-6 border-amber-200 bg-amber-50">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <AlertDescription className="text-amber-700">
                      Te quedan {rateLimit.remaining} intentos. Después tu IP será bloqueada por 1 hora.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-6">
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
                          disabled={processing || rateLimit?.isBlocked}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                          Contraseña
                        </Label>
                        <Link
                          href="/forgot-password"
                          className="text-sm font-medium transition-colors duration-200 text-primary hover:text-secondary hover:underline"
                        >
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                          <Lock size={20} />
                        </div>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          autoComplete="current-password"
                          value={password}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                          placeholder="Ingresa tu contraseña"
                          className="h-12 pl-12 pr-12 text-gray-900 transition-all duration-200 bg-white border-2 border-gray-200 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                          disabled={processing || rateLimit?.isBlocked}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors duration-200 hover:text-gray-600"
                          disabled={processing || rateLimit?.isBlocked}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    {error && !rateLimit?.isBlocked && (
                      <div className="p-4 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
                        {error}
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(v) => setRememberMe(v === true)}
                        className="border-2 border-gray-300 data-[state=checked]:border-primary data-[state=checked]:bg-primary transition-all duration-200"
                        disabled={processing || rateLimit?.isBlocked}
                      />
                      <Label htmlFor="remember" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Recordarme por 30 días
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      disabled={processing || rateLimit?.isBlocked}
                      className="w-full h-12 font-bold tracking-wider text-white uppercase transition-all duration-200 shadow-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary hover:shadow-xl focus:ring-4 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                    >
                      {processing ? (
                        <ArrowRight className="w-5 h-5 mr-2 animate-pulse" />
                      ) : (
                        <ArrowRight className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:translate-x-1" />
                      )}
                      {rateLimit?.isBlocked ? 'IP Bloqueada' : 'Iniciar Sesión'}
                    </Button>

                    {/* Información de rate limit */}
                    {rateLimit && !rateLimit.isBlocked && (
                      <div className="text-xs text-center text-gray-500">
                        Intentos: {rateLimit.attempts}/10 - Restantes: {rateLimit.remaining}
                      </div>
                    )}
                  </div>
                </form>
              </div>

              {/* Columna Derecha - Información JMV */}
              <div className="relative p-10 bg-gradient-to-br from-blue-50 to-blue-100/80 lg:p-12">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex justify-center mb-8">
                    <div className="p-8 transition-all duration-300 transform bg-white shadow-2xl rounded-3xl">
                      <div className="relative w-50 h-50">
                        <Image
                          src="/logo/JMV-Logo.png"
                          alt="JMV Logo"
                          fill
                          className="object-contain drop-shadow-[0_8px_30px_rgba(59,130,246,0.4)]"
                          priority
                          sizes="170px"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 text-center">
                    <div className="space-y-3">
                      <h2 className="text-3xl font-bold text-gray-900">Juventud Mariana Vicenciana</h2>
                      <p className="max-w-md text-lg text-gray-600">
                        Formando jóvenes comprometidos con los valores vicencianos
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute w-16 h-1 -translate-x-1/2 rounded-full bottom-6 left-1/2 bg-gradient-to-r from-blue-400 to-blue-500 opacity-60" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}