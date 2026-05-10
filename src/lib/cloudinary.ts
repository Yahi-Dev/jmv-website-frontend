import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export type CloudinaryResourceType = "image" | "raw" | "auto" | "video"

export interface UploadResult {
  secure_url: string
  public_id: string
  format: string
  bytes: number
  resource_type: string
  original_filename: string
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
  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
    format: result.format,
    bytes: result.bytes,
    resource_type: result.resource_type,
    original_filename: (result as { original_filename?: string }).original_filename ?? "",
  }
}

export async function deleteFromCloudinary(
  publicId: string,
  resourceType: CloudinaryResourceType = "image"
): Promise<{ result: string }> {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
}

export default cloudinary
