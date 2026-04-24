"use client"

import { Button, Icon, Serif } from "@/src/features/home/ui-kit/Primitives"
import { JMV, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"

const stats = [
  { k: "Países", v: "50+" },
  { k: "Miembros", v: "1.2M" },
  { k: "Continentes", v: "5" },
  { k: "Años", v: "175+" },
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
          <div>
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
              JMV es un movimiento con presencia en más de 50 países. Como parte de la gran familia vicentina,
              JMV República Dominicana está conectada con jóvenes de todos los continentes que comparten el mismo
              carisma de fe y servicio.
            </p>

            <div style={{ marginTop: 40, display: "flex", gap: 12 }}>
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
            </div>
          </div>

          {/* Right — stat grid */}
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
        </div>
      </div>
    </section>
  )
}
