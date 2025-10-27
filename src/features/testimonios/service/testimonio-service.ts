import { TestimonioType } from "../model/types";
import { TestimonioCreateData, TestimonioUpdateData } from "../schema/validation";


export interface TestimonioResponse {
  success: boolean;
  message: string;
  data?: TestimonioType | TestimonioType[];
}




export async function getAllTestimonios(params?: {
  isActive?: boolean;
  search?: string;
}): Promise<TestimonioResponse> {
  try {
    const url = new URL("/api/testimonios", window.location.origin);

    if (params) {
      if (params.search) {
        url.searchParams.append("search", params.search);
      }
    }

    const response = await fetch(url.toString());
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener los testimonios");
    }

    return {
      success: true,
      message: "Testimonios obtenidos correctamente",
      data: result.items || result.data || []  
    };
  } catch (error) {
    console.error("Error al obtener testimonios:", error);
    throw error;
  }
}




export async function createTestimonio(
  data: TestimonioCreateData
): Promise<TestimonioResponse> {
  try {
    const response = await fetch("/api/testimonios", {
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
    console.error("Error en crear testimonio:", error);
    throw error;
  }  
}  




export async function getTestimonioById(id: number): Promise<TestimonioResponse> {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("ID inválido");
  }

  const response = await fetch(`/api/testimonios/${id}`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });

  const result = await response.json().catch(() => ({} as any));


  if (!response.ok) {
    const msg = result?.message || (response.status === 404
      ? "Testimonio no encontrado"
      : "Error al obtener el testimonio");
    throw new Error(msg);
  }

  if (!result?.success || !result?.data) {
    throw new Error(result?.message || "Respuesta inesperada del servidor");
  }

  return {
    success: true,
    message: result.message || "Testimonio obtenido correctamente",
    data: result.data as TestimonioType,
  };
}




export async function updateTestimonio(
  id: number,
  data: TestimonioUpdateData & { isActive?: boolean }
): Promise<TestimonioResponse> {
  try {
    
    const response = await fetch(`/api/testimonios?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.message || "Error al actualizar el testimonio");
      } catch {
        throw new Error(errorText || "Error al actualizar el testimonio");
      }
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Error al actualizar el testimonio");
    }

    return result;
  } catch (error) {
    console.error("Error al actualizar testimonio:", error);
    throw error;
  }
}



export async function deleteTestimonio(id: number): Promise<TestimonioResponse> {
  try {
    const response = await fetch(`/api/testimonios?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar testimonio");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar testimonio:", error);
    throw error;
  }
}




export async function getRandomTestimonios(count: number = 3): Promise<TestimonioResponse> {
  try {
    const response = await fetch(`/api/testimonios/random?count=${count}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener testimonios aleatorios");
    }

    return {
      success: true,
      message: "Testimonios aleatorios obtenidos correctamente",
      data: result.data || []
    };
  } catch (error) {
    console.error("Error al obtener testimonios aleatorios:", error);
    throw error;
  }
}




export async function getLatestTestimonios(count: number = 3): Promise<TestimonioResponse> {
  try {
    const response = await fetch(`/api/testimonios/latest?count=${count}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener testimonios recientes");
    }

    return {
      success: true,
      message: "Testimonios recientes obtenidos correctamente",
      data: result.data || []
    };
  } catch (error) {
    console.error("Error al obtener testimonios recientes:", error);
    throw error;
  }
}