// src/features/centros/schema/validation.ts
import { z } from "zod"

const currentYear = new Date().getFullYear()

export const centroCreateSchema = z.object({
  nombreParroquia: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(200, "El nombre no puede superar 200 caracteres"),
  ubicacion: z
    .string()
    .min(5, "La ubicación debe tener al menos 5 caracteres")
    .max(300, "La ubicación no puede superar 300 caracteres"),
  cantidadMiembrosActivos: z
    .number({ invalid_type_error: "Debe ser un número" })
    .int("Debe ser un número entero")
    .min(0, "Debe ser 0 o mayor"),
  nombreCoordinadora: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(200, "El nombre no puede superar 200 caracteres"),
  telefono: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(30, "El teléfono no puede superar 30 caracteres"),
  correo: z
    .string()
    .email("Ingresa un correo válido")
    .max(150, "El correo no puede superar 150 caracteres"),
  resumen: z
    .string()
    .min(10, "El resumen debe tener al menos 10 caracteres")
    .max(2000, "El resumen no puede superar 2000 caracteres"),
  anioFundacion: z
    .number({ invalid_type_error: "Debe ser un año válido" })
    .int()
    .min(1900, "El año debe ser mayor a 1900")
    .max(currentYear, `El año no puede ser mayor a ${currentYear}`),
  imagenUrl: z.string().min(1, "La imagen es requerida"),
  etiquetas: z
    .array(z.string().max(50, "Cada etiqueta no puede superar 50 caracteres"))
    .min(1, "Agrega al menos una etiqueta"),
  ultimaActividadId: z.number().int().positive().nullable().optional(),
})

export const centroUpdateSchema = centroCreateSchema.partial()

export const miembroCreateSchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(200, "El nombre no puede superar 200 caracteres"),
  imagenUrl: z.string().min(1, "La imagen es requerida"),
  descripcion: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(1000, "La descripción no puede superar 1000 caracteres"),
  cargo: z
    .string()
    .min(3, "El cargo debe tener al menos 3 caracteres")
    .max(100, "El cargo no puede superar 100 caracteres"),
})

export const miembroUpdateSchema = miembroCreateSchema.partial()

export const comunidadCreateSchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(200, "El nombre no puede superar 200 caracteres"),
  imagenUrl: z.string().min(1, "La imagen es requerida"),
  cantidadMiembros: z
    .number({ invalid_type_error: "Debe ser un número" })
    .int()
    .min(0, "Debe ser 0 o mayor"),
  inicioDate: z.string().min(1, "La fecha de inicio es requerida"),
  etapa: z
    .string()
    .min(3, "La etapa debe tener al menos 3 caracteres")
    .max(100, "La etapa no puede superar 100 caracteres"),
  etiquetas: z
    .array(z.string().max(50, "Cada etiqueta no puede superar 50 caracteres"))
    .min(1, "Agrega al menos una etiqueta"),
})

export const comunidadUpdateSchema = comunidadCreateSchema.partial()

export type CentroCreateData = z.infer<typeof centroCreateSchema>
export type CentroUpdateData = z.infer<typeof centroUpdateSchema>
export type MiembroCreateData = z.infer<typeof miembroCreateSchema>
export type MiembroUpdateData = z.infer<typeof miembroUpdateSchema>
export type ComunidadCreateData = z.infer<typeof comunidadCreateSchema>
export type ComunidadUpdateData = z.infer<typeof comunidadUpdateSchema>
