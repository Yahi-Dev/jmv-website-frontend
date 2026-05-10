// src/features/actividades/components/ActividadList.tsx
"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Eyebrow, Icon, Serif, Tag } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { CountUp } from "@/src/features/home/ui-kit/CountUp"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import { ActividadJmv } from "../model/types"
import { getActividades } from "../service/actividad-service"
import { getCentros } from "@/src/features/centros/service/centro-service"
import { useDebouncedValue } from "@/src/hooks/use-debounced-value"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command"

export function ActividadList() {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebouncedValue(search, 350)
  const [selectedCentroId, setSelectedCentroId] = useState<number | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [tagsExpanded, setTagsExpanded] = useState(false)

  const [allActividades, setAllActividades] = useState<ActividadJmv[]>([])
  const [centros, setCentros] = useState<{ id: number; nombreParroquia: string }[]>([])
  const [loading, setLoading] = useState(true)

  // Load centros
  useEffect(() => {
    const ctrl = new AbortController()
    getCentros({ limit: 200, signal: ctrl.signal })
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : []
        setCentros(data.map((c: any) => ({ id: c.id, nombreParroquia: c.nombreParroquia })))
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [])

  useEffect(() => {
    const ctrl = new AbortController()
    setLoading(true)
    getActividades({
      search: debouncedSearch || undefined,
      centroId: selectedCentroId ?? undefined,
      limit: 200,
      signal: ctrl.signal,
    })
      .then((r) => {
        setAllActividades(Array.isArray(r.data) ? r.data : [])
      })
      .catch((err) => {
        if ((err as Error)?.name === "AbortError") return
        setAllActividades([])
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false)
      })
    return () => ctrl.abort()
  }, [debouncedSearch, selectedCentroId])

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()
    allActividades.forEach((a) => a.etiquetas.forEach((t) => tagSet.add(t)))
    return Array.from(tagSet).sort()
  }, [allActividades])

  const filtered = useMemo(() => {
    if (!selectedTag) return allActividades
    return allActividades.filter((a) => a.etiquetas.includes(selectedTag))
  }, [allActividades, selectedTag])

  const proximas = useMemo(() => {
    const now = Date.now()
    return filtered
      .filter((a) => new Date(a.fecha).getTime() >= now)
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
  }, [filtered])
  const pasadas = useMemo(() => {
    const now = Date.now()
    return filtered
      .filter((a) => new Date(a.fecha).getTime() < now)
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
  }, [filtered])

  const stats = useMemo(() => {
    const now = Date.now()
    const centrosUnicos = new Set(allActividades.map((a) => a.centroId)).size
    const futuras = allActividades.filter((a) => new Date(a.fecha).getTime() >= now).length
    return {
      total: allActividades.length,
      centros: centrosUnicos,
      proximas: futuras,
    }
  }, [allActividades])

  const clearFilters = () => {
    setSearch("")
    setSelectedCentroId(null)
    setSelectedTag(null)
  }
  const hasActive = !!search || selectedCentroId !== null || !!selectedTag

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
            top: -200,
            right: -200,
            width: 500,
            height: 500,
            borderRadius: "50%",
            border: "1px dashed rgba(19,159,204,0.16)",
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
            background: "radial-gradient(circle, rgba(19,159,204,0.10) 0%, transparent 70%)",
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
            background: JMV.gold,
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
              <span style={{ display: "inline-block", width: 36, height: 1, background: JMV.celeste }} />
              <span>Actividades</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>JMV República Dominicana</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span style={{ color: JMV.celeste }}>Vida en los centros</span>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "end" }}>
            <div>
              <Reveal delay={120} y={20}>
                <Eyebrow color={JMV.celeste}>Actividades</Eyebrow>
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
                  Cada{" "}
                  <span style={{ fontStyle: "italic", color: JMV.celeste, fontWeight: 300 }}>encuentro</span>
                  ,
                  <br />
                  cada <span style={{ fontStyle: "italic", color: JMV.gold, fontWeight: 300 }}>servicio</span>.
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
                Las actividades son donde el carisma JMV se hace vida. Misiones, retiros, formación,
                celebraciones — un calendario vivo de los centros de todo el país.
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
                { k: "Actividades totales", v: String(stats.total || 0), color: JMV.ink },
                { k: "Centros activos", v: String(stats.centros || 0), color: JMV.celeste },
                { k: "Próximas", v: String(stats.proximas || 0), color: JMV.gold },
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
            <div style={{ position: "relative", flex: "0 0 auto", width: 280 }}>
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
                placeholder="Buscar actividades..."
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

            {/* Spacer to push the rest to the right */}
            <div style={{ flex: "1 1 auto" }} />

            {/* Centro combobox */}
            {centros.length > 0 && (
              <CentroCombobox
                centros={centros}
                selectedId={selectedCentroId}
                onChange={setSelectedCentroId}
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
                      tagsExpanded || selectedTag ? "rgba(255,255,255,0.25)" : JMV.line,
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
                : `${filtered.length} actividad${filtered.length !== 1 ? "es" : ""}`}
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

          {/* Tags expanded panel */}
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
              Cargando actividades...
            </p>
          ) : filtered.length === 0 ? (
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
                  ? "No hay actividades que coincidan con los filtros."
                  : "Aún no hay actividades registradas."}
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
              {/* Próximas */}
              {proximas.length > 0 && (
                <section style={{ marginBottom: pasadas.length > 0 ? 96 : 0 }}>
                  <Reveal delay={0} y={20}>
                    <div style={{ marginBottom: 36 }}>
                      <Eyebrow color={JMV.celeste}>Próximamente</Eyebrow>
                      <Serif size={44} weight={300} style={{ display: "block", marginTop: 16 }}>
                        Lo que <span style={{ fontStyle: "italic", color: JMV.celeste }}>viene</span>.
                      </Serif>
                    </div>
                  </Reveal>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                      gap: 28,
                    }}
                  >
                    {proximas.map((a, i) => (
                      <Reveal key={a.id} delay={i * 80} y={28}>
                        <ActividadCardEditorial actividad={a} variant="upcoming" />
                      </Reveal>
                    ))}
                  </div>
                </section>
              )}

              {/* Pasadas */}
              {pasadas.length > 0 && (
                <section>
                  <Reveal delay={0} y={20}>
                    <div style={{ marginBottom: 36 }}>
                      <Eyebrow color={JMV.blue}>{proximas.length > 0 ? "Memoria reciente" : "Actividades"}</Eyebrow>
                      <Serif size={44} weight={300} style={{ display: "block", marginTop: 16 }}>
                        {proximas.length > 0 ? "Lo que ya " : "Todas las "}
                        <span style={{ fontStyle: "italic", color: JMV.gold }}>
                          {proximas.length > 0 ? "vivimos" : "actividades"}
                        </span>
                        .
                      </Serif>
                    </div>
                  </Reveal>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                      gap: 28,
                    }}
                  >
                    {pasadas.map((a, i) => (
                      <Reveal key={a.id} delay={i * 70} y={26}>
                        <ActividadCardEditorial actividad={a} />
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

function CentroCombobox({
  centros,
  selectedId,
  onChange,
}: {
  centros: { id: number; nombreParroquia: string }[]
  selectedId: number | null
  onChange: (id: number | null) => void
}) {
  const [open, setOpen] = useState(false)
  const selected = selectedId !== null ? centros.find((c) => c.id === selectedId) : null
  const isActive = selectedId !== null

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
          <Icon name="building" size={12} color={isActive ? "#fff" : JMV.mute} />
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: 200,
            }}
          >
            {selected ? selected.nombreParroquia : "Centro"}
          </span>
          {isActive && (
            <span
              role="button"
              aria-label="Quitar filtro"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onChange(null)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  e.stopPropagation()
                  onChange(null)
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
          width: 320,
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
            placeholder="Buscar centro..."
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
                value="todos los centros"
                onSelect={() => {
                  onChange(null)
                  setOpen(false)
                }}
                style={{
                  fontFamily: FONT_UI,
                  fontSize: 13.5,
                  color: JMV.body,
                  fontWeight: selectedId === null ? 600 : 450,
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
                    color: selectedId === null ? JMV.ink : "transparent",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                Todos los centros
              </CommandItem>
              {centros.map((c) => {
                const active = selectedId === c.id
                return (
                  <CommandItem
                    key={c.id}
                    value={c.nombreParroquia}
                    onSelect={() => {
                      onChange(c.id)
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
                    {c.nombreParroquia}
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
        flexShrink: 0,
        ...(active ? styleActive : styleIdle),
      }}
    >
      {label}
    </button>
  )
}

export function ActividadCardEditorial({
  actividad,
  variant = "regular",
}: {
  actividad: ActividadJmv
  variant?: "regular" | "upcoming"
}) {
  const isUpcoming = variant === "upcoming"
  const date = new Date(actividad.fecha)
  const day = date.getDate()
  const monthShort = date.toLocaleDateString("es-DO", { month: "short" }).replace(".", "").toUpperCase()
  const year = date.getFullYear()

  return (
    <Link
      href={`/actividades/${actividad.slug}`}
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
          aspectRatio: "16 / 11",
          background: JMV.mist,
          overflow: "hidden",
        }}
      >
        {actividad.imagenUrl ? (
          <Image
            src={actividad.imagenUrl}
            alt={actividad.titulo}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover", transition: "transform .6s cubic-bezier(.2,.7,.2,1)" }}
            className="jmv-miembro-img"
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${JMV.celeste} 0%, ${JMV.blue} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="calendar" size={40} color="rgba(255,255,255,0.4)" />
          </div>
        )}

        {/* Date block top-left */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            padding: "10px 14px",
            background: "rgba(255,255,255,0.96)",
            borderRadius: 6,
            backdropFilter: "blur(8px)",
            textAlign: "center",
            minWidth: 56,
            boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 24,
              fontWeight: 400,
              color: JMV.ink,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {day}
          </div>
          <div
            style={{
              fontFamily: FONT_UI,
              fontSize: 9.5,
              letterSpacing: "0.18em",
              color: isUpcoming ? JMV.celeste : JMV.gold,
              marginTop: 3,
              fontWeight: 600,
            }}
          >
            {monthShort} {year}
          </div>
        </div>

        {/* Upcoming badge top-right */}
        {isUpcoming && (
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 11px",
              background: JMV.celeste,
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
            <span
              className="jmv-pulse-soft"
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "#fff",
              }}
            />
            Próxima
          </div>
        )}
      </div>

      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {actividad.centro && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: FONT_UI,
              fontSize: 11.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: isUpcoming ? JMV.celeste : JMV.gold,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            <Icon name="building" size={11} color={isUpcoming ? JMV.celeste : JMV.gold} />
            <span
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                fontSize: 11.5,
              }}
            >
              {actividad.centro.nombreParroquia}
            </span>
          </div>
        )}

        <h3
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 22,
            fontWeight: 400,
            color: JMV.ink,
            margin: "0 0 10px",
            lineHeight: 1.2,
            letterSpacing: "-0.005em",
          }}
        >
          {actividad.titulo}
        </h3>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 14,
            lineHeight: 1.6,
            color: JMV.body,
            margin: 0,
            marginBottom: 16,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {actividad.resumen}
        </p>

        {actividad.etiquetas.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {actividad.etiquetas.slice(0, 3).map((t) => (
              <Tag key={t} tone={isUpcoming ? "celeste" : "gold"}>
                {t}
              </Tag>
            ))}
            {actividad.etiquetas.length > 3 && (
              <Tag tone="neutral">+{actividad.etiquetas.length - 3}</Tag>
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
          <span>Ver actividad</span>
          <Icon name="arrowUR" size={13} color={isUpcoming ? JMV.celeste : JMV.gold} />
        </div>
      </div>
    </Link>
  )
}
