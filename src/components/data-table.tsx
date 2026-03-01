"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type FilterFn,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  ChevronDown,
  Plus,
  Search,
  Eye,
  EyeOff,
  Settings2,
  Calendar as CalendarIcon,
  X,
} from "lucide-react"
import { Button } from "@/src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/src/components/ui/dropdown-menu"
import { Input } from "@/src/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Separator } from "@/src/components/ui/separator"
import { Popover, PopoverTrigger, PopoverContent } from "@/src/components/ui/popover"
import { Calendar } from "@/src/components/ui/calendar"
import { cn } from "@/src/lib/utils"
import { type DateRange } from "react-day-picker"

// JMV Project Colors
const COLORS = {
  primary: "#3d52d5",   // Deep blue – JMV primary
  secondary: "#15A3EF", // Vibrant blue – JMV secondary
  dark: "#404040",      // Dark gray for text
  light: "#737373",     // Muted gray
  white: "#FFFFFF",
  black: "#000000",
}

// ── Filtros ──────────────────────────────────────────────────────────────────

const globalFilterFn: FilterFn<unknown> = (row, _columnId, filterValue: string) => {
  const search = (filterValue ?? "").toLowerCase()
  if (!search) return true
  const original = row.original
  if (typeof original !== "object" || original === null) return false
  return Object.values(original).some((v) => {
    if (v == null) return false
    return String(v).toLowerCase().includes(search)
  })
}

const dateBetween: FilterFn<unknown> = (
  row,
  columnId,
  value: { from?: Date; to?: Date } | undefined
) => {
  if (!value || (!value.from && !value.to)) return true
  const raw = row.getValue(columnId)
  if (!raw) return false
  const d = new Date(raw as string)
  if (isNaN(d.getTime())) return false

  const start = value.from ? new Date(value.from) : undefined
  const end = value.to ? new Date(value.to) : undefined

  if (start) {
    start.setHours(0, 0, 0, 0)
    if (d < start) return false
  }
  if (end) {
    end.setHours(23, 59, 59, 999)
    if (d > end) return false
  }
  return true
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchPlaceholder?: string
  createButtonText?: string
  onCreateClick?: () => void
  showCreateButton?: boolean
  showColumnToggle?: boolean
  showPagination?: boolean
  title?: string
  description?: string
  onRowClick?: (row: TData) => void
  dateColumnId?: string
  showDateRangeFilter?: boolean
}

// ── Component ─────────────────────────────────────────────────────────────────

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Buscar...",
  createButtonText = "Crear",
  onCreateClick,
  showCreateButton = true,
  showColumnToggle = true,
  showPagination = true,
  title,
  description,
  onRowClick,
  dateColumnId,
  showDateRangeFilter = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined)

  // Inyectar filterFn de fecha si hay dateColumnId
  const derivedColumns = React.useMemo((): ColumnDef<TData, TValue>[] => {
    if (!dateColumnId) return columns
    return columns.map((col) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const def = col as any
      const id = def.id ?? def.accessorKey
      if (id === dateColumnId) {
        return { ...def, filterFn: dateBetween as FilterFn<TData> } as ColumnDef<TData, TValue>
      }
      return col
    })
  }, [columns, dateColumnId])

  const table = useReactTable({
    data,
    columns: derivedColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalFilterFn as FilterFn<TData>,
    filterFns: { dateBetween: dateBetween as FilterFn<TData> },
    state: { sorting, columnFilters, columnVisibility, rowSelection, globalFilter },
  })

  React.useEffect(() => {
    if (!dateColumnId) return
    const col = table.getColumn(dateColumnId)
    if (!col) return
    const hasRange = dateRange?.from || dateRange?.to
    col.setFilterValue(hasRange ? { ...dateRange } : undefined)
  }, [dateRange, dateColumnId, table])

  const totalRows = table.getFilteredRowModel().rows.length
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()

  const formatDate = (d?: Date) => {
    if (!d) return ""
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`
  }

  return (
    <div className="w-full space-y-6">
      {/* Title / description */}
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.dark }}>
              {title}
            </h2>
          )}
          {description && <p style={{ color: COLORS.light }}>{description}</p>}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        {/* Left: search + date filter + stats */}
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {/* Global search */}
          <div className="relative min-w-[220px] max-w-sm flex-1">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: COLORS.light }}
            />
            <Input
              placeholder={searchPlaceholder}
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(String(e.target.value))}
              className="pl-10 bg-white border-gray-300"
              style={{ color: COLORS.dark }}
            />
          </div>

          {/* Date range filter */}
          {showDateRangeFilter && dateColumnId && (
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal border-gray-300",
                      !dateRange?.from && !dateRange?.to && "text-muted-foreground"
                    )}
                    style={{ color: COLORS.dark }}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from || dateRange?.to ? (
                      <span>
                        {dateRange?.from ? formatDate(dateRange.from) : "…"} —{" "}
                        {dateRange?.to ? formatDate(dateRange.to) : "…"}
                      </span>
                    ) : (
                      <span>Rango de fechas</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={(range: DateRange | undefined) => setDateRange(range)}
                    numberOfMonths={2}
                    initialFocus
                  />
                  <div className="flex items-center justify-between border-t border-gray-200 p-2">
                    <span className="text-xs" style={{ color: COLORS.light }}>
                      Filtrar por fecha
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDateRange(undefined)}
                      className="hover:bg-gray-100"
                      style={{ color: COLORS.dark }}
                    >
                      <X className="mr-1 h-4 w-4" /> Limpiar
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {(dateRange?.from || dateRange?.to) && (
                <Badge
                  variant="secondary"
                  className="gap-1"
                  style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
                >
                  {dateRange?.from ? formatDate(dateRange.from) : "…"} —{" "}
                  {dateRange?.to ? formatDate(dateRange.to) : "…"}
                </Badge>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="hidden items-center space-x-3 md:flex">
            <Badge
              variant="secondary"
              style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
            >
              {totalRows} registros
            </Badge>
          </div>
        </div>

        {/* Right: column toggle + create button */}
        <div className="flex items-center space-x-2">
          {showColumnToggle && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-gray-300"
                  style={{ color: COLORS.dark }}
                >
                  <Settings2 className="mr-2 h-4 w-4" />
                  Columnas
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 border-gray-200">
                <DropdownMenuLabel style={{ color: COLORS.dark }}>
                  Mostrar columnas
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                {table
                  .getAllColumns()
                  .filter((col) => col.getCanHide())
                  .map((col) => {
                    const visible = col.getIsVisible()
                    return (
                      <DropdownMenuCheckboxItem
                        key={col.id}
                        className="capitalize hover:bg-gray-100"
                        style={{ color: COLORS.dark }}
                        checked={visible}
                        onCheckedChange={(v) => col.toggleVisibility(!!v)}
                      >
                        <div className="flex items-center space-x-2">
                          {visible ? (
                            <Eye className="h-4 w-4" style={{ color: COLORS.dark }} />
                          ) : (
                            <EyeOff className="h-4 w-4" style={{ color: COLORS.light }} />
                          )}
                          <span>{col.id}</span>
                        </div>
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {showCreateButton && onCreateClick && (
            <Button
              onClick={onCreateClick}
              className="shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
            >
              <Plus className="mr-2 h-4 w-4" />
              {createButtonText}
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <Card className="border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow
                  key={hg.id}
                  className="border-b border-gray-200"
                  style={{ backgroundColor: `${COLORS.primary}18` }}
                >
                  {hg.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="font-semibold"
                      style={{ color: COLORS.dark }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "transition-colors border-b border-gray-200 bg-white hover:bg-gray-50",
                      onRowClick && "cursor-pointer hover:bg-gray-100"
                    )}
                    onClick={(e) => {
                      if (
                        (e.target as HTMLElement).closest('button, a, [role="button"]')
                      )
                        return
                      onRowClick?.(row.original)
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="py-4"
                        style={{ color: COLORS.dark }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={derivedColumns.length}
                    className="h-32 text-center"
                  >
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="rounded-full bg-gray-100 p-3">
                        <Search className="h-6 w-6" style={{ color: COLORS.light }} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium" style={{ color: COLORS.dark }}>
                          No se encontraron resultados
                        </p>
                        <p className="text-sm" style={{ color: COLORS.light }}>
                          Intenta ajustar la búsqueda o los filtros
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      {showPagination && (
        <Card className="border-gray-200 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex items-center space-x-4 text-sm" style={{ color: COLORS.dark }}>
                <div className="flex items-center space-x-2">
                  <span>Mostrando</span>
                  <Badge
                    variant="outline"
                    className="font-mono border-gray-300"
                    style={{ color: COLORS.dark }}
                  >
                    {table.getRowModel().rows.length}
                  </Badge>
                  <span>de</span>
                  <Badge
                    variant="outline"
                    className="font-mono border-gray-300"
                    style={{ color: COLORS.dark }}
                  >
                    {totalRows}
                  </Badge>
                  <span>registros</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div
                  className="flex items-center space-x-1 text-sm"
                  style={{ color: COLORS.dark }}
                >
                  <span>Página</span>
                  <Badge
                    variant="outline"
                    className="font-mono border-gray-300"
                    style={{ color: COLORS.dark }}
                  >
                    {currentPage}
                  </Badge>
                  <span>de</span>
                  <Badge
                    variant="outline"
                    className="font-mono border-gray-300"
                    style={{ color: COLORS.dark }}
                  >
                    {totalPages}
                  </Badge>
                </div>

                <Separator orientation="vertical" className="h-4 bg-gray-300" />

                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    className="border-gray-300 hover:bg-gray-100"
                    style={{ color: COLORS.dark }}
                  >
                    Primera
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="border-gray-300 hover:bg-gray-100"
                    style={{ color: COLORS.dark }}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="border-gray-300 hover:bg-gray-100"
                    style={{ color: COLORS.dark }}
                  >
                    Siguiente
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    className="border-gray-300 hover:bg-gray-100"
                    style={{ color: COLORS.dark }}
                  >
                    Última
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// ── Helper: columna ordenable ─────────────────────────────────────────────────

export function createSortableColumn<T>(
  accessorKey: keyof T,
  header: string
): ColumnDef<T> {
  return {
    accessorKey: accessorKey as string,
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={cn(
            "h-auto p-2 font-semibold justify-start hover:bg-gray-100",
            isSorted && "bg-gray-100"
          )}
          style={{ color: isSorted ? COLORS.primary : COLORS.dark }}
        >
          {header}
          <ArrowUpDown
            className={cn(
              "ml-2 h-4 w-4 transition-transform",
              isSorted === "asc" && "rotate-180"
            )}
            style={{ color: isSorted ? COLORS.primary : COLORS.dark }}
          />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="ml-2 font-medium" style={{ color: COLORS.dark }}>
        {row.getValue(accessorKey as string)}
      </div>
    ),
  }
}
