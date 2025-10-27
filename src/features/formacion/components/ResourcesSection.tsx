import { RESOURCES_DATA } from "@/src/data/resources-data";
import { ResourceCard } from "./ResourceCard";


export function ResourcesSection() {
  return (
    <section className="py-16 bg-card lg:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Recursos de Formación</h2>
          <p className="text-lg text-muted-foreground">Materiales complementarios para profundizar en tu formación</p>
        </div>

        <div className="grid gap-6 px-10 md:grid-cols-2 lg:grid-cols-3">
          {RESOURCES_DATA.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}