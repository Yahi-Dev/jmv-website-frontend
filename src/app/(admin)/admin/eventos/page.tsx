// src/app/(admin)/admin/eventos/page.tsx
"use client"

import { useMemo, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable, createSortableColumn } from "@/src/components/data-table"
import { useEventos, useEventoForm } from "@/src/features/eventos/hook/use-eventos"
import { EventoFormDialog } from "@/src/features/eventos/components/EventoFormDialog"
import { EventoDetailDialog } from "@/src/features/eventos/components/EventoDetailDialog"
import { Evento, getTagColor, EventoFormData } from "@/src/features/eventos/model/types"
import { EventoCreateData } from "@/src/features/eventos/schema/validation"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
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
  CalendarDays,
  Edit,
  Eye,
  MapPin,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react"

export default function EventosAdminPage() {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Debounce search
  const handleSearch = (val: string) => {
    setSearch(val)
    clearTimeout((handleSearch as any)._t)
    ;(handleSearch as any)._t = setTimeout(() => setDebouncedSearch(val), 400)
  }

  const { eventos, loading, refetch } = useEventos(debouncedSearch)
  const { isLoading, create, update, remove } = useEventoForm()

  const [formOpen, setFormOpen] = useState(false)
  const [editEvento, setEditEvento] = useState<Evento | undefined>(undefined)
  const [deleteEvento, setDeleteEvento] = useState<Evento | null>(null)
  const [detailEvento, setDetailEvento] = useState<Evento | null>(null)

  const handleSubmit = async (data: EventoFormData) => {
    if (editEvento) {
      await update(editEvento.id, data as any, refetch)
    } else {
      await create(data as EventoCreateData, refetch)
    }
    setFormOpen(false)
    setEditEvento(undefined)
  }

  const handleEdit = (evento: Evento) => {
    setEditEvento(evento)
    setFormOpen(true)
  }

  const handleDelete = async () => {
    if (!deleteEvento) return
    await remove(deleteEvento.id, refetch)
    setDeleteEvento(null)
  }

  const columns = useMemo<ColumnDef<Evento>[]>(
    () => [
      {
        id: "imagen",
        header: "Imagen",
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() => setDetailEvento(row.original)}
            className="w-16 h-10 overflow-hidden rounded bg-muted shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
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
                <CalendarDays className="w-5 h-5 text-muted-foreground/40" />
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
            onClick={() => setDetailEvento(row.original)}
            className="max-w-65 text-left hover:opacity-70 transition-opacity"
            title="Ver detalles"
          >
            <p className="text-sm font-medium line-clamp-1">{row.original.titulo}</p>
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              {row.original.descripcionBreve}
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
        id: "ubicacion",
        header: "Ubicación",
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground max-w-[180px]">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="line-clamp-1">{row.original.ubicacion}</span>
          </div>
        ),
      },
      {
        id: "etiquetas",
        header: "Etiquetas",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1 max-w-[200px]">
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
              <DropdownMenuItem onClick={() => setDetailEvento(row.original)}>
                <Eye className="w-4 h-4 mr-2" />
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(row.original)}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setDeleteEvento(row.original)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Eventos</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona los eventos publicados en el sitio web
          </p>
        </div>
        <Button
          onClick={() => {
            setEditEvento(undefined)
            setFormOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Evento
        </Button>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={eventos} isLoading={loading} />

      {/* Detail Dialog */}
      <EventoDetailDialog
        open={!!detailEvento}
        onOpenChange={(v) => !v && setDetailEvento(null)}
        evento={detailEvento}
      />

      {/* Form Dialog */}
      <EventoFormDialog
        open={formOpen}
        onOpenChange={(v) => {
          setFormOpen(v)
          if (!v) setEditEvento(undefined)
        }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        initialData={editEvento}
        mode={editEvento ? "edit" : "create"}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteEvento} onOpenChange={(v) => !v && setDeleteEvento(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar evento?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el evento{" "}
              <strong>"{deleteEvento?.titulo}"</strong>. Esta acción no se puede deshacer.
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
