import { ModuleTab } from "../features/formacion/model/types";

export const MODULES_TABS: ModuleTab[] = [
  {
    value: "catequesis",
    label: "Catequesis",
    modules: [
      {
        id: "catequesis-1",
        title: "Fundamentos de la Fe",
        description: "Introducción a los principios básicos de la fe católica y el carisma vicenciano",
        level: "Nivel Básico",
        duration: "12 semanas",
        items: [
          "Historia de la salvación",
          "Los sacramentos de iniciación",
          "Vida de San Vicente de Paúl",
          "Devoción mariana y vicenciana",
          "La Biblia: introducción y manejo",
          "Oración vocal y litúrgica",
          "Los mandamientos de la Ley de Dios",
          "Virtudes teologales: Fe, Esperanza y Caridad"
        ]
      },
      {
        id: "catequesis-2",
        title: "Profundización Espiritual",
        description: "Desarrollo de la vida espiritual y comprensión del llamado vocacional",
        level: "Nivel Intermedio",
        duration: "16 semanas",
        items: [
          "Oración contemplativa y meditación",
          "Discernimiento vocacional",
          "Espiritualidad vicenciana: características",
          "Compromiso social desde la fe",
          "Los sacramentos de curación",
          "Vida de Santa Luisa de Marillac",
          "Dirección espiritual",
          "Ejercicios de vida devocional"
        ]
      },
      {
        id: "catequesis-3",
        title: "Mística Vicenciana",
        description: "Profundización en la experiencia espiritual del carisma vicenciano",
        level: "Nivel Avanzado",
        duration: "14 semanas",
        items: [
          "La encarnación como modelo de servicio",
          "Espiritualidad de la compasión",
          "Contemplación en la acción",
          "Santidad en lo ordinario",
          "Escuela de la caridad",
          "Mística mariana vicenciana",
          "Los cinco valores JMV",
          "Testimonios de santos vicencianos"
        ]
      }
    ]
  },
  {
    value: "liderazgo",
    label: "Liderazgo",
    modules: [
      {
        id: "liderazgo-1",
        title: "Liderazgo Cristiano",
        description: "Desarrollo de habilidades de liderazgo basadas en valores cristianos",
        level: "Habilidades Básicas",
        duration: "10 semanas",
        items: [
          "Comunicación efectiva y asertiva",
          "Trabajo en equipo colaborativo",
          "Resolución de conflictos desde el evangelio",
          "Planificación pastoral estratégica",
          "Liderazgo servicial según Jesús",
          "Motivación y animación de grupos",
          "Toma de decisiones en comunidad",
          "Delegación y coordinación"
        ]
      },
      {
        id: "liderazgo-2",
        title: "Gestión de Proyectos Pastorales",
        description: "Herramientas prácticas para la gestión de proyectos sociales y pastorales",
        level: "Gestión Práctica",
        duration: "8 semanas",
        items: [
          "Diagnóstico comunitario participativo",
          "Diseño de proyectos sociales",
          "Gestión de recursos limitados",
          "Evaluación de impacto pastoral",
          "Elaboración de presupuestos",
          "Coordinación con instituciones",
          "Sostenibilidad de proyectos",
          "Informes y rendición de cuentas"
        ]
      },
      {
        id: "liderazgo-3",
        title: "Formación de Formadores",
        description: "Preparación para acompañar procesos formativos de nuevos miembros",
        level: "Nivel de Formador",
        duration: "12 semanas",
        items: [
          "Pedagogía vicenciana",
          "Dinámicas de grupo formativas",
          "Acompañamiento personalizado",
          "Evaluación de procesos formativos",
          "Planificación de encuentros",
          "Manejo de grupos juveniles",
          "Transmisión del carisma",
          "Prevención de burnout en el servicio"
        ]
      }
    ]
  },
  {
    value: "doctrina",
    label: "Doctrina Social",
    modules: [
      {
        id: "doctrina-1",
        title: "Doctrina Social de la Iglesia",
        description: "Principios fundamentales de la enseñanza social católica",
        level: "Fundamentos",
        duration: "14 semanas",
        items: [
          "Dignidad de la persona humana",
          "Bien común y solidaridad",
          "Justicia social y distributiva",
          "Opción preferencial por los pobres",
          "Destino universal de los bienes",
          "Subsidiaridad y participación",
          "Los derechos humanos desde la fe",
          "Paz y reconciliación social"
        ]
      },
      {
        id: "doctrina-2",
        title: "Compromiso Social Cristiano",
        description: "Aplicación práctica de la doctrina social en el contexto dominicano",
        level: "Aplicación Práctica",
        duration: "12 semanas",
        items: [
          "Análisis de la realidad social dominicana",
          "Promoción humana integral",
          "Advocacy y incidencia política",
          "Construcción de paz comunitaria",
          "Economía de comunión",
          "Ecología integral",
          "Migración y derechos humanos",
          "Empoderamiento comunitario"
        ]
      },
      {
        id: "doctrina-3",
        title: "Ética Social y Profesional",
        description: "Principios éticos para el ejercicio profesional desde la fe",
        level: "Ética Aplicada",
        duration: "10 semanas",
        items: [
          "Ética en los negocios y economía",
          "Compromiso social empresarial",
          "Profesionales al servicio del Reino",
          "Conflictos éticos en el trabajo",
          "Testimonio cristiano en ambientes seculares",
          "Responsabilidad social corporativa",
          "Emprendimiento con sentido social",
          "Excelencia profesional como servicio"
        ]
      }
    ]
  },
  {
    value: "mision",
    label: "Misión",
    modules: [
      {
        id: "mision-1",
        title: "Formación Misionera",
        description: "Preparación integral para la experiencia misionera",
        level: "Preparación",
        duration: "6 semanas",
        items: [
          "Espiritualidad misionera vicenciana",
          "Metodología de evangelización",
          "Trabajo con comunidades marginadas",
          "Primeros auxilios básicos",
          "Adaptación cultural",
          "Seguridad en misiones",
          "Trabajo en equipo misionero",
          "Salud preventiva en misiones"
        ]
      },
      {
        id: "mision-2",
        title: "Misión de Verano",
        description: "Experiencia práctica de servicio misionero en comunidades rurales",
        level: "Experiencia Práctica",
        duration: "2 semanas",
        items: [
          "Convivencia comunitaria",
          "Actividades pastorales y catequéticas",
          "Proyectos de desarrollo comunitario",
          "Reflexión y sistematización diaria",
          "Visitas domiciliarias",
          "Actividades con niños y jóvenes",
          "Celebraciones litúrgicas comunitarias",
          "Evaluación y proyección post-misión"
        ]
      },
      {
        id: "mision-3",
        title: "Misión Permanente",
        description: "Estrategias para mantener el espíritu misionero en la vida cotidiana",
        level: "Misión Continua",
        duration: "8 semanas",
        items: [
          "Misión en el entorno familiar",
          "Evangelización en el trabajo/estudio",
          "Compromiso parroquial permanente",
          "Voluntariado organizado",
          "Redes de solidaridad",
          "Sensibilización social",
          "Acción política desde la fe",
          "Cultura del encuentro y diálogo"
        ]
      }
    ]
  },
  {
    value: "carisma",
    label: "Carisma Vicenciano",
    modules: [
      {
        id: "carisma-1",
        title: "Identidad JMV",
        description: "Fundamentos históricos y espirituales de la Juventud Mariana Vicenciana",
        level: "Identidad",
        duration: "10 semanas",
        items: [
          "Historia y fundación de JMV",
          "Espiritualidad mariana vicenciana",
          "Los cinco pilares de JMV",
          "Votos y compromisos asociativos",
          "Estructura organizativa mundial",
          "Testimonios de jóvenes JMV",
          "Proyecto de vida JMV",
          "Integración en la Familia Vicenciana"
        ]
      },
      {
        id: "carisma-2",
        title: "Familia Vicenciana",
        description: "Conocimiento y integración en la gran familia fundada por San Vicente",
        level: "Familia",
        duration: "8 semanas",
        items: [
          "Historia de la Familia Vicenciana",
          "Congregación de la Misión (Paúles)",
          "Hijas de la Caridad",
          "Asociación de la Medalla Milagrosa",
          "Sociedad de San Vicente de Paúl",
          "Voluntariado internacional",
          "Carisma compartido",
          "Colaboración inter-congregacional"
        ]
      },
      {
        id: "carisma-3",
        title: "Actualización del Carisma",
        description: "Aplicación del carisma vicenciano a los desafíos contemporáneos",
        level: "Actualización",
        duration: "12 semanas",
        items: [
          "Carisma y modernidad",
          "Nuevas pobrezas y exclusiones",
          "Tecnología al servicio de la caridad",
          "Ecología desde la espiritualidad vicenciana",
          "Diálogo interreligioso e intercultural",
          "Juventud y compromiso social",
          "Redes sociales y evangelización",
          "Profecía vicenciana hoy"
        ]
      }
    ]
  },
  {
    value: "sacramentos",
    label: "Vida Sacramental",
    modules: [
      {
        id: "sacramentos-1",
        title: "Iniciación Cristiana",
        description: "Profundización en los sacramentos de iniciación cristiana",
        level: "Iniciación",
        duration: "9 semanas",
        items: [
          "Bautismo: nueva vida en Cristo",
          "Confirmación: dones del Espíritu Santo",
          "Eucaristía: fuente y cumbre",
          "Mística del cuerpo y la sangre",
          "Preparación para la primera comunión",
          "Renovación de promesas bautismales",
          "Eucaristía y compromiso social",
          "Vida sacramental continua"
        ]
      },
      {
        id: "sacramentos-2",
        title: "Sanación y Reconciliación",
        description: "Sacramentos de curación y su importancia en la vida espiritual",
        level: "Sanación",
        duration: "7 semanas",
        items: [
          "Sacramento de la Reconciliación",
          "Dirección espiritual y confesión",
          "Unción de los enfermos",
          "Sanación interior y liberación",
          "Perdón y reconciliación comunitaria",
          "Acompañamiento en el sufrimiento",
          "Ministerio de consolación",
          "Espiritualidad de la cruz"
        ]
      },
      {
        id: "sacramentos-3",
        title: "Servicio y Misión",
        description: "Sacramentos al servicio de la comunión y la misión",
        level: "Servicio",
        duration: "8 semanas",
        items: [
          "Matrimonio: vocación al amor",
          "Orden sacerdotal: servicio ministerial",
          "Vocaciones en la Iglesia",
          "Espiritualidad laical",
          "Ministerios laicales",
          "Matrimonio y familia cristiana",
          "Celibato por el Reino",
          "Complementariedad de vocaciones"
        ]
      }
    ]
  }
];