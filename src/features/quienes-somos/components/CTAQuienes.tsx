"use client"

import { useRouter } from "next/navigation"
import { Button, Icon, Eyebrow, Serif } from "@/src/features/home/ui-kit/Primitives"
import { JMV, FONT_DISPLAY, FONT_BODY } from "@/src/features/home/ui-kit/tokens"

export function CTAQuienes() {
  const router = useRouter()
  return (
    <section style={{ background: JMV.paper, padding: "140px 32px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
        {/* Giant gold quotation mark */}
        <div
          aria-hidden
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 140,
            lineHeight: 0.7,
            color: JMV.gold,
            fontStyle: "italic",
            fontWeight: 300,
            marginBottom: 16,
          }}
        >
          “
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Eyebrow align="center">Camina con nosotros</Eyebrow>
        </div>

        <Serif size={72} weight={300} style={{ display: "block", marginTop: 28 }}>
          ¿Te sientes <span style={{ fontStyle: "italic", color: JMV.gold }}>llamado</span> a servir?
        </Serif>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 18,
            lineHeight: 1.65,
            color: JMV.body,
            margin: "32px auto 0",
            maxWidth: 560,
          }}
        >
          Únete a nuestra familia y descubre tu vocación. Juntos podemos transformar vidas y construir un mundo
          más justo y fraterno, al estilo de María y San Vicente.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 44, flexWrap: "wrap" }}>
          <Button variant="dark" size="lg" onClick={() => router.push("/unete")}>
            Únete a JMV <Icon name="arrowUR" size={16} />
          </Button>
          <Button variant="outline" size="lg" onClick={() => router.push("/formacion")}>
            Conoce la Formación
          </Button>
        </div>
      </div>
    </section>
  )
}
