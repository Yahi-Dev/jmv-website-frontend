"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type React from "react";
import { Lock, CheckCircle, Loader2, Shield, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import Link from "next/link";
import { authClient } from "@/src/lib/auth-client";

type ResetPasswordResponse = {
  success?: boolean;
  error?: { 
    message?: string;
    code?: string;
  } | null;
};

// Función para evaluar la seguridad de la contraseña
const evaluatePasswordStrength = (password: string) => {
  if (!password) return { score: 0, label: "Vacía", color: "bg-gray-200" };

  let score = 0;
  const requirements = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  // Calcular puntuación
  if (requirements.length) score += 1;
  if (requirements.lowercase) score += 1;
  if (requirements.uppercase) score += 1;
  if (requirements.number) score += 1;
  if (requirements.symbol) score += 1;

  // Determinar nivel de seguridad
  if (score === 0) return { score, label: "Vacía", color: "bg-gray-200" };
  if (score <= 2) return { score, label: "Débil", color: "bg-red-500" };
  if (score <= 3) return { score, label: "Regular", color: "bg-orange-500" };
  if (score <= 4) return { score, label: "Buena", color: "bg-yellow-500" };
  return { score, label: "Fuerte", color: "bg-green-500" };
};

// Componente de métrica de seguridad
const PasswordStrengthMeter = ({ password }: { password: string }) => {
  const strength = evaluatePasswordStrength(password);
  const width = `${(strength.score / 5) * 100}%`;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-gray-600">Seguridad de la contraseña:</span>
        <span className={`font-semibold ${
          strength.label === "Fuerte" ? "text-green-600" :
          strength.label === "Buena" ? "text-yellow-600" :
          strength.label === "Regular" ? "text-orange-600" :
          strength.label === "Débil" ? "text-red-600" : "text-gray-600"
        }`}>
          {strength.label}
        </span>
      </div>
      <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
        <div 
          className={`h-full transition-all duration-300 ${strength.color}`}
          style={{ width }}
        />
      </div>
      {password && (
        <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
          <div className={`flex items-center ${password.length >= 8 ? "text-green-600" : ""}`}>
            • {password.length >= 8 ? "✓" : "○"} 8+ caracteres
          </div>
          <div className={`flex items-center ${/[a-z]/.test(password) ? "text-green-600" : ""}`}>
            • {/[a-z]/.test(password) ? "✓" : "○"} Minúscula
          </div>
          <div className={`flex items-center ${/[A-Z]/.test(password) ? "text-green-600" : ""}`}>
            • {/[A-Z]/.test(password) ? "✓" : "○"} Mayúscula
          </div>
          <div className={`flex items-center ${/[0-9]/.test(password) ? "text-green-600" : ""}`}>
            • {/[0-9]/.test(password) ? "✓" : "○"} Número
          </div>
          <div className={`flex items-center ${/[^A-Za-z0-9]/.test(password) ? "text-green-600" : ""}`}>
            • {/[^A-Za-z0-9]/.test(password) ? "✓" : "○"} Símbolo
          </div>
        </div>
      )}
    </div>
  );
};

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      const result = await authClient.resetPassword({
        newPassword: password,
        token,
      }) as ResetPasswordResponse;

      if (result.success) {
        setSuccess(true);
      } else if (result.error) {
        setError(result.error.message ?? "Ocurrió un error al restablecer la contraseña");
      }
    } catch (err: any) {
      console.error("Reset password error:", err);
      setError(err?.message ?? "Ocurrió un error inesperado");
    } finally {
      setProcessing(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="flex items-center justify-center min-h-screen p-6">
          <div className="w-full max-w-md">
            <Card className="border-0 shadow-[0_20px_60px_rgba(0,0,0,0.1)] bg-white/95 backdrop-blur-xl">
              <CardContent className="p-6 text-center">
                <div className="p-4 mb-6 border border-red-200 shadow-lg rounded-xl bg-gradient-to-r from-red-50 to-orange-50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                      <Shield className="w-4 h-4 text-red-600" />
                    </div>
                    <p className="text-sm font-medium text-red-800">Token inválido o expirado</p>
                  </div>
                </div>
                <Link 
                  href="/forgot-password" 
                  className="inline-flex items-center text-sm font-medium transition-colors duration-200 text-primary hover:text-secondary hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 hover:-translate-x-1" />
                  Solicitar nuevo enlace
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="flex items-center justify-center min-h-screen p-6">
          <div className="w-full max-w-md">
            <Card className="border-0 shadow-[0_20px_60px_rgba(0,0,0,0.1)] bg-white/95 backdrop-blur-xl">
              <CardHeader className="pb-8 space-y-4 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-emerald-100">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    ¡Contraseña Actualizada!
                  </CardTitle>
                  <CardDescription className="mt-2 text-base text-gray-600">
                    Tu contraseña ha sido restablecida exitosamente.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 text-center">
                <div className="p-4 border shadow-lg rounded-xl border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100">
                      <Shield className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-sm font-medium text-emerald-800">
                      Ahora puedes iniciar sesión con tu nueva contraseña
                    </p>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full h-12 font-bold tracking-wider text-white uppercase transition-all duration-200 shadow-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary hover:shadow-xl focus:ring-4 focus:ring-primary/30 transform hover:-translate-y-0.5"
                >
                  <Link href="/login">
                    Ir al Inicio de Sesión
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-[0_20px_60px_rgba(0,0,0,0.1)] bg-white/95 backdrop-blur-xl">
            <CardHeader className="pb-8 space-y-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary">
                  <Lock className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Nueva Contraseña
                </CardTitle>
                <CardDescription className="mt-2 text-base text-gray-600">
                  Ingresa tu nueva contraseña
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      Nueva Contraseña
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                        <Lock size={20} />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="new-password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="h-12 pl-12 pr-12 text-gray-900 transition-all duration-200 bg-white border-2 border-gray-200 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                        disabled={processing}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors duration-200 hover:text-gray-600"
                        disabled={processing}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Métrica de seguridad */}
                  <PasswordStrengthMeter password={password} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                    Confirmar Contraseña
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                      <Lock size={20} />
                    </div>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-12 pl-12 pr-12 text-gray-900 transition-all duration-200 bg-white border-2 border-gray-200 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                      disabled={processing}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors duration-200 hover:text-gray-600"
                      disabled={processing}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-4 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={processing || password.length < 6}
                  className="w-full h-12 font-bold tracking-wider text-white uppercase transition-all duration-200 shadow-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary hover:shadow-xl focus:ring-4 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Restableciendo...
                    </>
                  ) : (
                    "Restablecer Contraseña"
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

              <div className="p-4 text-sm text-blue-700 border border-blue-200 rounded-lg bg-blue-50">
                <p className="text-center">
                  <strong>Recomendación:</strong> Usa una contraseña segura con letras, números y símbolos.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}