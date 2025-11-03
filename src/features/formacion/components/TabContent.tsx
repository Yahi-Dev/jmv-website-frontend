// TabContent.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { ModuleCard } from "./ModuleCard";
import { Button } from "@/src/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ModuleTab } from "../model/types";

export interface TabContentProps {
  readonly tab: ModuleTab;
  readonly searchTerm: string;
}

const CARDS_PER_PAGE = 4;

export function TabContent({ tab, searchTerm }: TabContentProps) {
  const [currentPage, setCurrentPage] = useState(0);

  // Filtrar módulos basado en el término de búsqueda
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

  // Calcular páginas
  const totalPages = Math.ceil(filteredModules.length / CARDS_PER_PAGE);
  const currentModules = useMemo(() => {
    const startIndex = currentPage * CARDS_PER_PAGE;
    return filteredModules.slice(startIndex, startIndex + CARDS_PER_PAGE);
  }, [filteredModules, currentPage]);

  // Resetear página cuando cambia el tab o la búsqueda
  useEffect(() => {
    setCurrentPage(0);
  }, [tab.value, searchTerm]);

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

  if (!filteredModules.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          No se encontraron módulos que coincidan con "{searchTerm}"
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid de módulos */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {currentModules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 pt-4 border-t sm:flex-row">
          {/* Información de página */}
          <div className="text-sm text-muted-foreground">
            Página {currentPage + 1} de {totalPages} • 
            Mostrando {currentModules.length} de {filteredModules.length} módulos
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
                  className={`h-8 w-8 text-xs ${
                    currentPage === index 
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