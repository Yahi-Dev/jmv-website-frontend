// src/seed/database_seeder.ts
import { PrismaClient } from "@prisma/client"
import { seedUsers } from "./users"
import { seedLookups } from "./lookups"
import { seedCentrosJmv } from "./centros-jmv"
import { seedConsejoNacional } from "./consejo-nacional"
import { seedEventos } from "./eventos"
import { seedNoticias } from "./noticias"
import { seedFormacion } from "./formacion"
import { seedTestimonios } from "./testimonios"
import { seedBiblioteca } from "./biblioteca"

async function runSeeders() {
  console.log("🌱 Starting database seeding...\n")
  const prisma = new PrismaClient()
  const start = Date.now()

  try {
    // 1. Auth user (returns user id for FK references)
    const userId = await seedUsers(prisma)

    // 2. Lookup tables
    await seedLookups(prisma, userId)

    // 3. Public-facing JMV domain models (independent — order doesn't matter)
    await seedCentrosJmv(prisma, userId)
    await seedConsejoNacional(prisma, userId)
    await seedEventos(prisma, userId)
    await seedNoticias(prisma, userId)
    await seedFormacion(prisma, userId)
    await seedTestimonios(prisma, userId)
    await seedBiblioteca(prisma, userId)

    const elapsed = ((Date.now() - start) / 1000).toFixed(1)
    console.log(`\n🎉 Database seeding completed in ${elapsed}s`)
    console.log("\n📊 Resumen:")
    console.log("   • 1 usuario admin")
    console.log("   • Catálogos (estatus, tipos, vocalías, valores, cargos, etapas, tipos de noticias)")
    console.log("   • 12 centros JMV (con miembros, comunidades y actividades)")
    console.log("   • 2 consejos nacionales (1 actual con 9 vocales + 1 histórico)")
    console.log("   • 10 eventos (mix pasados y futuros)")
    console.log("   • 15 noticias (3 destacadas)")
    console.log("   • 19 formaciones (~3 por módulo)")
    console.log("   • 15 testimonios")
    console.log("   • 8 documentos en biblioteca")
  } catch (error) {
    console.error("\n💥 Database seeding failed:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

runSeeders()
