// src/features/consejos/components/ConsejoNacionalSection.tsx
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Button } from "@/src/components/ui/button"
import { useConsejoActual, useConsejosHistoricos } from "../hook/use-consejos"
import { ConsejoSkeleton } from "./ConsejoSkeleton"
import { ConsejoCard } from "./ConsejoCard"
import { HistorialConsejos } from "./HistorialConsejos"
import Link from "next/link"
import { FileText, Users } from "lucide-react"

export function ConsejoNacionalSection() {
  const { consejo, loading: loadingActual, error: errorActual } = useConsejoActual()
  const { consejos: historicos, loading: loadingHistoricos } = useConsejosHistoricos()

  if (loadingActual) {
    return <ConsejoSkeleton />
  }

  if (errorActual && !consejo) {
    return (
      <div className="container px-4 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold">Consejo Nacional</h2>
        <p className="text-muted-foreground">{errorActual}</p>
      </div>
    )
  }

  return (
    <section className="px-4 py-16 bg-gradient-to-br from-background via-card/30 to-background md:px-6">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 mb-6 border rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Liderazgo Nacional</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text">
              Consejo Nacional JMV República Dominicana
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Conoce a quienes sirven actualmente y explora el historial de consejos anteriores.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="actual" className="w-full">
          <TabsList className="grid w-full max-w-xl grid-cols-2 mx-auto mb-8">
            <TabsTrigger value="actual">Consejo Actual</TabsTrigger>
            <TabsTrigger value="historial">Consejos Anteriores</TabsTrigger>
          </TabsList>

          {/* Consejo Actual */}
          <TabsContent value="actual" className="mt-6">
            {consejo ? (
              <div className="space-y-8">
                {/* Info del período actual */}
                <div className="p-6 border rounded-lg bg-card/50 backdrop-blur-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">{consejo.periodo}</h3>
                      {consejo.lema && (
                        <p className="mt-2 text-lg italic text-muted-foreground">"{consejo.lema}"</p>
                      )}
                      {consejo.sede && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          Sede Nacional: {consejo.sede}
                        </p>
                      )}
                    </div>
                    {consejo.actaUrl && (
                      <Button asChild variant="outline">
                        <Link href={consejo.actaUrl} target="_blank">
                          <FileText className="w-4 h-4 mr-2" />
                          Ver Acta de Constitución
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Miembros */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {consejo.miembros.map(miembro => (
                    <ConsejoCard key={miembro.id} miembro={miembro} />
                  ))}
                </div>

                {consejo.miembros.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No hay miembros registrados en el consejo actual.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No hay consejo actual configurado.</p>
              </div>
            )}
          </TabsContent>

          {/* Historial */}
          <TabsContent value="historial" className="mt-6">
            <HistorialConsejos 
              consejos={loadingHistoricos ? [] : historicos} 
              loading={loadingHistoricos} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}