"use client"

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormacionType } from "../model/types";
import { FormacionCreateData, FormacionUpdateData } from "../schema/validation";
import { createFormacion, deleteFormacion, getAllFormaciones, getFormacionById, updateFormacion } from "../service/formacion-service";

export function useGetAllFormaciones() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formaciones, setFormaciones] = useState<FormacionType[]>([]);

  // Usar useCallback para memoizar la función y evitar bucles infinitos
  const fetchAll = useCallback(async (params?: {
    isActive?: boolean;
    search?: string;
  }): Promise<FormacionType[] | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getAllFormaciones(params);

      if (response.success && response.data) {
        const data = (Array.isArray(response.data) ? response.data : [response.data])
          .map(c => ({
            ...c,
            createdDate: new Date(c.createdDate ?? ""),
            modifiedDate: c.modifiedDate ? new Date(c.modifiedDate) : undefined,
          }));

        setFormaciones(data);
        return data;
      }
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      toast.error('Error al cargar las formaciones', {
        description: errorMessage,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []); // Dependencias vacías ya que getAllFormaciones es importada

  return {
    fetchAll,
    formaciones,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}

export function useFormacionById(id: number) {
  const [formacion, setFormacion] = useState<FormacionType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormacion = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getFormacionById(id);

        if (response.success && response.data) {
          const formacionData = Array.isArray(response.data)
            ? response.data[0]
            : response.data;
          setFormacion(formacionData);
        } else {
          setError(response.message || "Formación no encontrada");
          toast.error('Error al cargar formación', {
            description: response.message || "Formación no encontrada"
          });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error desconocido";
        setError(errorMessage);
        toast.error('Error al cargar la formación', {
          description: errorMessage
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchFormacion();
  }, [id]);

  return { formacion, loading, error };
}

export function useDeleteFormacion() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const remove = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await deleteFormacion(id);
      router.refresh();
      return response;
    } catch (error) {
      console.error("Error deleting formación:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { remove, isLoading };
}

export function useCreateFormacion() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: FormacionCreateData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await createFormacion(data);
      
      if (response.success) {
        toast.success("Formación creada exitosamente", {
          description: "La formación ha sido registrada correctamente."
        });
        return response.data;
      } else {
        throw new Error(response.message || "Error al crear la formación");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido al crear la formación";
      setError(errorMessage);
      toast.error("Error al crear formación", {
        description: errorMessage
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { create, isLoading, error, clearError };
}

export function useUpdateFormacion() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: number, data: FormacionUpdateData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await updateFormacion(id, data);
      
      if (response.success) {
        toast.success("Formación actualizada exitosamente", {
          description: "La formación ha sido actualizada correctamente."
        });
        router.refresh();
        return response;
      } else {
        throw new Error(response.message || "Error al actualizar la formación");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido al actualizar la formación";
      setError(errorMessage);
      toast.error("Error al actualizar formación", {
        description: errorMessage
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { update, isLoading, error, clearError };
}