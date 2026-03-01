// src/features/noticias/components/NoticiaDetailDialog.tsx
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
  Newspaper,
  Star,
  Tag,
  BookOpen,
} from "lucide-react"
import { Noticia, getTagColor, getTipoColor } from "../model/types"

interface NoticiaDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  noticia: Noticia | null
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

export function NoticiaDetailDialog({ open, onOpenChange, noticia }: NoticiaDetailDialogProps) {
  if (!noticia) return null

  const hasDescription = !!noticia.descripcionCompleta?.trim()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[92vh] flex flex-col overflow-hidden p-0">

        {/* ── Header with image banner ──────────────────────────────────── */}
        <div className="relative w-full h-44 shrink-0 bg-muted overflow-hidden">
          {noticia.imagenUrl ? (
            <>
              <img
                src={noticia.imagenUrl}
                alt={noticia.titulo}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <Newspaper className="w-16 h-16 text-primary/20" />
            </div>
          )}

          {/* Overlay title */}
          <div className="absolute bottom-4 left-6 right-6">
            <DialogHeader>
              <div className="flex items-start gap-2">
                {noticia.destacada && (
                  <Star className="w-5 h-5 shrink-0 fill-amber-400 text-amber-400 mt-0.5" />
                )}
                <DialogTitle
                  className={`text-xl font-bold leading-snug ${noticia.imagenUrl ? "text-white" : "text-foreground"}`}
                >
                  {noticia.titulo}
                </DialogTitle>
              </div>
              <DialogDescription
                className={`text-sm mt-1 line-clamp-2 ${noticia.imagenUrl ? "text-white/80" : "text-muted-foreground"}`}
              >
                {noticia.descripcionBreve}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* ── Meta strip ───────────────────────────────────────────────── */}
        <div className="px-6 py-3 border-b bg-muted/30 shrink-0">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {/* Tipo badge */}
            <Badge
              variant="outline"
              className={`text-xs px-2.5 py-0.5 ${getTipoColor(noticia.tipo)}`}
            >
              {noticia.tipo}
            </Badge>

            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4 text-primary/70 shrink-0" />
              {capitalize(formatDate(noticia.fecha))}
            </span>

            {noticia.hora && (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary/70 shrink-0" />
                {noticia.hora}
              </span>
            )}

            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary/70 shrink-0" />
              {noticia.ubicacion}
            </span>

            {noticia.destacada && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                Destacada
              </span>
            )}
          </div>
        </div>

        {/* ── Scrollable body ───────────────────────────────────────────── */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-5">
          <div className="space-y-6">

            {/* Etiquetas */}
            {noticia.etiquetas.length > 0 && (
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  <Tag className="w-3.5 h-3.5" />
                  Etiquetas
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {noticia.etiquetas.map((tag) => (
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

            {/* Descripción completa — rendered as HTML (TipTap output) */}
            {hasDescription && (
              <>
                {noticia.etiquetas.length > 0 && <Separator />}
                <div className="space-y-2">
                  <h3 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    <BookOpen className="w-3.5 h-3.5" />
                    Contenido
                  </h3>
                  <div
                    className="prose prose-sm prose-gray max-w-none text-foreground/90
                      prose-headings:font-semibold prose-headings:text-foreground
                      prose-a:text-primary prose-a:underline
                      prose-strong:text-foreground
                      prose-ul:pl-5 prose-ol:pl-5
                      prose-li:my-0.5"
                    dangerouslySetInnerHTML={{ __html: noticia.descripcionCompleta! }}
                  />
                </div>
              </>
            )}

            {/* Empty state */}
            {!hasDescription && noticia.etiquetas.length === 0 && (
              <div className="py-12 text-center">
                <Newspaper className="w-10 h-10 mx-auto mb-3 text-muted-foreground/25" />
                <p className="text-sm text-muted-foreground">
                  Esta noticia no tiene contenido adicional.
                </p>
              </div>
            )}

            <div className="pb-2" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
