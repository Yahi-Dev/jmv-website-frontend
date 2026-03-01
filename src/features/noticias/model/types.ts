// src/features/noticias/model/types.ts

export interface Noticia {
  id: number
  slug: string
  titulo: string
  descripcionBreve: string
  descripcionCompleta?: string | null
  imagenUrl: string
  ubicacion: string
  fecha: Date | string
  hora?: string | null
  tipo: string
  etiquetas: string[]
  destacada: boolean
  createdDate: Date | string
  createdById?: string | null
  modifiedDate?: Date | string | null
  modifiedById?: string | null
}

export interface NoticiaTipo {
  id: number
  nombre: string
  activo: boolean
  createdDate: Date | string
}

export interface NoticiaResponse {
  success: boolean
  message: string
  data?: Noticia | Noticia[] | null
  totalRecords?: number
}

export interface NoticiaTipoResponse {
  success: boolean
  message: string
  data?: NoticiaTipo | NoticiaTipo[] | null
  totalRecords?: number
}

// ── Badge color map (same palette as Evento) ──────────────────────────────────
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

// ── Tipo color map ─────────────────────────────────────────────────────────────
const TIPO_PALETTE = [
  "bg-blue-100 text-blue-700 border-blue-200",
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-orange-100 text-orange-700 border-orange-200",
  "bg-rose-100 text-rose-700 border-rose-200",
  "bg-teal-100 text-teal-700 border-teal-200",
  "bg-amber-100 text-amber-700 border-amber-200",
  "bg-cyan-100 text-cyan-700 border-cyan-200",
]

export function getTipoColor(tipo: string): string {
  const hash = tipo.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return TIPO_PALETTE[hash % TIPO_PALETTE.length]
}
