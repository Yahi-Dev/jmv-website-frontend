"use client";

import { useState, useMemo, useEffect } from "react";
import { ModuleTab, FormacionType } from "../model/types";
import { useGetAllFormaciones, useDeleteFormacion, useUpdateFormacion } from "../hook/use-formacion";
import { getClientUser } from "@/src/lib/client-auth";
import { ModulosFormacion } from "@/src/lib/enum/ModulosFormacion";
import { FormacionCard } from "./FormacionCard";
import { FormacionFormDialog } from "./formacion-form-dialog";
import { DeleteFormacionDialog } from "./delete-formacion-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { FormacionCreateData, FormacionUpdateData } from "../schema/validation";

export interface TabContentProps {
  readonly tab: ModuleTab;
  readonly searchTerm: string;
}

export function TabContent({ tab, searchTerm }: TabContentProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingFormacion, setEditingFormacion] = useState<FormacionType | null>(null);
  const [deletingFormacion, setDeletingFormacion] = useState<FormacionType | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const { formaciones: formacionesBD, fetchAll } = useGetAllFormaciones();
  const { remove: deleteFormacion, isLoading: isDeleting } = useDeleteFormacion();
  const { update: updateFormacion, isLoading: isUpdating } = useUpdateFormacion();

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

  const handleEdit = (formacion: FormacionType) => {
    setEditingFormacion(formacion);
    setEditDialogOpen(true);
  };

  const handleDelete = (formacion: FormacionType) => {
    setDeletingFormacion(formacion);
    setDeleteDialogOpen(true);
  };

  const handleEditConfirm = async (data: FormacionCreateData | FormacionUpdateData) => {
    if (editingFormacion) {
      await updateFormacion(editingFormacion.id, data as FormacionUpdateData);
      await fetchAll();
      setEditDialogOpen(false);
      setEditingFormacion(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingFormacion) {
      await deleteFormacion(deletingFormacion.id);
      await fetchAll();
      setDeleteDialogOpen(false);
      setDeletingFormacion(null);
    }
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
    <>
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
                    onEdit={() => handleEdit(formacion)}
                    onDelete={() => handleDelete(formacion)}
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

        {/* Indicadores de posición - corregido para usar IDs únicos */}
        {filteredFormaciones.length > 1 && (
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2">
              {filteredFormaciones.map((formacion) => (
                <div
                  key={`indicator-${formacion.id}`}
                  className="w-2 h-2 rounded-full bg-muted"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dialog para editar formación */}
      <FormacionFormDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleEditConfirm}
        isLoading={isUpdating}
        initialData={editingFormacion || undefined}
        mode="edit"
      />

      {/* Dialog para eliminar formación */}
      <DeleteFormacionDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        formacionName={deletingFormacion?.titulo || ""}
      />
    </>
  );
}