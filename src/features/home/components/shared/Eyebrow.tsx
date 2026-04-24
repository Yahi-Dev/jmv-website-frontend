import type { ReactNode } from "react"

interface EyebrowProps {
  children: ReactNode
  align?: "left" | "center"
  tone?: "gold" | "white"
}

export function Eyebrow({ children, align = "left", tone = "gold" }: EyebrowProps) {
  const color = tone === "gold" ? "text-jmv-gold" : "text-white"
  const bar = tone === "gold" ? "bg-jmv-gold" : "bg-white"
  return (
    <div
      className={`flex items-center gap-2.5 ${align === "center" ? "justify-center" : "justify-start"}`}
    >
      <span className={`block h-px w-[18px] ${bar}`} />
      <span
        className={`font-ui text-[11px] font-semibold uppercase tracking-[0.24em] ${color}`}
      >
        {children}
      </span>
    </div>
  )
}
