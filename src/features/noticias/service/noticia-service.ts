// src/features/noticias/service/noticia-service.ts
import { NoticiaResponse, NoticiaTipoResponse } from "../model/types"
import { NoticiaCreateData, NoticiaUpdateData } from "../schema/validation"

export async function getNoticias(params?: {
  search?: string
  tipo?: string
  page?: number
  limit?: number
}): Promise<NoticiaResponse> {
  try {
    const query = new URLSearchParams()
    if (params?.search) query.set("search", params.search)
    if (params?.tipo) query.set("tipo", params.tipo)
    if (params?.page) query.set("page", String(params.page))
    if (params?.limit) query.set("limit", String(params.limit))

    const response = await fetch(`/api/noticias?${query}`)
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener noticias")
    }

    return result
  } catch (error) {
    console.error("Error al obtener noticias:", error)
    throw error
  }
}

export async function getNoticiaBySlug(slug: string): Promise<NoticiaResponse> {
  try {
    const response = await fetch(`/api/noticias/${slug}`)
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener noticia")
    }

    return result
  } catch (error) {
    console.error("Error al obtener noticia:", error)
    throw error
  }
}

export async function createNoticia(data: NoticiaCreateData): Promise<NoticiaResponse> {
  try {
    const response = await fetch("/api/noticias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      if (result.data?.fieldErrors) {
        console.error("Validation field errors:", JSON.stringify(result.data.fieldErrors, null, 2))
      }
      throw new Error(result.message || "Error al crear noticia")
    }

    return result
  } catch (error) {
    console.error("Error al crear noticia:", error)
    throw error
  }
}

export async function updateNoticia(id: number, data: NoticiaUpdateData): Promise<NoticiaResponse> {
  try {
    const response = await fetch(`/api/noticias/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Error al actualizar noticia")
    }

    return result
  } catch (error) {
    console.error("Error al actualizar noticia:", error)
    throw error
  }
}

export async function deleteNoticia(id: number): Promise<NoticiaResponse> {
  try {
    const response = await fetch(`/api/noticias/${id}`, {
      method: "DELETE",
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Error al eliminar noticia")
    }

    return result
  } catch (error) {
    console.error("Error al eliminar noticia:", error)
    throw error
  }
}

export async function getNoticiaTipos(): Promise<NoticiaTipoResponse> {
  try {
    const response = await fetch("/api/noticias/tipos")
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener tipos")
    }

    return result
  } catch (error) {
    console.error("Error al obtener tipos:", error)
    throw error
  }
}

export async function createNoticiaTipo(nombre: string): Promise<NoticiaTipoResponse> {
  try {
    const response = await fetch("/api/noticias/tipos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Error al crear tipo")
    }

    return result
  } catch (error) {
    console.error("Error al crear tipo:", error)
    throw error
  }
}
