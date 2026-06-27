// src/lib/mask.ts
//
// Enmascarado de datos de contacto para exposición pública.
//
// Las funciones son IDEMPOTENTES: si el valor ya viene enmascarado (contiene
// el carácter "•"), se devuelve sin cambios. Esto permite aplicarlas en el
// servidor (para visitantes anónimos, de modo que el dato real nunca salga del
// backend) y también en el cliente, sin riesgo de "doble enmascarado".
//
// Resultado: el público ve exactamente el mismo formato enmascarado que antes,
// pero la respuesta de la API ya no contiene el correo/teléfono reales.

export function maskEmail(email?: string | null): string | undefined {
  if (!email) return undefined
  if (email.includes("•")) return email
  const [u, d] = email.split("@")
  if (!d) return email
  const mu = u.length <= 2 ? "••" : u[0] + "•".repeat(Math.max(1, u.length - 2)) + u.slice(-1)
  return `${mu}@${d}`
}

export function maskPhone(phone?: string | null): string | undefined {
  if (!phone) return undefined
  if (phone.includes("•")) return phone
  const digits = phone.replace(/\D/g, "")
  return `••• •• •${digits.slice(-4)}`
}

/**
 * Enmascara los campos de contacto (email/telefono) de un miembro de consejo
 * para respuestas públicas. Devuelve una copia; no muta el objeto original.
 */
export function maskMiembroContacto<
  T extends { email?: string | null; telefono?: string | null }
>(miembro: T): T {
  return {
    ...miembro,
    email: maskEmail(miembro.email) ?? null,
    telefono: maskPhone(miembro.telefono) ?? null,
  }
}
