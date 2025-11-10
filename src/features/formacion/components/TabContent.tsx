"use client";

import { useState, useMemo, useEffect } from "react";
import { ModuleTab } from "../model/types";
import { useGetAllFormaciones } from "../hook/use-formacion";
import { getClientUser } from "@/src/lib/client-auth";
import { ModulosFormacion } from "@/src/lib/enum/ModulosFormacion";
import { FormacionCard } from "./FormacionCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";

export interface TabContentProps {
  readonly tab: ModuleTab;
  readonly searchTerm: string;
}

export function TabContent({ tab, searchTerm }: TabContentProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const { formaciones: formacionesBD, fetchAll } = useGetAllFormaciones();

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

  if (!filteredFormaciones.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          {searchTerm 
            ? `No se encontraron formaciones que coincidan con "${searchTerm}" en ${tab.label}`
            : `No hay formaciones disponibles en ${tab.label}`
          }
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full mt-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {filteredFormaciones.map((formacion) => (
            <CarouselItem 
              key={formacion.id} 
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="p-1">
                <FormacionCard
                  formacion={formacion}
                  isLoggedIn={isLoggedIn}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  getModuleColor={getModuleColor}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Controles de navegación - solo mostrar si hay más de 1 formación */}
        {filteredFormaciones.length > 1 && (
          <>
            <CarouselPrevious className="absolute w-10 h-10 transform -translate-y-1/2 border-2 left-2 top-1/2 bg-background/80 backdrop-blur-sm hover:bg-background" />
            <CarouselNext className="absolute w-10 h-10 transform -translate-y-1/2 border-2 right-2 top-1/2 bg-background/80 backdrop-blur-sm hover:bg-background" />
          </>
        )}
      </Carousel>

      {/* Indicadores de posición (opcional) */}
      {filteredFormaciones.length > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2">
            {filteredFormaciones.map((_, index) => (
              <div
                key={index}
                className="carousel-dot"
                data-active={index === 0} // Esto necesitaría lógica de estado del carrusel
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}