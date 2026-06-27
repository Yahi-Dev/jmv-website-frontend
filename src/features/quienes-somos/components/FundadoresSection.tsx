import { Eyebrow, Serif } from "@/src/features/home/ui-kit/Primitives"
import { PhotoCycler } from "@/src/features/home/ui-kit/PhotoCycler"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_UI, FONT_BODY, FONT_DISPLAY } from "@/src/features/home/ui-kit/tokens"

type Founder = {
  name: string
  years: string
  role: string
  quote: string
  body: string
  imgs: string[]
}

const founders: Founder[] = [
  {
    name: "San Vicente de Paúl",
    years: "1581 — 1660",
    role: "Fundador de la Familia Vicentina",
    quote: "La caridad es inventiva hasta el infinito.",
    body:
      "Sacerdote francés que entregó su vida a los pobres. Fundó la Congregación de la Misión y, junto a Santa Luisa, las Hijas de la Caridad. Su espíritu de servicio humilde y práctico es el corazón de nuestro carisma.",
    imgs: [
      "/sanvicentedepaul/san-vicente-de-paul-495x600.webp",
      "/sanvicentedepaul/san-vicente-de-paul-08-739x1024-1-e1695714807967.jpg",
      "/sanvicentedepaul/San-Vicente-de-PaUL-e1618320959926.jpg",
      "/sanvicentedepaul/san_vicente_de_paul.jpg",
    ],
  },
  {
    name: "Santa Luisa de Marillac",
    years: "1591 — 1660",
    role: "Cofundadora de las Hijas de la Caridad",
    quote: "Amen mucho a los pobres y Dios los amará.",
    body:
      "Mujer de oración profunda y acción decidida. Junto a San Vicente dio vida a las Hijas de la Caridad y organizó obras de auxilio para enfermos, niños abandonados y ancianos. Su legado inspira nuestra manera de servir.",
    imgs: [
      "/santa-luisa-de-marillac/Santa-Luisa-de-Marillac.jpg",
      "/santa-luisa-de-marillac/5366d68fabf540bea6501b860ff49a0b.jpg",
      "/santa-luisa-de-marillac/042823-stluisa.jpg",
    ],
  },
  {
    name: "Santa Catalina Labouré",
    years: "1806 — 1876",
    role: "Vidente de la Medalla Milagrosa",
    quote: "¡Oh María, sin pecado concebida, rogad por nosotros que recurrimos a Vos!",
    body:
      "Hija de la Caridad a quien la Virgen se apareció en 1830, en la rue du Bac de París, encargándole acuñar la Medalla Milagrosa. De aquellas apariciones nace la Asociación que hoy es JMV. Fue declarada santa por Pío XII en 1947.",
    imgs: [
      "/santa-catalina-laboure/santa-catalina-laboure.webp",
      "/santa-catalina-laboure/1732103213890.jpg",
    ],
  },
  {
    name: "Federico Ozanam",
    years: "1813 — 1853",
    role: "Fundador de las Conferencias de San Vicente de Paúl",
    quote: "La única ley que debe gobernar los actos humanos es la del amor.",
    body:
      "Laico, profesor y padre de familia. Movido por la fe ante la pobreza de su tiempo, fundó en 1833 las Conferencias de San Vicente de Paúl. Fue beatificado por Juan Pablo II en 1997, durante la Jornada Mundial de la Juventud.",
    imgs: ["/federico-ozanam/Frederic-Ozanam-768x576-1.jpg"],
  },
]

export function FundadoresSection() {
  return (
    <section style={{ background: JMV.paper, padding: "120px 32px", borderTop: "1px solid " + JMV.line }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <Reveal delay={0} y={24}>
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
              Nuestro carisma se enraíza en grandes figuras de la Familia Vicentina —santos y laicos— que
              respondieron al clamor de los pobres y cuyo testimonio sigue inspirando hoy a los jóvenes de JMV.
            </p>
          </div>
        </Reveal>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {founders.map((f, i) => (
            <Reveal key={i} delay={i * 150} y={36}>
            <article
              style={{
                background: JMV.white,
                border: "1px solid " + JMV.line,
                borderRadius: 2,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <PhotoCycler images={f.imgs} h={360} label={f.name.toUpperCase()} startDelay={i * 1200} />

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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
