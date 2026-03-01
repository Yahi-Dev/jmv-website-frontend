// src/features/libro-oracion/components/ContentRenderer.tsx
import type { ContentBlock } from "../types"

interface Props {
  blocks: ContentBlock[]
}

export function ContentRenderer({ blocks }: Props) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="text-stone-800 leading-relaxed text-[15px] text-justify hyphens-auto">
                {block.text}
              </p>
            )

          case "heading":
            if (block.level === 2) {
              return (
                <h2 key={i} className="text-2xl font-bold text-red-900 mt-8 mb-2" style={{ fontFamily: "Georgia, serif" }}>
                  {block.text}
                </h2>
              )
            }
            if (block.level === 3) {
              return (
                <h3 key={i} className="text-lg font-bold text-amber-800 mt-6 mb-1" style={{ fontFamily: "Georgia, serif" }}>
                  {block.text}
                </h3>
              )
            }
            return (
              <h4 key={i} className="text-base font-semibold text-stone-700 mt-4 mb-1">
                {block.text}
              </h4>
            )

          case "subheading":
            return (
              <p key={i} className="font-semibold text-amber-800 mt-5 mb-1 text-[15px]">
                {block.text}
              </p>
            )

          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-amber-600/50 bg-amber-50/60 px-5 py-4 my-5 rounded-r-md italic"
              >
                <p className="text-stone-700 leading-relaxed text-[14px]">«{block.text}»</p>
                {block.source && (
                  <footer className="mt-2 text-xs text-amber-700/80 font-medium not-italic">— {block.source}</footer>
                )}
              </blockquote>
            )

          case "scripture":
            return (
              <div
                key={i}
                className="bg-amber-50/80 border border-amber-200/60 rounded-md px-5 py-4 my-4"
              >
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1.5">
                  {block.reference}
                </p>
                <p className="text-stone-700 italic leading-relaxed text-[14px]">{block.text}</p>
              </div>
            )

          case "list":
            if (block.ordered) {
              return (
                <ol key={i} className="list-decimal list-inside space-y-2 pl-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="text-stone-800 text-[15px] leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ol>
              )
            }
            return (
              <ul key={i} className="space-y-2 pl-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-stone-800 text-[15px] leading-relaxed">
                    <span className="text-amber-600 mt-1 shrink-0">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )

          case "bold-list":
            return (
              <div key={i} className="space-y-4 pl-1">
                {block.items.map((item, j) => (
                  <div key={j} className="pl-3 border-l-2 border-amber-400/40">
                    <p className="font-semibold text-stone-800 text-[15px]">{item.label}</p>
                    <p className="text-stone-700 text-[14px] leading-relaxed mt-1">{item.text}</p>
                  </div>
                ))}
              </div>
            )

          case "prayer":
            return (
              <div
                key={i}
                className={`my-6 ${block.centered ? "text-center" : ""}`}
              >
                {block.title && (
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-3 text-center">
                    {block.title}
                  </p>
                )}
                <div className="bg-amber-50/50 border border-amber-200/40 rounded-md px-6 py-5 space-y-1.5">
                  {block.lines.map((line, j) => (
                    <p
                      key={j}
                      className={`text-stone-700 italic leading-relaxed text-[14px] ${block.centered ? "text-center" : ""}`}
                    >
                      {line || <>&nbsp;</>}
                    </p>
                  ))}
                </div>
              </div>
            )

          case "divider":
            return (
              <div key={i} className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-amber-300/40" />
                <span className="text-amber-500/60 text-sm">✦</span>
                <div className="flex-1 h-px bg-amber-300/40" />
              </div>
            )

          case "image":
            return (
              <figure key={i} className="my-8 flex flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.src}
                  alt={block.alt}
                  className="max-w-full rounded-md shadow-md border border-amber-200/50"
                  style={{ maxHeight: "520px", objectFit: "contain" }}
                />
                {block.caption && (
                  <figcaption className="text-xs text-stone-500 italic text-center">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
