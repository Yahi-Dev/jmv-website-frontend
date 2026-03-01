// src/features/actividades/service/actividad-service.ts
import { ActividadCreateData, ActividadUpdateData } from "../schema/validation"
import { ActividadResponse } from "../model/types"

const BASE = "/api/actividades"

async function request<T = ActividadResponse>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, options)
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || "Error en la solicitud")
  return json
}

export async function getActividades(params?: {
  search?: string
  centroId?: number
  page?: number
  limit?: number
}): Promise<ActividadResponse> {
  const q = new URLSearchParams()
  if (params?.search) q.set("search", params.search)
  if (params?.centroId) q.set("centroId", String(params.centroId))
  if (params?.page) q.set("page", String(params.page))
  if (params?.limit) q.set("limit", String(params.limit))
  const qs = q.toString()
  return request(`${BASE}${qs ? `?${qs}` : ""}`)
}

export async function getActividadBySlug(slug: string): Promise<ActividadResponse> {
  return request(`${BASE}/${slug}`)
}

export async function createActividad(data: ActividadCreateData): Promise<ActividadResponse> {
  return request(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}

export async function updateActividad(
  id: number,
  data: ActividadUpdateData
): Promise<ActividadResponse> {
  return request(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}

export async function deleteActividad(id: number): Promise<ActividadResponse> {
  return request(`${BASE}/${id}`, { method: "DELETE" })
}
