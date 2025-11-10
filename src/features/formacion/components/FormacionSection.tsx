"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Plus, Edit, Trash2, Download, ExternalLink } from "lucide-react"
import { getClientUser } from "@/src/lib/client-auth"
import { FormacionType } from "../model/types"
import { FormacionFormDialog } from "./formacion-form-dialog"
import { DeleteFormacionDialog } from "./delete-formacion-dialog"
import { FormacionSkeleton } from "./formacion-skeleton"
import { EmptyFormacion } from "./empty-formacion"
import { useCreateFormacion, useDeleteFormacion, useGetAllFormaciones, useUpdateFormacion } from "../hook/use-formacion"
import { Badge } from "@/src/components/ui/badge"
import { ModulosFormacion } from "@/src/lib/enum/ModulosFormacion"

export function FormacionSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedFormacion, setSelectedFormacion] = useState<FormacionType | null>(null)

  const { formaciones, isLoading, fetchAll } = useGetAllFormaciones()
  const { create, isLoading: isCreating } = useCreateFormacion()
  const { update, isLoading: isUpdating } = useUpdateFormacion()
  const { remove, isLoading: isDeleting } = useDeleteFormacion()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getClientUser()
        setIsLoggedIn(!!user)
      } catch (error) {
        console.error("Error checking auth:", error)
      }
    }
    checkAuth()
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const handleCreate = async (data: any) => {
    await create(data)
    await fetchAll()
  }

  const handleEdit = async (data: any) => {
    if (selectedFormacion?.id) {
      await update(selectedFormacion.id, data)
      await fetchAll()
    }
  }

  const handleDelete = async () => {
    if (selectedFormacion?.id) {
      await remove(selectedFormacion.id)
      await fetchAll()
    }
  }

  const openEditDialog = (formacion: FormacionType) => {
    setSelectedFormacion(formacion)
    setEditDialogOpen(true)
  }

  const openDeleteDialog = (formacion: FormacionType) => {
    setSelectedFormacion(formacion)
    setDeleteDialogOpen(true)
  }

  const getModuleColor = (modulo: ModulosFormacion) => {
    const colors = {
      [ModulosFormacion.Voluntario]: "bg-blue-100 text-blue-800",
      [ModulosFormacion.Catequesis]: "bg-green-100 text-green-800",
      [ModulosFormacion.Oraciones]: "bg-purple-100 text-purple-800",
      [ModulosFormacion.Podcast]: "bg-orange-100 text-orange-800",
      [ModulosFormacion.Mision]: "bg-red-100 text-red-800",
      [ModulosFormacion.Guia]: "bg-indigo-100 text-indigo-800",
    }
    return colors[modulo] || "bg-gray-100 text-gray-800"
  }

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-6">
          <SectionHeader 
            isLoggedIn={isLoggedIn} 
            onAddClick={() => setCreateDialogOpen(true)} 
            formacionesCount={formaciones.length}
          />
          <FormacionSkeleton />
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-6">
        <SectionHeader 
          isLoggedIn={isLoggedIn} 
          onAddClick={() => setCreateDialogOpen(true)} 
          formacionesCount={formaciones.length}
        />

        {formaciones.length === 0 ? (
          <EmptyFormacion 
            isLoggedIn={isLoggedIn}
            onAddClick={() => setCreateDialogOpen(true)}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {formaciones.map((formacion) => (
              <FormacionCard
                key={formacion.id}
                formacion={formacion}
                isLoggedIn={isLoggedIn}
                onEdit={() => openEditDialog(formacion)}
                onDelete={() => openDeleteDialog(formacion)}
                getModuleColor={getModuleColor}
              />
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
    </section>
  )
}

function SectionHeader({ 
  isLoggedIn, 
  onAddClick,
  formacionesCount 
}: Readonly<{ 
  isLoggedIn: boolean; 
  onAddClick: () => void;
  formacionesCount: number;
}>) {
  return (
    <div className="mb-16">
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-4xl font-bold text-balance">Formaciones JMV</h2>
          <p className="mt-2 text-xl text-muted-foreground text-pretty">
            Contenido formativo para el crecimiento espiritual y comunitario
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Total: {formacionesCount} formaciones disponibles
          </p>
        </div>
        
        {isLoggedIn && (
          <Button onClick={onAddClick} className="text-white bg-primary hover:bg-primary/90 shrink-0">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Formación
          </Button>
        )}
      </div>
    </div>
  )
}

interface FormacionCardProps {
  readonly formacion: FormacionType
  readonly isLoggedIn: boolean
  readonly onEdit: () => void
  readonly onDelete: () => void
  readonly getModuleColor: (modulo: ModulosFormacion) => string
}

function FormacionCard({ 
  formacion, 
  isLoggedIn, 
  onEdit, 
  onDelete,
  getModuleColor
}: FormacionCardProps) {
  const handleDownload = () => {
    if (formacion.enlace) {
      window.open(formacion.enlace, '_blank')
    } else if (formacion.ruta) {
      // Para archivos locales, crear enlace de descarga
      const link = document.createElement('a')
      link.href = formacion.ruta
      link.download = formacion.titulo || 'documento'
      link.click()
    }
  }

  return (
    <Card className="relative transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-card to-background group">
      <CardHeader className="pb-4">
        {isLoggedIn && (
          <div className="absolute flex gap-2 transition-opacity duration-200 opacity-0 top-4 right-4 group-hover:opacity-100">
            <Button
              variant="outline"
              size="icon"
              onClick={onEdit}
              className="w-8 h-8 border-gray-200 bg-white/90 hover:bg-green-50 hover:text-green-600"
              title="Editar formación"
            >
              <Edit className="w-3 h-3" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onDelete}
              className="w-8 h-8 border-gray-200 bg-white/90 hover:bg-red-50 hover:text-red-600"
              title="Eliminar formación"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          {formacion.modulo && (
            <Badge variant="secondary" className={getModuleColor(formacion.modulo)}>
              {formacion.modulo}
            </Badge>
          )}
        </div>

        <CardTitle className="text-lg line-clamp-2">{formacion.titulo}</CardTitle>
      </CardHeader>

      <CardContent>
        {formacion.descripcion && (
          <div 
            className="mb-4 text-sm prose-sm prose text-muted-foreground line-clamp-3 max-w-none"
            dangerouslySetInnerHTML={{ __html: formacion.descripcion }}
          />
        )}

        <Button 
          onClick={handleDownload} 
          variant="outline" 
          className="w-full bg-transparent"
          disabled={!formacion.enlace && !formacion.ruta}
        >
          {formacion.enlace ? (
            <>
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver Recurso
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </>
          )}
        </Button>

        <div className="mt-3 text-xs text-muted-foreground">
          {formacion.createdDate && new Date(formacion.createdDate).toLocaleDateString('es-ES')}
        </div>
      </CardContent>
    </Card>
  )
}