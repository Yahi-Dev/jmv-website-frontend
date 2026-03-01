// src/app/(admin)/admin/consejos/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CalendarRange,
  Crown,
  Mail,
  MapPin,
  Phone,
  UserRound,
  Users,
} from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Separator } from "@/src/components/ui/separator"
import { ConsejoNacional, CargoConsejo, CARGO_LABELS } from "@/src/features/consejos/model/types"

// ── Color map for cargo badges ────────────────────────────────────────────────
const CARGO_COLORS: Record<CargoConsejo, string> = {
  [CargoConsejo.CoordinadorNacional]: "bg-primary/10 text-primary border-primary/20",
  [CargoConsejo.SecretarioNacional]: "bg-emerald-100 text-emerald-700 border-emerald-200",
  [CargoConsejo.TesoreroNacional]: "bg-amber-100 text-amber-700 border-amber-200",
  [CargoConsejo.VocalDeFormacion]: "bg-blue-100 text-blue-700 border-blue-200",
  [CargoConsejo.VocalDeMisionYCaridad]: "bg-rose-100 text-rose-700 border-rose-200",
  [CargoConsejo.VocalLiturgiaYMariana]: "bg-purple-100 text-purple-700 border-purple-200",
  [CargoConsejo.VocalDeExpansion]: "bg-orange-100 text-orange-700 border-orange-200",
  [CargoConsejo.VocalDePrejuveniles]: "bg-cyan-100 text-cyan-700 border-cyan-200",
  [CargoConsejo.VocalDeCulturaYRecreacion]: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("es-DO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ConsejoDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [consejo, setConsejo] = useState<ConsejoNacional | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/consejos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setConsejo(data.data)
        } else {
          setNotFound(true)
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-muted animate-pulse rounded-md" />
          <div className="h-8 w-56 bg-muted animate-pulse rounded-md" />
        </div>
        <div className="h-44 w-full bg-muted animate-pulse rounded-xl" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  // ── Not found ──────────────────────────────────────────────────────────────
  if (notFound || !consejo) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="p-4 rounded-full bg-muted mb-4">
          <Users className="w-10 h-10 text-muted-foreground/50" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Consejo no encontrado</h2>
        <p className="text-sm text-muted-foreground mb-6">
          El consejo que buscas no existe o fue eliminado.
        </p>
        <Button asChild>
          <Link href="/admin/consejos">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Consejos
          </Link>
        </Button>
      </div>
    )
  }

  const coordinador = consejo.miembros.find(
    (m) => m.cargo === CargoConsejo.CoordinadorNacional
  )

  // Coordinador first, then alphabetically
  const sortedMiembros = [...consejo.miembros].sort((a, b) => {
    if (a.cargo === CargoConsejo.CoordinadorNacional) return -1
    if (b.cargo === CargoConsejo.CoordinadorNacional) return 1
    return a.nombre.localeCompare(b.nombre)
  })

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/consejos">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold">Consejo {consejo.periodo}</h1>
            {consejo.isActual && (
              <Badge className="bg-green-100 text-green-700 border border-green-200 hover:bg-green-100 text-xs shrink-0">
                Activo
              </Badge>
            )}
          </div>
          {consejo.lema && (
            <p className="text-sm italic text-muted-foreground mt-0.5">
              &ldquo;{consejo.lema}&rdquo;
            </p>
          )}
        </div>
      </div>

      {/* ── Info card ─────────────────────────────────────────────────────── */}
      <div className="rounded-xl border bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 overflow-hidden">
        {/* Consejo photo — plain img works with relative paths and external URLs */}
        {consejo.fotoUrl && (
          <div className="relative w-full h-56 sm:h-72 overflow-hidden">
            <img
              src={consejo.fotoUrl}
              alt={`Consejo ${consejo.periodo}`}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = "none" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-5 text-white">
              <p className="text-2xl font-bold drop-shadow">{consejo.periodo}</p>
              {consejo.lema && (
                <p className="text-sm italic text-white/80 mt-0.5 max-w-md drop-shadow">
                  &ldquo;{consejo.lema}&rdquo;
                </p>
              )}
            </div>
          </div>
        )}

        <div className="p-5 flex flex-wrap gap-x-8 gap-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary/70 shrink-0" />
            <span>
              <span className="font-medium text-foreground">Inicio:</span>{" "}
              {formatDate(consejo.fechaInicio)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarRange className="w-4 h-4 text-primary/70 shrink-0" />
            <span>
              <span className="font-medium text-foreground">Fin:</span>{" "}
              {consejo.fechaFin ? formatDate(consejo.fechaFin) : "Vigente"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-primary/70 shrink-0" />
            <span>
              <span className="font-medium text-foreground">{consejo.miembros.length}</span>{" "}
              miembro{consejo.miembros.length !== 1 ? "s" : ""}
            </span>
          </div>
          {coordinador && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Crown className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                <span className="font-medium text-foreground">Coordinador/a:</span>{" "}
                {coordinador.nombre}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Members section ───────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-1 rounded-full bg-gradient-to-r from-primary to-secondary shrink-0" />
          <h2 className="text-xl font-bold">Miembros del Consejo</h2>
          <span className="text-sm text-muted-foreground">({consejo.miembros.length})</span>
        </div>

        {sortedMiembros.length === 0 ? (
          <div className="py-16 text-center border-2 border-dashed rounded-xl border-muted-foreground/20">
            <Users className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" />
            <p className="text-muted-foreground">No hay miembros registrados en este consejo.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sortedMiembros.map((m) => {
              const photoSrc = m.fotoUrl || (m.user as any)?.image || null
              return (
                <div
                  key={m.id}
                  className="rounded-xl border bg-card overflow-hidden flex flex-col"
                >
                  {/* ── Photo ─────────────────────────────────────────── */}
                  <div className="relative h-52 bg-muted overflow-hidden">
                    {photoSrc ? (
                      <img
                        src={photoSrc}
                        alt={m.nombre}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                          e.currentTarget.parentElement!.classList.add("flex", "items-center", "justify-center")
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <UserRound className="w-16 h-16 text-muted-foreground/25" />
                      </div>
                    )}
                    {/* Cargo overlay */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 pt-8">
                      <Badge
                        className={`text-xs border ${CARGO_COLORS[m.cargo]}`}
                        variant="secondary"
                      >
                        {CARGO_LABELS[m.cargo]}
                      </Badge>
                    </div>
                  </div>

                  {/* ── Info ──────────────────────────────────────────── */}
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    {/* Name + estado */}
                    <div>
                      <p className="font-bold text-base leading-snug">{m.nombre}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{m.estado}</Badge>
                        {m.ciudad && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3 shrink-0" />
                            {m.ciudad}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contact */}
                    {(m.email || m.telefono) && (
                      <>
                        <Separator />
                        <div className="space-y-1.5">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Contacto
                          </p>
                          {m.email && (
                            <div className="flex items-start gap-2 text-sm">
                              <Mail className="w-4 h-4 shrink-0 text-primary/70 mt-0.5" />
                              <span className="break-all">{m.email}</span>
                            </div>
                          )}
                          {m.telefono && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4 shrink-0 text-primary/70" />
                              <span>{m.telefono}</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {/* Biografía corta */}
                    {m.bioCorta && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                            Biografía corta
                          </p>
                          <p className="text-sm leading-relaxed">{m.bioCorta}</p>
                        </div>
                      </>
                    )}

                    {/* Biografía extendida */}
                    {m.bioExtendida && (
                      <>
                        {!m.bioCorta && <Separator />}
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                            Biografía
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{m.bioExtendida}</p>
                        </div>
                      </>
                    )}

                    {/* Trayectoria */}
                    {m.trayectoria && (m.trayectoria as any[]).length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            Trayectoria en JMV
                          </p>
                          <ul className="space-y-1.5">
                            {(m.trayectoria as any[]).map((item: any, idx: number) => (
                              <li key={idx} className="flex gap-2 text-sm">
                                <span className="font-bold text-foreground shrink-0 min-w-[3rem]">
                                  {item.anio}
                                </span>
                                <div className="min-w-0">
                                  <span className="font-medium">{item.rol}</span>
                                  {item.lugar && (
                                    <span className="text-muted-foreground"> · {item.lugar}</span>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
