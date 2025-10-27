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