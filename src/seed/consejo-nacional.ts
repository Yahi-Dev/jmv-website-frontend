// src/seed/consejo-nacional.ts
import { CargoConsejo, EstadoMiembro, PrismaClient } from "@prisma/client"

const img = (seed: string) => `https://picsum.photos/seed/${seed}/600/600`

const miembrosActuales: {
  nombre: string
  cargo: CargoConsejo
  ciudad: string
  bioCorta: string
  bioExtendida: string
  telefono: string
  email: string
  estado: EstadoMiembro
  trayectoria: { anio: number; rol: string; lugar?: string }[]
}[] = [
  {
    nombre: "Patricia Mercedes Castillo",
    cargo: "CoordinadorNacional",
    ciudad: "Santo Domingo",
    bioCorta: "Trabajadora social y miembro de JMV desde hace 14 años. Coordinadora Nacional desde 2024.",
    bioExtendida:
      "Patricia comenzó en JMV a los 17 años en la Catedral Primada de América. Trabajadora social de profesión, ha acompañado a comunidades vulnerables en la Zona Colonial y en bateyes del Este. Antes de coordinar a nivel nacional sirvió como Subcoordinadora y Vocal de Misión.",
    telefono: "+1 (809) 555-0101",
    email: "patricia.castillo@jmvrd.org",
    estado: "Titular",
    trayectoria: [
      { anio: 2010, rol: "Aspirante", lugar: "Catedral Primada" },
      { anio: 2014, rol: "Coordinadora de Centro", lugar: "Catedral Primada" },
      { anio: 2018, rol: "Vocal Nacional de Misión y Caridad" },
      { anio: 2021, rol: "Subcoordinadora Nacional" },
      { anio: 2024, rol: "Coordinadora Nacional" },
    ],
  },
  {
    nombre: "Carla Beatriz Polanco",
    cargo: "SecretarioNacional",
    ciudad: "Santiago",
    bioCorta: "Comunicadora social. Lleva la voz y la memoria del consejo desde Santiago.",
    bioExtendida:
      "Carla es periodista egresada de la PUCMM. Ha trabajado en medios diocesanos y se especializa en comunicación pastoral. Llevó adelante la modernización del archivo histórico de JMV-RD.",
    telefono: "+1 (809) 555-0102",
    email: "carla.polanco@jmvrd.org",
    estado: "Titular",
    trayectoria: [
      { anio: 2015, rol: "Iniciante", lugar: "Santiago" },
      { anio: 2019, rol: "Vocal de Comunicaciones", lugar: "Santiago" },
      { anio: 2024, rol: "Secretaria Nacional" },
    ],
  },
  {
    nombre: "Andrés Felipe Cruz",
    cargo: "TesoreroNacional",
    ciudad: "Santo Domingo",
    bioCorta: "Contador público con visión de servicio. Cuida la transparencia financiera del movimiento.",
    bioExtendida:
      "Andrés es contador con diez años de experiencia en ONG católicas. Su trabajo asegura la transparencia económica del movimiento y abre puertas a fuentes de financiamiento responsables.",
    telefono: "+1 (809) 555-0103",
    email: "andres.cruz@jmvrd.org",
    estado: "Titular",
    trayectoria: [
      { anio: 2013, rol: "Comprometido", lugar: "Catedral Primada" },
      { anio: 2020, rol: "Tesorero de Centro" },
      { anio: 2024, rol: "Tesorero Nacional" },
    ],
  },
  {
    nombre: "Lucía Esther Brito",
    cargo: "VocalDeFormacion",
    ciudad: "La Vega",
    bioCorta: "Catequista y formadora. Diseña los programas formativos de los seis módulos.",
    bioExtendida:
      "Lucía estudió Teología Pastoral. Coordina la elaboración de los materiales formativos que usan los centros del país. Ha facilitado más de cuarenta retiros nacionales.",
    telefono: "+1 (809) 555-0104",
    email: "lucia.brito@jmvrd.org",
    estado: "Titular",
    trayectoria: [
      { anio: 2008, rol: "Aspirante", lugar: "La Vega" },
      { anio: 2017, rol: "Coordinadora Diocesana de Formación" },
      { anio: 2024, rol: "Vocal Nacional de Formación" },
    ],
  },
  {
    nombre: "Yahaira del Rosario",
    cargo: "VocalDeMisionYCaridad",
    ciudad: "Higüey",
    bioCorta: "Misionera apasionada. Coordina las salidas misioneras nacionales.",
    bioExtendida:
      "Yahaira ha participado en más de veinte misiones rurales. Su corazón misionero la llevó a fundar un proyecto de alfabetización en parajes de La Altagracia.",
    telefono: "+1 (809) 555-0105",
    email: "yahaira.rosario@jmvrd.org",
    estado: "Titular",
    trayectoria: [
      { anio: 2011, rol: "Aspirante", lugar: "Basílica de Higüey" },
      { anio: 2018, rol: "Coordinadora de Misiones" },
      { anio: 2024, rol: "Vocal Nacional de Misión y Caridad" },
    ],
  },
  {
    nombre: "Roselyn Manuela Féliz",
    cargo: "VocalLiturgiaYMariana",
    ciudad: "Barahona",
    bioCorta: "Animadora litúrgica y devota mariana. Lleva la espiritualidad al corazón del movimiento.",
    bioExtendida:
      "Roselyn coordina equipos de liturgia desde joven. Su devoción a la Virgen de la Medalla Milagrosa marca la espiritualidad del consejo nacional.",
    telefono: "+1 (809) 555-0106",
    email: "roselyn.feliz@jmvrd.org",
    estado: "Titular",
    trayectoria: [
      { anio: 2014, rol: "Iniciante", lugar: "Barahona" },
      { anio: 2020, rol: "Vocal de Liturgia, Centro Barahona" },
      { anio: 2024, rol: "Vocal Nacional de Liturgia y Mariana" },
    ],
  },
  {
    nombre: "Génesis Marizol Almonte",
    cargo: "VocalDeExpansion",
    ciudad: "Puerto Plata",
    bioCorta: "Estratega de crecimiento. Apoya la fundación de nuevos centros JMV.",
    bioExtendida:
      "Génesis ha acompañado la apertura de tres centros nuevos en los últimos cinco años. Su don es identificar parroquias receptivas y formar líderes locales.",
    telefono: "+1 (809) 555-0107",
    email: "genesis.almonte@jmvrd.org",
    estado: "Titular",
    trayectoria: [
      { anio: 2012, rol: "Aspirante", lugar: "Puerto Plata" },
      { anio: 2019, rol: "Coordinadora de Centro", lugar: "Puerto Plata" },
      { anio: 2024, rol: "Vocal Nacional de Expansión" },
    ],
  },
  {
    nombre: "Adriana Sofía Pimentel",
    cargo: "VocalDePrejuveniles",
    ciudad: "Baní",
    bioCorta: "Educadora dedicada al acompañamiento de niños y adolescentes.",
    bioExtendida:
      "Adriana es maestra de primaria y lleva ocho años acompañando pre-juveniles. Diseñó la cartilla \"Pequeños Misioneros\" que se usa en todo el país.",
    telefono: "+1 (809) 555-0108",
    email: "adriana.pimentel@jmvrd.org",
    estado: "Titular",
    trayectoria: [
      { anio: 2016, rol: "Iniciante", lugar: "Baní" },
      { anio: 2021, rol: "Coordinadora de Pre-juveniles, Baní" },
      { anio: 2024, rol: "Vocal Nacional de Pre-juveniles" },
    ],
  },
  {
    nombre: "Joel Andrés Pichardo",
    cargo: "VocalDeCulturaYRecreacion",
    ciudad: "Santiago",
    bioCorta: "Músico y animador cultural. Coordina los grandes encuentros nacionales.",
    bioExtendida:
      "Joel es músico autodidacta y compositor. Ha musicalizado más de quince cantos para JMV-RD y dirige el coro nacional en los encuentros del movimiento.",
    telefono: "+1 (809) 555-0109",
    email: "joel.pichardo@jmvrd.org",
    estado: "Titular",
    trayectoria: [
      { anio: 2013, rol: "Aspirante", lugar: "Santiago" },
      { anio: 2019, rol: "Coordinador de Música, Santiago" },
      { anio: 2024, rol: "Vocal Nacional de Cultura y Recreación" },
    ],
  },
]

export async function seedConsejoNacional(prisma: PrismaClient, _userId: string) {
  console.log("🏛️  Sembrando consejo nacional...")

  await prisma.miembroConsejo.deleteMany()
  await prisma.consejoNacional.deleteMany()

  // Consejo histórico (2021-2023)
  const consejoHistorico = await prisma.consejoNacional.create({
    data: {
      periodo: "2021-2023",
      fechaInicio: new Date("2021-02-15"),
      fechaFin: new Date("2023-12-31"),
      lema: "María, sí ante el Espíritu",
      fotoUrl: img("consejo-2021"),
      isActual: false,
    },
  })

  // Algunos miembros del consejo histórico (no es el actual)
  const historico = [
    { nombre: "Esther María Rodríguez", cargo: "CoordinadorNacional" as CargoConsejo, ciudad: "Santo Domingo" },
    { nombre: "Pedro Luis Ureña", cargo: "SecretarioNacional" as CargoConsejo, ciudad: "Santiago" },
    { nombre: "Vianca Soto", cargo: "VocalDeFormacion" as CargoConsejo, ciudad: "La Vega" },
  ]
  for (const h of historico) {
    await prisma.miembroConsejo.create({
      data: {
        consejoId: consejoHistorico.id,
        nombre: h.nombre,
        cargo: h.cargo,
        ciudad: h.ciudad,
        fotoUrl: img(`historico-${h.nombre.toLowerCase().replace(/\s+/g, "-")}`),
        bioCorta: "Sirvió en el consejo nacional 2021-2023.",
        estado: "Titular",
      },
    })
  }

  // Consejo actual (2024-2026)
  const consejoActual = await prisma.consejoNacional.create({
    data: {
      periodo: "2024-2026",
      fechaInicio: new Date("2024-01-15"),
      fechaFin: new Date("2026-12-31"),
      lema: "Llamados a servir, enviados a amar",
      fotoUrl: img("consejo-2024"),
      isActual: true,
    },
  })

  for (const m of miembrosActuales) {
    await prisma.miembroConsejo.create({
      data: {
        consejoId: consejoActual.id,
        nombre: m.nombre,
        cargo: m.cargo,
        ciudad: m.ciudad,
        fotoUrl: img(`actual-${m.nombre.toLowerCase().replace(/\s+/g, "-")}`),
        bioCorta: m.bioCorta,
        bioExtendida: m.bioExtendida,
        telefono: m.telefono,
        email: m.email,
        estado: m.estado,
        trayectoria: m.trayectoria,
      },
    })
  }

  console.log(`✅ 2 consejos nacionales (1 actual con ${miembrosActuales.length} miembros + 1 histórico)`)
}
