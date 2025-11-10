"use client";

import { useState, useMemo, useEffect } from "react";
import { ModuleCard } from "./ModuleCard";
import { Button } from "@/src/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TabContentProps } from "./TabContent";

const CARDS_PER_PAGE = 4;

export function TabContentCarousel({ tab, searchTerm }: Readonly<TabContentProps>) {
  const [currentPage, setCurrentPage] = useState(0);

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

  if (!filteredModules.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          No se encontraron módulos que coincidan con &quot;{searchTerm}&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Carrusel */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {currentModules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>

      {/* Controles del carrusel */}
      {totalPages > 1 && (
        <>
          {/* Botones de navegación */}
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="absolute w-10 h-10 transform -translate-y-1/2 border rounded-full shadow-lg -left-4 top-1/2 bg-background/80 backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className="absolute w-10 h-10 transform -translate-y-1/2 border rounded-full shadow-lg -right-4 top-1/2 bg-background/80 backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Indicadores de página */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={`page-indicator-${index}`}
                onClick={() => setCurrentPage(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentPage === index 
                    ? "bg-primary w-8" 
                    : "bg-muted w-2 hover:bg-muted-foreground"
                }`}
                aria-label={`Ir a página ${index + 1}`}
              />
            ))}
          </div>

          {/* Contador de página */}
          <div className="mt-2 text-sm text-center text-muted-foreground">
            {currentPage + 1} / {totalPages}
          </div>
        </>
      )}
    </div>
  );
}