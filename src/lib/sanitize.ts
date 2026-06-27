import sanitizeHtml from "sanitize-html"

/**
 * Etiquetas permitidas para HTML generado por el editor MinimalTiptap.
 * Mantén esta lista alineada con las extensiones habilitadas en el editor.
 */
const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "code",
  "pre",
  "blockquote",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "hr",
  "span",
  "div",
]

/**
 * Sanitiza HTML producido por un editor enriquecido (TipTap) antes de
 * persistirlo. Bloquea <script>, <style>, <iframe>, atributos `on*`,
 * `style`, `javascript:` URIs y cualquier etiqueta/atributo fuera de la
 * lista permitida.
 *
 * Usa `sanitize-html` (puro, sin jsdom) para que funcione de forma
 * confiable en el runtime serverless.
 *
 * Devuelve `null` si la entrada es nula/indefinida o si tras sanitizar
 * queda vacío.
 */
export function sanitizeRichHtml(input: unknown): string | null {
  if (typeof input !== "string") return null
  const trimmed = input.trim()
  if (!trimmed) return null

  const clean = sanitizeHtml(trimmed, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      "*": ["href", "src", "alt", "title", "target", "rel", "class"],
    },
    // Solo esquemas seguros; bloquea javascript: y similares.
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https", "data"] },
    allowProtocolRelative: false,
    // Elimina por completo el contenido de etiquetas peligrosas.
    nonTextTags: ["script", "style", "textarea", "noscript", "iframe"],
  })

  return clean.trim() || null
}
