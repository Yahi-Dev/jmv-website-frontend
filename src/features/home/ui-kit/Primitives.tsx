"use client"

import Image from "next/image"
import type { CSSProperties, ReactNode } from "react"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "./tokens"

/* ---------------- Icon (Lucide-style, identical paths from UI Kit) ---------------- */
export type IconName =
  | "home" | "users" | "heart" | "hand" | "book" | "calendar" | "clock" | "pin"
  | "mail" | "phone" | "arrow" | "arrowUR" | "chevron" | "menu" | "star"
  | "building" | "plus" | "globe" | "search" | "instagram" | "facebook" | "youtube"

export function Icon({
  name,
  size = 20,
  color = "currentColor",
  strokeWidth = 1.6,
}: {
  name: IconName
  size?: number
  color?: string
  strokeWidth?: number
}) {
  const paths: Record<IconName, ReactNode> = {
    home: (<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></>),
    users: (<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>),
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    hand: (<><path d="M11 14h2a2 2 0 1 0 0-4h-3v9"/><path d="M14 10a4 4 0 0 0-8 0v10"/><path d="M18 10a4 4 0 1 0-8 0"/></>),
    book: (<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>),
    calendar: (<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>),
    clock: (<><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></>),
    pin: (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>),
    mail: (<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>),
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
    arrow: (<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></>),
    arrowUR: (<><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/></>),
    chevron: <polyline points="6,9 12,15 18,9"/>,
    menu: (<><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>),
    star: <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>,
    building: (<><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="15" y2="14"/></>),
    plus: (<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>),
    globe: (<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>),
    search: (<><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>),
    instagram: (<><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>),
    facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>,
    youtube: (<><path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.5C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.92 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75,15.02 15.5,11.75 9.75,8.48"/></>),
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

/* ---------------- Button ---------------- */
type Variant = "primary" | "gold" | "outline" | "ghost" | "dark"
type Size = "sm" | "md" | "lg"

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  full,
  type = "button",
}: {
  variant?: Variant
  size?: Size
  children: ReactNode
  onClick?: () => void
  full?: boolean
  type?: "button" | "submit" | "reset"
}) {
  const sizes: Record<Size, CSSProperties> = {
    sm: { padding: "8px 14px", fontSize: 13, borderRadius: 999 },
    md: { padding: "11px 20px", fontSize: 14, borderRadius: 999 },
    lg: { padding: "14px 26px", fontSize: 15, borderRadius: 999 },
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`jmv-btn-${variant}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontFamily: FONT_UI,
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.18s ease",
        whiteSpace: "nowrap",
        letterSpacing: "-0.005em",
        width: full ? "100%" : "auto",
        ...sizes[size],
      }}
    >
      {children}
    </button>
  )
}

/* ---------------- Eyebrow ---------------- */
export function Eyebrow({
  children,
  color = JMV.gold,
  align = "left",
}: {
  children: ReactNode
  color?: string
  align?: "left" | "center"
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        justifyContent: align === "center" ? "center" : "flex-start",
      }}
    >
      <span style={{ display: "block", width: 18, height: 1, background: color }} />
      <span
        style={{
          fontFamily: FONT_UI,
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color,
          fontWeight: 600,
        }}
      >
        {children}
      </span>
    </div>
  )
}

/* ---------------- Tag ---------------- */
export function Tag({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "primary" | "celeste" | "gold"
  children: ReactNode
}) {
  const tones = {
    neutral: { bg: "#fff", color: JMV.ink, border: JMV.line },
    primary: { bg: "#fff", color: JMV.blue, border: JMV.blue + "22" },
    celeste: { bg: "#fff", color: JMV.celeste, border: JMV.celeste + "33" },
    gold: { bg: "#fff", color: "#8A5A00", border: JMV.gold + "55" },
  } as const
  const t = tones[tone]
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 999,
        background: t.bg,
        color: t.color,
        border: "1px solid " + t.border,
        fontFamily: FONT_UI,
        fontWeight: 500,
        fontSize: 11.5,
        letterSpacing: "0.02em",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: 999, background: t.color, opacity: 0.8 }} />
      {children}
    </span>
  )
}

/* ---------------- Logo ---------------- */
export function Logo({ size = 40 }: { size?: number; mono?: boolean }) {
  return (
    <Image
      src="/logo/jmv-logo-removebg-preview.png"
      alt="JMV"
      width={size}
      height={size}
      style={{ display: "block", objectFit: "contain" }}
    />
  )
}

/* ---------------- Serif display helper ---------------- */
export function Serif({
  children,
  size = 48,
  weight = 400,
  italic,
  style = {},
}: {
  children: ReactNode
  size?: number
  weight?: number
  italic?: boolean
  style?: CSSProperties
}) {
  return (
    <span
      style={{
        fontFamily: FONT_DISPLAY,
        fontSize: size,
        fontWeight: weight,
        fontStyle: italic ? "italic" : "normal",
        fontVariationSettings: `"opsz" ${Math.min(144, Math.max(9, size * 1.2))}, "SOFT" 50`,
        letterSpacing: "-0.02em",
        lineHeight: 1.02,
        color: JMV.ink,
        ...style,
      }}
    >
      {children}
    </span>
  )
}

/* ---------------- Rule ---------------- */
export function Rule({
  w = "100%",
  color = JMV.line,
  style = {},
}: {
  w?: string | number
  color?: string
  style?: CSSProperties
}) {
  return <div style={{ width: w, height: 1, background: color, ...style }} />
}

/* ---------------- PhotoTile (elegant gradient placeholder) ---------------- */
type TileKind = "community" | "prayer" | "service" | "landscape" | "dark"

export function PhotoTile({
  h = 360,
  label,
  kind = "community",
  children,
  style = {},
}: {
  h?: number
  label?: string
  kind?: TileKind
  children?: ReactNode
  style?: CSSProperties
}) {
  const palettes: Record<TileKind, [string, string, string]> = {
    community: ["#1F1CA5", "#19168D", "#0C8BB5"],
    prayer: ["#E9E6FC", "#C7D5F5", "#F3E6C8"],
    service: ["#F3A736", "#EFD9A0", "#FAF6ED"],
    landscape: ["#D7E4F4", "#F4EEDE", "#EFD9A0"],
    dark: ["#100E66", "#19168D", "#139FCC"],
  }
  const c = palettes[kind]
  return (
    <div
      style={{
        position: "relative",
        height: h,
        borderRadius: 4,
        overflow: "hidden",
        background: `linear-gradient(135deg, ${c[0]} 0%, ${c[1]} 55%, ${c[2]} 100%)`,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
          mixBlendMode: "overlay",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: 14,
          fontFamily: FONT_UI,
          fontSize: 10,
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.75)",
          textTransform: "uppercase",
        }}
      >
        {label || "JMV RD"}
      </div>
      {children}
    </div>
  )
}
