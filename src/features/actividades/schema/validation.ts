// src/features/actividades/schema/validation.ts
import { z } from "zod"

export const actividadCreateSchema = z.object({
  titulo: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(200, "El título no puede superar 200 caracteres"),
  centroId: z
    .number({ invalid_type_error: "Selecciona un centro" })
    .int()
    .positive("Selecciona un centro válido"),
  resumen: z
    .string()
    .min(10, "El resumen debe tener al menos 10 caracteres")
    .max(2000, "El resumen no puede superar 2000 caracteres"),
  fecha: z.string().min(1, "La fecha es requerida"),
  imagenUrl: z.string().min(1, "La imagen es requerida"),
  etiquetas: z
    .array(z.string().max(50, "Cada etiqueta no puede superar 50 caracteres"))
    .min(1, "Agrega al menos una etiqueta"),
})

export const actividadUpdateSchema = actividadCreateSchema.partial()

export type ActividadCreateData = z.infer<typeof actividadCreateSchema>
export type ActividadUpdateData = z.infer<typeof actividadUpdateSchema>
