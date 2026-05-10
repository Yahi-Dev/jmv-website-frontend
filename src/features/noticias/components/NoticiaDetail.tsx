// src/features/noticias/components/NoticiaDetail.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Eyebrow, Icon, Serif } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import { Noticia } from "../model/types"
import { NoticiaShareButtons } from "./NoticiaShareButtons"
import { useNoticia } from "../hook/use-noticias"
import { getNoticias } from "../service/noticia-service"
import { NoticiaCardEditorial } from "./NoticiasList"

interface Props {
  slug: string
}

export function NoticiaDetail({ slug }: Props) {
  const { noticia, loading, notFound } = useNoticia(slug)
  const [related, setRelated] = useState<Noticia[]>([])

  useEffect(() => {
    if (!noticia) return
    getNoticias({ tipo: noticia.tipo, limit: 6 })
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : []
        setRelated(data.filter((n) => n.slug !== slug).slice(0, 3))
      })
      .catch(() => setRelated([]))
  }, [noticia, slug])

  // Loading
  if (loading) {
    return (
      <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
        <Navbar />
        <div style={{ padding: "120px 32px", textAlign: "center" }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: JMV.mute }}>Cargando noticia...</p>
        </div>
        <FooterSection />
      </div>
    )
  }

  // Not found
  if (notFound || !noticia) {
    return (
      <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
        <Navbar />
        <div style={{ padding: "120px 32px", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Icon name="globe" size={56} color={JMV.line} />
          <Serif size={48} weight={300} style={{ display: "block", marginTop: 24 }}>
            Noticia no <span style={{ fontStyle: "italic", color: JMV.gold }}>encontrada</span>
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
            La noticia que buscas no existe o fue eliminada.
          </p>
          <Link href="/noticias" className="jmv-ghost-pill" style={{ textDecoration: "none" }}>
            <Icon name="arrow" size={13} /> Ver todas las noticias
          </Link>
        </div>
        <FooterSection />
      </div>
    )
  }

  return (
    <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />

      {/* HERO BANNER */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", width: "100%", height: 560, background: JMV.mist }}>
          {noticia.imagenUrl ? (
            <Image
              src={noticia.imagenUrl}
              alt={noticia.titulo}
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
              <Icon name="globe" size={96} color="rgba(255,255,255,0.3)" />
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
                href="/noticias"
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
                <Icon name="arrow" size={13} /> Noticias
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
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 14px",
                      background: JMV.gold,
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
                    {noticia.tipo}
                  </span>
                  {noticia.destacada && (
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
                      <Icon name="star" size={10} color="#fff" />
                      Destacada
                    </span>
                  )}
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
                  {noticia.titulo}
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
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Icon name="calendar" size={14} color="#fff" />
                    {new Date(noticia.fecha).toLocaleDateString("es-DO", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  {noticia.hora && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <Icon name="clock" size={14} color="#fff" />
                      {noticia.hora}
                    </span>
                  )}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Icon name="pin" size={14} color="#fff" />
                    {noticia.ubicacion}
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
                    marginBottom: 48,
                    paddingLeft: 24,
                    borderLeft: `3px solid ${JMV.gold}`,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {noticia.descripcionBreve}
                </p>
              </Reveal>

              {/* Tags */}
              {noticia.etiquetas.length > 0 && (
                <Reveal delay={120} y={16}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 48,
                    }}
                  >
                    {noticia.etiquetas.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "6px 14px",
                          background: "rgba(25,22,141,0.06)",
                          border: "1px solid rgba(25,22,141,0.20)",
                          borderRadius: 999,
                          fontFamily: FONT_UI,
                          fontSize: 12,
                          fontWeight: 500,
                          color: JMV.blue,
                          letterSpacing: "0.02em",
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
                        {tag}
                      </span>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* Body content (TipTap HTML) */}
              {noticia.descripcionCompleta && (
                <Reveal delay={200} y={20}>
                  <div
                    className="jmv-article-body"
                    dangerouslySetInnerHTML={{ __html: noticia.descripcionCompleta }}
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 17,
                      lineHeight: 1.8,
                      color: JMV.body,
                    }}
                  />
                </Reveal>
              )}
            </article>

            {/* SIDEBAR */}
            <aside style={{ position: "sticky", top: 100 }}>
              <Reveal delay={300} y={20}>
                {/* Quick info card */}
                <div
                  style={{
                    background: JMV.paper,
                    border: "1px solid " + JMV.line,
                    borderLeft: `4px solid ${JMV.celeste}`,
                    borderRadius: 4,
                    padding: 28,
                    marginBottom: 24,
                  }}
                >
                  <Eyebrow color={JMV.celeste}>Información</Eyebrow>
                  <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 18 }}>
                    <SidebarRow icon="calendar" label="Fecha">
                      <span style={{ textTransform: "capitalize" }}>
                        {new Date(noticia.fecha).toLocaleDateString("es-DO", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </SidebarRow>
                    {noticia.hora && (
                      <SidebarRow icon="clock" label="Hora">
                        {noticia.hora}
                      </SidebarRow>
                    )}
                    <SidebarRow icon="pin" label="Ubicación">
                      {noticia.ubicacion}
                    </SidebarRow>
                    <SidebarRow icon="globe" label="Categoría">
                      {noticia.tipo}
                    </SidebarRow>
                  </div>
                </div>

                {/* Share buttons */}
                <NoticiaShareButtons titulo={noticia.titulo} descripcion={noticia.descripcionBreve} />
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
                  <Eyebrow color={JMV.gold}>Continúa leyendo</Eyebrow>
                  <Serif size={42} weight={300} style={{ display: "block", marginTop: 16 }}>
                    Noticias <span style={{ fontStyle: "italic", color: JMV.gold }}>relacionadas</span>.
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
                    <NoticiaCardEditorial noticia={rel} />
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

function SidebarRow({
  icon,
  label,
  children,
}: {
  icon: "calendar" | "clock" | "pin" | "globe"
  label: string
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
          color: JMV.celeste,
        }}
      >
        <Icon name={icon} size={14} color={JMV.celeste} />
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
