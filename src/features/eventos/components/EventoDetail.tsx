// src/features/eventos/components/EventoDetail.tsx
"use client"

import Link from "next/link"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Separator } from "@/src/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  ListChecks,
  CalendarDays,
  BookOpen,
  Loader2,
} from "lucide-react"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { getTagColor } from "@/src/features/eventos/model/types"
import { EventoShareButtons } from "@/src/features/eventos/components/EventoShareButtons"
import { useEvento } from "@/src/features/eventos/hook/use-eventos"

interface EventoDetailProps {
  slug: string
}

export function EventoDetail({ slug }: EventoDetailProps) {
  const { evento, loading, notFound } = useEvento(slug)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <Navbar />

      <div className="px-4 sm:px-10">
        {/* Back button */}
        <div className="container py-6">
          <Button variant="ghost" asChild className="hover:bg-primary/5 hover:text-primary -ml-2">
            <Link href="/eventos">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a eventos
            </Link>
          </Button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="container flex items-center justify-center py-32">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        )}

        {/* Not found state */}
        {!loading && notFound && (
          <div className="container py-32 text-center">
            <CalendarDays className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <h2 className="mb-2 text-2xl font-bold text-foreground">Evento no encontrado</h2>
            <p className="mb-6 text-muted-foreground">
              El evento que buscas no existe o fue eliminado.
            </p>
            <Button asChild>
              <Link href="/eventos">Ver todos los eventos</Link>
            </Button>
          </div>
        )}

        {/* Event content */}
        {!loading && evento && (
          <div className="container pb-20">
            <div className="grid gap-10 lg:grid-cols-3">

              {/* ── LEFT / MAIN CONTENT (2/3) ──────────────────────────────── */}
              <div className="lg:col-span-2 space-y-10">

                {/* Hero image */}
                <div className="relative overflow-hidden shadow-2xl aspect-video rounded-2xl">
                  <img
                    src={
                      evento.imagenUrl ||
                      `/placeholder.svg?height=400&width=800&query=${encodeURIComponent(evento.titulo)}`
                    }
                    alt={evento.titulo}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Tags overlay */}
                  <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
                    {evento.etiquetas.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className={`border text-xs px-2.5 py-1 backdrop-blur-sm ${getTagColor(tag)}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Title & description */}
                <div>
                  <h1 className="mb-4 text-4xl font-bold leading-tight lg:text-5xl text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                    {evento.titulo}
                  </h1>
                  <p className="text-xl leading-relaxed text-muted-foreground">
                    {evento.descripcionBreve}
                  </p>
                </div>

                {/* Info cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-4 p-5 border rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 shrink-0">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground capitalize">
                        {new Date(evento.fecha).toLocaleDateString("es-DO", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">{evento.hora}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 border rounded-xl bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/20 shrink-0">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{evento.ubicacion}</p>
                      <p className="text-sm text-muted-foreground">Lugar del evento</p>
                    </div>
                  </div>

                  {evento.email && (
                    <div className="flex items-center gap-4 p-5 border rounded-xl bg-muted/30 border-border/50">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted/60 shrink-0">
                        <Mail className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
                          Correo de contacto
                        </p>
                        <a
                          href={`mailto:${evento.email}`}
                          className="font-medium text-primary hover:underline break-all text-sm"
                        >
                          {evento.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {evento.telefono && (
                    <div className="flex items-center gap-4 p-5 border rounded-xl bg-muted/30 border-border/50">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted/60 shrink-0">
                        <Phone className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
                          Teléfono de contacto
                        </p>
                        <a
                          href={`tel:${evento.telefono}`}
                          className="font-medium text-primary hover:underline text-sm"
                        >
                          {evento.telefono}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Full description */}
                {evento.descripcionCompleta && (
                  <>
                    <Separator />
                    <div>
                      <h2 className="flex items-center gap-2 mb-5 text-2xl font-bold text-foreground">
                        <BookOpen className="w-6 h-6 text-primary" />
                        Descripción del evento
                      </h2>
                      <div className="p-7 text-base leading-relaxed whitespace-pre-line border text-muted-foreground bg-card/50 rounded-xl border-border/50">
                        {evento.descripcionCompleta}
                      </div>
                    </div>
                  </>
                )}

                {/* Activities */}
                {evento.actividades.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h2 className="flex items-center gap-2 mb-5 text-2xl font-bold text-foreground">
                        <ListChecks className="w-6 h-6 text-primary" />
                        Actividades del evento
                      </h2>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {evento.actividades.map((act, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-4 border rounded-lg bg-card/50 border-border/50"
                          >
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium">{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Agenda */}
                {evento.agenda.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-foreground">
                        <CalendarDays className="w-6 h-6 text-primary" />
                        Agenda del evento
                      </h2>

                      <div className="space-y-6">
                        {evento.agenda.map((dia, diaIdx) => (
                          <div key={diaIdx}>
                            {/* Day header */}
                            <div className="flex items-center gap-3 mb-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-xs font-bold shrink-0">
                                {diaIdx + 1}
                              </div>
                              <h3 className="font-semibold text-foreground">{dia.dia}</h3>
                            </div>

                            {/* Activities for this day */}
                            <div className="ml-11 space-y-3">
                              {dia.actividades.map((act, actIdx) => (
                                <div
                                  key={actIdx}
                                  className="flex gap-4 p-4 border rounded-xl bg-card/80 border-border/50 hover:shadow-md transition-shadow"
                                >
                                  <div className="flex items-center justify-center h-9 text-xs font-semibold text-white rounded-lg shadow min-w-24 shrink-0 bg-gradient-to-r from-primary to-secondary">
                                    {act.hora}
                                  </div>
                                  <div className="flex items-center flex-1">
                                    <p className="text-sm font-medium text-foreground">{act.actividad}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Requirements */}
                {evento.requisitos.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-foreground">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                        Requisitos
                      </h2>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {evento.requisitos.map((req, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-4 border rounded-lg bg-card/50 border-border/50"
                          >
                            <div className="flex items-center justify-center w-6 h-6 mt-0.5 rounded-full bg-primary/15 shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-sm leading-relaxed text-muted-foreground">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* ── RIGHT SIDEBAR (1/3) ────────────────────────────────────── */}
              <div className="space-y-6">
                <div className="sticky top-24">
                  {/* Quick info card */}
                  <div className="p-6 border rounded-2xl bg-card/80 backdrop-blur-sm border-border/50 shadow-lg space-y-5 mb-6">
                    <h3 className="font-bold text-foreground">Información rápida</h3>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Fecha</p>
                          <p className="text-sm font-medium capitalize">
                            {new Date(evento.fecha).toLocaleDateString("es-DO", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Horario</p>
                          <p className="text-sm font-medium">{evento.hora}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Lugar</p>
                          <p className="text-sm font-medium">{evento.ubicacion}</p>
                        </div>
                      </div>
                      {evento.email && (
                        <div className="flex items-start gap-3">
                          <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Email</p>
                            <a
                              href={`mailto:${evento.email}`}
                              className="text-sm font-medium text-primary hover:underline break-all"
                            >
                              {evento.email}
                            </a>
                          </div>
                        </div>
                      )}
                      {evento.telefono && (
                        <div className="flex items-start gap-3">
                          <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Teléfono</p>
                            <a
                              href={`tel:${evento.telefono}`}
                              className="text-sm font-medium text-primary hover:underline"
                            >
                              {evento.telefono}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Share buttons */}
                  <EventoShareButtons titulo={evento.titulo} descripcion={evento.descripcionBreve} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <FooterSection />
    </div>
  )
}
