"use client"

import { useEffect, useMemo, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash2, MoreHorizontal, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { DataTable, createSortableColumn } from "@/src/components/data-table"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"

import { TestimonioType } from "@/src/features/testimonios/model/types"
import { TestimonioFormDialog } from "@/src/features/testimonios/components/testimonio-form-dialog"
import { DeleteTestimonioDialog } from "@/src/features/testimonios/components/delete-testimonio-dialog"
import {
  useCreateTestimonio,
  useDeleteTestimonio,
  useGetAllTestimonios,
  useUpdateTestimonio,
} from "@/src/features/testimonios/hook/use-testimonio"
import { StarRating } from "@/src/components/shared/star-rating"
import { TestimonioCreateData, TestimonioUpdateData } from "@/src/features/testimonios/schema/validation"

export default function AdminTestimoniosPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTestimonio, setSelectedTestimonio] = useState<TestimonioType | null>(null)

  const { testimonios, isLoading, fetchAll } = useGetAllTestimonios()
  const { create, isLoading: isCreating } = useCreateTestimonio()
  const { update, isLoading: isUpdating } = useUpdateTestimonio()
  const { remove, isLoading: isDeleting } = useDeleteTestimonio()

  useEffect(() => {
    fetchAll()
  }, [])

  const handleCreate = async (data: TestimonioCreateData | TestimonioUpdateData) => {
    await create(data as TestimonioCreateData)
    await fetchAll()
    setCreateDialogOpen(false)
  }

  const handleEdit = async (data: TestimonioCreateData | TestimonioUpdateData) => {
    if (selectedTestimonio?.id) {
      await update(selectedTestimonio.id, data as TestimonioUpdateData)
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

  const columns: ColumnDef<TestimonioType>[] = useMemo(
    () => [
      createSortableColumn<TestimonioType>("nombre", "Nombre"),

      // Evaluación (estrellas)
      {
        id: "reputacion",
        header: "Evaluación",
        cell: ({ row }) => (
          <StarRating rating={row.original.reputacion ?? 5} readonly size="sm" />
        ),
      },

      // Iglesia
      {
        accessorKey: "iglesia",
        id: "iglesia",
        header: "Iglesia",
        cell: ({ row }) =>
          row.original.iglesia ? (
            <Badge variant="outline" className="text-xs">
              {row.original.iglesia}
            </Badge>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          ),
      },

      // Mensaje (truncado)
      {
        id: "mensaje",
        header: "Mensaje",
        cell: ({ row }) => {
          const raw = row.original.mensaje ?? ""
          const plain = raw.replace(/<[^>]*>/g, "")
          return (
            <p className="max-w-[320px] truncate text-sm text-muted-foreground" title={plain}>
              &ldquo;{plain}&rdquo;
            </p>
          )
        },
      },

      // Fecha de creación (con filtro por rango)
      {
        accessorKey: "createdDate",
        id: "createdDate",
        header: "Fecha",
        cell: ({ row }) => {
          const date = row.original.createdDate
          if (!date) return <span className="text-sm text-muted-foreground">—</span>
          return (
            <span className="text-sm">
              {new Date(date).toLocaleDateString("es-ES")}
            </span>
          )
        },
      },

      // Acciones
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const t = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="sr-only">Abrir menú</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuLabel className="text-center">Acciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedTestimonio(t)
                    setEditDialogOpen(true)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-700 focus:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedTestimonio(t)
                    setDeleteDialogOpen(true)
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Testimonios</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona los testimonios que aparecen en el sitio
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={testimonios}
        searchPlaceholder="Buscar por nombre, mensaje, iglesia..."
        createButtonText="Nuevo Testimonio"
        onCreateClick={() => setCreateDialogOpen(true)}
        dateColumnId="createdDate"
        showDateRangeFilter
      />

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
