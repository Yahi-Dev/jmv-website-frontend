"use client"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ActivitiesSection() {
  const activities = [
    {
      title: "Taller de Liderazgo JMV",
      date: "15 Dic 2024",
      type: "Formación",
      location: "Santo Domingo",
      time: "9:00 AM",
      color: "primary",
      desc: "Desarrollo de habilidades de liderazgo cristiano para jóvenes comprometidos",
    },
    {
      title: "Misión de Verano",
      date: "22 Dic 2024",
      type: "Misión",
      location: "Monte Plata",
      time: "7:00 AM",
      color: "secondary",
      desc: "Experiencia misionera de servicio a comunidades rurales necesitadas",
    },
    {
      title: "Vigilia Mariana",
      date: "28 Dic 2024",
      type: "Espiritualidad",
      location: "Santiago",
      time: "8:00 PM",
      color: "primary",
      desc: "Noche de oración y reflexión en honor a la Virgen María",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-card to-background lg:py-28">
      <div className="container px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-balance">Próximas Actividades</h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground text-pretty">
            Únete a nuestros próximos eventos y actividades de formación
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {activities.map((a, i) => (
            <Card key={i} className="overflow-hidden transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className={`font-medium border-0 bg-${a.color}/10 text-${a.color}`}>
                    {a.type}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {a.date}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold transition-colors group-hover:text-primary">{a.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  {a.location}
                  <Clock className="w-4 h-4 ml-4 mr-1" />
                  {a.time}
                </div>
                <CardDescription className="mb-6 text-base leading-relaxed">{a.desc}</CardDescription>
                <Button className="w-full transition-all duration-200 bg-transparent shadow-md hover:shadow-lg" variant="outline">
                  Más información
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="px-8 py-4 text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Link href="/eventos" className="flex items-center gap-2">
              Ver todos los eventos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
