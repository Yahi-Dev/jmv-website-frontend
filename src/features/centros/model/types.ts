// src/features/centros/model/types.ts

export interface MiembroCentroJmv {
  id: number
  centroId: number
  nombre: string
  imagenUrl: string
  descripcion: string
  cargo: string
  createdDate: Date | string
  createdById?: string | null
  modifiedDate?: Date | string | null
  modifiedById?: string | null
}

export interface ComunidadJmv {
  id: number
  centroId: number
  nombre: string
  imagenUrl: string
  cantidadMiembros: number
  inicioDate: Date | string
  etapa: string
  etiquetas: string[]
  createdDate: Date | string
  createdById?: string | null
  modifiedDate?: Date | string | null
  modifiedById?: string | null
}

export interface CentroJmv {
  id: number
  slug: string
  nombreParroquia: string
  ubicacion: string
  cantidadMiembrosActivos: number
  nombreCoordinadora: string
  telefono: string
  correo: string
  resumen: string
  anioFundacion: number
  imagenUrl: string
  etiquetas: string[]
  ultimaActividadId?: number | null
  ultimaActividad?: { id: number; titulo: string; fecha: Date | string } | null
  miembros?: MiembroCentroJmv[]
  comunidades?: ComunidadJmv[]
  _count?: { comunidades: number; miembros: number }
  createdDate: Date | string
  createdById?: string | null
  modifiedDate?: Date | string | null
  modifiedById?: string | null
}

export interface CargoCentroJmv {
  id: number
  nombre: string
  activo: boolean
  createdDate: Date | string
}

export interface EtapaComunidadJmv {
  id: number
  nombre: string
  activo: boolean
  createdDate: Date | string
}

export interface CentroResponse {
  success: boolean
  message: string
  data?: CentroJmv | CentroJmv[] | null
  totalRecords?: number
}

export interface MiembroResponse {
  success: boolean
  message: string
  data?: MiembroCentroJmv | MiembroCentroJmv[] | null
}

export interface ComunidadResponse {
  success: boolean
  message: string
  data?: ComunidadJmv | ComunidadJmv[] | null
}

// ── Badge color map ────────────────────────────────────────────────────────────
const TAG_PALETTE = [
  "bg-blue-100 text-blue-700 border-blue-200",
  "bg-rose-100 text-rose-700 border-rose-200",
  "bg-purple-100 text-purple-700 border-purple-200",
  "bg-amber-100 text-amber-700 border-amber-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-cyan-100 text-cyan-700 border-cyan-200",
  "bg-orange-100 text-orange-700 border-orange-200",
  "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
  "bg-primary/10 text-primary border-primary/20",
  "bg-teal-100 text-teal-700 border-teal-200",
]

export function getTagColor(tag: string): string {
  const hash = tag.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return TAG_PALETTE[hash % TAG_PALETTE.length]
}
