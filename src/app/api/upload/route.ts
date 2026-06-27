import { NextRequest } from "next/server"
import { uploadBufferToCloudinary } from "@/src/lib/cloudinary"
import { sendBadRequest, sendCreated, sendServerError } from "@/src/utils/httpResponse"
import { requireAdmin } from "@/src/lib/server-auth"

// Solo módulos conocidos: se usa como nombre de carpeta en Cloudinary, así que
// la allowlist evita cualquier inyección/recorrido de ruta vía `modulo`.
const ALLOWED_MODULOS = ["noticias", "actividades", "centros", "eventos", "consejos", "miembros"] as const
const MAX_SIZE = 8 * 1024 * 1024 // 8 MB

/** Detecta el tipo real de imagen por sus magic bytes (no confía en file.type). */
function sniffImageType(buf: Buffer): string | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg"
  if (buf.length >= 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "image/png"
  if (buf.length >= 4 && buf.toString("ascii", 0, 3) === "GIF") return "image/gif"
  if (buf.length >= 12 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") return "image/webp"
  return null
}

export async function POST(request: NextRequest) {
  try {
    const guard = await requireAdmin()
    if (!guard.ok) return guard.response

    const formData = await request.formData()
    const file = formData.get("file")
    const modulo = ((formData.get("modulo") as string | null) ?? "").trim().toLowerCase()

    if (!(file instanceof File)) {
      return sendBadRequest("No se proporcionó ningún archivo")
    }
    if (!ALLOWED_MODULOS.includes(modulo as (typeof ALLOWED_MODULOS)[number])) {
      return sendBadRequest("Módulo no permitido")
    }
    if (file.size > MAX_SIZE) {
      return sendBadRequest("La imagen es demasiado grande. Máximo 8 MB")
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Validación por contenido real, no por el tipo declarado (spoofeable).
    const realType = sniffImageType(buffer)
    if (!realType) {
      return sendBadRequest("Solo se permiten imágenes (JPEG, PNG, GIF o WebP)")
    }

    const result = await uploadBufferToCloudinary(buffer, `jmv/${modulo}`, "image")

    return sendCreated(
      {
        Data: {
          filePath: result.secure_url,
          publicId: result.public_id,
          fileName: result.public_id.split("/").pop() || file.name,
          originalName: file.name,
          size: result.bytes,
          type: realType,
          resourceType: result.resource_type,
        },
      },
      "Imagen subida exitosamente a Cloudinary"
    )
  } catch (error) {
    console.error("Error al subir imagen a Cloudinary:", error)
    return sendServerError("Error al subir el archivo", error)
  }
}
