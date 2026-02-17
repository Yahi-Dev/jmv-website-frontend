"use client"

import { useEffect, useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Plus, Edit, Trash2, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { TestimonioType } from "@/src/features/testimonios/model/types"
import { TestimonioFormDialog } from "@/src/features/testimonios/components/testimonio-form-dialog"
import { DeleteTestimonioDialog } from "@/src/features/testimonios/components/delete-testimonio-dialog"
import { useCreateTestimonio, useDeleteTestimonio, useGetAllTestimonios, useUpdateTestimonio } from "@/src/features/testimonios/hook/use-testimonio"
import { StarRating } from "@/src/components/shared/star-rating"

export default function AdminTestimoniosPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTestimonio, setSelectedTestimonio] = useState<TestimonioType | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const { testimonios, isLoading, fetchAll } = useGetAllTestimonios()
  const { create, isLoading: isCreating } = useCreateTestimonio()
  const { update, isLoading: isUpdating } = useUpdateTestimonio()
  const { remove, isLoading: isDeleting } = useDeleteTestimonio()

  useEffect(() => {
    fetchAll()
  }, [])

  const handleCreate = async (data: any) => {
    await create(data)
    await fetchAll()
    setCreateDialogOpen(false)
  }

  const handleEdit = async (data: any) => {
    if (selectedTestimonio?.id) {
      await update(selectedTestimonio.id, data)
      await fetchAll()
      setEditDialogOpen(false)
    }
  }

  const handleDelete = async () => {
    if (selectedTestimonio?.id) {
      await remove(selectedTestimonio.id)
      await fetchAll()
      setDeleteDialogOpen(false)
    }
  }

  const filteredTestimonios = testimonios.filter(t =>
    t.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.mensaje?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.iglesia?.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-2xl font-bold text-foreground">Testimonios</h1>
            <p className="text-sm text-muted-foreground">
              {testimonios.length} testimonio{testimonios.length !== 1 ? "s" : ""} registrado{testimonios.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)} className="text-white bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Testimonio
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre, mensaje o iglesia..."
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
      ) : filteredTestimonios.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            {searchTerm ? "No se encontraron testimonios con ese criterio." : "No hay testimonios registrados."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTestimonios.map((testimonio) => (
            <Card key={testimonio.id} className="border border-gray-100 shadow-sm">
              <CardContent className="flex items-start justify-between gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-foreground">{testimonio.nombre}</h3>
                    <StarRating rating={testimonio.reputacion || 5} readonly size="sm" />
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground line-clamp-2">
                    &ldquo;{testimonio.mensaje}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {testimonio.iglesia && <span>{testimonio.iglesia}</span>}
                    {testimonio.createdDate && (
                      <span>{new Date(testimonio.createdDate).toLocaleDateString("es-ES")}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSelectedTestimonio(testimonio)
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
                      setSelectedTestimonio(testimonio)
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
  )
}
