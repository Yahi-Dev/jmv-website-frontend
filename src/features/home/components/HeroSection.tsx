"use client"

import { useRouter } from "next/navigation"
import { Eyebrow, Button, Icon, PhotoTile } from "../ui-kit/Primitives"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "../ui-kit/tokens"

export function HeroSection() {
  const router = useRouter()
  const onJoin = () => router.push("/unete")
  const onAbout = () => router.push("/quienes-somos")

  return (
    <section style={{ position: "relative", background: JMV.white, padding: "72px 32px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Top meta row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 56, fontFamily: FONT_UI, fontSize: 12, color: JMV.mute, letterSpacing: "0.06em" }}>
          <span>EST. 1847 · JMV INTERNACIONAL</span>
          <span>REPÚBLICA DOMINICANA · {new Date().getFullYear()}</span>
        </div>

        {/* Main split */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "end" }}>
          <div>
            <Eyebrow>Juventud · Fe · Servicio</Eyebrow>
            <h1 style={{ margin: "28px 0 0", fontFamily: FONT_DISPLAY, color: JMV.ink, fontWeight: 300, lineHeight: 0.98, letterSpacing: "-0.035em", fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}>
              Una juventud<br />
              <span style={{ fontStyle: "italic", fontWeight: 300 }}>mariana</span><br />
              que sirve.
            </h1>
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
          </div>

          {/* Right column — photo + caption block */}
          <div>
            <PhotoTile h={520} label="Encuentro Nacional · 2024" kind="community" />
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
        </div>

        {/* Bottom marquee-style belt — auto-scrolling carousel */}
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
      </div>
    </section>
  )
}
