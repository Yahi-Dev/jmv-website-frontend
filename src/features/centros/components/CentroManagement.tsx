// src/features/centros/components/CentroManagement.tsx
"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable, createSortableColumn } from "@/src/components/data-table"
import { useCentros, useCentroForm } from "../hook/use-centros"
import { CentroJmv, getTagColor } from "../model/types"
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
  Building2,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react"

export function CentroManagement() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const handleSearch = (val: string) => {
    setSearch(val)
    clearTimeout((handleSearch as any)._t)
    ;(handleSearch as any)._t = setTimeout(() => setDebouncedSearch(val), 400)
  }

  const { centros, loading, refetch } = useCentros(debouncedSearch)
  const { remove } = useCentroForm()

  const [deleteCentro, setDeleteCentro] = useState<CentroJmv | null>(null)

  const handleDelete = async () => {
    if (!deleteCentro) return
    await remove(deleteCentro.id, refetch)
    setDeleteCentro(null)
  }

  const columns = useMemo<ColumnDef<CentroJmv>[]>(
    () => [
      {
        id: "imagen",
        header: "Imagen",
        cell: ({ row }) => (
          <div className="w-16 h-10 overflow-hidden rounded bg-muted shrink-0">
            {row.original.imagenUrl ? (
              <img
                src={row.original.imagenUrl}
                alt={row.original.nombreParroquia}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-muted">
                <Building2 className="w-5 h-5 text-muted-foreground/40" />
              </div>
            )}
          </div>
        ),
      },
      {
        ...createSortableColumn("nombreParroquia", "Parroquia"),
        cell: ({ row }) => (
          <div className="max-w-56">
            <p className="text-sm font-medium line-clamp-1">{row.original.nombreParroquia}</p>
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{row.original.ubicacion}</p>
          </div>
        ),
      },
      {
        id: "coordinadora",
        header: "Coordinadora",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">{row.original.nombreCoordinadora}</span>
        ),
      },
      {
        id: "conteos",
        header: "Comunidades / Miembros",
        cell: ({ row }) => (
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {row.original._count?.comunidades ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {row.original.cantidadMiembrosActivos}
            </span>
          </div>
        ),
      },
      {
        id: "etiquetas",
        header: "Etiquetas",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1 max-w-44">
            {row.original.etiquetas.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className={`text-xs px-1.5 py-0.5 ${getTagColor(tag)}`}>
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
              <DropdownMenuItem onClick={() => router.push(`/admin/centros/${row.original.id}`)}>
                <Eye className="w-4 h-4 mr-2" />
                Ver detalle
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/admin/centros/${row.original.id}/edit`)}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setDeleteCentro(row.original)}
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Centros</h1>
          <p className="text-sm text-muted-foreground">Gestiona los centros parroquiales</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => router.push("/admin/centros/new")}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Centro
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={centros} isLoading={loading} />

      <AlertDialog open={!!deleteCentro} onOpenChange={(v) => !v && setDeleteCentro(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar centro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el centro <strong>"{deleteCentro?.nombreParroquia}"</strong>{" "}
              junto con todos sus miembros, comunidades y actividades. Esta acción no se puede deshacer.
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
