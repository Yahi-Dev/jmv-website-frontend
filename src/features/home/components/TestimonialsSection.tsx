"use client"

import { Card, CardContent } from "@/src/components/ui/card"
import { Star, Edit, Trash2, Plus } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { useEffect, useState } from "react"
import { getClientUser } from "@/src/lib/client-auth" // Cambia esta importación

interface Testimonial {
  id: number
  quote: string
  name: string
  chapter: string
}

// Datos iniciales
const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    quote: "JMV me ha ayudado a crecer en mi fe y a descubrir mi vocación de servicio. Aquí he encontrado una familia que me acompaña en mi caminar cristiano.",
    name: "María González",
    chapter: "Capítulo Santo Domingo",
  },
  {
    id: 2,
    quote: "La formación que recibimos nos prepara para ser líderes en nuestras comunidades. Es increíble ver cómo podemos impactar vidas siguiendo el ejemplo de San Vicente.",
    name: "Carlos Martínez",
    chapter: "Capítulo Santiago",
  },
  {
    id: 3,
    quote: "Las misiones de verano han sido transformadoras. Servir a los más necesitados me ha enseñado el verdadero significado del amor cristiano.",
    name: "Ana Rodríguez",
    chapter: "Capítulo La Vega",
  },
]

export function TestimonialsSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getClientUser() // Usa la función del cliente
        setIsLoggedIn(!!user)
      } catch (error) {
        console.error("Error checking auth:", error)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const handleEdit = (testimonial: Testimonial) => {
    const newQuote = prompt("Editar testimonio:", testimonial.quote)
    if (newQuote) {
      setTestimonials(prev => 
        prev.map(t => 
          t.id === testimonial.id 
            ? { ...t, quote: newQuote }
            : t
        )
      )
    }
  }

  const handleDelete = (testimonial: Testimonial) => {
    if (confirm(`¿Estás seguro de que quieres eliminar el testimonio de ${testimonial.name}?`)) {
      setTestimonials(prev => prev.filter(t => t.id !== testimonial.id))
    }
  }

  const handleAdd = () => {
    const name = prompt("Nombre del autor:")
    const chapter = prompt("Capítulo:")
    const quote = prompt("Testimonio:")
    
    if (name && chapter && quote) {
      const newTestimonial: Testimonial = {
        id: Date.now(),
        name,
        chapter,
        quote,
      }
      setTestimonials(prev => [...prev, newTestimonial])
    }
  }

  if (loading) {
    return (
      <section className="py-20 lg:py-28">
        <div className="container px-6">
          <div className="text-center">
            <p>Cargando...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 lg:py-28">
      <div className="container px-6">
        <div className="mb-16">
          <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-4xl font-bold text-balance">Testimonios</h2>
              <p className="mt-2 text-xl text-muted-foreground text-pretty">
                Escucha las experiencias transformadoras de nuestros jóvenes
              </p>
            </div>
            
            {isLoggedIn && (
              <Button
                onClick={handleAdd}
                className="text-white bg-primary hover:bg-primary/90 shrink-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Testimonio
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="relative transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-card to-background group"
            >
              <CardContent className="pt-8 pb-6">
                {isLoggedIn && (
                  <div className="absolute flex gap-2 transition-opacity duration-200 opacity-0 top-4 right-4 group-hover:opacity-100">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(testimonial)}
                      className="w-8 h-8 border-gray-200 bg-white/90 hover:bg-white"
                      title="Editar testimonio"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(testimonial)}
                      className="w-8 h-8 border-gray-200 bg-white/90 hover:bg-red-50 hover:text-red-600"
                      title="Eliminar testimonio"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                )}

                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mb-6 text-base italic leading-relaxed text-center">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-center">
                  <div className="text-lg font-bold">{testimonial.name}</div>
                  <div className="text-muted-foreground">{testimonial.chapter}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="py-12 text-center border-2 border-gray-300 border-dashed rounded-lg">
            <p className="mb-4 text-lg text-muted-foreground">
              No hay testimonios disponibles
            </p>
            {isLoggedIn && (
              <Button
                onClick={handleAdd}
                className="text-white bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar el primer testimonio
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}