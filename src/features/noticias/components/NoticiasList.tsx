// src/features/noticias/components/NoticiasList.tsx
"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import {
  Search, Filter, Calendar, ArrowRight, TrendingUp,
  Loader2, X, MapPin, Newspaper,
} from "lucide-react"
import Link from "next/link"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Noticia, getTagColor, getTipoColor } from "@/src/features/noticias/model/types"
import { getNoticias, getNoticiaTipos } from "@/src/features/noticias/service/noticia-service"
import { NoticiaTipo } from "@/src/features/noticias/model/types"

export function NoticiasList() {
  const [search, setSearch] = useState("")
  const [selectedTipo, setSelectedTipo] = useState<string>("all")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [allNoticias, setAllNoticias] = useState<Noticia[]>([])
  const [tipos, setTipos] = useState<NoticiaTipo[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNoticias = useCallback(async (q: string) => {
    setLoading(true)
    try {
      const result = await getNoticias({ search: q || undefined, limit: 100 })
      const data = result.data
      setAllNoticias(Array.isArray(data) ? data : [])
    } catch {
      setAllNoticias([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Load tipos once
  useEffect(() => {
    getNoticiaTipos()
      .then((r) => setTipos(Array.isArray(r.data) ? r.data as NoticiaTipo[] : []))
      .catch(() => setTipos([]))
  }, [])

  // Debounced search + reset tag/tipo on search change
  useEffect(() => {
    const t = setTimeout(() => {
      setSelectedTag(null)
      fetchNoticias(search)
    }, 350)
    return () => clearTimeout(t)
  }, [search, fetchNoticias])

  // Available tags extracted from loaded noticias
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()
    allNoticias.forEach((n) => n.etiquetas.forEach((t) => tagSet.add(t)))
    return Array.from(tagSet).sort()
  }, [allNoticias])

  // Client-side filtering by tipo + tag
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

  const featuredNoticias = filteredNoticias.filter((n) => n.destacada)
  const regularNoticias = filteredNoticias.filter((n) => !n.destacada)

  const clearFilters = () => {
    setSearch("")
    setSelectedTipo("all")
    setSelectedTag(null)
  }

  const hasActiveFilters = !!search || (selectedTipo && selectedTipo !== "all") || !!selectedTag

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 border rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Últimas Noticias JMV</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl bg-gradient-to-br from-foreground via-primary to-secondary bg-clip-text">
              Noticias JMV
            </h1>
            <p className="max-w-2xl mx-auto text-xl leading-relaxed text-muted-foreground">
              Mantente informado sobre nuestras actividades, logros y el impacto transformador de nuestro trabajo en las
              comunidades
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-20 px-10 py-6 border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container space-y-4">
          {/* Search + dropdowns row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative group">
                <Search className="absolute w-4 h-4 transition-colors -translate-y-1/2 left-4 top-1/2 text-muted-foreground group-focus-within:text-primary" />
                <Input
                  placeholder="Buscar noticias..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 h-11 sm:w-72 bg-background/80 border-border/50 focus:border-primary/50"
                />
              </div>

              {tipos.length > 0 && (
                <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                  <SelectTrigger className="w-full sm:w-52 bg-background/80 border-border/50 h-11">
                    <SelectValue placeholder="Todos los tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    {tipos.map((t) => (
                      <SelectItem key={t.id} value={t.nombre}>
                        {t.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg text-muted-foreground bg-background/60 border-border/50">
                <Filter className="w-4 h-4" />
                <span className="font-medium">
                  {loading
                    ? "Cargando..."
                    : `${filteredNoticias.length} noticia${filteredNoticias.length !== 1 ? "s" : ""}`}
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

          {/* Tag chips */}
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

      {/* Content */}
      <div className="px-10 py-16">
        <div className="container">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredNoticias.length === 0 ? (
            <div className="py-32 text-center">
              <Newspaper className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-xl font-medium text-muted-foreground">No hay noticias disponibles</p>
              {hasActiveFilters && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    No se encontraron noticias con los filtros actuales.
                  </p>
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Featured */}
              {featuredNoticias.length > 0 && (
                <section className="mb-16">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-12 h-1 rounded-full bg-gradient-to-r from-primary to-secondary" />
                    <h2 className="text-3xl font-bold">Noticias Destacadas</h2>
                  </div>
                  <div className="grid gap-8 lg:grid-cols-2">
                    {featuredNoticias.map((noticia) => (
                      <Card
                        key={noticia.id}
                        className="overflow-hidden transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-card to-background border-border/50"
                      >
                        <div className="overflow-hidden aspect-video">
                          <img
                            src={noticia.imagenUrl || "/placeholder.svg"}
                            alt={noticia.titulo}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <CardHeader className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <Badge
                              variant="outline"
                              className={`text-xs font-medium ${getTipoColor(noticia.tipo)}`}
                            >
                              {noticia.tipo}
                            </Badge>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {new Date(noticia.fecha).toLocaleDateString("es-DO", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                          </div>
                          <CardTitle className="text-2xl leading-tight transition-colors duration-300 line-clamp-2 group-hover:text-primary">
                            {noticia.titulo}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                          <CardDescription className="mb-4 text-base leading-relaxed line-clamp-3">
                            {noticia.descripcionBreve}
                          </CardDescription>
                          <div className="flex items-center gap-1.5 mb-5 text-sm text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span className="line-clamp-1">{noticia.ubicacion}</span>
                          </div>
                          {noticia.etiquetas.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-5">
                              {noticia.etiquetas.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className={`text-xs ${getTagColor(tag)}`}>
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <Button asChild variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary group/btn">
                            <Link href={`/noticias/${noticia.slug}`}>
                              Leer más
                              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Regular grid */}
              {regularNoticias.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-12 h-1 rounded-full bg-gradient-to-r from-primary to-secondary" />
                    <h2 className="text-3xl font-bold">Todas las Noticias</h2>
                  </div>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {regularNoticias.map((noticia) => (
                      <Card
                        key={noticia.id}
                        className="overflow-hidden transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-background to-card border-border/50"
                      >
                        <div className="overflow-hidden aspect-video">
                          <img
                            src={noticia.imagenUrl || "/placeholder.svg"}
                            alt={noticia.titulo}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <CardHeader className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <Badge
                              variant="outline"
                              className={`text-xs font-medium ${getTipoColor(noticia.tipo)}`}
                            >
                              {noticia.tipo}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {new Date(noticia.fecha).toLocaleDateString("es-DO", {
                                day: "numeric",
                                month: "short",
                              })}
                            </div>
                          </div>
                          <CardTitle className="text-lg leading-tight transition-colors duration-300 line-clamp-2 group-hover:text-primary">
                            {noticia.titulo}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                          <CardDescription className="mb-3 leading-relaxed line-clamp-2">
                            {noticia.descripcionBreve}
                          </CardDescription>
                          <div className="flex items-center gap-1.5 mb-4 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span className="line-clamp-1">{noticia.ubicacion}</span>
                          </div>
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 gap-1.5 hover:text-primary group/btn"
                          >
                            <Link href={`/noticias/${noticia.slug}`}>
                              Leer más
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>

      <FooterSection />
    </div>
  )
}
