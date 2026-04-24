import { Eyebrow, Serif } from "@/src/features/home/ui-kit/Primitives"
import { JMV, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"

type Milestone = {
  year: string
  title: string
  body: string
}

const milestones: Milestone[] = [
  {
    year: "1995",
    title: "Fundación del primer centro",
    body:
      "Se establece el primer centro de JMV en Santo Domingo, marcando el inicio del movimiento en República Dominicana con un grupo de 12 jóvenes visionarios.",
  },
  {
    year: "2001",
    title: "Expansión nacional",
    body:
      "Apertura de centros en Santiago, La Vega y otras ciudades importantes, consolidando nuestra presencia a nivel nacional con más de 150 jóvenes activos.",
  },
  {
    year: "2008",
    title: "Reconocimiento oficial",
    body:
      "La Conferencia del Episcopado Dominicano reconoce oficialmente a JMV como movimiento juvenil católico nacional, validando nuestro compromiso y dedicación.",
  },
  {
    year: "2015",
    title: "Programa de misiones",
    body:
      "Lanzamiento del programa nacional de misiones juveniles, llevando esperanza a comunidades rurales y marginadas, impactando más de 50 comunidades.",
  },
  {
    year: "2024",
    title: "Renovación digital",
    body:
      "Implementación de nuevas plataformas digitales para fortalecer la formación y comunicación entre todos los centros del país.",
  },
]

export function TimelineSection() {
  return (
    <section style={{ background: JMV.white, padding: "120px 32px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Header */}
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
            Un recorrido por los hitos más importantes en la historia de JMV República Dominicana.
          </p>
        </div>

        {/* Timeline rows — same rhythm as CarismaSection */}
        <div style={{ borderTop: "1px solid " + JMV.line }}>
          {milestones.map((m, i) => (
            <div
              key={i}
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
          ))}
        </div>
      </div>
    </section>
  )
}
