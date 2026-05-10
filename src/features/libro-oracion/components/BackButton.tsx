"use client"

import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    // If the user landed here directly (no in-app history), send them home
    // instead of leaving the site or hitting an empty history stack.
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <button
      onClick={handleBack}
      aria-label="Volver"
      className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-black/20 px-3.5 py-1.5 text-amber-200/80 text-xs uppercase tracking-widest font-medium transition-colors hover:border-amber-400/60 hover:text-amber-100 hover:bg-black/30"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12,19 5,12 12,5" />
      </svg>
      Volver
    </button>
  )
}
