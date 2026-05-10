"use client"

import Image from "next/image"
import { Eyebrow } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import { useConsejoActual } from "../hook/use-consejos"

export function HeroConsejos() {
  const { consejo } = useConsejoActual()
  const fotoUrl = consejo?.fotoUrl
  const periodo = consejo?.periodo || "2024 — 2026"

  return (
    <section
      style={{
        background: JMV.white,
        padding: "56px 32px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative animated ornaments */}
      <div
        aria-hidden
        className="jmv-spin-slow"
        style={{
          position: "absolute",
          top: -180,
          right: -180,
          width: 480,
          height: 480,
          borderRadius: "50%",
          border: `1px dashed rgba(25,22,141,0.10)`,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        className="jmv-pulse-soft"
        style={{
          position: "absolute",
          top: 100,
          right: 80,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(19,159,204,0.08) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        className="jmv-float-slow"
        style={{
          position: "absolute",
          top: 220,
          right: 220,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: JMV.gold,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle, rgba(25,22,141,0.05) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          pointerEvents: "none",
          maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
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
            <span style={{ display: "inline-block", width: 36, height: 1, background: JMV.blue }} />
            <span>Consejo Nacional</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>JMV República Dominicana</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ color: JMV.celeste }}>Periodo {periodo}</span>
          </div>
        </Reveal>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "end" }}>
          <div>
            <Reveal delay={120} y={20}>
              <Eyebrow color={JMV.blue}>Liderazgo Nacional</Eyebrow>
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
                Llamados a{" "}
                <span style={{ fontStyle: "italic", color: JMV.blue, fontWeight: 300 }}>liderar</span>,
                <br />
                enviados a{" "}
                <span style={{ fontStyle: "italic", color: JMV.celeste, fontWeight: 300 }}>servir</span>.
              </h1>
            </Reveal>
          </div>

          <div>
            {/* Council photo */}
            {fotoUrl && (
              <Reveal delay={300} y={28}>
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4 / 3",
                    borderRadius: 4,
                    overflow: "hidden",
                    background: JMV.mist,
                    marginBottom: 28,
                    boxShadow: "0 24px 60px -28px rgba(25,22,141,0.35)",
                  }}
                >
                  <Image
                    src={fotoUrl}
                    alt={`Consejo Nacional ${periodo}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                  {/* Subtle bottom caption */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      padding: "32px 18px 14px",
                      background: "linear-gradient(180deg, transparent 0%, rgba(11,16,32,0.72) 100%)",
                      color: "#fff",
                      fontFamily: FONT_UI,
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    Consejo {periodo}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Paragraph */}
            <Reveal delay={420} y={20}>
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
                El Consejo Nacional es el equipo que coordina el camino del movimiento en República Dominicana.
                Nueve jóvenes elegidos por sus centros para discernir, animar y acompañar la vida de JMV
                durante un periodo de tres años.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
