import { Eyebrow } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"

export function HeroFormacion() {
  return (
    <section style={{ background: JMV.white, padding: "56px 32px 80px", position: "relative", overflow: "hidden" }}>
      {/* Decorative ornaments */}
      <div
        aria-hidden
        className="jmv-spin-slow"
        style={{
          position: "absolute",
          top: -200,
          left: -200,
          width: 480,
          height: 480,
          borderRadius: "50%",
          border: "1px dashed rgba(19,159,204,0.16)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        className="jmv-pulse-soft"
        style={{
          position: "absolute",
          top: 80,
          left: 80,
          width: 240,
          height: 240,
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
          left: 220,
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
            <span>Formación</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>JMV República Dominicana</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ color: JMV.gold }}>Crecimiento Integral</span>
          </div>
        </Reveal>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "end" }}>
          <div>
            <Reveal delay={120} y={20}>
              <Eyebrow>Formación JMV</Eyebrow>
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
                Crecer en <span style={{ fontStyle: "italic", color: JMV.gold, fontWeight: 300 }}>fe</span>,
                <br />
                vida y <span style={{ fontStyle: "italic", color: JMV.celeste, fontWeight: 300 }}>liderazgo</span>.
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
                Programas de formación integral que fortalecen la fe, desarrollan el liderazgo y preparan para el
                servicio. Recursos, módulos y materiales para acompañar tu camino dentro de JMV.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
