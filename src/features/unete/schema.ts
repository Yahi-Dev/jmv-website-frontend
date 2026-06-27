// src/features/unete/schema.ts
import { z } from "zod"

// Validación del formulario público de "Únete". Los límites de longitud están
// alineados con el modelo Prisma SolicitudUnete (db.VarChar).
export const solicitudUneteSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre es obligatorio").max(80),
  apellidos: z.string().trim().min(2, "Los apellidos son obligatorios").max(80),
  email: z.string().trim().email("Correo electrónico inválido").max(150),
  telefono: z.string().trim().min(7, "Teléfono inválido").max(40),
  edad: z.coerce
    .number({ invalid_type_error: "Edad inválida" })
    .int("Edad inválida")
    .min(10, "Edad inválida")
    .max(120, "Edad inválida"),
  provincia: z.string().trim().min(1, "La provincia es obligatoria").max(80),
  parroquia: z.string().trim().max(150).optional().or(z.literal("")),
  motivacion: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más sobre tu motivación")
    .max(1000),
  disponibilidad: z.string().trim().max(80).optional().or(z.literal("")),
  aceptaTerminos: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad" }),
  }),
})

export type SolicitudUneteInput = z.infer<typeof solicitudUneteSchema>
