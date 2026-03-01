// src/features/eventos/hook/use-eventos.ts
"use client"

import { useState, useEffect, useCallback } from "react"
import { Evento } from "../model/types"
import { getEventos, getEventoBySlug, createEvento, updateEvento, deleteEvento } from "../service/evento-service"
import { EventoCreateData, EventoUpdateData } from "../schema/validation"
import { toast } from "sonner"

export function useEventos(search?: string) {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const fetchEventos = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getEventos({ search })
      const data = result.data
      if (Array.isArray(data)) {
        setEventos(data)
        setTotal(result.totalRecords ?? data.length)
      } else {
        setEventos([])
        setTotal(0)
      }
    } catch {
      toast.error("Error al cargar los eventos")
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchEventos()
  }, [fetchEventos])

  return { eventos, loading, total, refetch: fetchEventos }
}

export function useEvento(slug: string) {
  const [evento, setEvento] = useState<Evento | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function fetchEvento() {
      setLoading(true)
      setNotFound(false)
      try {
        const result = await getEventoBySlug(slug)
        if (result.data && !Array.isArray(result.data)) {
          const raw = result.data as any
          setEvento({
            ...raw,
            etiquetas: Array.isArray(raw.etiquetas) ? raw.etiquetas : [],
            actividades: Array.isArray(raw.actividades) ? raw.actividades : [],
            agenda: Array.isArray(raw.agenda) ? raw.agenda : [],
            requisitos: Array.isArray(raw.requisitos) ? raw.requisitos : [],
          })
        } else {
          setNotFound(true)
        }
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    fetchEvento()
  }, [slug])

  return { evento, loading, notFound }
}

export function useEventoForm() {
  const [isLoading, setIsLoading] = useState(false)

  const create = async (data: EventoCreateData, onSuccess?: () => void) => {
    setIsLoading(true)
    try {
      await createEvento(data)
      toast.success("Evento creado exitosamente")
      onSuccess?.()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al crear evento")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const update = async (id: number, data: EventoUpdateData, onSuccess?: () => void) => {
    setIsLoading(true)
    try {
      await updateEvento(id, data)
      toast.success("Evento actualizado exitosamente")
      onSuccess?.()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al actualizar evento")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const remove = async (id: number, onSuccess?: () => void) => {
    setIsLoading(true)
    try {
      await deleteEvento(id)
      toast.success("Evento eliminado exitosamente")
      onSuccess?.()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al eliminar evento")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, create, update, remove }
}
