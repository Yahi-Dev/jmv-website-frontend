"use client"

import Image from "next/image"
import { Badge } from "@/src/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { MapPin, Tag, Users, Calendar } from "lucide-react"
import { CouncilGrid, MiembroConsejo } from "@/src/app/consejos/ui/Council"

type ComunidadFull = {
  id: string
  nombre: string
  imagen?: string
  ciudad: string
  miembros: number
  desde: number
  etiquetas: string[]
  ultimaActividad?: { fecha: string; titulo: string }
  consejo: MiembroConsejo[]
}

const demo: ComunidadFull = {
  id: "com-1",
  nombre: "Comunidad Juvenil A",
  imagen: "/logo_dominicano.png",
  ciudad: "Santo Domingo",
  miembros: 45,
  desde: 2015,
  etiquetas: ["Juvenil", "Parroquial"],
  ultimaActividad: { fecha: "2025-08-01", titulo: "Vigilia juvenil" },
  consejo: [],
}

export default function ComunidadPage() {
  const com = demo
  return (
    <div className="min-h-screen px-10 py-12 bg-gradient-to-br from-background via-card/30 to-background">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow">
            <Image src={com.imagen || "/logo_dominicano.png"} alt={com.nombre} fill className="object-contain bg-muted" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{com.nombre}</h1>
            <p className="flex items-center gap-2 mt-1 text-muted-foreground">
              <MapPin className="w-4 h-4" /> {com.ciudad}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {com.etiquetas.map(e => (
                <Badge key={e} variant="secondary" className="border">
                  <Tag className="w-3.5 h-3.5 mr-1.5" /> {e}
                </Badge>
              ))}
            </div>
            <div className="grid gap-3 mt-4 text-sm sm:grid-cols-3 text-muted-foreground">
              <div className="flex items-center gap-2"><Users className="w-4 h-4" />{com.miembros} miembros</div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />Desde {com.desde}</div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{com.ultimaActividad?.fecha} — {com.ultimaActividad?.titulo}</div>
            </div>
          </div>
        </div>

        <Card className="mt-10">
          <CardHeader><CardTitle>Consejo de la comunidad</CardTitle></CardHeader>
          <CardContent><CouncilGrid miembros={com.consejo} /></CardContent>
        </Card>
      </div>
    </div>
  )
}
