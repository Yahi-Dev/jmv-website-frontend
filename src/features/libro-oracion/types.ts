// src/features/libro-oracion/types.ts

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "prayer"; title?: string; lines: string[]; centered?: boolean }
  | { type: "quote"; text: string; source?: string }
  | { type: "scripture"; reference: string; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "bold-list"; items: { label: string; text: string }[] }
  | { type: "divider" }
  | { type: "subheading"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }

export type Section = {
  id: string
  title: string
  content: ContentBlock[]
}

export type Chapter = {
  id: string
  number?: number | string
  title: string
  subtitle?: string
  intro?: ContentBlock[]
  sections: Section[]
}

export type Book = {
  title: string
  subtitle: string
  authors: string[]
  chapters: Chapter[]
}
