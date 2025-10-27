export interface Module {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  items: string[];
}

export interface ModuleTab {
  value: string;
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




export interface Formacion{
  id: number;
  ruta_video?: string;
  titulo?: string;
  detalles?: string;
  modulo?: 'Voluntario' | 'Catequesis' | 'Oraciones' | 'Podcast' | 'Mision' | 'Guia';
  createdDate: Date;
}