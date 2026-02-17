"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { getClientUser, signOut } from "@/src/lib/client-auth"
import { Star, LogOut, ExternalLink, Home, MessageSquare, BookOpen, UsersRound, User } from "lucide-react"
import { Button } from "@/src/components/ui/button"

const NAV_ITEMS = [
  { href: "/admin", label: "Inicio", icon: Home },
  { href: "/admin/testimonios", label: "Testimonios", icon: MessageSquare },
  { href: "/admin/formacion", label: "Formación", icon: BookOpen },
  { href: "/admin/consejos", label: "Consejos", icon: UsersRound },
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link href="/admin" className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 shadow-lg rounded-xl bg-gradient-to-br from-primary to-secondary">
                  <Star className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-bold text-primary">JMV Admin</span>
                  <p className="text-xs text-muted-foreground">Panel Administrativo</p>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="items-center hidden gap-1 md:flex">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors
                      ${isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                )
              })}
            </nav>

            {/* User actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-lg text-muted-foreground hover:bg-gray-100 hover:text-foreground"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Ver Sitio</span>
              </Link>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {user.firstName || user.userName || user.email}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden ml-2 sm:inline">Salir</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
