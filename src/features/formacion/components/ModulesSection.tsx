"use client";

import { useState, useMemo, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Search, X, Plus } from "lucide-react";
import { TabContent } from "./TabContent";
import { ModulosFormacion } from "@/src/lib/enum/ModulosFormacion";
import { getClientUser } from "@/src/lib/client-auth";
import { FormacionFormDialog } from "./formacion-form-dialog";
import { useCreateFormacion, useGetAllFormaciones } from "../hook/use-formacion";

// Crear tabs dinámicos basados en el enum ModulosFormacion
const MODULES_TABS = Object.values(ModulosFormacion).map(modulo => ({
  value: modulo,
  label: modulo,
  modules: [] as [] 
}));

export function ModulesSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(MODULES_TABS[0].value);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const { create, isLoading: isCreating } = useCreateFormacion();
  const { fetchAll } = useGetAllFormaciones();

  // Encontrar el tab activo actual
  const activeTabData = useMemo(() => {
    return MODULES_TABS.find(tab => tab.value === activeTab);
  }, [activeTab]);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as ModulosFormacion);
  };

  const handleCreate = async (data: any) => {
    await create(data);
    await fetchAll();
    setCreateDialogOpen(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getClientUser();
        setIsLoggedIn(!!user);
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    };
    checkAuth();
  }, []);

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Módulos de Formación</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Nuestro programa formativo está estructurado en ciclos progresivos que acompañan el crecimiento espiritual
            y humano
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="max-w-6xl mx-auto"
        >
          {/* Tabs siempre visibles - no se filtran */}
          <TabsList className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
            {MODULES_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="px-2 py-2 text-xs truncate sm:text-sm"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Buscador y Botón de Agregar */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={`Buscar en ${activeTabData?.label || "módulos"}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-2 pl-10 pr-10"
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute transform -translate-y-1/2 right-3 top-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {isLoggedIn && (
              <Button 
                onClick={() => setCreateDialogOpen(true)} 
                className="text-white bg-primary hover:bg-primary/90 shrink-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Formación
              </Button>
            )}
          </div>

          {/* Contenido de los tabs */}
          {MODULES_TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-8">
              <TabContent
                tab={tab}
                searchTerm={tab.value === activeTab ? searchTerm : ""}
              />
            </TabsContent>
          ))}
        </Tabs>

        {/* Dialog para crear formación */}
        <FormacionFormDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSubmit={handleCreate}
          isLoading={isCreating}
          mode="create"
        />
      </div>
    </section>
  );
}