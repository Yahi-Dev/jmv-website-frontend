"use client"

import { useEffect, useState, type CSSProperties, type ReactNode } from "react"
import { JMV, FONT_UI } from "./tokens"

/**
 * Shows one or more real images inside a fixed box, gracefully handling ANY aspect
 * ratio: a blurred copy of the image fills the box (no empty bars) and the full,
 * sharp image sits on top (objectFit: contain — nothing important is cropped).
 * When given multiple images it crossfades between them on an interval.
 */
export function PhotoCycler({
  images,
  h = 360,
  label,
  intervalMs = 5000,
  startDelay = 0,
  style = {},
  children,
}: {
  images: string[]
  h?: number
  label?: string
  intervalMs?: number
  startDelay?: number
  style?: CSSProperties
  children?: ReactNode
}) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    let interval: ReturnType<typeof setInterval> | undefined
    const timeout = setTimeout(() => {
      interval = setInterval(() => setIdx((i) => (i + 1) % images.length), intervalMs)
    }, startDelay)
    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [images.length, intervalMs, startDelay])

  return (
    <div
      style={{
        position: "relative",
        height: h,
        borderRadius: 4,
        overflow: "hidden",
        background: "linear-gradient(135deg, #100E66 0%, #19168D 55%, #139FCC 100%)",
        ...style,
      }}
    >
      {images.map((src, i) => (
        <div
          key={src + i}
          aria-hidden={i !== idx}
          style={{ position: "absolute", inset: 0, opacity: i === idx ? 1 : 0, transition: "opacity 1.1s ease" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(18px) brightness(0.55)",
              transform: "scale(1.1)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={label || "JMV"}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </div>
      ))}

      {/* Bottom scrim for label legibility */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(11,16,32,0.6) 0%, rgba(11,16,32,0) 40%)",
          pointerEvents: "none",
        }}
      />

      {label ? (
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: 14,
            fontFamily: FONT_UI,
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.9)",
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          {label}
        </div>
      ) : null}

      {images.length > 1 ? (
        <div style={{ position: "absolute", bottom: 14, right: 14, display: "flex", gap: 6, zIndex: 1 }}>
          {images.map((_, i) => (
            <span
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: i === idx ? JMV.gold : "rgba(255,255,255,0.45)",
                transition: "background .3s",
              }}
            />
          ))}
        </div>
      ) : null}

      {children}
    </div>
  )
}
