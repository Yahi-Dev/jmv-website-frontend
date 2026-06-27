"use client"

import { useRouter } from "next/navigation"
import { Eyebrow, Icon, Serif } from "@/src/features/home/ui-kit/Primitives"
import { CountUp } from "@/src/features/home/ui-kit/CountUp"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"

export function HeroQuienes() {
  const router = useRouter()
  return (
    <section style={{ background: JMV.white, padding: "56px 32px 80px", position: "relative", overflow: "hidden" }}>
      {/* Decorative ornaments */}
      <div
        aria-hidden
        className="jmv-spin-slow"
        style={{
          position: "absolute",
          top: -200,
          right: -220,
          width: 520,
          height: 520,
          borderRadius: "50%",
          border: "1px dashed rgba(243,167,54,0.14)",
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
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(243,167,54,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        className="jmv-float-slow"
        style={{
          position: "absolute",
          top: 200,
          right: 200,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: JMV.gold,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        {/* Meta row */}
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
            <span>Sobre Nosotros</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>JMV República Dominicana</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ color: JMV.gold }}>Desde 1830</span>
          </div>
        </Reveal>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "end" }}>
          <div>
            <Reveal delay={120} y={20}>
              <Eyebrow>Quiénes Somos</Eyebrow>
            </Reveal>
            <Reveal delay={220} y={32}>
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
                vida y <span style={{ fontStyle: "italic", color: JMV.celeste, fontWeight: 300 }}>servicio</span>.
              </h1>
            </Reveal>
          </div>

          <Reveal delay={380} y={20}>
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
          </Reveal>
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
            { k: "Origen", v: "1830" },
            { k: "Aprobación pontificia", v: "1847" },
            { k: "Pilares", v: "4" },
            { k: "Notas distintivas", v: "5" },
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
