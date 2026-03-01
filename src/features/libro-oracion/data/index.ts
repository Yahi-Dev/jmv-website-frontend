// src/features/libro-oracion/data/index.ts
import type { Book } from "../types"
import { chapter1 } from "./chapter-1"
import { chapter2 } from "./chapter-2"
import { chapter3 } from "./chapter-3"
import { chapter4 } from "./chapter-4"
import { chapter5 } from "./chapter-5"
import { chapter6 } from "./chapter-6"

export const libroOracion: Book = {
  title: "Libro de Oración JMV",
  subtitle: "República Dominicana",
  authors: ["Elizabeth Fabian", "Jefferson Trinidad"],
  chapters: [chapter1, chapter2, chapter3, chapter4, chapter5, chapter6],
}

export { chapter1, chapter2, chapter3, chapter4, chapter5, chapter6 }
