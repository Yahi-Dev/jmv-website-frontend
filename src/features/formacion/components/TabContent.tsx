"use client";

import { useState, useMemo, useEffect } from "react";
import { ModuleCard } from "./ModuleCard";
import { Button } from "@/src/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ModuleTab } from "../model/types";
import { useGetAllFormaciones } from "../hook/use-formacion";
import { getClientUser } from "@/src/lib/client-auth";
import { ModulosFormacion } from "@/src/lib/enum/ModulosFormacion";
import { FormacionCard } from "./FormacionCard";

export interface TabContentProps {
  readonly tab: ModuleTab;
  readonly searchTerm: string;
}

const CARDS_PER_PAGE = 4;

// Tipo para el contenido combinado
type CombinedContent = 
  | { type: 'module'; data: any } // Módulos predefinidos
  | { type: 'formacion'; data: any }; // Formaciones de BD

export function TabContent({ tab, searchTerm }: TabContentProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const { formaciones: formacionesBD, fetchAll } = useGetAllFormaciones();

  // Filtrar módulos predefinidos basado en el término de búsqueda
  const filteredModules = useMemo(() => {
    if (!searchTerm.trim()) {
      return tab.modules || [];
    }

    return (tab.modules || []).filter(module =>
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [tab.modules, searchTerm]);

  // Filtrar formaciones de BD por módulo y búsqueda
  const filteredFormaciones = useMemo(() => {
    const formacionesDelModulo = formacionesBD.filter(formacion => 
      formacion.modulo === tab.value
    );

    if (!searchTerm.trim()) {
      return formacionesDelModulo;
    }

    return formacionesDelModulo.filter(formacion =>
      formacion.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formacion.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [formacionesBD, tab.value, searchTerm]);

  // Combinar ambos tipos de contenido
  const allContent: CombinedContent[] = useMemo(() => {
    const modules = filteredModules.map(module => ({
      type: 'module' as const,
      data: module
    }));

    const formaciones = filteredFormaciones.map(formacion => ({
      type: 'formacion' as const,
      data: formacion
    }));

    return [...modules, ...formaciones];
  }, [filteredModules, filteredFormaciones]);

  // Calcular páginas
  const totalPages = Math.ceil(allContent.length / CARDS_PER_PAGE);
  const currentContent = useMemo(() => {
    const startIndex = currentPage * CARDS_PER_PAGE;
    return allContent.slice(startIndex, startIndex + CARDS_PER_PAGE);
  }, [allContent, currentPage]);

  // Resetear página cuando cambia el tab o la búsqueda
  useEffect(() => {
    setCurrentPage(0);
  }, [tab.value, searchTerm]);

  // Cargar formaciones y verificar autenticación
  useEffect(() => {
    const loadData = async () => {
      await fetchAll();
      
      try {
        const user = await getClientUser();
        setIsLoggedIn(!!user);
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    };
    
    loadData();
  }, [fetchAll]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const getModuleColor = (modulo: ModulosFormacion) => {
    const colors = {
      [ModulosFormacion.Voluntario]: "bg-blue-100 text-blue-800",
      [ModulosFormacion.Catequesis]: "bg-green-100 text-green-800",
      [ModulosFormacion.Oraciones]: "bg-purple-100 text-purple-800",
      [ModulosFormacion.Podcast]: "bg-orange-100 text-orange-800",
      [ModulosFormacion.Mision]: "bg-red-100 text-red-800",
      [ModulosFormacion.Guia]: "bg-indigo-100 text-indigo-800",
    };
    return colors[modulo] || "bg-gray-100 text-gray-800";
  };

  if (!allContent.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          No se encontraron módulos que coincidan con &quot;{searchTerm}&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid de contenido */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {currentContent.map((content, index) => {
          if (content.type === 'formacion') {
            return (
              <FormacionCard
                key={`formacion-${content.data.id}`}
                formacion={content.data}
                isLoggedIn={isLoggedIn}
                onEdit={() => {}} // Estas funciones se manejarán en el FormacionCard
                onDelete={() => {}}
                getModuleColor={getModuleColor}
              />
            );
          } else {
            return (
              <ModuleCard key={`module-${content.data.id}`} module={content.data} />
            );
          }
        })}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 pt-4 border-t sm:flex-row">
          {/* Información de página */}
          <div className="text-sm text-muted-foreground">
            Página {currentPage + 1} de {totalPages} •
            Mostrando {currentContent.length} de {allContent.length} elementos
          </div>

          {/* Controles de navegación */}
          <div className="flex items-center gap-2">
            {/* Botón anterior */}
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="h-9 w-9"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Indicadores de página */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index ? "default" : "outline"}
                  size="icon"
                  onClick={() => goToPage(index)}
                  className={`h-8 w-8 text-xs ${currentPage === index
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                    }`}
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            {/* Botón siguiente */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="h-9 w-9"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}