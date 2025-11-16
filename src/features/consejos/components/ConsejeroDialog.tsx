// src/features/consejos/components/ConsejeroDialog.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/src/components/ui/dialog"
import { Separator } from "@/src/components/ui/separator"
import { Badge } from "@/src/components/ui/badge"
import { MapPin, Mail, Phone, Linkedin, Calendar as CalIcon } from "lucide-react"
import { MiembroConsejo, CargoConsejo } from "../model/types"

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

interface ConsejeroDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  miembro: MiembroConsejo
}

export function ConsejeroDialog({ open, onOpenChange, miembro }: ConsejeroDialogProps) {
  const phone = maskPhone(miembro.telefono)
  const email = maskEmail(miembro.email)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {miembro.nombre}
          </DialogTitle>
          <DialogDescription className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-base">
              {CARGO_LABELS[miembro.cargo]}
            </Badge>
            {miembro.ciudad && (
              <span className="flex items-center gap-1 text-sm">
                <MapPin className="w-4 h-4" />
                {miembro.ciudad}
              </span>
            )}
            <span className="flex items-center gap-1 text-sm">
              <CalIcon className="w-4 h-4" />
              {formatPeriodo(miembro.createdDate, undefined)}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Foto del miembro */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
            <Image
              src={miembro.fotoUrl || miembro.user?.image || "/logo_dominicano.png"}
              alt={miembro.nombre}
              fill
              className="object-cover"
            />
          </div>

          {/* Información del miembro */}
          <div className="space-y-4">
            {/* Biografía */}
            <div>
              <h4 className="mb-2 font-semibold">Biografía</h4>
              <p className="text-sm text-muted-foreground">
                {miembro.bioExtendida || miembro.bioCorta || "No hay biografía disponible."}
              </p>
            </div>

            {/* Información de contacto */}
            {(phone || email) && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-semibold">Contacto</h4>
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
                </div>
              </>
            )}

            {/* Trayectoria */}
            {miembro.trayectoria && miembro.trayectoria.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-semibold">Trayectoria en JMV</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {miembro.trayectoria.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="font-medium min-w-12">{item.anio}</span>
                        <div>
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
      </DialogContent>
    </Dialog>
  )
}