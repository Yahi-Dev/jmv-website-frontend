// src/features/eventos/model/types.ts

export interface AgendaActividad {
  hora: string
  actividad: string
}

export interface AgendaDia {
  dia: string
  actividades: AgendaActividad[]
}

export interface Evento {
  id: number
  slug: string
  titulo: string
  descripcionBreve: string
  descripcionCompleta?: string | null
  imagenUrl: string
  ubicacion: string
  fecha: Date | string
  hora: string
  email?: string | null
  telefono?: string | null
  etiquetas: string[]
  actividades: string[]
  agenda: AgendaDia[]
  requisitos: string[]
  createdDate: Date | string
  createdById?: string | null
  modifiedDate?: Date | string | null
  modifiedById?: string | null
}

export interface EventoFormData {
  titulo: string
  descripcionBreve: string
  descripcionCompleta?: string
  imagenUrl: string
  ubicacion: string
  fecha: string
  hora: string
  email?: string
  telefono?: string
  etiquetas: string[]
  actividades: string[]
  agenda: AgendaDia[]
  requisitos: string[]
}

export interface EventoResponse {
  success: boolean
  message: string
  data?: Evento | Evento[] | null
  totalRecords?: number
}

// ── Badge color map ───────────────────────────────────────────────────────────
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
