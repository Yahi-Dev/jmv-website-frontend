import { Badge } from "@/src/components/ui/badge";
import { BookOpen } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-card via-background to-card lg:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="secondary" className="px-4 py-2 mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Crecimiento Integral
          </Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">Formación JMV</h1>
          <p className="text-xl text-muted-foreground">
            Programas de formación integral que fortalecen la fe, desarrollan el liderazgo y preparan para el servicio
          </p>
        </div>
      </div>
    </section>
  );
}