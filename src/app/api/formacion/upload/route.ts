import { NextRequest } from "next/server"
import { uploadBufferToCloudinary } from "@/src/lib/cloudinary"
import {
  sendBadRequest,
  sendCreated,
  sendServerError,
  sendUnauthorized,
} from "@/src/utils/httpResponse"
import { getServerSession } from "@/src/lib/server-auth"

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
] as const

const MAX_SIZE = 30 * 1024 * 1024 // 30 MB

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return sendUnauthorized("Debes iniciar sesión para subir archivos")
    }

    const formData = await request.formData()
    const file = formData.get("file")
    const titulo = (formData.get("titulo") as string | null) ?? ""

    if (!(file instanceof File)) {
      return sendBadRequest("No se proporcionó ningún archivo")
    }
    if (!titulo.trim()) {
      return sendBadRequest("Se requiere un título para el archivo")
    }

    if (!ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number])) {
      return sendBadRequest("Tipo de archivo no permitido")
    }
    if (file.size > MAX_SIZE) {
      return sendBadRequest("El archivo es demasiado grande. Máximo 30MB")
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Images go to "image" resource type so transformations work; documents
    // (PDF, DOC, XLS) go to "raw" so Cloudinary serves them as-is.
    const isImage = file.type.startsWith("image/")
    const resourceType = isImage ? "image" : "raw"

    const result = await uploadBufferToCloudinary(
      buffer,
      "jmv/formacion",
      resourceType
    )

    return sendCreated(
      {
        Data: {
          filePath: result.secure_url,
          publicId: result.public_id,
          fileName: result.public_id.split("/").pop() || file.name,
          originalName: file.name,
          size: result.bytes,
          type: file.type,
          resourceType: result.resource_type,
        },
      },
      "Archivo subido exitosamente a Cloudinary"
    )
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error)
    return sendServerError("Error al subir el archivo", error)
  }
}
