"use client"

import { useMemo, useState } from "react"
import { Icon, type IconName, PhotoTile, Tag } from "@/src/features/home/ui-kit/Primitives"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import { ModulosFormacion } from "@/src/lib/enum/ModulosFormacion"
import type { FormacionType } from "../model/types"
import { FormacionDetailDialog } from "./formacion-detail-dialog"

type TileKind = "community" | "prayer" | "service" | "landscape" | "dark"

const moduleVisuals: Record<ModulosFormacion, { kind: TileKind; icon: IconName }> = {
  [ModulosFormacion.Voluntario]: { kind: "community", icon: "users" },
  [ModulosFormacion.Catequesis]: { kind: "prayer", icon: "book" },
  [ModulosFormacion.Oraciones]: { kind: "landscape", icon: "star" },
  [ModulosFormacion.Podcast]: { kind: "dark", icon: "globe" },
  [ModulosFormacion.Mision]: { kind: "service", icon: "hand" },
  [ModulosFormacion.Guia]: { kind: "community", icon: "calendar" },
}

interface Props {
  readonly formacion: FormacionType
  readonly getModuleColor: (modulo: ModulosFormacion) => string
}

export function FormacionCardEditorial({ formacion, getModuleColor }: Props) {
  const [open, setOpen] = useState(false)

  const plain = useMemo(() => {
    const html = formacion.descripcion || ""
    if (!html || typeof document === "undefined") return ""
    const div = document.createElement("div")
    div.innerHTML = html
    return (div.textContent || div.innerText || "").replace(/\s+/g, " ").trim()
  }, [formacion.descripcion])

  const modulo = formacion.modulo || ModulosFormacion.Voluntario
  const v = moduleVisuals[modulo]

  return (
    <>
      <div
        className="jmv-event-card"
        style={{ cursor: "pointer", display: "flex", flexDirection: "column", height: "100%" }}
        onClick={() => setOpen(true)}
      >
        <div style={{ position: "relative" }}>
          <PhotoTile h={220} kind={v.kind} label={modulo.toUpperCase()}>
            {/* Module icon overlay */}
            <div
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                width: 36,
                height: 36,
                borderRadius: 999,
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <Icon name={v.icon} size={16} />
            </div>
          </PhotoTile>
        </div>

        <div style={{ padding: "20px 4px 0", display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div style={{ marginBottom: 12 }}>
            <Tag tone="primary">{modulo}</Tag>
          </div>

          <h3
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 22,
              fontWeight: 400,
              color: JMV.ink,
              margin: "0 0 12px",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
            }}
          >
            {formacion.titulo}
          </h3>

          {plain && (
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14.5,
                lineHeight: 1.6,
                color: JMV.body,
                margin: 0,
                marginBottom: 20,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {plain}
            </p>
          )}

          <div
            style={{
              marginTop: "auto",
              paddingTop: 12,
              borderTop: "1px solid " + JMV.line,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: FONT_UI,
              fontSize: 12.5,
              color: JMV.mute,
            }}
          >
            <span>Ver detalle</span>
            <Icon name="arrowUR" size={14} />
          </div>
        </div>
      </div>

      <FormacionDetailDialog
        formacion={formacion}
        open={open}
        onOpenChange={setOpen}
        getModuleColor={getModuleColor}
      />
    </>
  )
}
