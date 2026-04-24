"use client"

import { useRouter } from "next/navigation"
import { Eyebrow, Icon, Serif } from "@/src/features/home/ui-kit/Primitives"
import { CountUp } from "@/src/features/home/ui-kit/CountUp"
import { JMV, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"

export function HeroQuienes() {
  const router = useRouter()
  return (
    <section style={{ background: JMV.white, padding: "56px 32px 80px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Meta row */}
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
          <span>Sobre Nosotros</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>JMV República Dominicana</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span style={{ color: JMV.gold }}>Desde 1995</span>
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "end" }}>
          <div>
            <Eyebrow>Quiénes Somos</Eyebrow>
            <h1
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "clamp(3rem, 7vw, 6.4rem)",
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: "-0.025em",
                color: JMV.ink,
                margin: "28px 0 0",
                fontVariationSettings: '"opsz" 144, "SOFT" 50',
              }}
            >
              Jóvenes de <span style={{ fontStyle: "italic", color: JMV.gold, fontWeight: 300 }}>fe</span>,
              <br />
              vida y <span style={{ fontStyle: "italic", fontWeight: 300 }}>servicio</span>.
            </h1>
          </div>

          <div>
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
              La Juventud Mariana Vicenciana es una familia de jóvenes católicos que camina al estilo de María y
              San Vicente de Paúl — formándose, orando y sirviendo a los más necesitados. Esta es nuestra historia
              y el carisma que nos mueve.
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              <button className="jmv-ghost-pill" onClick={() => router.push("/formacion")}>
                Conoce nuestra Formación <Icon name="arrowUR" size={13} />
              </button>
              <button className="jmv-ghost-pill" onClick={() => router.push("/consejos")}>
                Miembros Nacionales <Icon name="arrowUR" size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom stat row */}
        <div
          style={{
            marginTop: 96,
            padding: "24px 0 0",
            borderTop: "1px solid " + JMV.line,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
          }}
        >
          {[
            { k: "Fundación", v: "1995" },
            { k: "Centros Activos", v: "15+" },
            { k: "Jóvenes", v: "500+" },
            { k: "Presencia Mundial", v: "50 países" },
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
              <Serif size={36} weight={300}>
                <CountUp value={s.v} />
              </Serif>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
