import { Eyebrow, Serif, Icon, type IconName } from "@/src/features/home/ui-kit/Primitives"
import { JMV, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"

type Pillar = {
  num: string
  title: string
  icon: IconName
  body: string
}

const pillars: Pillar[] = [
  {
    num: "01",
    title: "Formación",
    icon: "book",
    body:
      "Crecimiento integral de la persona a través de la catequesis, el estudio de la Doctrina Social de la Iglesia y el desarrollo de habilidades de liderazgo cristiano.",
  },
  {
    num: "02",
    title: "Oración",
    icon: "star",
    body:
      "Vida espiritual profunda centrada en la Eucaristía, la devoción mariana y la contemplación, siguiendo el ejemplo de María en su entrega total a Dios.",
  },
  {
    num: "03",
    title: "Servicio",
    icon: "heart",
    body:
      "Compromiso activo con los más pobres y marginados, llevando esperanza y dignidad a través de obras concretas de caridad y justicia social.",
  },
  {
    num: "04",
    title: "Misión",
    icon: "hand",
    body:
      "Evangelización activa y testimonio de vida cristiana, llevando el mensaje del Evangelio a todos los rincones de nuestra sociedad.",
  },
]

export function CarismaSection() {
  return (
    <section style={{ background: JMV.mist, padding: "120px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ maxWidth: 720, marginBottom: 72 }}>
          <Eyebrow>Nuestro Carisma</Eyebrow>
          <Serif size={56} weight={300} style={{ display: "block", marginTop: 24 }}>
            Cuatro <span style={{ fontStyle: "italic", color: JMV.gold }}>pilares</span> que nos sostienen.
          </Serif>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              lineHeight: 1.65,
              color: JMV.body,
              marginTop: 28,
              maxWidth: 560,
            }}
          >
            Nuestra espiritualidad se fundamenta en cuatro dimensiones esenciales que dan sentido a cada
            actividad, formación y obra de servicio que realizamos.
          </p>
        </div>

        {/* Numbered list — matches ValuesSection rhythm */}
        <div style={{ borderTop: "1px solid " + JMV.line }}>
          {pillars.map((p, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 1.3fr auto",
                gap: 48,
                alignItems: "center",
                padding: "40px 0",
                borderBottom: "1px solid " + JMV.line,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_UI,
                  fontSize: 13,
                  color: JMV.gold,
                  letterSpacing: "0.18em",
                  fontWeight: 500,
                }}
              >
                {p.num}
              </div>
              <Serif size={42} weight={300}>
                {p.title}
              </Serif>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 15.5,
                  lineHeight: 1.65,
                  color: JMV.body,
                  margin: 0,
                  maxWidth: 520,
                }}
              >
                {p.body}
              </p>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 999,
                  border: "1px solid " + JMV.line,
                  background: JMV.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: JMV.ink,
                }}
              >
                <Icon name={p.icon} size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
