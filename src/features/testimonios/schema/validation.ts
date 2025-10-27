// src/features/testimonios/schema/testimonios-schema.ts
import { z } from 'zod';

export const testimonioSchema = z.object({
  nombre: z.string()
    .min(7, "El nombre debe tener al menos 7 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras y espacios"),

  mensaje: z.string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(200, "El mensaje no puede exceder 200 caracteres"),

  reputacion: z.number()
    .int("La reputación debe ser un número entero")
    .min(1, "La reputación mínima es 1")
    .max(5, "La reputación máxima es 5")
    .default(5)
    .optional(),

  iglesia: z.string()
    .min(2, "El nombre de la iglesia debe tener al menos 2 caracteres")
    .max(100, "El nombre de la iglesia no puede exceder 100 caracteres")
    .optional()
    .nullable(),
});

export const testimonioCreateSchema = testimonioSchema;

export const testimonioUpdateSchema = testimonioSchema.partial().extend({
  id: z.number().int().positive("El ID debe ser un número positivo").optional()
});

export const testimonioQuerySchema = z.object({
  search: z.string().max(100, "La búsqueda no puede exceder 100 caracteres").optional().default(""),
  page: z.string().regex(/^\d+$/, "La página debe ser un número").optional().default("1"),
  limit: z.string().regex(/^\d+$/, "El límite debe ser un número").optional().default("10"),
});

export type TestimonioCreateData = z.infer<typeof testimonioCreateSchema>;
export type TestimonioUpdateData = z.infer<typeof testimonioUpdateSchema>;
export type TestimonioQueryData = z.infer<typeof testimonioQuerySchema>;