"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import {
  ArrowLeft,
  CalendarDays,
  Crown,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Settings,
  Trash2,
  UserRound,
  Users,
} from "lucide-react"

import { DataTable, createSortableColumn } from "@/src/components/data-table"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"

import { useConsejoActual, useConsejosHistoricos } from "@/src/features/consejos/hook/use-consejos"
import { useConsejoForm, useMiembroForm } from "@/src/features/consejos/hook/use-consejo-form"
import { ConsejoFormDialog } from "@/src/features/consejos/components/ConsejoFormDialog"
import { MiembroFormDialog } from "@/src/features/consejos/components/MiembroFormDialog"
import { MiembroDetailDialog } from "@/src/features/consejos/components/MiembroDetailDialog"
import {
  ConsejoNacional,
  MiembroConsejo,
  ConsejoFormData,
  MiembroFormData,
  CARGO_LABELS,
  CargoConsejo,
} from "@/src/features/consejos/model/types"

// ── Color map for cargo badges ────────────────────────────────────────────────
const CARGO_COLORS: Record<CargoConsejo, string> = {
  [CargoConsejo.CoordinadorNacional]: "bg-primary/10 text-primary border-primary/20",
  [CargoConsejo.SecretarioNacional]: "bg-emerald-100 text-emerald-700 border-emerald-200",
  [CargoConsejo.TesoreroNacional]: "bg-amber-100 text-amber-700 border-amber-200",
  [CargoConsejo.VocalDeFormacion]: "bg-blue-100 text-blue-700 border-blue-200",
  [CargoConsejo.VocalDeMisionYCaridad]: "bg-rose-100 text-rose-700 border-rose-200",
  [CargoConsejo.VocalLiturgiaYMariana]: "bg-purple-100 text-purple-700 border-purple-200",
  [CargoConsejo.VocalDeExpansion]: "bg-orange-100 text-orange-700 border-orange-200",
  [CargoConsejo.VocalDePrejuveniles]: "bg-cyan-100 text-cyan-700 border-cyan-200",
  [CargoConsejo.VocalDeCulturaYRecreacion]: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("es-DO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// ─────────────────────────────────────────────────────────────────────────────

export default function AdminConsejosPage() {
  const router = useRouter()

  // ── Top-level data (single source of truth) ───────────────────────────────
  const {
    consejo,
    loading: loadingActual,
    isEmpty,
    refetch: refetchActual,
  } = useConsejoActual()

  const {
    consejos: historicos,
    loading: loadingHistoricos,
    refetch: refetchHistoricos,
  } = useConsejosHistoricos()

  // ── Mutation hooks ────────────────────────────────────────────────────────
  const {
    create: createConsejo,
    update: updateConsejo,
    remove: deleteConsejo,
    isLoading: consejoMutating,
  } = useConsejoForm()

  const {
    create: createMiembro,
    update: updateMiembro,
    remove: deleteMiembro,
    isLoading: miembroMutating,
  } = useMiembroForm()

  // ── Dialog state ──────────────────────────────────────────────────────────
  const [consejoFormOpen, setConsejoFormOpen] = useState(false)
  const [editingConsejo, setEditingConsejo] = useState<ConsejoNacional | null>(null)

  const [miembroFormOpen, setMiembroFormOpen] = useState(false)
  const [editingMiembro, setEditingMiembro] = useState<MiembroConsejo | null>(null)

  const [deleteMiembroTarget, setDeleteMiembroTarget] = useState<MiembroConsejo | null>(null)
  const [deleteConsejoTarget, setDeleteConsejoTarget] = useState<ConsejoNacional | null>(null)
  const [detailMiembro, setDetailMiembro] = useState<MiembroConsejo | null>(null)

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleCreateConsejo = async (data: ConsejoFormData) => {
    await createConsejo(data)
    await refetchActual()
    await refetchHistoricos()
    setConsejoFormOpen(false)
    setEditingConsejo(null)
  }

  const handleUpdateConsejo = async (data: ConsejoFormData) => {
    if (!editingConsejo) return
    await updateConsejo(editingConsejo.id, data)
    await refetchActual()
    await refetchHistoricos()
    setConsejoFormOpen(false)
    setEditingConsejo(null)
  }

  const handleDeleteConsejo = async () => {
    if (!deleteConsejoTarget) return
    await deleteConsejo(deleteConsejoTarget.id)
    await refetchActual()
    await refetchHistoricos()
    setDeleteConsejoTarget(null)
  }

  const handleCreateMiembro = async (data: MiembroFormData) => {
    if (!consejo) return
    await createMiembro({ ...data, consejoId: consejo.id })
    await refetchActual()
    setMiembroFormOpen(false)
    setEditingMiembro(null)
  }

  const handleUpdateMiembro = async (data: MiembroFormData) => {
    if (!editingMiembro) return
    await updateMiembro(editingMiembro.id, data)
    await refetchActual()
    setMiembroFormOpen(false)
    setEditingMiembro(null)
  }

  const handleDeleteMiembro = async () => {
    if (!deleteMiembroTarget) return
    await deleteMiembro(deleteMiembroTarget.id)
    await refetchActual()
    setDeleteMiembroTarget(null)
  }

  // ── Members DataTable columns ─────────────────────────────────────────────
  const miembroColumns: ColumnDef<MiembroConsejo>[] = useMemo(
    () => [
      // Foto + Nombre
      {
        id: "nombre",
        header: "Miembro",
        cell: ({ row }) => {
          const m = row.original
          return (
            <div className="flex items-center gap-3">
              <Avatar className="size-9 shrink-0 ring-2 ring-primary/10">
                <AvatarImage src={m.fotoUrl || m.user?.image || "/logo_dominicano.png"} alt={m.nombre} />
                <AvatarFallback>
                  <UserRound className="w-4 h-4 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{m.nombre}</span>
            </div>
          )
        },
      },

      // Cargo
      {
        id: "cargo",
        header: "Cargo",
        cell: ({ row }) => (
          <Badge
            variant="secondary"
            className={`border text-xs ${CARGO_COLORS[row.original.cargo]}`}
          >
            {CARGO_LABELS[row.original.cargo]}
          </Badge>
        ),
      },

      // Ciudad
      {
        id: "ciudad",
        header: "Ciudad",
        cell: ({ row }) =>
          row.original.ciudad ? (
            <span className="text-sm">{row.original.ciudad}</span>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          ),
      },

      // Estado
      {
        id: "estado",
        header: "Estado",
        cell: ({ row }) => (
          <Badge variant="outline" className="text-xs">
            {row.original.estado}
          </Badge>
        ),
      },

      // Acciones
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const m = row.original
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
                <DropdownMenuItem onClick={() => setDetailMiembro(m)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Ver detalle
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setEditingMiembro(m)
                    setMiembroFormOpen(true)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-700 focus:bg-red-50"
                  onClick={() => setDeleteMiembroTarget(m)}
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

  // ── Historial DataTable columns ───────────────────────────────────────────
  const historialColumns: ColumnDef<ConsejoNacional>[] = useMemo(
    () => [
      // Periodo
      createSortableColumn<ConsejoNacional>("periodo", "Período"),

      // Coordinador
      {
        id: "coordinador",
        header: "Coordinador/a",
        cell: ({ row }) => {
          const coord = row.original.miembros.find(
            (m) => m.cargo === CargoConsejo.CoordinadorNacional
          )
          return coord ? (
            <div className="flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="text-sm">{coord.nombre}</span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          )
        },
      },

      // # Miembros
      {
        id: "miembros",
        header: "Miembros",
        cell: ({ row }) => (
          <Badge variant="outline" className="gap-1">
            <Users className="w-3 h-3" />
            {row.original.miembros.length}
          </Badge>
        ),
      },

      // Fecha Inicio
      {
        id: "fechaInicio",
        header: "Inicio",
        cell: ({ row }) => (
          <span className="text-sm">{formatDate(row.original.fechaInicio)}</span>
        ),
      },

      // Fecha Fin
      {
        id: "fechaFin",
        header: "Fin",
        cell: ({ row }) =>
          row.original.fechaFin ? (
            <span className="text-sm">{formatDate(row.original.fechaFin)}</span>
          ) : (
            <span className="text-xs text-muted-foreground">Vigente</span>
          ),
      },

      // Estado
      {
        id: "isActual",
        header: "Estado",
        cell: ({ row }) =>
          row.original.isActual ? (
            <Badge className="bg-green-100 text-green-700 border border-green-200 hover:bg-green-100 text-xs">
              Actual
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-xs">
              Histórico
            </Badge>
          ),
      },

      // Acciones
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const c = row.original
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
                <DropdownMenuItem onClick={() => router.push(`/admin/consejos/${c.id}`)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Ver detalle
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setEditingConsejo(c)
                    setConsejoFormOpen(true)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-700 focus:bg-red-50"
                  onClick={() => setDeleteConsejoTarget(c)}
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

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Consejo Nacional</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona el consejo nacional y sus miembros
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="actual" className="w-full">
        <TabsList className="grid w-full max-w-sm grid-cols-2">
          <TabsTrigger value="actual">
            <Settings className="w-4 h-4 mr-2" />
            Consejo Actual
          </TabsTrigger>
          <TabsTrigger value="historial">
            <CalendarDays className="w-4 h-4 mr-2" />
            Historial
          </TabsTrigger>
        </TabsList>

        {/* ── Tab: Consejo Actual ────────────────────────────────────────────── */}
        <TabsContent value="actual" className="mt-6 space-y-6">
          {loadingActual ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : isEmpty || !consejo ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl border-muted-foreground/20">
              <div className="p-4 rounded-full bg-muted mb-4">
                <Users className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-semibold mb-1">No hay consejo actual</h3>
              <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
                Crea el primer consejo nacional para comenzar a registrar los miembros.
              </p>
              <Button
                onClick={() => {
                  setEditingConsejo(null)
                  setConsejoFormOpen(true)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear Primer Consejo
              </Button>
            </div>
          ) : (
            <>
              {/* Consejo info card */}
              <div className="p-5 border rounded-xl bg-linear-to-r from-primary/5 to-secondary/5 border-primary/20">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold">{consejo.periodo}</h2>
                      {consejo.isActual && (
                        <Badge className="bg-green-100 text-green-700 border border-green-200 hover:bg-green-100 text-xs">
                          Activo
                        </Badge>
                      )}
                    </div>
                    {consejo.lema && (
                      <p className="text-sm italic text-muted-foreground">
                        &ldquo;{consejo.lema}&rdquo;
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {formatDate(consejo.fechaInicio)}
                      {consejo.fechaFin ? ` — ${formatDate(consejo.fechaFin)}` : " — Vigente"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingConsejo(consejo)
                        setConsejoFormOpen(true)
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar Consejo
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditingMiembro(null)
                        setMiembroFormOpen(true)
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Miembro
                    </Button>
                  </div>
                </div>
              </div>

              {/* Members DataTable */}
              <DataTable
                columns={miembroColumns}
                data={consejo.miembros}
                searchPlaceholder="Buscar por nombre, cargo, ciudad..."
              />
            </>
          )}
        </TabsContent>

        {/* ── Tab: Historial ─────────────────────────────────────────────────── */}
        <TabsContent value="historial" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Historial de Consejos</h2>
              <p className="text-sm text-muted-foreground">
                Todos los períodos registrados del consejo nacional
              </p>
            </div>
            {!consejo && (
              <Button
                size="sm"
                onClick={() => {
                  setEditingConsejo(null)
                  setConsejoFormOpen(true)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Consejo
              </Button>
            )}
          </div>

          {loadingHistoricos ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <DataTable
              columns={historialColumns}
              data={historicos}
              searchPlaceholder="Buscar por período, coordinador..."
            />
          )}
        </TabsContent>
      </Tabs>

      {/* ── Dialogs ─────────────────────────────────────────────────────────── */}

      {/* Consejo Form */}
      <ConsejoFormDialog
        open={consejoFormOpen}
        onOpenChange={(open) => {
          setConsejoFormOpen(open)
          if (!open) setEditingConsejo(null)
        }}
        onSubmit={editingConsejo ? handleUpdateConsejo : handleCreateConsejo}
        isLoading={consejoMutating}
        initialData={editingConsejo || undefined}
        mode={editingConsejo ? "edit" : "create"}
      />

      {/* Miembro Form */}
      <MiembroFormDialog
        open={miembroFormOpen}
        onOpenChange={(open) => {
          setMiembroFormOpen(open)
          if (!open) setEditingMiembro(null)
        }}
        onSubmit={editingMiembro ? handleUpdateMiembro : handleCreateMiembro}
        isLoading={miembroMutating}
        initialData={editingMiembro || undefined}
        mode={editingMiembro ? "edit" : "create"}
        consejoId={consejo?.id}
      />

      {/* Miembro Detail */}
      <MiembroDetailDialog
        open={!!detailMiembro}
        onOpenChange={(open) => { if (!open) setDetailMiembro(null) }}
        miembro={detailMiembro}
      />

      {/* Delete Miembro Confirm */}
      <AlertDialog
        open={!!deleteMiembroTarget}
        onOpenChange={(open) => { if (!open) setDeleteMiembroTarget(null) }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar miembro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente a{" "}
              <strong>{deleteMiembroTarget?.nombre}</strong> del consejo. Esta acción
              no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              onClick={handleDeleteMiembro}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Consejo Confirm */}
      <AlertDialog
        open={!!deleteConsejoTarget}
        onOpenChange={(open) => { if (!open) setDeleteConsejoTarget(null) }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar consejo?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente el consejo{" "}
              <strong>{deleteConsejoTarget?.periodo}</strong> y todos sus miembros.
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              onClick={handleDeleteConsejo}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
