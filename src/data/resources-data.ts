import { FileText, Video, Headphones, BookOpen, Users, Heart, Download, ExternalLink, Calendar, MapPin } from "lucide-react";
import { Resource } from "../features/formacion/model/types";


export const RESOURCES_DATA: Resource[] = [
  {
    id: "manual-formador",
    title: "Manual del Formador JMV",
    description: "Guía completa para formadores con metodologías y contenidos",
    icon: FileText,
    actions: {
      primary: {
        label: "Descargar PDF",
        icon: Download,
        variant: "outline"
      },
      secondary: {
        icon: ExternalLink,
        variant: "outline"
      }
    }
  },
  {
    id: "videos-formativos",
    title: "Serie de Videos Formativos",
    description: "Videos sobre carisma vicenciano y espiritualidad JMV",
    icon: Video,
    actions: {
      primary: {
        label: "Ver online",
        icon: ExternalLink,
        variant: "outline"
      },
      secondary: {
        icon: Download,
        variant: "outline"
      }
    }
  },
  {
    id: "podcast-jmv",
    title: "Podcast JMV Voces",
    description: "Reflexiones y testimonios semanales de jóvenes vicencianos",
    icon: Headphones,
    actions: {
      primary: {
        label: "Escuchar",
        icon: ExternalLink,
        variant: "outline"
      },
      secondary: {
        icon: Download,
        variant: "outline"
      }
    }
  },
  {
    id: "biblioteca-digital",
    title: "Biblioteca Digital Vicenciana",
    description: "Textos clásicos de espiritualidad vicenciana",
    icon: BookOpen,
    actions: {
      primary: {
        label: "Acceder",
        icon: ExternalLink,
        variant: "outline"
      },
      secondary: {
        icon: Download,
        variant: "outline"
      }
    }
  },
  {
    id: "dinamicas-grupales",
    title: "Banco de Dinámicas Grupales",
    description: "Actividades para encuentros formativos y retiros",
    icon: Users,
    actions: {
      primary: {
        label: "Descargar PDF",
        icon: Download,
        variant: "outline"
      },
      secondary: {
        icon: ExternalLink,
        variant: "outline"
      }
    }
  },
  {
    id: "oraciones-jmv",
    title: "Liturgia de las Horas JMV",
    description: "Colección de oraciones y reflexiones para cada tiempo",
    icon: Heart,
    actions: {
      primary: {
        label: "Descargar PDF",
        icon: Download,
        variant: "outline"
      },
      secondary: {
        icon: ExternalLink,
        variant: "outline"
      }
    }
  },
  {
    id: "planificador-pastoral",
    title: "Planificador Pastoral Anual",
    description: "Calendario y herramientas para planificación pastoral",
    icon: Calendar,
    actions: {
      primary: {
        label: "Descargar",
        icon: Download,
        variant: "outline"
      },
      secondary: {
        icon: ExternalLink,
        variant: "outline"
      }
    }
  },
  {
    id: "mapa-misiones",
    title: "Mapa de Misiones JMV",
    description: "Geolocalización de comunidades y proyectos misioneros",
    icon: MapPin,
    actions: {
      primary: {
        label: "Explorar",
        icon: ExternalLink,
        variant: "outline"
      },
      secondary: {
        icon: Download,
        variant: "outline"
      }
    }
  },
  {
    id: "curso-online",
    title: "Curso Online: Carisma Vicenciano",
    description: "Formación interactiva con certificación internacional",
    icon: Video,
    actions: {
      primary: {
        label: "Inscribirse",
        icon: ExternalLink,
        variant: "outline"
      },
      secondary: {
        icon: Download,
        variant: "outline"
      }
    }
  },
  {
    id: "revista-digital",
    title: "Revista JMV Digital",
    description: "Publicación trimestral con testimonios y formaciones",
    icon: FileText,
    actions: {
      primary: {
        label: "Leer online",
        icon: ExternalLink,
        variant: "outline"
      },
      secondary: {
        icon: Download,
        variant: "outline"
      }
    }
  },
  {
    id: "app-movil",
    title: "App JMV Móvil",
    description: "Aplicación con recursos espirituales y comunitarios",
    icon: Download,
    actions: {
      primary: {
        label: "Descargar App",
        icon: Download,
        variant: "outline"
      },
      secondary: {
        icon: ExternalLink,
        variant: "outline"
      }
    }
  },
  {
    id: "archivo-historico",
    title: "Archivo Histórico JMV",
    description: "Documentos fundacionales y historia de la asociación",
    icon: BookOpen,
    actions: {
      primary: {
        label: "Consultar",
        icon: ExternalLink,
        variant: "outline"
      },
      secondary: {
        icon: Download,
        variant: "outline"
      }
    }
  }
];