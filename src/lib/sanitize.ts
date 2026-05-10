import DOMPurify from "isomorphic-dompurify"

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

const ALLOWED_ATTR = ["href", "src", "alt", "title", "target", "rel", "class"]

/**
 * Sanitiza HTML producido por un editor enriquecido (TipTap) antes de
 * persistirlo. Bloquea <script>, atributos `on*`, `javascript:` URIs y
 * cualquier etiqueta/atributo fuera de la lista permitida.
 *
 * Devuelve `null` si la entrada es nula/indefinida o si tras sanitizar
 * queda vacío.
 */
export function sanitizeRichHtml(input: unknown): string | null {
  if (typeof input !== "string") return null
  const trimmed = input.trim()
  if (!trimmed) return null

  const clean = DOMPurify.sanitize(trimmed, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form"],
    FORBID_ATTR: ["style", "onerror", "onload", "onclick"],
  })

  return clean.trim() || null
}
