// src/features/centros/components/CentroList.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { Building2, Loader2, MapPin, Search, Users, X } from "lucide-react"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { CentroJmv, getTagColor } from "../model/types"
import { getCentros } from "../service/centro-service"

export function CentroList() {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [centros, setCentros] = useState<CentroJmv[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350)
    return () => clearTimeout(t)
  }, [search])

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const r = await getCentros({ search: debouncedSearch || undefined, limit: 100 })
      const data = Array.isArray(r.data) ? r.data : []
      setCentros(data.map((c) => ({ ...c, etiquetas: Array.isArray(c.etiquetas) ? c.etiquetas : [] })))
    } catch {
      setCentros([])
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch])

  useEffect(() => { fetch() }, [fetch])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container px-4 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            <Building2 className="w-4 h-4" />
            Nuestros Centros
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Centros <span className="text-primary">Parroquiales</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Conoce los centros parroquiales de la Juventud Mariana Vicenciana en todo el país.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="sticky top-0 z-10 py-6 border-b bg-card/50 backdrop-blur-sm">
        <div className="container px-4 mx-auto">
          <div className="flex items-center max-w-lg gap-3 mx-auto">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar centros por nombre o ubicación..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            {search && (
              <button onClick={() => setSearch("")}
                className="flex items-center gap-1 text-sm transition-colors text-muted-foreground hover:text-foreground shrink-0">
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
          ) : centros.length === 0 ? (
            <div className="py-24 text-center">
              <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-lg font-medium text-muted-foreground">No se encontraron centros</p>
              <p className="mt-1 text-sm text-muted-foreground/70">Intenta con otra búsqueda</p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-muted-foreground">{centros.length} centro{centros.length !== 1 ? "s" : ""} encontrado{centros.length !== 1 ? "s" : ""}</p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {centros.map((centro) => (
                  <Link key={centro.id} href={`/centros/${centro.slug}`}
                    className="overflow-hidden transition-all duration-300 border group bg-card rounded-2xl hover:shadow-lg hover:-translate-y-1">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-muted">
                      {centro.imagenUrl ? (
                        <img src={centro.imagenUrl} alt={centro.nombreParroquia}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10">
                          <Building2 className="w-16 h-16 text-primary/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-sm font-semibold text-white line-clamp-1">{centro.nombreParroquia}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{centro.ubicacion}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {centro.cantidadMiembrosActivos} miembros activos
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          {centro._count?.comunidades ?? 0} comunidades
                        </span>
                      </div>
                      {centro.etiquetas.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {centro.etiquetas.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className={`text-xs px-2 py-0.5 ${getTagColor(tag)}`}>{tag}</Badge>
                          ))}
                          {centro.etiquetas.length > 3 && (
                            <Badge variant="outline" className="text-xs px-2 py-0.5">+{centro.etiquetas.length - 3}</Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
