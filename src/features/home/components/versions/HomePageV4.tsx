"use client"

import Navbar from "@/src/components/Navbar"
import { TestimonialsSection } from "@/src/features/testimonios/components/TestimonialsSection"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
} from "lucide-react"

const pillars = [
  {
    title: "Comunidad Juvenil",
    description: "Crecimiento espiritual y humano a traves de la catequesis y el liderazgo cristiano",
    image: "/images/jmv/jmv-4.jpeg",
    label: "Pilar I",
  },
  {
    title: "Espiritualidad",
    description: "Oracion y contemplacion siguiendo el ejemplo de Maria y San Vicente",
    image: "/images/jmv/jmv-5.jpeg",
    label: "Pilar II",
  },
  {
    title: "Apostolado",
    description: "Compromiso con los mas necesitados a traves de obras de caridad",
    image: "/images/jmv/jmv-6.jpeg",
    label: "Pilar III",
  },
  {
    title: "Formacion",
    description: "Fraternidad y apoyo mutuo en el camino de fe y servicio",
    image: "/images/jmv/jmv-7.jpeg",
    label: "Pilar IV",
  },
]

const values = [
  { name: "Eclesial", desc: "Enraizados en la Iglesia" },
  { name: "Laical", desc: "Vocacion del pueblo de Dios" },
  { name: "Mariana", desc: "Bajo el manto de Maria" },
  { name: "Misionera", desc: "Enviados al mundo" },
  { name: "Vicentina", desc: "Herencia de San Vicente" },
]

const activities = [
  {
    title: "Taller de Liderazgo JMV",
    date: "15 Dic 2024",
    type: "Formacion",
    location: "Santo Domingo",
    time: "9:00 AM",
    desc: "Desarrollo de habilidades de liderazgo cristiano para jovenes comprometidos",
    image: "/images/jmv/jmv-8.jpeg",
  },
  {
    title: "Mision de Verano",
    date: "22 Dic 2024",
    type: "Mision",
    location: "Monte Plata",
    time: "7:00 AM",
    desc: "Experiencia misionera de servicio a comunidades rurales necesitadas",
    image: "/images/jmv/jmv-9.jpeg",
  },
  {
    title: "Vigilia Mariana",
    date: "28 Dic 2024",
    type: "Espiritualidad",
    location: "Santiago",
    time: "8:00 PM",
    desc: "Noche de oracion y reflexion en honor a la Virgen Maria",
    image: "/images/jmv/jmv-10.jpeg",
  },
]

export function HomePageV4() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ──────────────────── HERO ──────────────────── */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        {/* Full-bleed background image */}
        <Image
          src="/images/jmv/jmv-3.jpeg"
          alt="JMV Comunidad"
          fill
          className="object-cover"
          priority
        />
        {/* Dark gradient overlay from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-40 lg:pb-24">
          <div className="max-w-2xl">
            {/* Category label */}
            <span className="mb-4 inline-block border-b-2 border-[#F3A736] pb-1 text-xs font-bold tracking-[0.25em] text-[#F3A736] uppercase">
              Bienvenidos
            </span>

            {/* Logo + Title */}
            <div className="mb-4 flex items-center gap-4">
              <Image
                src="/logo/jmv-logo.jpg"
                alt="JMV Logo"
                width={80}
                height={80}
                className="rounded-2xl shadow-2xl"
              />
            </div>

            <h1 className="mb-3 font-serif text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl">
              Juventud Mariana
              <br />
              Vicenciana
            </h1>

            <p className="mb-2 flex items-center gap-3 text-sm text-white/60">
              <MapPin className="h-4 w-4" />
              Republica Dominicana
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-[#F3A736] px-8 py-6 text-base font-bold text-[#19168D] transition-all hover:bg-[#f5b84d]"
              >
                <Link href="/unete">
                  Unite a JMV
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 bg-white/5 px-8 py-6 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
              >
                <Link href="/quienes-somos">Conoce nuestra mision</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── PILLARS ──────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14">
            <p className="mb-2 text-xs font-bold tracking-[0.25em] text-[#F3A736] uppercase">
              Nuestros Pilares
            </p>
            <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Fundamentos de nuestra vocacion
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group relative h-72 overflow-hidden rounded-xl sm:h-80"
              >
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="mb-2 inline-block text-xs font-bold tracking-[0.2em] text-[#F3A736] uppercase">
                    {pillar.label}
                  </span>
                  <h3 className="mb-1 font-serif text-2xl font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/70">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── VALUES ──────────────────── */}
      <section className="border-y border-gray-100 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-bold tracking-[0.25em] text-[#F3A736] uppercase">
              Notas Distintivas
            </p>
            <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
              Los valores que nos definen como comunidad de fe
            </h2>
          </div>

          {/* Values row with vertical dividers */}
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-0">
            {values.map((value, i) => (
              <div key={value.name} className="flex items-center">
                <div className="px-6 text-center sm:px-8 lg:px-10">
                  <p className="font-serif text-2xl font-bold text-[#19168D] lg:text-3xl">
                    {value.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {value.desc}
                  </p>
                </div>
                {i < values.length - 1 && (
                  <div className="hidden h-12 w-px bg-gray-200 sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── TESTIMONIALS ──────────────────── */}
      <TestimonialsSection />

      {/* ──────────────────── ACTIVITIES ──────────────────── */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold tracking-[0.25em] text-[#F3A736] uppercase">
                Proximos Eventos
              </p>
              <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Actividades
              </h2>
            </div>
            <Button
              asChild
              variant="ghost"
              className="text-[#19168D] hover:text-[#139FCC]"
            >
              <Link href="/eventos">
                Ver todos los eventos
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Article-style cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <article
                key={activity.title}
                className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image top */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge className="bg-[#19168D] text-xs font-bold text-white">
                      {activity.type}
                    </Badge>
                  </div>
                </div>

                {/* Content below */}
                <div className="p-5">
                  <p className="mb-1 text-xs font-semibold text-[#F3A736] uppercase">
                    {activity.date}
                  </p>
                  <h3 className="mb-2 font-serif text-xl font-bold text-gray-900 transition-colors group-hover:text-[#19168D]">
                    {activity.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-500">
                    {activity.desc}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {activity.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {activity.location}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── CONTACT ──────────────────── */}
      <section className="relative bg-[#19168D] py-20 lg:py-28">
        {/* Gold accent line at top */}
        <div className="absolute left-0 right-0 top-0 h-1 bg-[#F3A736]" />

        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left column */}
            <div>
              <p className="mb-2 text-xs font-bold tracking-[0.25em] text-[#F3A736] uppercase">
                Contacto
              </p>
              <h2 className="mb-6 font-serif text-3xl font-bold text-white sm:text-4xl">
                Conecta con nosotros
              </h2>
              <p className="mb-10 max-w-md text-white/60">
                Estamos aqui para acompanarte en tu camino de fe y servicio.
                No dudes en comunicarte con nosotros.
              </p>

              <Button
                asChild
                size="lg"
                className="bg-[#F3A736] px-8 py-6 text-base font-bold text-[#19168D] transition-all hover:bg-[#f5b84d]"
              >
                <Link href="/unete">
                  Unite a JMV
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Right column — contact info */}
            <div className="flex flex-col justify-center gap-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <MapPin className="h-5 w-5 text-[#F3A736]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Ubicacion</p>
                  <p className="text-sm text-white/50">
                    Santo Domingo, Republica Dominicana
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Mail className="h-5 w-5 text-[#F3A736]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Email</p>
                  <p className="text-sm text-white/50">info@jmvrd.org</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Phone className="h-5 w-5 text-[#F3A736]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Telefono</p>
                  <p className="text-sm text-white/50">+1 (809) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
