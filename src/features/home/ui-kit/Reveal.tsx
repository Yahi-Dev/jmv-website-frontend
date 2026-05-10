"use client"

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react"

type Props = {
  children: ReactNode
  delay?: number      // ms
  duration?: number   // ms
  y?: number          // initial translateY in px
  className?: string
  style?: CSSProperties
  threshold?: number
  once?: boolean
}

/**
 * Wraps children with an IntersectionObserver-driven fade-in + slide-up.
 * Triggers when the element enters viewport. Good for staggered card reveals.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 700,
  y = 24,
  className,
  style,
  threshold = 0.18,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          if (once) obs.unobserve(el)
        } else if (!once) {
          setShown(false)
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, once])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity ${duration}ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  )
}
