// src/features/centros/hook/use-centros.ts
"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import { CentroJmv, MiembroCentroJmv, ComunidadJmv, CargoCentroJmv, EtapaComunidadJmv } from "../model/types"
import {
  getCentros, getCentroBySlug, createCentro, updateCentro, deleteCentro,
  createMiembroCentro, updateMiembroCentro, deleteMiembroCentro,
  createComunidadJmv, updateComunidadJmv, deleteComunidadJmv,
  getCargos, createCargo, getEtapas, createEtapa,
} from "../service/centro-service"
import {
  CentroCreateData, CentroUpdateData,
  MiembroCreateData, MiembroUpdateData,
  ComunidadCreateData, ComunidadUpdateData,
} from "../schema/validation"

// ── Centro list ───────────────────────────────────────────────────────────────
export function useCentros(search?: string) {
  const [centros, setCentros] = useState<CentroJmv[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const r = await getCentros({ search, limit: 100 })
      const data = Array.isArray(r.data) ? r.data : []
      setCentros(data.map((c) => ({ ...c, etiquetas: Array.isArray(c.etiquetas) ? c.etiquetas : [] })))
      setTotal(r.totalRecords ?? 0)
    } catch {
      toast.error("Error al cargar los centros")
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => { fetch() }, [fetch])
  return { centros, loading, total, refetch: fetch }
}

// ── Centro single ─────────────────────────────────────────────────────────────
export function useCentro(slug: string) {
  const [centro, setCentro] = useState<CentroJmv | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const fetch = useCallback(async () => {
    if (!slug) return
    setLoading(true)
    setNotFound(false)
    try {
      const r = await getCentroBySlug(slug)
      const data = r.data
      if (!data || Array.isArray(data)) { setNotFound(true); return }
      setCentro({
        ...data,
        etiquetas: Array.isArray(data.etiquetas) ? data.etiquetas : [],
        miembros: data.miembros ?? [],
        comunidades: (data.comunidades ?? []).map((c: any) => ({
          ...c,
          etiquetas: Array.isArray(c.etiquetas) ? c.etiquetas : [],
        })),
      })
    } catch {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => { fetch() }, [fetch])
  return { centro, loading, notFound, refetch: fetch }
}

// ── Centro form ───────────────────────────────────────────────────────────────
export function useCentroForm() {
  const [isLoading, setIsLoading] = useState(false)

  const create = useCallback(async (data: CentroCreateData, onSuccess?: (id: number) => void) => {
    setIsLoading(true)
    try {
      const r = await createCentro(data)
      toast.success("Centro creado exitosamente")
      const centro = r.data as CentroJmv | undefined
      onSuccess?.(centro?.id ?? 0)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al crear el centro")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const update = useCallback(async (id: number, data: CentroUpdateData, onSuccess?: () => void) => {
    setIsLoading(true)
    try {
      await updateCentro(id, data)
      toast.success("Centro actualizado exitosamente")
      onSuccess?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al actualizar el centro")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const remove = useCallback(async (id: number, onSuccess?: () => void) => {
    setIsLoading(true)
    try {
      await deleteCentro(id)
      toast.success("Centro eliminado exitosamente")
      onSuccess?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al eliminar el centro")
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, create, update, remove }
}

// ── Miembro form ──────────────────────────────────────────────────────────────
export function useMiembroCentroForm(centroId: number) {
  const [isLoading, setIsLoading] = useState(false)

  const create = useCallback(async (data: MiembroCreateData, onSuccess?: () => void) => {
    setIsLoading(true)
    try {
      await createMiembroCentro(centroId, data)
      toast.success("Miembro agregado exitosamente")
      onSuccess?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al agregar el miembro")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [centroId])

  const update = useCallback(async (miembroId: number, data: MiembroUpdateData, onSuccess?: () => void) => {
    setIsLoading(true)
    try {
      await updateMiembroCentro(centroId, miembroId, data)
      toast.success("Miembro actualizado exitosamente")
      onSuccess?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al actualizar el miembro")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [centroId])

  const remove = useCallback(async (miembroId: number, onSuccess?: () => void) => {
    setIsLoading(true)
    try {
      await deleteMiembroCentro(centroId, miembroId)
      toast.success("Miembro eliminado exitosamente")
      onSuccess?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al eliminar el miembro")
    } finally {
      setIsLoading(false)
    }
  }, [centroId])

  return { isLoading, create, update, remove }
}

// ── Comunidad form ────────────────────────────────────────────────────────────
export function useComunidadJmvForm(centroId: number) {
  const [isLoading, setIsLoading] = useState(false)

  const create = useCallback(async (data: ComunidadCreateData, onSuccess?: () => void) => {
    setIsLoading(true)
    try {
      await createComunidadJmv(centroId, data)
      toast.success("Comunidad creada exitosamente")
      onSuccess?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al crear la comunidad")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [centroId])

  const update = useCallback(async (comunidadId: number, data: ComunidadUpdateData, onSuccess?: () => void) => {
    setIsLoading(true)
    try {
      await updateComunidadJmv(centroId, comunidadId, data)
      toast.success("Comunidad actualizada exitosamente")
      onSuccess?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al actualizar la comunidad")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [centroId])

  const remove = useCallback(async (comunidadId: number, onSuccess?: () => void) => {
    setIsLoading(true)
    try {
      await deleteComunidadJmv(centroId, comunidadId)
      toast.success("Comunidad eliminada exitosamente")
      onSuccess?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al eliminar la comunidad")
    } finally {
      setIsLoading(false)
    }
  }, [centroId])

  return { isLoading, create, update, remove }
}

// ── Cargos ────────────────────────────────────────────────────────────────────
export function useCargoCentros() {
  const [cargos, setCargos] = useState<CargoCentroJmv[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const r = await getCargos()
      setCargos(Array.isArray(r.data) ? r.data : [])
    } catch {
      setCargos([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const addCargo = useCallback(async (nombre: string) => {
    setIsCreating(true)
    try {
      const r = await createCargo(nombre)
      if (r.success) {
        toast.success("Cargo creado")
        await fetch()
        return r.data as CargoCentroJmv
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al crear el cargo")
    } finally {
      setIsCreating(false)
    }
    return null
  }, [fetch])

  return { cargos, loading, isCreating, addCargo, refetch: fetch }
}

// ── Etapas ────────────────────────────────────────────────────────────────────
export function useEtapasComunidad() {
  const [etapas, setEtapas] = useState<EtapaComunidadJmv[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const r = await getEtapas()
      setEtapas(Array.isArray(r.data) ? r.data : [])
    } catch {
      setEtapas([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const addEtapa = useCallback(async (nombre: string) => {
    setIsCreating(true)
    try {
      const r = await createEtapa(nombre)
      if (r.success) {
        toast.success("Etapa creada")
        await fetch()
        return r.data as EtapaComunidadJmv
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al crear la etapa")
    } finally {
      setIsCreating(false)
    }
    return null
  }, [fetch])

  return { etapas, loading, isCreating, addEtapa, refetch: fetch }
}
