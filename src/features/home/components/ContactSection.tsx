"use client"

import { useRouter } from "next/navigation"
import { Eyebrow, Button, Serif, Icon, type IconName } from "../ui-kit/Primitives"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "../ui-kit/tokens"

const contactItems: { icon: IconName; label: string; value: string }[] = [
  { icon: "pin", label: "Ubicación", value: "Santo Domingo, RD" },
  { icon: "mail", label: "Correo", value: "info@jmvrd.org" },
  { icon: "phone", label: "Teléfono", value: "+1 (809) 123-4567" },
]

export function ContactSection() {
  const router = useRouter()
  const onJoin = () => router.push("/unete")

  return (
    <section id="contactanos" style={{ background: JMV.paper, padding: "140px 32px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <Eyebrow>Caminemos juntos</Eyebrow>
            <Serif size={72} weight={300} style={{ display: "block", marginTop: 24 }}>
              ¿Sientes el <span style={{ fontStyle: "italic", color: JMV.gold }}>llamado</span>?
            </Serif>
            <p style={{ fontFamily: FONT_BODY, fontSize: 17, lineHeight: 1.6, color: JMV.body, margin: "28px 0 40px", maxWidth: 480 }}>
              Ven a conocer tu centro JMV más cercano. No hace falta ser experto en nada — solo tener ganas de crecer en fe y en servicio.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <Button variant="dark" size="lg" onClick={onJoin}>
                Únete a JMV <Icon name="arrowUR" size={16} />
              </Button>
              <Button variant="outline" size="lg">Hablar con nosotros</Button>
            </div>
          </div>

          <div style={{ borderLeft: "1px solid " + JMV.line, paddingLeft: 40 }}>
            {contactItems.map((c, i) => (
              <div key={i} style={{ padding: "20px 0", borderBottom: i < 2 ? "1px solid " + JMV.line : "none" }}>
                <div style={{ fontFamily: FONT_UI, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: JMV.mute, marginBottom: 8 }}>
                  {c.label}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Icon name={c.icon} size={18} color={JMV.ink} />
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: JMV.ink, fontWeight: 400 }}>
                    {c.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
