"use client"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-background via-card to-background lg:py-32">
      <div className="absolute inset-0 bg-[url('/young-people-praying-together-in-church.jpg')] bg-cover bg-center opacity-5" />
      <div className="absolute w-20 h-20 rounded-full top-20 left-10 bg-primary/10 blur-xl animate-pulse" />
      <div className="absolute w-32 h-32 delay-1000 rounded-full bottom-20 right-10 bg-secondary/10 blur-xl animate-pulse" />

      <div className="container relative px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Badge
              variant="secondary"
              className="px-6 py-3 text-sm font-medium text-gray-700 border-0 shadow-lg bg-gradient-to-r from-primary/10 to-secondary/10"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-gray-700">Juventud Mariana Vicenciana</span>
            </Badge>
          </div>

          <h1 className="mb-8 text-5xl font-black tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Juventud Mariana
            <span className="block text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              Vicenciana
            </span>
            <span className="block text-4xl font-bold sm:text-5xl lg:text-6xl text-muted-foreground">
              República Dominicana
            </span>
          </h1>

          <p className="max-w-3xl mx-auto mb-12 text-xl leading-relaxed text-muted-foreground sm:text-2xl text-pretty">
            Formación, oración y servicio, al estilo de María y San Vicente de Paúl. Únete a nuestra comunidad de
            jóvenes comprometidos con la fe y el servicio.
          </p>

          <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              asChild
              className="px-10 py-6 text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <Link href="/unete" className="flex items-center gap-2">
                Únete a JMV
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-10 py-6 text-lg font-semibold transition-all duration-300 bg-transparent border-2 hover:border-primary hover:scale-105"
            >
              <Link href="/quienes-somos">Conoce nuestra misión</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
