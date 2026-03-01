// src/features/centros/components/CentroAdminDetail.tsx
"use client"

import Link from "next/link"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Separator } from "@/src/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import {
  ArrowLeft,
  Building2,
  Calendar,
  Mail,
  MapPin,
  Loader2,
  Phone,
  Users,
  Activity,
  Edit,
  Tag,
  Star,
  ImageOff,
  Clock,
} from "lucide-react"
import { getTagColor } from "../model/types"
import { useCentro } from "../hook/use-centros"

interface CentroAdminDetailProps {
  centroId: number
}

function fmt(date: Date | string | null | undefined) {
  if (!date) return "—"
  return new Date(date).toLocaleDateString("es-DO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function fmtDatetime(date: Date | string | null | undefined) {
  if (!date) return "—"
  return new Date(date).toLocaleString("es-DO", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground">{value ?? "—"}</span>
    </div>
  )
}

export function CentroAdminDetail({ centroId }: CentroAdminDetailProps) {
  const { centro, loading, notFound } = useCentro(String(centroId))

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (notFound || !centro) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Building2 className="w-16 h-16 text-muted-foreground/30" />
        <h1 className="text-xl font-bold">Centro no encontrado</h1>
        <Link href="/admin/centros">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver a centros
          </Button>
        </Link>
      </div>
    )
  }

  const miembros = centro.miembros ?? []
  const comunidades = centro.comunidades ?? []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <Link
            href="/admin/centros"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-1"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a centros
          </Link>
          <h1 className="text-2xl font-bold">{centro.nombreParroquia}</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> {centro.ubicacion}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link href={`/admin/centros/${centroId}/edit`}>
            <Button size="sm">
              <Edit className="w-4 h-4 mr-2" /> Editar centro
            </Button>
          </Link>
        </div>
      </div>

      {/* Stat chips */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-4 py-2 text-sm border bg-card rounded-xl">
          <Users className="w-4 h-4 text-primary" />
          <span className="font-semibold">{centro.cantidadMiembrosActivos}</span>
          <span className="text-muted-foreground">miembros activos</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 text-sm border bg-card rounded-xl">
          <Building2 className="w-4 h-4 text-primary" />
          <span className="font-semibold">{comunidades.length}</span>
          <span className="text-muted-foreground">comunidades</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 text-sm border bg-card rounded-xl">
          <Users className="w-4 h-4 text-primary" />
          <span className="font-semibold">{miembros.length}</span>
          <span className="text-muted-foreground">miembros en consejo</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 text-sm border bg-card rounded-xl">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="font-semibold">{centro.anioFundacion}</span>
          <span className="text-muted-foreground">año de fundación</span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info" className="gap-2">
            <Building2 className="w-4 h-4" /> Información
          </TabsTrigger>
          <TabsTrigger value="consejo" className="gap-2">
            <Users className="w-4 h-4" /> Consejo
            {miembros.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">{miembros.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="comunidades" className="gap-2">
            <Star className="w-4 h-4" /> Comunidades
            {comunidades.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">{comunidades.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* ── Información ── */}
        <TabsContent value="info" className="mt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main column */}
            <div className="space-y-6 lg:col-span-2">
              {/* Imagen */}
              {centro.imagenUrl ? (
                <div className="w-full overflow-hidden border rounded-2xl aspect-video bg-muted">
                  <img
                    src={centro.imagenUrl}
                    alt={centro.nombreParroquia}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center border rounded-2xl bg-muted aspect-video">
                  <div className="text-center text-muted-foreground/40">
                    <ImageOff className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Sin imagen</p>
                  </div>
                </div>
              )}

              {/* Resumen */}
              <div className="p-6 space-y-3 border bg-card rounded-2xl">
                <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  <Tag className="w-4 h-4" /> Resumen
                </h3>
                <p className="text-sm leading-relaxed text-foreground/90">{centro.resumen || "—"}</p>
              </div>

              {/* Etiquetas */}
              {centro.etiquetas.length > 0 && (
                <div className="p-6 space-y-3 border bg-card rounded-2xl">
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Etiquetas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {centro.etiquetas.map((tag) => (
                      <Badge key={tag} className={`text-xs ${getTagColor(tag)} border`}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Última actividad */}
              {centro.ultimaActividad && (
                <div className="p-6 space-y-3 border bg-card rounded-2xl">
                  <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    <Activity className="w-4 h-4" /> Última actividad
                  </h3>
                  <p className="text-sm font-medium">{centro.ultimaActividad.titulo}</p>
                  <p className="text-xs text-muted-foreground">{fmt(centro.ultimaActividad.fecha)}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Datos de contacto */}
              <div className="p-5 space-y-4 border bg-card rounded-2xl">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  Datos de contacto
                </h3>
                <div className="space-y-4">
                  <InfoRow label="Coordinadora" value={centro.nombreCoordinadora} />
                  <Separator />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Teléfono</span>
                    <a href={`tel:${centro.telefono}`} className="text-sm text-primary hover:underline flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> {centro.telefono}
                    </a>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Correo</span>
                    <a href={`mailto:${centro.correo}`} className="text-sm text-primary hover:underline flex items-center gap-1.5 break-all">
                      <Mail className="w-3.5 h-3.5" /> {centro.correo}
                    </a>
                  </div>
                  <Separator />
                  <InfoRow label="Ubicación" value={<span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />{centro.ubicacion}</span>} />
                  <Separator />
                  <InfoRow label="Año de fundación" value={centro.anioFundacion} />
                </div>
              </div>

              {/* Datos internos */}
              <div className="p-5 space-y-4 border bg-card rounded-2xl">
                <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  <Clock className="w-4 h-4" /> Auditoría
                </h3>
                <div className="space-y-3">
                  <InfoRow label="Creado" value={fmtDatetime(centro.createdDate)} />
                  {centro.modifiedDate && (
                    <>
                      <Separator />
                      <InfoRow label="Última modificación" value={fmtDatetime(centro.modifiedDate)} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── Consejo de Centro ── */}
        <TabsContent value="consejo" className="mt-6">
          {miembros.length === 0 ? (
            <div className="py-24 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-lg font-medium text-muted-foreground">Sin miembros registrados</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{miembros.length} miembro{miembros.length !== 1 ? "s" : ""} en el consejo</p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {miembros.map((m) => (
                  <div key={m.id} className="overflow-hidden border bg-card rounded-2xl">
                    {/* Foto */}
                    <div className="relative h-52 bg-muted">
                      {m.imagenUrl ? (
                        <img
                          src={m.imagenUrl}
                          alt={m.nombre}
                          className="object-cover object-top w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/5 to-secondary/10">
                          <Users className="w-16 h-16 text-primary/20" />
                        </div>
                      )}
                    </div>

                    {/* Datos */}
                    <div className="p-4 space-y-3">
                      <div>
                        <Badge variant="outline" className="mb-2 text-xs">{m.cargo}</Badge>
                        <p className="font-semibold text-foreground">{m.nombre}</p>
                      </div>

                      {m.descripcion && (
                        <p className="text-sm leading-relaxed text-muted-foreground">{m.descripcion}</p>
                      )}

                      <Separator />

                      <div className="space-y-1.5 text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span className="font-medium">ID</span>
                          <span className="font-mono">{m.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Registrado</span>
                          <span>{fmt(m.createdDate)}</span>
                        </div>
                        {m.modifiedDate && (
                          <div className="flex justify-between">
                            <span className="font-medium">Modificado</span>
                            <span>{fmt(m.modifiedDate)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* ── Comunidades ── */}
        <TabsContent value="comunidades" className="mt-6">
          {comunidades.length === 0 ? (
            <div className="py-24 text-center">
              <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-lg font-medium text-muted-foreground">Sin comunidades registradas</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{comunidades.length} comunidad{comunidades.length !== 1 ? "es" : ""}</p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {comunidades.map((c) => (
                  <div key={c.id} className="overflow-hidden border bg-card rounded-2xl">
                    {/* Imagen */}
                    <div className="relative h-44 bg-muted">
                      {c.imagenUrl ? (
                        <img
                          src={c.imagenUrl}
                          alt={c.nombre}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/5 to-secondary/10">
                          <Building2 className="w-12 h-12 text-primary/20" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <Badge className="text-xs border-0 shadow-sm bg-white/90 text-foreground">
                          {c.etapa}
                        </Badge>
                      </div>
                    </div>

                    {/* Datos */}
                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold text-foreground">{c.nombre}</h3>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-medium text-muted-foreground">Miembros</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-muted-foreground" />
                            {c.cantidadMiembros}
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-medium text-muted-foreground">Inicio</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                            {fmt(c.inicioDate)}
                          </span>
                        </div>
                      </div>

                      {c.etiquetas.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {c.etiquetas.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className={`text-xs px-2 py-0.5 ${getTagColor(tag)}`}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <Separator />

                      <div className="space-y-1.5 text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span className="font-medium">ID</span>
                          <span className="font-mono">{c.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Registrada</span>
                          <span>{fmt(c.createdDate)}</span>
                        </div>
                        {c.modifiedDate && (
                          <div className="flex justify-between">
                            <span className="font-medium">Modificada</span>
                            <span>{fmt(c.modifiedDate)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
