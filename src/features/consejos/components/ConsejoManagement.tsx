// src/features/consejos/components/ConsejoManagement.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { Plus, Users, Settings, Calendar } from "lucide-react"
import { ConsejoFormDialog } from "./ConsejoFormDialog"
import { MiembroFormDialog } from "./MiembroFormDialog"
import { useConsejoActual } from "../hook/use-consejos"
import { ConsejoFormData, MiembroFormData, ConsejoNacional, MiembroConsejo } from "../model/types"
import { useConsejoForm, useMiembroForm } from "../hook/use-consejo-form"

interface ConsejoManagementProps {
  isAdmin?: boolean
}

export function ConsejoManagement({ isAdmin = false }: ConsejoManagementProps) {
  const [showConsejoForm, setShowConsejoForm] = useState(false)
  const [showMiembroForm, setShowMiembroForm] = useState(false)
  const [editingConsejo, setEditingConsejo] = useState<ConsejoNacional | null>(null)
  const [editingMiembro, setEditingMiembro] = useState<MiembroConsejo | null>(null)

  const { consejo, refetch } = useConsejoActual() // Asegúrate de tener refetch aquí
  const { create: createConsejo, update: updateConsejo, isLoading: consejoLoading } = useConsejoForm()
  const { create: createMiembro, update: updateMiembro, isLoading: miembroLoading } = useMiembroForm()

  // Efecto para manejar el scroll al management section
  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#management' && isAdmin) {
      const element = document.getElementById('management')
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [isAdmin])

  if (!isAdmin) {
    return null
  }

  const handleCreateConsejo = async (data: ConsejoFormData) => {
    await createConsejo(data)
    await refetch() // Refetch después de crear
    setShowConsejoForm(false)
  }

  const handleUpdateConsejo = async (data: ConsejoFormData) => {
    if (editingConsejo) {
      await updateConsejo(editingConsejo.id, data)
      await refetch() // Refetch después de actualizar
      setEditingConsejo(null)
      setShowConsejoForm(false)
    }
  }

  const handleCreateMiembro = async (data: MiembroFormData) => {
    if (consejo) {
      await createMiembro({ ...data, consejoId: consejo.id })
      await refetch() // Refetch después de agregar miembro
      setShowMiembroForm(false)
    }
  }

  const handleUpdateMiembro = async (data: MiembroFormData) => {
    if (editingMiembro) {
      await updateMiembro(editingMiembro.id, data)
      await refetch() // Refetch después de actualizar miembro
      setEditingMiembro(null)
      setShowMiembroForm(false)
    }
  }

  const handleEditConsejo = () => {
    if (consejo) {
      setEditingConsejo(consejo)
      setShowConsejoForm(true)
    }
  }

  const handleEditMiembro = (miembro: MiembroConsejo) => {
    setEditingMiembro(miembro)
    setShowMiembroForm(true)
  }

  return (
    <div id="management" className="space-y-4">
      {/* Header de gestión */}
      <div className="flex flex-col gap-4 p-6 border rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-semibold">
              <Settings className="w-5 h-5 text-primary" />
              Gestión del Consejo Nacional
            </h3>
            <p className="text-sm text-muted-foreground">
              Como administrador, puedes crear y gestionar consejos nacionales
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {consejo ? (
              <>
                <Button
                  onClick={handleEditConsejo}
                  variant="outline"
                  size="sm"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Editar Consejo
                </Button>
                <Button
                  onClick={() => setShowMiembroForm(true)}
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Miembro
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setShowConsejoForm(true)}
                size="sm"
                className="text-white bg-primary hover:bg-primary/90"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Crear Primer Consejo
              </Button>
            )}
          </div>
        </div>

        {/* Información del estado actual */}
        <div className="p-4 border rounded-lg bg-background/50">
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${consejo ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="font-medium">
              {consejo ? `Consejo actual: ${consejo.periodo}` : 'No hay consejo actual configurado'}
            </span>
          </div>
          {consejo && (
            <div className="mt-2 text-xs text-muted-foreground">
              {consejo.miembros.length} miembro{consejo.miembros.length !== 1 ? 's' : ''} registrado{consejo.miembros.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Formularios */}
      <ConsejoFormDialog
        open={showConsejoForm}
        onOpenChange={setShowConsejoForm}
        onSubmit={editingConsejo ? handleUpdateConsejo : handleCreateConsejo}
        isLoading={consejoLoading}
        initialData={editingConsejo || undefined}
        mode={editingConsejo ? "edit" : "create"}
      />

      <MiembroFormDialog
        open={showMiembroForm}
        onOpenChange={setShowMiembroForm}
        onSubmit={editingMiembro ? handleUpdateMiembro : handleCreateMiembro}
        isLoading={miembroLoading}
        initialData={editingMiembro || undefined}
        mode={editingMiembro ? "edit" : "create"}
        consejoId={consejo?.id}
      />

      {/* Lista de miembros con acciones */}
      {consejo && consejo.miembros.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Miembros del Consejo Actual</h4>
          <div className="grid gap-3">
            {consejo.miembros.map(miembro => (
              <div key={miembro.id} className="flex items-center justify-between p-4 transition-colors border rounded-lg bg-card hover:bg-card/80">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="font-medium">{miembro.nombre}</div>
                    <div className="text-sm text-muted-foreground">
                      {miembro.cargo} • {miembro.ciudad || "Sin ciudad especificada"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditMiembro(miembro)}
                  >
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}