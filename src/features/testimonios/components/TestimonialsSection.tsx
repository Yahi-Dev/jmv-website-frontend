// src/features/testimonios/components/testimonials-section.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Settings } from "lucide-react"
import { getClientUser } from "@/src/lib/client-auth"
import { TestimonioType } from "../model/types"
import { TestimoniosSkeleton } from "./testimonios-skeleton"
import { EmptyTestimonios } from "./empty-testimonios"
import { useLatestTestimonios } from "../hook/use-testimonio"
import { StarRating } from "@/src/components/shared/star-rating"
import Link from "next/link"

export function TestimonialsSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { testimonios, isLoading } = useLatestTestimonios(3)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getClientUser()
        setIsLoggedIn(!!user)
      } catch (error) {
        console.error("Error checking auth:", error)
      }
    }
    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-6">
          <SectionHeader isLoggedIn={isLoggedIn} />
          <TestimoniosSkeleton />
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-6">
        <SectionHeader isLoggedIn={isLoggedIn} />

        {testimonios.length === 0 ? (
          <EmptyTestimonios
            isLoggedIn={false}
            onAddClick={() => {}}
          />
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {testimonios.map((testimonio) => (
              <TestimonioCard
                key={testimonio.id}
                testimonio={testimonio}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function SectionHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="mb-16">
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-4xl font-bold text-balance">Testimonios JMV</h2>
          <p className="mt-2 text-xl text-muted-foreground text-pretty">
            Últimas experiencias transformadoras de nuestros jóvenes
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Mostrando los 3 testimonios más recientes
          </p>
        </div>

        {isLoggedIn && (
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/admin/testimonios">
              <Settings className="w-4 h-4 mr-2" />
              Administrar Testimonios
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}

function TestimonioCard({ testimonio }: { testimonio: TestimonioType }) {
  return (
    <Card className="relative transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-card to-background group">
      <CardContent className="pt-8 pb-6">
        <div className="flex justify-center mb-6">
          <StarRating
            rating={testimonio.reputacion || 5}
            readonly
            size="md"
          />
        </div>

        <blockquote className="mb-6 overflow-hidden text-base italic leading-relaxed text-center break-words whitespace-pre-line text-foreground/90">
          &ldquo;{(testimonio.mensaje ?? "").replace(/<[^>]*>/g, "")}&rdquo;
        </blockquote>

        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{testimonio.nombre}</div>
          <div className="text-muted-foreground">{testimonio.iglesia}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {testimonio.createdDate && new Date(testimonio.createdDate).toLocaleDateString('es-ES')}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
