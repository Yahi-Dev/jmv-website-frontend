// src/features/consejos/schema/validation.ts
import { z } from 'zod'
import { CargoConsejo, EstadoMiembro } from '../model/types'

export const trayectoriaSchema = z.object({
  id: z.string().optional(),
  anio: z.number().min(1900, "Año debe ser mayor a 1900").max(new Date().getFullYear() + 1, "Año no puede ser futuro"),
  rol: z.string().min(1, "El rol es requerido").max(100, "Máximo 100 caracteres"),
  lugar: z.string().max(100, "Máximo 100 caracteres").optional()
})

export const miembroCreateSchema = z.object({
  nombre: z.string().min(2, "Nombre debe tener al menos 2 caracteres").max(100, "Máximo 100 caracteres"),
  cargo: z.nativeEnum(CargoConsejo, {
    errorMap: () => ({ message: "Selecciona un cargo válido" })
  }),
  ciudad: z.string().max(100, "Máximo 100 caracteres").optional(),
  fotoUrl: z.string().url("URL inválida").optional().or(z.literal('')),
  estado: z.nativeEnum(EstadoMiembro),
  bioCorta: z.string().max(200, "Máximo 200 caracteres").optional(),
  bioExtendida: z.string().max(2000, "Máximo 2000 caracteres").optional(),
  telefono: z.string().max(20, "Máximo 20 caracteres").optional(),
  email: z.string().email("Email inválido").optional().or(z.literal('')),
  trayectoria: z.array(trayectoriaSchema).optional().default([])
})

export const miembroUpdateSchema = miembroCreateSchema.partial()

export const consejoCreateSchema = z.object({
  periodo: z.string()
    .min(4, "Periodo requerido (ej: 2024-2026)")
    .regex(/^\d{4}-\d{4}$/, "Formato debe ser AAAA-AAAA (ej: 2024-2026)"),
  fechaInicio: z.string().min(1, "Fecha de inicio requerida"),
  fechaFin: z.string().optional(),
  sede: z.string().max(100, "Máximo 100 caracteres").optional(),
  lema: z.string().max(200, "Máximo 200 caracteres").optional(),
  actaUrl: z.string().url("URL inválida").optional().or(z.literal('')),
  fotoUrl: z.string().url("URL inválida").optional().or(z.literal('')),
  isActual: z.boolean().default(false)
})

export const consejoUpdateSchema = consejoCreateSchema.partial()

export type ConsejoCreateData = z.infer<typeof consejoCreateSchema>
export type ConsejoUpdateData = z.infer<typeof consejoUpdateSchema>
export type MiembroCreateData = z.infer<typeof miembroCreateSchema>
export type MiembroUpdateData = z.infer<typeof miembroUpdateSchema>