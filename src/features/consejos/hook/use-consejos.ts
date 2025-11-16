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

export function useConsejoActual() {
  const [consejo, setConsejo] = useState<ConsejoNacional | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchConsejoActual = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await getConsejoActual()
      
      if (response.success && response.data) {
        setConsejo(response.data as ConsejoNacional)
      } else {
        setError(response.message || "No hay consejo actual")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      toast.error('Error al cargar el consejo actual', {
        description: errorMessage
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConsejoActual()
  }, [])

  return { 
    consejo, 
    loading, 
    error, 
    refetch: fetchConsejoActual 
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