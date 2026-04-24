"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  value: string
  duration?: number
}

/**
 * Count-up animation triggered when the element enters the viewport.
 * Parses a leading number from `value` and preserves whatever suffix follows
 * (e.g. "500+" → animates 0→500 with "+" suffix; "50 países" keeps " países").
 */
export function CountUp({ value, duration = 2500 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)
  const [display, setDisplay] = useState(0)

  const match = value.match(/^([0-9]+(?:\.[0-9]+)?)(.*)$/)
  const target = match ? parseFloat(match[1]) : 0
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0
  const suffix = match ? match[2] : ""

  useEffect(() => {
    const el = ref.current
    if (!el || !match) return

    let rafId = 0

    const run = () => {
      const startTime = performance.now()
      const step = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        // ease-out cubic — starts fast, gently settles into the target
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(target * eased)
        if (progress < 1) rafId = requestAnimationFrame(step)
      }
      rafId = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          run()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [target, duration, match])

  if (!match) return <span ref={ref}>{value}</span>

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString()

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  )
}
