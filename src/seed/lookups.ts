// src/seed/lookups.ts — Tablas de catálogo / lookup
import { PrismaClient } from "@prisma/client"

export async function seedLookups(prisma: PrismaClient, userId: string) {
  console.log("📚 Sembrando tablas de catálogo...")

  // Estatus
  const estatuses = ["Activo", "Inactivo", "Suspendido", "En Formación"]
  for (let i = 0; i < estatuses.length; i++) {
    await prisma.estatus.upsert({
      where: { id: i + 1 },
      update: { nombre: estatuses[i] },
      create: { nombre: estatuses[i], createdById: userId },
    })
  }

  // Tipos de vocalía
  const tipos = ["Espiritualidad", "Formación", "Misión y Caridad", "Cultura y Recreación"]
  for (let i = 0; i < tipos.length; i++) {
    await prisma.tipo.upsert({
      where: { id: i + 1 },
      update: { nombre: tipos[i] },
      create: { nombre: tipos[i], createdById: userId },
    })
  }

  // Vocalías
  const vocalias = [
    { nombre: "Vocalía de Formación", tipo: 2 },
    { nombre: "Vocalía de Liturgia", tipo: 1 },
    { nombre: "Vocalía Mariana", tipo: 1 },
    { nombre: "Vocalía de Misión", tipo: 3 },
    { nombre: "Vocalía de Caridad", tipo: 3 },
    { nombre: "Vocalía de Cultura", tipo: 4 },
    { nombre: "Vocalía de Pre-juveniles", tipo: 2 },
  ]
  for (let i = 0; i < vocalias.length; i++) {
    await prisma.vocalia.upsert({
      where: { id: i + 1 },
      update: { nombre: vocalias[i].nombre, id_Tipovocalia: vocalias[i].tipo },
      create: {
        nombre: vocalias[i].nombre,
        id_Tipovocalia: vocalias[i].tipo,
        createdById: userId,
      },
    })
  }

  // Valores cristianos
  const valores = [
    "Humildad", "Sencillez", "Caridad", "Mansedumbre", "Mortificación",
    "Celo Apostólico", "Fe", "Esperanza", "Servicio", "Compromiso",
    "Fraternidad", "Discernimiento",
  ]
  for (let i = 0; i < valores.length; i++) {
    await prisma.valor.upsert({
      where: { id: i + 1 },
      update: { nombre: valores[i] },
      create: { nombre: valores[i], createdById: userId },
    })
  }

  // Tipos de noticias
  const noticiaTipos = ["Misión", "Encuentro", "Formación", "Espiritualidad", "Comunidad", "Anuncio"]
  for (const nombre of noticiaTipos) {
    await prisma.noticiaTipo.upsert({
      where: { nombre },
      update: { activo: true },
      create: { nombre, activo: true },
    })
  }

  // Cargos en centros JMV
  const cargosCentro = [
    "Coordinador/a", "Subcoordinador/a", "Secretario/a", "Tesorero/a",
    "Vocal de Formación", "Vocal de Liturgia", "Vocal Mariana", "Asesor Espiritual",
  ]
  for (const nombre of cargosCentro) {
    await prisma.cargoCentroJmv.upsert({
      where: { nombre },
      update: { activo: true },
      create: { nombre, activo: true },
    })
  }

  // Etapas de comunidades JMV
  const etapas = ["Aspirantes", "Iniciantes", "Pre-Comprometidos", "Comprometidos", "Vocacionales"]
  for (const nombre of etapas) {
    await prisma.etapaComunidadJmv.upsert({
      where: { nombre },
      update: { activo: true },
      create: { nombre, activo: true },
    })
  }

  console.log("✅ Catálogos listos")
}
