"use client"
// src/features/libro-oracion/components/TableOfContents.tsx
import { useState, useEffect } from "react"
import type { Book } from "../types"

interface Props {
  book: Book
}

export function TableOfContents({ book }: Props) {
  const [activeId, setActiveId] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    )

    const headings = document.querySelectorAll("[data-scroll-target]")
    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsOpen(false)
  }

  const tocContent = (
    <nav className="space-y-1">
      {/* Cover link */}
      <button
        onClick={() => scrollTo("book-cover")}
        className={`w-full text-left text-xs px-3 py-1.5 rounded transition-colors font-medium tracking-wide uppercase
          ${activeId === "book-cover"
            ? "bg-amber-700/30 text-amber-200"
            : "text-amber-100/70 hover:text-amber-200 hover:bg-amber-700/20"}`}
      >
        Portada
      </button>

      {book.chapters.map((chapter) => (
        <div key={chapter.id} className="space-y-0.5">
          {/* Chapter heading */}
          <button
            onClick={() => scrollTo(chapter.id)}
            className={`w-full text-left text-xs px-3 py-1.5 rounded transition-colors font-semibold
              ${activeId === chapter.id
                ? "bg-amber-700/30 text-amber-200"
                : "text-amber-300/90 hover:text-amber-200 hover:bg-amber-700/20"}`}
          >
            Cap. {chapter.number}: {chapter.title}
          </button>

          {/* Sections */}
          {chapter.sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`w-full text-left text-xs px-5 py-1 rounded transition-colors
                ${activeId === section.id
                  ? "bg-amber-700/30 text-amber-200"
                  : "text-amber-100/55 hover:text-amber-200 hover:bg-amber-700/20"}`}
            >
              {section.title}
            </button>
          ))}
        </div>
      ))}
    </nav>
  )

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-amber-900/90 border border-amber-600/40 text-amber-200 px-3 py-2 rounded-md text-xs font-medium shadow-lg backdrop-blur"
        >
          {isOpen ? "✕ Cerrar" : "☰ Índice"}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-72 bg-[#1a0800] border-r border-amber-700/30 overflow-y-auto p-4 pt-14"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-amber-500/70 text-[10px] uppercase tracking-widest mb-3 font-semibold">Índice</p>
            {tocContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
        <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
          <div className="bg-[#1a0800]/80 border border-amber-700/30 rounded-lg p-4 backdrop-blur">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-amber-500 text-base">✝</span>
              <p className="text-amber-500/80 text-[10px] uppercase tracking-widest font-semibold">Índice</p>
            </div>
            {tocContent}
          </div>
        </div>
      </aside>
    </>
  )
}
