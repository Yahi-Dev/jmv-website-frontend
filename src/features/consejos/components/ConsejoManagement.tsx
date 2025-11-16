// src/features/consejos/components/ConsejoManagement.tsx
"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Plus, Users, Settings } from "lucide-react"
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

  const { consejo, refetch } = useConsejoActual()
  const { create: createConsejo, update: updateConsejo, isLoading: consejoLoading } = useConsejoForm()
  const { create: createMiembro, update: updateMiembro, isLoading: miembroLoading } = useMiembroForm()

  if (!isAdmin) {
    return null
  }

  const handleCreateConsejo = async (data: ConsejoFormData) => {
    await createConsejo(data)
    setShowConsejoForm(false)
  }

  const handleUpdateConsejo = async (data: ConsejoFormData) => {
    if (editingConsejo) {
      await updateConsejo(editingConsejo.id, data)
      setEditingConsejo(null)
      setShowConsejoForm(false)
    }
  }

  const handleCreateMiembro = async (data: MiembroFormData) => {
    if (consejo) {
      await createMiembro({ ...data, consejoId: consejo.id })
      setShowMiembroForm(false)
    }
  }

  const handleUpdateMiembro = async (data: MiembroFormData) => {
    if (editingMiembro) {
      await updateMiembro(editingMiembro.id, data)
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
    <div className="space-y-4">
      {/* Header de gestión */}
      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-muted/50 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Gestión del Consejo</h3>
          <p className="text-sm text-muted-foreground">
            Administra el consejo actual y sus miembros
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
            >
              <Users className="w-4 h-4 mr-2" />
              Crear Primer Consejo
            </Button>
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
        <div className="space-y-3">
          <h4 className="font-medium">Miembros del Consejo</h4>
          {consejo.miembros.map(miembro => (
            <div key={miembro.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{miembro.nombre}</div>
                <div className="text-sm text-muted-foreground">
                  {miembro.cargo} • {miembro.ciudad || "Sin ciudad"}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditMiembro(miembro)}
              >
                Editar
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}