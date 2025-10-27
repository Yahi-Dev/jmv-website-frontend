"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import {
  Star,
  Home,
  Users,
  BookOpen,
  Calendar,
  Newspaper,
  User,
  ArrowRight,
  Building,
  LogOut,
} from "lucide-react"
import { getClientUser, signOut } from "@/src/lib/client-auth"
import { useEffect, useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const links = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/quienes-somos", label: "Quiénes Somos", icon: Users },
    { href: "/formacion", label: "Formación", icon: BookOpen },
    { href: "/eventos", label: "Eventos", icon: Calendar },
    { href: "/noticias", label: "Noticias", icon: Newspaper },
    { href: "/centros", label: "Centros", icon: Building },
    { href: "/unete", label: "Únete", icon: User },
  ]

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getClientUser()
        setUser(userData)
      } catch (error) {
        console.error("Error checking auth:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname]) // Revisar autenticación cuando cambia la ruta

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/"
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-20 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 shadow-lg rounded-xl bg-gradient-to-br from-primary to-secondary">
            <Star className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight">JMV RD</span>
            <p className="text-xs text-gray-600">Juventud Mariana Vicenciana</p>
          </div>
        </div>

        {/* Links */}
        <div className="items-center hidden space-x-8 md:flex">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:text-primary hover:scale-105
                  ${isActive ? "text-primary" : "text-foreground"}`}
              >
                <Icon className="w-4 h-4" />
                {label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Botones extra */}
        <div className="flex items-center space-x-4">
          {isLoading ? (
            // Mostrar un placeholder mientras carga
            <Button
              variant="outline"
              size="icon"
              className="transition-all duration-200 bg-transparent border-2 rounded-full"
              disabled
            >
              <User className="w-5 h-5" />
            </Button>
          ) : user ? (
            // Usuario autenticado - Mostrar botón de logout
            <Button
              variant="destructive"
              size="icon"
              onClick={handleLogout}
              className="text-red-600 transition-all duration-200 bg-transparent border-2 rounded-full hover:border-destructive hover:scale-105 hover:text-white"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          ) : (
            // Usuario no autenticado - Mostrar botón de login
            <Button
              asChild
              variant="outline"
              size="icon"
              className="transition-all duration-200 bg-transparent border-2 rounded-full hover:border-primary hover:scale-105"
            >
              <Link href="/login">
                <User className="w-5 h-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}