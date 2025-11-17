// src/features/consejos/model/types.ts
export enum CargoConsejo {
  CoordinadorNacional = "CoordinadorNacional",
  SecretarioNacional = "SecretarioNacional", 
  TesoreroNacional = "TesoreroNacional",
  VocalDeFormacion = "VocalDeFormacion",
  VocalDeMisionYCaridad = "VocalDeMisionYCaridad",
  VocalLiturgiaYMariana = "VocalLiturgiaYMariana",
  VocalDeExpansion = "VocalDeExpansion",
  VocalDePrejuveniles = "VocalDePrejuveniles",
  VocalDeCulturaYRecreacion = "VocalDeCulturaYRecreacion"
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
  lema?: string
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
  lema?: string | null  
  fotoUrl?: string | null 
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
  trayectoria?: TrayectoriaItem[]
}

export interface ConsejoResponse {
  success: boolean
  message: string
  data?: ConsejoNacional | ConsejoNacional[] | MiembroConsejo | MiembroConsejo[]
}