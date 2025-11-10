import { ModulosFormacion } from '@/src/lib/enum/ModulosFormacion';
import { z } from 'zod';

export const formacionSchema = z.object({
  titulo: z.string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(200, "El título no puede exceder 200 caracteres"),

  descripcion: z.string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(5000, "La descripción no puede exceder 5000 caracteres"),

  modulo: z.nativeEnum(ModulosFormacion, {
    errorMap: () => ({ message: "Selecciona un módulo válido" })
  }),

  enlace: z.string().url("Debe ser una URL válida").optional().or(z.literal('')),
  ruta: z.string().optional(),
});

export const formacionCreateSchema = formacionSchema;

export const formacionUpdateSchema = formacionSchema.partial().extend({
  id: z.number().int().positive("El ID debe ser un número positivo")
});

export const formacionQuerySchema = z.object({
  search: z.string().max(100, "La búsqueda no puede exceder 100 caracteres").optional().default(""),
  page: z.string().regex(/^\d+$/, "La página debe ser un número").optional().default("1"),
  limit: z.string().regex(/^\d+$/, "El límite debe ser un número").optional().default("10"),
});

export type FormacionCreateData = z.infer<typeof formacionCreateSchema>;
export type FormacionUpdateData = z.infer<typeof formacionUpdateSchema>;
export type FormacionQueryData = z.infer<typeof formacionQuerySchema>;