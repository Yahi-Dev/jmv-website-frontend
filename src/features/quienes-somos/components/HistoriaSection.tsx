import { Eyebrow, Serif, PhotoTile } from "@/src/features/home/ui-kit/Primitives"
import { JMV, FONT_BODY } from "@/src/features/home/ui-kit/tokens"

export function HistoriaSection() {
  return (
    <section style={{ background: JMV.white, padding: "120px 32px", borderTop: "1px solid " + JMV.line }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 96, alignItems: "center" }}>
          {/* Left column — photo tile */}
          <div>
            <PhotoTile h={560} kind="prayer" label="NUESTRA HISTORIA">
              {/* Decorative year overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 28,
                  left: 28,
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 88,
                  fontWeight: 300,
                  color: "rgba(25,22,141,0.18)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  fontStyle: "italic",
                }}
              >
                1995
              </div>
            </PhotoTile>
          </div>

          {/* Right column — narrative */}
          <div>
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
                La Juventud Mariana Vicenciana nace del carisma de{" "}
                <strong style={{ color: JMV.ink, fontWeight: 600 }}>San Vicente de Paúl</strong> y{" "}
                <strong style={{ color: JMV.ink, fontWeight: 600 }}>Santa Luisa de Marillac</strong>, quienes
                dedicaron sus vidas al servicio de los más necesitados siguiendo el ejemplo de María.
              </p>
              <p style={{ margin: 0 }}>
                En República Dominicana, JMV inició sus actividades en 1995, estableciendo el primer centro en
                Santo Domingo. Desde entonces hemos crecido hasta convertirnos en una red nacional de jóvenes
                comprometidos con la evangelización y el servicio social.
              </p>
              <p style={{ margin: 0 }}>
                Nuestra presencia se extiende por todo el territorio nacional, formando líderes juveniles que
                transforman sus comunidades desde la fe y el amor cristiano.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
