// src/features/noticias/components/NoticiaManagement.tsx
"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable, createSortableColumn } from "@/src/components/data-table"
import { useNoticias, useNoticiaForm } from "@/src/features/noticias/hook/use-noticias"
import { NoticiaDetailDialog } from "./NoticiaDetailDialog"
import { Noticia, getTipoColor, getTagColor } from "@/src/features/noticias/model/types"
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
  CalendarDays,
  Edit,
  Eye,
  MoreHorizontal,
  Newspaper,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react"

export function NoticiaManagement() {
  const router = useRouter()

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const handleSearch = (val: string) => {
    setSearch(val)
    clearTimeout((handleSearch as any)._t)
    ;(handleSearch as any)._t = setTimeout(() => setDebouncedSearch(val), 400)
  }

  const { noticias, loading, refetch } = useNoticias(debouncedSearch)
  const { remove } = useNoticiaForm()

  const [deleteNoticia, setDeleteNoticia] = useState<Noticia | null>(null)
  const [detailNoticia, setDetailNoticia] = useState<Noticia | null>(null)

  const handleDelete = async () => {
    if (!deleteNoticia) return
    await remove(deleteNoticia.id, refetch)
    setDeleteNoticia(null)
  }

  const columns = useMemo<ColumnDef<Noticia>[]>(
    () => [
      {
        id: "imagen",
        header: "Imagen",
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() => setDetailNoticia(row.original)}
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
                <Newspaper className="w-5 h-5 text-muted-foreground/40" />
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
            onClick={() => setDetailNoticia(row.original)}
            className="text-left transition-opacity max-w-65 hover:opacity-70"
            title="Ver detalles"
          >
            <div className="flex items-center gap-1.5">
              {row.original.destacada && (
                <Star className="w-3.5 h-3.5 shrink-0 fill-amber-400 text-amber-400" />
              )}
              <p className="text-sm font-medium line-clamp-1">{row.original.titulo}</p>
            </div>
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
        id: "tipo",
        header: "Tipo",
        cell: ({ row }) => (
          <Badge
            variant="outline"
            className={`text-xs px-2 py-0.5 ${getTipoColor(row.original.tipo)}`}
          >
            {row.original.tipo}
          </Badge>
        ),
      },
      {
        id: "etiquetas",
        header: "Etiquetas",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1 max-w-50">
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
              <DropdownMenuItem onClick={() => setDetailNoticia(row.original)}>
                <Eye className="w-4 h-4 mr-2" />
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`/admin/noticias/${row.original.id}/edit`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setDeleteNoticia(row.original)}
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
          <h1 className="text-2xl font-bold">Noticias</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona las noticias publicadas en el sitio web
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => router.push("/admin/noticias/new")}>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Noticia
          </Button>
        </div>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={noticias} isLoading={loading} />

      {/* Detail Dialog */}
      <NoticiaDetailDialog
        open={!!detailNoticia}
        onOpenChange={(v) => !v && setDetailNoticia(null)}
        noticia={detailNoticia}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteNoticia} onOpenChange={(v) => !v && setDeleteNoticia(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar noticia?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la noticia{" "}
              <strong>"{deleteNoticia?.titulo}"</strong>. Esta acción no se puede deshacer.
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
