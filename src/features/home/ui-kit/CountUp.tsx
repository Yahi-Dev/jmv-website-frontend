"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { usePrefersReducedMotion } from "@/src/hooks/use-prefers-reduced-motion"

type Props = {
  value: string
  duration?: number
}

/**
 * Count-up animation triggered when the element enters the viewport.
 * Parses a leading number from `value` and preserves whatever suffix follows
 * (e.g. "500+" → animates 0→500 with "+" suffix; "50 países" keeps " países").
 *
 * If `value` changes AFTER the first animation has played (e.g. async data
 * arrives), we smoothly animate from the currently displayed value to the
 * new target instead of leaving the counter stuck at the initial number.
 */
export function CountUp({ value, duration = 2500 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasRunOnceRef = useRef(false)
  const displayRef = useRef(0)
  const reducedMotion = usePrefersReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    displayRef.current = display
  }, [display])

  const parsed = useMemo(() => {
    const m = value.match(/^([0-9]+(?:\.[0-9]+)?)(.*)$/)
    if (!m) return null
    return {
      target: parseFloat(m[1]),
      decimals: m[1].includes(".") ? m[1].split(".")[1].length : 0,
      suffix: m[2],
    }
  }, [value])

  useEffect(() => {
    const el = ref.current
    if (!el || !parsed) return

    // Respeta prefers-reduced-motion: salta directo al valor final sin animar.
    if (reducedMotion) {
      hasRunOnceRef.current = true
      setDisplay(parsed.target)
      return
    }

    let rafId = 0

    const animate = (from: number, to: number) => {
      if (rafId) cancelAnimationFrame(rafId)
      if (from === to) {
        setDisplay(to)
        return
      }
      const startTime = performance.now()
      const step = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(from + (to - from) * eased)
        if (progress < 1) rafId = requestAnimationFrame(step)
      }
      rafId = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRunOnceRef.current) {
          hasRunOnceRef.current = true
          animate(0, parsed.target)
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(el)

    // Already animated once, but the target just changed (async data, prop
    // update, etc.). Smooth-animate from the current displayed value rather
    // than snapping or leaving the counter stuck at the old number.
    if (hasRunOnceRef.current) {
      animate(displayRef.current, parsed.target)
    }

    return () => {
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [parsed, duration, reducedMotion])

  if (!parsed) return <span ref={ref}>{value}</span>

  const formatted = parsed.decimals > 0 ? display.toFixed(parsed.decimals) : Math.round(display).toString()

  return (
    <span ref={ref}>
      {formatted}
      {parsed.suffix}
    </span>
  )
}
