// src/features/consejos/utils/consejo-utils.ts
import { ConsejoNacional } from '../model/types'

export function shouldCreateNewConsejo(consejoActual: ConsejoNacional | null): boolean {
  if (!consejoActual) return true
  
  const ahora = new Date()
  const fechaFin = consejoActual.fechaFin ? new Date(consejoActual.fechaFin) : null
  
  // Si tiene fecha de fin y ya pasó, o si no tiene fecha pero lleva más de 2 años
  if (fechaFin && fechaFin < ahora) {
    return true
  }
  
  if (!fechaFin) {
    const fechaInicio = new Date(consejoActual.fechaInicio)
    const dosAniosDespues = new Date(fechaInicio)
    dosAniosDespues.setFullYear(dosAniosDespues.getFullYear() + 2)
    
    if (dosAniosDespues < ahora) {
      return true
    }
  }
  
  return false
}

export function sugerirNuevoPeriodo(consejoActual: ConsejoNacional | null): string {
  if (!consejoActual) {
    const añoActual = new Date().getFullYear()
    return `${añoActual}-${añoActual + 2}`
  }
  
  const fechaFin = consejoActual.fechaFin 
    ? new Date(consejoActual.fechaFin)
    : new Date(consejoActual.fechaInicio)
    
  fechaFin.setFullYear(fechaFin.getFullYear() + 2)
  
  const inicioNuevo = new Date(fechaFin)
  inicioNuevo.setDate(inicioNuevo.getDate() + 1) // Día siguiente al fin del anterior
  const finNuevo = new Date(inicioNuevo)
  finNuevo.setFullYear(finNuevo.getFullYear() + 2)
  
  return `${inicioNuevo.getFullYear()}-${finNuevo.getFullYear()}`
}