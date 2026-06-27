import { Eyebrow, Serif } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"

type Milestone = {
  year: string
  title: string
  body: string
}

const milestones: Milestone[] = [
  {
    year: "1830",
    title: "El origen",
    body:
      "La Virgen María se aparece a Santa Catalina Labouré en la rue du Bac, en París, y pide acuñar la Medalla Milagrosa. Es el comienzo de la Asociación Mariana.",
  },
  {
    year: "1847",
    title: "Aprobación pontificia",
    body:
      "El Papa Pío IX aprueba la Asociación. Para entonces ya se habían formado en Francia los quince primeros grupos —los “Cenáculos Marianos”—, siendo Benigna Hairón la primera Hija de María.",
  },
  {
    year: "1870",
    title: "Expansión mundial",
    body:
      "La Asociación se extiende por Europa, Asia, África y América. Hacia 1870 ya cuenta con 338 centros en funcionamiento.",
  },
  {
    year: "Hoy",
    title: "JMV en República Dominicana",
    body:
      "Como parte de la Familia Vicentina mundial, JMV está presente en la República Dominicana, formando jóvenes en la fe, la oración y el servicio a los más necesitados.",
  },
]

export function TimelineSection() {
  return (
    <section style={{ background: JMV.white, padding: "120px 32px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Header */}
        <Reveal delay={0} y={24}>
        <div style={{ textAlign: "center", marginBottom: 80, maxWidth: 640, marginInline: "auto" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Eyebrow align="center">Nuestra Trayectoria</Eyebrow>
          </div>
          <Serif size={56} weight={300} style={{ display: "block", marginTop: 24 }}>
            Momentos que marcaron <span style={{ fontStyle: "italic", color: JMV.gold }}>historia</span>.
          </Serif>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 17,
              lineHeight: 1.65,
              color: JMV.body,
              marginTop: 24,
            }}
          >
            Un recorrido por los hitos que dieron origen y forma a la Juventud Mariana Vicenciana.
          </p>
        </div>
        </Reveal>

        {/* Timeline rows — same rhythm as CarismaSection */}
        <div style={{ borderTop: "1px solid " + JMV.line }}>
          {milestones.map((m, i) => (
            <Reveal key={i} delay={i * 100} y={22}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr 1.2fr",
                gap: 48,
                alignItems: "center",
                padding: "44px 0",
                borderBottom: "1px solid " + JMV.line,
              }}
            >
              {/* Year */}
              <div>
                <div
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: 10.5,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: JMV.gold,
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                >
                  Hito · {String(i + 1).padStart(2, "0")}
                </div>
                <Serif size={56} weight={300} italic style={{ color: JMV.gold }}>
                  {m.year}
                </Serif>
              </div>

              {/* Title */}
              <Serif size={28} weight={400}>
                {m.title}
              </Serif>

              {/* Body */}
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 15.5,
                  lineHeight: 1.7,
                  color: JMV.body,
                  margin: 0,
                  maxWidth: 520,
                }}
              >
                {m.body}
              </p>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
