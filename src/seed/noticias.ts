// src/seed/noticias.ts
import { PrismaClient } from "@prisma/client"

const img = (seed: string) => `https://picsum.photos/seed/${seed}/1200/700`
const days = (n: number) => new Date(Date.now() + n * 24 * 60 * 60 * 1000)

const noticias = [
  {
    slug: "mision-de-cuaresma-2026-cierra-con-300-jovenes",
    titulo: "Misión de Cuaresma 2026 cierra con más de 300 jóvenes en Constanza",
    descripcionBreve:
      "La misión nacional de Cuaresma reunió a jóvenes de doce centros del país para visitar parajes rurales del Cibao Central.",
    descripcionCompleta:
      "Durante cinco días intensivos, más de 300 jóvenes recorrieron parajes de Constanza llevando la Medalla Milagrosa, la Novena de Cuaresma y momentos de oración a más de 1,200 familias. La misión culminó con una Eucaristía solemne presidida por Mons. Francisco Ozoria.",
    ubicacion: "Constanza, La Vega",
    fecha: days(-12),
    hora: "5:00 PM",
    tipo: "Misión",
    etiquetas: ["Misión", "Cuaresma", "Cibao"],
    destacada: true,
  },
  {
    slug: "jmv-rd-celebra-30-aniversario",
    titulo: "JMV República Dominicana celebra sus 30 años de presencia juvenil",
    descripcionBreve:
      "Un acto solemne en la Catedral Primada marcó el inicio del año aniversario, con presencia del Cardenal y de los fundadores.",
    descripcionCompleta:
      "El movimiento celebra tres décadas formando jóvenes católicos al estilo vicentino. Durante el año aniversario se realizarán eventos especiales en cada centro JMV del país, culminando con un gran concierto en septiembre.",
    ubicacion: "Catedral Primada de América, Santo Domingo",
    fecha: days(-30),
    hora: "11:00 AM",
    tipo: "Anuncio",
    etiquetas: ["Aniversario", "Histórico"],
    destacada: true,
  },
  {
    slug: "se-funda-nuevo-centro-jmv-en-azua",
    titulo: "Se funda nuevo centro JMV en Azua de Compostela",
    descripcionBreve:
      "Con 18 jóvenes iniciales, la Parroquia Nuestra Señora de los Remedios acoge el doceavo centro JMV del país.",
    descripcionCompleta:
      "Tras un año de discernimiento y acompañamiento por parte de la Vocalía Nacional de Expansión, oficialmente se constituye el centro JMV en Azua. La eucaristía de fundación fue presidida por el párroco y por la Coordinadora Nacional, Patricia Castillo.",
    ubicacion: "Azua de Compostela",
    fecha: days(-45),
    hora: "10:00 AM",
    tipo: "Comunidad",
    etiquetas: ["Expansión", "Nuevo centro", "Azua"],
    destacada: true,
  },
  {
    slug: "encuentro-formadores-renueva-materiales",
    titulo: "Encuentro de Formadores actualiza materiales de los seis módulos",
    descripcionBreve:
      "Cuarenta formadores de todo el país trabajaron juntos en la revisión pedagógica de los itinerarios formativos.",
    descripcionCompleta:
      "Tres días de trabajo intenso permitieron actualizar los materiales formativos. Los nuevos itinerarios incorporan elementos de la Doctrina Social de la Iglesia y dan más espacio a la lectio divina. Los recursos estarán disponibles para descarga en la sección de Formación.",
    ubicacion: "Centro Pastoral San Vicente, Santo Domingo",
    fecha: days(-60),
    tipo: "Formación",
    etiquetas: ["Formadores", "Materiales", "Pedagogía"],
    destacada: false,
  },
  {
    slug: "jovenes-jmv-en-jornada-altagracia",
    titulo: "120 jóvenes JMV peregrinan a Higüey el 21 de enero",
    descripcionBreve:
      "La peregrinación nacional juvenil reunió a miembros de ocho centros del país a los pies de la Patrona.",
    descripcionCompleta:
      "Como cada año, JMV-RD se sumó a la peregrinación nacional a la Basílica de Nuestra Señora de la Altagracia. Salieron a las 5:00 AM desde la Catedral Primada y celebraron la Eucaristía en Higüey junto a miles de fieles.",
    ubicacion: "Higüey, La Altagracia",
    fecha: days(-90),
    hora: "10:00 AM",
    tipo: "Espiritualidad",
    etiquetas: ["Peregrinación", "Mariano", "Altagracia"],
    destacada: false,
  },
  {
    slug: "podcast-camino-vicenciano-supera-10000-descargas",
    titulo: "Podcast 'Camino Vicenciano' supera las 10,000 descargas",
    descripcionBreve:
      "El podcast oficial del movimiento celebra su primer hito de audiencia gracias al apoyo de jóvenes en todo el país.",
    descripcionCompleta:
      "El podcast 'Camino Vicenciano', producido por la Vocalía de Comunicaciones, lleva ocho meses al aire con episodios semanales sobre espiritualidad, formación y testimonios. Está disponible en Spotify, YouTube y Apple Podcasts.",
    ubicacion: "Online",
    fecha: days(-15),
    tipo: "Anuncio",
    etiquetas: ["Podcast", "Comunicación", "Digital"],
    destacada: false,
  },
  {
    slug: "vigilia-pentecostes-transmitida-en-vivo",
    titulo: "Vigilia de Pentecostés será transmitida en vivo desde la Catedral",
    descripcionBreve:
      "La tradicional vigilia nacional se podrá seguir desde cualquier punto del país a través de las redes sociales.",
    descripcionCompleta:
      "Por primera vez la Vigilia Nacional de Pentecostés será transmitida íntegramente por YouTube y Facebook Live. Los centros que no puedan viajar a Santo Domingo podrán unirse comunitariamente desde sus capillas locales.",
    ubicacion: "Catedral Primada / Online",
    fecha: days(-7),
    hora: "8:00 PM",
    tipo: "Anuncio",
    etiquetas: ["Pentecostés", "Online", "Transmisión"],
    destacada: false,
  },
  {
    slug: "mision-bateyes-san-pedro",
    titulo: "Misión en bateyes de San Pedro impacta a 80 familias",
    descripcionBreve:
      "El centro JMV de San Pedro de Macorís realizó su misión anual en bateyes de la región Este.",
    descripcionCompleta:
      "Veinticinco jóvenes del centro JMV de San Pedro dedicaron una semana al servicio en cuatro bateyes de la zona cañera. Llevaron alimentos, medicinas básicas y catequesis para niños. La iniciativa contó con el apoyo de Cáritas Diocesana.",
    ubicacion: "Bateyes, San Pedro de Macorís",
    fecha: days(-50),
    tipo: "Misión",
    etiquetas: ["Bateyes", "San Pedro", "Caridad"],
    destacada: false,
  },
  {
    slug: "encuentro-jovenes-cibao-reune-180",
    titulo: "Encuentro Juvenil del Cibao reúne a 180 miembros",
    descripcionBreve:
      "Centros de Santiago, La Vega, Moca y Puerto Plata se congregaron en Casa Episcopal por una jornada de fraternidad.",
    descripcionCompleta:
      "El encuentro regional fortaleció lazos entre los cuatro centros del Cibao. Talleres de profundización vicentina, plenarias y una velada cultural marcaron el día.",
    ubicacion: "Santiago de los Caballeros",
    fecha: days(-25),
    hora: "9:00 AM",
    tipo: "Encuentro",
    etiquetas: ["Cibao", "Regional", "Fraternidad"],
    destacada: false,
  },
  {
    slug: "nueva-coordinadora-de-vocalia-mariana",
    titulo: "Roselyn Féliz asume como Vocal Nacional de Liturgia y Mariana",
    descripcionBreve:
      "La joven barahonera releva en el cargo a Esther Rodríguez tras tres años de servicio en el consejo anterior.",
    descripcionCompleta:
      "En la primera reunión del nuevo consejo nacional 2024-2026, Roselyn Manuela Féliz asumió oficialmente la Vocalía de Liturgia y Mariana. Su devoción mariana y su experiencia litúrgica desde Barahona la convierten en pieza clave del nuevo equipo.",
    ubicacion: "Santo Domingo",
    fecha: days(-100),
    tipo: "Comunidad",
    etiquetas: ["Consejo", "Vocalía", "Liderazgo"],
    destacada: false,
  },
  {
    slug: "jmv-acompana-novena-medalla-milagrosa",
    titulo: "JMV acompaña la novena nacional a la Medalla Milagrosa",
    descripcionBreve:
      "Del 18 al 27 de noviembre los doce centros se unirán en oración por las intenciones de la Iglesia y el país.",
    descripcionCompleta:
      "La novena nacional a la Medalla Milagrosa, tradición vicentina celebrada en todo el mundo, será coordinada simultáneamente en los doce centros JMV del país. Cada noche un centro distinto presidirá la oración por streaming.",
    ubicacion: "Multicentros",
    fecha: days(-3),
    tipo: "Espiritualidad",
    etiquetas: ["Medalla Milagrosa", "Novena", "Oración"],
    destacada: false,
  },
  {
    slug: "encuentro-pre-juveniles-bonao",
    titulo: "Encuentro Nacional de Pre-Juveniles arrasa en Bonao",
    descripcionBreve:
      "Más de 90 niños de 9 a 13 años vivieron una jornada inolvidable en el Centro Recreativo Maná.",
    descripcionCompleta:
      "El primer Encuentro Nacional de Pre-Juveniles superó toda expectativa. Niños de cinco centros disfrutaron de gymkhana misionera, catequesis dinámica y mucha alegría. La Vocalía Nacional de Pre-Juveniles ya prepara la edición 2026.",
    ubicacion: "Bonao, Monseñor Nouel",
    fecha: days(-70),
    hora: "8:30 AM",
    tipo: "Encuentro",
    etiquetas: ["Pre-juveniles", "Niños", "Bonao"],
    destacada: false,
  },
  {
    slug: "lanzamiento-cartilla-pequenos-misioneros",
    titulo: "Lanzan cartilla 'Pequeños Misioneros' para pre-juveniles",
    descripcionBreve:
      "El nuevo material formativo está dirigido a animadores de pre-juveniles y a los mismos niños del movimiento.",
    descripcionCompleta:
      "La cartilla 'Pequeños Misioneros', diseñada por Adriana Pimentel y un equipo de educadores católicos, ofrece treinta sesiones formativas adaptadas a niños de 9 a 13 años. Disponible en formato impreso y digital en la sección de Formación.",
    ubicacion: "Online + impreso",
    fecha: days(-40),
    tipo: "Formación",
    etiquetas: ["Pre-juveniles", "Material", "Lanzamiento"],
    destacada: false,
  },
  {
    slug: "asesor-nacional-publica-carta-pastoral",
    titulo: "Asesor Nacional publica carta pastoral 'Servir es amar'",
    descripcionBreve:
      "El P. Antonio Báez, CM, dirige una carta a todos los miembros del movimiento al inicio del nuevo año pastoral.",
    descripcionCompleta:
      "El Asesor Nacional de JMV-RD invita a todos los miembros a vivir el año pastoral con espíritu de servicio y entrega. La carta reflexiona sobre los signos de los tiempos y desafía a la juventud vicentina a salir hacia las periferias.",
    ubicacion: "Nacional",
    fecha: days(-110),
    tipo: "Espiritualidad",
    etiquetas: ["Pastoral", "Asesor", "Carta"],
    destacada: false,
  },
  {
    slug: "convocatoria-asamblea-nacional-2026",
    titulo: "Abren convocatoria para la Asamblea Nacional 2026",
    descripcionBreve:
      "Los coordinadores de centro tienen hasta el 15 de marzo para inscribir a sus delegados.",
    descripcionCompleta:
      "La Secretaría Nacional abre oficialmente las inscripciones para la Asamblea Nacional 2026, a celebrarse en Bayaguana. Cada centro puede enviar hasta tres delegados además del coordinador. Más detalles en la sección de Eventos.",
    ubicacion: "Casa de Encuentros San Vicente, Bayaguana",
    fecha: days(-5),
    tipo: "Anuncio",
    etiquetas: ["Asamblea", "Inscripciones", "2026"],
    destacada: false,
  },
]

export async function seedNoticias(prisma: PrismaClient, _userId: string) {
  console.log("📰 Sembrando noticias...")
  await prisma.noticia.deleteMany()
  for (const n of noticias) {
    await prisma.noticia.create({
      data: { ...n, imagenUrl: img(n.slug) },
    })
  }
  console.log(`✅ ${noticias.length} noticias creadas (3 destacadas)`)
}
