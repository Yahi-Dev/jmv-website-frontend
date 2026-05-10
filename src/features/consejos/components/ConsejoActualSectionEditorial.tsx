"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Eyebrow, Icon, Serif } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { CountUp } from "@/src/features/home/ui-kit/CountUp"
import { JMV, FONT_UI, FONT_BODY, FONT_DISPLAY } from "@/src/features/home/ui-kit/tokens"
import { useConsejoActual } from "../hook/use-consejos"
import { getClientUser } from "@/src/lib/client-auth"
import { CargoConsejo, ConsejoNacional } from "../model/types"
import { MiembroCardEditorial } from "./MiembroCardEditorial"
import { CoordinadorFeatured } from "./CoordinadorFeatured"

interface ConsejoActualSectionEditorialProps {
  /** Cuando se provee, el componente no vuelve a llamar a `useConsejoActual()`. */
  consejo?: ConsejoNacional | null
  loading?: boolean
  error?: string | null
  isEmpty?: boolean
}

export function ConsejoActualSectionEditorial(
  props: ConsejoActualSectionEditorialProps = {}
) {
  const externalConsejoProvided = props.consejo !== undefined
  const fallback = useConsejoActual({ enabled: !externalConsejoProvided })
  const consejo = externalConsejoProvided ? props.consejo : fallback.consejo
  const loading = externalConsejoProvided ? props.loading ?? false : fallback.loading
  const error = externalConsejoProvided ? props.error ?? null : fallback.error
  const isEmpty = externalConsejoProvided ? props.isEmpty ?? !consejo : fallback.isEmpty
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    getClientUser()
      .then((u) => setIsAdmin(!!u))
      .catch(() => setIsAdmin(false))
  }, [])

  if (loading) {
    return (
      <section style={{ background: JMV.white, padding: "80px 32px", borderTop: "1px solid " + JMV.line }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: JMV.mute }}>Cargando consejo nacional...</p>
        </div>
      </section>
    )
  }

  if (error || isEmpty || !consejo) {
    return (
      <section style={{ background: JMV.white, padding: "120px 32px", borderTop: "1px solid " + JMV.line }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              padding: "80px 40px",
              textAlign: "center",
              border: "1px dashed " + JMV.line,
              borderRadius: 4,
            }}
          >
            <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: JMV.mute, margin: 0 }}>
              {error
                ? "No se pudo cargar el consejo nacional en este momento."
                : "Aún no hay un consejo nacional activo registrado."}
            </p>
          </div>
        </div>
      </section>
    )
  }

  const cargoOrder = Object.values(CargoConsejo)
  const miembrosOrdenados = [...consejo.miembros].sort(
    (a, b) => cargoOrder.indexOf(a.cargo) - cargoOrder.indexOf(b.cargo)
  )
  const coordinador = miembrosOrdenados.find((m) => m.cargo === CargoConsejo.CoordinadorNacional)
  const otros = miembrosOrdenados.filter((m) => m.cargo !== CargoConsejo.CoordinadorNacional)

  return (
    <section style={{ background: JMV.white, padding: "100px 32px 120px", borderTop: "1px solid " + JMV.line }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Period header card */}
        <Reveal delay={0} y={24}>
          <div
            style={{
              background: JMV.paper,
              border: "1px solid " + JMV.line,
              borderLeft: `4px solid ${JMV.celeste}`,
              borderRadius: 4,
              padding: "48px",
              marginBottom: 80,
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 64,
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative dot pattern in the background */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 320,
                height: "100%",
                backgroundImage: `radial-gradient(circle, ${JMV.celeste} 1px, transparent 1px)`,
                backgroundSize: "16px 16px",
                opacity: 0.10,
                pointerEvents: "none",
                maskImage: "linear-gradient(to left, black 30%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to left, black 30%, transparent 100%)",
              }}
            />

            {/* LEFT: periodo + lema + admin */}
            <div style={{ position: "relative" }}>
              <Eyebrow color={JMV.celeste}>Periodo Actual</Eyebrow>
              <Serif size={64} weight={300} style={{ display: "block", marginTop: 18 }}>
                {consejo.periodo}
              </Serif>
              {consejo.lema && (
                <p
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontStyle: "italic",
                    fontSize: 22,
                    fontWeight: 300,
                    color: JMV.body,
                    margin: "20px 0 0",
                    lineHeight: 1.4,
                    maxWidth: 540,
                  }}
                >
                  «{consejo.lema}»
                </p>
              )}
              {isAdmin && (
                <div style={{ marginTop: 32 }}>
                  <Link href="/admin/consejos" className="jmv-ghost-pill" style={{ textDecoration: "none" }}>
                    Administrar Consejo <Icon name="arrowUR" size={13} />
                  </Link>
                </div>
              )}
            </div>

            {/* RIGHT: visual stats panel */}
            <div
              style={{
                position: "relative",
                background: JMV.white,
                border: "1px solid " + JMV.line,
                borderRadius: 4,
                padding: "32px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0,
                boxShadow: "0 24px 50px -28px rgba(25, 22, 141, 0.18)",
              }}
            >
              <div style={{ paddingRight: 28, borderRight: "1px solid " + JMV.line }}>
                <div
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: 10.5,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: JMV.mute,
                    marginBottom: 14,
                  }}
                >
                  Miembros
                </div>
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 64,
                    fontWeight: 300,
                    color: JMV.blue,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  <CountUp value={String(consejo.miembros.length)} duration={1800} />
                </div>
                <div
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: 12,
                    color: JMV.mute,
                    marginTop: 8,
                    lineHeight: 1.4,
                  }}
                >
                  Sirviendo activamente al movimiento.
                </div>
              </div>
              <div style={{ paddingLeft: 28 }}>
                <div
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: 10.5,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: JMV.mute,
                    marginBottom: 14,
                  }}
                >
                  Vocalías
                </div>
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 64,
                    fontWeight: 300,
                    color: JMV.celeste,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  <CountUp value={String(Math.max(0, consejo.miembros.length - 3))} duration={1800} />
                </div>
                <div
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: 12,
                    color: JMV.mute,
                    marginTop: 8,
                    lineHeight: 1.4,
                  }}
                >
                  Áreas de trabajo permanentes.
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Featured Coordinator */}
        {coordinador && (
          <Reveal delay={0} y={40}>
            <div style={{ marginBottom: 80 }}>
              <CoordinadorFeatured miembro={coordinador} />
            </div>
          </Reveal>
        )}

        {/* Other members header */}
        <Reveal delay={0} y={20}>
          <div style={{ marginBottom: 40 }}>
            <Eyebrow color={JMV.blue}>El equipo</Eyebrow>
            <Serif size={48} weight={300} style={{ display: "block", marginTop: 20 }}>
              Quienes la <span style={{ fontStyle: "italic", color: JMV.celeste }}>acompañan</span>.
            </Serif>
          </div>
        </Reveal>

        {otros.length === 0 ? (
          <div
            style={{
              padding: "60px 32px",
              textAlign: "center",
              border: "1px dashed " + JMV.line,
              borderRadius: 4,
              fontFamily: FONT_BODY,
              fontSize: 15,
              color: JMV.mute,
            }}
          >
            No hay miembros adicionales registrados.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 28,
            }}
          >
            {otros.map((m, i) => (
              <Reveal key={m.id} delay={i * 90} y={28}>
                <MiembroCardEditorial miembro={m} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
