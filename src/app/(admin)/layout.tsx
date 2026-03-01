"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { getClientUser, signOut } from "@/src/lib/client-auth"
import {
  Star, LogOut, ExternalLink, Home, MessageSquare, BookOpen,
  UsersRound, User, CalendarDays, Newspaper, Activity, Building2,
} from "lucide-react"
import { Button } from "@/src/components/ui/button"

const NAV_ITEMS = [
  { href: "/admin", label: "Inicio", icon: Home },
  { href: "/admin/testimonios", label: "Testimonios", icon: MessageSquare },
  { href: "/admin/formacion", label: "Formación", icon: BookOpen },
  { href: "/admin/consejos", label: "Consejos", icon: UsersRound },
  { href: "/admin/eventos", label: "Eventos", icon: CalendarDays },
  { href: "/admin/noticias", label: "Noticias", icon: Newspaper },
  { href: "/admin/actividades", label: "Actividades", icon: Activity },
  { href: "/admin/centros", label: "Centros", icon: Building2 },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getClientUser()
        if (!userData) {
          router.push("/login")
          return
        }
        setUser(userData)
      } catch {
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-8 h-8 border-4 rounded-full border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 w-56 bg-white border-r flex flex-col">

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b shrink-0">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 shadow-md rounded-xl bg-linear-to-br from-primary to-secondary shrink-0">
              <Star className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-primary leading-none">JMV Admin</p>
              <p className="text-xs text-muted-foreground mt-0.5">Panel Administrativo</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/admin"
                ? pathname === "/admin"
                : pathname === href || pathname.startsWith(href + "/")
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150
                  ${isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-gray-100"
                  }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* User + actions */}
        <div className="shrink-0 border-t px-4 py-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4 shrink-0" />
            <span className="truncate text-xs">{user.firstName || user.userName || user.email}</span>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs rounded-md text-muted-foreground hover:bg-gray-100 hover:text-foreground transition-colors border"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Ver Sitio
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex-1 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 h-auto py-1.5"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              Salir
            </Button>
          </div>
        </div>

      </aside>

      {/* Main content — offset by sidebar width */}
      <div className="flex-1 ml-56 flex flex-col min-h-screen">
        <main className="flex-1 px-6 py-8">
          {children}
        </main>
      </div>

    </div>
  )
}
