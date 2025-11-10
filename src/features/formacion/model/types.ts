import { ModulosFormacion } from "@/src/lib/enum/ModulosFormacion";

export interface Module {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  items: string[];
  modulo: ModulosFormacion; 
}

export interface ModuleTab {
  value: ModulosFormacion;
  label: string;
  modules: Module[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  actions: {
    primary: {
      label: string;
      icon: React.ComponentType<any>;
      variant: "outline" | "default" | "secondary";
    };
    secondary: {
      icon: React.ComponentType<any>;
      variant: "outline" | "default" | "secondary";
    };
  };
}

export interface Formacion {
  id: number;
  ruta_video?: string;
  titulo?: string;
  detalles?: string;
  modulo: ModulosFormacion; 
  createdDate: Date;
}

export interface FormacionType {
  id: number;
  titulo?: string;
  descripcion?: string;
  modulo?: ModulosFormacion;
  enlace?: string;
  ruta?: string;
  createdDate: Date;
  createdById?: string;
  modifiedDate?: Date;
  modifiedById?: string;
  deleted?: boolean;
  deletedDate?: Date;
  deletedById?: string;
}

export interface FormacionResponse {
  success: boolean;
  message: string;
  data?: FormacionType | FormacionType[];
}

export interface UploadResponse {
  success: boolean;
  message: string;
  filePath?: string;
  fileName?: string;
}