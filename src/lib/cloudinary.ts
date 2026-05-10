import "server-only"
import { v2 as cloudinary, UploadApiResponse } from "cloudinary"
import { Readable } from "stream"

const requireEnv = (name: string): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `[cloudinary] Falta la variable de entorno requerida: ${name}`
    )
  }
  return value
}

cloudinary.config({
  cloud_name: requireEnv("CLOUDINARY_CLOUD_NAME"),
  api_key: requireEnv("CLOUDINARY_API_KEY"),
  api_secret: requireEnv("CLOUDINARY_API_SECRET"),
})

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!

export type CloudinaryResourceType = "image" | "raw" | "auto" | "video"

export interface UploadResult {
  secure_url: string
  public_id: string
  format: string
  bytes: number
  resource_type: string
  original_filename: string
}

const toUploadResult = (result: UploadApiResponse): UploadResult => ({
  secure_url: result.secure_url,
  public_id: result.public_id,
  format: result.format,
  bytes: result.bytes,
  resource_type: result.resource_type,
  original_filename:
    (result as { original_filename?: string }).original_filename ?? "",
})

export async function uploadBufferToCloudinary(
  buffer: Buffer,
  folder: string,
  resourceType: CloudinaryResourceType = "auto"
): Promise<UploadResult> {
  return new Promise<UploadResult>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) return reject(error)
        if (!result) return reject(new Error("Cloudinary returned no result"))
        resolve(toUploadResult(result))
      }
    )
    Readable.from(buffer).pipe(stream)
  })
}

export async function uploadToCloudinary(
  base64DataUri: string,
  folder: string,
  resourceType: CloudinaryResourceType = "auto"
): Promise<UploadResult> {
  const result = await cloudinary.uploader.upload(base64DataUri, {
    folder,
    resource_type: resourceType,
    use_filename: true,
    unique_filename: true,
  })
  return toUploadResult(result)
}

export async function deleteFromCloudinary(
  publicId: string,
  resourceType: CloudinaryResourceType = "image"
): Promise<{ result: string }> {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
}

export default cloudinary
