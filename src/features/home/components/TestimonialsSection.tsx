"use client"

import { Card, CardContent } from "@/src/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "JMV me ha ayudado a crecer en mi fe y a descubrir mi vocación de servicio. Aquí he encontrado una familia que me acompaña en mi caminar cristiano.",
      name: "María González",
      chapter: "Capítulo Santo Domingo",
    },
    {
      quote: "La formación que recibimos nos prepara para ser líderes en nuestras comunidades. Es increíble ver cómo podemos impactar vidas siguiendo el ejemplo de San Vicente.",
      name: "Carlos Martínez",
      chapter: "Capítulo Santiago",
    },
    {
      quote: "Las misiones de verano han sido transformadoras. Servir a los más necesitados me ha enseñado el verdadero significado del amor cristiano.",
      name: "Ana Rodríguez",
      chapter: "Capítulo La Vega",
    },
  ]

  return (
    <section className="py-20 lg:py-28">
      <div className="container px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-balance">Testimonios</h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground text-pretty">
            Escucha las experiencias transformadoras de nuestros jóvenes
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} className="transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-card to-background">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mb-6 text-base italic leading-relaxed text-center">"{t.quote}"</blockquote>
                <div className="text-center">
                  <div className="text-lg font-bold">{t.name}</div>
                  <div className="text-muted-foreground">{t.chapter}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
