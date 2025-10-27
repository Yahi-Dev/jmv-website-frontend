// src/features/formacion/schema/formacion-schema.ts
import { z } from 'zod';

export const formacionSchema = z.object({
  ruta_video: z.string()
    .min(1, { message: 'Debe elegir algún archivo' }),

  titulo: z.string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(50, "El título no puede exceder 50 caracteres"),

  detalles: z.string()
    .min(2, "Los detalles deben tener al menos 2 caracteres")
    .max(100, "Los detalles no pueden exceder 100 caracteres")
    .optional()
    .nullable(),

  modulo: z.enum(['Voluntario', 'Catequesis', 'Oraciones', 'Podcast', 'Mision', 'Guia'])
});

export const formacionCreateSchema = formacionSchema;

export const formacionUpdateSchema = formacionSchema.partial().extend({
  id: z.number().int().positive("El ID debe ser un número positivo").optional()
});

export const formacionQuerySchema = z.object({
  search: z.string().max(100, "La búsqueda no puede exceder 100 caracteres").optional().default(""),
  page: z.string().regex(/^\d+$/, "La página debe ser un número").optional().default("1"),
  limit: z.string().regex(/^\d+$/, "El límite debe ser un número").optional().default("10"),
});

export type FormacionCreateData = z.infer<typeof formacionCreateSchema>;
export type FormacionUpdateData = z.infer<typeof formacionUpdateSchema>;
export type FormacionQueryData = z.infer<typeof formacionQuerySchema>;