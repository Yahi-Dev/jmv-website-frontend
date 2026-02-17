"use client"

import { Button } from "@/src/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ConsejoManagement } from "@/src/features/consejos/components/ConsejoManagement"
import { useConsejoActual, useConsejosHistoricos } from "@/src/features/consejos/hook/use-consejos"
import { ConsejoCard } from "@/src/features/consejos/components/ConsejoCard"
import { HistorialConsejos } from "@/src/features/consejos/components/HistorialConsejos"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"

export default function AdminConsejosPage() {
  const { consejo, loading: loadingActual, isEmpty } = useConsejoActual()
  const { consejos: historicos, loading: loadingHistoricos } = useConsejosHistoricos()

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Consejo Nacional</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona el consejo nacional y sus miembros
          </p>
        </div>
      </div>

      {/* Management Panel - siempre visible ya que estamos en admin */}
      <div className="mb-8">
        <ConsejoManagement isAdmin={true} />
      </div>

      {/* Vista del consejo */}
      <Tabs defaultValue="actual" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="actual">Consejo Actual</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="actual" className="mt-4">
          {loadingActual ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 rounded-full border-primary border-t-transparent animate-spin" />
            </div>
          ) : isEmpty || !consejo ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No hay consejo actual configurado. Usa el panel de gestión para crear uno.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 border rounded-lg bg-card/50">
                <h3 className="text-xl font-bold">{consejo.periodo}</h3>
                {consejo.lema && (
                  <p className="mt-1 italic text-muted-foreground">&ldquo;{consejo.lema}&rdquo;</p>
                )}
                <p className="mt-2 text-sm text-muted-foreground">
                  {consejo.miembros.length} miembro{consejo.miembros.length !== 1 ? "s" : ""}
                </p>
              </div>

              {consejo.miembros.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {consejo.miembros.map(miembro => (
                    <ConsejoCard key={miembro.id} miembro={miembro} />
                  ))}
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="historial" className="mt-4">
          <HistorialConsejos
            consejos={loadingHistoricos ? [] : historicos}
            loading={loadingHistoricos}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
