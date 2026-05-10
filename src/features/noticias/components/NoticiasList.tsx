// src/features/noticias/components/NoticiasList.tsx
"use client"

import { useState, useEffect, useMemo } from "react"
import { useDebouncedValue } from "@/src/hooks/use-debounced-value"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Eyebrow, Icon, Serif, Tag } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { CountUp } from "@/src/features/home/ui-kit/CountUp"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import { Noticia, NoticiaTipo } from "../model/types"
import { getNoticias, getNoticiaTipos } from "../service/noticia-service"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command"

export function NoticiasList() {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebouncedValue(search, 350)
  const [selectedTipo, setSelectedTipo] = useState<string>("all")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [allNoticias, setAllNoticias] = useState<Noticia[]>([])
  const [tipos, setTipos] = useState<NoticiaTipo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ctrl = new AbortController()
    getNoticiaTipos(ctrl.signal)
      .then((r) => setTipos(Array.isArray(r.data) ? (r.data as NoticiaTipo[]) : []))
      .catch(() => setTipos([]))
    return () => ctrl.abort()
  }, [])

  useEffect(() => {
    const ctrl = new AbortController()
    setLoading(true)
    setSelectedTag(null)
    getNoticias({ search: debouncedSearch || undefined, limit: 100, signal: ctrl.signal })
      .then((result) => {
        const data = result.data
        setAllNoticias(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if ((err as Error)?.name === "AbortError") return
        setAllNoticias([])
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false)
      })
    return () => ctrl.abort()
  }, [debouncedSearch])

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()
    allNoticias.forEach((n) => n.etiquetas.forEach((t) => tagSet.add(t)))
    return Array.from(tagSet).sort()
  }, [allNoticias])

  const filteredNoticias = useMemo(() => {
    let result = allNoticias
    if (selectedTipo && selectedTipo !== "all") {
      result = result.filter((n) => n.tipo === selectedTipo)
    }
    if (selectedTag) {
      result = result.filter((n) => n.etiquetas.includes(selectedTag))
    }
    return result
  }, [allNoticias, selectedTipo, selectedTag])

  const featured = filteredNoticias.filter((n) => n.destacada)
  const regular = filteredNoticias.filter((n) => !n.destacada)

  const stats = useMemo(() => {
    return {
      total: allNoticias.length,
      tipos: new Set(allNoticias.map((n) => n.tipo)).size,
      destacadas: allNoticias.filter((n) => n.destacada).length,
    }
  }, [allNoticias])

  const [tagsExpanded, setTagsExpanded] = useState(false)

  const clearFilters = () => {
    setSearch("")
    setSelectedTipo("all")
    setSelectedTag(null)
  }
  const hasActive = !!search || (selectedTipo && selectedTipo !== "all") || !!selectedTag

  return (
    <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />

      {/* HERO */}
      <section
        style={{
          background: JMV.white,
          padding: "56px 32px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          className="jmv-spin-slow"
          style={{
            position: "absolute",
            top: -180,
            right: -200,
            width: 500,
            height: 500,
            borderRadius: "50%",
            border: "1px dashed rgba(243,167,54,0.16)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          className="jmv-pulse-soft"
          style={{
            position: "absolute",
            top: 80,
            right: 60,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(243,167,54,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          className="jmv-float-slow"
          style={{
            position: "absolute",
            top: 220,
            right: 240,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: JMV.celeste,
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <Reveal delay={0} y={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontFamily: FONT_UI,
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: JMV.mute,
                marginBottom: 40,
              }}
            >
              <span style={{ display: "inline-block", width: 36, height: 1, background: JMV.gold }} />
              <span>Actualidad</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>JMV República Dominicana</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span style={{ color: JMV.gold }}>Noticias y reportajes</span>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "end" }}>
            <div>
              <Reveal delay={120} y={20}>
                <Eyebrow>Noticias JMV</Eyebrow>
              </Reveal>
              <Reveal delay={220} y={32}>
                <h1
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "clamp(3rem, 7vw, 6.4rem)",
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: "-0.025em",
                    color: JMV.ink,
                    margin: "28px 0 0",
                    fontVariationSettings: '"opsz" 144, "SOFT" 50',
                  }}
                >
                  Lo que está{" "}
                  <span style={{ fontStyle: "italic", color: JMV.gold, fontWeight: 300 }}>pasando</span>
                  <br />
                  en el <span style={{ fontStyle: "italic", fontWeight: 300 }}>movimiento</span>.
                </h1>
              </Reveal>
            </div>

            <Reveal delay={380} y={20}>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: JMV.body,
                  margin: 0,
                  maxWidth: 440,
                }}
              >
                Mantente informado sobre nuestras actividades, logros y el impacto transformador del trabajo de
                JMV en cada centro y comunidad del país.
              </p>
            </Reveal>
          </div>

          <Reveal delay={520} y={20}>
            <div
              style={{
                marginTop: 80,
                paddingTop: 24,
                borderTop: "1px solid " + JMV.line,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 32,
              }}
            >
              {[
                { k: "Noticias publicadas", v: String(stats.total || 0), color: JMV.ink },
                { k: "Categorías", v: String(stats.tipos || 0), color: JMV.celeste },
                { k: "Destacadas", v: String(stats.destacadas || 0), color: JMV.gold },
              ].map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: FONT_UI,
                      fontSize: 10.5,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: JMV.mute,
                      marginBottom: 10,
                    }}
                  >
                    {s.k}
                  </div>
                  <Serif size={42} weight={300} style={{ color: s.color }}>
                    <CountUp value={s.v} duration={1800} />
                  </Serif>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FILTERS BAR (sticky, compact) */}
      <section
        style={{
          position: "sticky",
          top: 64,
          zIndex: 5,
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderTop: "1px solid " + JMV.line,
          borderBottom: "1px solid " + JMV.line,
          padding: "12px 32px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Top row: search + types (scrollable) + counter + tags toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "nowrap",
              minHeight: 44,
            }}
          >
            {/* Search */}
            <div style={{ position: "relative", flex: "1 1 auto", maxWidth: 480 }}>
              <span
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: JMV.mute,
                  pointerEvents: "none",
                }}
              >
                <Icon name="search" size={14} />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar noticias..."
                style={{
                  width: "100%",
                  padding: "10px 36px 10px 38px",
                  background: JMV.white,
                  border: "1px solid " + JMV.line,
                  borderRadius: 999,
                  fontFamily: FONT_UI,
                  fontSize: 13,
                  color: JMV.ink,
                  outline: "none",
                  transition: "border-color .15s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = JMV.ink)}
                onBlur={(e) => (e.currentTarget.style.borderColor = JMV.line)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Limpiar"
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: JMV.mute,
                    fontSize: 18,
                    width: 18,
                    height: 18,
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              )}
            </div>

            {/* Tipo combobox */}
            {tipos.length > 0 && (
              <TipoCombobox
                tipos={tipos}
                selected={selectedTipo}
                onChange={setSelectedTipo}
              />
            )}

            {/* Tags toggle */}
            {!loading && availableTags.length > 0 && (
              <button
                onClick={() => setTagsExpanded((v) => !v)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: tagsExpanded || selectedTag ? JMV.gold : "transparent",
                  color: tagsExpanded || selectedTag ? "#fff" : JMV.body,
                  border: "1px solid " + (tagsExpanded || selectedTag ? JMV.gold : JMV.line),
                  fontFamily: FONT_UI,
                  fontSize: 12.5,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all .15s ease",
                  flexShrink: 0,
                }}
              >
                Etiquetas
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 20,
                    height: 18,
                    padding: "0 5px",
                    borderRadius: 999,
                    background:
                      tagsExpanded || selectedTag
                        ? "rgba(255,255,255,0.25)"
                        : JMV.line,
                    fontSize: 11,
                    fontWeight: 600,
                    color: tagsExpanded || selectedTag ? "#fff" : JMV.body,
                  }}
                >
                  {selectedTag ? 1 : availableTags.length}
                </span>
                <span
                  aria-hidden
                  style={{
                    display: "inline-flex",
                    transition: "transform .2s ease",
                    transform: tagsExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <Icon
                    name="chevron"
                    size={11}
                    color={tagsExpanded || selectedTag ? "#fff" : JMV.mute}
                  />
                </span>
              </button>
            )}

            {/* Counter */}
            <span
              style={{
                fontFamily: FONT_UI,
                fontSize: 12,
                color: JMV.mute,
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {loading
                ? "..."
                : `${filteredNoticias.length} noticia${filteredNoticias.length !== 1 ? "s" : ""}`}
            </span>

            {hasActive && (
              <button
                onClick={clearFilters}
                style={{
                  background: "transparent",
                  border: "none",
                  color: JMV.mute,
                  fontFamily: FONT_UI,
                  fontSize: 12,
                  cursor: "pointer",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
              >
                × Limpiar
              </button>
            )}
          </div>

          {/* Tags expanded panel — animated */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: tagsExpanded ? "1fr" : "0fr",
              transition: "grid-template-rows .35s cubic-bezier(.2,.7,.2,1)",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              {!loading && availableTags.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    paddingTop: tagsExpanded ? 12 : 0,
                    transition: "padding-top .25s ease",
                  }}
                >
                  {availableTags.map((tag) => (
                    <FilterChip
                      key={tag}
                      label={tag}
                      active={selectedTag === tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      variant="gold"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: JMV.white, padding: "80px 32px 120px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {loading ? (
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 15,
                color: JMV.mute,
                textAlign: "center",
                padding: "60px 0",
              }}
            >
              Cargando noticias...
            </p>
          ) : filteredNoticias.length === 0 ? (
            <div
              style={{
                padding: "80px 32px",
                textAlign: "center",
                border: "1px dashed " + JMV.line,
                borderRadius: 4,
                background: JMV.paper,
              }}
            >
              <Serif size={28} weight={300} style={{ display: "block", marginBottom: 10 }}>
                Sin resultados
              </Serif>
              <p style={{ fontFamily: FONT_BODY, fontSize: 14.5, color: JMV.mute, margin: 0 }}>
                {hasActive
                  ? "No hay noticias que coincidan con los filtros aplicados."
                  : "Aún no hay noticias publicadas."}
              </p>
              {hasActive && (
                <button
                  onClick={clearFilters}
                  className="jmv-ghost-pill"
                  style={{ marginTop: 24, textDecoration: "none" }}
                >
                  Limpiar filtros <Icon name="arrowUR" size={13} />
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured.length > 0 && (
                <section style={{ marginBottom: 96 }}>
                  <Reveal delay={0} y={20}>
                    <div style={{ marginBottom: 36 }}>
                      <Eyebrow color={JMV.gold}>Destacadas</Eyebrow>
                      <Serif size={44} weight={300} style={{ display: "block", marginTop: 16 }}>
                        Lo más <span style={{ fontStyle: "italic", color: JMV.gold }}>relevante</span>.
                      </Serif>
                    </div>
                  </Reveal>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 32 }}>
                    {featured.map((n, i) => (
                      <Reveal key={n.id} delay={i * 100} y={28}>
                        <NoticiaCardEditorial noticia={n} variant="featured" />
                      </Reveal>
                    ))}
                  </div>
                </section>
              )}

              {/* Regular */}
              {regular.length > 0 && (
                <section>
                  <Reveal delay={0} y={20}>
                    <div style={{ marginBottom: 36 }}>
                      <Eyebrow color={JMV.blue}>Todas las noticias</Eyebrow>
                      <Serif size={44} weight={300} style={{ display: "block", marginTop: 16 }}>
                        El pulso del <span style={{ fontStyle: "italic", color: JMV.celeste }}>movimiento</span>.
                      </Serif>
                    </div>
                  </Reveal>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 }}>
                    {regular.map((n, i) => (
                      <Reveal key={n.id} delay={i * 80} y={28}>
                        <NoticiaCardEditorial noticia={n} />
                      </Reveal>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}

function TipoCombobox({
  tipos,
  selected,
  onChange,
}: {
  tipos: NoticiaTipo[]
  selected: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const isActive = selected !== "all"
  const selectedLabel = isActive ? selected : "Tipo"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            borderRadius: 999,
            background: isActive ? JMV.ink : "transparent",
            color: isActive ? "#fff" : JMV.body,
            border: "1px solid " + (isActive ? JMV.ink : JMV.line),
            fontFamily: FONT_UI,
            fontSize: 12.5,
            fontWeight: 500,
            cursor: "pointer",
            transition: "all .15s ease",
            flexShrink: 0,
            maxWidth: 280,
          }}
        >
          <Icon name="globe" size={12} color={isActive ? "#fff" : JMV.mute} />
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: 200,
            }}
          >
            {selectedLabel}
          </span>
          {isActive && (
            <span
              role="button"
              aria-label="Quitar filtro"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onChange("all")
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  e.stopPropagation()
                  onChange("all")
                }
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 18,
                height: 18,
                borderRadius: 999,
                background: "rgba(255,255,255,0.22)",
                color: "#fff",
                fontSize: 14,
                lineHeight: 1,
                cursor: "pointer",
              }}
            >
              ×
            </span>
          )}
          {!isActive && (
            <span
              aria-hidden
              style={{
                display: "inline-flex",
                transition: "transform .2s ease",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <Icon name="chevron" size={11} color={JMV.mute} />
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="p-0"
        style={{
          width: 280,
          background: JMV.white,
          border: "1px solid " + JMV.line,
          borderRadius: 8,
          boxShadow: "0 14px 40px -12px rgba(11,16,32,0.18)",
          fontFamily: FONT_UI,
        }}
      >
        <Command
          style={{ background: "transparent" }}
          filter={(value, search) =>
            value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }
        >
          <CommandInput
            placeholder="Buscar tipo..."
            style={{ fontFamily: FONT_UI, fontSize: 13.5 }}
          />
          <CommandList style={{ maxHeight: 320 }}>
            <CommandEmpty>
              <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: JMV.mute }}>
                Sin resultados.
              </span>
            </CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="todos los tipos"
                onSelect={() => {
                  onChange("all")
                  setOpen(false)
                }}
                style={{
                  fontFamily: FONT_UI,
                  fontSize: 13.5,
                  color: JMV.body,
                  fontWeight: selected === "all" ? 600 : 450,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 18,
                    height: 18,
                    marginRight: 10,
                    color: selected === "all" ? JMV.ink : "transparent",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                Todos los tipos
              </CommandItem>
              {tipos.map((t) => {
                const active = selected === t.nombre
                return (
                  <CommandItem
                    key={t.id}
                    value={t.nombre}
                    onSelect={() => {
                      onChange(t.nombre)
                      setOpen(false)
                    }}
                    style={{
                      fontFamily: FONT_UI,
                      fontSize: 13.5,
                      color: active ? JMV.ink : JMV.body,
                      fontWeight: active ? 600 : 450,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 18,
                        height: 18,
                        marginRight: 10,
                        color: active ? JMV.ink : "transparent",
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {t.nombre}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function FilterChip({
  label,
  active,
  onClick,
  variant,
}: {
  label: string
  active: boolean
  onClick: () => void
  variant: "dark" | "gold"
}) {
  const styleActive =
    variant === "dark"
      ? { background: JMV.ink, color: "#fff", border: "1px solid " + JMV.ink }
      : { background: JMV.gold, color: "#fff", border: "1px solid " + JMV.gold }

  const styleIdle = {
    background: "transparent",
    color: JMV.body,
    border: "1px solid " + JMV.line,
  }

  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 14px",
        borderRadius: 999,
        fontFamily: FONT_UI,
        fontSize: 12.5,
        fontWeight: 500,
        cursor: "pointer",
        transition: "all .15s ease",
        letterSpacing: "0.01em",
        ...(active ? styleActive : styleIdle),
      }}
    >
      {label}
    </button>
  )
}

export function NoticiaCardEditorial({
  noticia,
  variant = "regular",
}: {
  noticia: Noticia
  variant?: "regular" | "featured"
}) {
  const isFeatured = variant === "featured"

  return (
    <Link
      href={`/noticias/${noticia.slug}`}
      className="jmv-event-card"
      style={{
        cursor: "pointer",
        background: JMV.white,
        border: "1px solid " + JMV.line,
        borderRadius: 4,
        overflow: "hidden",
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: isFeatured ? "16 / 10" : "16 / 11",
          background: JMV.mist,
          overflow: "hidden",
        }}
      >
        {noticia.imagenUrl ? (
          <Image
            src={noticia.imagenUrl}
            alt={noticia.titulo}
            fill
            sizes={isFeatured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            style={{ objectFit: "cover", transition: "transform .6s cubic-bezier(.2,.7,.2,1)" }}
            className="jmv-miembro-img"
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${JMV.blue} 0%, ${JMV.celeste} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="globe" size={40} color="rgba(255,255,255,0.4)" />
          </div>
        )}

        {/* Tipo pill top-left */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            padding: "5px 12px",
            background: "rgba(255,255,255,0.96)",
            borderRadius: 999,
            fontFamily: FONT_UI,
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: JMV.blue,
            backdropFilter: "blur(6px)",
          }}
        >
          {noticia.tipo}
        </div>

        {/* Featured ribbon top-right */}
        {noticia.destacada && (
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              background: JMV.gold,
              borderRadius: 999,
              fontFamily: FONT_UI,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            }}
          >
            <Icon name="star" size={9} color="#fff" />
            Destacada
          </div>
        )}
      </div>

      <div style={{ padding: "22px 22px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: FONT_UI,
            fontSize: 11.5,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: JMV.gold,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          <span>
            {new Date(noticia.fecha).toLocaleDateString("es-DO", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          {noticia.ubicacion && (
            <>
              <span style={{ color: JMV.line }}>·</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  color: JMV.mute,
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "none",
                  fontSize: 12,
                }}
              >
                <Icon name="pin" size={11} color={JMV.mute} />
                {noticia.ubicacion}
              </span>
            </>
          )}
        </div>

        <h3
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: isFeatured ? 28 : 22,
            fontWeight: 400,
            color: JMV.ink,
            margin: "0 0 12px",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {noticia.titulo}
        </h3>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: isFeatured ? 15 : 14,
            lineHeight: 1.6,
            color: JMV.body,
            margin: 0,
            marginBottom: 16,
            display: "-webkit-box",
            WebkitLineClamp: isFeatured ? 3 : 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {noticia.descripcionBreve}
        </p>

        {noticia.etiquetas.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {noticia.etiquetas.slice(0, 3).map((t) => (
              <Tag key={t} tone="primary">{t}</Tag>
            ))}
            {noticia.etiquetas.length > 3 && (
              <Tag tone="neutral">+{noticia.etiquetas.length - 3}</Tag>
            )}
          </div>
        )}

        <div
          style={{
            marginTop: "auto",
            paddingTop: 12,
            borderTop: "1px solid " + JMV.line,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: FONT_UI,
            fontSize: 12.5,
            color: JMV.ink,
            fontWeight: 500,
          }}
        >
          <span>Leer noticia</span>
          <Icon name="arrowUR" size={13} color={JMV.gold} />
        </div>
      </div>
    </Link>
  )
}
