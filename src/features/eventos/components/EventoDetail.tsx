// src/features/eventos/components/EventoDetail.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Eyebrow, Icon, Serif } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import { EventoShareButtons } from "./EventoShareButtons"
import { useEvento } from "../hook/use-eventos"

interface Props {
  slug: string
}

export function EventoDetail({ slug }: Props) {
  const { evento, loading, notFound } = useEvento(slug)

  if (loading) {
    return (
      <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
        <Navbar />
        <div style={{ padding: "120px 32px", textAlign: "center" }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: JMV.mute }}>Cargando evento...</p>
        </div>
        <FooterSection />
      </div>
    )
  }

  if (notFound || !evento) {
    return (
      <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
        <Navbar />
        <div style={{ padding: "120px 32px", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Icon name="calendar" size={56} color={JMV.line} />
          <Serif size={48} weight={300} style={{ display: "block", marginTop: 24 }}>
            Evento no <span style={{ fontStyle: "italic", color: JMV.gold }}>encontrado</span>
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
            El evento que buscas no existe o fue eliminado.
          </p>
          <Link href="/eventos" className="jmv-ghost-pill" style={{ textDecoration: "none" }}>
            <Icon name="arrow" size={13} /> Ver todos los eventos
          </Link>
        </div>
        <FooterSection />
      </div>
    )
  }

  const date = new Date(evento.fecha)
  const isFuture = date.getTime() >= Date.now()
  const accent = isFuture ? JMV.celeste : JMV.gold
  const accentSoft = isFuture ? "rgba(19,159,204,0.08)" : "rgba(243,167,54,0.10)"
  const accentBorder = isFuture ? "rgba(19,159,204,0.25)" : "rgba(243,167,54,0.35)"
  const accentText = isFuture ? JMV.celeste : "#8A5A00"

  const dateLong = date.toLocaleDateString("es-DO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const daysDiff = Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  const daysLabel =
    daysDiff === 0
      ? "Hoy"
      : daysDiff === 1
        ? "Mañana"
        : daysDiff > 0
          ? `En ${daysDiff} días`
          : daysDiff === -1
            ? "Ayer"
            : `Hace ${Math.abs(daysDiff)} días`

  return (
    <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />

      {/* HERO BANNER */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", width: "100%", height: 560, background: JMV.mist }}>
          {evento.imagenUrl ? (
            <Image
              src={evento.imagenUrl}
              alt={evento.titulo}
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
                background: `linear-gradient(135deg, ${JMV.gold} 0%, ${JMV.celeste} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="calendar" size={96} color="rgba(255,255,255,0.3)" />
            </div>
          )}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(11,16,32,0.30) 0%, rgba(11,16,32,0.05) 30%, rgba(11,16,32,0.85) 100%)",
            }}
          />

          <div style={{ position: "absolute", top: 24, left: 0, right: 0, padding: "0 32px" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
              <Link
                href="/eventos"
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
                <Icon name="arrow" size={13} /> Eventos
              </Link>
            </div>
          </div>

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
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 14px",
                      background: accent,
                      borderRadius: 999,
                      fontFamily: FONT_UI,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.20em",
                      textTransform: "uppercase",
                      color: "#fff",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.20)",
                    }}
                  >
                    {isFuture && (
                      <span
                        className="jmv-pulse-soft"
                        style={{ display: "inline-block", width: 6, height: 6, borderRadius: 999, background: "#fff" }}
                      />
                    )}
                    {daysLabel}
                  </span>
                  {evento.etiquetas.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "6px 12px",
                        background: "rgba(255,255,255,0.18)",
                        backdropFilter: "blur(8px)",
                        borderRadius: 999,
                        fontFamily: FONT_UI,
                        fontSize: 10.5,
                        fontWeight: 600,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.25)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={120} y={28}>
                <h1
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "clamp(2.4rem, 5vw, 4.4rem)",
                    fontWeight: 300,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    color: "#fff",
                    margin: 0,
                    maxWidth: 960,
                  }}
                >
                  {evento.titulo}
                </h1>
              </Reveal>

              <Reveal delay={250} y={20}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 22,
                    marginTop: 22,
                    fontFamily: FONT_UI,
                    fontSize: 13.5,
                    color: "rgba(255,255,255,0.92)",
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, textTransform: "capitalize" }}>
                    <Icon name="calendar" size={14} color="#fff" />
                    {dateLong}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Icon name="clock" size={14} color="#fff" />
                    {evento.hora}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Icon name="pin" size={14} color="#fff" />
                    {evento.ubicacion}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section style={{ background: JMV.white, padding: "80px 32px 120px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 2fr) 1fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            {/* MAIN COLUMN */}
            <article style={{ display: "flex", flexDirection: "column", gap: 64 }}>
              {/* Lead */}
              <Reveal delay={0} y={20}>
                <p
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontStyle: "italic",
                    fontSize: 24,
                    fontWeight: 300,
                    lineHeight: 1.5,
                    color: JMV.ink,
                    margin: 0,
                    paddingLeft: 24,
                    borderLeft: `3px solid ${accent}`,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {evento.descripcionBreve}
                </p>
              </Reveal>

              {/* Descripción completa */}
              {evento.descripcionCompleta && (
                <Reveal delay={120} y={20}>
                  <div>
                    <Eyebrow color={accent}>El evento</Eyebrow>
                    <Serif size={36} weight={300} style={{ display: "block", marginTop: 14, marginBottom: 28 }}>
                      Sobre lo que <span style={{ fontStyle: "italic", color: accent }}>nos reúne</span>.
                    </Serif>
                    <p
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 17,
                        lineHeight: 1.8,
                        color: JMV.body,
                        margin: 0,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {evento.descripcionCompleta}
                    </p>
                  </div>
                </Reveal>
              )}

              {/* Actividades */}
              {evento.actividades.length > 0 && (
                <Reveal delay={0} y={24}>
                  <div>
                    <Eyebrow color={accent}>Qué haremos</Eyebrow>
                    <Serif size={36} weight={300} style={{ display: "block", marginTop: 14, marginBottom: 28 }}>
                      <span style={{ fontStyle: "italic", color: accent }}>Actividades</span> incluidas.
                    </Serif>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: 14,
                      }}
                    >
                      {evento.actividades.map((act, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 14,
                            padding: "16px 20px",
                            background: JMV.paper,
                            border: "1px solid " + JMV.line,
                            borderRadius: 4,
                          }}
                        >
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 999,
                              background: accentSoft,
                              border: "1px solid " + accentBorder,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              fontFamily: FONT_DISPLAY,
                              fontSize: 13,
                              fontWeight: 500,
                              color: accentText,
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          <span
                            style={{
                              fontFamily: FONT_BODY,
                              fontSize: 14.5,
                              lineHeight: 1.5,
                              color: JMV.ink,
                              fontWeight: 500,
                            }}
                          >
                            {act}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Agenda */}
              {evento.agenda.length > 0 && (
                <Reveal delay={0} y={24}>
                  <div>
                    <Eyebrow color={accent}>Agenda detallada</Eyebrow>
                    <Serif size={36} weight={300} style={{ display: "block", marginTop: 14, marginBottom: 32 }}>
                      Día por <span style={{ fontStyle: "italic", color: accent }}>día</span>.
                    </Serif>
                    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                      {evento.agenda.map((dia, di) => (
                        <div key={di}>
                          {/* Day header */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 14,
                              marginBottom: 18,
                            }}
                          >
                            <div
                              style={{
                                fontFamily: FONT_DISPLAY,
                                fontStyle: "italic",
                                fontSize: 32,
                                fontWeight: 300,
                                color: accent,
                                lineHeight: 1,
                                letterSpacing: "-0.02em",
                              }}
                            >
                              {String(di + 1).padStart(2, "0")}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  fontFamily: FONT_UI,
                                  fontSize: 10.5,
                                  letterSpacing: "0.22em",
                                  textTransform: "uppercase",
                                  color: JMV.mute,
                                  marginBottom: 2,
                                }}
                              >
                                Día {di + 1}
                              </div>
                              <div
                                style={{
                                  fontFamily: FONT_DISPLAY,
                                  fontSize: 22,
                                  fontWeight: 400,
                                  color: JMV.ink,
                                  letterSpacing: "-0.005em",
                                }}
                              >
                                {dia.dia}
                              </div>
                            </div>
                          </div>

                          {/* Activities for the day */}
                          <div
                            style={{
                              borderTop: "1px solid " + JMV.line,
                            }}
                          >
                            {dia.actividades.map((act, ai) => (
                              <div
                                key={ai}
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "120px 1fr",
                                  gap: 24,
                                  alignItems: "center",
                                  padding: "16px 0",
                                  borderBottom: "1px solid " + JMV.line,
                                }}
                              >
                                <div
                                  style={{
                                    fontFamily: FONT_UI,
                                    fontSize: 12.5,
                                    fontWeight: 600,
                                    letterSpacing: "0.1em",
                                    color: accent,
                                  }}
                                >
                                  {act.hora}
                                </div>
                                <div
                                  style={{
                                    fontFamily: FONT_BODY,
                                    fontSize: 15,
                                    color: JMV.ink,
                                    lineHeight: 1.5,
                                  }}
                                >
                                  {act.actividad}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Requisitos */}
              {evento.requisitos.length > 0 && (
                <Reveal delay={0} y={24}>
                  <div>
                    <Eyebrow color={accent}>Para participar</Eyebrow>
                    <Serif size={36} weight={300} style={{ display: "block", marginTop: 14, marginBottom: 28 }}>
                      <span style={{ fontStyle: "italic", color: accent }}>Requisitos</span> y aportes.
                    </Serif>
                    <div
                      style={{
                        background: JMV.paper,
                        border: "1px solid " + JMV.line,
                        borderLeft: `4px solid ${accent}`,
                        borderRadius: 4,
                        padding: "8px 28px",
                      }}
                    >
                      {evento.requisitos.map((req, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 14,
                            padding: "16px 0",
                            borderBottom:
                              i < evento.requisitos.length - 1 ? "1px solid " + JMV.line : "none",
                          }}
                        >
                          <div
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: 999,
                              background: accent,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: 2,
                              color: "#fff",
                            }}
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span
                            style={{
                              fontFamily: FONT_BODY,
                              fontSize: 15.5,
                              lineHeight: 1.6,
                              color: JMV.body,
                            }}
                          >
                            {req}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </article>

            {/* SIDEBAR */}
            <aside style={{ position: "sticky", top: 100, display: "flex", flexDirection: "column", gap: 24 }}>
              <Reveal delay={300} y={20}>
                {/* Big date display */}
                <div
                  style={{
                    background: JMV.white,
                    border: "1px solid " + JMV.line,
                    borderRadius: 4,
                    padding: "32px 28px",
                    textAlign: "center",
                    boxShadow: "0 18px 40px -22px rgba(25,22,141,0.18)",
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT_UI,
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: accent,
                      fontWeight: 600,
                      marginBottom: 12,
                    }}
                  >
                    {date.toLocaleDateString("es-DO", { weekday: "long" })}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 88,
                      fontWeight: 300,
                      lineHeight: 0.9,
                      color: JMV.ink,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {date.getDate()}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontStyle: "italic",
                      fontSize: 22,
                      fontWeight: 300,
                      color: accent,
                      marginTop: 8,
                    }}
                  >
                    {date.toLocaleDateString("es-DO", { month: "long" })}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_UI,
                      fontSize: 13,
                      color: JMV.mute,
                      marginTop: 6,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {date.getFullYear()}
                  </div>
                  {/* Countdown / past */}
                  <div
                    style={{
                      marginTop: 22,
                      paddingTop: 18,
                      borderTop: "1px solid " + JMV.line,
                      fontFamily: FONT_UI,
                      fontSize: 13,
                      color: JMV.body,
                      fontWeight: 500,
                    }}
                  >
                    {isFuture ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <span
                          className="jmv-pulse-soft"
                          style={{ display: "inline-block", width: 7, height: 7, borderRadius: 999, background: accent }}
                        />
                        {daysLabel}
                      </span>
                    ) : (
                      <span style={{ color: JMV.mute }}>{daysLabel}</span>
                    )}
                  </div>
                </div>

                {/* Info card */}
                <div
                  style={{
                    background: JMV.paper,
                    border: "1px solid " + JMV.line,
                    borderLeft: `4px solid ${accent}`,
                    borderRadius: 4,
                    padding: 28,
                    marginBottom: 24,
                  }}
                >
                  <Eyebrow color={accent}>Información</Eyebrow>
                  <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 18 }}>
                    <SidebarRow icon="clock" label="Horario" accent={accent}>
                      {evento.hora}
                    </SidebarRow>
                    <SidebarRow icon="pin" label="Lugar" accent={accent}>
                      {evento.ubicacion}
                    </SidebarRow>
                    {evento.email && (
                      <SidebarRow icon="mail" label="Correo" accent={accent}>
                        <a
                          href={`mailto:${evento.email}`}
                          style={{
                            color: JMV.ink,
                            textDecoration: "none",
                            wordBreak: "break-all",
                          }}
                        >
                          {evento.email}
                        </a>
                      </SidebarRow>
                    )}
                    {evento.telefono && (
                      <SidebarRow icon="phone" label="Teléfono" accent={accent}>
                        <a
                          href={`tel:${evento.telefono}`}
                          style={{ color: JMV.ink, textDecoration: "none" }}
                        >
                          {evento.telefono}
                        </a>
                      </SidebarRow>
                    )}
                  </div>
                </div>

                {/* Share */}
                <EventoShareButtons titulo={evento.titulo} descripcion={evento.descripcionBreve} />
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}

function SidebarRow({
  icon,
  label,
  accent,
  children,
}: {
  icon: "clock" | "pin" | "mail" | "phone"
  label: string
  accent: string
  children: React.ReactNode
}) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 999,
          background: JMV.white,
          border: "1px solid " + JMV.line,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: accent,
        }}
      >
        <Icon name={icon} size={14} color={accent} />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
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
            lineHeight: 1.4,
            wordBreak: "break-word",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
