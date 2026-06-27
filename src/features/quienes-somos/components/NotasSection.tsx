import { Eyebrow, Serif } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"

const notas = [
  {
    word: "Laical",
    desc: "Una asociación formada principalmente por jóvenes laicos, dentro del marco de las Asociaciones Laicas Internacionales de fieles de la Iglesia.",
  },
  {
    word: "Eclesial",
    desc: "Grupo apostólico dentro de la Iglesia, con aprobación pontificia desde 1847. Cada miembro evangeliza desde su pertenencia a ella por el Bautismo.",
  },
  {
    word: "Mariana",
    desc: "Tiene como Modelo a María, Madre de la Iglesia y Animadora de la comunidad, que nos da a Cristo: mujer creyente y mujer orante.",
  },
  {
    word: "Misionera",
    desc: "Todo miembro de JMV es misionero, apóstol de la evangelización en su propio ambiente y en la misión, según el mandato de Jesús: «Id y predicad».",
  },
  {
    word: "Vicentina",
    desc: "Realiza su apostolado al estilo de San Vicente de Paúl, sirviendo a los pobres y marginados. Es la nota carismática de todo JMV.",
  },
]

export function NotasSection() {
  return (
    <section id="notas" style={{ background: JMV.white, padding: "120px 32px", borderTop: "1px solid " + JMV.line }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Reveal delay={0} y={24}>
          <div style={{ maxWidth: 720, marginBottom: 64 }}>
            <Eyebrow>Notas Distintivas</Eyebrow>
            <Serif size={56} weight={300} style={{ display: "block", marginTop: 24 }}>
              Cinco notas que nos <span style={{ fontStyle: "italic", color: JMV.gold }}>identifican</span>.
            </Serif>
            <p style={{ fontFamily: FONT_BODY, fontSize: 17, lineHeight: 1.65, color: JMV.body, marginTop: 28, maxWidth: 560 }}>
              La identidad de la Asociación viene señalada por sus notas: lo que somos y lo que nos define como movimiento.
            </p>
          </div>
        </Reveal>

        <div style={{ borderTop: "1px solid " + JMV.line }}>
          {notas.map((n, i) => (
            <Reveal key={i} delay={i * 90} y={22}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "64px 240px 1fr",
                  gap: 40,
                  alignItems: "baseline",
                  padding: "36px 0",
                  borderBottom: "1px solid " + JMV.line,
                }}
              >
                <div style={{ fontFamily: FONT_UI, fontSize: 12, color: JMV.meta, letterSpacing: "0.2em" }}>
                  0{i + 1}
                </div>
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                    color: JMV.ink,
                  }}
                >
                  {n.word}
                </div>
                <p style={{ fontFamily: FONT_BODY, fontSize: 16, lineHeight: 1.7, color: JMV.body, margin: 0, maxWidth: 620 }}>
                  {n.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
