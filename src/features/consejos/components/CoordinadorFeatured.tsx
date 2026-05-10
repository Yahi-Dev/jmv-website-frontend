"use client"

import Image from "next/image"
import { useState } from "react"
import { Icon } from "@/src/features/home/ui-kit/Primitives"
import { JMV, FONT_UI, FONT_BODY, FONT_DISPLAY } from "@/src/features/home/ui-kit/tokens"
import { MiembroConsejo } from "../model/types"
import { ConsejeroDialog } from "./ConsejeroDialog"

interface Props {
  miembro: MiembroConsejo
}

export function CoordinadorFeatured({ miembro }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <article
        className="jmv-coordinador-card"
        onClick={() => setOpen(true)}
        style={{
          cursor: "pointer",
          background: "linear-gradient(135deg, #FAFAF7 0%, #FFFFFF 60%, rgba(243,167,54,0.06) 100%)",
          border: "1px solid " + JMV.line,
          borderRadius: 4,
          display: "grid",
          gridTemplateColumns: "1.05fr 1.4fr",
          gap: 0,
          minHeight: 460,
        }}
      >
        {/* Photo column */}
        <div style={{ position: "relative", overflow: "hidden", background: JMV.mist }}>
          {miembro.fotoUrl ? (
            <Image
              src={miembro.fotoUrl}
              alt={miembro.nombre}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="jmv-coordinador-photo"
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
              <Icon name="users" size={64} color="rgba(255,255,255,0.5)" />
            </div>
          )}

          {/* Gold ribbon top-left */}
          <div
            style={{
              position: "absolute",
              top: 22,
              left: 22,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              background: "rgba(255,255,255,0.96)",
              borderRadius: 999,
              fontFamily: FONT_UI,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              color: "#8A5A00",
              boxShadow: "0 4px 14px rgba(0,0,0,0.10)",
            }}
          >
            <Icon name="star" size={12} color={JMV.gold} />
            Coordinadora Nacional
          </div>
        </div>

        {/* Body column */}
        <div
          style={{
            padding: "56px 56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Decorative dot pattern bg */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              width: 120,
              height: 120,
              backgroundImage: `radial-gradient(circle, ${JMV.gold} 1px, transparent 1px)`,
              backgroundSize: "10px 10px",
              opacity: 0.18,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              fontFamily: FONT_UI,
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: JMV.gold,
              fontWeight: 600,
              marginBottom: 18,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ display: "inline-block", width: 18, height: 1, background: JMV.gold }} />
            Al frente del consejo
          </div>

          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "clamp(2.4rem, 4.2vw, 3.6rem)",
              fontWeight: 300,
              color: JMV.ink,
              margin: "0 0 12px",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {miembro.nombre}
          </h2>

          {miembro.ciudad && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: FONT_UI,
                fontSize: 13,
                color: JMV.mute,
                marginBottom: 22,
              }}
            >
              <Icon name="pin" size={13} color={JMV.mute} />
              {miembro.ciudad}
            </div>
          )}

          {miembro.bioCorta && (
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 16,
                lineHeight: 1.7,
                color: JMV.body,
                margin: "0 0 28px",
                maxWidth: 540,
              }}
            >
              {miembro.bioCorta}
            </p>
          )}

          {/* Trayectoria preview */}
          {miembro.trayectoria && miembro.trayectoria.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 36,
                paddingTop: 24,
                borderTop: "1px solid " + JMV.line,
                marginTop: 8,
                flexWrap: "wrap",
              }}
            >
              {miembro.trayectoria.slice(-3).map((t, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontStyle: "italic",
                      fontSize: 28,
                      fontWeight: 300,
                      color: JMV.gold,
                      lineHeight: 1,
                    }}
                  >
                    {t.anio}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_UI,
                      fontSize: 11.5,
                      color: JMV.mute,
                      marginTop: 6,
                      maxWidth: 160,
                      lineHeight: 1.4,
                    }}
                  >
                    {t.rol}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              marginTop: 32,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: FONT_UI,
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: JMV.ink,
            }}
          >
            Ver perfil completo
            <Icon name="arrowUR" size={14} color={JMV.gold} />
          </div>
        </div>
      </article>

      <ConsejeroDialog open={open} onOpenChange={setOpen} miembro={miembro} />
    </>
  )
}
