import { Eyebrow, Serif, Icon, type IconName } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
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
    title: "Comunidad Juvenil",
    icon: "users",
    body:
      "Jóvenes que se reúnen en comunidad para crecer juntos en la fe, la amistad y el acompañamiento mutuo en el camino cristiano.",
  },
  {
    num: "02",
    title: "Espiritualidad",
    icon: "star",
    body:
      "Vida de oración y devoción mariana, centrada en la Eucaristía y en el ejemplo de María, primera discípula, en su entrega total a Dios.",
  },
  {
    num: "03",
    title: "Apostolado",
    icon: "heart",
    body:
      "Evangelización y servicio a los más pobres y marginados al estilo de San Vicente de Paúl, llevando esperanza con obras concretas de caridad.",
  },
  {
    num: "04",
    title: "Formación",
    icon: "book",
    body:
      "Crecimiento integral de la persona a través de la catequesis y el camino catecumenal propio de JMV, que acompaña cada etapa de la fe.",
  },
]

export function CarismaSection() {
  return (
    <section style={{ background: JMV.mist, padding: "120px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal delay={0} y={24}>
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
        </Reveal>

        {/* Numbered list — matches ValuesSection rhythm */}
        <div style={{ borderTop: "1px solid " + JMV.line }}>
          {pillars.map((p, i) => (
            <Reveal key={i} delay={i * 110} y={22}>
            <div
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
