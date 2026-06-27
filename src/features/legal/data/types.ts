export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }

export interface LegalSection {
  title: string
  blocks: LegalBlock[]
}

export interface LegalDoc {
  title: string
  updated: string
  intro?: string
  sections: LegalSection[]
}
