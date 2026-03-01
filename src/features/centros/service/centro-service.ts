// src/features/centros/service/centro-service.ts
import {
  CentroCreateData,
  CentroUpdateData,
  MiembroCreateData,
  MiembroUpdateData,
  ComunidadCreateData,
  ComunidadUpdateData,
} from "../schema/validation"
import { CentroResponse, MiembroResponse, ComunidadResponse } from "../model/types"

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options)
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || "Error en la solicitud")
  return json
}

const json = (data: unknown) => ({
  method: "POST" as const,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
})

// ── Centro CRUD ───────────────────────────────────────────────────────────────
export async function getCentros(params?: {
  search?: string
  page?: number
  limit?: number
}): Promise<CentroResponse> {
  const q = new URLSearchParams()
  if (params?.search) q.set("search", params.search)
  if (params?.page) q.set("page", String(params.page))
  if (params?.limit) q.set("limit", String(params.limit))
  const qs = q.toString()
  return request(`/api/centros${qs ? `?${qs}` : ""}`)
}

export async function getCentroBySlug(slug: string): Promise<CentroResponse> {
  return request(`/api/centros/${slug}`)
}

export async function createCentro(data: CentroCreateData): Promise<CentroResponse> {
  return request("/api/centros", { ...json(data), method: "POST" })
}

export async function updateCentro(id: number, data: CentroUpdateData): Promise<CentroResponse> {
  return request(`/api/centros/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}

export async function deleteCentro(id: number): Promise<CentroResponse> {
  return request(`/api/centros/${id}`, { method: "DELETE" })
}

// ── Miembro CRUD ──────────────────────────────────────────────────────────────
export async function createMiembroCentro(
  centroId: number,
  data: MiembroCreateData
): Promise<MiembroResponse> {
  return request(`/api/centros/${centroId}/miembros`, { ...json(data), method: "POST" })
}

export async function updateMiembroCentro(
  centroId: number,
  miembroId: number,
  data: MiembroUpdateData
): Promise<MiembroResponse> {
  return request(`/api/centros/${centroId}/miembros/${miembroId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}

export async function deleteMiembroCentro(
  centroId: number,
  miembroId: number
): Promise<MiembroResponse> {
  return request(`/api/centros/${centroId}/miembros/${miembroId}`, { method: "DELETE" })
}

// ── Comunidad CRUD ────────────────────────────────────────────────────────────
export async function createComunidadJmv(
  centroId: number,
  data: ComunidadCreateData
): Promise<ComunidadResponse> {
  return request(`/api/centros/${centroId}/comunidades`, { ...json(data), method: "POST" })
}

export async function updateComunidadJmv(
  centroId: number,
  comunidadId: number,
  data: ComunidadUpdateData
): Promise<ComunidadResponse> {
  return request(`/api/centros/${centroId}/comunidades/${comunidadId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}

export async function deleteComunidadJmv(
  centroId: number,
  comunidadId: number
): Promise<ComunidadResponse> {
  return request(`/api/centros/${centroId}/comunidades/${comunidadId}`, { method: "DELETE" })
}

// ── Cargos y Etapas ───────────────────────────────────────────────────────────
export async function getCargos(): Promise<{ success: boolean; data?: any[] }> {
  return request("/api/cargos-centro")
}

export async function createCargo(nombre: string): Promise<{ success: boolean; data?: any }> {
  return request("/api/cargos-centro", { ...json({ nombre }), method: "POST" })
}

export async function getEtapas(): Promise<{ success: boolean; data?: any[] }> {
  return request("/api/etapas-comunidad")
}

export async function createEtapa(nombre: string): Promise<{ success: boolean; data?: any }> {
  return request("/api/etapas-comunidad", { ...json({ nombre }), method: "POST" })
}
