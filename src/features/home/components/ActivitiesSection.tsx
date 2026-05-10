"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eyebrow, Serif, Icon, Tag, PhotoTile } from "../ui-kit/Primitives"
import { Reveal } from "../ui-kit/Reveal"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "../ui-kit/tokens"
import { getEventos } from "@/src/features/eventos/service/evento-service"
import type { Evento } from "@/src/features/eventos/model/types"

type Kind = "community" | "prayer" | "service" | "landscape" | "dark"

// Map first etiqueta to a PhotoTile kind so the fallback gradient feels
// thematically consistent with the event's main tag.
function kindFromTags(etiquetas: string[]): Kind {
  const first = (etiquetas[0] || "").toLowerCase()
  if (/misi[oó]n|servicio|caridad/.test(first)) return "service"
  if (/oraci[oó]n|espiritual|vigilia|mariano|peregrin/.test(first)) return "prayer"
  if (/comunidad|encuentro|aniversario|cultural/.test(first)) return "community"
  if (/regional|cibao|sur|nacional/.test(first)) return "landscape"
  return "community"
}

const MONTH_SHORT_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

export function ActivitiesSection() {
  const router = useRouter()
  const onAll = () => router.push("/eventos")

  const [eventos, setEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEventos({ limit: 30 })
      .then((r) => setEventos(Array.isArray(r.data) ? r.data : []))
      .catch(() => setEventos([]))
      .finally(() => setLoading(false))
  }, [])

  // Next 4 upcoming events, sorted by date ascending
  const proximos = useMemo(() => {
    const now = Date.now()
    return eventos
      .filter((e) => new Date(e.fecha).getTime() >= now)
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
      .slice(0, 4)
  }, [eventos])

  // Hide the whole section if there are no upcoming events at all
  if (!loading && proximos.length === 0) return null

  return (
    <section style={{ background: JMV.white, padding: "120px 32px", borderTop: "1px solid " + JMV.line }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
          <Reveal delay={0} y={20}>
            <div>
              <Eyebrow>Actualidad</Eyebrow>
              <Serif size={56} weight={300} style={{ display: "block", marginTop: 20 }}>
                Próximos encuentros
              </Serif>
            </div>
          </Reveal>
          <Reveal delay={180} y={16}>
            <span
              onClick={onAll}
              className="jmv-arrow-link"
              style={{ cursor: "pointer", fontFamily: FONT_UI, fontSize: 13.5, color: JMV.ink, display: "inline-flex", alignItems: "center", gap: 8, borderBottom: "1px solid " + JMV.ink, paddingBottom: 4 }}
            >
              Ver todos los eventos <Icon name="arrowUR" size={14} />
            </span>
          </Reveal>
        </div>

        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  background: JMV.mist,
                  height: 260,
                  borderRadius: 4,
                  opacity: 0.5,
                  animation: "jmv-pulse-soft 1.6s ease-in-out infinite",
                }}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(proximos.length, 4)}, 1fr)`, gap: 24 }}>
            {proximos.map((e, i) => {
              const date = new Date(e.fecha)
              const day = date.getDate()
              const monthShort = MONTH_SHORT_ES[date.getMonth()]
              const year = date.getFullYear()
              const tipo = e.etiquetas[0] || "Encuentro"

              return (
                <Reveal key={e.id} delay={i * 110} y={28}>
                  <Link
                    href={`/eventos/${e.slug}`}
                    className="jmv-event-card"
                    style={{
                      cursor: "pointer",
                      display: "block",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {e.imagenUrl ? (
                      <div
                        style={{
                          position: "relative",
                          height: 260,
                          borderRadius: 4,
                          overflow: "hidden",
                          background: JMV.mist,
                        }}
                      >
                        <Image
                          src={e.imagenUrl}
                          alt={e.titulo}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="jmv-miembro-img"
                          style={{ objectFit: "cover", transition: "transform .6s cubic-bezier(.2,.7,.2,1)" }}
                        />
                        <div
                          aria-hidden
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(180deg, rgba(11,16,32,0.0) 50%, rgba(11,16,32,0.55) 100%)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 14,
                            left: 14,
                            fontFamily: FONT_UI,
                            fontSize: 10,
                            letterSpacing: "0.2em",
                            color: "rgba(255,255,255,0.85)",
                            textTransform: "uppercase",
                            fontWeight: 600,
                          }}
                        >
                          {tipo}
                        </div>
                      </div>
                    ) : (
                      <PhotoTile h={260} label={tipo.toUpperCase()} kind={kindFromTags(e.etiquetas)} />
                    )}
                    <div style={{ padding: "20px 4px 0" }}>
                      <div style={{ display: "flex", gap: 14, alignItems: "baseline", marginBottom: 12 }}>
                        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 300, color: JMV.ink, lineHeight: 1, letterSpacing: "-0.02em" }}>
                          {day}
                        </span>
                        <span style={{ fontFamily: FONT_UI, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: JMV.mute }}>
                          {monthShort} {year}
                        </span>
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <Tag tone="primary">{tipo}</Tag>
                      </div>
                      <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 400, color: JMV.ink, margin: "0 0 10px", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                        {e.titulo}
                      </h3>
                      <div style={{ display: "flex", gap: 14, fontSize: 12.5, color: JMV.mute, fontFamily: FONT_UI, flexWrap: "wrap" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                          <Icon name="pin" size={12} />
                          <span style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {e.ubicacion}
                          </span>
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                          <Icon name="clock" size={12} />
                          {e.hora}
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
