"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Input } from "@/src/components/ui/input";
import { Search, X } from "lucide-react";
import { MODULES_TABS } from "@/src/data/formacion-modulos-data";
import { TabContent } from "./TabContent";

export function ModulesSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(MODULES_TABS[0].value);

  // Encontrar el tab activo actual
  const activeTabData = useMemo(() => {
    return MODULES_TABS.find(tab => tab.value === activeTab);
  }, [activeTab]);

  // Filtrar contenido basado en el tab activo y término de búsqueda
  const filteredContent = useMemo(() => {
    if (!searchTerm.trim() || !activeTabData) {
      return activeTabData;
    }

    // Aquí necesitas adaptar la lógica según la estructura de tu TabContent
    // Esto es un ejemplo - debes ajustarlo a tu estructura real de datos
    const filteredTab = {
      ...activeTabData,
      // Suponiendo que activeTabData tiene un array de items/modules
      modules: activeTabData.modules?.filter(module =>
        module.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description?.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [],
      // Si tienes otras estructuras de datos, agrega más filtros aquí
    };

    return filteredTab;
  }, [searchTerm, activeTabData]);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Opcional: limpiar búsqueda al cambiar de tab
    // setSearchTerm("");
  };

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

          {/* Buscador */}
          <div className="flex justify-end mt-4">
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
          </div>

          {/* Contenido de los tabs */}
          {MODULES_TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-8">
              <TabContent 
                tab={tab.value === activeTab ? filteredContent : tab}
                searchTerm={tab.value === activeTab ? searchTerm : ""}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}