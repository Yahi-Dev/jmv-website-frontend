// src/features/noticias/hook/use-noticias.ts
"use client"

import { useState, useEffect, useCallback } from "react"
import { Noticia, NoticiaTipo } from "../model/types"
import {
  getNoticias,
  getNoticiaBySlug,
  createNoticia,
  updateNoticia,
  deleteNoticia,
  getNoticiaTipos,
  createNoticiaTipo,
} from "../service/noticia-service"
import { NoticiaCreateData, NoticiaUpdateData } from "../schema/validation"
import { toast } from "sonner"

export function useNoticias(search?: string) {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const fetchNoticias = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getNoticias({ search })
      const data = result.data
      if (Array.isArray(data)) {
        setNoticias(data)
        setTotal(result.totalRecords ?? data.length)
      } else {
        setNoticias([])
        setTotal(0)
      }
    } catch {
      toast.error("Error al cargar las noticias")
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchNoticias()
  }, [fetchNoticias])

  return { noticias, loading, total, refetch: fetchNoticias }
}

export function useNoticia(slug: string) {
  const [noticia, setNoticia] = useState<Noticia | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function fetchNoticia() {
      setLoading(true)
      setNotFound(false)
      try {
        const result = await getNoticiaBySlug(slug)
        if (result.data && !Array.isArray(result.data)) {
          const raw = result.data as any
          setNoticia({
            ...raw,
            etiquetas: Array.isArray(raw.etiquetas) ? raw.etiquetas : [],
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
    fetchNoticia()
  }, [slug])

  return { noticia, loading, notFound }
}

export function useNoticiaForm() {
  const [isLoading, setIsLoading] = useState(false)

  const create = async (data: NoticiaCreateData, onSuccess?: () => void) => {
    setIsLoading(true)
    try {
      await createNoticia(data)
      toast.success("Noticia creada exitosamente")
      onSuccess?.()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al crear noticia")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const update = async (id: number, data: NoticiaUpdateData, onSuccess?: () => void) => {
    setIsLoading(true)
    try {
      await updateNoticia(id, data)
      toast.success("Noticia actualizada exitosamente")
      onSuccess?.()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al actualizar noticia")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const remove = async (id: number, onSuccess?: () => void) => {
    setIsLoading(true)
    try {
      await deleteNoticia(id)
      toast.success("Noticia eliminada exitosamente")
      onSuccess?.()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al eliminar noticia")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, create, update, remove }
}

export function useNoticiaTipos() {
  const [tipos, setTipos] = useState<NoticiaTipo[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)

  const fetchTipos = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getNoticiaTipos()
      const data = result.data
      setTipos(Array.isArray(data) ? data : [])
    } catch {
      // silently fail - tipos are non-critical
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTipos()
  }, [fetchTipos])

  const addTipo = async (nombre: string): Promise<NoticiaTipo | null> => {
    setIsCreating(true)
    try {
      const result = await createNoticiaTipo(nombre)
      if (result.data && !Array.isArray(result.data)) {
        const newTipo = result.data as NoticiaTipo
        setTipos((prev) => [...prev, newTipo].sort((a, b) => a.nombre.localeCompare(b.nombre)))
        toast.success(`Tipo "${nombre}" creado`)
        return newTipo
      }
      return null
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al crear tipo")
      return null
    } finally {
      setIsCreating(false)
    }
  }

  return { tipos, loading, isCreating, addTipo, refetch: fetchTipos }
}
