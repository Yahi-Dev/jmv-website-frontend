// src/seed/eventos.ts
import { PrismaClient } from "@prisma/client"

const img = (seed: string) => `https://picsum.photos/seed/${seed}/1200/700`

const days = (n: number) => new Date(Date.now() + n * 24 * 60 * 60 * 1000)

const eventos = [
  {
    slug: "asamblea-nacional-2026",
    titulo: "Asamblea Nacional JMV 2026",
    descripcionBreve:
      "Encuentro anual de coordinadores y delegados de todos los centros JMV del país. Discernimiento, formación y planificación.",
    descripcionCompleta:
      "La Asamblea Nacional reúne a los representantes de los doce centros JMV de República Dominicana para revisar el camino recorrido, discernir el rumbo del próximo año y celebrar la fraternidad del movimiento. Tres días intensos de oración, talleres, plenarias y momentos de descanso compartido.",
    ubicacion: "Casa de Encuentros San Vicente, Bayaguana",
    fecha: days(35),
    hora: "8:00 AM",
    email: "asamblea@jmvrd.org",
    telefono: "+1 (809) 555-2024",
    etiquetas: ["Nacional", "Asamblea", "Coordinadores"],
    actividades: ["Plenarias diarias", "Talleres por vocalía", "Eucaristías presididas por el Asesor Nacional", "Noche cultural"],
    agenda: [
      { dia: "Viernes", actividades: [{ hora: "5:00 PM", actividad: "Llegada e inscripción" }, { hora: "7:30 PM", actividad: "Eucaristía de apertura" }, { hora: "9:00 PM", actividad: "Cena fraterna" }] },
      { dia: "Sábado", actividades: [{ hora: "7:30 AM", actividad: "Laudes y desayuno" }, { hora: "9:00 AM", actividad: "Plenaria: balance del año" }, { hora: "2:00 PM", actividad: "Talleres por vocalía" }, { hora: "7:00 PM", actividad: "Noche cultural" }] },
      { dia: "Domingo", actividades: [{ hora: "8:00 AM", actividad: "Misa de envío" }, { hora: "10:00 AM", actividad: "Compromisos del nuevo año" }] },
    ],
    requisitos: ["Carta del coordinador de centro", "Camiseta blanca para fotos oficiales", "Aporte de RD$ 1,500 para alimentación"],
  },
  {
    slug: "encuentro-nacional-pre-juveniles",
    titulo: "Encuentro Nacional de Pre-Juveniles",
    descripcionBreve: "Niños y adolescentes de 9 a 13 años se reúnen para una jornada de juegos, oración y aprendizaje.",
    descripcionCompleta:
      "Un día completo dedicado a los pre-juveniles del movimiento. Combinamos catequesis dinámica, gymkhana misionera, oración con la Medalla Milagrosa y mucha alegría. Acompañados por sus animadores de centro.",
    ubicacion: "Centro Recreativo Maná, Bonao",
    fecha: days(50),
    hora: "8:30 AM",
    email: "prejuveniles@jmvrd.org",
    telefono: "+1 (809) 555-2025",
    etiquetas: ["Pre-juveniles", "Niños", "Recreación"],
    actividades: ["Gymkhana misionera", "Catequesis dinámica", "Almuerzo comunitario", "Oración mariana"],
    agenda: [{ dia: "Sábado", actividades: [{ hora: "8:30 AM", actividad: "Acogida y dinámicas" }, { hora: "10:00 AM", actividad: "Catequesis: 'Pequeños misioneros'" }, { hora: "12:00 PM", actividad: "Almuerzo" }, { hora: "2:00 PM", actividad: "Gymkhana misionera" }, { hora: "5:00 PM", actividad: "Eucaristía de envío" }] }],
    requisitos: ["Acompañante adulto del centro", "Gorra y bloqueador", "Aporte de RD$ 600"],
  },
  {
    slug: "peregrinacion-altagracia",
    titulo: "Peregrinación a la Basílica de Higüey",
    descripcionBreve: "Peregrinación nacional juvenil a los pies de la Patrona del pueblo dominicano.",
    descripcionCompleta:
      "Cada 21 de enero JMV-RD peregrina a Higüey. Salimos de Santo Domingo en autobuses fletados, oramos juntos en el camino y celebramos la Eucaristía con miles de peregrinos en la Basílica de Nuestra Señora de la Altagracia.",
    ubicacion: "Basílica Nuestra Señora de la Altagracia, Higüey",
    fecha: days(78),
    hora: "5:00 AM",
    email: "peregrinacion@jmvrd.org",
    etiquetas: ["Mariano", "Peregrinación", "Altagracia"],
    actividades: ["Salida en autobús", "Rezo del rosario en el camino", "Eucaristía solemne", "Visita guiada"],
    agenda: [{ dia: "Domingo 21 de enero", actividades: [{ hora: "5:00 AM", actividad: "Salida desde Catedral Primada" }, { hora: "8:00 AM", actividad: "Llegada a Higüey" }, { hora: "10:00 AM", actividad: "Eucaristía solemne" }, { hora: "1:00 PM", actividad: "Almuerzo" }, { hora: "5:00 PM", actividad: "Regreso" }] }],
    requisitos: ["Inscripción previa", "Aporte de RD$ 800 para transporte", "Almuerzo personal o aporte adicional"],
  },
  {
    slug: "vigilia-pentecostes",
    titulo: "Vigilia Nacional de Pentecostés",
    descripcionBreve: "Noche de oración y alabanza preparando la solemnidad del Espíritu Santo.",
    descripcionCompleta:
      "JMV-RD se une cada año en una Vigilia Nacional de Pentecostés, transmitida en vivo por nuestras redes para los centros que no pueden viajar. Es la fiesta del Espíritu, de los dones y del envío misionero.",
    ubicacion: "Catedral Primada de América, Santo Domingo",
    fecha: days(120),
    hora: "8:00 PM",
    email: "liturgia@jmvrd.org",
    etiquetas: ["Pentecostés", "Vigilia", "Liturgia"],
    actividades: ["Adoración eucarística", "Lectio divina", "Cantos del Espíritu", "Eucaristía de medianoche"],
    agenda: [{ dia: "Sábado", actividades: [{ hora: "8:00 PM", actividad: "Apertura y adoración" }, { hora: "9:30 PM", actividad: "Lectio divina" }, { hora: "11:00 PM", actividad: "Cantos del Espíritu" }, { hora: "12:00 AM", actividad: "Eucaristía" }] }],
    requisitos: ["Asistencia abierta", "Vestimenta blanca o roja"],
  },
  {
    slug: "retiro-cuaresma-2026",
    titulo: "Retiro Nacional de Cuaresma 2026",
    descripcionBreve: "Tres días de silencio y discernimiento al inicio del tiempo de Cuaresma.",
    descripcionCompleta:
      "Un retiro intenso para todos los miembros comprometidos del movimiento. Tiempo de silencio, dirección espiritual personalizada y ejercicios al estilo vicentino. Predicado por sacerdotes de la Congregación de la Misión.",
    ubicacion: "Casa de Retiros Santa Luisa, Jarabacoa",
    fecha: days(95),
    hora: "4:00 PM",
    email: "retiros@jmvrd.org",
    etiquetas: ["Cuaresma", "Retiro", "Silencio"],
    actividades: ["Predicaciones", "Confesiones", "Adoración nocturna", "Vía Crucis"],
    agenda: [
      { dia: "Viernes", actividades: [{ hora: "4:00 PM", actividad: "Llegada" }, { hora: "7:00 PM", actividad: "Cena en silencio" }, { hora: "8:30 PM", actividad: "Charla introductoria" }] },
      { dia: "Sábado", actividades: [{ hora: "7:00 AM", actividad: "Laudes" }, { hora: "10:00 AM", actividad: "Predicación" }, { hora: "3:00 PM", actividad: "Vía Crucis" }, { hora: "8:00 PM", actividad: "Adoración" }] },
      { dia: "Domingo", actividades: [{ hora: "8:00 AM", actividad: "Eucaristía de envío" }] },
    ],
    requisitos: ["Comprometidos del movimiento", "Aporte de RD$ 2,500", "Disposición al silencio"],
  },
  {
    slug: "encuentro-formadores",
    titulo: "Encuentro Nacional de Formadores",
    descripcionBreve: "Espacio anual para los formadores de los seis módulos del programa formativo.",
    descripcionCompleta:
      "Quienes acompañan los procesos formativos en los centros se reúnen para revisar contenidos, compartir buenas prácticas y recibir formación continua. Imprescindible para garantizar la calidad pedagógica del movimiento.",
    ubicacion: "Centro Pastoral San Vicente, Santo Domingo",
    fecha: days(60),
    hora: "9:00 AM",
    email: "formacion@jmvrd.org",
    etiquetas: ["Formación", "Formadores", "Pedagogía"],
    actividades: ["Talleres metodológicos", "Mesa redonda con teólogos", "Trabajo en grupos por módulo"],
    agenda: [{ dia: "Sábado", actividades: [{ hora: "9:00 AM", actividad: "Acogida" }, { hora: "10:00 AM", actividad: "Taller: nuevas pedagogías" }, { hora: "2:00 PM", actividad: "Trabajo por módulos" }, { hora: "5:00 PM", actividad: "Eucaristía" }] }],
    requisitos: ["Ser formador activo en un centro", "Material de trabajo personal"],
  },
  {
    slug: "mision-adviento-2026",
    titulo: "Misión de Adviento — Constanza",
    descripcionBreve: "Cinco días de misión en parajes rurales de Constanza preparándonos para la Navidad.",
    descripcionCompleta:
      "Tradición misionera del centro de La Vega que se ha convertido en encuentro nacional. Visitamos casa por casa llevando la Medalla Milagrosa, animamos la Novena de Navidad y acompañamos a familias que muchas veces solo ven al sacerdote una vez al año.",
    ubicacion: "Parajes rurales, Constanza",
    fecha: days(180),
    hora: "Todo el día",
    email: "mision@jmvrd.org",
    etiquetas: ["Misión", "Adviento", "Constanza", "Rural"],
    actividades: ["Visitas casa por casa", "Novena de Navidad", "Catequesis para niños", "Misas en capillas"],
    agenda: [{ dia: "Lunes a Viernes", actividades: [{ hora: "6:00 AM", actividad: "Laudes y desayuno" }, { hora: "8:00 AM", actividad: "Salida a parajes" }, { hora: "5:00 PM", actividad: "Regreso y evaluación" }, { hora: "7:00 PM", actividad: "Eucaristía y cena" }] }],
    requisitos: ["Ser comprometido o pre-comprometido", "Salud apta para zona rural", "Aporte de RD$ 1,800"],
  },
  {
    slug: "concierto-juventud-mariana",
    titulo: "Concierto 'Juventud Mariana' — Aniversario",
    descripcionBreve: "Concierto cristiano abierto al público celebrando los 30 años de JMV en RD.",
    descripcionCompleta:
      "Para celebrar las tres décadas de presencia de JMV en República Dominicana organizamos un gran concierto cristiano con artistas católicos invitados. Entrada libre, donativos voluntarios para los proyectos misioneros del año.",
    ubicacion: "Anfiteatro Puerta del Sol, Santo Domingo",
    fecha: days(240),
    hora: "7:00 PM",
    email: "aniversario30@jmvrd.org",
    etiquetas: ["Cultural", "Aniversario", "Música"],
    actividades: ["Banda en vivo", "Testimonio de fundadores", "Renovación de compromisos"],
    agenda: [{ dia: "Sábado", actividades: [{ hora: "7:00 PM", actividad: "Apertura" }, { hora: "7:30 PM", actividad: "Banda invitada" }, { hora: "9:00 PM", actividad: "Testimonio" }, { hora: "10:00 PM", actividad: "Cierre festivo" }] }],
    requisitos: ["Entrada libre"],
  },
  {
    slug: "encuentro-juvenil-cibao",
    titulo: "Encuentro Juvenil del Cibao",
    descripcionBreve: "Jóvenes de Santiago, La Vega, Moca y Puerto Plata se reúnen en un solo lugar.",
    descripcionCompleta:
      "Encuentro regional para fortalecer la fraternidad entre los centros del Cibao. Una jornada completa de oración, formación y compartir cultural.",
    ubicacion: "Casa Episcopal, Santiago",
    fecha: days(-25),
    hora: "9:00 AM",
    email: "cibao@jmvrd.org",
    etiquetas: ["Regional", "Cibao", "Juventud"],
    actividades: ["Plenaria regional", "Talleres temáticos", "Velada cultural"],
    agenda: [{ dia: "Sábado", actividades: [{ hora: "9:00 AM", actividad: "Llegada" }, { hora: "10:00 AM", actividad: "Plenaria" }, { hora: "2:00 PM", actividad: "Talleres" }, { hora: "7:00 PM", actividad: "Velada" }] }],
    requisitos: ["Pertenecer a un centro del Cibao", "Aporte simbólico de RD$ 500"],
  },
  {
    slug: "jornada-mundial-juventud-jmv",
    titulo: "Pre-JMJ JMV República Dominicana",
    descripcionBreve: "Encuentro preparatorio para la Jornada Mundial de la Juventud, edición JMV.",
    descripcionCompleta:
      "Preparándonos espiritualmente para la próxima Jornada Mundial de la Juventud convocada por el Santo Padre. Un encuentro nacional con énfasis en la dimensión universal de nuestra fe y la pertenencia a la Iglesia Católica.",
    ubicacion: "Casa Salesiana, Santo Domingo",
    fecha: days(150),
    hora: "9:00 AM",
    email: "jmj@jmvrd.org",
    etiquetas: ["Internacional", "JMJ", "Jóvenes"],
    actividades: ["Catequesis sobre la JMJ", "Testimonios de delegados", "Música internacional", "Eucaristía multitudinaria"],
    agenda: [{ dia: "Sábado", actividades: [{ hora: "9:00 AM", actividad: "Apertura" }, { hora: "11:00 AM", actividad: "Catequesis JMJ" }, { hora: "2:00 PM", actividad: "Testimonios" }, { hora: "6:00 PM", actividad: "Eucaristía" }] }],
    requisitos: ["Inscripción previa", "Aporte de RD$ 700"],
  },
]

export async function seedEventos(prisma: PrismaClient, _userId: string) {
  console.log("🎉 Sembrando eventos...")
  await prisma.evento.deleteMany()
  for (const e of eventos) {
    await prisma.evento.create({
      data: { ...e, imagenUrl: img(e.slug) },
    })
  }
  console.log(`✅ ${eventos.length} eventos creados`)
}
