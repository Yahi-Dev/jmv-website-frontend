// src/features/noticias/components/NoticiaDetail.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Separator } from "@/src/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Loader2,
  Newspaper,
  ArrowRight,
  BookOpen,
} from "lucide-react"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Noticia, getTagColor, getTipoColor } from "@/src/features/noticias/model/types"
import { NoticiaShareButtons } from "./NoticiaShareButtons"
import { useNoticia } from "@/src/features/noticias/hook/use-noticias"
import { getNoticias } from "@/src/features/noticias/service/noticia-service"

interface NoticiaDetailProps {
  slug: string
}

export function NoticiaDetail({ slug }: NoticiaDetailProps) {
  const { noticia, loading, notFound } = useNoticia(slug)
  const [related, setRelated] = useState<Noticia[]>([])

  // Fetch related noticias (same tipo, different slug, limit 3)
  useEffect(() => {
    if (!noticia) return
    getNoticias({ tipo: noticia.tipo, limit: 6 })
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : []
        setRelated(data.filter((n) => n.slug !== slug).slice(0, 3))
      })
      .catch(() => setRelated([]))
  }, [noticia, slug])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <Navbar />

      <div className="container py-6">
        <Button
          variant="ghost"
          asChild
          className="transition-all duration-300 hover:bg-primary/10 hover:text-primary group -ml-2"
        >
          <Link href="/noticias" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Volver a noticias
          </Link>
        </Button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="container flex items-center justify-center py-32">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      )}

      {/* Not found */}
      {!loading && notFound && (
        <div className="container py-32 text-center">
          <Newspaper className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
          <h2 className="mb-2 text-2xl font-bold text-foreground">Noticia no encontrada</h2>
          <p className="mb-6 text-muted-foreground">
            La noticia que buscas no existe o fue eliminada.
          </p>
          <Button asChild>
            <Link href="/noticias">Ver todas las noticias</Link>
          </Button>
        </div>
      )}

      {/* Article content */}
      {!loading && noticia && (
        <article className="pb-20">
          <div className="container px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-3">

              {/* ── MAIN CONTENT (2/3) ─────────────────────────────────── */}
              <div className="lg:col-span-2 space-y-10">

                {/* Article header */}
                <div>
                  {/* Type + tags */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <Badge
                      variant="outline"
                      className={`px-4 py-1.5 text-sm font-medium ${getTipoColor(noticia.tipo)}`}
                    >
                      {noticia.tipo}
                    </Badge>
                    {noticia.etiquetas.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className={`text-xs ${getTagColor(tag)}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h1 className="mb-5 text-4xl font-bold leading-tight text-transparent lg:text-5xl bg-gradient-to-br from-foreground to-primary bg-clip-text">
                    {noticia.titulo}
                  </h1>
                  <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
                    {noticia.descripcionBreve}
                  </p>

                  {/* Meta bar */}
                  <div className="flex flex-wrap items-center gap-6 p-5 border rounded-xl bg-gradient-to-r from-card/50 to-background/50 border-border/50 backdrop-blur-sm text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>
                        {new Date(noticia.fecha).toLocaleDateString("es-DO", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {noticia.hora && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{noticia.hora}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{noticia.ubicacion}</span>
                    </div>
                  </div>
                </div>

                {/* Featured image */}
                <div className="overflow-hidden shadow-2xl aspect-video rounded-2xl">
                  <img
                    src={noticia.imagenUrl || "/placeholder.svg"}
                    alt={noticia.titulo}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Article body — renders TipTap HTML */}
                {noticia.descripcionCompleta ? (
                  <div
                    className="prose prose-gray max-w-none text-lg leading-relaxed
                      prose-headings:text-foreground prose-headings:font-bold
                      prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                      prose-p:text-muted-foreground prose-p:leading-relaxed
                      prose-strong:text-foreground
                      prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80
                      prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                      prose-li:my-1
                      prose-blockquote:border-primary/30 prose-blockquote:text-muted-foreground
                      prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                      prose-pre:bg-muted prose-pre:border prose-pre:border-border/50
                      prose-hr:border-border/50"
                    dangerouslySetInnerHTML={{ __html: noticia.descripcionCompleta }}
                  />
                ) : null}

                {/* Related articles */}
                {related.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-1 rounded-full bg-gradient-to-r from-primary to-secondary" />
                        <h2 className="text-2xl font-bold">Noticias relacionadas</h2>
                      </div>
                      <div className="grid gap-6 sm:grid-cols-3">
                        {related.map((rel) => (
                          <Card
                            key={rel.id}
                            className="overflow-hidden transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-background to-card border-border/50"
                          >
                            <div className="overflow-hidden aspect-video">
                              <img
                                src={rel.imagenUrl || "/placeholder.svg"}
                                alt={rel.titulo}
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <CardHeader className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${getTipoColor(rel.tipo)}`}
                                >
                                  {rel.tipo}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(rel.fecha).toLocaleDateString("es-DO", {
                                    day: "numeric",
                                    month: "short",
                                  })}
                                </div>
                              </div>
                              <CardTitle className="text-base leading-tight line-clamp-2 transition-colors duration-300 group-hover:text-primary">
                                {rel.titulo}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <CardDescription className="mb-3 leading-relaxed line-clamp-2 text-xs">
                                {rel.descripcionBreve}
                              </CardDescription>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 gap-1.5 text-xs hover:text-primary group/btn"
                                asChild
                              >
                                <Link href={`/noticias/${rel.slug}`}>
                                  <BookOpen className="w-3.5 h-3.5" />
                                  Leer más
                                  <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                                </Link>
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* ── SIDEBAR (1/3) ──────────────────────────────────────── */}
              <div>
                <div className="sticky top-24 space-y-6">
                  {/* Quick info */}
                  <div className="p-6 border rounded-2xl bg-card/80 backdrop-blur-sm border-border/50 shadow-lg space-y-4">
                    <h3 className="font-bold text-foreground">Información rápida</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Fecha</p>
                          <p className="font-medium capitalize">
                            {new Date(noticia.fecha).toLocaleDateString("es-DO", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Ubicación</p>
                          <p className="font-medium">{noticia.ubicacion}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Newspaper className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Tipo</p>
                          <Badge
                            variant="outline"
                            className={`text-xs mt-0.5 ${getTipoColor(noticia.tipo)}`}
                          >
                            {noticia.tipo}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    {noticia.etiquetas.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Etiquetas</p>
                          <div className="flex flex-wrap gap-1.5">
                            {noticia.etiquetas.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className={`text-xs ${getTagColor(tag)}`}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Share buttons */}
                  <NoticiaShareButtons
                    titulo={noticia.titulo}
                    descripcion={noticia.descripcionBreve}
                  />
                </div>
              </div>

            </div>
          </div>
        </article>
      )}

      <FooterSection />
    </div>
  )
}
