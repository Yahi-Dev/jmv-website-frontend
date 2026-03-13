"use client"

import { Button } from "@/src/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative pt-10 pb-20 overflow-hidden bg-black lg:pt-14 lg:pb-28">
      <div className="absolute inset-0 bg-[url('/images/jmv/jmv-1.jpeg')] bg-cover bg-[position:center_90%]" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute w-20 h-20 rounded-full top-20 left-10 bg-white/5 blur-xl animate-pulse" />
      <div className="absolute w-32 h-32 delay-1000 rounded-full bottom-20 right-10 bg-white/5 blur-xl animate-pulse" />

      <div className="container relative px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center">
            <Image src="/logo/jvm-logo-blancoynegro-removebg-preview.png" alt="JMV Logo" width={56} height={56} className="object-cover h-100 w-100 rounded-2xl" />
          </div>

          <h1 className="mb-8 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Juventud Mariana
            <span className="block text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              Vicenciana
            </span>
            <span className="block text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              República Dominicana
            </span>
          </h1>



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
              className="px-10 py-6 text-lg font-semibold text-white transition-all duration-300 bg-transparent border-2 hover:border-primary hover:scale-105"
            >
              <Link href="/quienes-somos">Conoce nuestra misión</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
