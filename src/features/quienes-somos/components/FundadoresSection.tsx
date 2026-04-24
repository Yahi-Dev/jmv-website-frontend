import { Eyebrow, Serif, PhotoTile } from "@/src/features/home/ui-kit/Primitives"
import { JMV, FONT_UI, FONT_BODY, FONT_DISPLAY } from "@/src/features/home/ui-kit/tokens"

type Founder = {
  name: string
  years: string
  role: string
  quote: string
  body: string
  kind: "prayer" | "landscape" | "service" | "community"
}

const founders: Founder[] = [
  {
    name: "San Vicente de Paúl",
    years: "1581 — 1660",
    role: "Fundador de la familia vicentina",
    quote: "La caridad es inventiva hasta el infinito.",
    body:
      "Sacerdote francés dedicado enteramente a los pobres. Fundó la Congregación de la Misión y, junto a Santa Luisa, las Hijas de la Caridad. Su espíritu de servicio humilde y práctico sigue siendo el corazón de nuestra espiritualidad.",
    kind: "prayer",
  },
  {
    name: "Santa Luisa de Marillac",
    years: "1591 — 1660",
    role: "Cofundadora · Madre de los pobres",
    quote: "Amen mucho a los pobres y Dios los amará.",
    body:
      "Mujer de oración profunda y acción decidida. Junto a San Vicente dio vida a las Hijas de la Caridad y organizó obras de auxilio para enfermos, niños abandonados y ancianos. Su legado inspira nuestra manera de servir con ternura y eficacia.",
    kind: "landscape",
  },
]

export function FundadoresSection() {
  return (
    <section style={{ background: JMV.paper, padding: "120px 32px", borderTop: "1px solid " + JMV.line }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ maxWidth: 720, marginBottom: 80 }}>
          <Eyebrow>Raíces Vicencianas</Eyebrow>
          <Serif size={56} weight={300} style={{ display: "block", marginTop: 24 }}>
            Herederos de un <span style={{ fontStyle: "italic", color: JMV.gold }}>legado</span> espiritual.
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
            Nuestro carisma tiene su origen en dos santos franceses del siglo XVII cuya respuesta al clamor de
            los pobres inspira hoy a miles de jóvenes en todo el mundo.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {founders.map((f, i) => (
            <article
              key={i}
              style={{
                background: JMV.white,
                border: "1px solid " + JMV.line,
                borderRadius: 2,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <PhotoTile h={320} kind={f.kind} label={f.name.toUpperCase()} />

              <div style={{ padding: "36px 36px 40px" }}>
                <div
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: 10.5,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: JMV.mute,
                    marginBottom: 10,
                  }}
                >
                  {f.years}
                </div>
                <Serif size={34} weight={400} style={{ display: "block" }}>
                  {f.name}
                </Serif>
                <div
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: 13,
                    color: JMV.gold,
                    marginTop: 10,
                    letterSpacing: "0.02em",
                  }}
                >
                  {f.role}
                </div>

                <blockquote
                  style={{
                    margin: "28px 0 20px",
                    paddingLeft: 20,
                    borderLeft: "2px solid " + JMV.gold,
                    fontFamily: FONT_DISPLAY,
                    fontStyle: "italic",
                    fontSize: 20,
                    lineHeight: 1.4,
                    color: JMV.ink,
                    fontWeight: 300,
                  }}
                >
                  “{f.quote}”
                </blockquote>

                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: JMV.body,
                    margin: 0,
                  }}
                >
                  {f.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
