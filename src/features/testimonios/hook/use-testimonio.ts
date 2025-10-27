import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TestimonioType } from "../model/types";
import { createTestimonio, deleteTestimonio, getAllTestimonios, getLatestTestimonios, getRandomTestimonios, getTestimonioById, TestimonioResponse, updateTestimonio } from "../service/testimonio-service";
import { TestimonioCreateData, TestimonioUpdateData } from "../schema/validation";



export function useGetAllTestimonios() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testimonios, setTestimonios] = useState<TestimonioType[]>([]);

  const fetchAll = async (params?: {
    isActive?: boolean;
    search?: string;
  }): Promise<TestimonioType[] | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getAllTestimonios(params);

      if (response.success && response.data) {
        const data = (Array.isArray(response.data) ? response.data : [response.data])
          .map(c => ({
            ...c,
            createdDate: new Date(c.createdDate ?? ""),
            modifiedDate: new Date(c.modifiedDate ?? ""),
          }));

          setTestimonios(data);
        return data;
      }
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      toast.error('Error al cargar los testimonios', {
        description: errorMessage,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchAll,
    testimonios,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};




export const useTestimonioById = (id: number) => {
  const [testimonio, setTestimonio] = useState<TestimonioType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonio = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getTestimonioById(id);

        if (response.success && response.data) {
          const categoryData = Array.isArray(response.data)
            ? response.data[0]
            : response.data;
            console.log("Testimonio data:", categoryData);
          setTestimonio(categoryData);
        } else {
          setError(response.message || "Testimonio no encontrado");
          toast.error('Error al cargar testimonio', {
            description: response.message || "Testimonio no encontrado"
          });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error desconocido";
        setError(errorMessage);
        toast.error('Error al cargar el testimonio', {
          description: errorMessage
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTestimonio();
  }, [id]);

  return { testimonio, loading, error };
};




export function useDeleteTestimonio() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const remove = async (id: number): Promise<TestimonioResponse | null> => {
    setIsLoading(true);
    try {
      const response = await deleteTestimonio(id);
      router.refresh();
      return response;
    } catch (error) {
      console.error("Error deleting testimonio:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { remove, isLoading };
};




export function useCreateTestimonio() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: TestimonioCreateData): Promise<TestimonioResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await createTestimonio(data);
      
      if (response.success) {
        toast.success("testimonio creado exitosamente", {
          description: "El testimonio ha sido registrado correctamente."
        });
        router.refresh();
        return response;
      } else {
        throw new Error(response.message || "Error al crear el testimonio");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido al crear el testimonio";
      setError(errorMessage);
      toast.error("Error al crear testimonio", {
        description: errorMessage
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { create, isLoading, error, clearError };
};




export function useUpdateTestimonio() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: number, data: TestimonioUpdateData): Promise<TestimonioResponse | null> => { 
    setIsLoading(true);
    setError(null);

    try {
      const response = await updateTestimonio(id, data);
      
      if (response.success) {
        toast.success("Testimonio actualizado exitosamente", {
          description: "El testimonio ha sido actualizado correctamente."
        });
        router.refresh();
        return response;
      } else {
        throw new Error(response.message || "Error al actualizar el testimonio");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido al actualizar el testimonio";
      setError(errorMessage);
      toast.error("Error al actualizar testimonio", {
        description: errorMessage
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { update, isLoading, error, clearError };
};



export function useRandomTestimonios(count: number = 3) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testimonios, setTestimonios] = useState<TestimonioType[]>([]);

  const fetchRandom = async (): Promise<TestimonioType[] | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getRandomTestimonios(count);

      if (response.success && response.data) {
        const data = (Array.isArray(response.data) ? response.data : [response.data])
          .map(c => ({
            ...c,
            createdDate: new Date(c.createdDate ?? ""),
          }));

        setTestimonios(data);
        return data;
      }
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      toast.error('Error al cargar testimonios', {
        description: errorMessage,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandom();
  }, [count]);

  return {
    fetchRandom,
    testimonios,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}




export function useLatestTestimonios(count: number = 3) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testimonios, setTestimonios] = useState<TestimonioType[]>([]);

  const fetchLatest = async (): Promise<TestimonioType[] | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getLatestTestimonios(count);

      if (response.success && response.data) {
        const data = (Array.isArray(response.data) ? response.data : [response.data])
          .map(c => ({
            ...c,
            createdDate: new Date(c.createdDate ?? ""),
          }));

        setTestimonios(data);
        return data;
      }
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      toast.error('Error al cargar testimonios', {
        description: errorMessage,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatest();
  }, [count]);

  return {
    fetchLatest,
    testimonios,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}



