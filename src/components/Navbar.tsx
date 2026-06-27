"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useLayoutEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from "react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/src/components/ui/sheet"
import { getClientUser, signOut } from "@/src/lib/client-auth"
import { Button, Icon, Logo } from "@/src/features/home/ui-kit/Primitives"
import { JMV, FONT_DISPLAY, FONT_UI } from "@/src/features/home/ui-kit/tokens"

// `useLayoutEffect` no existe en SSR; usamos useEffect en servidor para evitar warnings.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type SubLink = { href: string; label: string }
type NavLink = { href: string; id: string; label: string; submenu?: SubLink[] }

const links: NavLink[] = [
  { href: "/", id: "home", label: "Inicio" },
  { href: "/quienes-somos", id: "about", label: "Quiénes Somos" },
  { href: "/formacion", id: "formacion", label: "Formación" },
  { href: "/libro-oracion", id: "libro", label: "Libro de Oración" },
  { href: "/centros", id: "centros", label: "Centros" },
  { href: "/consejos", id: "consejo", label: "Consejo" },
  {
    href: "/noticias",
    id: "actualidad",
    label: "Actualidad",
    submenu: [
      { href: "/noticias", label: "Noticias" },
      { href: "/actividades", label: "Actividades" },
      { href: "/eventos", label: "Eventos" },
    ],
  },
]

// "Active" includes children of a submenu so the parent stays highlighted.
function isLinkActive(l: NavLink, pathname: string) {
  if (pathname === l.href) return true
  return l.submenu?.some((s) => s.href === pathname) ?? false
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)

  const linksContainerRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const initializedRef = useRef(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sincronizamos `scrolled` antes del primer paint para evitar el "flicker"
  // donde el navbar se renderiza grande y luego salta a su versión compacta.
  useIsomorphicLayoutEffect(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    getClientUser().then(setUser).catch(() => setUser(null))
  }, [pathname])

  useEffect(() => {
    const moveIndicator = () => {
      const container = linksContainerRef.current
      const indicator = indicatorRef.current
      if (!container || !indicator) return

      const activeIndex = links.findIndex((l) => isLinkActive(l, pathname))
      if (activeIndex === -1) {
        indicator.style.opacity = "0"
        return
      }

      const activeEl = linkRefs.current[activeIndex]
      if (!activeEl) return

      const containerRect = container.getBoundingClientRect()
      const linkRect = activeEl.getBoundingClientRect()
      const left = linkRect.left - containerRect.left
      const width = linkRect.width

      if (!initializedRef.current) {
        indicator.classList.add("jmv-nav-indicator--instant")
        indicator.style.left = `${left}px`
        indicator.style.width = `${width}px`
        indicator.style.opacity = "1"
        indicator.getBoundingClientRect()
        indicator.classList.remove("jmv-nav-indicator--instant")
        initializedRef.current = true
      } else {
        indicator.style.left = `${left}px`
        indicator.style.width = `${width}px`
        indicator.style.opacity = "1"
      }
    }

    const raf = requestAnimationFrame(moveIndicator)
    window.addEventListener("resize", moveIndicator)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", moveIndicator)
    }
  }, [pathname])

  // Hover open + delayed close so the cursor can travel from trigger to panel
  const openDropdown = (id: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setOpenDropdownId(id)
  }
  const closeDropdownDeferred = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => setOpenDropdownId(null), 140)
  }
  const closeDropdownImmediate = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setOpenDropdownId(null)
  }
  // Cierra al perder foco si el siguiente elemento focusable está FUERA del wrapper.
  const handleDropdownBlur = (e: FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null
    if (!e.currentTarget.contains(next)) closeDropdownImmediate()
  }
  const handleDropdownKeyDown = (e: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (e.key === "Escape") {
      closeDropdownImmediate()
      return
    }
    if (e.key === "ArrowDown" && openDropdownId !== id) {
      e.preventDefault()
      openDropdown(id)
    }
  }

  // Limpieza del timer al desmontar
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await signOut()
      window.location.href = "/"
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid " + (scrolled ? JMV.line : "transparent"),
        transition: "border-color .25s, box-shadow .25s",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.07)" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "10px 32px" : "18px 32px",
          maxWidth: 1280,
          margin: "0 auto",
          transition: "padding .3s ease",
        }}
      >
        {/* Brand */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div style={{ transition: "all .3s ease", width: scrolled ? 36 : 64, height: scrolled ? 36 : 64 }}>
            <Logo size={scrolled ? 36 : 64} />
          </div>
          <div className="jmv-nav-wordmark" style={{ lineHeight: 1.1 }}>
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: scrolled ? 14 : 16,
                color: JMV.ink,
                letterSpacing: "-0.01em",
                fontWeight: 500,
                transition: "font-size .3s ease",
                whiteSpace: "nowrap",
              }}
            >
              Juventud Mariana Vicenciana
            </div>
            <div style={{ fontFamily: FONT_UI, fontSize: 11, color: JMV.mute, marginTop: 2, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
              República Dominicana
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div
          ref={linksContainerRef}
          className="jmv-nav-links-desktop"
          style={{ display: "flex", gap: 28, fontFamily: FONT_UI, fontSize: 13.5, position: "relative" }}
        >
          {links.map((l, i) => {
            const active = isLinkActive(l, pathname)
            const hasSubmenu = !!l.submenu?.length
            const isOpen = openDropdownId === l.id

            const trigger = (
              <Link
                key={l.href}
                href={l.href}
                ref={(el) => { linkRefs.current[i] = el }}
                className="jmv-nav-link"
                style={{
                  textDecoration: "none",
                  color: active ? JMV.ink : JMV.mute,
                  fontWeight: active ? 600 : 450,
                  paddingBottom: 4,
                  transition: "color .15s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
                aria-haspopup={hasSubmenu ? "true" : undefined}
                aria-expanded={hasSubmenu ? isOpen : undefined}
              >
                {l.label}
                {hasSubmenu && (
                  <span
                    aria-hidden
                    style={{
                      display: "inline-flex",
                      transition: "transform .2s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      marginTop: 1,
                    }}
                  >
                    <Icon name="chevron" size={11} />
                  </span>
                )}
              </Link>
            )

            if (!hasSubmenu) return trigger

            return (
              <div
                key={l.href}
                style={{ position: "relative" }}
                onMouseEnter={() => openDropdown(l.id)}
                onMouseLeave={closeDropdownDeferred}
                onFocus={() => openDropdown(l.id)}
                onBlur={handleDropdownBlur}
                onKeyDown={(e) => handleDropdownKeyDown(e, l.id)}
              >
                {trigger}

                {/* Dropdown panel — wrapper has paddingTop so the cursor
                    bridge between trigger and panel doesn't leave the area. */}
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    paddingTop: 14,
                    pointerEvents: isOpen ? "auto" : "none",
                  }}
                >
                  <div
                    style={{
                      minWidth: 200,
                      background: JMV.white,
                      border: "1px solid " + JMV.line,
                      borderRadius: 8,
                      padding: 6,
                      boxShadow: "0 14px 40px -12px rgba(11,16,32,0.18)",
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateY(0)" : "translateY(-8px)",
                      transition: "opacity .2s ease, transform .2s ease",
                    }}
                  >
                    {l.submenu!.map((s) => {
                      const subActive = pathname === s.href
                      return (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setOpenDropdownId(null)}
                          tabIndex={isOpen ? 0 : -1}
                          aria-hidden={!isOpen}
                          className="jmv-dropdown-item"
                          style={{
                            display: "block",
                            padding: "10px 14px",
                            borderRadius: 5,
                            fontFamily: FONT_UI,
                            fontSize: 13.5,
                            color: subActive ? JMV.ink : JMV.body,
                            fontWeight: subActive ? 600 : 450,
                            background: subActive ? JMV.mist : "transparent",
                            textDecoration: "none",
                            transition: "background .15s, color .15s",
                            position: "relative",
                          }}
                        >
                          {subActive && (
                            <span
                              aria-hidden
                              style={{
                                position: "absolute",
                                left: 4,
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: 3,
                                height: 16,
                                borderRadius: 2,
                                background: JMV.gold,
                              }}
                            />
                          )}
                          {s.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Always-mounted sliding gold underline — transition lives in CSS */}
          <span
            ref={indicatorRef}
            className="jmv-nav-indicator"
            aria-hidden
            style={{ left: 0, width: 0, opacity: 0 }}
          />
        </div>

        {/* Right — flag + Únete + auth + mobile */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image
            src="/bandera/bandera-nacional-mundo-republica-dominicana.avif"
            alt="RD"
            width={22}
            height={16}
            style={{ borderRadius: 1, opacity: 0.95, objectFit: "cover" }}
          />
          <Button variant="dark" size="sm" onClick={() => router.push("/unete")}>
            Únete <Icon name="arrowUR" size={14} />
          </Button>

          {user ? (
            <button
              onClick={handleLogout}
              title="Cerrar sesión"
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                border: "1px solid " + JMV.line,
                background: "transparent",
                color: JMV.ink,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="users" size={14} />
            </button>
          ) : (
            <Link
              href="/login"
              title="Iniciar sesión"
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                border: "1px solid " + JMV.line,
                color: JMV.ink,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <Icon name="users" size={14} />
            </Link>
          )}

          {/* Mobile toggle */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Menú"
                className="jmv-mobile-toggle"
                style={{
                  width: 36,
                  height: 36,
                  display: "none",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: JMV.ink,
                }}
              >
                <Icon name="menu" size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" style={{ paddingTop: 40, overflowY: "auto", width: 288 }}>
              <SheetTitle
                style={{
                  position: "absolute",
                  width: 1,
                  height: 1,
                  padding: 0,
                  margin: -1,
                  overflow: "hidden",
                  clip: "rect(0,0,0,0)",
                  whiteSpace: "nowrap",
                  border: 0,
                }}
              >
                Menú de navegación
              </SheetTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, fontFamily: FONT_UI }}>
                {links.map((l) => {
                  const active = isLinkActive(l, pathname)
                  return (
                    <div key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 6,
                          textDecoration: "none",
                          color: active ? JMV.ink : JMV.mute,
                          fontWeight: active ? 600 : 450,
                          fontSize: 14,
                          background: active ? JMV.mist : "transparent",
                          display: "block",
                        }}
                      >
                        {l.label}
                      </Link>
                      {l.submenu && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 2, marginBottom: 6, paddingLeft: 16 }}>
                          {l.submenu.map((s) => {
                            const subActive = pathname === s.href
                            return (
                              <Link
                                key={s.href}
                                href={s.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                  padding: "8px 12px",
                                  borderRadius: 5,
                                  textDecoration: "none",
                                  color: subActive ? JMV.ink : JMV.mute,
                                  fontWeight: subActive ? 600 : 450,
                                  fontSize: 13,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                }}
                              >
                                <span
                                  aria-hidden
                                  style={{
                                    width: 4,
                                    height: 4,
                                    borderRadius: 999,
                                    background: subActive ? JMV.gold : JMV.line,
                                  }}
                                />
                                {s.label}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid " + JMV.line }}>
                  {user ? (
                    <button
                      onClick={() => { setMobileOpen(false); handleLogout() }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 12px",
                        borderRadius: 6,
                        color: "#b91c1c",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 14,
                      }}
                    >
                      Cerrar sesión
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      style={{ padding: "10px 12px", display: "block", borderRadius: 6, color: JMV.ink, textDecoration: "none", fontSize: 14 }}
                    >
                      Iniciar sesión
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          :global(.jmv-nav-links-desktop) { display: none !important; }
          :global(.jmv-mobile-toggle) { display: inline-flex !important; }
        }
      `}</style>
    </nav>
  )
}
