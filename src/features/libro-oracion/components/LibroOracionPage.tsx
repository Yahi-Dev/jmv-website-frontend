// src/features/libro-oracion/components/LibroOracionPage.tsx
import { TableOfContents } from "./TableOfContents"
import { ContentRenderer } from "./ContentRenderer"
import { libroOracion } from "../data"
import type { Chapter } from "../types"

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div className="flex-1 h-px bg-amber-600/30" />
      <span className="text-amber-500/70 text-lg">✦</span>
      <div className="flex-1 h-px bg-amber-600/30" />
    </div>
  )
}

function ChapterHeader({ chapter }: { chapter: Chapter }) {
  return (
    <div
      id={chapter.id}
      data-scroll-target
      className="text-center py-10 px-4 mb-6 border-b border-amber-300/20"
    >
      <p className="text-amber-600/70 text-xs uppercase tracking-[0.25em] font-semibold mb-2">
        Capítulo {chapter.number}
      </p>
      <h2
        className="text-3xl sm:text-4xl font-bold text-red-900 leading-tight"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {chapter.title}
      </h2>
      {chapter.subtitle && (
        <p
          className="mt-2 text-lg text-amber-700/80 italic"
          style={{ fontFamily: "Georgia, serif" }}
        >
          «{chapter.subtitle}»
        </p>
      )}
      <div className="mt-6 flex justify-center gap-4 text-amber-400/50 text-xl">
        <span>✦</span>
        <span>✝</span>
        <span>✦</span>
      </div>
    </div>
  )
}

function BookCover() {
  return (
    <section
      id="book-cover"
      data-scroll-target
      className="relative flex flex-col items-center justify-center text-center py-20 px-6 mb-12 border-b border-amber-300/20"
    >
      {/* Decorative top ornament */}
      <div className="mb-8 flex flex-col items-center gap-1">
        <span className="text-amber-500 text-4xl">✝</span>
        <div className="w-32 h-px bg-amber-500/40" />
        <div className="flex gap-2 text-amber-500/50">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>
      </div>

      {/* Title */}
      <h1
        className="text-4xl sm:text-5xl font-bold text-red-900 leading-tight mb-3"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {libroOracion.title}
      </h1>
      <p
        className="text-xl text-amber-700 italic mb-8"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {libroOracion.subtitle}
      </p>

      {/* Divider */}
      <div className="flex items-center gap-4 w-full max-w-xs mb-8">
        <div className="flex-1 h-px bg-amber-400/40" />
        <span className="text-amber-500/60 text-sm">✦</span>
        <div className="flex-1 h-px bg-amber-400/40" />
      </div>

      {/* Authors */}
      <p className="text-stone-600 text-sm mb-1">
        {libroOracion.authors.join(" & ")}
      </p>
      <p className="text-stone-500 text-xs uppercase tracking-widest">
        Juventud Mariana Vicenciana · República Dominicana
      </p>

      {/* Bottom ornament */}
      <div className="mt-10 flex flex-col items-center gap-1">
        <div className="flex gap-2 text-amber-500/50">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>
        <div className="w-32 h-px bg-amber-500/40" />
      </div>
    </section>
  )
}

function TableOfContentsPage() {
  const { chapters } = libroOracion
  return (
    <section className="mb-12 pb-10 border-b border-amber-300/20">
      <div className="text-center mb-8">
        <p className="text-amber-600/70 text-xs uppercase tracking-widest font-semibold mb-1">Contenido</p>
        <h2
          className="text-2xl font-bold text-red-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Índice General
        </h2>
        <Ornament />
      </div>

      <ol className="space-y-4">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <div className="flex items-baseline gap-3">
              <span className="text-amber-600/60 text-sm font-medium shrink-0">Cap. {chapter.number}</span>
              <div className="flex-1 border-b border-amber-300/20 flex items-end justify-between pb-0.5">
                <span className="font-semibold text-stone-800 text-[15px]" style={{ fontFamily: "Georgia, serif" }}>
                  {chapter.title}
                  {chapter.subtitle && (
                    <span className="italic text-stone-600 font-normal"> — {chapter.subtitle}</span>
                  )}
                </span>
              </div>
            </div>
            <ul className="mt-1.5 space-y-1 pl-16">
              {chapter.sections.map((section) => (
                <li key={section.id} className="flex items-baseline gap-2 text-[13px]">
                  <span className="text-amber-500/50 shrink-0">✦</span>
                  <span className="text-stone-600">{section.title}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function LibroOracionPage() {
  const { chapters } = libroOracion

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #1a0500 0%, #2d0f00 40%, #1a0800 100%)" }}
    >
      {/* Background texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a532' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Header bar */}
      <header className="relative z-10 border-b border-amber-700/20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 text-lg">✝</span>
            <span className="text-amber-200/70 text-xs uppercase tracking-widest font-medium">
              JMV República Dominicana
            </span>
          </div>
          <span className="text-amber-500/50 text-xs hidden sm:block">
            Libro de Oración
          </span>
        </div>
      </header>

      {/* Main layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 flex gap-8">
        {/* TOC Sidebar */}
        <TableOfContents book={libroOracion} />

        {/* Book content */}
        <main className="flex-1 min-w-0">
          {/* Parchment paper */}
          <div
            className="rounded-xl shadow-2xl overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #fdf8ed 0%, #fdf3dc 30%, #fdf8ed 100%)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            {/* Parchment inner border */}
            <div className="m-3 rounded-lg border border-amber-300/30 p-6 sm:p-10">
              {/* Cover */}
              <BookCover />

              {/* TOC page */}
              <TableOfContentsPage />

              {/* Chapters */}
              {chapters.map((chapter, ci) => (
                <article key={chapter.id} className={ci > 0 ? "mt-12" : ""}>
                  <ChapterHeader chapter={chapter} />

                  {/* Chapter intro blocks */}
                  {chapter.intro && chapter.intro.length > 0 && (
                    <div className="mb-8">
                      <ContentRenderer blocks={chapter.intro} />
                    </div>
                  )}

                  {/* Sections */}
                  {chapter.sections.map((section, si) => (
                    <section
                      key={section.id}
                      id={section.id}
                      data-scroll-target
                      className={si > 0 ? "mt-10 pt-8 border-t border-amber-200/40" : ""}
                    >
                      <h3
                        className="text-xl font-bold text-red-800 mb-5"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                      >
                        {section.title}
                      </h3>
                      <ContentRenderer blocks={section.content} />
                    </section>
                  ))}

                  {ci < chapters.length - 1 && (
                    <div className="mt-14 flex flex-col items-center gap-2">
                      <div className="flex gap-3 text-amber-400/50">
                        <span>✦</span>
                        <span className="text-amber-500/60">✝</span>
                        <span>✦</span>
                      </div>
                      <div className="w-48 h-px bg-amber-300/30" />
                    </div>
                  )}
                </article>
              ))}

              {/* Footer */}
              <footer className="mt-16 pt-8 border-t border-amber-200/40 text-center">
                <div className="flex justify-center gap-3 text-amber-400/40 mb-4">
                  <span>✦</span>
                  <span className="text-amber-500/50 text-lg">✝</span>
                  <span>✦</span>
                </div>
                <p className="text-stone-500 text-xs">
                  Juventud Mariana Vicenciana · República Dominicana
                </p>
                <p className="text-stone-400 text-[11px] mt-1">
                  Continuará — Más capítulos próximamente
                </p>
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
