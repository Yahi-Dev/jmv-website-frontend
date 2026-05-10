// src/features/centros/components/CentroList.tsx
"use client"

import { useState, useEffect, useMemo } from "react"
import { useDebouncedValue } from "@/src/hooks/use-debounced-value"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Eyebrow, Icon, Serif, Tag } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { CountUp } from "@/src/features/home/ui-kit/CountUp"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import { CentroJmv } from "../model/types"
import { getCentros } from "../service/centro-service"

export function CentroList() {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebouncedValue(search, 350)
  const [centros, setCentros] = useState<CentroJmv[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ctrl = new AbortController()
    setLoading(true)
    getCentros({ search: debouncedSearch || undefined, limit: 100, signal: ctrl.signal })
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : []
        setCentros(
          data.map((c) => ({
            ...c,
            etiquetas: Array.isArray(c.etiquetas) ? c.etiquetas : [],
          }))
        )
      })
      .catch((err) => {
        if ((err as Error)?.name === "AbortError") return
        setCentros([])
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false)
      })
    return () => ctrl.abort()
  }, [debouncedSearch])

  // Aggregate stats across all centros
  const stats = useMemo(() => {
    const totalMiembros = centros.reduce((sum, c) => sum + (c.cantidadMiembrosActivos || 0), 0)
    const totalComunidades = centros.reduce(
      (sum, c) => sum + (c._count?.comunidades ?? c.comunidades?.length ?? 0),
      0
    )
    return {
      centros: centros.length,
      miembros: totalMiembros,
      comunidades: totalComunidades,
    }
  }, [centros])

  return (
    <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />

      {/* HERO */}
      <section
        style={{
          background: JMV.white,
          padding: "56px 32px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative ornaments */}
        <div
          aria-hidden
          className="jmv-spin-slow"
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 480,
            height: 480,
            borderRadius: "50%",
            border: "1px dashed rgba(25,22,141,0.12)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          className="jmv-pulse-soft"
          style={{
            position: "absolute",
            top: 80,
            right: 80,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(19,159,204,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          className="jmv-float-slow"
          style={{
            position: "absolute",
            top: 220,
            right: 220,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: JMV.gold,
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <Reveal delay={0} y={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontFamily: FONT_UI,
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: JMV.mute,
                marginBottom: 40,
              }}
            >
              <span style={{ display: "inline-block", width: 36, height: 1, background: JMV.blue }} />
              <span>Centros JMV</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>JMV República Dominicana</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span style={{ color: JMV.celeste }}>Presencia nacional</span>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "end" }}>
            <div>
              <Reveal delay={120} y={20}>
                <Eyebrow color={JMV.blue}>Centros Parroquiales</Eyebrow>
              </Reveal>
              <Reveal delay={220} y={32}>
                <h1
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "clamp(3rem, 7vw, 6.4rem)",
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: "-0.025em",
                    color: JMV.ink,
                    margin: "28px 0 0",
                    fontVariationSettings: '"opsz" 144, "SOFT" 50',
                  }}
                >
                  Una <span style={{ fontStyle: "italic", color: JMV.blue, fontWeight: 300 }}>red</span> que
                  <br />
                  da vida al{" "}
                  <span style={{ fontStyle: "italic", color: JMV.celeste, fontWeight: 300 }}>movimiento</span>.
                </h1>
              </Reveal>
            </div>

            <Reveal delay={380} y={20}>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: JMV.body,
                  margin: 0,
                  maxWidth: 440,
                }}
              >
                Conoce los centros parroquiales de la Juventud Mariana Vicenciana en todo el país. Cada uno con
                su propia historia, comunidad y vocación de servicio.
              </p>
            </Reveal>
          </div>

          {/* Stats strip */}
          <Reveal delay={520} y={20}>
            <div
              style={{
                marginTop: 80,
                paddingTop: 24,
                borderTop: "1px solid " + JMV.line,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 32,
              }}
            >
              {[
                { k: "Centros activos", v: String(stats.centros || 0), color: JMV.blue },
                { k: "Miembros totales", v: String(stats.miembros || 0), color: JMV.celeste },
                { k: "Comunidades", v: String(stats.comunidades || 0), color: JMV.ink },
              ].map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: FONT_UI,
                      fontSize: 10.5,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: JMV.mute,
                      marginBottom: 10,
                    }}
                  >
                    {s.k}
                  </div>
                  <Serif size={42} weight={300} style={{ color: s.color }}>
                    <CountUp value={s.v} duration={1800} />
                  </Serif>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SEARCH (sticky) */}
      <section
        style={{
          position: "sticky",
          top: 64,
          zIndex: 5,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid " + JMV.line,
          borderBottom: "1px solid " + JMV.line,
          padding: "20px 32px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ position: "relative", flex: 1, maxWidth: 480 }}>
            <span
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: JMV.mute,
                pointerEvents: "none",
              }}
            >
              <Icon name="search" size={15} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar centros por nombre o ubicación..."
              style={{
                width: "100%",
                padding: "12px 40px 12px 42px",
                background: JMV.white,
                border: "1px solid " + JMV.line,
                borderRadius: 999,
                fontFamily: FONT_UI,
                fontSize: 13.5,
                color: JMV.ink,
                outline: "none",
                transition: "border-color .15s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = JMV.blue)}
              onBlur={(e) => (e.currentTarget.style.borderColor = JMV.line)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Limpiar"
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: JMV.mute,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  width: 20,
                  height: 20,
                }}
              >
                ×
              </button>
            )}
          </div>
          <span
            style={{
              fontFamily: FONT_UI,
              fontSize: 12.5,
              color: JMV.mute,
              marginLeft: "auto",
            }}
          >
            {loading
              ? "Cargando..."
              : `${centros.length} centro${centros.length !== 1 ? "s" : ""}`}
          </span>
        </div>
      </section>

      {/* GRID */}
      <section style={{ padding: "80px 32px 120px", background: JMV.white }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {loading ? (
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 15,
                color: JMV.mute,
                textAlign: "center",
                padding: "80px 0",
              }}
            >
              Cargando centros...
            </p>
          ) : centros.length === 0 ? (
            <div
              style={{
                padding: "80px 32px",
                textAlign: "center",
                border: "1px dashed " + JMV.line,
                borderRadius: 4,
              }}
            >
              <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: JMV.body, margin: 0 }}>
                No se encontraron centros con esa búsqueda.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 32,
              }}
            >
              {centros.map((c, i) => (
                <Reveal key={c.id} delay={i * 80} y={28}>
                  <CentroCardEditorial centro={c} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}

function CentroCardEditorial({ centro }: { centro: CentroJmv }) {
  const comunidadesCount = centro._count?.comunidades ?? centro.comunidades?.length ?? 0

  return (
    <Link
      href={`/centros/${centro.slug}`}
      className="jmv-miembro-card"
      style={{
        display: "flex",
        flexDirection: "column",
        background: JMV.white,
        border: "1px solid " + JMV.line,
        borderRadius: 4,
        overflow: "hidden",
        textDecoration: "none",
        transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
        height: "100%",
      }}
    >
      {/* Image header */}
      <div style={{ position: "relative", aspectRatio: "16 / 10", background: JMV.mist, overflow: "hidden" }}>
        {centro.imagenUrl ? (
          <Image
            src={centro.imagenUrl}
            alt={centro.nombreParroquia}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="jmv-miembro-img"
            style={{ objectFit: "cover", transition: "transform .6s cubic-bezier(.2,.7,.2,1)" }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${JMV.blue} 0%, ${JMV.celeste} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="building" size={48} color="rgba(255,255,255,0.4)" />
          </div>
        )}

        {/* Year fundación pill */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            padding: "5px 11px",
            background: "rgba(255,255,255,0.95)",
            borderRadius: 999,
            fontFamily: FONT_UI,
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: JMV.blue,
            backdropFilter: "blur(6px)",
          }}
        >
          Desde {centro.anioFundacion}
        </div>

        {/* Bottom gradient with parroquia name */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "60px 18px 16px",
            background: "linear-gradient(180deg, transparent 0%, rgba(11,16,32,0.88) 100%)",
            color: "#fff",
          }}
        >
          <div
            style={{
              fontFamily: FONT_UI,
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              marginBottom: 4,
            }}
          >
            Parroquia
          </div>
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 18,
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: "-0.005em",
              color: "#fff",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {centro.nombreParroquia}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: FONT_UI,
            fontSize: 12.5,
            color: JMV.body,
            marginBottom: 14,
          }}
        >
          <Icon name="pin" size={12} color={JMV.mute} />
          <span
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {centro.ubicacion}
          </span>
        </div>

        {/* Stats inline */}
        <div
          style={{
            display: "flex",
            gap: 18,
            paddingTop: 14,
            borderTop: "1px solid " + JMV.line,
            marginBottom: 14,
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: FONT_UI, fontSize: 12, color: JMV.mute }}>
            <Icon name="users" size={12} color={JMV.blue} />
            <span style={{ color: JMV.ink, fontWeight: 600 }}>{centro.cantidadMiembrosActivos}</span> miembros
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: FONT_UI, fontSize: 12, color: JMV.mute }}>
            <Icon name="building" size={12} color={JMV.celeste} />
            <span style={{ color: JMV.ink, fontWeight: 600 }}>{comunidadesCount}</span> comunidades
          </div>
        </div>

        {/* Tags */}
        {centro.etiquetas.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {centro.etiquetas.slice(0, 3).map((t) => (
              <Tag key={t} tone="primary">{t}</Tag>
            ))}
            {centro.etiquetas.length > 3 && (
              <Tag tone="neutral">+{centro.etiquetas.length - 3}</Tag>
            )}
          </div>
        )}

        {/* Footer link */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: FONT_UI,
            fontSize: 12.5,
            color: JMV.ink,
            fontWeight: 500,
          }}
        >
          <span>Ver centro</span>
          <Icon name="arrowUR" size={13} color={JMV.blue} />
        </div>
      </div>
    </Link>
  )
}
