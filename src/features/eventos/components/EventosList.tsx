// src/features/eventos/components/EventosList.tsx
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
import { Evento } from "../model/types"
import { getEventos } from "../service/evento-service"

export function EventosList() {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebouncedValue(search, 350)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [tagsExpanded, setTagsExpanded] = useState(false)
  const [allEventos, setAllEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ctrl = new AbortController()
    setLoading(true)
    setSelectedTag(null)
    getEventos({ search: debouncedSearch || undefined, limit: 100, signal: ctrl.signal })
      .then((result) => {
        const data = result.data
        setAllEventos(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if ((err as Error)?.name === "AbortError") return
        setAllEventos([])
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false)
      })
    return () => ctrl.abort()
  }, [debouncedSearch])

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()
    allEventos.forEach((e) => e.etiquetas.forEach((t) => tagSet.add(t)))
    return Array.from(tagSet).sort()
  }, [allEventos])

  const filtered = useMemo(() => {
    if (!selectedTag) return allEventos
    return allEventos.filter((e) => e.etiquetas.includes(selectedTag))
  }, [allEventos, selectedTag])

  const proximos = useMemo(() => {
    const now = Date.now()
    return filtered
      .filter((e) => new Date(e.fecha).getTime() >= now)
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
  }, [filtered])
  const pasados = useMemo(() => {
    const now = Date.now()
    return filtered
      .filter((e) => new Date(e.fecha).getTime() < now)
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
  }, [filtered])

  const stats = useMemo(() => {
    const now = Date.now()
    const futuros = allEventos
      .filter((e) => new Date(e.fecha).getTime() >= now)
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    const closest = futuros.length > 0
      ? Math.round(
          (new Date(futuros[0].fecha).getTime() - now) / (1000 * 60 * 60 * 24)
        )
      : 0
    return {
      total: allEventos.length,
      proximos: futuros.length,
      diasProximo: Math.max(0, closest),
    }
  }, [allEventos])

  const clearFilters = () => {
    setSearch("")
    setSelectedTag(null)
  }
  const hasActive = !!search || !!selectedTag

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
        <div
          aria-hidden
          className="jmv-spin-slow"
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 500,
            height: 500,
            borderRadius: "50%",
            border: "1px dashed rgba(243,167,54,0.16)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          className="jmv-pulse-soft"
          style={{
            position: "absolute",
            top: 80,
            right: 60,
            width: 280,
            height: 280,
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
            right: 240,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: JMV.celeste,
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
              <span style={{ display: "inline-block", width: 36, height: 1, background: JMV.gold }} />
              <span>Eventos</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>JMV República Dominicana</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span style={{ color: JMV.gold }}>Calendario nacional</span>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "end" }}>
            <div>
              <Reveal delay={120} y={20}>
                <Eyebrow color={JMV.gold}>Eventos JMV</Eyebrow>
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
                  Lo que <span style={{ fontStyle: "italic", color: JMV.gold, fontWeight: 300 }}>vivimos</span>
                  <br />
                  <span style={{ fontStyle: "italic", color: JMV.celeste, fontWeight: 300 }}>juntos</span>.
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
                Asambleas, encuentros, retiros, peregrinaciones, vigilias. El calendario de la familia JMV-RD
                — fechas, lugares, agendas e información para participar.
              </p>
            </Reveal>
          </div>

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
                { k: "Eventos publicados", v: String(stats.total || 0), color: JMV.ink },
                { k: "Próximos", v: String(stats.proximos || 0), color: JMV.celeste },
                { k: "Días al próximo", v: String(stats.diasProximo || 0), color: JMV.gold },
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

      {/* FILTERS BAR (sticky compact) */}
      <section
        style={{
          position: "sticky",
          top: 64,
          zIndex: 5,
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderTop: "1px solid " + JMV.line,
          borderBottom: "1px solid " + JMV.line,
          padding: "12px 32px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "nowrap",
              minHeight: 44,
            }}
          >
            <div style={{ position: "relative", flex: "1 1 auto", maxWidth: 480 }}>
              <span
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: JMV.mute,
                  pointerEvents: "none",
                }}
              >
                <Icon name="search" size={14} />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar eventos..."
                style={{
                  width: "100%",
                  padding: "10px 36px 10px 38px",
                  background: JMV.white,
                  border: "1px solid " + JMV.line,
                  borderRadius: 999,
                  fontFamily: FONT_UI,
                  fontSize: 13,
                  color: JMV.ink,
                  outline: "none",
                  transition: "border-color .15s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = JMV.ink)}
                onBlur={(e) => (e.currentTarget.style.borderColor = JMV.line)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Limpiar"
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: JMV.mute,
                    fontSize: 18,
                    width: 18,
                    height: 18,
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              )}
            </div>

            {!loading && availableTags.length > 0 && (
              <button
                onClick={() => setTagsExpanded((v) => !v)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: tagsExpanded || selectedTag ? JMV.gold : "transparent",
                  color: tagsExpanded || selectedTag ? "#fff" : JMV.body,
                  border: "1px solid " + (tagsExpanded || selectedTag ? JMV.gold : JMV.line),
                  fontFamily: FONT_UI,
                  fontSize: 12.5,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all .15s ease",
                  flexShrink: 0,
                }}
              >
                Etiquetas
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 20,
                    height: 18,
                    padding: "0 5px",
                    borderRadius: 999,
                    background:
                      tagsExpanded || selectedTag ? "rgba(255,255,255,0.25)" : JMV.line,
                    fontSize: 11,
                    fontWeight: 600,
                    color: tagsExpanded || selectedTag ? "#fff" : JMV.body,
                  }}
                >
                  {selectedTag ? 1 : availableTags.length}
                </span>
                <span
                  aria-hidden
                  style={{
                    display: "inline-flex",
                    transition: "transform .2s ease",
                    transform: tagsExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <Icon
                    name="chevron"
                    size={11}
                    color={tagsExpanded || selectedTag ? "#fff" : JMV.mute}
                  />
                </span>
              </button>
            )}

            <span
              style={{
                fontFamily: FONT_UI,
                fontSize: 12,
                color: JMV.mute,
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "..." : `${filtered.length} evento${filtered.length !== 1 ? "s" : ""}`}
            </span>

            {hasActive && (
              <button
                onClick={clearFilters}
                style={{
                  background: "transparent",
                  border: "none",
                  color: JMV.mute,
                  fontFamily: FONT_UI,
                  fontSize: 12,
                  cursor: "pointer",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
              >
                × Limpiar
              </button>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateRows: tagsExpanded ? "1fr" : "0fr",
              transition: "grid-template-rows .35s cubic-bezier(.2,.7,.2,1)",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              {!loading && availableTags.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    paddingTop: tagsExpanded ? 12 : 0,
                    transition: "padding-top .25s ease",
                  }}
                >
                  {availableTags.map((tag) => {
                    const active = selectedTag === tag
                    return (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(active ? null : tag)}
                        style={{
                          padding: "7px 14px",
                          borderRadius: 999,
                          fontFamily: FONT_UI,
                          fontSize: 12.5,
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all .15s ease",
                          background: active ? JMV.gold : "transparent",
                          color: active ? "#fff" : JMV.body,
                          border: "1px solid " + (active ? JMV.gold : JMV.line),
                          flexShrink: 0,
                        }}
                      >
                        {tag}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: JMV.white, padding: "80px 32px 120px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {loading ? (
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 15,
                color: JMV.mute,
                textAlign: "center",
                padding: "60px 0",
              }}
            >
              Cargando eventos...
            </p>
          ) : filtered.length === 0 ? (
            <div
              style={{
                padding: "80px 32px",
                textAlign: "center",
                border: "1px dashed " + JMV.line,
                borderRadius: 4,
                background: JMV.paper,
              }}
            >
              <Serif size={28} weight={300} style={{ display: "block", marginBottom: 10 }}>
                Sin resultados
              </Serif>
              <p style={{ fontFamily: FONT_BODY, fontSize: 14.5, color: JMV.mute, margin: 0 }}>
                {hasActive
                  ? "No hay eventos que coincidan con los filtros."
                  : "Aún no hay eventos publicados."}
              </p>
              {hasActive && (
                <button
                  onClick={clearFilters}
                  className="jmv-ghost-pill"
                  style={{ marginTop: 24, textDecoration: "none" }}
                >
                  Limpiar filtros <Icon name="arrowUR" size={13} />
                </button>
              )}
            </div>
          ) : (
            <>
              {proximos.length > 0 && (
                <section style={{ marginBottom: pasados.length > 0 ? 96 : 0 }}>
                  <Reveal delay={0} y={20}>
                    <div style={{ marginBottom: 36 }}>
                      <Eyebrow color={JMV.celeste}>Próximamente</Eyebrow>
                      <Serif size={44} weight={300} style={{ display: "block", marginTop: 16 }}>
                        Eventos que <span style={{ fontStyle: "italic", color: JMV.celeste }}>vienen</span>.
                      </Serif>
                    </div>
                  </Reveal>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                      gap: 28,
                    }}
                  >
                    {proximos.map((e, i) => (
                      <Reveal key={e.id} delay={i * 80} y={28}>
                        <EventoCardEditorial evento={e} variant="upcoming" />
                      </Reveal>
                    ))}
                  </div>
                </section>
              )}

              {pasados.length > 0 && (
                <section>
                  <Reveal delay={0} y={20}>
                    <div style={{ marginBottom: 36 }}>
                      <Eyebrow color={JMV.gold}>{proximos.length > 0 ? "Memoria reciente" : "Eventos"}</Eyebrow>
                      <Serif size={44} weight={300} style={{ display: "block", marginTop: 16 }}>
                        {proximos.length > 0 ? "Lo que ya " : "Todos los "}
                        <span style={{ fontStyle: "italic", color: JMV.gold }}>
                          {proximos.length > 0 ? "celebramos" : "eventos"}
                        </span>
                        .
                      </Serif>
                    </div>
                  </Reveal>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                      gap: 28,
                    }}
                  >
                    {pasados.map((e, i) => (
                      <Reveal key={e.id} delay={i * 70} y={26}>
                        <EventoCardEditorial evento={e} />
                      </Reveal>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}

export function EventoCardEditorial({
  evento,
  variant = "regular",
}: {
  evento: Evento
  variant?: "regular" | "upcoming"
}) {
  const isUpcoming = variant === "upcoming"
  const date = new Date(evento.fecha)
  const day = date.getDate()
  const monthShort = date.toLocaleDateString("es-DO", { month: "short" }).replace(".", "").toUpperCase()
  const year = date.getFullYear()

  return (
    <Link
      href={`/eventos/${evento.slug}`}
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
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 11",
          background: JMV.mist,
          overflow: "hidden",
        }}
      >
        {evento.imagenUrl ? (
          <Image
            src={evento.imagenUrl}
            alt={evento.titulo}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover", transition: "transform .6s cubic-bezier(.2,.7,.2,1)" }}
            className="jmv-miembro-img"
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

        {/* Date block top-left */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            padding: "10px 14px",
            background: "rgba(255,255,255,0.96)",
            borderRadius: 6,
            backdropFilter: "blur(8px)",
            textAlign: "center",
            minWidth: 56,
            boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 24,
              fontWeight: 400,
              color: JMV.ink,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {day}
          </div>
          <div
            style={{
              fontFamily: FONT_UI,
              fontSize: 9.5,
              letterSpacing: "0.18em",
              color: isUpcoming ? JMV.celeste : JMV.gold,
              marginTop: 3,
              fontWeight: 600,
            }}
          >
            {monthShort} {year}
          </div>
        </div>

        {isUpcoming && (
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 11px",
              background: JMV.celeste,
              borderRadius: 999,
              fontFamily: FONT_UI,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            }}
          >
            <span
              className="jmv-pulse-soft"
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "#fff",
              }}
            />
            Próximo
          </div>
        )}
      </div>

      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: FONT_UI,
            fontSize: 11.5,
            color: JMV.mute,
            marginBottom: 12,
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <Icon name="clock" size={11} color={isUpcoming ? JMV.celeste : JMV.gold} />
            {evento.hora}
          </span>
          <span style={{ color: JMV.line }}>·</span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              flex: 1,
              minWidth: 0,
            }}
          >
            <Icon name="pin" size={11} color={JMV.mute} />
            <span
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {evento.ubicacion}
            </span>
          </span>
        </div>

        <h3
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 22,
            fontWeight: 400,
            color: JMV.ink,
            margin: "0 0 10px",
            lineHeight: 1.2,
            letterSpacing: "-0.005em",
          }}
        >
          {evento.titulo}
        </h3>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 14,
            lineHeight: 1.6,
            color: JMV.body,
            margin: 0,
            marginBottom: 16,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {evento.descripcionBreve}
        </p>

        {evento.etiquetas.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {evento.etiquetas.slice(0, 3).map((t) => (
              <Tag key={t} tone={isUpcoming ? "celeste" : "gold"}>
                {t}
              </Tag>
            ))}
            {evento.etiquetas.length > 3 && (
              <Tag tone="neutral">+{evento.etiquetas.length - 3}</Tag>
            )}
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
          <span>Ver detalles</span>
          <Icon name="arrowUR" size={13} color={isUpcoming ? JMV.celeste : JMV.gold} />
        </div>
      </div>
    </Link>
  )
}
