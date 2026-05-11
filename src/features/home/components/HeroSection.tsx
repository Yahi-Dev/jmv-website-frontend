"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Eyebrow, Button, Icon, Logo, PhotoTile } from "../ui-kit/Primitives"
import { Reveal } from "../ui-kit/Reveal"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "../ui-kit/tokens"

export function HeroSection() {
  const router = useRouter()
  const onJoin = () => router.push("/unete")
  const onAbout = () => router.push("/quienes-somos")

  return (
    <section style={{ position: "relative", background: JMV.white, padding: "32px 32px 0", overflow: "hidden" }}>
      {/* Decorative ornaments */}
      <div
        aria-hidden
        className="jmv-spin-slow"
        style={{
          position: "absolute",
          top: -240,
          left: -240,
          width: 560,
          height: 560,
          borderRadius: "50%",
          border: "1px dashed rgba(243,167,54,0.16)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        className="jmv-pulse-soft"
        style={{
          position: "absolute",
          top: 80,
          left: 60,
          width: 240,
          height: 240,
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
          left: 200,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: JMV.celeste,
          opacity: 0.45,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        {/* Top meta row */}
        <Reveal delay={0} y={10}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 56, fontFamily: FONT_UI, fontSize: 12, color: JMV.mute, letterSpacing: "0.06em" }}>
            <span>EST. 1847 · JMV INTERNACIONAL</span>
            <span>REPÚBLICA DOMINICANA · {new Date().getFullYear()}</span>
          </div>
        </Reveal>

        {/* Main split */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "end" }}>
          <div>
            <Reveal delay={120} y={20}>
              <Eyebrow>Juventud · Fe · Servicio</Eyebrow>
            </Reveal>
            <Reveal delay={220} y={32}>
              <h1 style={{ margin: "28px 0 0", fontFamily: FONT_DISPLAY, color: JMV.ink, fontWeight: 300, lineHeight: 0.98, letterSpacing: "-0.035em", fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}>
                Una juventud<br />
                <span style={{ fontStyle: "italic", fontWeight: 300, color: JMV.gold }}>mariana</span><br />
                que <span style={{ fontStyle: "italic", fontWeight: 300, color: JMV.celeste }}>sirve</span>.
              </h1>
            </Reveal>
            <Reveal delay={420} y={20}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 48, maxWidth: 640 }}>
                <p style={{ fontFamily: FONT_BODY, fontSize: 16, lineHeight: 1.65, color: JMV.body, margin: 0 }}>
                  Somos una comunidad de jóvenes dominicanos formados en la espiritualidad de María y San Vicente de Paúl, comprometidos con la fe y con quienes más lo necesitan.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, justifyContent: "flex-end" }}>
                  <Button variant="dark" size="lg" onClick={onJoin}>
                    Únete a JMV <Icon name="arrowUR" size={16} />
                  </Button>
                  <Button variant="ghost" size="lg" onClick={onAbout}>
                    Conoce nuestra historia <Icon name="arrow" size={16} />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right column — flip card + caption block */}
          <Reveal delay={320} y={40}>
            <div>
              <HeroPhotoFlip />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: 20, fontFamily: FONT_UI, fontSize: 12.5, color: JMV.mute }}>
                <div style={{ maxWidth: 220, lineHeight: 1.5 }}>
                  Miles de jóvenes en más de 60 países viven el carisma JMV.
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: JMV.ink, fontFamily: FONT_DISPLAY, fontSize: 42, fontWeight: 400, lineHeight: 1 }}>
                    20<span style={{ color: JMV.gold }}>+</span>
                  </div>
                  <div style={{ marginTop: 4, letterSpacing: "0.14em", fontSize: 10.5, textTransform: "uppercase" }}>Centros en RD</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom marquee-style belt — auto-scrolling carousel */}
        <Reveal delay={500} y={20}>
          <div style={{ marginTop: 96, padding: "22px 0", borderTop: "1px solid " + JMV.line, borderBottom: "1px solid " + JMV.line, fontFamily: FONT_UI, fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: JMV.mute, overflow: "hidden", whiteSpace: "nowrap" }}>
            <div className="jmv-marquee-track" style={{ alignItems: "center", gap: 56, paddingRight: 56 }}>
              {["Eclesial", "Laical", "Mariana", "Misionera", "Vicentina", "Eclesial", "Laical", "Mariana", "Misionera", "Vicentina"].map((w, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 56, color: i % 5 === 2 ? JMV.gold : JMV.mute }}>
                  {w}
                  <span style={{ display: "inline-block", width: 4, height: 4, borderRadius: 999, background: JMV.gold }} />
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * HeroPhotoFlip — 3D flip card.
 * Front: JMV logo on a soft paper gradient (default, shown first).
 * Back: PhotoTile gradient with the "Encuentro Nacional" label.
 * Auto-flips every 5s, and clicking flips immediately + resets the timer.
 * ──────────────────────────────────────────────────────────────────────────── */
function HeroPhotoFlip() {
  // Default to showing the logo (front).
  const [flipped, setFlipped] = useState(false)

  // Auto-flip cycle. Re-runs whenever `flipped` changes so a manual click
  // resets the 5s countdown for the next side.
  useEffect(() => {
    const id = window.setTimeout(() => setFlipped((f) => !f), 5000)
    return () => window.clearTimeout(id)
  }, [flipped])

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Voltear tarjeta"
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setFlipped((f) => !f)
        }
      }}
      style={{
        position: "relative",
        width: "100%",
        height: 520,
        perspective: 1800,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.95s cubic-bezier(.4,0,.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          willChange: "transform",
        }}
      >
        {/* FRONT — Logo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 4,
            overflow: "hidden",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background:
              "linear-gradient(135deg, #FAFAF7 0%, #FFFFFF 55%, rgba(243,167,54,0.10) 100%)",
            border: "1px solid " + JMV.line,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 32px",
          }}
        >
          {/* Decorative dotted ring */}
          <div
            aria-hidden
            className="jmv-spin-slow"
            style={{
              position: "absolute",
              width: 380,
              height: 380,
              borderRadius: "50%",
              border: "1px dashed rgba(243,167,54,0.28)",
              pointerEvents: "none",
            }}
          />
          {/* Soft pulse */}
          <div
            aria-hidden
            className="jmv-pulse-soft"
            style={{
              position: "absolute",
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(19,159,204,0.10) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Logo size={240} />
            <div
              style={{
                marginTop: 24,
                fontFamily: FONT_DISPLAY,
                fontSize: 22,
                color: JMV.ink,
                fontWeight: 400,
                letterSpacing: "-0.005em",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              Juventud Mariana Vicenciana
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: FONT_UI,
                fontSize: 10.5,
                color: JMV.gold,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              República Dominicana · Desde 1995
            </div>
          </div>

          {/* Corner label */}
          <div
            style={{
              position: "absolute",
              bottom: 14,
              left: 14,
              fontFamily: FONT_UI,
              fontSize: 10,
              letterSpacing: "0.2em",
              color: JMV.mute,
              textTransform: "uppercase",
            }}
          >
            JMV · Identidad
          </div>
          {/* Click hint */}
          <div
            style={{
              position: "absolute",
              bottom: 14,
              right: 14,
              fontFamily: FONT_UI,
              fontSize: 10,
              letterSpacing: "0.2em",
              color: JMV.mute,
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Click para voltear
            <Icon name="arrow" size={11} color={JMV.mute} />
          </div>
        </div>

        {/* BACK — PhotoTile */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <PhotoTile h={520} label="Encuentro Nacional · 2024" kind="community" />
        </div>
      </div>
    </div>
  )
}
