// src/features/consejos/model/types.ts
export enum CargoConsejo {
  CoordinaraNacional = "CoordinaraNacional",
  SecretariaNacional = "SecretariaNacional", 
  VocalDePrejuveniles = "VocalDePrejuveniles",
  TesoreraNacional = "TesoreraNacional",
  VocalDeLiturgiaYmariana = "VocalDeLiturgiaYmariana",
  VocalDeFormacion = "VocalDeFormacion",
  VocalDeExpansion = "VocalDeExpansion",
  VocalDeComunicacionYEnlaceNacional = "VocalDeComunicacionYEnlaceNacional",
  AsesoraNacional = "AsesoraNacional",
  VocalDeMisionYCaridad = "VocalDeMisionYCaridad"
}

export enum EstadoMiembro {
  Titular = "Titular",
  Suplente = "Suplente"
}

export interface TrayectoriaItem {
  id?: string
  anio: number
  rol: string
  lugar?: string
}

export interface MiembroConsejo {
  id: number
  consejoId: number
  userId?: string
  nombre: string
  cargo: CargoConsejo
  ciudad?: string
  fotoUrl?: string
  estado: EstadoMiembro
  bioCorta?: string
  bioExtendida?: string
  telefono?: string
  email?: string
  linkedin?: string
  trayectoria?: TrayectoriaItem[]
  
  user?: {
    name?: string
    email?: string
    image?: string
  }
  
  createdDate: Date
  createdById?: string
  modifiedDate?: Date
  modifiedById?: string
}

export interface ConsejoNacional {
  id: number
  periodo: string
  fechaInicio: Date
  fechaFin?: Date
  sede?: string
  lema?: string
  actaUrl?: string
  fotoUrl?: string
  isActual: boolean
  
  miembros: MiembroConsejo[]
  
  createdDate: Date
  createdById?: string
  modifiedDate?: Date
  modifiedById?: string
}

export interface ConsejoFormData {
  periodo: string
  fechaInicio: string
  fechaFin?: string
  sede?: string
  lema?: string
  actaUrl?: string
  fotoUrl?: string
  isActual: boolean
}

export interface MiembroFormData {
  id?: number
  consejoId?: number
  userId?: string
  nombre: string
  cargo: CargoConsejo
  ciudad?: string
  fotoUrl?: string
  estado: EstadoMiembro
  bioCorta?: string
  bioExtendida?: string
  telefono?: string
  email?: string
  linkedin?: string
  trayectoria?: TrayectoriaItem[]
}

export interface ConsejoResponse {
  success: boolean
  message: string
  data?: ConsejoNacional | ConsejoNacional[] | MiembroConsejo | MiembroConsejo[]
}