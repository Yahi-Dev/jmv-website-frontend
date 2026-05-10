import { NextRequest, NextResponse } from "next/server"

/**
 * Proxies a Cloudinary asset back to the client with a Content-Disposition
 * attachment header so the browser triggers a real download (and uses the
 * provided filename) instead of just opening it inline.
 *
 * Only allows res.cloudinary.com URLs to prevent open-proxy abuse.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")
  const name = searchParams.get("name") || "documento"

  if (!url) {
    return NextResponse.json({ error: "URL requerida" }, { status: 400 })
  }
  if (!url.startsWith("https://res.cloudinary.com/")) {
    return NextResponse.json({ error: "URL no permitida" }, { status: 400 })
  }

  try {
    const upstream = await fetch(url)
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "No se pudo recuperar el archivo" },
        { status: upstream.status }
      )
    }

    const contentType = upstream.headers.get("content-type") || "application/octet-stream"
    const body = await upstream.arrayBuffer()

    // Preserve original extension if the requested filename has none
    const hasExt = /\.[a-z0-9]{2,5}$/i.test(name)
    const urlExt = url.match(/\.([a-z0-9]{2,5})(?:\?|$)/i)?.[1]
    const safeName = hasExt || !urlExt ? name : `${name}.${urlExt}`

    return new NextResponse(body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${encodeURIComponent(safeName)}"`,
        "Cache-Control": "private, max-age=3600",
      },
    })
  } catch (error) {
    console.error("Error proxying Cloudinary download:", error)
    return NextResponse.json({ error: "Error al descargar archivo" }, { status: 500 })
  }
}
