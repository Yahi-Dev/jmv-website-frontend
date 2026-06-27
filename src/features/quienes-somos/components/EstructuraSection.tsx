import { Eyebrow, Serif } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"

const levels = [
  "Director General",
  "Asamblea General",
  "Consejo Internacional",
  "Secretariado Internacional",
  "Asamblea Nacional",
  "Consejo Nacional",
  "Consejo de Centro",
  "Consejo de Comunidad",
]

/** Linear interpolation between two hex colors → "rgb(r, g, b)". */
function lerpColor(a: string, b: string, t: number) {
  const ah = parseInt(a.slice(1), 16)
  const bh = parseInt(b.slice(1), 16)
  const ar = (ah >> 16) & 255
  const ag = (ah >> 8) & 255
  const ab = ah & 255
  const br = (bh >> 16) & 255
  const bg = (bh >> 8) & 255
  const bb = bh & 255
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const bl = Math.round(ab + (bb - ab) * t)
  return `rgb(${r}, ${g}, ${bl})`
}

export function EstructuraSection() {
  return (
    <section id="estructura" style={{ background: JMV.paper, padding: "120px 32px", borderTop: "1px solid " + JMV.line }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <Reveal delay={0} y={24}>
          <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 620, marginInline: "auto" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Eyebrow align="center">Cómo nos organizamos</Eyebrow>
            </div>
            <Serif size={56} weight={300} style={{ display: "block", marginTop: 24 }}>
              Una familia <span style={{ fontStyle: "italic", color: JMV.gold }}>organizada</span>.
            </Serif>
            <p style={{ fontFamily: FONT_BODY, fontSize: 17, lineHeight: 1.65, color: JMV.body, marginTop: 24 }}>
              JMV se organiza en distintos niveles de animación y gobierno: desde la dirección internacional,
              pasando por lo nacional, hasta cada centro y comunidad local.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} y={28}>
          <div style={{ maxWidth: 660, margin: "0 auto" }}>
            {levels.map((label, i) => {
              const t = i / (levels.length - 1)
              const width = 48 + 52 * t
              return (
                <div
                  key={label}
                  className="jmv-orgband"
                  style={{
                    width: `${width}%`,
                    margin: "0 auto 4px",
                    background: lerpColor("#100E66", "#139FCC", t),
                    color: "#fff",
                    textAlign: "center",
                    padding: "14px 18px",
                    borderRadius: 3,
                    fontFamily: FONT_UI,
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                  }}
                >
                  {label}
                </div>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={220} y={16}>
          <p style={{ textAlign: "center", marginTop: 28, fontFamily: FONT_UI, fontSize: 12, letterSpacing: "0.06em", color: JMV.meta }}>
            De la dirección internacional (arriba) hasta cada comunidad local (abajo).
          </p>
        </Reveal>
      </div>

      <style>{`
        .jmv-kit-root .jmv-orgband {
          position: relative;
          transition: transform .25s cubic-bezier(.2,.7,.2,1), box-shadow .25s ease, filter .25s ease;
        }
        .jmv-kit-root .jmv-orgband:hover {
          transform: scale(1.045);
          filter: brightness(1.12) saturate(1.05);
          box-shadow: 0 10px 28px rgba(16, 14, 102, 0.28);
          z-index: 2;
        }
        @media (prefers-reduced-motion: reduce) {
          .jmv-kit-root .jmv-orgband { transition: none; }
          .jmv-kit-root .jmv-orgband:hover { transform: none; }
        }
        @media (max-width: 640px) {
          .jmv-kit-root .jmv-orgband { width: 100% !important; }
        }
      `}</style>
    </section>
  )
}
