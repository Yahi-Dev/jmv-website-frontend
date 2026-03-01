// src/features/actividades/hook/use-actividades.ts
"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import { ActividadJmv } from "../model/types"
import {
  getActividades,
  getActividadBySlug,
  createActividad,
  updateActividad,
  deleteActividad,
} from "../service/actividad-service"
import { ActividadCreateData, ActividadUpdateData } from "../schema/validation"

// ── List hook ─────────────────────────────────────────────────────────────────
export function useActividades(search?: string, centroId?: number) {
  const [actividades, setActividades] = useState<ActividadJmv[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const fetchActividades = useCallback(async () => {
    setLoading(true)
    try {
      const r = await getActividades({ search, centroId, limit: 100 })
      setActividades(Array.isArray(r.data) ? r.data : [])
      setTotal(r.totalRecords ?? 0)
    } catch {
      toast.error("Error al cargar las actividades")
    } finally {
      setLoading(false)
    }
  }, [search, centroId])

  useEffect(() => {
    fetchActividades()
  }, [fetchActividades])

  return { actividades, loading, total, refetch: fetchActividades }
}

// ── Single hook ───────────────────────────────────────────────────────────────
export function useActividad(slug: string) {
  const [actividad, setActividad] = useState<ActividadJmv | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setNotFound(false)
    getActividadBySlug(slug)
      .then((r) => {
        const data = r.data
        if (!data || Array.isArray(data)) { setNotFound(true); return }
        setActividad({
          ...data,
          etiquetas: Array.isArray(data.etiquetas) ? data.etiquetas : [],
        })
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  return { actividad, loading, notFound }
}

// ── Form hook ─────────────────────────────────────────────────────────────────
export function useActividadForm() {
  const [isLoading, setIsLoading] = useState(false)

  const create = useCallback(
    async (data: ActividadCreateData, onSuccess?: () => void) => {
      setIsLoading(true)
      try {
        await createActividad(data)
        toast.success("Actividad creada exitosamente")
        onSuccess?.()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Error al crear la actividad")
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const update = useCallback(
    async (id: number, data: ActividadUpdateData, onSuccess?: () => void) => {
      setIsLoading(true)
      try {
        await updateActividad(id, data)
        toast.success("Actividad actualizada exitosamente")
        onSuccess?.()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Error al actualizar la actividad")
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const remove = useCallback(async (id: number, onSuccess?: () => void) => {
    setIsLoading(true)
    try {
      await deleteActividad(id)
      toast.success("Actividad eliminada exitosamente")
      onSuccess?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al eliminar la actividad")
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, create, update, remove }
}
