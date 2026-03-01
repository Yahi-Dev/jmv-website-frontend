// src/features/centros/components/CentroDetail.tsx
"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Separator } from "@/src/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/src/components/ui/select"
import {
  ArrowLeft, Building2, Calendar, Mail, MapPin, Loader2,
  Phone, Users, Activity, Tag, Star, X,
} from "lucide-react"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { getTagColor } from "../model/types"
import { useCentro } from "../hook/use-centros"
import { getActividades } from "@/src/features/actividades/service/actividad-service"
import type { ActividadJmv } from "@/src/features/actividades/model/types"

interface CentroDetailProps {
  slug: string
}

export function CentroDetail({ slug }: CentroDetailProps) {
  const { centro, loading, notFound } = useCentro(slug)

  // Actividades tab state
  const [actividades, setActividades] = useState<ActividadJmv[]>([])
  const [actLoading, setActLoading] = useState(false)
  const [yearFilter, setYearFilter] = useState<string>("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    if (!centro?.id) return
    setActLoading(true)
    getActividades({ centroId: centro.id, limit: 200 })
      .then((r) => setActividades(Array.isArray(r.data) ? (r.data as ActividadJmv[]) : []))
      .catch(() => setActividades([]))
      .finally(() => setActLoading(false))
  }, [centro?.id])

  const availableYears = useMemo(() => {
    const years = [...new Set(actividades.map((a) => new Date(a.fecha).getFullYear()))]
    return years.sort((a, b) => b - a)
  }, [actividades])

  const availableTags = useMemo(() => {
    return [...new Set(actividades.flatMap((a) => a.etiquetas))]
  }, [actividades])

  const filteredActividades = useMemo(() => {
    return actividades.filter((a) => {
      if (yearFilter !== "all" && new Date(a.fecha).getFullYear() !== Number(yearFilter)) return false
      if (selectedTags.length > 0 && !selectedTags.some((t) => a.etiquetas.includes(t))) return false
      return true
    })
  }, [actividades, yearFilter, selectedTags])

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])

  const clearFilters = () => { setYearFilter("all"); setSelectedTags([]) }
  const hasFilters = yearFilter !== "all" || selectedTags.length > 0

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (notFound || !centro) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Building2 className="w-16 h-16 text-muted-foreground/30" />
          <h1 className="text-2xl font-bold">Centro no encontrado</h1>
          <p className="text-muted-foreground">El centro que buscas no existe o fue eliminado.</p>
          <Link href="/centros"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Ver todos los centros</Button></Link>
        </div>
        <FooterSection />
      </div>
    )
  }

  const comunidadesCount = centro._count?.comunidades ?? centro.comunidades?.length ?? 0

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero banner */}
      <div className="relative w-full h-72 md:h-96 bg-muted overflow-hidden">
        {centro.imagenUrl ? (
          <>
            <img src={centro.imagenUrl} alt={centro.nombreParroquia} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
            <Building2 className="w-24 h-24 text-primary/20" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              {centro.etiquetas.map((tag) => (
                <Badge key={tag} className={`text-xs ${getTagColor(tag)} border`}>{tag}</Badge>
              ))}
            </div>
            <h1 className={`text-3xl md:text-4xl font-bold leading-tight ${centro.imagenUrl ? "text-white" : "text-foreground"}`}>
              {centro.nombreParroquia}
            </h1>
            <div className={`flex items-center gap-2 mt-2 text-sm ${centro.imagenUrl ? "text-white/80" : "text-muted-foreground"}`}>
              <MapPin className="w-4 h-4 shrink-0" />
              {centro.ubicacion}
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 divide-x py-4">
            <div className="flex flex-col items-center py-2 px-4">
              <span className="text-2xl font-bold text-primary">{centro.cantidadMiembrosActivos}</span>
              <span className="text-xs text-muted-foreground mt-0.5">Miembros activos</span>
            </div>
            <div className="flex flex-col items-center py-2 px-4">
              <span className="text-2xl font-bold text-primary">{comunidadesCount}</span>
              <span className="text-xs text-muted-foreground mt-0.5">Comunidades</span>
            </div>
            <div className="flex flex-col items-center py-2 px-4">
              <span className="text-2xl font-bold text-primary">{actividades.length || "—"}</span>
              <span className="text-xs text-muted-foreground mt-0.5">Actividades</span>
            </div>
            <div className="flex flex-col items-center py-2 px-4">
              <span className="text-2xl font-bold text-primary">{centro.anioFundacion}</span>
              <span className="text-xs text-muted-foreground mt-0.5">Año de fundación</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-10">
        <div className="mb-6">
          <Link href="/centros" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Volver a centros
          </Link>
        </div>

        <Tabs defaultValue="info">
          <TabsList className="mb-8">
            <TabsTrigger value="info" className="gap-2"><Building2 className="w-4 h-4" /> Información</TabsTrigger>
            <TabsTrigger value="consejo" className="gap-2">
              <Users className="w-4 h-4" /> Consejo
              {(centro.miembros?.length ?? 0) > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">{centro.miembros?.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="comunidades" className="gap-2">
              <Star className="w-4 h-4" /> Comunidades
              {comunidadesCount > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">{comunidadesCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="actividades" className="gap-2">
              <Activity className="w-4 h-4" /> Actividades
              {actividades.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">{actividades.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Tab: Información */}
          <TabsContent value="info">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main */}
              <div className="lg:col-span-2 space-y-6">
                {/* Resumen */}
                <div className="p-6 bg-card border rounded-2xl space-y-3">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                    <Tag className="w-4 h-4" /> Sobre el centro
                  </h2>
                  <p className="text-foreground/90 leading-relaxed">{centro.resumen}</p>
                </div>

                {/* Última actividad */}
                {centro.ultimaActividad && (
                  <div className="p-6 bg-card border rounded-2xl space-y-3">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Última actividad
                    </h2>
                    <p className="font-medium">{centro.ultimaActividad.titulo}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(centro.ultimaActividad.fecha).toLocaleDateString("es-DO", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                {/* Contacto */}
                <div className="p-5 bg-card border rounded-2xl space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Contacto</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2.5">
                      <Users className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Coordinadora</p>
                        <p className="font-medium">{centro.nombreCoordinadora}</p>
                      </div>
                    </div>
                    <Separator />
                    <a href={`tel:${centro.telefono}`} className="flex items-center gap-2.5 hover:text-primary transition-colors">
                      <Phone className="w-4 h-4 text-primary/70 shrink-0" />
                      {centro.telefono}
                    </a>
                    <a href={`mailto:${centro.correo}`} className="flex items-center gap-2.5 hover:text-primary transition-colors break-all">
                      <Mail className="w-4 h-4 text-primary/70 shrink-0" />
                      {centro.correo}
                    </a>
                    <div className="flex items-center gap-2.5 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary/70 shrink-0" />
                      Fundado en {centro.anioFundacion}
                    </div>
                    <div className="flex items-center gap-2.5 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary/70 shrink-0" />
                      {centro.ubicacion}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab: Consejo */}
          <TabsContent value="consejo">
            {!centro.miembros || centro.miembros.length === 0 ? (
              <div className="py-20 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-lg font-medium text-muted-foreground">Sin miembros registrados</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {centro.miembros.map((m) => (
                  <div key={m.id} className="bg-card border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48 bg-muted">
                      {m.imagenUrl ? (
                        <img src={m.imagenUrl} alt={m.nombre} className="w-full h-full object-cover object-top" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
                          <Users className="w-16 h-16 text-primary/20" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-2">
                      <Badge variant="outline" className="text-xs">{m.cargo}</Badge>
                      <p className="font-semibold text-foreground">{m.nombre}</p>
                      <p className="text-sm text-muted-foreground line-clamp-3">{m.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Tab: Comunidades */}
          <TabsContent value="comunidades">
            {!centro.comunidades || centro.comunidades.length === 0 ? (
              <div className="py-20 text-center">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-lg font-medium text-muted-foreground">Sin comunidades registradas</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {centro.comunidades.map((c) => (
                  <div key={c.id} className="bg-card border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-40 bg-muted overflow-hidden relative">
                      {c.imagenUrl ? (
                        <img src={c.imagenUrl} alt={c.nombre} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
                          <Building2 className="w-12 h-12 text-primary/20" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <Badge className="text-xs bg-white/90 text-foreground border-0 shadow-sm">{c.etapa}</Badge>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold">{c.nombre}</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" /> {c.cantidadMiembros} miembros
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> Desde {new Date(c.inicioDate).getFullYear()}
                        </span>
                      </div>
                      {c.etiquetas.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {c.etiquetas.map((tag) => (
                            <Badge key={tag} variant="outline" className={`text-xs px-2 py-0.5 ${getTagColor(tag)}`}>{tag}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Tab: Actividades */}
          <TabsContent value="actividades">
            {actLoading ? (
              <div className="flex justify-center py-24">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Filters */}
                {actividades.length > 0 && (
                  <div className="p-4 bg-card border rounded-2xl space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Year filter */}
                      <Select value={yearFilter} onValueChange={setYearFilter}>
                        <SelectTrigger className="w-40 h-9">
                          <Calendar className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                          <SelectValue placeholder="Todos los años" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos los años</SelectItem>
                          {availableYears.map((y) => (
                            <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* Clear */}
                      {hasFilters && (
                        <button
                          onClick={clearFilters}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="w-3.5 h-3.5" /> Limpiar filtros
                        </button>
                      )}

                      <span className="ml-auto text-xs text-muted-foreground">
                        {filteredActividades.length} actividad{filteredActividades.length !== 1 ? "es" : ""}
                      </span>
                    </div>

                    {/* Tag chips */}
                    {availableTags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => {
                          const active = selectedTags.includes(tag)
                          return (
                            <button
                              key={tag}
                              onClick={() => toggleTag(tag)}
                              className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                                active
                                  ? `${getTagColor(tag)} ring-2 ring-offset-1 ring-primary/40`
                                  : "bg-muted/50 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                              }`}
                            >
                              {tag}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Grid */}
                {filteredActividades.length === 0 ? (
                  <div className="py-20 text-center">
                    <Activity className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
                    <p className="text-lg font-medium text-muted-foreground">
                      {actividades.length === 0 ? "Sin actividades registradas" : "No hay actividades con esos filtros"}
                    </p>
                    {hasFilters && (
                      <button onClick={clearFilters} className="mt-3 text-sm text-primary hover:underline">
                        Quitar filtros
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredActividades.map((act) => (
                      <Link
                        key={act.id}
                        href={`/actividades/${act.slug}`}
                        className="group bg-card border rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <div className="h-44 bg-muted overflow-hidden relative">
                          {act.imagenUrl ? (
                            <img
                              src={act.imagenUrl}
                              alt={act.titulo}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/5 to-secondary/10">
                              <Activity className="w-12 h-12 text-primary/20" />
                            </div>
                          )}
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            {new Date(act.fecha).toLocaleDateString("es-DO", { day: "numeric", month: "long", year: "numeric" })}
                          </div>
                          <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {act.titulo}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{act.resumen}</p>
                          {act.etiquetas.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {act.etiquetas.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className={`text-xs px-2 py-0.5 ${getTagColor(tag)}`}>
                                  {tag}
                                </Badge>
                              ))}
                              {act.etiquetas.length > 3 && (
                                <Badge variant="outline" className="text-xs px-2 py-0.5">
                                  +{act.etiquetas.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <FooterSection />
    </div>
  )
}
