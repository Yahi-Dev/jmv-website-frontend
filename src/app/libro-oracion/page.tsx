// src/app/libro-oracion/page.tsx
import type { Metadata } from "next"
import { LibroOracionPage } from "@/src/features/libro-oracion/components/LibroOracionPage"

export const metadata: Metadata = {
  title: "Libro de Oración JMV | Juventud Mariana Vicenciana",
  description:
    "Libro de oración de la Juventud Mariana Vicenciana de República Dominicana. Historia, métodos y oraciones de la tradición vicentina.",
}

export default function Page() {
  return <LibroOracionPage />
}
