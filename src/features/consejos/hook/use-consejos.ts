// src/features/consejos/hook/use-consejos.ts
"use client"

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { ConsejoNacional } from '../model/types'
import { ConsejoCreateData } from '../schema/validation'
import { 
  getConsejoActual, 
  getConsejosHistoricos, 
  createConsejo,
} from '../service/consejo-service'




interface UseConsejoActualOptions {
  /** Si es `false` el hook NO realiza la petición (útil cuando otro componente
   *  ya cargó el consejo y se pasa por props). Por defecto `true`. */
  enabled?: boolean
}

export function useConsejoActual(options: UseConsejoActualOptions = {}) {
  const { enabled = true } = options
  const [consejo, setConsejo] = useState<ConsejoNacional | null>(null)
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState<string | null>(null)
  const [isEmpty, setIsEmpty] = useState(false)

  const fetchConsejoActual = async (signal?: AbortSignal) => {
    try {
      setLoading(true)
      setError(null)
      setIsEmpty(false)

      const response = await getConsejoActual(signal)
      if (signal?.aborted) return

      if (response.success) {
        if (response.data) {
          setConsejo(response.data as ConsejoNacional)
          setIsEmpty(false)
        } else {
          setConsejo(null)
          setIsEmpty(true)
        }
      } else {
        setError(response.message || "Error al cargar el consejo actual")
        setIsEmpty(false)
      }
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      setIsEmpty(false)
      toast.error('Error al cargar el consejo actual', {
        description: errorMessage
      })
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return
    }
    const ctrl = new AbortController()
    fetchConsejoActual(ctrl.signal)
    return () => ctrl.abort()
  }, [enabled])

  return {
    consejo,
    loading,
    error,
    isEmpty,
    refetch: () => fetchConsejoActual()
  }
}

export function useConsejosHistoricos() {
  const [consejos, setConsejos] = useState<ConsejoNacional[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHistoricos = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await getConsejosHistoricos()
      
      if (response.success && response.data) {
        const dataArray = Array.isArray(response.data) ? response.data : [response.data]
        const consejosData = dataArray.filter((item): item is ConsejoNacional => 
          'periodo' in item && 'fechaInicio' in item && 'isActual' in item && 'miembros' in item
        )
        setConsejos(consejosData)
      } else {
        setError(response.message || "Error al cargar consejos históricos")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      toast.error('Error al cargar consejos históricos', {
        description: errorMessage
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistoricos()
  }, [])

  return { 
    consejos, 
    loading, 
    error, 
    refetch: fetchHistoricos 
  }
}

export function useCreateConsejo() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = async (data: ConsejoCreateData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await createConsejo(data)
      
      if (response.success) {
        toast.success("Consejo creado exitosamente")
        return response.data
      } else {
        throw new Error(response.message || "Error al crear consejo")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      toast.error("Error al crear consejo", {
        description: errorMessage
      })
      return null
    } finally {
      setLoading(false)
    }
  }

  return { create, loading, error }
}