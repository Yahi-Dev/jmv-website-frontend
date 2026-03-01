// src/features/eventos/service/evento-service.ts
import { EventoResponse, EventoFormData } from "../model/types"
import { EventoCreateData, EventoUpdateData } from "../schema/validation"

export async function getEventos(params?: {
  search?: string
  page?: number
  limit?: number
}): Promise<EventoResponse> {
  try {
    const query = new URLSearchParams()
    if (params?.search) query.set("search", params.search)
    if (params?.page) query.set("page", String(params.page))
    if (params?.limit) query.set("limit", String(params.limit))

    const response = await fetch(`/api/eventos?${query}`)
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener eventos")
    }

    return result
  } catch (error) {
    console.error("Error al obtener eventos:", error)
    throw error
  }
}

export async function getEventoBySlug(slug: string): Promise<EventoResponse> {
  try {
    const response = await fetch(`/api/eventos/${slug}`)
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener evento")
    }

    return result
  } catch (error) {
    console.error("Error al obtener evento:", error)
    throw error
  }
}

export async function getEventoById(id: number): Promise<EventoResponse> {
  try {
    const response = await fetch(`/api/eventos/${id}`)
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener evento")
    }

    return result
  } catch (error) {
    console.error("Error al obtener evento:", error)
    throw error
  }
}

export async function createEvento(data: EventoCreateData): Promise<EventoResponse> {
  try {
    const response = await fetch("/api/eventos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      if (result.data?.fieldErrors) {
        console.error("Validation field errors:", JSON.stringify(result.data.fieldErrors, null, 2))
      }
      throw new Error(result.message || "Error al crear evento")
    }

    return result
  } catch (error) {
    console.error("Error al crear evento:", error)
    throw error
  }
}

export async function updateEvento(id: number, data: EventoUpdateData): Promise<EventoResponse> {
  try {
    const response = await fetch(`/api/eventos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Error al actualizar evento")
    }

    return result
  } catch (error) {
    console.error("Error al actualizar evento:", error)
    throw error
  }
}

export async function deleteEvento(id: number): Promise<EventoResponse> {
  try {
    const response = await fetch(`/api/eventos/${id}`, {
      method: "DELETE",
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Error al eliminar evento")
    }

    return result
  } catch (error) {
    console.error("Error al eliminar evento:", error)
    throw error
  }
}
