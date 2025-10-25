import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Star, Mail, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">

      {/* Contenido principal */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur">
            <CardHeader className="pb-8 space-y-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                  <Star className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-primary">Iniciar Sesión</CardTitle>
                <CardDescription className="mt-2 text-base">
                  Accede a tu cuenta de JMV República Dominicana
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form className="space-y-4">
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
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-12 pl-10 border-2 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="border-gray-300 rounded" />
                    <span className="text-muted-foreground">Recordarme</span>
                  </label>
                  <Link href="/forgot-password" className="text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <Button type="submit" className="w-full h-12 text-base font-semibold">
                  Iniciar Sesión
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
