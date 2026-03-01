"use client"

import { useEffect, useMemo, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash2, MoreHorizontal, ArrowLeft, ExternalLink, Download } from "lucide-react"
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

import { FormacionType } from "@/src/features/formacion/model/types"
import { FormacionFormDialog } from "@/src/features/formacion/components/formacion-form-dialog"
import { DeleteFormacionDialog } from "@/src/features/formacion/components/delete-formacion-dialog"
import {
  useCreateFormacion,
  useDeleteFormacion,
  useGetAllFormaciones,
  useUpdateFormacion,
} from "@/src/features/formacion/hook/use-formacion"
import { FormacionCreateData, FormacionUpdateData } from "@/src/features/formacion/schema/validation"

const MODULO_COLORS: Record<string, string> = {
  Voluntario: "bg-blue-100 text-blue-700 border-blue-200",
  Catequesis: "bg-purple-100 text-purple-700 border-purple-200",
  Oraciones: "bg-green-100 text-green-700 border-green-200",
  Podcast: "bg-orange-100 text-orange-700 border-orange-200",
  Mision: "bg-red-100 text-red-700 border-red-200",
  Guia: "bg-yellow-100 text-yellow-700 border-yellow-200",
}

export default function AdminFormacionPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedFormacion, setSelectedFormacion] = useState<FormacionType | null>(null)

  const { formaciones, isLoading, fetchAll } = useGetAllFormaciones()
  const { create, isLoading: isCreating } = useCreateFormacion()
  const { update, isLoading: isUpdating } = useUpdateFormacion()
  const { remove, isLoading: isDeleting } = useDeleteFormacion()

  useEffect(() => {
    fetchAll()
  }, [])

  const handleCreate = async (data: FormacionCreateData | FormacionUpdateData) => {
    await create(data as FormacionCreateData)
    await fetchAll()
    setCreateDialogOpen(false)
  }

  const handleEdit = async (data: FormacionCreateData | FormacionUpdateData) => {
    if (selectedFormacion?.id) {
      await update(selectedFormacion.id, data as FormacionUpdateData)
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

  const columns: ColumnDef<FormacionType>[] = useMemo(
    () => [
      createSortableColumn<FormacionType>("titulo", "Título"),

      // Módulo
      {
        accessorKey: "modulo",
        id: "modulo",
        header: "Módulo",
        cell: ({ row }) => {
          const modulo = row.original.modulo
          if (!modulo) return <span className="text-sm text-muted-foreground">—</span>
          const colorClass = MODULO_COLORS[modulo] ?? "bg-gray-100 text-gray-700 border-gray-200"
          return (
            <Badge variant="outline" className={`text-xs font-medium ${colorClass}`}>
              {modulo}
            </Badge>
          )
        },
      },

      // Descripción (truncada, sin HTML)
      {
        id: "descripcion",
        header: "Descripción",
        cell: ({ row }) => {
          const desc = row.original.descripcion
          if (!desc) return <span className="text-sm text-muted-foreground">—</span>
          const plain = desc.replace(/<[^>]*>/g, "")
          return (
            <p className="max-w-[300px] truncate text-sm text-muted-foreground" title={plain}>
              {plain}
            </p>
          )
        },
      },

      // Recurso (enlace o archivo)
      {
        id: "recurso",
        header: "Recurso",
        cell: ({ row }) => {
          const { enlace, ruta } = row.original
          if (enlace) {
            return (
              <a
                href={enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Enlace
              </a>
            )
          }
          if (ruta) {
            return (
              <a
                href={ruta}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                <Download className="w-3.5 h-3.5" />
                Archivo
              </a>
            )
          }
          return <span className="text-sm text-muted-foreground">—</span>
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
          const f = row.original
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
                    setSelectedFormacion(f)
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
                    setSelectedFormacion(f)
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
          <h1 className="text-2xl font-bold text-foreground">Formación</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona los recursos de formación del sitio
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={formaciones}
        searchPlaceholder="Buscar por título, descripción o módulo..."
        createButtonText="Nuevo Recurso"
        onCreateClick={() => setCreateDialogOpen(true)}
        dateColumnId="createdDate"
        showDateRangeFilter
      />

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
