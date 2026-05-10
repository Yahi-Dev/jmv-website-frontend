// src/features/centros/components/CentroDetail.tsx
"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Eyebrow, Icon, Serif, Tag } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { CountUp } from "@/src/features/home/ui-kit/CountUp"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import { useCentro } from "../hook/use-centros"
import { getActividades } from "@/src/features/actividades/service/actividad-service"
import type { ActividadJmv } from "@/src/features/actividades/model/types"
import type { MiembroCentroJmv } from "../model/types"
import { MiembroCentroDialog } from "./MiembroCentroDialog"
import "@/src/features/home/ui-kit/jmv-ui-kit.css"

type TabKey = "info" | "consejo" | "comunidades" | "actividades"

interface Props {
  slug: string
}

export function CentroDetail({ slug }: Props) {
  const { centro, loading, notFound } = useCentro(slug)
  const [tab, setTab] = useState<TabKey>("info")

  // Actividades state
  const [actividades, setActividades] = useState<ActividadJmv[]>([])
  const [actLoading, setActLoading] = useState(false)
  const [yearFilter, setYearFilter] = useState<string>("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    if (!centro?.id) return
    setActLoading(true)
    getActividades({ centroId: centro.id, limit: 200 })
      .then((r) => setActividades(Array.isArray(r.data) ? (r.data as ActividadJmv[]) : []))
      .catch(() => setActividades([]))
      .finally(() => setActLoading(false))
  }, [centro?.id])

  const availableYears = useMemo(() => {
    return [...new Set(actividades.map((a) => new Date(a.fecha).getFullYear()))].sort((a, b) => b - a)
  }, [actividades])

  const availableTags = useMemo(
    () => [...new Set(actividades.flatMap((a) => a.etiquetas))],
    [actividades]
  )

  const filteredActividades = useMemo(() => {
    return actividades.filter((a) => {
      if (yearFilter !== "all" && new Date(a.fecha).getFullYear() !== Number(yearFilter)) return false
      if (selectedTags.length > 0 && !selectedTags.some((t) => a.etiquetas.includes(t))) return false
      return true
    })
  }, [actividades, yearFilter, selectedTags])

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  const clearFilters = () => {
    setYearFilter("all")
    setSelectedTags([])
  }
  const hasFilters = yearFilter !== "all" || selectedTags.length > 0

  // Loading
  if (loading) {
    return (
      <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
        <Navbar />
        <div style={{ padding: "120px 32px", textAlign: "center" }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: JMV.mute }}>Cargando centro...</p>
        </div>
        <FooterSection />
      </div>
    )
  }

  // Not found
  if (notFound || !centro) {
    return (
      <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
        <Navbar />
        <div style={{ padding: "120px 32px", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Icon name="building" size={56} color={JMV.line} />
          <Serif size={48} weight={300} style={{ display: "block", marginTop: 24 }}>
            Centro no <span style={{ fontStyle: "italic", color: JMV.gold }}>encontrado</span>
          </Serif>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 16,
              color: JMV.body,
              marginTop: 20,
              marginBottom: 32,
            }}
          >
            El centro que buscas no existe o fue eliminado.
          </p>
          <Link href="/centros" className="jmv-ghost-pill" style={{ textDecoration: "none" }}>
            <Icon name="arrow" size={13} /> Ver todos los centros
          </Link>
        </div>
        <FooterSection />
      </div>
    )
  }

  const comunidadesCount = centro._count?.comunidades ?? centro.comunidades?.length ?? 0
  const miembrosCount = centro.miembros?.length ?? 0

  const tabs: { key: TabKey; label: string; count?: number }[] = [
    { key: "info", label: "Información" },
    { key: "consejo", label: "Consejo", count: miembrosCount },
    { key: "comunidades", label: "Comunidades", count: comunidadesCount },
    { key: "actividades", label: "Actividades", count: actividades.length },
  ]

  return (
    <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />

      {/* HERO BANNER */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", width: "100%", height: 520, background: JMV.mist }}>
          {centro.imagenUrl ? (
            <Image
              src={centro.imagenUrl}
              alt={centro.nombreParroquia}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
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
              <Icon name="building" size={96} color="rgba(255,255,255,0.3)" />
            </div>
          )}
          {/* Overlay gradient */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(11,16,32,0.30) 0%, rgba(11,16,32,0.10) 30%, rgba(11,16,32,0.78) 100%)",
            }}
          />

          {/* Top: Back link */}
          <div style={{ position: "absolute", top: 24, left: 0, right: 0, padding: "0 32px" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
              <Link
                href="/centros"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.92)",
                  borderRadius: 999,
                  fontFamily: FONT_UI,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  color: JMV.ink,
                  textDecoration: "none",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                }}
              >
                <Icon name="arrow" size={13} /> Centros
              </Link>
            </div>
          </div>

          {/* Bottom: title block */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: "0 32px 56px",
            }}
          >
            <div style={{ maxWidth: 1280, margin: "0 auto", color: "#fff" }}>
              <Reveal delay={0} y={20}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: FONT_UI,
                    fontSize: 11,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: JMV.gold,
                    marginBottom: 18,
                    fontWeight: 600,
                  }}
                >
                  <span style={{ width: 18, height: 1, background: JMV.gold }} />
                  Centro JMV · Desde {centro.anioFundacion}
                </div>
              </Reveal>

              <Reveal delay={120} y={28}>
                <h1
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "clamp(2.5rem, 5.5vw, 4.6rem)",
                    fontWeight: 300,
                    lineHeight: 1.02,
                    letterSpacing: "-0.02em",
                    color: "#fff",
                    margin: 0,
                    maxWidth: 900,
                  }}
                >
                  {centro.nombreParroquia}
                </h1>
              </Reveal>

              <Reveal delay={250} y={20}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 18,
                    fontFamily: FONT_UI,
                    fontSize: 14.5,
                    color: "rgba(255,255,255,0.92)",
                  }}
                >
                  <Icon name="pin" size={15} color="#fff" />
                  {centro.ubicacion}
                </div>
              </Reveal>

              {centro.etiquetas.length > 0 && (
                <Reveal delay={350} y={16}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
                    {centro.etiquetas.map((t) => (
                      <span
                        key={t}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "5px 12px",
                          background: "rgba(255,255,255,0.16)",
                          backdropFilter: "blur(8px)",
                          borderRadius: 999,
                          fontFamily: FONT_UI,
                          fontSize: 11.5,
                          fontWeight: 500,
                          letterSpacing: "0.02em",
                          color: "#fff",
                          border: "1px solid rgba(255,255,255,0.22)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{ background: JMV.paper, borderBottom: "1px solid " + JMV.line }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
            {[
              { k: "Miembros activos", v: String(centro.cantidadMiembrosActivos), color: JMV.blue },
              { k: "Comunidades", v: String(comunidadesCount), color: JMV.celeste },
              { k: "Actividades", v: String(actividades.length), color: JMV.ink },
              { k: "Año de fundación", v: String(centro.anioFundacion), color: JMV.gold },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 28px",
                  borderRight: i < 3 ? "1px solid " + JMV.line : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: 10.5,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: JMV.mute,
                    marginBottom: 8,
                  }}
                >
                  {s.k}
                </div>
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 38,
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: s.color,
                  }}
                >
                  <CountUp value={s.v} duration={1800} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABS + CONTENT */}
      <section style={{ background: JMV.white, padding: "80px 32px 120px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Tab pills */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 56 }}>
            {tabs.map((t) => {
              const active = tab === t.key
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 20px",
                    borderRadius: 999,
                    background: active ? JMV.ink : "transparent",
                    color: active ? "#fff" : JMV.body,
                    border: "1px solid " + (active ? JMV.ink : JMV.line),
                    fontFamily: FONT_UI,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all .2s ease",
                    letterSpacing: "0.01em",
                  }}
                >
                  {t.label}
                  {t.count !== undefined && t.count > 0 && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: 22,
                        height: 22,
                        padding: "0 6px",
                        borderRadius: 999,
                        background: active ? "rgba(255,255,255,0.22)" : JMV.line,
                        color: active ? "#fff" : JMV.body,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {t.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* TAB: INFO */}
          {tab === "info" && (
            <Reveal delay={0} y={24}>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, alignItems: "start" }}>
                {/* Left: resumen + última actividad */}
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                  <div>
                    <Eyebrow color={JMV.blue}>Sobre el centro</Eyebrow>
                    <Serif size={42} weight={300} style={{ display: "block", marginTop: 18 }}>
                      Una historia de <span style={{ fontStyle: "italic", color: JMV.celeste }}>servicio</span>.
                    </Serif>
                    <p
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 16.5,
                        lineHeight: 1.75,
                        color: JMV.body,
                        marginTop: 24,
                      }}
                    >
                      {centro.resumen}
                    </p>
                  </div>

                  {centro.ultimaActividad && (
                    <div
                      style={{
                        background: JMV.paper,
                        border: "1px solid " + JMV.line,
                        borderLeft: `4px solid ${JMV.gold}`,
                        borderRadius: 4,
                        padding: 28,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: FONT_UI,
                          fontSize: 10.5,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: JMV.gold,
                          fontWeight: 600,
                          marginBottom: 12,
                        }}
                      >
                        Última actividad
                      </div>
                      <div
                        style={{
                          fontFamily: FONT_DISPLAY,
                          fontSize: 22,
                          fontWeight: 400,
                          color: JMV.ink,
                          marginBottom: 8,
                          letterSpacing: "-0.005em",
                        }}
                      >
                        {centro.ultimaActividad.titulo}
                      </div>
                      <div
                        style={{
                          fontFamily: FONT_UI,
                          fontSize: 13,
                          color: JMV.mute,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Icon name="calendar" size={13} color={JMV.mute} />
                        {new Date(centro.ultimaActividad.fecha).toLocaleDateString("es-DO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: contact card */}
                <div
                  style={{
                    background: JMV.white,
                    border: "1px solid " + JMV.line,
                    borderRadius: 4,
                    padding: 28,
                    boxShadow: "0 18px 40px -22px rgba(25,22,141,0.18)",
                    position: "sticky",
                    top: 100,
                  }}
                >
                  <Eyebrow color={JMV.blue}>Contacto</Eyebrow>
                  <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 18 }}>
                    <ContactRow
                      icon="users"
                      label="Coordinadora"
                      value={centro.nombreCoordinadora}
                      accent={JMV.blue}
                    />
                    <ContactRow
                      icon="phone"
                      label="Teléfono"
                      value={centro.telefono}
                      href={`tel:${centro.telefono}`}
                      accent={JMV.blue}
                    />
                    <ContactRow
                      icon="mail"
                      label="Correo"
                      value={centro.correo}
                      href={`mailto:${centro.correo}`}
                      accent={JMV.blue}
                    />
                    <ContactRow icon="pin" label="Ubicación" value={centro.ubicacion} accent={JMV.blue} />
                    <ContactRow
                      icon="calendar"
                      label="Fundación"
                      value={`${centro.anioFundacion}`}
                      accent={JMV.blue}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* TAB: CONSEJO */}
          {tab === "consejo" && (
            <div>
              {!centro.miembros || centro.miembros.length === 0 ? (
                <EmptyState
                  icon="users"
                  title="Sin miembros registrados"
                  message="Aún no hay miembros del consejo de este centro registrados en el sistema."
                />
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 28,
                  }}
                >
                  {centro.miembros.map((m, i) => (
                    <Reveal key={m.id} delay={i * 80} y={28}>
                      <MiembroCentroCard miembro={m} parroquia={centro.nombreParroquia} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: COMUNIDADES */}
          {tab === "comunidades" && (
            <div>
              {!centro.comunidades || centro.comunidades.length === 0 ? (
                <EmptyState
                  icon="building"
                  title="Sin comunidades registradas"
                  message="Aún no hay comunidades de este centro registradas."
                />
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: 28,
                  }}
                >
                  {centro.comunidades.map((c, i) => (
                    <Reveal key={c.id} delay={i * 80} y={28}>
                      <div
                        className="jmv-event-card"
                        style={{
                          cursor: "default",
                          background: JMV.white,
                          border: "1px solid " + JMV.line,
                          borderRadius: 4,
                          overflow: "hidden",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div style={{ position: "relative", aspectRatio: "16 / 10", background: JMV.mist }}>
                          {c.imagenUrl ? (
                            <Image
                              src={c.imagenUrl}
                              alt={c.nombre}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              style={{ objectFit: "cover" }}
                            />
                          ) : (
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                background: `linear-gradient(135deg, ${JMV.celeste} 0%, ${JMV.blue} 100%)`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Icon name="star" size={40} color="rgba(255,255,255,0.45)" />
                            </div>
                          )}
                          <div
                            style={{
                              position: "absolute",
                              top: 14,
                              left: 14,
                              padding: "5px 11px",
                              background: "rgba(255,255,255,0.96)",
                              borderRadius: 999,
                              fontFamily: FONT_UI,
                              fontSize: 10.5,
                              fontWeight: 600,
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: JMV.blue,
                              backdropFilter: "blur(6px)",
                            }}
                          >
                            {c.etapa}
                          </div>
                        </div>
                        <div style={{ padding: "20px 22px 22px" }}>
                          <Serif size={22} weight={400} style={{ display: "block", marginBottom: 12 }}>
                            {c.nombre}
                          </Serif>
                          <div
                            style={{
                              display: "flex",
                              gap: 16,
                              fontFamily: FONT_UI,
                              fontSize: 12.5,
                              color: JMV.mute,
                              marginBottom: 12,
                            }}
                          >
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                              <Icon name="users" size={12} color={JMV.celeste} />
                              <span style={{ color: JMV.ink, fontWeight: 600 }}>{c.cantidadMiembros}</span> miembros
                            </span>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                              <Icon name="calendar" size={12} color={JMV.celeste} />
                              Desde {new Date(c.inicioDate).getFullYear()}
                            </span>
                          </div>
                          {c.etiquetas.length > 0 && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                              {c.etiquetas.map((t) => (
                                <Tag key={t} tone="celeste">{t}</Tag>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: ACTIVIDADES */}
          {tab === "actividades" && (
            <div>
              {actLoading ? (
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 15,
                    color: JMV.mute,
                    textAlign: "center",
                    padding: "60px 0",
                  }}
                >
                  Cargando actividades...
                </p>
              ) : actividades.length === 0 ? (
                <EmptyState
                  icon="calendar"
                  title="Sin actividades registradas"
                  message="Aún no hay actividades de este centro registradas."
                />
              ) : (
                <div>
                  {/* Filters */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 18,
                      marginBottom: 36,
                      padding: 24,
                      background: JMV.paper,
                      border: "1px solid " + JMV.line,
                      borderRadius: 4,
                    }}
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                      {/* Year select (custom) */}
                      <select
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                        style={{
                          padding: "10px 16px",
                          borderRadius: 999,
                          border: "1px solid " + JMV.line,
                          background: JMV.white,
                          fontFamily: FONT_UI,
                          fontSize: 13,
                          color: JMV.ink,
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        <option value="all">Todos los años</option>
                        {availableYears.map((y) => (
                          <option key={y} value={String(y)}>
                            {y}
                          </option>
                        ))}
                      </select>

                      {hasFilters && (
                        <button
                          onClick={clearFilters}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: JMV.mute,
                            fontFamily: FONT_UI,
                            fontSize: 12.5,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          × Limpiar filtros
                        </button>
                      )}

                      <span
                        style={{
                          marginLeft: "auto",
                          fontFamily: FONT_UI,
                          fontSize: 12.5,
                          color: JMV.mute,
                        }}
                      >
                        {filteredActividades.length} actividad
                        {filteredActividades.length !== 1 ? "es" : ""}
                      </span>
                    </div>

                    {availableTags.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {availableTags.map((tag) => {
                          const active = selectedTags.includes(tag)
                          return (
                            <button
                              key={tag}
                              onClick={() => toggleTag(tag)}
                              style={{
                                padding: "6px 14px",
                                borderRadius: 999,
                                background: active ? JMV.gold : JMV.white,
                                color: active ? "#fff" : JMV.body,
                                border: "1px solid " + (active ? JMV.gold : JMV.line),
                                fontFamily: FONT_UI,
                                fontSize: 12,
                                fontWeight: 500,
                                cursor: "pointer",
                                transition: "all .15s ease",
                              }}
                            >
                              {tag}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Activities grid */}
                  {filteredActividades.length === 0 ? (
                    <EmptyState
                      icon="calendar"
                      title="Sin resultados"
                      message="Ninguna actividad coincide con los filtros aplicados."
                    />
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: 28,
                      }}
                    >
                      {filteredActividades.map((act, i) => (
                        <Reveal key={act.id} delay={i * 70} y={26}>
                          <Link
                            href={`/actividades/${act.slug}`}
                            className="jmv-event-card"
                            style={{
                              cursor: "pointer",
                              background: JMV.white,
                              border: "1px solid " + JMV.line,
                              borderRadius: 4,
                              overflow: "hidden",
                              textDecoration: "none",
                              display: "flex",
                              flexDirection: "column",
                              height: "100%",
                            }}
                          >
                            <div style={{ position: "relative", aspectRatio: "16 / 10", background: JMV.mist }}>
                              {act.imagenUrl ? (
                                <Image
                                  src={act.imagenUrl}
                                  alt={act.titulo}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                  style={{ objectFit: "cover" }}
                                />
                              ) : (
                                <div
                                  style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: `linear-gradient(135deg, ${JMV.gold} 0%, #EFD9A0 100%)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Icon name="calendar" size={40} color="rgba(255,255,255,0.6)" />
                                </div>
                              )}
                            </div>
                            <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                              <div
                                style={{
                                  fontFamily: FONT_UI,
                                  fontSize: 11.5,
                                  letterSpacing: "0.16em",
                                  textTransform: "uppercase",
                                  color: JMV.gold,
                                  marginBottom: 10,
                                  fontWeight: 600,
                                }}
                              >
                                {new Date(act.fecha).toLocaleDateString("es-DO", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </div>
                              <h3
                                style={{
                                  fontFamily: FONT_DISPLAY,
                                  fontSize: 22,
                                  fontWeight: 400,
                                  color: JMV.ink,
                                  margin: "0 0 10px",
                                  lineHeight: 1.25,
                                  letterSpacing: "-0.005em",
                                }}
                              >
                                {act.titulo}
                              </h3>
                              {act.resumen && (
                                <p
                                  style={{
                                    fontFamily: FONT_BODY,
                                    fontSize: 14,
                                    lineHeight: 1.55,
                                    color: JMV.body,
                                    margin: 0,
                                    marginBottom: 14,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {act.resumen}
                                </p>
                              )}
                              {act.etiquetas.length > 0 && (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                                  {act.etiquetas.slice(0, 3).map((t) => (
                                    <Tag key={t} tone="gold">{t}</Tag>
                                  ))}
                                </div>
                              )}
                              <div
                                style={{
                                  marginTop: "auto",
                                  paddingTop: 12,
                                  borderTop: "1px solid " + JMV.line,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  fontFamily: FONT_UI,
                                  fontSize: 12.5,
                                  color: JMV.ink,
                                  fontWeight: 500,
                                }}
                              >
                                <span>Ver actividad</span>
                                <Icon name="arrowUR" size={13} color={JMV.gold} />
                              </div>
                            </div>
                          </Link>
                        </Reveal>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}

function ContactRow({
  icon,
  label,
  value,
  href,
  accent,
}: {
  icon: "users" | "phone" | "mail" | "pin" | "calendar"
  label: string
  value: string
  href?: string
  accent: string
}) {
  const content = (
    <>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 999,
          background: accent + "0E",
          border: "1px solid " + accent + "33",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: accent,
        }}
      >
        <Icon name={icon} size={14} color={accent} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: FONT_UI,
            fontSize: 10.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: JMV.mute,
            marginBottom: 3,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: FONT_UI,
            fontSize: 13.5,
            color: JMV.ink,
            fontWeight: 500,
            wordBreak: "break-word",
            lineHeight: 1.4,
          }}
        >
          {value}
        </div>
      </div>
    </>
  )

  const wrapperStyle = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    textDecoration: "none",
    color: "inherit",
  } as const

  if (href) {
    return (
      <a href={href} style={wrapperStyle}>
        {content}
      </a>
    )
  }
  return <div style={wrapperStyle}>{content}</div>
}

function MiembroCentroCard({ miembro, parroquia }: { miembro: MiembroCentroJmv; parroquia: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="jmv-miembro-card"
        style={{
          background: JMV.white,
          border: "1px solid " + JMV.line,
          borderRadius: 4,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          padding: 0,
          textAlign: "left",
          cursor: "pointer",
          transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
          fontFamily: "inherit",
        }}
      >
        <div style={{ position: "relative", aspectRatio: "4 / 5", background: JMV.mist, overflow: "hidden" }}>
          {miembro.imagenUrl ? (
            <Image
              src={miembro.imagenUrl}
              alt={miembro.nombre}
              fill
              sizes="280px"
              className="jmv-miembro-img"
              style={{
                objectFit: "cover",
                objectPosition: "top",
                transition: "transform .6s cubic-bezier(.2,.7,.2,1)",
              }}
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
              <Icon name="users" size={48} color="rgba(255,255,255,0.5)" />
            </div>
          )}
          {/* Hover overlay with CTA */}
          <div className="jmv-miembro-overlay">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: FONT_UI,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              Ver perfil completo
              <Icon name="arrowUR" size={14} color="#fff" />
            </span>
          </div>
        </div>
        <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              alignItems: "center",
              gap: 6,
              padding: "5px 11px",
              background: "rgba(25,22,141,0.06)",
              border: "1px solid rgba(25,22,141,0.20)",
              borderRadius: 999,
              fontFamily: FONT_UI,
              fontSize: 11,
              fontWeight: 500,
              color: JMV.blue,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: 999,
                background: JMV.blue,
                opacity: 0.85,
              }}
            />
            {miembro.cargo}
          </div>
          <Serif size={22} weight={400} style={{ display: "block", marginBottom: 8 }}>
            {miembro.nombre}
          </Serif>
          {miembro.descripcion && (
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14,
                lineHeight: 1.55,
                color: JMV.body,
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {miembro.descripcion}
            </p>
          )}
          <div
            style={{
              marginTop: "auto",
              paddingTop: 14,
              borderTop: "1px solid " + JMV.line,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: FONT_UI,
              fontSize: 12.5,
              color: JMV.ink,
            }}
          >
            <span>Ver perfil</span>
            <Icon name="arrowUR" size={13} color={JMV.blue} />
          </div>
        </div>
      </button>

      <MiembroCentroDialog
        open={open}
        onOpenChange={setOpen}
        miembro={miembro}
        parroquia={parroquia}
      />
    </>
  )
}

function EmptyState({
  icon,
  title,
  message,
}: {
  icon: "users" | "building" | "calendar"
  title: string
  message: string
}) {
  return (
    <div
      style={{
        padding: "80px 32px",
        textAlign: "center",
        border: "1px dashed " + JMV.line,
        borderRadius: 4,
        background: JMV.paper,
      }}
    >
      <div style={{ display: "inline-flex", marginBottom: 18, color: JMV.mute }}>
        <Icon name={icon} size={42} color={JMV.line} strokeWidth={1.4} />
      </div>
      <Serif size={28} weight={300} style={{ display: "block", marginBottom: 10 }}>
        {title}
      </Serif>
      <p style={{ fontFamily: FONT_BODY, fontSize: 14.5, color: JMV.mute, margin: 0 }}>{message}</p>
    </div>
  )
}
