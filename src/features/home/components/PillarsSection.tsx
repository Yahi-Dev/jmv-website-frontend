import { Eyebrow, Serif } from "../ui-kit/Primitives"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "../ui-kit/tokens"

const pillars = [
  { num: "01", title: "Comunidad Juvenil", desc: "Crecimiento espiritual y humano a través de la catequesis y el liderazgo cristiano." },
  { num: "02", title: "Espiritualidad", desc: "Oración y contemplación siguiendo el ejemplo de María y San Vicente." },
  { num: "03", title: "Apostolado", desc: "Compromiso con los más necesitados a través de obras de caridad." },
  { num: "04", title: "Formación", desc: "Fraternidad y apoyo mutuo en el camino de fe y servicio." },
]

export function PillarsSection() {
  return (
    <section style={{ background: JMV.mist, padding: "120px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "end", marginBottom: 80 }}>
          <div>
            <Eyebrow>Pilares</Eyebrow>
            <Serif size={56} weight={300} style={{ display: "block", marginTop: 20, color: JMV.blue }}>
              Cuatro caminos,<br />una misma <span style={{ fontStyle: "italic" }}>vocación</span>.
            </Serif>
          </div>
          <p style={{ fontFamily: FONT_BODY, fontSize: 17, lineHeight: 1.6, color: JMV.body, margin: 0, maxWidth: 520, justifySelf: "end" }}>
            Los cimientos sobre los que construimos comunidad y respondemos al llamado del Evangelio en la República Dominicana.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: "1px solid " + JMV.line }}>
          {pillars.map((p, i) => (
            <div
              key={i}
              className="jmv-pillar"
              style={{
                padding: "36px 28px 40px",
                borderRight: i < pillars.length - 1 ? "1px solid " + JMV.line : "none",
                borderBottom: "1px solid " + JMV.line,
              }}
            >
              <div style={{ fontFamily: FONT_UI, fontSize: 11, letterSpacing: "0.3em", color: JMV.gold, marginBottom: 36 }}>{p.num}</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: JMV.ink, fontWeight: 400, letterSpacing: "-0.015em", marginBottom: 14, lineHeight: 1.1 }}>{p.title}</div>
              <p style={{ fontFamily: FONT_BODY, fontSize: 14.5, lineHeight: 1.6, color: JMV.mute, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
