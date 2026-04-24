import type { ReactNode } from "react"

type Kind = "community" | "prayer" | "service" | "landscape" | "dark"

const PALETTES: Record<Kind, [string, string, string]> = {
  community: ["#1F1CA5", "#19168D", "#0C8BB5"],
  prayer: ["#E9E6FC", "#C7D5F5", "#F3E6C8"],
  service: ["#F3A736", "#EFD9A0", "#FAF6ED"],
  landscape: ["#D7E4F4", "#F4EEDE", "#EFD9A0"],
  dark: ["#100E66", "#19168D", "#139FCC"],
}

interface PhotoTileProps {
  h?: number
  label?: string
  kind?: Kind
  children?: ReactNode
  className?: string
}

export function PhotoTile({ h = 360, label, kind = "community", children, className }: PhotoTileProps) {
  const [c0, c1, c2] = PALETTES[kind]
  return (
    <div
      className={`relative overflow-hidden rounded-sm ${className ?? ""}`}
      style={{
        height: h,
        background: `linear-gradient(135deg, ${c0} 0%, ${c1} 55%, ${c2} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
      <div className="absolute left-3.5 bottom-3.5 font-ui text-[10px] uppercase tracking-[0.2em] text-white/75">
        {label ?? "JMV RD"}
      </div>
      {children}
    </div>
  )
}
