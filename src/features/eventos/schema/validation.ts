// src/features/eventos/schema/validation.ts
import { z } from "zod"

export const agendaActividadSchema = z.object({
  hora: z.string().min(1, "La hora es requerida"),
  actividad: z.string().min(1, "La actividad es requerida"),
})

export const agendaDiaSchema = z.object({
  dia: z.string().min(1, "El nombre del día es requerido"),
  actividades: z.array(agendaActividadSchema).min(1, "Agrega al menos una actividad al día"),
})

export const eventoCreateSchema = z
  .object({
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
      .max(10000, "Máximo 10,000 caracteres")
      .optional()
      .or(z.literal("")),
    imagenUrl: z.string().min(1, "La imagen es requerida"),
    ubicacion: z
      .string()
      .min(2, "Mínimo 2 caracteres")
      .max(200, "Máximo 200 caracteres"),
    fecha: z.string().min(1, "La fecha es requerida"),
    hora: z
      .string()
      .min(1, "El horario es requerido")
      .max(50, "Máximo 50 caracteres"),
    email: z
      .string()
      .email("Email inválido")
      .optional()
      .or(z.literal("")),
    telefono: z
      .string()
      .max(30, "Máximo 30 caracteres")
      .optional()
      .or(z.literal("")),
    etiquetas: z
      .array(z.string().min(1))
      .min(1, "Agrega al menos una etiqueta"),
    actividades: z.array(z.string()).optional().default([]),
    agenda: z.array(agendaDiaSchema).optional().default([]),
    requisitos: z
      .array(z.string().min(1))
      .min(1, "Agrega al menos un requisito"),
  })
  .refine(
    (data) =>
      (data.email && data.email.trim()) ||
      (data.telefono && data.telefono.trim()),
    {
      message: "Debes proporcionar al menos un email o teléfono de contacto",
      path: ["email"],
    }
  )

export const eventoUpdateSchema = z.object({
  titulo: z.string().min(3).max(200).optional(),
  descripcionBreve: z.string().min(10).max(300).optional(),
  descripcionCompleta: z.string().max(10000).optional().or(z.literal("")),
  imagenUrl: z.string().optional(),
  ubicacion: z.string().min(2).max(200).optional(),
  fecha: z.string().optional(),
  hora: z.string().max(50).optional(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  telefono: z.string().max(30).optional().or(z.literal("")),
  etiquetas: z.array(z.string().min(1)).optional(),
  actividades: z.array(z.string()).optional(),
  agenda: z.array(agendaDiaSchema).optional(),
  requisitos: z.array(z.string().min(1)).optional(),
})

export type EventoCreateData = z.infer<typeof eventoCreateSchema>
export type EventoUpdateData = z.infer<typeof eventoUpdateSchema>
