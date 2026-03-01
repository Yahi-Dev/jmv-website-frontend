// src/features/actividades/components/ActividadDetailDialog.tsx
"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog"
import { Badge } from "@/src/components/ui/badge"
import { Separator } from "@/src/components/ui/separator"
import { CalendarDays, MapPin, Tag, BookOpen, Activity } from "lucide-react"
import { ActividadJmv, getTagColor } from "../model/types"

interface ActividadDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  actividad: ActividadJmv | null
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("es-DO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function ActividadDetailDialog({ open, onOpenChange, actividad }: ActividadDetailDialogProps) {
  if (!actividad) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[92vh] flex flex-col overflow-hidden p-0">

        {/* Banner image */}
        <div className="relative w-full h-40 shrink-0 bg-muted overflow-hidden">
          {actividad.imagenUrl ? (
            <>
              <img
                src={actividad.imagenUrl}
                alt={actividad.titulo}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <Activity className="w-16 h-16 text-primary/20" />
            </div>
          )}
          <div className="absolute bottom-4 left-6 right-6">
            <DialogHeader>
              <DialogTitle
                className={`text-xl font-bold leading-snug ${actividad.imagenUrl ? "text-white" : "text-foreground"}`}
              >
                {actividad.titulo}
              </DialogTitle>
              {actividad.centro && (
                <DialogDescription
                  className={`text-sm mt-1 ${actividad.imagenUrl ? "text-white/80" : "text-muted-foreground"}`}
                >
                  {actividad.centro.nombreParroquia}
                </DialogDescription>
              )}
            </DialogHeader>
          </div>
        </div>

        {/* Meta strip */}
        <div className="px-6 py-3 border-b bg-muted/30 shrink-0">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {actividad.centro && (
              <Badge variant="outline" className="text-xs px-2.5 py-0.5 bg-primary/10 text-primary border-primary/20">
                {actividad.centro.nombreParroquia}
              </Badge>
            )}
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4 text-primary/70 shrink-0" />
              {capitalize(formatDate(actividad.fecha))}
            </span>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-5">
          <div className="space-y-5">

            {/* Etiquetas */}
            {actividad.etiquetas.length > 0 && (
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  <Tag className="w-3.5 h-3.5" />
                  Etiquetas
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {actividad.etiquetas.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`text-xs px-2.5 py-0.5 ${getTagColor(tag)}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Resumen */}
            <Separator />
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5" />
                Resumen
              </h3>
              <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {actividad.resumen}
              </p>
            </div>

            <div className="pb-2" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
