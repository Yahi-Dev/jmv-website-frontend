// src/features/consejos/service/consejo-service.ts
import { ConsejoResponse, ConsejoFormData, MiembroFormData } from '../model/types'
import { ConsejoCreateData, MiembroCreateData } from '../schema/validation'

export async function getConsejoActual(): Promise<ConsejoResponse> {
  try {
    const response = await fetch('/api/consejos/actual')
    
    if (!response.ok) {
      // Si hay un error real (no 404), lanzamos excepción
      const result = await response.json()
      throw new Error(result.message || "Error al obtener el consejo actual")
    }

    const result = await response.json()
    
    // Si no hay consejo actual, devolvemos success pero con data null
    if (!result.data) {
      return {
        success: true,
        message: result.message || "No hay consejo actual configurado",
        data: result.Data
      }
    }

    return result
  } catch (error) {
    console.error("Error al obtener consejo actual:", error)
    throw error
  }
}

export async function getConsejosHistoricos(): Promise<ConsejoResponse> {
  try {
    const response = await fetch('/api/consejos/historial')
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener consejos históricos")
    }

    return result
  } catch (error) {
    console.error("Error al obtener consejos históricos:", error)
    throw error
  }
}

export async function createConsejo(data: ConsejoCreateData): Promise<ConsejoResponse> {
  try {
    const response = await fetch('/api/consejos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al crear consejo")
    }

    return await response.json()
  } catch (error) {
    console.error("Error al crear consejo:", error)
    throw error
  }
}

export async function createMiembroConsejo(data: MiembroCreateData): Promise<ConsejoResponse> {
  try {
    const response = await fetch('/api/consejos/miembros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al crear miembro")
    }

    return await response.json()
  } catch (error) {
    console.error("Error al crear miembro:", error)
    throw error
  }
}

export async function updateConsejoActual(nuevoConsejoId: number): Promise<ConsejoResponse> {
  try {
    const response = await fetch('/api/consejos/actual', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consejoId: nuevoConsejoId })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al actualizar consejo actual")
    }

    return await response.json()
  } catch (error) {
    console.error("Error al actualizar consejo actual:", error)
    throw error
  }
}

export async function updateConsejo(id: number, data: Partial<ConsejoFormData>): Promise<ConsejoResponse> {
  try {
    const response = await fetch(`/api/consejos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al actualizar consejo")
    }

    return await response.json()
  } catch (error) {
    console.error("Error al actualizar consejo:", error)
    throw error
  }
}


export async function updateMiembroConsejo(id: number, data: Partial<MiembroFormData>): Promise<ConsejoResponse> {
  try {
    const response = await fetch(`/api/consejos/miembros/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al actualizar miembro")
    }

    return await response.json()
  } catch (error) {
    console.error("Error al actualizar miembro:", error)
    throw error
  }
}


export async function deleteConsejo(id: number): Promise<ConsejoResponse> {
  try {
    const response = await fetch(`/api/consejos/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al eliminar consejo")
    }

    return await response.json()
  } catch (error) {
    console.error("Error al eliminar consejo:", error)
    throw error
  }
}


export async function deleteMiembroConsejo(id: number): Promise<ConsejoResponse> {
  try {
    const response = await fetch(`/api/consejos/miembros/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al eliminar miembro")
    }

    return await response.json()
  } catch (error) {
    console.error("Error al eliminar miembro:", error)
    throw error
  }
}