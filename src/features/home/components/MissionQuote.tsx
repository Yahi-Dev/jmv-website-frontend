import { Serif } from "../ui-kit/Primitives"
import { JMV, FONT_DISPLAY, FONT_UI } from "../ui-kit/tokens"

export function MissionQuote() {
  return (
    <section style={{ background: JMV.white, padding: "140px 32px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "start" }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 120, lineHeight: 0.8, color: JMV.gold, fontWeight: 300 }}>“</div>
          <div>
            <Serif size={44} weight={300} style={{ lineHeight: 1.2 }}>
              Formamos jóvenes líderes cristianos comprometidos con la fe, el servicio y la comunidad, al estilo de <span style={{ fontStyle: "italic" }}>María</span> y <span style={{ fontStyle: "italic" }}>San&nbsp;Vicente de&nbsp;Paúl</span>.
            </Serif>
            <div style={{ marginTop: 40, fontFamily: FONT_UI, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: JMV.mute, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 24, height: 1, background: JMV.gold }} />
              Nuestra misión
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
