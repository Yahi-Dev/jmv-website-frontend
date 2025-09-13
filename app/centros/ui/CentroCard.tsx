"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"
import {
  MapPin,
  Users,
  Calendar,
  Tag,
  Phone,
  Mail,
  Waypoints,
  ShieldCheck,
  Landmark,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// --------- Tipos ----------
type CentroEstado = "Activo" | "Inactivo" | "En formación" | "Suspendido"

type EtiquetaCentro = "Juvenil" | "Universitario" | "Parroquial" | "Escolar" | "Rural" | "Urbano" | "Misión"

type UltimaActividad = {
  fecha: string // ISO
  titulo: string
}

export type CentroJMV = {
  id: string
  nombre: string
  imagen?: string
  ciudad: string
  lat?: number
  lng?: number
  comunidades: number
  miembros: number
  desde: number
  etiquetas: EtiquetaCentro[]
  coordinador: { nombre: string }
  contactoPublico?: { telefono?: string; email?: string } // opcional y con máscara
  estado: CentroEstado
  ultimaActividad?: UltimaActividad
}

// --------- Datos demo (cámbialos por tu API) ----------
const centrosDemo: CentroJMV[] = [
  {
    id: "sdo-1",
    nombre: "Parroquia La Milagrosa",
    imagen: "/parroquia_la_milagrosa.jpg",
    ciudad: "Santo Domingo",
    lat: 18.4861,
    lng: -69.9312,
    comunidades: 7,
    miembros: 320,
    desde: 1990,
    etiquetas: ["Juvenil", "Universitario", "Urbano"],
    coordinador: { nombre: "Dulce Ramirez" },
    contactoPublico: { telefono: "+1 (809) 555-0101", email: "contacto@jmv-sd.org" },
    estado: "Activo",
    ultimaActividad: { fecha: "2025-07-12", titulo: "Misión urbana" },
  },
  {
    id: "sgo-1",
    nombre: "Centro Santiago",
    imagen: "/centers/santiago.jpg",
    ciudad: "Santiago",
    comunidades: 5,
    miembros: 96,
    desde: 2010,
    etiquetas: ["Parroquial", "Juvenil"],
    coordinador: { nombre: "Carlos Martínez" },
    estado: "En formación",
    ultimaActividad: { fecha: "2025-06-28", titulo: "Retiro juvenil" },
  },
  {
    id: "mp-1",
    nombre: "Centro Monte Plata",
    imagen: "/centers/monte-plata.jpg",
    ciudad: "Monte Plata",
    lat: 18.8070,
    lng: -69.7830,
    comunidades: 3,
    miembros: 58,
    desde: 2016,
    etiquetas: ["Rural", "Parroquial", "Misión"],
    coordinador: { nombre: "Ana Rodríguez" },
    contactoPublico: { telefono: "+1 (829) 555-2211" },
    estado: "Activo",
    ultimaActividad: { fecha: "2025-08-05", titulo: "Jornada solidaria" },
  },
  {
    id: "lv-1",
    nombre: "Centro La Vega",
    imagen: "/centers/la-vega.jpg",
    ciudad: "La Vega",
    comunidades: 2,
    miembros: 31,
    desde: 2019,
    etiquetas: ["Escolar", "Juvenil"],
    coordinador: { nombre: "Elena Pérez" },
    estado: "Suspendido",
    ultimaActividad: { fecha: "2025-02-10", titulo: "Capacitación básica" },
  },
]

// --------- Helpers UI ----------
function statusVariant(estado: CentroEstado): { className: string } {
  switch (estado) {
    case "Activo":
      return { className: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300" }
    case "En formación":
      return { className: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300" }
    case "Suspendido":
      return { className: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300" }
    case "Inactivo":
    default:
      return { className: "bg-slate-200 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-200" }
  }
}

function etiquetaVariant(tag: EtiquetaCentro) {
  const map: Record<EtiquetaCentro, string> = {
    Juvenil: "bg-primary/10 text-primary border-primary/20",
    Universitario: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300",
    Parroquial: "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300",
    Escolar: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300",
    Rural: "bg-lime-100 text-lime-700 border-lime-200 dark:bg-lime-900/30 dark:text-lime-300",
    Urbano: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
    Misión: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300",
  }
  return map[tag] ?? "bg-muted text-foreground border-border/50"
}

function maskPhone(phone?: string) {
  if (!phone) return undefined
  // Mantiene últimos 4 dígitos
  const digits = phone.replace(/\D/g, "")
  const last4 = digits.slice(-4)
  return `••• •• •${last4}`
}

function maskEmail(email?: string) {
  if (!email) return undefined
  const [u, d] = email.split("@")
  const maskedUser = u.length <= 2 ? "••" : u[0] + "•".repeat(Math.max(1, u.length - 2)) + u.slice(-1)
  return `${maskedUser}@${d}`
}

function formatDate(iso?: string) {
  if (!iso) return "—"
  try {
    return new Date(iso).toLocaleDateString("es-DO", { day: "2-digit", month: "short", year: "numeric" })
  } catch {
    return "—"
  }
}

function mapsHref(c: Pick<CentroJMV, "lat" | "lng" | "ciudad" | "nombre">) {
  if (typeof c.lat === "number" && typeof c.lng === "number") {
    return `https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}`
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.nombre} ${c.ciudad} República Dominicana`)}`
}

// --------- Card de Centro ----------
function CentroCard({ centro }: { centro: CentroJMV }) {
  const statusCls = useMemo(() => statusVariant(centro.estado).className, [centro.estado])

  const phoneMasked = maskPhone(centro.contactoPublico?.telefono)
  const emailMasked = maskEmail(centro.contactoPublico?.email)

  return (
    <Card className="overflow-hidden transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/50">
      <div className="relative overflow-hidden aspect-[16/9]">
        <Image
          src={centro.imagen || "/placeholder.svg?height=240&width=400&text=Centro"}
          alt={centro.nombre}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className={`border ${statusCls}`}>
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
            {centro.estado}
          </Badge>
        </div>
        <div className="absolute flex gap-2 top-4 right-4">
          <Badge variant="secondary" className="bg-background/90 text-foreground border-border/40">
            <Landmark className="w-3.5 h-3.5 mr-1.5" />
            Desde {centro.desde}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl transition-colors duration-200 group-hover:text-primary">
          {centro.nombre}
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-secondary" />
          {centro.ciudad}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Métricas */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>{centro.miembros} miembros</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Waypoints className="w-4 h-4 text-accent" />
            <span>{centro.comunidades} comunidades</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-secondary" />
            <span>{formatDate(centro.ultimaActividad?.fecha)}</span>
          </div>
        </div>

        {/* Última actividad */}
        <div className="mb-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Última actividad: </span>
          {centro.ultimaActividad?.titulo ?? "—"}
        </div>

        {/* Etiquetas */}
        <div className="flex flex-wrap gap-2 mb-5">
          {centro.etiquetas.map((e) => (
            <Badge
              key={e}
              variant="secondary"
              className={`border ${etiquetaVariant(e as EtiquetaCentro)}`}
            >
              <Tag className="w-3.5 h-3.5 mr-1.5" />
              {e}
            </Badge>
          ))}
        </div>

        {/* Coordinación + Contacto */}
        <div className="flex flex-col gap-2 mb-5 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">Coordinación:</span> {centro.coordinador.nombre}
          </div>

          {(phoneMasked || emailMasked) ? (
            <div className="flex items-center gap-3 text-muted-foreground">
              {phoneMasked && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  {centro.contactoPublico?.telefono}
                </span>
              )}
              {emailMasked && (
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {centro.contactoPublico?.email}
                </span>
              )}
            </div>
          ) : (
            <div className="text-muted-foreground">Contacto disponible para miembros.</div>
          )}
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-between gap-3">
          <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
            <Link href={`/centros/${centro.id}`}>Ver detalles</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="bg-transparent border-primary/20 hover:bg-primary/5"
          >
            <a href={mapsHref(centro)} target="_blank" rel="noreferrer">
              <MapPin className="w-4 h-4 mr-2" />
              Ver en mapa
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// --------- Grid de Centros (export por defecto) ----------
export default function CentrosGrid({
  centros = centrosDemo,
  title = "Centros JMV en República Dominicana",
}: {
  centros?: CentroJMV[]
  title?: string
}) {
  return (
    <section className="px-10 py-20 bg-gradient-to-br from-background via-card/30 to-background">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 mb-6 border rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <Landmark className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Red de capítulos JMV</span>
          </div>
          <h2 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text">
              {title}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-lg text-muted-foreground">
            Encuentra información clave de cada centro: comunidades, miembros, estado y últimas actividades.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {centros.map((c) => (
            <CentroCard key={c.id} centro={c} />
          ))}
        </div>
      </div>
    </section>
  )
}
