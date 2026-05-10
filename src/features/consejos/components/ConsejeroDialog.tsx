"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/src/components/ui/dialog"
import { Icon } from "@/src/features/home/ui-kit/Primitives"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import { CARGO_LABELS, CargoConsejo, MiembroConsejo } from "../model/types"

function maskPhone(phone?: string): string | undefined {
  if (!phone) return undefined
  const digits = phone.replace(/\D/g, "")
  return `••• •• •${digits.slice(-4)}`
}

function maskEmail(email?: string): string | undefined {
  if (!email) return undefined
  const [u, d] = email.split("@")
  const mu = u.length <= 2 ? "••" : u[0] + "•".repeat(Math.max(1, u.length - 2)) + u.slice(-1)
  return `${mu}@${d}`
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  miembro: MiembroConsejo
}

export function ConsejeroDialog({ open, onOpenChange, miembro }: Props) {
  const phone = maskPhone(miembro.telefono)
  const email = maskEmail(miembro.email)
  const isCoordinator = miembro.cargo === CargoConsejo.CoordinadorNacional
  const accent = isCoordinator ? JMV.gold : JMV.blue
  const accentSoft = isCoordinator ? "rgba(243,167,54,0.10)" : "rgba(25,22,141,0.06)"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!max-w-[1100px] w-[95vw] p-0 overflow-hidden border-0 sm:rounded-md"
        style={{ background: JMV.white, fontFamily: FONT_BODY }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", minHeight: 640, maxHeight: "92vh" }}>
          {/* LEFT — full bleed photo */}
          <div style={{ position: "relative", background: JMV.mist, overflow: "hidden" }}>
            {miembro.fotoUrl ? (
              <Image
                src={miembro.fotoUrl}
                alt={miembro.nombre}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                style={{ objectFit: "cover" }}
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
                color: isCoordinator ? "#8A5A00" : JMV.blue,
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              }}
            >
              {isCoordinator && <Icon name="star" size={12} color={JMV.gold} />}
              {CARGO_LABELS[miembro.cargo]}
            </div>

            {/* Bottom gradient with name (visible on hover-less context) */}
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
              {miembro.estado && (
                <div
                  style={{
                    display: "inline-block",
                    padding: "5px 12px",
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 999,
                    fontFamily: FONT_UI,
                    fontSize: 10.5,
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  {miembro.estado}
                </div>
              )}
              {miembro.ciudad && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: FONT_UI,
                    fontSize: 13.5,
                    color: "rgba(255,255,255,0.92)",
                    fontWeight: 500,
                  }}
                >
                  <Icon name="pin" size={14} color="#fff" />
                  {miembro.ciudad}
                </div>
              )}
            </div>
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
              Perfil del consejero
            </div>

            {/* Name — wrapped in DialogTitle for a11y */}
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
            <DialogDescription className="sr-only">
              {`Perfil del consejero ${miembro.nombre}`}
            </DialogDescription>

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
                Miembro desde{" "}
                {new Date(miembro.createdDate).toLocaleDateString("es-DO", { year: "numeric", month: "long" })}
              </span>
            </div>

            {/* Bio */}
            <div style={{ marginBottom: 36 }}>
              <SectionLabel color={accent}>Biografía</SectionLabel>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 16.5,
                  lineHeight: 1.75,
                  color: JMV.body,
                  margin: 0,
                }}
              >
                {miembro.bioExtendida || miembro.bioCorta || (
                  <span style={{ color: JMV.mute, fontStyle: "italic" }}>
                    No hay biografía disponible.
                  </span>
                )}
              </p>
            </div>

            {/* Contact */}
            {(phone || email) && (
              <div style={{ marginBottom: 36 }}>
                <SectionLabel color={accent}>Contacto público</SectionLabel>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {phone && <ContactRow icon="phone" label="Teléfono" value={phone} />}
                  {email && <ContactRow icon="mail" label="Correo" value={email} />}
                </div>
                <p
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: 12,
                    color: JMV.mute,
                    margin: "14px 0 0",
                    fontStyle: "italic",
                  }}
                >
                  Datos enmascarados — visibles completos para miembros activos del movimiento.
                </p>
              </div>
            )}

            {/* Trayectoria */}
            {miembro.trayectoria && miembro.trayectoria.length > 0 && (
              <div>
                <SectionLabel color={accent}>Trayectoria en JMV</SectionLabel>
                <ol
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    position: "relative",
                  }}
                >
                  {/* Vertical spine */}
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 7,
                      top: 8,
                      bottom: 8,
                      width: 1,
                      background: `linear-gradient(to bottom, ${accent} 0%, ${JMV.line} 100%)`,
                    }}
                  />
                  {miembro.trayectoria.map((t, i) => (
                    <li
                      key={i}
                      style={{
                        position: "relative",
                        paddingLeft: 32,
                        paddingBottom: i === miembro.trayectoria!.length - 1 ? 0 : 22,
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 8,
                          width: 15,
                          height: 15,
                          borderRadius: 999,
                          background: accentSoft,
                          border: `2px solid ${accent}`,
                        }}
                      />
                      <div
                        style={{
                          fontFamily: FONT_DISPLAY,
                          fontStyle: "italic",
                          fontSize: 22,
                          fontWeight: 300,
                          color: accent,
                          lineHeight: 1,
                          marginBottom: 6,
                        }}
                      >
                        {t.anio}
                      </div>
                      <div
                        style={{
                          fontFamily: FONT_UI,
                          fontSize: 14.5,
                          fontWeight: 500,
                          color: JMV.ink,
                        }}
                      >
                        {t.rol}
                      </div>
                      {t.lugar && (
                        <div
                          style={{
                            fontFamily: FONT_BODY,
                            fontSize: 13,
                            color: JMV.mute,
                            marginTop: 3,
                          }}
                        >
                          {t.lugar}
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}
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

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: "phone" | "mail"
  label: string
  value: string
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        background: JMV.paper,
        border: "1px solid " + JMV.line,
        borderRadius: 4,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 999,
          background: JMV.white,
          border: "1px solid " + JMV.line,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={15} color={JMV.ink} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: FONT_UI,
            fontSize: 10.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: JMV.mute,
            marginBottom: 3,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: FONT_UI,
            fontSize: 13.5,
            color: JMV.ink,
            fontWeight: 500,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  )
}
