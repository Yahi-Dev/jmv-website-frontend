"use client"

import { useEffect, useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Badge } from "@/src/components/ui/badge"
import { Plus, Edit, Trash2, Search, ArrowLeft, ExternalLink, Download } from "lucide-react"
import Link from "next/link"
import { FormacionType } from "@/src/features/formacion/model/types"
import { FormacionFormDialog } from "@/src/features/formacion/components/formacion-form-dialog"
import { DeleteFormacionDialog } from "@/src/features/formacion/components/delete-formacion-dialog"
import { useCreateFormacion, useDeleteFormacion, useGetAllFormaciones, useUpdateFormacion } from "@/src/features/formacion/hook/use-formacion"

export default function AdminFormacionPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedFormacion, setSelectedFormacion] = useState<FormacionType | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const { formaciones, isLoading, fetchAll } = useGetAllFormaciones()
  const { create, isLoading: isCreating } = useCreateFormacion()
  const { update, isLoading: isUpdating } = useUpdateFormacion()
  const { remove, isLoading: isDeleting } = useDeleteFormacion()

  useEffect(() => {
    fetchAll()
  }, [])

  const handleCreate = async (data: any) => {
    await create(data)
    await fetchAll()
    setCreateDialogOpen(false)
  }

  const handleEdit = async (data: any) => {
    if (selectedFormacion?.id) {
      await update(selectedFormacion.id, data)
      await fetchAll()
      setEditDialogOpen(false)
    }
  }

  const handleDelete = async () => {
    if (selectedFormacion?.id) {
      await remove(selectedFormacion.id)
      await fetchAll()
      setDeleteDialogOpen(false)
    }
  }

  const filteredFormaciones = formaciones.filter(f =>
    f.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.modulo?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Formación</h1>
            <p className="text-sm text-muted-foreground">
              {formaciones.length} recurso{formaciones.length !== 1 ? "s" : ""} registrado{formaciones.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)} className="text-white bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Recurso
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por título, descripción o módulo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 rounded-full border-primary border-t-transparent animate-spin" />
        </div>
      ) : filteredFormaciones.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            {searchTerm ? "No se encontraron recursos con ese criterio." : "No hay recursos de formación registrados."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredFormaciones.map((formacion) => (
            <Card key={formacion.id} className="border border-gray-100 shadow-sm">
              <CardContent className="flex items-start justify-between gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{formacion.titulo}</h3>
                    {formacion.modulo && (
                      <Badge variant="secondary" className="text-xs">
                        {formacion.modulo}
                      </Badge>
                    )}
                  </div>
                  {formacion.descripcion && (
                    <p className="mb-2 text-sm text-muted-foreground line-clamp-2">
                      {formacion.descripcion}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {formacion.enlace && (
                      <a href={formacion.enlace} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                        <ExternalLink className="w-3 h-3" />
                        Enlace
                      </a>
                    )}
                    {formacion.ruta && (
                      <a href={formacion.ruta} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                        <Download className="w-3 h-3" />
                        Archivo
                      </a>
                    )}
                    {formacion.createdDate && (
                      <span>{new Date(formacion.createdDate).toLocaleDateString("es-ES")}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSelectedFormacion(formacion)
                      setEditDialogOpen(true)
                    }}
                    className="w-8 h-8"
                    title="Editar"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSelectedFormacion(formacion)
                      setDeleteDialogOpen(true)
                    }}
                    className="w-8 h-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                    title="Eliminar"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialogs */}
      <FormacionFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
        isLoading={isCreating}
        mode="create"
      />

      <FormacionFormDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleEdit}
        isLoading={isUpdating}
        initialData={selectedFormacion || undefined}
        mode="edit"
      />

      <DeleteFormacionDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        formacionName={selectedFormacion?.titulo || ""}
      />
    </div>
  )
}
