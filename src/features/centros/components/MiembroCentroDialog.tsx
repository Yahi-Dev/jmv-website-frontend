"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog"
import { Icon } from "@/src/features/home/ui-kit/Primitives"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import type { MiembroCentroJmv } from "../model/types"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  miembro: MiembroCentroJmv
  parroquia?: string
}

export function MiembroCentroDialog({ open, onOpenChange, miembro, parroquia }: Props) {
  const accent = JMV.blue

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!max-w-[1100px] w-[95vw] p-0 overflow-hidden border-0 sm:rounded-md"
        style={{ background: JMV.white, fontFamily: FONT_BODY }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", minHeight: 580, maxHeight: "92vh" }}>
          {/* LEFT — full bleed photo */}
          <div style={{ position: "relative", background: JMV.mist, overflow: "hidden" }}>
            {miembro.imagenUrl ? (
              <Image
                src={miembro.imagenUrl}
                alt={miembro.nombre}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                style={{ objectFit: "cover", objectPosition: "top" }}
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
                <Icon name="users" size={80} color="rgba(255,255,255,0.5)" />
              </div>
            )}

            {/* Cargo ribbon */}
            <div
              style={{
                position: "absolute",
                top: 28,
                left: 28,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 18px",
                background: "rgba(255,255,255,0.96)",
                borderRadius: 999,
                fontFamily: FONT_UI,
                fontSize: 11.5,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: JMV.blue,
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background: JMV.blue,
                  opacity: 0.9,
                }}
              />
              {miembro.cargo}
            </div>

            {/* Bottom gradient with parroquia */}
            {parroquia && (
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "60px 28px 26px",
                  background: "linear-gradient(180deg, transparent 0%, rgba(11,16,32,0.85) 100%)",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: 10.5,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.7)",
                    marginBottom: 6,
                  }}
                >
                  Centro
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: FONT_UI,
                    fontSize: 13.5,
                    color: "#fff",
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  <Icon name="building" size={14} color="#fff" />
                  {parroquia}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — content */}
          <div
            style={{
              padding: "56px 56px 48px",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              maxHeight: "92vh",
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontFamily: FONT_UI,
                fontSize: 11.5,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: accent,
                fontWeight: 600,
                marginBottom: 20,
              }}
            >
              <span style={{ width: 22, height: 1, background: accent }} />
              Miembro del consejo
            </div>

            {/* Name */}
            <DialogTitle asChild>
              <h2
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "clamp(2.6rem, 4vw, 3.8rem)",
                  fontWeight: 300,
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                  color: JMV.ink,
                  margin: 0,
                }}
              >
                {miembro.nombre}
              </h2>
            </DialogTitle>

            {/* Meta */}
            <div
              style={{
                display: "flex",
                gap: 22,
                marginTop: 18,
                marginBottom: 36,
                fontFamily: FONT_UI,
                fontSize: 13.5,
                color: JMV.mute,
                flexWrap: "wrap",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Icon name="calendar" size={14} color={JMV.mute} />
                Sirviendo desde{" "}
                {new Date(miembro.createdDate).toLocaleDateString("es-DO", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </div>

            {/* Descripción */}
            <div style={{ marginBottom: 36 }}>
              <SectionLabel color={accent}>Sobre {miembro.nombre.split(" ")[0]}</SectionLabel>
              {miembro.descripcion ? (
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 16.5,
                    lineHeight: 1.75,
                    color: JMV.body,
                    margin: 0,
                    whiteSpace: "pre-line",
                  }}
                >
                  {miembro.descripcion}
                </p>
              ) : (
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 15,
                    color: JMV.mute,
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  No hay descripción disponible.
                </p>
              )}
            </div>

            {/* Cargo highlight */}
            <div
              style={{
                background: JMV.paper,
                border: "1px solid " + JMV.line,
                borderLeft: `4px solid ${accent}`,
                borderRadius: 4,
                padding: "20px 24px",
                marginTop: "auto",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_UI,
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: JMV.mute,
                  marginBottom: 6,
                }}
              >
                Cargo en el consejo
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 22,
                  fontWeight: 400,
                  color: JMV.ink,
                  letterSpacing: "-0.005em",
                }}
              >
                {miembro.cargo}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div
      style={{
        fontFamily: FONT_UI,
        fontSize: 11,
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color,
        fontWeight: 600,
        marginBottom: 16,
      }}
    >
      {children}
    </div>
  )
}
