"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { Landmark, Users, Waypoints, Calendar, MapPin, Tag, ArrowRight, Building2, ShieldCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/src/components/ui/dialog"
import Navbar from "@/src/components/Navbar"
import { CouncilGrid, MiembroConsejo } from "../../consejos/ui/Council"

// ---------- Tipos básicos ----------
type CentroEstado = "Activo" | "Inactivo" | "En formación" | "Suspendido"
type Etiqueta = "Juvenil" | "Universitario" | "Parroquial" | "Escolar" | "Rural" | "Urbano" | "Misión"

type Comunidad = {
  id: string
  nombre: string
  imagen?: string
  ciudad: string
  miembros: number
  desde: number
  etiquetas: Etiqueta[]
  ultimaActividad?: { fecha: string; titulo: string }
  consejo: MiembroConsejo[]
}

type CentroDetalle = {
  id: string
  nombre: string
  imagen?: string
  ciudad: string
  lat?: number
  lng?: number
  comunidades: number
  miembros: number
  desde: number
  etiquetas: Etiqueta[]
  estado: CentroEstado
  ultimaActividad?: { fecha: string; titulo: string }
  consejoCentro: MiembroConsejo[]
  comunidadesDetalle: Comunidad[]
}

// ---------- Demo (reemplaza por fetch) ----------
const demoCentro: CentroDetalle = {
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
  estado: "Activo",
  ultimaActividad: { fecha: "2025-07-12", titulo: "Misión urbana" },
  consejoCentro: [
    { id: "c1", nombre: "Dulce Ramírez", cargo: "Presidencia", ciudad: "Santo Domingo", periodo: { desde: "2024-07-01" }, foto: "/logo_dominicano.png", bioCorta: "Coordina el centro." },
    { id: "c2", nombre: "Pedro Díaz", cargo: "Secretaría", ciudad: "Santo Domingo", periodo: { desde: "2024-07-01" }, foto: "/logo_dominicano.png" },
    { id: "c3", nombre: "Sor Ana", cargo: "Pastoral", ciudad: "Santo Domingo", periodo: { desde: "2024-07-01" }, foto: "/logo_dominicano.png" },
  ],
  comunidadesDetalle: [
    {
      id: "com-1",
      nombre: "Comunidad Juvenil A",
      imagen: "/logo_dominicano.png",
      ciudad: "Santo Domingo",
      miembros: 45,
      desde: 2015,
      etiquetas: ["Juvenil", "Parroquial"],
      ultimaActividad: { fecha: "2025-08-01", titulo: "Vigilia juvenil" },
      consejo: [
        { id: "m1", nombre: "María López", cargo: "Presidencia", periodo: { desde: "2025-03-01" }, ciudad: "Santo Domingo", foto: "/logo_dominicano.png" },
        { id: "m2", nombre: "Juan Pérez", cargo: "Secretaría", periodo: { desde: "2025-03-01" }, ciudad: "Santo Domingo", foto: "/logo_dominicano.png" },
      ],
    },
    {
      id: "com-2",
      nombre: "Comunidad Universitaria B",
      imagen: "/logo_dominicano.png",
      ciudad: "Santo Domingo",
      miembros: 60,
      desde: 2018,
      etiquetas: ["Universitario", "Urbano"],
      ultimaActividad: { fecha: "2025-07-20", titulo: "Encuentro universitario" },
      consejo: [
        { id: "m3", nombre: "Carlos Gómez", cargo: "Presidencia", periodo: { desde: "2025-02-01" }, ciudad: "Santo Domingo", foto: "/logo_dominicano.png" },
        { id: "m4", nombre: "Luisa Gil", cargo: "Formación", periodo: { desde: "2025-02-01" }, ciudad: "Santo Domingo", foto: "/logo_dominicano.png" },
      ],
    },
  ],
}

// ---------- Helpers ----------
function statusVariant(estado: CentroEstado): string {
  switch (estado) {
    case "Activo": return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300"
    case "En formación": return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300"
    case "Suspendido": return "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300"
    default: return "bg-slate-200 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-200"
  }
}
function formatDate(iso?: string) {
  if (!iso) return "—"
  try { return new Date(iso).toLocaleDateString("es-DO", { day: "2-digit", month: "short", year: "numeric" }) } catch { return "—" }
}
function etiquetaVariant(tag: Etiqueta) {
  const map: Record<Etiqueta, string> = {
    Juvenil: "bg-primary/10 text-primary border-primary/20",
    Universitario: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300",
    Parroquial: "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300",
    Escolar: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300",
    Rural: "bg-lime-100 text-lime-700 border-lime-200 dark:bg-lime-900/30 dark:text-lime-300",
    Urbano: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
    Misión: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300",
  }
  return map[tag]
}

// ---------- Comunidad Card + Dialog ----------
function ComunidadCard({ com }: { com: Comunidad }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Card onClick={() => setOpen(true)} className="overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="relative overflow-hidden aspect-[16/9]">
          <Image src={com.imagen || "/logo_dominicano.png"} alt={com.nombre} fill className="object-contain bg-muted" />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl transition-colors duration-200 group-hover:text-primary">{com.nombre}</CardTitle>
          <CardDescription className="flex items-center gap-2"><MapPin className="w-4 h-4 text-secondary" />{com.ciudad}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-3 mb-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" />{com.miembros}</div>
            <div className="flex items-center gap-2"><Landmark className="w-4 h-4" />Desde {com.desde}</div>
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{formatDate(com.ultimaActividad?.fecha)}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {com.etiquetas.map(e => (
              <Badge key={e} variant="secondary" className={`border ${etiquetaVariant(e)}`}>
                <Tag className="w-3.5 h-3.5 mr-1.5" />{e}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{com.nombre}</DialogTitle>
            <DialogDescription>{com.ciudad} · Desde {com.desde}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src={com.imagen || "/logo_dominicano.png"} alt={com.nombre} fill className="object-contain bg-muted" />
            </div>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <div className="mb-2 font-medium">Última actividad</div>
                <div>{formatDate(com.ultimaActividad?.fecha)} — {com.ultimaActividad?.titulo || "—"}</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium">Etiquetas</div>
                <div className="flex flex-wrap gap-2">
                  {com.etiquetas.map(e => (
                    <Badge key={e} variant="secondary" className={`border ${etiquetaVariant(e)}`}><Tag className="w-3.5 h-3.5 mr-1.5" />{e}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <h4 className="mb-3 text-lg font-semibold">Consejo de la comunidad</h4>
            <CouncilGrid miembros={com.consejo} size="lg" insideDialog />  {/* <- grande y 2 columnas */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// ---------- Página Detalle de Centro ----------
export default function CentroPage() {
  const c = demoCentro
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <Navbar />

      {/* Header del centro */}
      <section className="px-10 pt-12">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow">
              <Image src={c.imagen || "/logo_dominicano.png"} alt={c.nombre} fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary" className={`border ${statusVariant(c.estado)}`}>
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> {c.estado}
                </Badge>
                <Badge variant="outline"><Building2 className="w-3.5 h-3.5 mr-1.5" />Desde {c.desde}</Badge>
                <Badge variant="outline"><Users className="w-3.5 h-3.5 mr-1.5" />{c.miembros} miembros</Badge>
                <Badge variant="outline"><Waypoints className="w-3.5 h-3.5 mr-1.5" />{c.comunidades} comunidades</Badge>
              </div>

              <h1 className="text-3xl font-bold tracking-tight">{c.nombre}</h1>
              <p className="flex items-center gap-2 mt-1 text-muted-foreground">
                <MapPin className="w-4 h-4" /> {c.ciudad}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {c.etiquetas.map(e => (
                  <Badge key={e} variant="secondary" className={`border ${etiquetaVariant(e)}`}>
                    <Tag className="w-3.5 h-3.5 mr-1.5" /> {e}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Última actividad: </span>
                {formatDate(c.ultimaActividad?.fecha)} — {c.ultimaActividad?.titulo || "—"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: Info | Consejo del Centro | Comunidades */}
      <section className="px-10 py-10">
        <div className="container">
          <Tabs defaultValue="consejo">
            <TabsList className="grid w-full max-w-xl grid-cols-3">
              <TabsTrigger value="info">Información</TabsTrigger>
              <TabsTrigger value="consejo">Consejo del Centro</TabsTrigger>
              <TabsTrigger value="comunidades">Comunidades</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Sobre el centro</CardTitle>
                  <CardDescription>Resumen general y enlaces útiles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div>Ubicación: {c.ciudad}</div>
                  <div>Fundado: {c.desde}</div>
                  <div>Miembros: {c.miembros}</div>
                  <div>Comunidades: {c.comunidades}</div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="consejo" className="mt-8">
              <CouncilGrid miembros={c.consejoCentro} />
            </TabsContent>

            <TabsContent value="comunidades" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {c.comunidadesDetalle.map(com => <ComunidadCard key={com.id} com={com} />)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
