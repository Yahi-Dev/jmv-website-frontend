"use client"

import { useRouter } from "next/navigation"
import { Eyebrow, Serif, Icon, Tag, PhotoTile } from "../ui-kit/Primitives"
import { JMV, FONT_DISPLAY, FONT_UI } from "../ui-kit/tokens"

type Kind = "community" | "prayer" | "service" | "landscape" | "dark"

const items: {
  day: string
  mon: string
  y: string
  title: string
  type: string
  loc: string
  time: string
  kind: Kind
}[] = [
  { day: "15", mon: "Dic", y: "2024", title: "Taller de Liderazgo JMV", type: "Formación", loc: "Santo Domingo", time: "9:00 AM", kind: "community" },
  { day: "22", mon: "Dic", y: "2024", title: "Misión de Adviento", type: "Misión", loc: "Monte Plata", time: "7:00 AM", kind: "service" },
  { day: "28", mon: "Dic", y: "2024", title: "Vigilia Mariana", type: "Espiritualidad", loc: "Santiago", time: "8:00 PM", kind: "prayer" },
  { day: "12", mon: "Ene", y: "2025", title: "Encuentro Nacional de Centros", type: "Comunidad", loc: "La Vega", time: "10:00 AM", kind: "landscape" },
]

export function ActivitiesSection() {
  const router = useRouter()
  const onAll = () => router.push("/eventos")

  return (
    <section style={{ background: JMV.white, padding: "120px 32px", borderTop: "1px solid " + JMV.line }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
          <div>
            <Eyebrow>Actualidad</Eyebrow>
            <Serif size={56} weight={300} style={{ display: "block", marginTop: 20 }}>
              Próximos encuentros
            </Serif>
          </div>
          <span
            onClick={onAll}
            className="jmv-arrow-link"
            style={{ cursor: "pointer", fontFamily: FONT_UI, fontSize: 13.5, color: JMV.ink, display: "inline-flex", alignItems: "center", gap: 8, borderBottom: "1px solid " + JMV.ink, paddingBottom: 4 }}
          >
            Ver todos los eventos <Icon name="arrowUR" size={14} />
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {items.map((a, i) => (
            <div key={i} className="jmv-event-card" style={{ cursor: "pointer" }} onClick={onAll}>
              <PhotoTile h={260} label={a.type.toUpperCase()} kind={a.kind} />
              <div style={{ padding: "20px 4px 0" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "baseline", marginBottom: 12 }}>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 300, color: JMV.ink, lineHeight: 1, letterSpacing: "-0.02em" }}>
                    {a.day}
                  </span>
                  <span style={{ fontFamily: FONT_UI, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: JMV.mute }}>
                    {a.mon} {a.y}
                  </span>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <Tag tone="primary">{a.type}</Tag>
                </div>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 400, color: JMV.ink, margin: "0 0 10px", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                  {a.title}
                </h3>
                <div style={{ display: "flex", gap: 14, fontSize: 12.5, color: JMV.mute, fontFamily: FONT_UI }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <Icon name="pin" size={12} />
                    {a.loc}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <Icon name="clock" size={12} />
                    {a.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
