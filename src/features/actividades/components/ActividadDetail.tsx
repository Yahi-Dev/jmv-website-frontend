// src/features/actividades/components/ActividadDetail.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Separator } from "@/src/components/ui/separator"
import { Activity, ArrowLeft, Calendar, Loader2, MapPin } from "lucide-react"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { ActividadJmv, getTagColor } from "../model/types"
import { useActividad } from "../hook/use-actividades"
import { getActividades } from "../service/actividad-service"

interface ActividadDetailProps {
  slug: string
}

export function ActividadDetail({ slug }: ActividadDetailProps) {
  const { actividad, loading, notFound } = useActividad(slug)
  const [related, setRelated] = useState<ActividadJmv[]>([])

  useEffect(() => {
    if (!actividad?.centroId) return
    getActividades({ centroId: actividad.centroId, limit: 4 })
      .then((r) => {
        const list = Array.isArray(r.data) ? r.data : []
        setRelated(list.filter((a) => a.slug !== slug).slice(0, 3))
      })
      .catch(() => {})
  }, [actividad?.centroId, slug])

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

  if (notFound || !actividad) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Activity className="w-16 h-16 text-muted-foreground/30" />
          <h1 className="text-2xl font-bold">Actividad no encontrada</h1>
          <p className="text-muted-foreground">La actividad que buscas no existe o fue eliminada.</p>
          <Link href="/actividades">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ver todas las actividades
            </Button>
          </Link>
        </div>
        <FooterSection />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero image */}
      <div className="relative w-full h-72 md:h-96 bg-muted overflow-hidden">
        {actividad.imagenUrl ? (
          <>
            <img src={actividad.imagenUrl} alt={actividad.titulo} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <Activity className="w-24 h-24 text-primary/20" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            {actividad.centro && (
              <Badge className="mb-3 bg-primary text-primary-foreground">
                {actividad.centro.nombreParroquia}
              </Badge>
            )}
            <h1 className={`text-3xl md:text-4xl font-bold leading-tight ${actividad.imagenUrl ? "text-white" : "text-foreground"}`}>
              {actividad.titulo}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main body */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/actividades" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Volver a actividades
            </Link>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary/70" />
                {new Date(actividad.fecha).toLocaleDateString("es-DO", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </span>
              {actividad.centro && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary/70" />
                  {actividad.centro.nombreParroquia}
                </span>
              )}
            </div>

            {/* Etiquetas */}
            {actividad.etiquetas.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {actividad.etiquetas.map((tag) => (
                  <Badge key={tag} variant="outline" className={`text-xs px-2.5 py-0.5 ${getTagColor(tag)}`}>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <Separator />

            {/* Resumen */}
            <div className="prose prose-gray max-w-none text-foreground/90 leading-relaxed">
              <p className="text-base">{actividad.resumen}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick info */}
            <div className="p-5 bg-card border rounded-2xl space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Información</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
                  <span>{new Date(actividad.fecha).toLocaleDateString("es-DO", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
                {actividad.centro && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
                    <span>{actividad.centro.nombreParroquia}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Otras actividades del centro
                </h3>
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/actividades/${rel.slug}`}
                    className="flex gap-3 group"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
                      {rel.imagenUrl ? (
                        <img src={rel.imagenUrl} alt={rel.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Activity className="w-6 h-6 text-muted-foreground/40" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">{rel.titulo}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(rel.fecha).toLocaleDateString("es-DO", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  )
}
