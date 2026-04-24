import { Serif } from "../ui-kit/Primitives"
import { CountUp } from "../ui-kit/CountUp"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "../ui-kit/tokens"

const stats = [
  { n: "1847", t: "Año de fundación", d: "Medalla Milagrosa" },
  { n: "60+", t: "Países", d: "Presencia internacional" },
  { n: "20+", t: "Centros en RD", d: "Comunidades locales" },
  { n: "500+", t: "Jóvenes activos", d: "En formación constante" },
]

export function Numbers() {
  return (
    <section style={{ background: JMV.blue, color: "#fff", padding: "120px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "end", marginBottom: 72 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ width: 18, height: 1, background: JMV.gold }} />
              <span style={{ fontFamily: FONT_UI, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: JMV.gold, fontWeight: 600 }}>
                JMV en cifras
              </span>
            </div>
            <Serif size={52} weight={300} style={{ color: "#fff" }}>
              Una familia<br />que <span style={{ fontStyle: "italic", color: JMV.gold }}>crece</span>.
            </Serif>
          </div>
          <p style={{ fontFamily: FONT_BODY, fontSize: 17, color: "rgba(255,255,255,0.78)", margin: 0, maxWidth: 520, justifySelf: "end", lineHeight: 1.6 }}>
            Una red internacional presente en los cinco continentes, con raíces profundas en el suelo dominicano desde hace décadas.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid rgba(255,255,255,0.18)" }}>
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "40px 24px 32px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.18)" : "none",
              }}
            >
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 72, fontWeight: 300, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
                <CountUp value={s.n} />
              </div>
              <div style={{ fontFamily: FONT_UI, fontSize: 13, color: "#fff", marginTop: 24, fontWeight: 500 }}>{s.t}</div>
              <div style={{ fontFamily: FONT_UI, fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
