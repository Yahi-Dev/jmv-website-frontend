// src/features/actividades/components/ActividadDetail.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Eyebrow, Icon, Serif } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import { ActividadJmv } from "../model/types"
import { useActividad } from "../hook/use-actividades"
import { getActividades } from "../service/actividad-service"
import { ActividadCardEditorial } from "./ActividadList"
import "@/src/features/home/ui-kit/jmv-ui-kit.css"

interface Props {
  slug: string
}

export function ActividadDetail({ slug }: Props) {
  const { actividad, loading, notFound } = useActividad(slug)
  const [related, setRelated] = useState<ActividadJmv[]>([])

  useEffect(() => {
    if (!actividad?.centroId) return
    getActividades({ centroId: actividad.centroId, limit: 6 })
      .then((r) => {
        const list = Array.isArray(r.data) ? r.data : []
        setRelated(list.filter((a) => a.slug !== slug).slice(0, 3))
      })
      .catch(() => {})
  }, [actividad?.centroId, slug])

  // Loading
  if (loading) {
    return (
      <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
        <Navbar />
        <div style={{ padding: "120px 32px", textAlign: "center" }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: JMV.mute }}>Cargando actividad...</p>
        </div>
        <FooterSection />
      </div>
    )
  }

  // Not found
  if (notFound || !actividad) {
    return (
      <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
        <Navbar />
        <div style={{ padding: "120px 32px", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Icon name="calendar" size={56} color={JMV.line} />
          <Serif size={48} weight={300} style={{ display: "block", marginTop: 24 }}>
            Actividad no <span style={{ fontStyle: "italic", color: JMV.gold }}>encontrada</span>
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
            La actividad que buscas no existe o fue eliminada.
          </p>
          <Link href="/actividades" className="jmv-ghost-pill" style={{ textDecoration: "none" }}>
            <Icon name="arrow" size={13} /> Ver todas las actividades
          </Link>
        </div>
        <FooterSection />
      </div>
    )
  }

  const date = new Date(actividad.fecha)
  const isFuture = date.getTime() >= Date.now()
  const accent = isFuture ? JMV.celeste : JMV.gold
  const dateLong = date.toLocaleDateString("es-DO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  // Days difference for visual cue
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
        <div style={{ position: "relative", width: "100%", height: 540, background: JMV.mist }}>
          {actividad.imagenUrl ? (
            <Image
              src={actividad.imagenUrl}
              alt={actividad.titulo}
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
                background: `linear-gradient(135deg, ${JMV.celeste} 0%, ${JMV.blue} 100%)`,
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

          {/* Top: Back link */}
          <div style={{ position: "absolute", top: 24, left: 0, right: 0, padding: "0 32px" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
              <Link
                href="/actividades"
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
                <Icon name="arrow" size={13} /> Actividades
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
                    gap: 12,
                    marginBottom: 22,
                    flexWrap: "wrap",
                  }}
                >
                  {actividad.centro && (
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
                      <Icon name="building" size={11} color="#fff" />
                      {actividad.centro.nombreParroquia}
                    </span>
                  )}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(8px)",
                      borderRadius: 999,
                      fontFamily: FONT_UI,
                      fontSize: 10.5,
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.25)",
                    }}
                  >
                    {isFuture && (
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
                    )}
                    {daysLabel}
                  </span>
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
                  {actividad.titulo}
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
                    textTransform: "capitalize",
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Icon name="calendar" size={14} color="#fff" />
                    {dateLong}
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
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) 1fr", gap: 80, alignItems: "start" }}>
            {/* MAIN COLUMN */}
            <article>
              {/* Lead — resumen */}
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
                    marginBottom: 48,
                    paddingLeft: 24,
                    borderLeft: `3px solid ${accent}`,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {actividad.resumen}
                </p>
              </Reveal>

              {/* Tags */}
              {actividad.etiquetas.length > 0 && (
                <Reveal delay={120} y={16}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 48,
                    }}
                  >
                    {actividad.etiquetas.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "6px 14px",
                          background:
                            accent === JMV.gold ? "rgba(243,167,54,0.10)" : "rgba(19,159,204,0.08)",
                          border: "1px solid " + (accent === JMV.gold ? "rgba(243,167,54,0.35)" : "rgba(19,159,204,0.25)"),
                          borderRadius: 999,
                          fontFamily: FONT_UI,
                          fontSize: 12,
                          fontWeight: 500,
                          color: accent === JMV.gold ? "#8A5A00" : JMV.celeste,
                          letterSpacing: "0.02em",
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: 999,
                            background: accent,
                            opacity: 0.85,
                          }}
                        />
                        {tag}
                      </span>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* Detail content placeholder — actividades doesn't have descripcionCompleta,
                  so we re-show the resumen as body content with prose styling. */}
              <Reveal delay={200} y={20}>
                <div
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 17,
                    lineHeight: 1.8,
                    color: JMV.body,
                  }}
                >
                  <p style={{ margin: 0 }}>{actividad.resumen}</p>
                </div>
              </Reveal>

              {/* CTA card — visit centro */}
              {actividad.centro && (
                <Reveal delay={300} y={24}>
                  <div
                    style={{
                      marginTop: 56,
                      padding: 28,
                      background: JMV.paper,
                      border: "1px solid " + JMV.line,
                      borderLeft: `4px solid ${accent}`,
                      borderRadius: 4,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONT_UI,
                        fontSize: 10.5,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: accent,
                        fontWeight: 600,
                        marginBottom: 10,
                      }}
                    >
                      Organiza esta actividad
                    </div>
                    <Serif size={26} weight={400} style={{ display: "block", marginBottom: 8 }}>
                      {actividad.centro.nombreParroquia}
                    </Serif>
                    <p
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 14.5,
                        color: JMV.body,
                        margin: "0 0 18px",
                        lineHeight: 1.6,
                      }}
                    >
                      Conoce más sobre el centro que organiza esta actividad — su historia, equipo, comunidades
                      y otras actividades.
                    </p>
                    <Link
                      href={`/centros/${getCentroSlug(actividad)}`}
                      className="jmv-ghost-pill"
                      style={{ textDecoration: "none" }}
                    >
                      Ver centro <Icon name="arrowUR" size={13} />
                    </Link>
                  </div>
                </Reveal>
              )}
            </article>

            {/* SIDEBAR */}
            <aside style={{ position: "sticky", top: 100 }}>
              <Reveal delay={300} y={20}>
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
                    <SidebarRow icon="calendar" label="Fecha" accent={accent}>
                      <span style={{ textTransform: "capitalize" }}>{dateLong}</span>
                    </SidebarRow>
                    {actividad.centro && (
                      <SidebarRow icon="building" label="Centro" accent={accent}>
                        {actividad.centro.nombreParroquia}
                      </SidebarRow>
                    )}
                    <SidebarRow icon="clock" label="Estado" accent={accent}>
                      {daysLabel}
                    </SidebarRow>
                  </div>
                </div>

                {/* Big date display */}
                <div
                  style={{
                    background: JMV.white,
                    border: "1px solid " + JMV.line,
                    borderRadius: 4,
                    padding: "32px 28px",
                    textAlign: "center",
                    boxShadow: "0 18px 40px -22px rgba(25,22,141,0.18)",
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
                </div>
              </Reveal>
            </aside>
          </div>

          {/* RELATED */}
          {related.length > 0 && (
            <section
              style={{
                marginTop: 100,
                paddingTop: 64,
                borderTop: "1px solid " + JMV.line,
              }}
            >
              <Reveal delay={0} y={20}>
                <div style={{ marginBottom: 36 }}>
                  <Eyebrow color={JMV.gold}>Más del mismo centro</Eyebrow>
                  <Serif size={42} weight={300} style={{ display: "block", marginTop: 16 }}>
                    Otras <span style={{ fontStyle: "italic", color: JMV.gold }}>actividades</span>.
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
                {related.map((rel, i) => (
                  <Reveal key={rel.id} delay={i * 90} y={28}>
                    <ActividadCardEditorial actividad={rel} />
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}

// Build a centro slug from the actividad's centro reference. Since the activity
// only has the centro name (not the slug), we slugify it for the link target.
function getCentroSlug(actividad: ActividadJmv): string {
  const slugFromActividad = actividad.slug.split("-")[0] // best-effort guess
  // The activity slug typically begins with the centro slug; if not, fall back
  // to a slugified parroquia name.
  if (actividad.centro?.nombreParroquia) {
    const guess = slugFromActividad
    if (guess && guess.length > 2) return guess
    return actividad.centro.nombreParroquia
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }
  return slugFromActividad
}

function SidebarRow({
  icon,
  label,
  accent,
  children,
}: {
  icon: "calendar" | "clock" | "building"
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
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
