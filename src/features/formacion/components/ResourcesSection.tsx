"use client";

import { useEffect } from "react";
import { useGetAllFormaciones } from "../hook/use-formacion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { ExternalLink } from "lucide-react";

export function ResourcesSection() {
  const { formaciones, fetchAll, isLoading } = useGetAllFormaciones();

  useEffect(() => {
    fetchAll(); // 🔥 Carga todas las formaciones al montar el componente
  }, [fetchAll]);

  // Mostrar solo las 6 más recientes (ordenadas por fecha de creación)
  const latestFormaciones = [...formaciones]
    .sort((a, b) => {
      const dateA = a.createdDate ? new Date(a.createdDate).getTime() : 0;
      const dateB = b.createdDate ? new Date(b.createdDate).getTime() : 0;
      return dateB - dateA; // más recientes primero
    })
    .slice(0, 6);

  return (
    <section className="py-16 bg-card lg:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Recursos de Formación</h2>
          <p className="text-lg text-muted-foreground">
            Materiales complementarios para profundizar en tu formación
          </p>
        </div>

        {isLoading ? (
          <p className="text-center text-muted-foreground">Cargando recursos...</p>
        ) : (
          <div className="grid gap-6 px-10 md:grid-cols-2 lg:grid-cols-3">
            {latestFormaciones.length === 0 ? (
              <p className="text-center text-muted-foreground col-span-full">
                No hay recursos de formación disponibles.
              </p>
            ) : (
              latestFormaciones.map((formacion) => (
                <Card key={formacion.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <ExternalLink className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg line-clamp-1">{formacion.titulo}</CardTitle>
                        <CardDescription className="capitalize text-muted-foreground">
                          {formacion.modulo || "Sin módulo"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          if (formacion.enlace) {
                            window.open(formacion.enlace, "_blank");
                          } else if (formacion.ruta) {
                            window.open(formacion.ruta, "_blank");
                          }
                        }}
                      >
                        Ver contenido
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          window.open(formacion.enlace || formacion.ruta || "#", "_blank")
                        }
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
