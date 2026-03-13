"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/src/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/src/components/ui/sheet"
import {
  Home,
  Users,
  BookOpen,
  BookMarked,
  Calendar,
  Newspaper,
  Activity,
  User,
  Building,
  LogOut,
  UsersRound,
  Settings,
  Menu,
  Globe,
} from "lucide-react"
import { getClientUser, signOut } from "@/src/lib/client-auth"
import { useEffect, useState } from "react"
import { cn } from "@/src/lib/utils"

export default function Navbar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const primaryLinks = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/quienes-somos", label: "Quiénes Somos", icon: Users },
    { href: "/libro-oracion", label: "Libro de Oración", icon: BookMarked },
    { href: "/centros", label: "Centros", icon: Building },
    { href: "/consejos", label: "Consejo Nacional", icon: UsersRound },
    { href: "/actividades", label: "Actividades", icon: Activity },
  ]

  const actualidadLinks = [
    { href: "/noticias", label: "Noticias", icon: Newspaper, desc: "Últimas noticias de JMV" },
    { href: "/eventos", label: "Eventos", icon: Calendar, desc: "Próximos eventos y actividades" },
  ]

  const comunidadLinks = [
    { href: "/centros", label: "Centros", icon: Building, desc: "Centros JMV en República Dominicana" },
    { href: "/consejos", label: "Consejo Nacional", icon: UsersRound, desc: "Estructura y liderazgo nacional" },
    { href: "/actividades", label: "Actividades", icon: Activity, desc: "Actividades y proyectos en curso" },
  ]

  const formacionLinks = [
    { href: "/formacion", label: "Formación", icon: BookOpen, desc: "Programa de formación espiritual" },
  ]

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
  }, [pathname])

  const handleLogout = async () => {
    try {
      await signOut()
      window.location.href = "/"
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-20 px-6">

        {/* Logo + Bandera */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo/jmv-logo-removebg-preview.png"
            alt="JMV Logo"
            width={72}
            height={72}
            className="object-contain"
          />
          <Image
            src="/bandera/bandera-nacional-mundo-republica-dominicana.avif"
            alt="Bandera Dominicana"
            width={46}
            height={34}
            className="object-cover rounded-sm shadow-sm"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="items-center hidden gap-1 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>

              {/* Links primarios */}
              {primaryLinks.map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-sm",
                        pathname === href && "text-primary font-semibold"
                      )}
                    >
                      {label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              {/* Dropdown: Actualidad */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm bg-transparent">Actualidad</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 p-3 w-72">
                    {actualidadLinks.map(({ href, label, icon: Icon, desc }) => (
                      <li key={href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={href}
                            className={cn(
                              "flex flex-col gap-1 rounded-md p-3 transition-colors hover:bg-accent hover:text-accent-foreground",
                              pathname === href && "bg-accent text-accent-foreground"
                            )}
                          >
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <Icon className="w-4 h-4 text-primary shrink-0" />
                              {label}
                            </div>
                            <p className="text-xs leading-snug text-muted-foreground">{desc}</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Formación — link directo */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/formacion"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-sm",
                      pathname === "/formacion" && "text-primary font-semibold"
                    )}
                  >
                    Formación
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* JMV Internacional */}
              <NavigationMenuItem>
                <a
                  href="https://jmvinter.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent text-sm flex items-center gap-1")}
                >
                  <Globe className="w-3.5 h-3.5" />
                  Internacional
                </a>
              </NavigationMenuItem>

              {/* Contáctanos */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/unete"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-sm",
                      pathname === "/unete" && "text-primary font-semibold"
                    )}
                  >
                    Contáctanos
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Acciones derecha */}
        <div className="flex items-center gap-2">
          {/* Auth buttons — desktop */}
          <div className="items-center hidden gap-2 lg:flex">
            {isLoading ? (
              <Button variant="outline" size="icon" className="rounded-full" disabled>
                <User className="w-4 h-4" />
              </Button>
            ) : user ? (
              <>
                <Button asChild variant="outline" size="sm" className="hover:border-primary">
                  <Link href="/admin">
                    <Settings className="w-4 h-4 mr-1" />
                    Admin
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="rounded-full text-destructive hover:bg-destructive/10"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button asChild variant="outline" size="icon" className="rounded-full hover:border-primary">
                <Link href="/login">
                  <User className="w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>

          {/* Hamburguesa — móvil */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pt-10 overflow-y-auto w-72">
              <div className="flex flex-col gap-1">
                {[...primaryLinks, ...comunidadLinks, ...formacionLinks].map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent",
                      pathname === href && "bg-accent text-primary"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {label}
                  </Link>
                ))}
                <a
                  href="https://jmvinter.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <Globe className="w-4 h-4 shrink-0" />
                  JMV Internacional
                </a>

                <div className="pt-2 mt-2 border-t">
                  {user ? (
                    <>
                      <Link
                        href="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                      >
                        <Settings className="w-4 h-4 shrink-0" />
                        Admin
                      </Link>
                      <button
                        onClick={() => { setMobileOpen(false); handleLogout() }}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <LogOut className="w-4 h-4 shrink-0" />
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      <User className="w-4 h-4 shrink-0" />
                      Iniciar sesión
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  )
}
