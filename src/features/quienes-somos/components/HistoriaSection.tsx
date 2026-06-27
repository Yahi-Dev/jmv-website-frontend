import { Eyebrow, Serif } from "@/src/features/home/ui-kit/Primitives"
import { PhotoCycler } from "@/src/features/home/ui-kit/PhotoCycler"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_BODY } from "@/src/features/home/ui-kit/tokens"

export function HistoriaSection() {
  return (
    <section style={{ background: JMV.white, padding: "120px 32px", borderTop: "1px solid " + JMV.line }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 96, alignItems: "center" }}>
          {/* Left column — photo tile */}
          <Reveal delay={0} y={32}>
            <PhotoCycler
              images={["/NuestraHistoria/nuestra-historia.png"]}
              h={560}
              label="Nuestra Historia"
            />
          </Reveal>

          {/* Right column — narrative */}
          <Reveal delay={180} y={28}>
            <Eyebrow>Nuestra Historia</Eyebrow>
            <Serif size={56} weight={300} style={{ display: "block", marginTop: 24, maxWidth: 520 }}>
              Una tradición de <span style={{ fontStyle: "italic", color: JMV.gold }}>fe</span> y servicio.
            </Serif>

            <div
              style={{
                fontFamily: FONT_BODY,
                fontSize: 16.5,
                lineHeight: 1.7,
                color: JMV.body,
                marginTop: 32,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                maxWidth: 560,
              }}
            >
              <p style={{ margin: 0 }}>
                La Juventud Mariana Vicenciana es la renovación de la{" "}
                <strong style={{ color: JMV.ink, fontWeight: 600 }}>Asociación de Hijas e Hijos de María Inmaculada</strong>,
                nacida de las apariciones de la Virgen María a{" "}
                <strong style={{ color: JMV.ink, fontWeight: 600 }}>Santa Catalina Labouré</strong> en 1830, en la
                capilla de la rue du Bac, en París. De allí nace también la Medalla Milagrosa, insignia de la Asociación.
              </p>
              <p style={{ margin: 0 }}>
                La Asociación fue aprobada por el Papa Pío IX en 1847. Sus primeros grupos —los “Cenáculos Marianos”—
                se formaron en Francia entre 1835 y 1847, siendo Benigna Hairón la primera Hija de María. Para 1870
                ya contaba con 338 centros repartidos por Europa, Asia, África y América.
              </p>
              <p style={{ margin: 0 }}>
                Hoy JMV está presente en los cinco continentes y, como parte de la Familia Vicentina, también en la
                República Dominicana, donde forma a jóvenes en la fe, la oración y el servicio a los más necesitados,
                al estilo de María y San Vicente de Paúl.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
