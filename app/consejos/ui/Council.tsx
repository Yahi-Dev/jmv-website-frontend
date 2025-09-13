"use client"

import Image from "next/image"
import Link from "next/link"
import { JSX, useState } from "react"
import {
  Crown, Users, FileText, Shield, GraduationCap, HandHeart, Church, Megaphone,
  Network, Route, MapPin, Mail, Phone, Linkedin, UserRound, Calendar as CalIcon
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export type CargoConsejo =
  | "Presidencia" | "Vicepresidencia" | "Secretaría" | "Tesorería" | "Formación"
  | "Misión" | "Comunicación" | "Pastoral" | "Vinculación" | "Coordinación Regional" | "Vocal"

export type MiembroConsejo = {
  id: string
  nombre: string
  cargo: CargoConsejo
  ciudad?: string
  foto?: string
  estado?: "Titular" | "Suplente"
  periodo: { desde: string; hasta?: string }
  bioCorta?: string
  bioExtendida?: string
  contactoPublico?: { telefono?: string; email?: string; linkedin?: string }
  trayectoria?: { anio: number; rol: string; lugar?: string }[]
}

const ROLE_ICON: Record<CargoConsejo, JSX.Element> = {
  Presidencia: <Crown className="w-4 h-4 mr-1" />,
  Vicepresidencia: <Users className="w-4 h-4 mr-1" />,
  Secretaría: <FileText className="w-4 h-4 mr-1" />,
  Tesorería: <Shield className="w-4 h-4 mr-1" />,
  Formación: <GraduationCap className="w-4 h-4 mr-1" />,
  Misión: <HandHeart className="w-4 h-4 mr-1" />,
  Comunicación: <Megaphone className="w-4 h-4 mr-1" />,
  Pastoral: <Church className="w-4 h-4 mr-1" />,
  Vinculación: <Network className="w-4 h-4 mr-1" />,
  "Coordinación Regional": <Route className="w-4 h-4 mr-1" />,
  Vocal: <Users className="w-4 h-4 mr-1" />,
}

function cargoBadgeVariant(c: CargoConsejo) {
  const m: Record<CargoConsejo, string> = {
    Presidencia: "bg-primary/10 text-primary border-primary/20",
    Vicepresidencia: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300",
    Secretaría: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300",
    Tesorería: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
    Formación: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
    Misión: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300",
    Comunicación: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300",
    Pastoral: "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300",
    Vinculación: "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300",
    "Coordinación Regional": "bg-lime-100 text-lime-700 border-lime-200 dark:bg-lime-900/30 dark:text-lime-300",
    Vocal: "bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200",
  }
  return m[c]
}

function maskPhone(p?: string) {
  if (!p) return undefined
  const d = p.replace(/\D/g, "")
  return `••• •• •${d.slice(-4)}`
}
function maskEmail(e?: string) {
  if (!e) return undefined
  const [u, d] = e.split("@")
  const mu = u.length <= 2 ? "••" : u[0] + "•".repeat(u.length - 2) + u.slice(-1)
  return `${mu}@${d}`
}
function formatRange(p: { desde: string; hasta?: string }) {
  const d = new Date(p.desde)
  const h = p.hasta ? new Date(p.hasta) : undefined
  const f = (x: Date) => x.toLocaleDateString("es-DO", { year: "numeric", month: "short" })
  return `${f(d)} — ${h ? f(h) : "Actual"}`
}

/** ========== CARD ========== */
type CardSize = "sm" | "md" | "lg"

export function CouncilMemberCard({ m, size = "md" }: { m: MiembroConsejo; size?: CardSize }) {
  const [open, setOpen] = useState(false)
  const phone = maskPhone(m.contactoPublico?.telefono)
  const email = maskEmail(m.contactoPublico?.email)

  // escalado por tamaño
  const avatarCls = size === "lg" ? "size-16" : size === "sm" ? "size-10" : "size-12"
  const titleCls = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-xl"
  const bodyText = size === "lg" ? "text-base" : "text-sm"
  const iconSize = size === "lg" ? "w-5 h-5" : "w-4 h-4"
  const paddingHeader = size === "lg" ? "pb-3" : "pb-4"
  const cardStyle =
    size === "lg"
      ? "bg-muted/20 hover:bg-muted/30 rounded-2xl"
      : "bg-card/80 backdrop-blur-sm rounded-xl"

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className={`overflow-hidden cursor-pointer transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2 border-border/50 ${cardStyle}`}
      >
        <CardHeader className={paddingHeader}>
          <div className="flex items-center gap-4">
            <Avatar className={`${avatarCls} ring-2 ring-primary/20`}>
              <AvatarImage src={m.foto || "/logo_dominicano.png"} alt={m.nombre} />
              <AvatarFallback><UserRound className="w-5 h-5" /></AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <CardTitle className={`${titleCls} truncate`} >{m.nombre}</CardTitle>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Badge variant="secondary" className={`border ${cargoBadgeVariant(m.cargo)} ${size === "lg" ? "text-sm" : ""}`}>
                  {ROLE_ICON[m.cargo]} {m.cargo}
                </Badge>
                {m.ciudad && <Badge variant="outline"><MapPin className={`${iconSize} mr-1`} />{m.ciudad}</Badge>}
                {m.estado && <Badge variant="outline">{m.estado}</Badge>}
              </div>
            </div>
          </div>
          {m.bioCorta && <CardDescription className={`mt-3 line-clamp-2 ${size === "lg" ? "text-base" : ""}`}>{m.bioCorta}</CardDescription>}
        </CardHeader>

        <CardContent className="pt-0 space-y-3">
          <div className={`flex items-center gap-2 ${bodyText} text-muted-foreground`}>
            <CalIcon className={`${iconSize} text-secondary`} />
            <span>{formatRange(m.periodo)}</span>
          </div>
          {(phone || email) ? (
            <div className={`flex flex-wrap gap-3 ${bodyText} text-muted-foreground`}>
              {phone && <span className="inline-flex items-center gap-1.5"><Phone className={iconSize} />{phone}</span>}
              {email && <span className="inline-flex items-center gap-1.5"><Mail className={iconSize} />{email}</span>}
            </div>
          ) : (
            <div className={`${bodyText} text-muted-foreground`}>Contacto disponible para miembros.</div>
          )}
        </CardContent>
      </Card>

      {/* Dialog detalle */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl overflow-hidden"> {/* <- más ancho */}
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {ROLE_ICON[m.cargo]} {m.cargo} — {m.nombre}
            </DialogTitle>
            <DialogDescription>
              {m.ciudad ? ` ${m.ciudad} · ` : ""}{formatRange(m.periodo)}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src={m.foto || "/logo_dominicano.png"} alt={m.nombre} fill className="object-contain bg-muted" />
            </div>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{m.bioExtendida || m.bioCorta || "—"}</p>
              {(m.contactoPublico?.telefono || m.contactoPublico?.email || m.contactoPublico?.linkedin) && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="font-medium">Contacto público</div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      {m.contactoPublico?.telefono && <span className="inline-flex items-center gap-1.5"><Phone className="w-4 h-4" />{maskPhone(m.contactoPublico.telefono)}</span>}
                      {m.contactoPublico?.email && <span className="inline-flex items-center gap-1.5"><Mail className="w-4 h-4" />{maskEmail(m.contactoPublico.email)}</span>}
                      {m.contactoPublico?.linkedin && <Link href={m.contactoPublico.linkedin} target="_blank" className="inline-flex items-center gap-1.5 hover:text-primary"><Linkedin className="w-4 h-4" />Perfil</Link>}
                    </div>
                  </div>
                </>
              )}
              {m.trayectoria?.length ? (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="font-medium">Trayectoria</div>
                    <ul className="pl-5 space-y-1 text-sm list-disc text-muted-foreground">
                      {m.trayectoria.map((t, i) => (<li key={i}>{t.anio} — {t.rol}{t.lugar ? ` · ${t.lugar}` : ""}</li>))}
                    </ul>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

/** ========== GRID ========== */
export function CouncilGrid({
  miembros,
  size = "md",
  insideDialog = false,
}: {
  miembros: MiembroConsejo[]
  size?: CardSize
  insideDialog?: boolean
}) {
  // En el modal: 1 col en mobile, 2 en md+, con gaps mayores
  const gridCls = insideDialog
    ? "grid gap-6 sm:grid-cols-1 md:grid-cols-2"
    : "grid gap-6 md:grid-cols-2 lg:grid-cols-3"

  return (
    <div className={gridCls}>
      {miembros.map(m => <CouncilMemberCard key={m.id} m={m} size={size} />)}
    </div>
  )
}
