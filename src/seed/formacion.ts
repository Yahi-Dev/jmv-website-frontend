// src/seed/formacion.ts
import { ModulosFormacion, PrismaClient } from "@prisma/client"

const formaciones: { titulo: string; descripcion: string; modulo: ModulosFormacion; enlace?: string; ruta?: string }[] = [
  // === Voluntario ===
  {
    titulo: "Manual del Voluntario JMV",
    descripcion: "Guía completa para quienes se acercan por primera vez al servicio voluntario en JMV. Define los principios, derechos, deberes y procesos de acompañamiento.",
    modulo: "Voluntario",
    enlace: "https://jmvinter.org/recursos/manual-voluntario",
  },
  {
    titulo: "Compromiso del Voluntario Vicentino",
    descripcion: "Reflexión sobre lo que significa el compromiso voluntario al estilo de San Vicente: servicio gratuito, humilde y constante con los más necesitados.",
    modulo: "Voluntario",
    enlace: "https://famvin.org/es/voluntariado",
  },
  {
    titulo: "Inducción para Nuevos Voluntarios",
    descripcion: "Material introductorio que se entrega a cada joven que ingresa por primera vez a un centro JMV. Incluye historia, organización y espiritualidad básica.",
    modulo: "Voluntario",
    enlace: "https://jmvinter.org/induccion",
  },

  // === Catequesis ===
  {
    titulo: "Catequesis sobre la Medalla Milagrosa",
    descripcion: "Diez catequesis sobre el origen, simbología y significado espiritual de la Medalla Milagrosa, regalo de María a Catalina Labouré en 1830.",
    modulo: "Catequesis",
    enlace: "https://jmvinter.org/recursos/medalla",
  },
  {
    titulo: "Doctrina Social de la Iglesia para Jóvenes",
    descripcion: "Itinerario de doce sesiones que introduce los principios fundamentales de la DSI: dignidad humana, bien común, subsidiariedad y solidaridad.",
    modulo: "Catequesis",
    enlace: "https://www.vatican.va/roman_curia/pontifical_councils/justpeace",
  },
  {
    titulo: "Catequesis Vicentina Vol. 1",
    descripcion: "Primer volumen de la serie de catequesis vicencianas adaptadas para jóvenes. Cubre la vida y obra de San Vicente y Santa Luisa.",
    modulo: "Catequesis",
    enlace: "https://famvin.org/catequesis",
  },
  {
    titulo: "Sacramentos y Vida Cristiana",
    descripcion: "Catequesis sobre los siete sacramentos como caminos de gracia. Material adaptado para jóvenes en proceso de iniciación cristiana.",
    modulo: "Catequesis",
    enlace: "https://www.vatican.va/archive/catechism_sp",
  },

  // === Oraciones ===
  {
    titulo: "Devocionario Mariano JMV",
    descripcion: "Recopilación de oraciones marianas usadas tradicionalmente en JMV: rosario, novena de la Medalla Milagrosa, ángelus y consagraciones.",
    modulo: "Oraciones",
    enlace: "https://jmvinter.org/devocionario",
  },
  {
    titulo: "Lectio Divina para Jóvenes",
    descripcion: "Guía paso a paso para iniciar la práctica de la lectio divina. Cuatro momentos: lectura, meditación, oración y contemplación.",
    modulo: "Oraciones",
    enlace: "https://www.vatican.va/lectio",
  },
  {
    titulo: "Liturgia de las Horas Simplificada",
    descripcion: "Versión adaptada de la Liturgia de las Horas para uso comunitario en grupos juveniles. Laudes y vísperas para cada día de la semana.",
    modulo: "Oraciones",
    enlace: "https://liturgiadelashoras.com",
  },

  // === Podcast ===
  {
    titulo: "Camino Vicenciano — Episodio 1",
    descripcion: "Episodio inaugural del podcast oficial de JMV-RD. Entrevista a la Coordinadora Nacional sobre los desafíos del año pastoral.",
    modulo: "Podcast",
    enlace: "https://open.spotify.com/show/jmvrd-camino-vicenciano",
  },
  {
    titulo: "Camino Vicenciano — Especial Adviento",
    descripcion: "Serie de cuatro episodios especiales para el tiempo de Adviento. Cada episodio acompaña una semana del camino al Nacimiento.",
    modulo: "Podcast",
    enlace: "https://open.spotify.com/show/jmvrd-camino-vicenciano",
  },
  {
    titulo: "Cómo Iniciar tu Propio Podcast Cristiano",
    descripcion: "Tutorial práctico para centros que quieran lanzar su propio podcast. Equipos básicos, edición, distribución y consejos pastorales.",
    modulo: "Podcast",
    enlace: "https://anchor.fm",
  },

  // === Misión ===
  {
    titulo: "Manual del Misionero Vicentino",
    descripcion: "Guía operativa para preparar y desarrollar misiones populares al estilo vicentino. Logística, espiritualidad, dinámicas y evaluación.",
    modulo: "Mision",
    enlace: "https://famvin.org/mision",
  },
  {
    titulo: "Misión a Bateyes — Buenas Prácticas",
    descripcion: "Documento elaborado por el centro JMV de San Pedro con lecciones aprendidas en años de servicio en bateyes de la zona Este.",
    modulo: "Mision",
    enlace: "https://jmvrd.org/bateyes",
  },
  {
    titulo: "Visita Misionera Casa por Casa",
    descripcion: "Esquema sugerido para visitas misioneras en zonas rurales. Incluye saludo, oración, reflexión bíblica y entrega de la Medalla Milagrosa.",
    modulo: "Mision",
    enlace: "https://jmvinter.org/visita",
  },

  // === Guía ===
  {
    titulo: "Guía del Coordinador de Centro",
    descripcion: "Recurso esencial para quien asume la coordinación de un centro JMV. Funciones, calendario tipo, gestión de equipo y acompañamiento espiritual.",
    modulo: "Guia",
    enlace: "https://jmvrd.org/guias/coordinador",
  },
  {
    titulo: "Guía de Animación de Comunidades",
    descripcion: "Recursos para animadores de comunidades de aspirantes, iniciantes, pre-comprometidos y comprometidos. Adaptaciones por etapa formativa.",
    modulo: "Guia",
    enlace: "https://jmvrd.org/guias/animador",
  },
  {
    titulo: "Guía Pedagógica del Formador",
    descripcion: "Pedagogía vicentina aplicada a la formación juvenil. Cómo preparar una sesión, dinámicas recomendadas y herramientas de evaluación.",
    modulo: "Guia",
    enlace: "https://jmvrd.org/guias/formador",
  },
  {
    titulo: "Guía de Asesores Espirituales",
    descripcion: "Material dirigido a sacerdotes, religiosas y religiosos vicentinos que acompañan centros JMV. Aspectos pastorales, sacramentales y de discernimiento.",
    modulo: "Guia",
    enlace: "https://jmvrd.org/guias/asesor",
  },
]

export async function seedFormacion(prisma: PrismaClient, _userId: string) {
  console.log("📖 Sembrando formación...")
  await prisma.formacion.deleteMany()
  for (const f of formaciones) {
    await prisma.formacion.create({
      data: {
        titulo: f.titulo,
        descripcion: f.descripcion,
        modulo: f.modulo,
        enlace: f.enlace || "",
        ruta: f.ruta || "",
      },
    })
  }
  console.log(`✅ ${formaciones.length} formaciones creadas (3-4 por módulo)`)
}
