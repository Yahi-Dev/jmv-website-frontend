// src/features/consejos/components/ConsejoCard.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { MapPin, Mail, Phone, Calendar as CalIcon, UserRound } from "lucide-react"
import { MiembroConsejo, CargoConsejo, EstadoMiembro } from "../model/types"
import { ConsejeroDialog } from "./ConsejeroDialog"

// Mapeo de íconos para los nuevos cargos
const ROLE_ICON: Record<CargoConsejo, string> = {
  [CargoConsejo.CoordinadorNacional]: "👑",
  [CargoConsejo.SecretarioNacional]: "📝",
  [CargoConsejo.TesoreroNacional]: "💰",
  [CargoConsejo.VocalDeFormacion]: "📚",
  [CargoConsejo.VocalDeMisionYCaridad]: "❤️",
  [CargoConsejo.VocalLiturgiaYMariana]: "🙏",
  [CargoConsejo.VocalDeExpansion]: "🌍",
  [CargoConsejo.VocalDePrejuveniles]: "👦",
  [CargoConsejo.VocalDeCulturaYRecreacion]: "🎭"
}

// Mapeo de nombres legibles para los nuevos cargos
const CARGO_LABELS: Record<CargoConsejo, string> = {
  [CargoConsejo.CoordinadorNacional]: "Coordinador/a Nacional",
  [CargoConsejo.SecretarioNacional]: "Secretario/a Nacional",
  [CargoConsejo.TesoreroNacional]: "Tesorero/a Nacional",
  [CargoConsejo.VocalDeFormacion]: "Vocal de Formación",
  [CargoConsejo.VocalDeMisionYCaridad]: "Vocal de Misión y Caridad",
  [CargoConsejo.VocalLiturgiaYMariana]: "Vocal de Liturgia y Mariana",
  [CargoConsejo.VocalDeExpansion]: "Vocal de Expansión",
  [CargoConsejo.VocalDePrejuveniles]: "Vocal de Pre-juveniles",
  [CargoConsejo.VocalDeCulturaYRecreacion]: "Vocal de Cultura y Recreación"
}

// Colores para los badges de cargo
function cargoBadgeVariant(cargo: CargoConsejo): string {
  const variants: Record<CargoConsejo, string> = {
    [CargoConsejo.CoordinadorNacional]: "bg-primary/10 text-primary border-primary/20",
    [CargoConsejo.SecretarioNacional]: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300",
    [CargoConsejo.TesoreroNacional]: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
    [CargoConsejo.VocalDeFormacion]: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
    [CargoConsejo.VocalDeMisionYCaridad]: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300",
    [CargoConsejo.VocalLiturgiaYMariana]: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300",
    [CargoConsejo.VocalDeExpansion]: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300",
    [CargoConsejo.VocalDePrejuveniles]: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300",
    [CargoConsejo.VocalDeCulturaYRecreacion]: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-300"
  }
  return variants[cargo]
}

// Función para enmascarar información de contacto
function maskPhone(phone?: string): string | undefined {
  if (!phone) return undefined
  const digits = phone.replace(/\D/g, "")
  const tail = digits.slice(-4)
  return `••• •• •${tail}`
}

function maskEmail(email?: string): string | undefined {
  if (!email) return undefined
  const [u, d] = email.split("@")
  const mu = u.length <= 2 ? "••" : u[0] + "•".repeat(Math.max(1, u.length - 2)) + u.slice(-1)
  return `${mu}@${d}`
}

// Formatear rango de fechas
function formatPeriodo(fechaInicio: Date, fechaFin?: Date): string {
  const inicio = new Date(fechaInicio)
  const fin = fechaFin ? new Date(fechaFin) : undefined
  
  const formatter = new Intl.DateTimeFormat("es-DO", { 
    year: "numeric", 
    month: "short" 
  })
  
  return `${formatter.format(inicio)} — ${fin ? formatter.format(fin) : "Actual"}`
}

interface ConsejoCardProps {
  miembro: MiembroConsejo
}

export function ConsejoCard({ miembro }: ConsejoCardProps) {
  const [open, setOpen] = useState(false)
  const phone = maskPhone(miembro.telefono)
  const email = maskEmail(miembro.email)

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/50"
      >
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <Avatar className="size-12 ring-2 ring-primary/20">
              <AvatarImage 
                src={miembro.fotoUrl || miembro.user?.image || "/logo_dominicano.png"} 
                alt={miembro.nombre} 
              />
              <AvatarFallback>
                <UserRound className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <CardTitle className="text-xl truncate">{miembro.nombre}</CardTitle>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Badge variant="secondary" className={`border ${cargoBadgeVariant(miembro.cargo)}`}>
                  <span className="mr-1">{ROLE_ICON[miembro.cargo]}</span>
                  {CARGO_LABELS[miembro.cargo]}
                </Badge>
                {miembro.ciudad && (
                  <Badge variant="outline">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    {miembro.ciudad}
                  </Badge>
                )}
                {miembro.estado && (
                  <Badge variant="outline">
                    {miembro.estado}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {miembro.bioCorta && (
            <CardDescription className="mt-3 line-clamp-2">
              {miembro.bioCorta}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalIcon className="w-4 h-4 text-secondary" />
            <span>
              {formatPeriodo(miembro.createdDate, undefined)}
            </span>
          </div>

          {(phone || email) ? (
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              {phone && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  {phone}
                </span>
              )}
              {email && (
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {email}
                </span>
              )}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Contacto disponible para miembros.
            </div>
          )}
        </CardContent>
      </Card>

      <ConsejeroDialog 
        open={open} 
        onOpenChange={setOpen} 
        miembro={miembro} 
      />
    </>
  )
}