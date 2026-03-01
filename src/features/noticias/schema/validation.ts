// src/features/noticias/schema/validation.ts
import { z } from "zod"

export const noticiaCreateSchema = z.object({
  titulo: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(200, "Máximo 200 caracteres"),
  descripcionBreve: z
    .string()
    .min(10, "Mínimo 10 caracteres")
    .max(300, "Máximo 300 caracteres"),
  descripcionCompleta: z
    .string()
    .max(50000, "Máximo 50000 caracteres")
    .optional()
    .or(z.literal("")),
  imagenUrl: z.string().min(1, "La imagen es obligatoria"),
  ubicacion: z
    .string()
    .min(2, "Mínimo 2 caracteres")
    .max(200, "Máximo 200 caracteres"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
  hora: z.string().max(50).optional().or(z.literal("")),
  tipo: z.string().min(1, "El tipo es obligatorio").max(100, "Máximo 100 caracteres"),
  etiquetas: z
    .array(z.string().min(1).max(50))
    .min(1, "Agrega al menos una etiqueta"),
  destacada: z.boolean().optional().default(false),
})

export const noticiaUpdateSchema = noticiaCreateSchema.partial()

export type NoticiaCreateData = z.infer<typeof noticiaCreateSchema>
export type NoticiaUpdateData = z.infer<typeof noticiaUpdateSchema>
