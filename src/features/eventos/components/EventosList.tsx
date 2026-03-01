// src/features/eventos/components/EventosList.tsx
"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { MapPin, Filter, Search, Clock, ArrowRight, Sparkles, CalendarDays, Loader2, X } from "lucide-react"
import Link from "next/link"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Evento, getTagColor } from "@/src/features/eventos/model/types"
import { getEventos } from "@/src/features/eventos/service/evento-service"

export function EventosList() {
  const [search, setSearch] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [allEventos, setAllEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)

  const fetchEventos = useCallback(async (q: string) => {
    setLoading(true)
    try {
      const result = await getEventos({ search: q || undefined, limit: 100 })
      const data = result.data
      setAllEventos(Array.isArray(data) ? data : [])
    } catch {
      setAllEventos([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      setSelectedTag(null)
      fetchEventos(search)
    }, 350)
    return () => clearTimeout(t)
  }, [search, fetchEventos])

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()
    allEventos.forEach((e) => e.etiquetas.forEach((t) => tagSet.add(t)))
    return Array.from(tagSet).sort()
  }, [allEventos])

  const eventos = useMemo(() => {
    if (!selectedTag) return allEventos
    return allEventos.filter((e) => e.etiquetas.includes(selectedTag))
  }, [allEventos, selectedTag])

  const clearFilters = () => {
    setSearch("")
    setSelectedTag(null)
  }

  const hasActiveFilters = !!search || !!selectedTag

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 border rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Próximas Actividades</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text">
                Eventos JMV
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl leading-relaxed text-muted-foreground">
              Descubre nuestras próximas actividades de formación, espiritualidad y servicio. Únete a una comunidad que
              transforma vidas.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-20 px-10 py-6 border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container space-y-4">
          {/* Search row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative group">
              <Search className="absolute w-4 h-4 transition-colors -translate-y-1/2 left-4 top-1/2 text-muted-foreground group-focus-within:text-primary" />
              <Input
                placeholder="Buscar eventos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 h-11 sm:w-80 bg-background/80 border-border/50 focus:border-primary/50"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg text-muted-foreground bg-background/60 border-border/50">
                <Filter className="w-4 h-4" />
                <span className="font-medium">
                  {loading
                    ? "Cargando..."
                    : `${eventos.length} evento${eventos.length !== 1 ? "s" : ""}`}
                </span>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-9 gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                  Limpiar
                </Button>
              )}
            </div>
          </div>

          {/* Tag filter chips */}
          {!loading && availableTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const isActive = selectedTag === tag
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(isActive ? null : tag)}
                    className={`
                      inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border
                      transition-all duration-150 cursor-pointer
                      ${isActive
                        ? `${getTagColor(tag)} ring-2 ring-offset-1 ring-current/30 shadow-sm`
                        : "border-border/50 text-muted-foreground bg-background/60 hover:border-primary/40 hover:text-primary"
                      }
                    `}
                  >
                    {isActive && <X className="w-3 h-3" />}
                    {tag}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="px-10 py-20">
        <div className="container">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : eventos.length === 0 ? (
            <div className="py-32 text-center">
              <CalendarDays className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-xl font-medium text-muted-foreground">No hay eventos disponibles</p>
              {hasActiveFilters && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    No se encontraron eventos con los filtros actuales.
                  </p>
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {eventos.map((evento) => (
                <Card
                  key={evento.id}
                  className="overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/50"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={
                        evento.imagenUrl ||
                        `/placeholder.svg?height=240&width=400&query=${encodeURIComponent(evento.titulo)}`
                      }
                      alt={evento.titulo}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-linear-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100" />

                    {/* Tag badges on image */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                      {evento.etiquetas.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className={`bg-white/90 border text-xs ${getTagColor(tag)}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                      {evento.etiquetas.length > 2 && (
                        <Badge variant="secondary" className="text-xs bg-white/90">
                          +{evento.etiquetas.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Date chip */}
                    <div className="absolute px-3 py-1 text-sm font-medium rounded-full top-4 right-4 bg-background/90 text-primary">
                      {new Date(evento.fecha).toLocaleDateString("es-DO", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl transition-colors duration-200 line-clamp-2 group-hover:text-primary">
                      {evento.titulo}
                    </CardTitle>
                    <CardDescription className="leading-relaxed line-clamp-2 text-muted-foreground">
                      {evento.descripcionBreve}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="mb-6 space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-lg bg-primary/10">
                          <Clock className="w-4 h-4 text-primary" />
                        </div>
                        <span>{evento.hora}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-lg bg-secondary/10">
                          <MapPin className="w-4 h-4 text-secondary" />
                        </div>
                        <span className="line-clamp-1">{evento.ubicacion}</span>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 group"
                    >
                      <Link href={`/eventos/${evento.slug}`}>
                        Ver detalles
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
