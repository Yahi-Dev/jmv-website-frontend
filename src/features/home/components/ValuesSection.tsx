import { Eyebrow, Serif } from "../ui-kit/Primitives"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "../ui-kit/tokens"

const values = [
  { word: "Eclesial", desc: "Miembros vivos de la Iglesia católica." },
  { word: "Laical", desc: "Una vocación laical dentro de la Familia Vicenciana." },
  { word: "Mariana", desc: "María, primera discípula, es nuestra guía." },
  { word: "Misionera", desc: "Enviados a anunciar el Evangelio con obras." },
  { word: "Vicentina", desc: "Al estilo y carisma de San Vicente de Paúl." },
]

export function ValuesSection() {
  return (
    <section style={{ background: JMV.white, padding: "140px 32px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <Eyebrow align="center">Notas Distintivas</Eyebrow>
          <Serif size={52} weight={300} style={{ display: "block", marginTop: 20 }}>
            Cinco palabras que<br />nos <span style={{ fontStyle: "italic", color: JMV.gold }}>definen</span>.
          </Serif>
        </div>

        <div>
          {values.map((v, i) => (
            <div
              key={i}
              className="jmv-values-row"
              style={{
                display: "grid",
                gridTemplateColumns: "64px 1fr auto",
                gap: 32,
                alignItems: "center",
                padding: "32px 0",
                borderTop: "1px solid " + JMV.line,
                borderBottom: i === values.length - 1 ? "1px solid " + JMV.line : "none",
              }}
            >
              <div style={{ fontFamily: FONT_UI, fontSize: 12, color: JMV.meta, letterSpacing: "0.2em" }}>
                0{i + 1}
              </div>
              <div
                className="jmv-values-word"
                style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1 }}
              >
                {v.word}
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 15, color: JMV.mute, maxWidth: 340, textAlign: "right", lineHeight: 1.5 }}>
                {v.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
