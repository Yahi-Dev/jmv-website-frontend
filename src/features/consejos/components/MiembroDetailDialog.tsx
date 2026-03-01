// src/features/consejos/components/MiembroDetailDialog.tsx
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
  Briefcase,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react"
import { MiembroConsejo, CargoConsejo, CARGO_LABELS } from "../model/types"

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

interface MiembroDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  miembro: MiembroConsejo | null
}

export function MiembroDetailDialog({ open, onOpenChange, miembro }: MiembroDetailDialogProps) {
  if (!miembro) return null

  const photoSrc = miembro.fotoUrl || miembro.user?.image || null
  const trayectoria = (miembro.trayectoria as any[] | undefined) ?? []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col overflow-hidden p-0">
        {/* ── Photo header ──────────────────────────────────────────────── */}
        <div className="relative h-52 bg-muted shrink-0 overflow-hidden">
          {photoSrc ? (
            <img
              src={photoSrc}
              alt={miembro.nombre}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <UserRound className="w-20 h-20 text-muted-foreground/25" />
            </div>
          )}
          {/* Gradient + name overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-5 right-5">
            <p className="text-white font-bold text-xl drop-shadow leading-tight">
              {miembro.nombre}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <Badge
                variant="secondary"
                className={`text-xs border ${CARGO_COLORS[miembro.cargo]}`}
              >
                {CARGO_LABELS[miembro.cargo]}
              </Badge>
              <Badge variant="outline" className="text-xs bg-white/10 text-white border-white/30">
                {miembro.estado}
              </Badge>
            </div>
          </div>
        </div>

        {/* ── Header (hidden visually but keeps dialog a11y correct) ────── */}
        <DialogHeader className="sr-only">
          <DialogTitle>{miembro.nombre}</DialogTitle>
          <DialogDescription>{CARGO_LABELS[miembro.cargo]}</DialogDescription>
        </DialogHeader>

        {/* ── Scrollable content ────────────────────────────────────────── */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            {/* Ciudad */}
            {miembro.ciudad && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0 text-primary/70" />
                <span>{miembro.ciudad}</span>
              </div>
            )}

            {/* Contact */}
            {(miembro.email || miembro.telefono) && (
              <>
                <Separator />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Información de contacto
                  </p>
                  <div className="space-y-2">
                    {miembro.email && (
                      <div className="flex items-start gap-3 text-sm">
                        <Mail className="w-4 h-4 shrink-0 text-primary/70 mt-0.5" />
                        <span className="break-all">{miembro.email}</span>
                      </div>
                    )}
                    {miembro.telefono && (
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 shrink-0 text-primary/70" />
                        <span>{miembro.telefono}</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Biografía corta */}
            {miembro.bioCorta && (
              <>
                <Separator />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Biografía corta
                  </p>
                  <p className="text-sm leading-relaxed">{miembro.bioCorta}</p>
                </div>
              </>
            )}

            {/* Biografía extendida */}
            {miembro.bioExtendida && (
              <>
                <Separator />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Biografía
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {miembro.bioExtendida}
                  </p>
                </div>
              </>
            )}

            {/* Trayectoria */}
            {trayectoria.length > 0 && (
              <>
                <Separator />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    Trayectoria en JMV
                  </p>
                  <ul className="space-y-2.5">
                    {trayectoria.map((item: any, idx: number) => (
                      <li key={idx} className="flex gap-3 text-sm">
                        <span className="font-bold text-foreground shrink-0 min-w-12 tabular-nums">
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

            {/* Empty state */}
            {!miembro.ciudad &&
              !miembro.email &&
              !miembro.telefono &&
              !miembro.bioCorta &&
              !miembro.bioExtendida &&
              trayectoria.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay información adicional registrada para este miembro.
                </p>
              )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
