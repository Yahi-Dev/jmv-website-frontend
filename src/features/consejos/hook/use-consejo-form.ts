// src/features/consejos/hook/use-consejo-form.ts
import { useState } from "react"
import { toast } from "sonner"
import { useConsejoActual, useConsejosHistoricos } from "./use-consejos"
import { ConsejoFormData, MiembroFormData } from "../model/types"
import { createConsejo, updateConsejo, deleteConsejo, createMiembroConsejo, updateMiembroConsejo, deleteMiembroConsejo } from "../service/consejo-service"

export function useConsejoForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { refetch: refetchActual } = useConsejoActual()
  const { refetch: refetchHistoricos } = useConsejosHistoricos()

  const create = async (data: ConsejoFormData) => {
    setIsLoading(true)
    try {
      const response = await createConsejo(data)
      
      if (response.success) {
        toast.success("Consejo creado exitosamente")
        await refetchActual()
        await refetchHistoricos()
        return response.data
      } else {
        throw new Error(response.message || "Error al crear consejo")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      toast.error("Error al crear consejo", {
        description: errorMessage
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const update = async (id: number, data: Partial<ConsejoFormData>) => {
    setIsLoading(true)
    try {
      const response = await updateConsejo(id, data)
      
      if (response.success) {
        toast.success("Consejo actualizado exitosamente")
        await refetchActual()
        await refetchHistoricos()
        return response.data
      } else {
        throw new Error(response.message || "Error al actualizar consejo")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      toast.error("Error al actualizar consejo", {
        description: errorMessage
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const remove = async (id: number) => {
    setIsLoading(true)
    try {
      const response = await deleteConsejo(id)
      
      if (response.success) {
        toast.success("Consejo eliminado exitosamente")
        await refetchActual()
        await refetchHistoricos()
        return response.data
      } else {
        throw new Error(response.message || "Error al eliminar consejo")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      toast.error("Error al eliminar consejo", {
        description: errorMessage
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { create, update, remove, isLoading }
}

export function useMiembroForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { refetch: refetchActual } = useConsejoActual()

  const create = async (data: MiembroFormData) => {
    setIsLoading(true)
    try {
      const response = await createMiembroConsejo(data as any)
      
      if (response.success) {
        toast.success("Miembro agregado exitosamente")
        await refetchActual()
        return response.data
      } else {
        throw new Error(response.message || "Error al agregar miembro")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      toast.error("Error al agregar miembro", {
        description: errorMessage
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const update = async (id: number, data: Partial<MiembroFormData>) => {
    setIsLoading(true)
    try {
      const response = await updateMiembroConsejo(id, data)
      
      if (response.success) {
        toast.success("Miembro actualizado exitosamente")
        await refetchActual()
        return response.data
      } else {
        throw new Error(response.message || "Error al actualizar miembro")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      toast.error("Error al actualizar miembro", {
        description: errorMessage
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const remove = async (id: number) => {
    setIsLoading(true)
    try {
      const response = await deleteMiembroConsejo(id)
      
      if (response.success) {
        toast.success("Miembro eliminado exitosamente")
        await refetchActual()
        return response.data
      } else {
        throw new Error(response.message || "Error al eliminar miembro")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      toast.error("Error al eliminar miembro", {
        description: errorMessage
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { create, update, remove, isLoading }
}