"use client"

import Image from "next/image"
import { useState } from "react"
import { Icon } from "@/src/features/home/ui-kit/Primitives"
import { JMV, FONT_UI, FONT_DISPLAY, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import { CARGO_LABELS, CargoConsejo, MiembroConsejo } from "../model/types"
import { ConsejeroDialog } from "./ConsejeroDialog"

const cargoTone: Record<CargoConsejo, { bg: string; color: string; border: string }> = {
  [CargoConsejo.CoordinadorNacional]: { bg: "rgba(243,167,54,0.10)", color: "#8A5A00", border: "rgba(243,167,54,0.45)" },
  [CargoConsejo.SecretarioNacional]: { bg: "rgba(25,22,141,0.06)", color: JMV.blue, border: "rgba(25,22,141,0.20)" },
  [CargoConsejo.TesoreroNacional]: { bg: "rgba(25,22,141,0.06)", color: JMV.blue, border: "rgba(25,22,141,0.20)" },
  [CargoConsejo.VocalDeFormacion]: { bg: "rgba(19,159,204,0.08)", color: JMV.celeste, border: "rgba(19,159,204,0.25)" },
  [CargoConsejo.VocalDeMisionYCaridad]: { bg: "rgba(19,159,204,0.08)", color: JMV.celeste, border: "rgba(19,159,204,0.25)" },
  [CargoConsejo.VocalLiturgiaYMariana]: { bg: "rgba(19,159,204,0.08)", color: JMV.celeste, border: "rgba(19,159,204,0.25)" },
  [CargoConsejo.VocalDeExpansion]: { bg: "rgba(19,159,204,0.08)", color: JMV.celeste, border: "rgba(19,159,204,0.25)" },
  [CargoConsejo.VocalDePrejuveniles]: { bg: "rgba(19,159,204,0.08)", color: JMV.celeste, border: "rgba(19,159,204,0.25)" },
  [CargoConsejo.VocalDeCulturaYRecreacion]: { bg: "rgba(19,159,204,0.08)", color: JMV.celeste, border: "rgba(19,159,204,0.25)" },
}

interface Props {
  miembro: MiembroConsejo
  featured?: boolean
}

export function MiembroCardEditorial({ miembro, featured = false }: Props) {
  const [open, setOpen] = useState(false)
  const tone = cargoTone[miembro.cargo]
  const isCoordinator = miembro.cargo === CargoConsejo.CoordinadorNacional

  return (
    <>
      <div
        className="jmv-miembro-card"
        onClick={() => setOpen(true)}
        style={{
          cursor: "pointer",
          background: JMV.white,
          border: "1px solid " + JMV.line,
          borderRadius: 4,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
        }}
      >
        {/* Photo */}
        <div style={{ position: "relative", aspectRatio: "4 / 5", background: JMV.mist, overflow: "hidden" }}>
          {miembro.fotoUrl ? (
            <Image
              src={miembro.fotoUrl}
              alt={miembro.nombre}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="jmv-miembro-img"
              style={{ objectFit: "cover", transition: "transform .6s cubic-bezier(.2,.7,.2,1)" }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg, ${JMV.blue} 0%, ${JMV.celeste} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="users" size={48} color="rgba(255,255,255,0.5)" />
            </div>
          )}

          {/* Coordinator gold ribbon */}
          {isCoordinator && (
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                zIndex: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                background: "rgba(255,255,255,0.95)",
                borderRadius: 999,
                fontFamily: FONT_UI,
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#8A5A00",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <Icon name="star" size={10} color={JMV.gold} />
              Coordinadora
            </div>
          )}

          {/* Estado badge bottom-right */}
          {miembro.estado && (
            <div
              style={{
                position: "absolute",
                bottom: 14,
                right: 14,
                zIndex: 2,
                padding: "4px 10px",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(6px)",
                borderRadius: 999,
                fontFamily: FONT_UI,
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: miembro.estado === "Titular" ? JMV.blue : JMV.mute,
              }}
            >
              {miembro.estado}
            </div>
          )}

          {/* Hover overlay with bio + CTA */}
          <div className="jmv-miembro-overlay">
            {miembro.bioCorta && (
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  color: "rgba(255,255,255,0.92)",
                  margin: "0 0 12px",
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {miembro.bioCorta}
              </p>
            )}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: FONT_UI,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              Ver perfil completo
              <Icon name="arrowUR" size={14} color="#fff" />
            </span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "22px 22px 20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
          {/* Cargo chip */}
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              alignItems: "center",
              gap: 6,
              padding: "5px 11px",
              background: tone.bg,
              border: "1px solid " + tone.border,
              borderRadius: 999,
              fontFamily: FONT_UI,
              fontSize: 11,
              fontWeight: 500,
              color: tone.color,
              letterSpacing: "0.02em",
              marginBottom: 14,
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: 999, background: tone.color, opacity: 0.85 }} />
            {CARGO_LABELS[miembro.cargo]}
          </div>

          {/* Name */}
          <h3
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: featured ? 28 : 22,
              fontWeight: 400,
              color: JMV.ink,
              margin: "0 0 8px",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
            }}
          >
            {miembro.nombre}
          </h3>

          {/* Ciudad */}
          {miembro.ciudad && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: FONT_UI,
                fontSize: 12.5,
                color: JMV.mute,
                marginBottom: 12,
              }}
            >
              <Icon name="pin" size={12} color={JMV.mute} />
              {miembro.ciudad}
            </div>
          )}

          {/* Bio short */}
          {miembro.bioCorta && (
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14,
                lineHeight: 1.55,
                color: JMV.body,
                margin: 0,
                marginBottom: 16,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {miembro.bioCorta}
            </p>
          )}

          {/* Footer link */}
          <div
            style={{
              marginTop: "auto",
              paddingTop: 14,
              borderTop: "1px solid " + JMV.line,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: FONT_UI,
              fontSize: 12.5,
              color: JMV.ink,
            }}
          >
            <span>Ver perfil</span>
            <Icon name="arrowUR" size={13} color={JMV.blue} />
          </div>
        </div>
      </div>

      <ConsejeroDialog open={open} onOpenChange={setOpen} miembro={miembro} />
    </>
  )
}
