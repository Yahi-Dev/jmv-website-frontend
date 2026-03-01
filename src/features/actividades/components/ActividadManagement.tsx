// src/features/actividades/components/ActividadManagement.tsx
"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable, createSortableColumn } from "@/src/components/data-table"
import { useActividades, useActividadForm } from "@/src/features/actividades/hook/use-actividades"
import { ActividadDetailDialog } from "./ActividadDetailDialog"
import { ActividadJmv, getTagColor } from "@/src/features/actividades/model/types"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog"
import {
  Activity,
  CalendarDays,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react"

export function ActividadManagement() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const handleSearch = (val: string) => {
    setSearch(val)
    clearTimeout((handleSearch as any)._t)
    ;(handleSearch as any)._t = setTimeout(() => setDebouncedSearch(val), 400)
  }

  const { actividades, loading, refetch } = useActividades(debouncedSearch)
  const { remove } = useActividadForm()

  const [deleteActividad, setDeleteActividad] = useState<ActividadJmv | null>(null)
  const [detailActividad, setDetailActividad] = useState<ActividadJmv | null>(null)

  const handleDelete = async () => {
    if (!deleteActividad) return
    await remove(deleteActividad.id, refetch)
    setDeleteActividad(null)
  }

  const columns = useMemo<ColumnDef<ActividadJmv>[]>(
    () => [
      {
        id: "imagen",
        header: "Imagen",
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() => setDetailActividad(row.original)}
            className="w-16 h-10 overflow-hidden transition-opacity rounded cursor-pointer bg-muted shrink-0 hover:opacity-80"
            title="Ver detalles"
          >
            {row.original.imagenUrl ? (
              <img
                src={row.original.imagenUrl}
                alt={row.original.titulo}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-muted">
                <Activity className="w-5 h-5 text-muted-foreground/40" />
              </div>
            )}
          </button>
        ),
      },
      {
        ...createSortableColumn("titulo", "Título"),
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() => setDetailActividad(row.original)}
            className="text-left transition-opacity max-w-60 hover:opacity-70"
            title="Ver detalles"
          >
            <p className="text-sm font-medium line-clamp-1">{row.original.titulo}</p>
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              {row.original.resumen}
            </p>
          </button>
        ),
      },
      {
        id: "fecha",
        header: "Fecha",
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground whitespace-nowrap">
            <CalendarDays className="w-3.5 h-3.5 shrink-0" />
            {new Date(row.original.fecha).toLocaleDateString("es-DO", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        ),
      },
      {
        id: "centro",
        header: "Centro",
        cell: ({ row }) =>
          row.original.centro ? (
            <Badge variant="outline" className="text-xs px-2 py-0.5 bg-primary/10 text-primary border-primary/20 whitespace-nowrap">
              {row.original.centro.nombreParroquia}
            </Badge>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          ),
      },
      {
        id: "etiquetas",
        header: "Etiquetas",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1 max-w-48">
            {row.original.etiquetas.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={`text-xs px-1.5 py-0.5 ${getTagColor(tag)}`}
              >
                {tag}
              </Badge>
            ))}
            {row.original.etiquetas.length > 3 && (
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                +{row.original.etiquetas.length - 3}
              </Badge>
            )}
          </div>
        ),
      },
      {
        id: "acciones",
        header: "",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setDetailActividad(row.original)}>
                <Eye className="w-4 h-4 mr-2" />
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`/admin/actividades/${row.original.id}/edit`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setDeleteActividad(row.original)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [router]
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Actividades</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona las actividades de los centros
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => router.push("/admin/actividades/new")}>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Actividad
          </Button>
        </div>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={actividades} isLoading={loading} />

      {/* Detail Dialog */}
      <ActividadDetailDialog
        open={!!detailActividad}
        onOpenChange={(v) => !v && setDetailActividad(null)}
        actividad={detailActividad}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteActividad} onOpenChange={(v) => !v && setDeleteActividad(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar actividad?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la actividad{" "}
              <strong>"{deleteActividad?.titulo}"</strong>. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="text-white bg-destructive hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
