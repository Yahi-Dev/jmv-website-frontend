// src/features/eventos/components/EventoDetailDialog.tsx
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
import {
  CalendarDays,
  Clock,
  MapPin,
  Mail,
  Phone,
  Tag,
  ListChecks,
  BookOpen,
  CheckCircle2,
  CalendarRange,
} from "lucide-react"
import { Evento, getTagColor } from "../model/types"

interface EventoDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  evento: Evento | null
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

export function EventoDetailDialog({ open, onOpenChange, evento }: EventoDetailDialogProps) {
  if (!evento) return null

  const hasAgenda = evento.agenda && evento.agenda.length > 0
  const hasActividades = evento.actividades && evento.actividades.length > 0
  const hasRequisitos = evento.requisitos && evento.requisitos.length > 0
  const hasDescription = !!evento.descripcionCompleta?.trim()
  const hasContact = !!(evento.email || evento.telefono)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[92vh] flex flex-col overflow-hidden p-0">

        {/* ── Header with image banner ──────────────────────────────────── */}
        <div className="relative w-full h-44 shrink-0 bg-muted overflow-hidden">
          {evento.imagenUrl ? (
            <>
              <img
                src={evento.imagenUrl}
                alt={evento.titulo}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <CalendarDays className="w-16 h-16 text-primary/20" />
            </div>
          )}

          {/* Overlay title */}
          <div className="absolute bottom-4 left-6 right-6">
            <DialogHeader>
              <DialogTitle className={`text-xl font-bold leading-snug ${evento.imagenUrl ? "text-white" : "text-foreground"}`}>
                {evento.titulo}
              </DialogTitle>
              <DialogDescription className={`text-sm mt-1 line-clamp-2 ${evento.imagenUrl ? "text-white/80" : "text-muted-foreground"}`}>
                {evento.descripcionBreve}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* ── Meta strip ───────────────────────────────────────────────── */}
        <div className="px-6 py-3 border-b bg-muted/30 shrink-0">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-primary/70 shrink-0" />
              {capitalize(formatDate(evento.fecha))}
            </span>
            {evento.hora && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary/70 shrink-0" />
                {evento.hora}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary/70 shrink-0" />
              {evento.ubicacion}
            </span>
          </div>
        </div>

        {/* ── Scrollable body ───────────────────────────────────────────── */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-5">
          <div className="space-y-6">

            {/* Etiquetas */}
            {evento.etiquetas.length > 0 && (
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  <Tag className="w-3.5 h-3.5" />
                  Etiquetas
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {evento.etiquetas.map((tag) => (
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

            {/* Contacto */}
            {hasContact && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    <Mail className="w-3.5 h-3.5" />
                    Contacto
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    {evento.email && (
                      <a
                        href={`mailto:${evento.email}`}
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <Mail className="w-4 h-4 shrink-0" />
                        {evento.email}
                      </a>
                    )}
                    {evento.telefono && (
                      <a
                        href={`tel:${evento.telefono}`}
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <Phone className="w-4 h-4 shrink-0" />
                        {evento.telefono}
                      </a>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Descripción completa */}
            {hasDescription && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    <BookOpen className="w-3.5 h-3.5" />
                    Descripción completa
                  </h3>
                  <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {evento.descripcionCompleta}
                  </p>
                </div>
              </>
            )}

            {/* Actividades */}
            {hasActividades && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    <ListChecks className="w-3.5 h-3.5" />
                    Actividades
                  </h3>
                  <ul className="space-y-1.5">
                    {evento.actividades.map((act, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Agenda */}
            {hasAgenda && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    <CalendarRange className="w-3.5 h-3.5" />
                    Agenda
                  </h3>
                  <div className="space-y-4">
                    {evento.agenda.map((dia, diaIdx) => (
                      <div key={diaIdx} className="border rounded-lg overflow-hidden">
                        {/* Day header */}
                        <div className="px-4 py-2 bg-muted/50 border-b">
                          <p className="text-sm font-semibold">{dia.dia}</p>
                        </div>
                        {/* Activities */}
                        {dia.actividades.length > 0 ? (
                          <div className="divide-y">
                            {dia.actividades.map((act, actIdx) => (
                              <div key={actIdx} className="flex items-start gap-3 px-4 py-2.5">
                                {act.hora && (
                                  <span className="flex items-center gap-1 text-xs font-mono text-primary bg-primary/8 px-2 py-0.5 rounded shrink-0">
                                    <Clock className="w-3 h-3" />
                                    {act.hora}
                                  </span>
                                )}
                                <p className="text-sm">{act.actividad}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="px-4 py-3 text-xs text-muted-foreground italic">
                            Sin actividades registradas
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Requisitos */}
            {hasRequisitos && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    <ListChecks className="w-3.5 h-3.5" />
                    Requisitos
                  </h3>
                  <ul className="space-y-1.5">
                    {evento.requisitos.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            <div className="pb-2" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
