"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { BookOpen, Star, Heart, Users } from "lucide-react"

export function PillarsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-balance">Nuestros Pilares</h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground text-pretty">
            Cuatro pilares fundamentales que guían nuestro caminar cristiano
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpen, title: "Formación", text: "Crecimiento espiritual y humano a través de la catequesis y el liderazgo cristiano", color: "primary" },
            { icon: Star, title: "Espiritualidad", text: "Oración y contemplación siguiendo el ejemplo de María y San Vicente", color: "secondary" },
            { icon: Heart, title: "Servicio", text: "Compromiso con los más necesitados a través de obras de caridad", color: "primary" },
            { icon: Users, title: "Comunidad", text: "Fraternidad y apoyo mutuo en el camino de fe y servicio", color: "secondary" },
          ].map(({ icon: Icon, title, text, color }, i) => (
            <Card key={i} className="relative overflow-hidden transition-all duration-500 border-0 shadow-lg group hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-card to-background">
              <div className={`absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-${color}/5 to-transparent group-hover:opacity-100`} />
              <CardHeader className="relative z-10 pb-4 text-center">
                <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-transform duration-300 rounded-2xl bg-gradient-to-br from-${color}/20 to-${color}/10 group-hover:scale-110`}>
                  <Icon className={`w-8 h-8 text-${color}`} />
                </div>
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base leading-relaxed text-center">{text}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
