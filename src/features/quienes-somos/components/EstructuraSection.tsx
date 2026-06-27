"use client"

import { useState } from "react"
import { Eyebrow, Serif } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/src/components/ui/dialog"

type Nivel = {
  title: string
  ambito: "Internacional" | "Nacional" | "Local"
  parrafos: string[]
  integrantes?: string[]
  fuente?: string
}

const levels: Nivel[] = [
  {
    title: "Director General",
    ambito: "Internacional",
    parrafos: [
      "La Asociación es una asociación laica en la Iglesia. Se gobierna según las disposiciones del Derecho Canónico universal y de los propios Estatutos.",
      "En virtud de una concesión pontificia, el Superior General de la Congregación de la Misión y de las Hijas de la Caridad es el Director General de la Asociación.",
    ],
    fuente: "Art. 12, Estatutos Internacionales",
  },
  {
    title: "Asamblea General",
    ambito: "Internacional",
    parrafos: [
      "Se convoca, al menos cada cinco años, una Asamblea General con participación del Consejo Internacional, del Secretariado Internacional y de dos laicos por Asociación Nacional.",
      "Cada Asociación Nacional puede contar también con la participación de su Director Nacional y la Hermana Delegada Nacional, quienes pueden participar en los debates pero sin derecho a voto.",
    ],
    fuente: "Art. 14, Estatutos Internacionales",
  },
  {
    title: "Consejo Internacional",
    ambito: "Internacional",
    parrafos: [
      "Está compuesto por el Director General, el Subdirector General, una Consejera General de las Hijas de la Caridad, un Presidente/a laico Internacional y cuatro miembros laicos de la Asociación elegidos por la Asamblea General. Son los «responsables mayores» (cf. Canon 318) de la Asociación.",
      "El Consejo Internacional se reúne, al menos, una vez al año.",
    ],
    fuente: "Art. 17, Estatutos Internacionales",
  },
  {
    title: "Secretariado Internacional",
    ambito: "Internacional",
    parrafos: [
      "Está compuesto, al menos, por dos personas con dedicación preferente que se encargan de dinamizar los programas fijados por el Consejo Internacional y la Asamblea General.",
      "Son nombradas por el Director General, después de consultar con el Consejo Internacional.",
    ],
    fuente: "Art. 21, Estatutos Internacionales",
  },
  {
    title: "Asamblea Nacional",
    ambito: "Nacional",
    parrafos: [
      "La Asamblea Nacional es el máximo organismo de dirección de la Asociación en el país. Se reúne ordinariamente cada tres años en el lugar que decida el Consejo Nacional.",
      "Sin embargo, puede reunirse de forma extraordinaria por decisión unánime del Consejo Nacional.",
    ],
    fuente: "Art. 17, Estatutos Nacionales",
  },
  {
    title: "Consejo Nacional",
    ambito: "Nacional",
    parrafos: [
      "Después de la Asamblea Nacional, el Consejo Nacional es la mayor instancia de animación y gobierno permanente de la asociación. Sus miembros son elegidos para un periodo de tres años, pudiendo ser renovados solo por un segundo trienio.",
    ],
    integrantes: ["Coordinador", "Secretario", "Tesorero", "Asesor Nacional", "Asesora Nacional", "Representantes de los centros"],
    fuente: "Art. 18, Estatutos Nacionales",
  },
  {
    title: "Consejo de Centro",
    ambito: "Local",
    parrafos: [
      "El Centro es el lugar de encuentro, vida y acción de los miembros de las diferentes comunidades y secciones de una misma parroquia, casa o escuela. Un centro se compone de dos o más comunidades.",
      "Cuando en algún lugar exista una sola comunidad, esta se incorpora al centro más cercano, salvo inconvenientes de distancia.",
    ],
    integrantes: [
      "Coordinador",
      "Secretario",
      "Tesorero",
      "Coordinador y secretario de comunidades",
      "Catequistas de las comunidades juveniles, infantiles y pre-juveniles",
      "Asesor/a (con voz, pero sin voto)",
    ],
    fuente: "Art. 21, Estatutos Nacionales",
  },
  {
    title: "Consejo de Comunidad",
    ambito: "Local",
    parrafos: [
      "La comunidad es el lugar fundamental donde se realizan la vida, el espíritu y el carisma de la asociación. Está compuesta por al menos 12 miembros y debe contar con un catequista, reuniéndose al menos una vez por mes. El grupo participa en la vida de la parroquia y colabora activamente en ella.",
      "Para animar la vida de la comunidad, es conveniente elegir cada dos años, entre sus miembros, un Coordinador, un Secretario y un Tesorero, durante una reunión convocada para este fin.",
    ],
    fuente: "Estatutos Nacionales",
  },
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
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const active = openIdx !== null ? levels[openIdx] : null
  const accent = openIdx !== null ? lerpColor("#100E66", "#139FCC", openIdx / (levels.length - 1)) : JMV.blue

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
            {levels.map((nivel, i) => {
              const t = i / (levels.length - 1)
              const width = 48 + 52 * t
              return (
                <button
                  key={nivel.title}
                  type="button"
                  onClick={() => setOpenIdx(i)}
                  className="jmv-orgband"
                  style={{
                    display: "block",
                    width: `${width}%`,
                    margin: "0 auto 4px",
                    background: lerpColor("#100E66", "#139FCC", t),
                    color: "#fff",
                    textAlign: "center",
                    padding: "14px 18px",
                    border: "none",
                    borderRadius: 3,
                    fontFamily: FONT_UI,
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                    cursor: "pointer",
                  }}
                >
                  {nivel.title}
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={220} y={16}>
          <p style={{ textAlign: "center", marginTop: 28, fontFamily: FONT_UI, fontSize: 12, letterSpacing: "0.06em", color: JMV.meta }}>
            De la dirección internacional (arriba) hasta cada comunidad local (abajo). Haz clic en cada nivel para ver su función.
          </p>
        </Reveal>
      </div>

      <Dialog open={openIdx !== null} onOpenChange={(o) => { if (!o) setOpenIdx(null) }}>
        <DialogContent showCloseButton={false} className="p-0 gap-0 overflow-hidden sm:max-w-xl">
          {active ? (
            <>
              {/* Header */}
              <div style={{ position: "relative", background: accent, color: "#fff", padding: "26px 28px 24px" }}>
                <DialogClose asChild>
                  <button
                    aria-label="Cerrar"
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,0.35)",
                      background: "rgba(255,255,255,0.12)",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: 15,
                      lineHeight: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ✕
                  </button>
                </DialogClose>
                <div style={{ fontFamily: FONT_UI, fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
                  Ámbito {active.ambito}
                </div>
                <DialogTitle
                  className="leading-tight"
                  style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 400, letterSpacing: "-0.015em", color: "#fff", margin: "8px 0 0" }}
                >
                  {active.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Información sobre {active.title} según los Estatutos de JMV.
                </DialogDescription>
              </div>

              {/* Body (native scroll — Radix ScrollArea no propaga wheel en portales) */}
              <div style={{ maxHeight: "62vh", overflowY: "auto", overscrollBehavior: "contain", padding: "24px 28px 28px", background: JMV.white }}>
                {active.parrafos.map((p, i) => (
                  <p key={i} style={{ fontFamily: FONT_BODY, fontSize: 15.5, lineHeight: 1.72, color: JMV.body, margin: i === 0 ? "0 0 14px" : "0 0 14px" }}>
                    {p}
                  </p>
                ))}

                {active.integrantes ? (
                  <div style={{ marginTop: 22 }}>
                    <div style={{ fontFamily: FONT_UI, fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: JMV.gold, fontWeight: 600, marginBottom: 14 }}>
                      Está integrado por
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {active.integrantes.map((m) => (
                        <li
                          key={m}
                          style={{
                            fontFamily: FONT_BODY,
                            fontSize: 15,
                            lineHeight: 1.5,
                            color: JMV.ink,
                            paddingLeft: 22,
                            position: "relative",
                            marginBottom: 10,
                          }}
                        >
                          <span style={{ position: "absolute", left: 0, top: 0, color: JMV.gold }}>•</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {active.fuente ? (
                  <p style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid " + JMV.line, fontFamily: FONT_UI, fontSize: 12, letterSpacing: "0.04em", color: JMV.meta }}>
                    {active.fuente}
                  </p>
                ) : null}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

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
        .jmv-kit-root .jmv-orgband:focus-visible {
          outline: 2px solid ${JMV.gold};
          outline-offset: 3px;
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
