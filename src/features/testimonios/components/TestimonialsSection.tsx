// src/features/testimonios/components/testimonials-section.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"
import { getClientUser } from "@/src/lib/client-auth"
import { TestimonioType } from "../model/types"
import { TestimonioFormDialog } from "./testimonio-form-dialog"
import { DeleteTestimonioDialog } from "./delete-testimonio-dialog"
import { TestimoniosSkeleton } from "./testimonios-skeleton"
import { EmptyTestimonios } from "./empty-testimonios"
import { useCreateTestimonio, useDeleteTestimonio, useLatestTestimonios, useUpdateTestimonio } from "../hook/use-testimonio"
import { StarRating } from "@/src/components/shared/star-rating"

export function TestimonialsSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTestimonio, setSelectedTestimonio] = useState<TestimonioType | null>(null)

  // ✅ CAMBIO: Usar useLatestTestimonios en lugar de useRandomTestimonios
  const { testimonios, isLoading, fetchLatest } = useLatestTestimonios(3)
  const { create, isLoading: isCreating } = useCreateTestimonio()
  const { update, isLoading: isUpdating } = useUpdateTestimonio(selectedTestimonio?.id || 0)
  const { remove, isLoading: isDeleting } = useDeleteTestimonio()

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

  const handleCreate = async (data: any) => {
    await create(data)
    await fetchLatest() // Refrescar los testimonios más recientes
  }

  const handleEdit = async (data: any) => {
    if (selectedTestimonio?.id) {
      await update(data)
      await fetchLatest() // Refrescar los testimonios más recientes
    }
  }

  const handleDelete = async () => {
    if (selectedTestimonio?.id) {
      await remove(selectedTestimonio.id)
      await fetchLatest() // Refrescar los testimonios más recientes
    }
  }

  const openEditDialog = (testimonio: TestimonioType) => {
    setSelectedTestimonio(testimonio)
    setEditDialogOpen(true)
  }

  const openDeleteDialog = (testimonio: TestimonioType) => {
    setSelectedTestimonio(testimonio)
    setDeleteDialogOpen(true)
  }

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-6">
          <SectionHeader isLoggedIn={isLoggedIn} onAddClick={() => setCreateDialogOpen(true)} />
          <TestimoniosSkeleton />
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
        />

        {testimonios.length === 0 ? (
          <EmptyTestimonios 
            isLoggedIn={isLoggedIn}
            onAddClick={() => setCreateDialogOpen(true)}
          />
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {testimonios.map((testimonio) => (
              <TestimonioCard
                key={testimonio.id}
                testimonio={testimonio}
                isLoggedIn={isLoggedIn}
                onEdit={() => openEditDialog(testimonio)}
                onDelete={() => openDeleteDialog(testimonio)}
              />
            ))}
          </div>
        )}

        {/* Dialogs */}
        <TestimonioFormDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSubmit={handleCreate}
          isLoading={isCreating}
          mode="create"
        />

        <TestimonioFormDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSubmit={handleEdit}
          isLoading={isUpdating}
          initialData={selectedTestimonio || undefined}
          mode="edit"
        />

        <DeleteTestimonioDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDelete}
          isLoading={isDeleting}
          testimonioName={selectedTestimonio?.nombre || ""}
        />
      </div>
    </section>
  )
}

// Componente de Header actualizado
function SectionHeader({ isLoggedIn, onAddClick }: { 
  isLoggedIn: boolean; 
  onAddClick: () => void 
}) {
  return (
    <div className="mb-16">
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-4xl font-bold text-balance">Testimonios JMV</h2>
          <p className="mt-2 text-xl text-muted-foreground text-pretty">
            Últimas experiencias transformadoras de nuestros jóvenes
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Mostrando los 3 testimonios más recientes
          </p>
        </div>
        
        {isLoggedIn && (
          <Button onClick={onAddClick} className="text-white bg-primary hover:bg-primary/90 shrink-0">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Testimonio
          </Button>
        )}
      </div>
    </div>
  )
}

// Componente de Card Individual (se mantiene igual)
function TestimonioCard({ 
  testimonio, 
  isLoggedIn, 
  onEdit, 
  onDelete 
}: { 
  testimonio: TestimonioType
  isLoggedIn: boolean
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <Card className="relative transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-card to-background group">
      <CardContent className="pt-8 pb-6">
        {isLoggedIn && (
          <div className="absolute flex gap-2 transition-opacity duration-200 opacity-0 top-4 right-4 group-hover:opacity-100">
            <Button
              variant="outline"
              size="icon"
              onClick={onEdit}
              className="w-8 h-8 border-gray-200 bg-white/90 hover:bg-green-50 hover:text-green-600"
              title="Editar testimonio"
            >
              <Edit className="w-3 h-3" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onDelete}
              className="w-8 h-8 border-gray-200 bg-white/90 hover:bg-red-50 hover:text-red-600"
              title="Eliminar testimonio"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}

        <div className="flex justify-center mb-6">
          <StarRating 
            rating={testimonio.reputacion || 5} 
            readonly 
            size="md" 
          />
        </div>

        <blockquote className="mb-6 text-base italic leading-relaxed text-center text-foreground/90">
          "{testimonio.mensaje}"
        </blockquote>

        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{testimonio.nombre}</div>
          <div className="text-muted-foreground">{testimonio.iglesia}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {testimonio.createdDate && new Date(testimonio.createdDate).toLocaleDateString('es-ES')}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}