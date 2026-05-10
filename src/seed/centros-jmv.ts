// src/seed/centros-jmv.ts
import { PrismaClient } from "@prisma/client"

const img = (seed: string, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`

const centrosData = [
  {
    slug: "santo-domingo-catedral",
    nombreParroquia: "Catedral Primada de América",
    ubicacion: "Calle Arzobispo Meriño, Zona Colonial, Santo Domingo",
    cantidadMiembrosActivos: 65,
    nombreCoordinadora: "María Fernanda Rodríguez",
    telefono: "+1 (809) 685-2128",
    correo: "catedral@jmvrd.org",
    resumen:
      "Centro fundacional ubicado en el corazón histórico de Santo Domingo. Cuna del movimiento JMV en República Dominicana, lleva más de tres décadas formando jóvenes en el carisma vicentino. Sus miembros realizan misiones mensuales a barrios vulnerables y mantienen una vibrante vida sacramental.",
    anioFundacion: 1995,
    etiquetas: ["Fundacional", "Misionero", "Pastoral Juvenil"],
  },
  {
    slug: "santiago-altagracia",
    nombreParroquia: "Parroquia Nuestra Señora de la Altagracia",
    ubicacion: "Av. Estrella Sadhalá, Santiago de los Caballeros",
    cantidadMiembrosActivos: 48,
    nombreCoordinadora: "Carla Beatriz Polanco",
    telefono: "+1 (809) 580-1147",
    correo: "santiago@jmvrd.org",
    resumen:
      "Centro JMV con fuerte presencia universitaria. Acompaña a estudiantes de la PUCMM y la UTESA en su proceso de formación cristiana. Destacan sus retiros de Adviento y Cuaresma que reúnen a jóvenes de toda la región del Cibao.",
    anioFundacion: 1998,
    etiquetas: ["Universitario", "Cibao", "Retiros"],
  },
  {
    slug: "la-vega-concepcion",
    nombreParroquia: "Catedral Inmaculada Concepción",
    ubicacion: "Parque Duarte, La Vega",
    cantidadMiembrosActivos: 32,
    nombreCoordinadora: "Lucía Esther Brito",
    telefono: "+1 (809) 573-2904",
    correo: "lavega@jmvrd.org",
    resumen:
      "Centro vibrante con tradición misionera hacia las zonas rurales del Cibao. Lleva la Medalla Milagrosa a parajes olvidados de Constanza, Jarabacoa y Bonao. Su Encuentro de Adviento es uno de los más esperados del calendario nacional.",
    anioFundacion: 2001,
    etiquetas: ["Rural", "Medalla Milagrosa", "Adviento"],
  },
  {
    slug: "higuey-basilica",
    nombreParroquia: "Basílica Catedral de Nuestra Señora de la Altagracia",
    ubicacion: "Av. de la Libertad, Higüey, La Altagracia",
    cantidadMiembrosActivos: 41,
    nombreCoordinadora: "Yahaira del Rosario",
    telefono: "+1 (809) 554-2291",
    correo: "higuey@jmvrd.org",
    resumen:
      "Centro mariano por excelencia, junto a la Basílica de la Patrona Nacional. Acompaña la peregrinación juvenil del 21 de enero y forma jóvenes guías de oración. Su devoción mariana es contagiosa y profundamente vicentina.",
    anioFundacion: 2003,
    etiquetas: ["Mariano", "Peregrinación", "Patrona Nacional"],
  },
  {
    slug: "san-pedro-de-macoris",
    nombreParroquia: "Parroquia San Pedro Apóstol",
    ubicacion: "Calle Gral. Cabral, San Pedro de Macorís",
    cantidadMiembrosActivos: 27,
    nombreCoordinadora: "Patricia Mercedes Castillo",
    telefono: "+1 (809) 529-3417",
    correo: "spm@jmvrd.org",
    resumen:
      "Centro joven con fuerte presencia entre los bateyes de la región Este. Trabajan con niños descendientes de inmigrantes haitianos y promueven la educación cristiana en zonas marginadas.",
    anioFundacion: 2009,
    etiquetas: ["Bateyes", "Niños", "Inclusión"],
  },
  {
    slug: "barahona-rosario",
    nombreParroquia: "Parroquia Nuestra Señora del Rosario",
    ubicacion: "Calle Padre Billini, Barahona",
    cantidadMiembrosActivos: 22,
    nombreCoordinadora: "Roselyn Manuela Féliz",
    telefono: "+1 (809) 524-3092",
    correo: "barahona@jmvrd.org",
    resumen:
      "Centro de la región Sur con espíritu profundamente misionero. Sirven a comunidades de pescadores y campesinos a lo largo de la Sierra de Bahoruco. Pequeños en número pero grandes en compromiso.",
    anioFundacion: 2011,
    etiquetas: ["Sur", "Pescadores", "Campo"],
  },
  {
    slug: "puerto-plata-san-felipe",
    nombreParroquia: "Catedral San Felipe Apóstol",
    ubicacion: "Parque Independencia, Puerto Plata",
    cantidadMiembrosActivos: 35,
    nombreCoordinadora: "Génesis Marizol Almonte",
    telefono: "+1 (809) 586-2268",
    correo: "puertoplata@jmvrd.org",
    resumen:
      "Centro costero con vocación turística-evangelizadora. Aprovechan su ubicación para acoger jóvenes de paso y ofrecer experiencias de oración frente al mar. Su grupo de oración del rosario reúne a más de 80 jóvenes.",
    anioFundacion: 2007,
    etiquetas: ["Norte", "Turismo religioso", "Rosario"],
  },
  {
    slug: "san-juan-de-la-maguana",
    nombreParroquia: "Catedral San Juan Bautista",
    ubicacion: "Parque Sánchez, San Juan de la Maguana",
    cantidadMiembrosActivos: 19,
    nombreCoordinadora: "Esperanza Altagracia Mateo",
    telefono: "+1 (809) 557-3145",
    correo: "sanjuan@jmvrd.org",
    resumen:
      "Centro pequeño pero histórico de la Región Suroeste. Trabajan con comunidades rurales del Valle de San Juan. Énfasis en la formación catequética y la liturgia popular.",
    anioFundacion: 2013,
    etiquetas: ["Suroeste", "Catequesis", "Liturgia"],
  },
  {
    slug: "bani-regina-pacis",
    nombreParroquia: "Parroquia Nuestra Señora de Regla",
    ubicacion: "Av. Padre Billini, Baní, Peravia",
    cantidadMiembrosActivos: 30,
    nombreCoordinadora: "Adriana Sofía Pimentel",
    telefono: "+1 (809) 522-3174",
    correo: "bani@jmvrd.org",
    resumen:
      "Centro reconocido por su excelente programa de pre-juveniles. Acompañan a niños y adolescentes desde los 9 años en su camino de fe. Cantera de futuros líderes JMV.",
    anioFundacion: 2010,
    etiquetas: ["Pre-juveniles", "Niños", "Liderazgo"],
  },
  {
    slug: "moca-corazon-de-jesus",
    nombreParroquia: "Parroquia Sagrado Corazón de Jesús",
    ubicacion: "Calle Córdoba, Moca, Espaillat",
    cantidadMiembrosActivos: 26,
    nombreCoordinadora: "Yokasta Verónica Tavárez",
    telefono: "+1 (809) 578-2691",
    correo: "moca@jmvrd.org",
    resumen:
      "Centro del Cibao con tradición de servicio en hospitales y hogares de ancianos. Cada sábado un grupo visita el Centro Geriátrico Municipal para llevar oración y cariño.",
    anioFundacion: 2012,
    etiquetas: ["Servicio", "Ancianos", "Hospitalario"],
  },
  {
    slug: "azua-nuestra-senora",
    nombreParroquia: "Parroquia Nuestra Señora de los Remedios",
    ubicacion: "Calle Duarte, Azua de Compostela",
    cantidadMiembrosActivos: 18,
    nombreCoordinadora: "Niurka Esmeralda Heredia",
    telefono: "+1 (809) 521-2308",
    correo: "azua@jmvrd.org",
    resumen:
      "Centro de reciente fundación con energía renovadora. Trabajan en evangelización digital y pastoral familiar. Han creado un canal de YouTube con catequesis breves para jóvenes.",
    anioFundacion: 2018,
    etiquetas: ["Digital", "Familiar", "Reciente"],
  },
]

const cargosFijos = [
  "Coordinador/a", "Subcoordinador/a", "Secretario/a", "Tesorero/a",
  "Vocal de Formación", "Vocal Mariana", "Asesor Espiritual",
]

const nombresMiembros = [
  ["Andrés Felipe Cruz", "Mariangelis Beltré", "Eduardo Rosario", "Vianca Soto", "Luis Gabriel Méndez", "Camila Espinal", "P. Antonio Báez, CM"],
  ["Joel Andrés Pichardo", "Stephany Núñez", "Pedro Luis Ureña", "Anyelina Reyes", "José Ramón Tejada", "Doris Marileny Brito", "P. Carlos Tavárez, CM"],
  ["Wilkin de Jesús Rivera", "Estefany Carolina Polanco", "Manuel Antonio Cabrera", "Isaura Beato", "Brian Anderson Hernández", "Lía Marisol García", "P. Diego Almonte, CM"],
  ["José Miguel Severino", "Massiel del Carmen Báez", "Cristian Eduardo Núñez", "Yamilka Esther Lora", "Reyniel Adolfo Vargas", "Iveth Carolina Pérez", "P. Rafael Estrella, CM"],
  ["Henry Daniel Sánchez", "Wendy Yulissa Cordero", "Joselyn Damaris Ureña", "Edwin Antonio Espinosa", "Nadia Maritza Rodríguez", "Anderson Junior Pereyra", "P. Manuel Ovalles, CM"],
  ["Jeremy Esmeraldo Báez", "Onelvy Patricia Mateo", "Mario Enrique Pérez", "Stephany Yamilet Féliz", "Domingo Antonio Vargas", "Esthefany Catherine Pérez", "P. Iván Encarnación, CM"],
  ["Eddy Manuel Almonte", "Gloria Esther Tavárez", "Junior David Cabreja", "Ailenny Mariel Reynoso", "Wilkin José Mejía", "Fior Daliza Rodríguez", "P. Pablo Severino, CM"],
  ["Adolfo Antonio Mateo", "Yulissa Carolina Mota", "José Israel Pérez", "Linda Cristina Fernández", "Adonis Manuel Solano", "Indira Valeria Báez", "P. Jorge Mejía, CM"],
  ["Manuel Junior Tejada", "Yenny Mariela Cabreja", "Lendy Antonio Núñez", "Jenniferth Carolina Reyes", "Wandy Antonio Sosa", "Roselys Elizabeth Vásquez", "P. Hipólito Brito, CM"],
  ["Joseph Manuel Vargas", "Pamela Cristina Almonte", "Eddy Manuel Cordero", "Aileen Esther Mejía", "Hansel Antonio Estévez", "Nasly Gabriela Ureña", "P. Cristóbal Pérez, CM"],
  ["Edwin Manuel Tejada", "Susana Esther Núñez", "Junior Antonio Méndez", "Daileen Marisol Tavárez", "Adonis Manuel Reyes", "Karla Patricia Ramírez", "P. Hilario Báez, CM"],
  ["Erick Manuel Castillo", "Patricia Yulisa Sánchez", "Romeo Antonio Pérez", "Yensy Carolina Brito", "Juan Carlos Almonte", "Alondra Massiel Rodríguez", "P. Mario Espinal, CM"],
]

const comunidadesPlantilla: { etapa: string; etiquetas: string[] }[] = [
  { etapa: "Aspirantes", etiquetas: ["Iniciación", "Acogida"] },
  { etapa: "Iniciantes", etiquetas: ["Catequesis", "Sacramentos"] },
  { etapa: "Pre-Comprometidos", etiquetas: ["Discernimiento", "Misión"] },
  { etapa: "Comprometidos", etiquetas: ["Liderazgo", "Servicio"] },
]

const actividadesPlantilla = [
  { titulo: "Encuentro de Adviento", resumen: "Jornada de oración y reflexión preparándose para la venida del Señor.", tags: ["Adviento", "Espiritualidad"] },
  { titulo: "Misión a Barrios", resumen: "Visita misionera con la Medalla Milagrosa a familias del entorno parroquial.", tags: ["Misión", "Medalla Milagrosa"] },
  { titulo: "Retiro Mariano", resumen: "Fin de semana de retiro centrado en María como modelo discipular.", tags: ["Mariano", "Retiro"] },
  { titulo: "Vigilia de Pentecostés", resumen: "Noche de oración y alabanza preparando la fiesta del Espíritu Santo.", tags: ["Pentecostés", "Vigilia"] },
  { titulo: "Servicio en Hogar de Ancianos", resumen: "Tarde de servicio, oración y compañía a los más mayores de la comunidad.", tags: ["Servicio", "Caridad"] },
  { titulo: "Catequesis Juvenil", resumen: "Sesión semanal de formación bíblica y doctrinal abierta a jóvenes.", tags: ["Catequesis", "Formación"] },
]

export async function seedCentrosJmv(prisma: PrismaClient, _userId: string) {
  console.log("🏛️  Sembrando centros JMV...")

  // Limpieza por orden de dependencias
  await prisma.actividadJmv.deleteMany()
  await prisma.miembroCentroJmv.deleteMany()
  await prisma.comunidadJmv.deleteMany()
  await prisma.centroJmv.deleteMany()

  // 1) Crear centros sin ultimaActividadId
  for (const c of centrosData) {
    await prisma.centroJmv.create({
      data: {
        slug: c.slug,
        nombreParroquia: c.nombreParroquia,
        ubicacion: c.ubicacion,
        cantidadMiembrosActivos: c.cantidadMiembrosActivos,
        nombreCoordinadora: c.nombreCoordinadora,
        telefono: c.telefono,
        correo: c.correo,
        resumen: c.resumen,
        anioFundacion: c.anioFundacion,
        imagenUrl: img(`centro-${c.slug}`, 1200, 700),
        etiquetas: c.etiquetas,
      },
    })
  }

  const centros = await prisma.centroJmv.findMany({ orderBy: { id: "asc" } })

  // 2) Miembros, comunidades y actividades por centro
  for (let ci = 0; ci < centros.length; ci++) {
    const centro = centros[ci]
    const nombres = nombresMiembros[ci % nombresMiembros.length]

    // Miembros (7 cargos por centro)
    for (let mi = 0; mi < cargosFijos.length; mi++) {
      const nombre = nombres[mi]
      const cargo = cargosFijos[mi]
      await prisma.miembroCentroJmv.create({
        data: {
          centroId: centro.id,
          nombre,
          cargo,
          imagenUrl: img(`miembro-${centro.id}-${mi}`, 400, 400),
          descripcion: `${nombre} sirve como ${cargo} en ${centro.nombreParroquia} desde hace varios años. Su entrega y cercanía con los jóvenes son ejemplo del carisma vicentino que vivimos en JMV.`,
        },
      })
    }

    // Comunidades (3-4 por centro)
    const numComunidades = 3 + (ci % 2)
    for (let co = 0; co < numComunidades; co++) {
      const tpl = comunidadesPlantilla[co % comunidadesPlantilla.length]
      const aniosAtras = 2 + co
      await prisma.comunidadJmv.create({
        data: {
          centroId: centro.id,
          nombre: `${tpl.etapa} de ${centro.nombreParroquia.replace(/^Parroquia |^Catedral |^Basílica /, "")}`,
          imagenUrl: img(`comunidad-${centro.id}-${co}`, 800, 500),
          cantidadMiembros: 8 + Math.floor(Math.random() * 14),
          inicioDate: new Date(Date.now() - aniosAtras * 365 * 24 * 60 * 60 * 1000),
          etapa: tpl.etapa,
          etiquetas: tpl.etiquetas,
        },
      })
    }

    // Actividades (4 por centro, fechas escalonadas)
    const numActividades = 4
    for (let ai = 0; ai < numActividades; ai++) {
      const tpl = actividadesPlantilla[(ci + ai) % actividadesPlantilla.length]
      const diasOffset = ai === 0 ? 14 : -(30 + ai * 45) // primera futura, resto pasadas
      await prisma.actividadJmv.create({
        data: {
          slug: `${centro.slug}-${tpl.titulo.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${ai}`,
          titulo: tpl.titulo,
          centroId: centro.id,
          resumen: tpl.resumen,
          fecha: new Date(Date.now() + diasOffset * 24 * 60 * 60 * 1000),
          imagenUrl: img(`actividad-${centro.id}-${ai}`, 1000, 600),
          etiquetas: tpl.tags,
        },
      })
    }

    // 3) Asignar la "última actividad" más reciente a cada centro
    const ultima = await prisma.actividadJmv.findFirst({
      where: { centroId: centro.id },
      orderBy: { fecha: "desc" },
    })
    if (ultima) {
      await prisma.centroJmv.update({
        where: { id: centro.id },
        data: { ultimaActividadId: ultima.id },
      })
    }
  }

  console.log(`✅ ${centros.length} centros JMV con miembros, comunidades y actividades`)
}
