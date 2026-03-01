// src/features/consejos/components/ConsejoDetailDialog.tsx
"use client"

import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog"
import { Badge } from "@/src/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Separator } from "@/src/components/ui/separator"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Calendar, Crown, MapPin, UserRound, Users } from "lucide-react"
import { ConsejoNacional, CargoConsejo, CARGO_LABELS } from "../model/types"

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

interface ConsejoDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  consejo: ConsejoNacional | null
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("es-DO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function ConsejoDetailDialog({ open, onOpenChange, consejo }: ConsejoDetailDialogProps) {
  if (!consejo) return null

  const coordinador = consejo.miembros.find(
    (m) => m.cargo === CargoConsejo.CoordinadorNacional
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col overflow-hidden p-0">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b bg-gradient-to-r from-primary/5 to-secondary/5">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-2xl font-bold">{consejo.periodo}</DialogTitle>
                {consejo.lema && (
                  <DialogDescription className="mt-1 text-base italic text-foreground/70">
                    &ldquo;{consejo.lema}&rdquo;
                  </DialogDescription>
                )}
              </div>
              {consejo.isActual && (
                <Badge className="shrink-0 bg-green-100 text-green-700 border border-green-200 hover:bg-green-100">
                  Consejo Actual
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary/70" />
                {formatDate(consejo.fechaInicio)}
                {consejo.fechaFin ? ` — ${formatDate(consejo.fechaFin)}` : " — Actual"}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary/70" />
                {consejo.miembros.length} miembro{consejo.miembros.length !== 1 ? "s" : ""}
              </span>
              {coordinador && (
                <span className="flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-500" />
                  {coordinador.nombre}
                </span>
              )}
            </div>
          </DialogHeader>
        </div>

        {/* Scrollable content */}
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-6">
            {/* Foto del consejo */}
            {consejo.fotoUrl && (
              <div className="relative w-full h-52 rounded-xl overflow-hidden border">
                <Image
                  src={consejo.fotoUrl}
                  alt={`Consejo ${consejo.periodo}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white font-semibold text-lg drop-shadow">
                  {consejo.periodo}
                </div>
              </div>
            )}

            {/* Miembros */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Miembros del Consejo
              </h3>

              {consejo.miembros.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {consejo.miembros.map((miembro) => (
                    <div
                      key={miembro.id}
                      className="flex items-start gap-3 p-3 border rounded-lg bg-card hover:bg-card/80 transition-colors"
                    >
                      <Avatar className="size-10 shrink-0 ring-2 ring-primary/10">
                        <AvatarImage
                          src={miembro.fotoUrl || "/logo_dominicano.png"}
                          alt={miembro.nombre}
                        />
                        <AvatarFallback>
                          <UserRound className="w-4 h-4 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate leading-tight">
                          {miembro.nombre}
                        </p>
                        <Badge
                          variant="secondary"
                          className={`text-xs border mt-1 ${CARGO_COLORS[miembro.cargo]}`}
                        >
                          {CARGO_LABELS[miembro.cargo]}
                        </Badge>
                        {miembro.ciudad && (
                          <p className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span className="truncate">{miembro.ciudad}</span>
                          </p>
                        )}
                        {miembro.estado && (
                          <Badge
                            variant="outline"
                            className="text-xs mt-1"
                          >
                            {miembro.estado}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center border-2 border-dashed rounded-lg border-muted-foreground/20">
                  <Users className="w-8 h-8 mx-auto mb-2 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">
                    No hay miembros registrados en este consejo.
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
