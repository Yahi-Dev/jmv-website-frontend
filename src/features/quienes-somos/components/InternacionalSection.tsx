"use client"

import { Button, Icon, Serif } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"

const stats = [
  { k: "Origen", v: "1830" },
  { k: "Aprobación pontificia", v: "1847" },
  { k: "Centros en 1870", v: "338" },
  { k: "Continentes", v: "5" },
]

export function InternacionalSection() {
  return (
    <section
      style={{
        background: JMV.paper,
        color: JMV.ink,
        padding: "120px 32px",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid " + JMV.line,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 96, alignItems: "center" }}>
          {/* Left — intro */}
          <Reveal delay={0} y={28}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 28,
              }}
            >
              <span style={{ display: "inline-block", width: 18, height: 1, background: JMV.gold }} />
              <span
                style={{
                  fontFamily: FONT_UI,
                  fontSize: 11,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: JMV.gold,
                  fontWeight: 600,
                }}
              >
                Presencia Mundial
              </span>
            </div>

            <Serif size={72} weight={300} style={{ display: "block" }}>
              Familia vicentina <span style={{ fontStyle: "italic", color: JMV.gold }}>mundial</span>.
            </Serif>

            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 17,
                lineHeight: 1.65,
                color: JMV.body,
                marginTop: 28,
                maxWidth: 520,
              }}
            >
              JMV forma parte de la gran Familia Vicentina, presente en los cinco continentes y unida por el
              carisma de San Vicente de Paúl: anunciar a los pobres la Buena Nueva del amor de Dios mediante el
              servicio. JMV República Dominicana camina unida a esta familia mundial.
            </p>

            <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="https://jmvinter.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Button variant="dark" size="lg">
                  <Icon name="globe" size={16} />
                  Visitar JMV Internacional
                  <Icon name="arrowUR" size={14} />
                </Button>
              </a>
              <a
                href="https://dominicanasolidaria.org/organizacion/juventud-mariana-vicentina-jmv/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Button variant="outline" size="lg">
                  JMV en República Dominicana
                  <Icon name="arrowUR" size={14} />
                </Button>
              </a>
            </div>
          </Reveal>

          {/* Right — stat grid */}
          <Reveal delay={180} y={28}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              borderLeft: "1px solid " + JMV.line,
              borderTop: "1px solid " + JMV.line,
              background: JMV.white,
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "36px 32px",
                  borderRight: "1px solid " + JMV.line,
                  borderBottom: "1px solid " + JMV.line,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: 10.5,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: JMV.mute,
                    marginBottom: 14,
                  }}
                >
                  {s.k}
                </div>
                <Serif size={56} weight={300}>
                  {s.v}
                </Serif>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
