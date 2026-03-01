// src/features/actividades/components/ActividadList.tsx
"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Activity, Calendar, Loader2, Search, X } from "lucide-react"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { ActividadJmv, getTagColor } from "../model/types"
import { getActividades } from "../service/actividad-service"
import { getCentros } from "@/src/features/centros/service/centro-service"

export function ActividadList() {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [selectedCentroId, setSelectedCentroId] = useState<number | undefined>(undefined)
  const [allActividades, setAllActividades] = useState<ActividadJmv[]>([])
  const [centros, setCentros] = useState<{ id: number; nombreParroquia: string }[]>([])
  const [loading, setLoading] = useState(true)

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350)
    return () => clearTimeout(t)
  }, [search])

  // Load centros
  useEffect(() => {
    getCentros({ limit: 200 })
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : []
        setCentros(data.map((c: any) => ({ id: c.id, nombreParroquia: c.nombreParroquia })))
      })
      .catch(() => {})
  }, [])

  const fetchActividades = useCallback(async () => {
    setLoading(true)
    try {
      const r = await getActividades({ search: debouncedSearch || undefined, centroId: selectedCentroId, limit: 100 })
      setAllActividades(Array.isArray(r.data) ? r.data : [])
    } catch {
      setAllActividades([])
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, selectedCentroId])

  useEffect(() => { fetchActividades() }, [fetchActividades])

  const actividades = allActividades

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container px-4 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            <Activity className="w-4 h-4" />
            Actividades
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Actividades de los <span className="text-primary">Centros</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Conoce las actividades que realizan nuestros centros parroquiales en todo el país.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-10 py-6 border-b bg-card/50 backdrop-blur-sm">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col max-w-2xl gap-3 mx-auto sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar actividades..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={selectedCentroId ? String(selectedCentroId) : "all"}
              onValueChange={(v) => setSelectedCentroId(v === "all" ? undefined : Number(v))}
            >
              <SelectTrigger className="w-full sm:w-56">
                <SelectValue placeholder="Todos los centros" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los centros</SelectItem>
                {centros.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.nombreParroquia}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(search || selectedCentroId) && (
              <button
                onClick={() => { setSearch(""); setSelectedCentroId(undefined) }}
                className="flex items-center gap-1 text-sm transition-colors text-muted-foreground hover:text-foreground shrink-0"
              >
                <X className="w-4 h-4" /> Limpiar
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          {loading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : actividades.length === 0 ? (
            <div className="py-24 text-center">
              <Activity className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-lg font-medium text-muted-foreground">No se encontraron actividades</p>
              <p className="mt-1 text-sm text-muted-foreground/70">Intenta con otros filtros</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {actividades.map((act) => (
                <Link
                  key={act.id}
                  href={`/actividades/${act.slug}`}
                  className="overflow-hidden transition-all duration-300 border group bg-card rounded-2xl hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-44 bg-muted">
                    {act.imagenUrl ? (
                      <img src={act.imagenUrl} alt={act.titulo} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10">
                        <Activity className="w-12 h-12 text-primary/20" />
                      </div>
                    )}
                    {act.centro && (
                      <div className="absolute top-3 left-3">
                        <Badge className="text-xs text-white border-0 bg-black/60">
                          {act.centro.nombreParroquia}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      {new Date(act.fecha).toLocaleDateString("es-DO", { day: "numeric", month: "long", year: "numeric" })}
                    </div>
                    <h3 className="font-semibold leading-snug transition-colors text-foreground line-clamp-2 group-hover:text-primary">
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
                          <Badge variant="outline" className="text-xs px-2 py-0.5">+{act.etiquetas.length - 3}</Badge>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
