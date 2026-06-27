import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Eyebrow } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import type { LegalDoc } from "../data/types"

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <div className="jmv-kit-root" style={{ minHeight: "100vh", background: JMV.white }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          background: JMV.white,
          padding: "56px 32px 48px",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid " + JMV.line,
        }}
      >
        <div style={{ maxWidth: 880, margin: "0 auto", position: "relative" }}>
          <Reveal delay={0} y={12}>
            <Eyebrow>Legal</Eyebrow>
          </Reveal>
          <Reveal delay={120} y={24}>
            <h1
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: JMV.ink,
                margin: "20px 0 0",
              }}
            >
              {doc.title}
            </h1>
          </Reveal>
          <Reveal delay={220} y={16}>
            <p style={{ fontFamily: FONT_UI, fontSize: 12.5, letterSpacing: "0.04em", color: JMV.mute, marginTop: 18 }}>
              Última actualización: {doc.updated}
            </p>
          </Reveal>
          {doc.intro ? (
            <Reveal delay={300} y={16}>
              <p style={{ fontFamily: FONT_BODY, fontSize: 17, lineHeight: 1.7, color: JMV.body, marginTop: 24, maxWidth: 720 }}>
                {doc.intro}
              </p>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Content */}
      <section style={{ background: JMV.white, padding: "56px 32px 100px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          {doc.sections.map((sec, i) => (
            <Reveal key={i} delay={0} y={18}>
              <div style={{ marginBottom: 44 }}>
                <h2
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 24,
                    fontWeight: 400,
                    letterSpacing: "-0.015em",
                    color: JMV.blue,
                    margin: "0 0 16px",
                  }}
                >
                  {sec.title}
                </h2>
                {sec.blocks.map((b, j) =>
                  b.type === "p" ? (
                    <p key={j} style={{ fontFamily: FONT_BODY, fontSize: 16, lineHeight: 1.75, color: JMV.body, margin: "0 0 14px" }}>
                      {b.text}
                    </p>
                  ) : (
                    <ul key={j} style={{ margin: "0 0 14px", padding: 0, listStyle: "none" }}>
                      {b.items.map((it, k) => (
                        <li
                          key={k}
                          style={{
                            fontFamily: FONT_BODY,
                            fontSize: 16,
                            lineHeight: 1.7,
                            color: JMV.body,
                            paddingLeft: 22,
                            position: "relative",
                            marginBottom: 8,
                          }}
                        >
                          <span style={{ position: "absolute", left: 0, top: 0, color: JMV.gold }}>•</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
