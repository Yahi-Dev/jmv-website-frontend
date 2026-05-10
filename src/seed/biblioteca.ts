// src/seed/biblioteca.ts
import { PrismaClient } from "@prisma/client"

const docs = [
  { titulo: "Estatutos JMV República Dominicana", ruta_doc: "https://jmvrd.org/docs/estatutos-jmv-rd.pdf" },
  { titulo: "Reglamento Interno del Movimiento", ruta_doc: "https://jmvrd.org/docs/reglamento-interno.pdf" },
  { titulo: "Itinerario Formativo Vol. I", ruta_doc: "https://jmvrd.org/docs/itinerario-vol-1.pdf" },
  { titulo: "Itinerario Formativo Vol. II", ruta_doc: "https://jmvrd.org/docs/itinerario-vol-2.pdf" },
  { titulo: "Cantoral JMV-RD 2024", ruta_doc: "https://jmvrd.org/docs/cantoral-2024.pdf" },
  { titulo: "Calendario Litúrgico Vicentino", ruta_doc: "https://jmvrd.org/docs/calendario-liturgico.pdf" },
  { titulo: "Memoria Anual 2024", ruta_doc: "https://jmvrd.org/docs/memoria-2024.pdf" },
  { titulo: "Plan Pastoral 2024-2026", ruta_doc: "https://jmvrd.org/docs/plan-pastoral.pdf" },
]

export async function seedBiblioteca(prisma: PrismaClient, userId: string) {
  console.log("📚 Sembrando biblioteca...")
  await prisma.biblioteca.deleteMany()
  for (const d of docs) {
    await prisma.biblioteca.create({
      data: {
        titulo: d.titulo,
        ruta_doc: d.ruta_doc,
        createdById: userId,
      },
    })
  }
  console.log(`✅ ${docs.length} documentos en biblioteca`)
}
