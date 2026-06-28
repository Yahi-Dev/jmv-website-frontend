// src/lib/cloudinary-loader.ts
//
// Loader personalizado de next/image. Optimiza las imágenes alojadas en
// Cloudinary a través de su propia CDN, insertando transformaciones en la URL:
//   f_auto   → sirve el mejor formato soportado por el navegador (AVIF/WebP)
//   q_auto   → calidad automática (mejor peso/calidad sin elegir un número fijo)
//   c_limit  → nunca AMPLÍA por encima del tamaño original (sin pérdida ni upscaling)
//   w_{width}→ redimensiona al ancho que pide next/image para cada breakpoint
//
// Las URLs que NO son de Cloudinary (assets locales como /logo.png, picsum,
// data:, blob:) se devuelven SIN cambios: se sirven tal cual, igual que antes.
//
// Ventaja: la optimización ocurre en la CDN de Cloudinary (no en el optimizador
// de Vercel), por lo que no consume cuota de Vercel y escala bien.
//
// Debe ser una función PURA (se ejecuta también en el cliente): sin acceso a
// variables de entorno de servidor ni a APIs de Node.

interface CloudinaryLoaderParams {
  src: string
  width: number
  quality?: number
}

const UPLOAD_MARKER = "/image/upload/"

export default function cloudinaryLoader({ src, width, quality }: CloudinaryLoaderParams): string {
  // Solo transformamos subidas de imágenes de Cloudinary.
  const isCloudinaryImage = src.includes("res.cloudinary.com") && src.includes(UPLOAD_MARKER)
  if (!isCloudinaryImage) {
    // Local, picsum, data:, blob: → sin cambios.
    return src
  }

  // Evita duplicar la transformación si la URL ya fue procesada por este loader.
  if (src.includes(`${UPLOAD_MARKER}f_auto,`)) {
    return src
  }

  const params = ["f_auto", quality ? `q_${quality}` : "q_auto", "c_limit", `w_${width}`].join(",")
  // Inserta la transformación justo después de /image/upload/.
  return src.replace(UPLOAD_MARKER, `${UPLOAD_MARKER}${params}/`)
}
