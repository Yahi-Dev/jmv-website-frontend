import { ModuleTab } from "../features/formacion/model/types";
import { ModulosFormacion } from "../lib/enum/ModulosFormacion";

export const MODULES_TABS: ModuleTab[] = [
  {
    value: ModulosFormacion.Voluntario,
    label: "Voluntario",
    modules: [
      {
        id: "voluntario-1",
        title: "Formación Básica para Voluntarios",
        description: "Introducción al servicio voluntario desde la espiritualidad vicenciana",
        level: "Nivel Básico",
        duration: "8 semanas",
        modulo: ModulosFormacion.Voluntario,
        items: [
          "Espiritualidad del servicio",
          "Valores vicencianos",
          "Habilidades de comunicación",
          "Trabajo en equipo",
          "Ética del voluntariado",
          "Acompañamiento espiritual",
          "Primeros auxilios básicos",
          "Proyectos de voluntariado"
        ]
      },
      {
        id: "voluntario-2",
        title: "Voluntariado Especializado",
        description: "Formación para servicios específicos de voluntariado",
        level: "Nivel Intermedio",
        duration: "10 semanas",
        modulo: ModulosFormacion.Voluntario,
        items: [
          "Trabajo con personas en situación de calle",
          "Atención a adultos mayores",
          "Apoyo a niños y jóvenes",
          "Gestión de emergencias",
          "Coordinación de equipos",
          "Planificación de actividades",
          "Evaluación de proyectos",
          "Sostenibilidad del voluntariado"
        ]
      }
    ]
  },
  {
    value: ModulosFormacion.Catequesis,
    label: "Catequesis",
    modules: [
      {
        id: "catequesis-1",
        title: "Fundamentos de la Fe",
        description: "Introducción a los principios básicos de la fe católica y el carisma vicenciano",
        level: "Nivel Básico",
        duration: "12 semanas",
        modulo: ModulosFormacion.Catequesis,
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
        modulo: ModulosFormacion.Catequesis,
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
      }
    ]
  },
  {
    value: ModulosFormacion.Oraciones,
    label: "Oraciones",
    modules: [
      {
        id: "oraciones-1",
        title: "Escuela de Oración",
        description: "Aprende diferentes métodos y formas de oración cristiana",
        level: "Todos los niveles",
        duration: "6 semanas",
        modulo: ModulosFormacion.Oraciones,
        items: [
          "Oración vocal y litúrgica",
          "Meditación y contemplación",
          "Lectio Divina",
          "Oración de quietud",
          "Oración con la Palabra de Dios",
          "Oración mariana",
          "Oración comunitaria",
          "Discernimiento espiritual"
        ]
      },
      {
        id: "oraciones-2",
        title: "Oraciones Vicencianas",
        description: "Oraciones propias de la espiritualidad vicenciana",
        level: "Nivel Intermedio",
        duration: "4 semanas",
        modulo: ModulosFormacion.Oraciones,
        items: [
          "Oración de San Vicente de Paúl",
          "Oración de Santa Luisa de Marillac",
          "Oración del Misionero",
          "Oración por los pobres",
          "Oración de la Medalla Milagrosa",
          "Oraciones comunitarias JMV",
          "Oración por las vocaciones",
          "Oración de envío misionero"
        ]
      }
    ]
  },
  {
    value: ModulosFormacion.Podcast,
    label: "Podcast",
    modules: [
      {
        id: "podcast-1",
        title: "Producción de Contenido Espiritual",
        description: "Aprende a crear podcasts con contenido formativo y espiritual",
        level: "Nivel Básico",
        duration: "8 semanas",
        modulo: ModulosFormacion.Podcast,
        items: [
          "Guionización de contenidos",
          "Técnicas de locución",
          "Edición de audio básica",
          "Plataformas de distribución",
          "Contenido para redes sociales",
          "Entrevistas espirituales",
          "Planificación de temporadas",
          "Métrica y evaluación"
        ]
      },
      {
        id: "podcast-2",
        title: "Podcasting Avanzado",
        description: "Técnicas avanzadas para producción de podcasts de calidad",
        level: "Nivel Avanzado",
        duration: "10 semanas",
        modulo: ModulosFormacion.Podcast,
        items: [
          "Sonido profesional en estudio",
          "Edición avanzada con software",
          "Estrategias de marketing digital",
          "Monetización de contenidos",
          "Producción en vivo",
          "Colaboraciones y redes",
          "Análisis de audiencia",
          "Sostenibilidad del proyecto"
        ]
      }
    ]
  },
  {
    value: ModulosFormacion.Mision,
    label: "Misión",
    modules: [
      {
        id: "mision-1",
        title: "Formación Misionera",
        description: "Preparación integral para la experiencia misionera",
        level: "Preparación",
        duration: "6 semanas",
        modulo: ModulosFormacion.Mision,
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
        modulo: ModulosFormacion.Mision,
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
      }
    ]
  },
  {
    value: ModulosFormacion.Guia,
    label: "Guía",
    modules: [
      {
        id: "guia-1",
        title: "Guía Espiritual Básica",
        description: "Formación para el acompañamiento espiritual básico",
        level: "Nivel Básico",
        duration: "12 semanas",
        modulo: ModulosFormacion.Guia,
        items: [
          "Fundamentos de la dirección espiritual",
          "Escucha activa y empática",
          "Discernimiento espiritual básico",
          "Acompañamiento en la oración",
          "Ética del acompañamiento",
          "Límites y referimientos",
          "Confidencialidad y discreción",
          "Crecimiento en la vida virtuosa"
        ]
      },
      {
        id: "guia-2",
        title: "Acompañamiento Avanzado",
        description: "Formación para acompañamiento espiritual especializado",
        level: "Nivel Avanzado",
        duration: "16 semanas",
        modulo: ModulosFormacion.Guia,
        items: [
          "Acompañamiento en crisis espirituales",
          "Dirección espiritual avanzada",
          "Acompañamiento vocacional",
          "Espiritualidad del perdón y reconciliación",
          "Acompañamiento en el sufrimiento",
          "Formación de nuevos guías",
          "Supervisión de casos",
          "Espiritualidad para el burnout"
        ]
      }
    ]
  }
];