// src/features/consejos/components/HistorialConsejos.tsx
"use client"

import { useState, useMemo } from "react"
import { Input } from "@/src/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Search, Filter, MapPin, FileText, Crown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { CargoConsejo, ConsejoNacional } from "../model/types"
import { ConsejoCard } from "./ConsejoCard"

interface HistorialConsejosProps {
  consejos: ConsejoNacional[]
  loading?: boolean
}

export function HistorialConsejos({ consejos, loading = false }: HistorialConsejosProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConsejos = useMemo(() => {
    if (!searchQuery.trim()) return consejos

    const query = searchQuery.toLowerCase().trim()
    return consejos.map(consejo => ({
      ...consejo,
      miembros: consejo.miembros.filter(miembro =>
        miembro.nombre.toLowerCase().includes(query) ||
        miembro.ciudad?.toLowerCase().includes(query) ||
        miembro.cargo.toLowerCase().includes(query)
      )
    })).filter(consejo => consejo.miembros.length > 0)
  }, [consejos, searchQuery])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
            <Input placeholder="Buscar por nombre, cargo o ciudad..." className="pl-9" disabled />
          </div>
          <div className="items-center hidden gap-2 px-3 py-2 text-sm border rounded-lg sm:flex text-muted-foreground bg-background/60 border-border/50">
            <Filter className="w-4 h-4" />
            Cargando...
          </div>
        </div>
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Cargando consejos históricos...</p>
        </div>
      </div>
    )
  }

  if (consejos.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No hay consejos históricos registrados.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda */}
      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-sm group">
          <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground group-focus-within:text-primary" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, cargo o ciudad..." 
            className="pl-9" 
          />
        </div>
        <div className="items-center hidden gap-2 px-3 py-2 text-sm border rounded-lg sm:flex text-muted-foreground bg-background/60 border-border/50">
          <Filter className="w-4 h-4" />
          {consejos.length} período{consejos.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Lista de consejos históricos */}
      <Accordion type="multiple" className="w-full">
        {filteredConsejos.map((consejo) => (
          <AccordionItem key={consejo.id} value={consejo.periodo}>
            <AccordionTrigger className="text-lg hover:no-underline">
              <div className="flex items-center gap-3">
                <span className="font-semibold">{consejo.periodo}</span>
                {consejo.sede && (
                  <Badge variant="outline" className="text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    {consejo.sede}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {/* Información del período */}
              <div className="mb-6 grid gap-4 md:grid-cols-[160px_1fr]">
                <div className="relative overflow-hidden rounded-lg aspect-square bg-muted">
                  <Image
                    src={consejo.fotoUrl || "/logo_dominicano.png"}
                    alt={`Consejo ${consejo.periodo}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-3">
                  {consejo.lema && (
                    <div>
                      <Badge variant="secondary" className="mb-2 text-sm bg-primary/10 text-primary border-primary/20">
                        Lema: "{consejo.lema}"
                      </Badge>
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    {consejo.sede && (
                      <Badge variant="outline">
                        <MapPin className="w-3.5 h-3.5 mr-1" />
                        Sede: {consejo.sede}
                      </Badge>
                    )}
                    {consejo.actaUrl && (
                      <Button asChild size="sm" variant="outline" className="bg-transparent border-primary/20 hover:bg-primary/5">
                        <Link href={consejo.actaUrl} target="_blank">
                          <FileText className="w-4 h-4 mr-2" />
                          Ver acta
                        </Link>
                      </Button>
                    )}
                  </div>
                  {consejo.miembros.some(m => m.cargo === CargoConsejo.CoordinadorNacional) && (
                    <div className="text-sm text-muted-foreground">
                      <Crown className="inline w-4 h-4 mr-1" />
                      Coordinación:{" "}
                      {consejo.miembros
                        .filter(m => m.cargo === CargoConsejo.CoordinadorNacional)
                        .map(m => m.nombre)
                        .join(", ")}
                    </div>
                  )}
                </div>
              </div>

              {/* Miembros del consejo */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {consejo.miembros.map((miembro) => (
                  <ConsejoCard key={miembro.id} miembro={miembro} />
                ))}
              </div>

              {consejo.miembros.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  No hay miembros registrados para este período.
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filteredConsejos.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No se encontraron resultados para "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  )
}