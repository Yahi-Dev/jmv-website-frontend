import { FormacionType, FormacionResponse, UploadResponse } from "../model/types";
import { FormacionCreateData, FormacionUpdateData } from "../schema/validation";

export async function getAllFormaciones(params?: {
  isActive?: boolean;
  search?: string;
}): Promise<FormacionResponse> {
  try {
    const url = new URL("/api/formacion", window.location.origin);

    if (params) {
      if (params.search) {
        url.searchParams.append("search", params.search);
      }
    }

    const response = await fetch(url.toString());
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener las formaciones");
    }

    return {
      success: true,
      message: "Formaciones obtenidas correctamente",
      data: result.items || result.data || []
    };
  } catch (error) {
    console.error("Error al obtener formaciones:", error);
    throw error;
  }
}

export async function createFormacion(data: FormacionCreateData): Promise<FormacionResponse> {
  try {
    const response = await fetch("/api/formacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en el servidor");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error en crear formación:", error);
    throw error;
  }
}

export async function getFormacionById(id: number): Promise<FormacionResponse> {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("ID inválido");
  }

  const response = await fetch(`/api/formacion/${id}`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });

  const result = await response.json().catch(() => ({} as any));

  if (!response.ok) {
    const msg = result?.message || (response.status === 404
      ? "Formación no encontrada"
      : "Error al obtener la formación");
    throw new Error(msg);
  }

  if (!result?.success || !result?.data) {
    throw new Error(result?.message || "Respuesta inesperada del servidor");
  }

  return {
    success: true,
    message: result.message || "Formación obtenida correctamente",
    data: result.data as FormacionType,
  };
}

export async function updateFormacion(
  id: number,
  data: FormacionUpdateData
): Promise<FormacionResponse> {
  try {
    const response = await fetch(`/api/formacion?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "Error al actualizar la formación";
      
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
        
        // Si hay errores de validación específicos, mostrarlos
        if (errorData.data?.fieldErrors) {
          const fieldErrors = Object.entries(errorData.data.fieldErrors)
            .map(([field, errors]) => `${field}: ${(errors as string[]).join(', ')}`)
            .join('; ');
          errorMessage = `Errores de validación: ${fieldErrors}`;
        }
      } catch {
        errorMessage = errorText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Error al actualizar la formación");
    }

    return result;
  } catch (error) {
    console.error("Error al actualizar formación:", error);
    throw error;
  }
}

export async function deleteFormacion(id: number): Promise<FormacionResponse> {
  try {
    const response = await fetch(`/api/formacion?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar formación");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar formación:", error);
    throw error;
  }
}

export async function uploadDocument(file: File, titulo: string): Promise<UploadResponse> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('titulo', titulo);
    formData.append('modulo', 'formacion');

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al subir archivo');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al subir documento:', error);
    throw error;
  }
}