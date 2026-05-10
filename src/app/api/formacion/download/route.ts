import { NextRequest, NextResponse } from "next/server"
import { CLOUDINARY_CLOUD_NAME } from "@/src/lib/cloudinary"
import {
  sendBadRequest,
  sendServerError,
  sendUnauthorized,
} from "@/src/utils/httpResponse"
import { getServerSession } from "@/src/lib/server-auth"

const ALLOWED_PREFIX = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/`

const buildContentDisposition = (filename: string): string => {
  // RFC 6266: ASCII fallback + filename* with UTF-8 percent-encoding.
  const ascii = filename.replace(/[^\x20-\x7E]/g, "_").replace(/["\\]/g, "_")
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`
}

export async function GET(request: NextRequest) {
  const session = await getServerSession()
  if (!session?.user) {
    return sendUnauthorized("Debes iniciar sesión para descargar archivos")
  }

  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")
  const name = searchParams.get("name") || "documento"

  if (!url) {
    return sendBadRequest("URL requerida")
  }
  if (!url.startsWith(ALLOWED_PREFIX)) {
    return sendBadRequest("URL no permitida")
  }

  try {
    const upstream = await fetch(url)
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { error: "No se pudo recuperar el archivo" },
        { status: upstream.status || 502 }
      )
    }

    const contentType =
      upstream.headers.get("content-type") || "application/octet-stream"

    // Preserve original extension if the requested filename has none
    const hasExt = /\.[a-z0-9]{2,5}$/i.test(name)
    const urlExt = url.match(/\.([a-z0-9]{2,5})(?:\?|$)/i)?.[1]
    const safeName = hasExt || !urlExt ? name : `${name}.${urlExt}`

    return new NextResponse(upstream.body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": buildContentDisposition(safeName),
        "Cache-Control": "private, max-age=3600",
      },
    })
  } catch (error) {
    console.error("Error proxying Cloudinary download:", error)
    return sendServerError("Error al descargar archivo", error)
  }
}
