// src/features/consejos/components/ConsejoNacionalSection.tsx
"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Button } from "@/src/components/ui/button"
import { useConsejoActual, useConsejosHistoricos } from "../hook/use-consejos"
import { ConsejoSkeleton } from "./ConsejoSkeleton"
import { ConsejoCard } from "./ConsejoCard"
import { HistorialConsejos } from "./HistorialConsejos"
import { ConsejoManagement } from "./ConsejoManagement"
import Link from "next/link"
import { FileText, Users, CalendarPlus, Users2 } from "lucide-react"
import { getClientUser } from "@/src/lib/client-auth"

export function ConsejoNacionalSection() {
  const [isAdmin, setIsAdmin] = useState(false)
  const { consejo, loading: loadingActual, error: errorActual, isEmpty } = useConsejoActual()
  const { consejos: historicos, loading: loadingHistoricos } = useConsejosHistoricos()

  // Verificar si el usuario es administrador
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getClientUser()
        // Aquí puedes ajustar la lógica para determinar si es admin
        // Por ahora, asumimos que cualquier usuario autenticado es admin
        setIsAdmin(!!user)
      } catch (error) {
        console.error("Error checking auth:", error)
        setIsAdmin(false)
      }
    }
    checkAuth()
  }, [])

  if (loadingActual) {
    return <ConsejoSkeleton />
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

        {/* Panel de Administración (solo para admins) */}
        {isAdmin && (
          <div className="mb-8">
            <ConsejoManagement isAdmin={isAdmin} />
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="actual" className="w-full">
          <TabsList className="grid w-full max-w-xl grid-cols-2 mx-auto mb-8">
            <TabsTrigger value="actual">Consejo Actual</TabsTrigger>
            <TabsTrigger value="historial">Consejos Anteriores</TabsTrigger>
          </TabsList>

          {/* Consejo Actual */}
          <TabsContent value="actual" className="mt-6">
            {errorActual ? (
              // Estado de error real
              <div className="py-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="p-4 mx-auto mb-4 rounded-full bg-destructive/10 w-fit">
                    <Users2 className="w-8 h-8 text-destructive" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Error al cargar</h3>
                  <p className="mb-6 text-muted-foreground">{errorActual}</p>
                  <Button onClick={() => window.location.reload()}>
                    Reintentar
                  </Button>
                </div>
              </div>
            ) : isEmpty ? (
              // Estado: No hay consejo actual (no es error)
              <div className="py-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="p-4 mx-auto mb-4 rounded-full bg-muted w-fit">
                    <CalendarPlus className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">No hay consejo actual</h3>
                  <p className="mb-6 text-muted-foreground">
                    Actualmente no hay un consejo nacional activo configurado en el sistema.
                  </p>
                  {isAdmin && (
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                      <Button asChild>
                        <Link href="#management">
                          Crear primer consejo
                        </Link>
                      </Button>
                    </div>
                  )}
                  {!isAdmin && (
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                      <Button variant="outline" asChild>
                        <Link href="/historial">
                          Ver consejos anteriores
                        </Link>
                      </Button>
                      <Button asChild>
                        <Link href="/contacto">
                          Contactar administración
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : consejo ? (
              // Estado normal: Hay consejo actual
              <div className="space-y-8">
                {/* Info del período actual */}
                <div className="p-6 border rounded-lg bg-card/50 backdrop-blur-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">{consejo.periodo}</h3>
                      {consejo.lema && (
                        <p className="mt-2 text-lg italic text-muted-foreground">"{consejo.lema}"</p>
                      )}
                    </div>
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
                    {isAdmin && (
                      <Button 
                        onClick={() => document.getElementById('management')?.scrollIntoView({ behavior: 'smooth' })}
                        className="mt-4"
                      >
                        Agregar miembros
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ) : null}
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