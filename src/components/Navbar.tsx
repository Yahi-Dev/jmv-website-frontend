"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet"
import { getClientUser, signOut } from "@/src/lib/client-auth"
import { Button, Icon, Logo } from "@/src/features/home/ui-kit/Primitives"
import { JMV, FONT_DISPLAY, FONT_UI } from "@/src/features/home/ui-kit/tokens"

const links = [
  { href: "/", id: "home", label: "Inicio" },
  { href: "/quienes-somos", id: "about", label: "Quiénes Somos" },
  { href: "/formacion", id: "formacion", label: "Formación" },
  { href: "/libro-oracion", id: "libro", label: "Libro de Oración" },
  { href: "/centros", id: "centros", label: "Centros" },
  { href: "/consejos", id: "consejo", label: "Consejo" },
  { href: "/noticias", id: "actualidad", label: "Actualidad" },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const linksContainerRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    getClientUser().then(setUser).catch(() => setUser(null))
  }, [pathname])

  // Move the indicator to the active link using direct DOM mutation. The
  // transition lives in jmv-ui-kit.css so React can't clobber it on re-render.
  useEffect(() => {
    const moveIndicator = () => {
      const container = linksContainerRef.current
      const indicator = indicatorRef.current
      if (!container || !indicator) return

      const activeIndex = links.findIndex((l) => l.href === pathname)
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
        // First paint: snap into place without animation via CSS class
        indicator.classList.add("jmv-nav-indicator--instant")
        indicator.style.left = `${left}px`
        indicator.style.width = `${width}px`
        indicator.style.opacity = "1"
        indicator.getBoundingClientRect() // force reflow
        indicator.classList.remove("jmv-nav-indicator--instant")
        initializedRef.current = true
      } else {
        // Subsequent navigations: CSS transition slides the bar smoothly
        indicator.style.left = `${left}px`
        indicator.style.width = `${width}px`
        indicator.style.opacity = "1"
      }
    }

    // Wait one frame so fonts/layout are stable before measuring
    const raf = requestAnimationFrame(moveIndicator)

    // Also re-measure on resize in case the layout reflows
    window.addEventListener("resize", moveIndicator)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", moveIndicator)
    }
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
          <div style={{ lineHeight: 1.1 }}>
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: scrolled ? 14 : 16,
                color: JMV.ink,
                letterSpacing: "-0.01em",
                fontWeight: 500,
                transition: "font-size .3s ease",
              }}
            >
              Juventud Mariana Vicenciana
            </div>
            <div style={{ fontFamily: FONT_UI, fontSize: 11, color: JMV.mute, marginTop: 2, letterSpacing: "0.06em" }}>
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
            const active = pathname === l.href
            return (
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
                }}
              >
                {l.label}
              </Link>
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
              <div style={{ display: "flex", flexDirection: "column", gap: 4, fontFamily: FONT_UI }}>
                {links.map((l) => {
                  const active = pathname === l.href
                  return (
                    <Link
                      key={l.href}
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
                      }}
                    >
                      {l.label}
                    </Link>
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
