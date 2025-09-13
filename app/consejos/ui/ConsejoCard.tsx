"use client"

import Image from "next/image"
import Link from "next/link"
import { JSX, useMemo, useState } from "react"
import {
  Shield,
  Crown,
  Users,
  Calendar as CalIcon,
  Linkedin,
  Mail,
  Phone,
  UserRound,
  Search,
  Filter,
  Church,
  GraduationCap,
  Megaphone,
  HandHeart,
  MapPin,
  FileText,
  Network,
  Route,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

// ---------- Tipos ----------
type Cargo =
  | "Presidencia"
  | "Vicepresidencia"
  | "Secretaría"
  | "Tesorería"
  | "Formación"
  | "Misión"
  | "Comunicación"
  | "Pastoral"               // Asesor/a espiritual (P. Vicentino / Hija de la Caridad)
  | "Vinculación"            // Relaciones institucionales
  | "Coordinación Regional"  // Apoyo a capítulos/zonas
  | "Vocal"

type Consejero = {
  id: string
  nombre: string
  cargo: Cargo
  foto?: string
  periodo: { desde: string; hasta?: string } // ISO
  ciudad?: string
  contactoPublico?: { telefono?: string; email?: string; linkedin?: string }
  bioCorta?: string
  bioExtendida?: string
  estado?: "Titular" | "Suplente"
  trayectoria?: { anio: number; rol: string; lugar?: string }[]
}

type ConsejoHistorico = {
  periodo: string         // "2023-2025"
  sede?: string           // Ciudad/Región sede nacional
  lema?: string
  actaUrl?: string        // link a PDF/acta
  foto?: string
  presidentes?: string[]
  miembros: Consejero[]
}

// ---------- Demo data (reemplaza por tu API) ----------
const consejoActual: Consejero[] = [
  {
    id: "1",
    nombre: "María González",
    cargo: "Presidencia",
    foto: "/logo_dominicano.png",
    periodo: { desde: "2024-07-01" },
    ciudad: "Santo Domingo",
    contactoPublico: { email: "maria.gonzalez@jmvrd.org", telefono: "+1 (809) 555-1010", linkedin: "https://linkedin.com/in/mariag" },
    bioCorta: "Servicio y misión urbana.",
    bioExtendida:
      "Coordina el plan nacional, acompaña regiones y representa a JMV RD ante la Familia Vicenciana.",
    estado: "Titular",
    trayectoria: [
      { anio: 2021, rol: "Coordinadora de capítulo", lugar: "Santo Domingo" },
      { anio: 2023, rol: "Vicepresidencia Nacional" },
    ],
  },
  {
    id: "2",
    nombre: "Carlos Martínez",
    cargo: "Vicepresidencia",
    foto: "/logo_dominicano.png",
    periodo: { desde: "2024-07-01" },
    ciudad: "Santiago",
    contactoPublico: { telefono: "+1 (829) 555-1212" },
    bioCorta: "Acompaña capítulos parroquiales.",
    estado: "Titular",
  },
  {
    id: "3",
    nombre: "Ana Rodríguez",
    cargo: "Secretaría",
    foto: "/logo_dominicano.png",
    periodo: { desde: "2024-07-01" },
    ciudad: "La Vega",
    contactoPublico: { email: "ana.rodriguez@jmvrd.org" },
    bioCorta: "Documentación y procesos.",
    estado: "Titular",
  },
  {
    id: "4",
    nombre: "José Pérez",
    cargo: "Tesorería",
    foto: "/logo_dominicano.png",
    periodo: { desde: "2024-07-01" },
    ciudad: "San Cristóbal",
    bioCorta: "Transparencia y recursos.",
    estado: "Titular",
  },
  {
    id: "5",
    nombre: "Lucía Peña",
    cargo: "Formación",
    foto: "/logo_dominicano.png",
    periodo: { desde: "2024-07-01" },
    ciudad: "Monte Plata",
    bioCorta: "Programa nacional de formación.",
    estado: "Titular",
  },
  {
    id: "6",
    nombre: "Miguel Taveras",
    cargo: "Misión",
    foto: "/logo_dominicano.png",
    periodo: { desde: "2024-07-01" },
    ciudad: "Santo Domingo",
    bioCorta: "Misiones rurales.",
    estado: "Titular",
  },
  {
    id: "7",
    nombre: "P. Juan Ramírez, C.M.",
    cargo: "Pastoral",
    foto: "/logo_dominicano.png",
    periodo: { desde: "2024-07-01" },
    ciudad: "Santo Domingo",
    bioCorta: "Asesor espiritual (Congregación de la Misión).",
    estado: "Titular",
  },
  {
    id: "8",
    nombre: "Sor Marta López, H.C.",
    cargo: "Pastoral",
    foto: "/logo_dominicano.png",
    periodo: { desde: "2024-07-01" },
    ciudad: "Santiago",
    bioCorta: "Acompañamiento carismático (Hijas de la Caridad).",
    estado: "Suplente",
  },
  {
    id: "9",
    nombre: "Elena Peña",
    cargo: "Comunicación",
    foto: "/logo_dominicano.png",
    periodo: { desde: "2024-07-01" },
    ciudad: "La Vega",
    bioCorta: "Comunicación y redes.",
    estado: "Titular",
  },
  {
    id: "10",
    nombre: "Luis García",
    cargo: "Vinculación",
    foto: "/logo_dominicano.png",
    periodo: { desde: "2024-07-01" },
    ciudad: "Santo Domingo",
    bioCorta: "Relaciones institucionales y FV.",
    estado: "Titular",
  },
  {
    id: "11",
    nombre: "Diana Torres",
    cargo: "Coordinación Regional",
    foto: "/logo_dominicano.png",
    periodo: { desde: "2024-07-01" },
    ciudad: "San Cristóbal",
    bioCorta: "Acompaña zonas Sur y Este.",
    estado: "Titular",
  },
]

const consejosHistoricos: ConsejoHistorico[] = [
  {
    periodo: "2022-2024",
    sede: "Santo Domingo",
    lema: "Con María, servimos con alegría",
    actaUrl: "#",
    foto: "/logo_dominicano.png",
    presidentes: ["Elena Cruz"],
    miembros: [
      { id: "h1", nombre: "Elena Cruz", cargo: "Presidencia", periodo: { desde: "2022-07-01", hasta: "2024-06-30" }, ciudad: "Santo Domingo", estado: "Titular", foto: "/logo_dominicano.png" },
      { id: "h2", nombre: "Rafael Díaz", cargo: "Secretaría", periodo: { desde: "2022-07-01", hasta: "2024-06-30" }, ciudad: "Santiago", estado: "Titular", foto: "/logo_dominicano.png" },
      { id: "h3", nombre: "Sor Teresa", cargo: "Pastoral", periodo: { desde: "2022-07-01", hasta: "2024-06-30" }, ciudad: "La Vega", estado: "Titular", foto: "/logo_dominicano.png" },
    ],
  },
  {
    periodo: "2020-2022",
    sede: "La Vega",
    lema: "Jóvenes discípulos, misioneros de la caridad",
    actaUrl: "#",
    foto: "/logo_dominicano.png",
    presidentes: ["Patricia Mora"],
    miembros: [
      { id: "h4", nombre: "Patricia Mora", cargo: "Presidencia", periodo: { desde: "2020-07-01", hasta: "2022-06-30" }, ciudad: "La Vega", estado: "Titular", foto: "/logo_dominicano.png" },
      { id: "h5", nombre: "Miguel Núñez", cargo: "Tesorería", periodo: { desde: "2020-07-01", hasta: "2022-06-30" }, ciudad: "Santo Domingo", estado: "Titular", foto: "/logo_dominicano.png" },
    ],
  },
]

// ---------- Helpers ----------
const ROLE_ICON: Record<Cargo, JSX.Element> = {
  Presidencia: <Crown className="w-3.5 h-3.5 mr-1" />,
  Vicepresidencia: <Users className="w-3.5 h-3.5 mr-1" />,
  Secretaría: <FileText className="w-3.5 h-3.5 mr-1" />,
  Tesorería: <Shield className="w-3.5 h-3.5 mr-1" />,
  Formación: <GraduationCap className="w-3.5 h-3.5 mr-1" />,
  Misión: <HandHeart className="w-3.5 h-3.5 mr-1" />,
  Comunicación: <Megaphone className="w-3.5 h-3.5 mr-1" />,
  Pastoral: <Church className="w-3.5 h-3.5 mr-1" />,
  Vinculación: <Network className="w-3.5 h-3.5 mr-1" />,
  "Coordinación Regional": <Route className="w-3.5 h-3.5 mr-1" />,
  Vocal: <Users className="w-3.5 h-3.5 mr-1" />,
}

function maskPhone(phone?: string) {
  if (!phone) return undefined
  const digits = phone.replace(/\D/g, "")
  const tail = digits.slice(-4)
  return `••• •• •${tail}`
}
function maskEmail(email?: string) {
  if (!email) return undefined
  const [u, d] = email.split("@")
  const mu = u.length <= 2 ? "••" : u[0] + "•".repeat(Math.max(1, u.length - 2)) + u.slice(-1)
  return `${mu}@${d}`
}
function cargoBadgeVariant(cargo: Cargo) {
  const map: Record<Cargo, string> = {
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
  return map[cargo]
}
function formatRange(p: { desde: string; hasta?: string }) {
  const d = new Date(p.desde)
  const h = p.hasta ? new Date(p.hasta) : undefined
  const f = (x: Date) => x.toLocaleDateString("es-DO", { year: "numeric", month: "short" })
  return `${f(d)} — ${h ? f(h) : "Actual"}`
}

// ---------- Dialog Detalle ----------
function ConsejeroDialog({
  open,
  onOpenChange,
  m,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  m: Consejero
}) {
  const phone = maskPhone(m.contactoPublico?.telefono)
  const email = maskEmail(m.contactoPublico?.email)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {ROLE_ICON[m.cargo]}
            {m.cargo} — {m.nombre}
          </DialogTitle>
          <DialogDescription>
            {m.ciudad ? ` ${m.ciudad} · ` : ""}{formatRange(m.periodo)}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={m.foto || "/logo_dominicano.png"}
              alt={m.nombre}
              fill
              className="object-contain bg-muted"
            />
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{m.bioExtendida || m.bioCorta || "—"}</p>

            {(phone || email || m.contactoPublico?.linkedin) && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="font-medium">Contacto público</div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    {phone && <span className="inline-flex items-center gap-1.5"><Phone className="w-4 h-4" />{phone}</span>}
                    {email && <span className="inline-flex items-center gap-1.5"><Mail className="w-4 h-4" />{email}</span>}
                  </div>
                </div>
              </>
            )}

            {m.trayectoria && m.trayectoria.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="font-medium">Trayectoria</div>
                  <ul className="pl-5 space-y-1 text-sm list-disc text-muted-foreground">
                    {m.trayectoria.map((t, i) => (
                      <li key={i}>{t.anio} — {t.rol}{t.lugar ? ` · ${t.lugar}` : ""}</li>
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

// ---------- Card miembro (abre Dialog al click) ----------
function ConsejeroCard({ m }: { m: Consejero }) {
  const [open, setOpen] = useState(false)
  const phone = maskPhone(m.contactoPublico?.telefono)
  const email = maskEmail(m.contactoPublico?.email)

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/50"
      >
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <Avatar className="size-12 ring-2 ring-primary/20">
              <AvatarImage src={m.foto || "/logo_dominicano.png"} alt={m.nombre} />
              <AvatarFallback><UserRound className="w-5 h-5" /></AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <CardTitle className="text-xl truncate">{m.nombre}</CardTitle>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Badge variant="secondary" className={`border ${cargoBadgeVariant(m.cargo)}`}>
                  {ROLE_ICON[m.cargo]}
                  {m.cargo}
                </Badge>
                {m.ciudad && <Badge variant="outline"><MapPin className="w-3.5 h-3.5 mr-1" />{m.ciudad}</Badge>}
                {m.estado && <Badge variant="outline">{m.estado}</Badge>}
              </div>
            </div>
          </div>
          {m.bioCorta && <CardDescription className="mt-3 line-clamp-2">{m.bioCorta}</CardDescription>}
        </CardHeader>

        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalIcon className="w-4 h-4 text-secondary" />
            <span>{formatRange(m.periodo)}</span>
          </div>

          {(phone || email) ? (
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              {phone && <span className="inline-flex items-center gap-1.5"><Phone className="w-4 h-4" />{phone}</span>}
              {email && <span className="inline-flex items-center gap-1.5"><Mail className="w-4 h-4" />{email}</span>}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Contacto disponible para miembros.</div>
          )}
        </CardContent>
      </Card>

      <ConsejeroDialog open={open} onOpenChange={setOpen} m={m} />
    </>
  )
}

// ---------- Historial (Accordion por período) ----------
function HistorialConsejos({ data }: { data: ConsejoHistorico[] }) {
  const [q, setQ] = useState("")
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return data
    return data
      .map(periodo => ({
        ...periodo,
        miembros: periodo.miembros.filter(m =>
          [m.nombre, m.cargo, m.ciudad].filter(Boolean).join(" ").toLowerCase().includes(t)
        ),
      }))
      .filter(p => p.miembros.length > 0)
  }, [q, data])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-sm group">
          <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground group-focus-within:text-primary" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar por nombre, cargo o ciudad…" className="pl-9" />
        </div>
        <div className="items-center hidden gap-2 px-3 py-2 text-sm border rounded-lg sm:flex text-muted-foreground bg-background/60 border-border/50">
          <Filter className="w-4 h-4" />
          {data.length} períodos
        </div>
      </div>

      <Accordion type="multiple" className="w-full">
        {filtered.map(per => (
          <AccordionItem key={per.periodo} value={per.periodo}>
            <AccordionTrigger className="text-lg">{per.periodo}</AccordionTrigger>
            <AccordionContent>
              {/* Meta período */}
              <div className="mb-4 grid gap-4 md:grid-cols-[160px_1fr]">
                <div className="relative overflow-hidden rounded-lg aspect-square bg-muted">
                  <Image
                    src={per.foto || "/logo_dominicano.png"}
                    alt={`Consejo ${per.periodo}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    {per.sede && <Badge variant="outline"><MapPin className="w-3.5 h-3.5 mr-1" />Sede: {per.sede}</Badge>}
                    {per.lema && <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Lema: {per.lema}</Badge>}
                    {per.presidentes && per.presidentes.length > 0 && (
                      <Badge variant="outline">
                        <Crown className="w-3.5 h-3.5 mr-1" />
                        Presidencia: {per.presidentes.join(", ")}
                      </Badge>
                    )}
                    {per.actaUrl && (
                      <Button asChild size="sm" variant="outline" className="bg-transparent border-primary/20 hover:bg-primary/5">
                        <Link href={per.actaUrl} target="_blank"><FileText className="w-4 h-4 mr-2" />Ver acta</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Miembros */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {per.miembros.map(m => (
                  <ConsejeroCard key={m.id} m={m} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

// ---------- Sección principal ----------
export default function ConsejoNacionalSection({
  actual = consejoActual,
  historial = consejosHistoricos,
  title = "Consejo Nacional JMV República Dominicana",
}: {
  actual?: Consejero[]
  historial?: ConsejoHistorico[]
  title?: string
}) {
  return (
    <section className="px-10 py-20 bg-gradient-to-br from-background via-card/30 to-background">
      <div className="container">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 mb-6 border rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Liderazgo Nacional</span>
          </div>
          <h2 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text">
              {title}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-lg text-muted-foreground">
            Conoce a quienes sirven actualmente y explora el historial de consejos anteriores.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="actual" className="w-full">
          <TabsList className="grid w-full max-w-xl grid-cols-2 mx-auto">
            <TabsTrigger value="actual">Actual</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
          </TabsList>

          {/* Actual */}
          <TabsContent value="actual" className="mt-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {actual.map(m => (
                <ConsejeroCard key={m.id} m={m} />
              ))}
            </div>
          </TabsContent>

          {/* Historial */}
          <TabsContent value="historial" className="mt-8">
            <HistorialConsejos data={historial} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
