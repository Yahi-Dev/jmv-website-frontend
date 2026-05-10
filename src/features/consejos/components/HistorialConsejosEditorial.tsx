"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { Eyebrow, Icon, Serif } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_UI, FONT_BODY, FONT_DISPLAY } from "@/src/features/home/ui-kit/tokens"
import { useConsejosHistoricos } from "../hook/use-consejos"
import { CARGO_LABELS, CargoConsejo, ConsejoNacional } from "../model/types"
import { MiembroCardEditorial } from "./MiembroCardEditorial"

export function HistorialConsejosEditorial() {
  const { consejos, loading } = useConsejosHistoricos()
  const [search, setSearch] = useState("")
  const [openId, setOpenId] = useState<number | null>(null)

  const filtrados = useMemo(() => {
    if (!search.trim()) return consejos
    const q = search.toLowerCase()
    return consejos
      .map((c) => ({
        ...c,
        miembros: c.miembros.filter(
          (m) =>
            m.nombre.toLowerCase().includes(q) ||
            m.ciudad?.toLowerCase().includes(q) ||
            CARGO_LABELS[m.cargo].toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.miembros.length > 0)
  }, [consejos, search])

  return (
    <section style={{ background: JMV.paper, padding: "120px 32px", borderTop: "1px solid " + JMV.line }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "end", marginBottom: 64 }}>
          <div>
            <Eyebrow color={JMV.blue}>Memoria del Movimiento</Eyebrow>
            <Serif size={56} weight={300} style={{ display: "block", marginTop: 24 }}>
              Quienes nos han <span style={{ fontStyle: "italic", color: JMV.celeste }}>guiado</span>.
            </Serif>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 17,
                lineHeight: 1.65,
                color: JMV.body,
                marginTop: 24,
                maxWidth: 540,
              }}
            >
              Cada periodo deja huella. Aquí están los consejos nacionales que sirvieron antes y que sostienen
              la memoria viva de JMV-RD.
            </p>
          </div>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: 400, width: "100%", justifySelf: "end" }}>
            <span
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: JMV.mute,
                pointerEvents: "none",
              }}
            >
              <Icon name="search" size={15} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, cargo o ciudad..."
              style={{
                width: "100%",
                padding: "12px 16px 12px 42px",
                background: JMV.white,
                border: "1px solid " + JMV.line,
                borderRadius: 999,
                fontFamily: FONT_UI,
                fontSize: 13.5,
                color: JMV.ink,
                outline: "none",
                transition: "border-color .15s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = JMV.blue)}
              onBlur={(e) => (e.currentTarget.style.borderColor = JMV.line)}
            />
          </div>
        </div>

        {/* List */}
        {loading ? (
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: JMV.mute, textAlign: "center", padding: "40px 0" }}>
            Cargando consejos históricos...
          </p>
        ) : filtrados.length === 0 ? (
          <div
            style={{
              padding: "60px 32px",
              textAlign: "center",
              border: "1px dashed " + JMV.line,
              borderRadius: 4,
              background: JMV.white,
              fontFamily: FONT_BODY,
              fontSize: 15,
              color: JMV.mute,
            }}
          >
            {search
              ? `No se encontraron resultados para "${search}".`
              : "Aún no hay consejos anteriores registrados."}
          </div>
        ) : (
          <div style={{ borderTop: "1px solid " + JMV.line }}>
            {filtrados.map((c, i) => (
              <Reveal key={c.id} delay={i * 80} y={20}>
                <ConsejoHistoricoRow
                  consejo={c}
                  isOpen={openId === c.id}
                  onToggle={() => setOpenId(openId === c.id ? null : c.id)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ConsejoHistoricoRow({
  consejo,
  isOpen,
  onToggle,
}: {
  consejo: ConsejoNacional
  isOpen: boolean
  onToggle: () => void
}) {
  const coordinador = consejo.miembros.find((m) => m.cargo === CargoConsejo.CoordinadorNacional)

  return (
    <div style={{ borderBottom: "1px solid " + JMV.line }}>
      {/* Row */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "32px 0",
          display: "grid",
          gridTemplateColumns: "180px 1fr 1fr auto",
          gap: 32,
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: FONT_UI,
              fontSize: 10.5,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: JMV.celeste,
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            Periodo
          </div>
          <Serif size={36} weight={300} italic style={{ color: JMV.blue }}>
            {consejo.periodo}
          </Serif>
        </div>

        <div>
          {consejo.lema && (
            <p
              style={{
                fontFamily: FONT_DISPLAY,
                fontStyle: "italic",
                fontSize: 18,
                fontWeight: 300,
                color: JMV.ink,
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              «{consejo.lema}»
            </p>
          )}
        </div>

        <div>
          {coordinador && (
            <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: JMV.body }}>
              <span style={{ color: JMV.mute, fontSize: 11.5, letterSpacing: "0.16em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
                Coordinación
              </span>
              {coordinador.nombre}
            </div>
          )}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: JMV.blue,
            fontFamily: FONT_UI,
            fontSize: 12.5,
            fontWeight: 500,
          }}
        >
          {consejo.miembros.length} miembros
          <span
            style={{
              display: "inline-flex",
              transition: "transform .25s ease",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <Icon name="chevron" size={16} color={JMV.blue} />
          </span>
        </div>
      </button>

      {/* Expanded content with animated reveal */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows .45s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
        <div style={{ padding: isOpen ? "8px 0 48px" : "0", transition: "padding .3s ease" }}>
          {consejo.fotoUrl && (
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 6",
                borderRadius: 4,
                overflow: "hidden",
                background: JMV.mist,
                marginBottom: 36,
              }}
            >
              <Image
                src={consejo.fotoUrl}
                alt={`Consejo ${consejo.periodo}`}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}

          {consejo.miembros.length === 0 ? (
            <div
              style={{
                padding: "40px 32px",
                textAlign: "center",
                fontFamily: FONT_BODY,
                fontSize: 14,
                color: JMV.mute,
              }}
            >
              No hay miembros registrados para este periodo.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {consejo.miembros.map((m) => (
                <MiembroCardEditorial key={m.id} miembro={m} />
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}
