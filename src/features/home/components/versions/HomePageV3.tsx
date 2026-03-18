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
  Users,
  Heart,
  HandHeart,
  BookOpen,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react"

const pillars = [
  {
    number: "01",
    title: "Comunidad Juvenil",
    description: "Crecimiento espiritual y humano a traves de la catequesis y el liderazgo cristiano",
    icon: Users,
  },
  {
    number: "02",
    title: "Espiritualidad",
    description: "Oracion y contemplacion siguiendo el ejemplo de Maria y San Vicente",
    icon: Heart,
  },
  {
    number: "03",
    title: "Apostolado",
    description: "Compromiso con los mas necesitados a traves de obras de caridad",
    icon: HandHeart,
  },
  {
    number: "04",
    title: "Formacion",
    description: "Fraternidad y apoyo mutuo en el camino de fe y servicio",
    icon: BookOpen,
  },
]

const values = ["Eclesial", "Laical", "Mariana", "Misionera", "Vicentina"]

const activities = [
  {
    title: "Taller de Liderazgo JMV",
    date: "15 Dic 2024",
    type: "Formacion",
    location: "Santo Domingo",
    time: "9:00 AM",
    desc: "Desarrollo de habilidades de liderazgo cristiano para jovenes comprometidos",
  },
  {
    title: "Mision de Verano",
    date: "22 Dic 2024",
    type: "Mision",
    location: "Monte Plata",
    time: "7:00 AM",
    desc: "Experiencia misionera de servicio a comunidades rurales necesitadas",
  },
  {
    title: "Vigilia Mariana",
    date: "28 Dic 2024",
    type: "Espiritualidad",
    location: "Santiago",
    time: "8:00 PM",
    desc: "Noche de oracion y reflexion en honor a la Virgen Maria",
  },
]

export function HomePageV3() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ──────────────────── HERO ──────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#19168D] via-[#1a2fa0] to-[#139FCC]">
        {/* Decorative floating shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#139FCC]/20 blur-3xl" />
          <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-[#F3A736]/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[#19168D]/40 blur-2xl" />
          <div className="absolute top-20 right-1/4 h-16 w-16 rotate-45 rounded-lg border-2 border-white/10" />
          <div className="absolute bottom-32 left-16 h-12 w-12 rounded-full border-2 border-[#F3A736]/20" />
          <div className="absolute top-1/2 right-12 h-20 w-20 rotate-12 rounded-xl border-2 border-white/5" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="rounded-2xl bg-white/10 p-2 shadow-2xl ring-4 ring-white/20 backdrop-blur-sm">
              <Image
                src="/logo/jmv-logo.jpg"
                alt="JMV Logo"
                width={80}
                height={80}
                className="rounded-2xl"
              />
            </div>
          </div>

          <h1 className="mb-4 text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-8xl">
            Juventud Mariana
            <br />
            <span className="bg-gradient-to-r from-white to-[#139FCC] bg-clip-text text-transparent">
              Vicenciana
            </span>
          </h1>

          <p className="mb-10 text-lg font-medium tracking-widest text-white/70 uppercase sm:text-xl">
            Republica Dominicana
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[#F3A736] px-8 py-6 text-lg font-bold text-[#19168D] shadow-lg shadow-[#F3A736]/30 transition-all hover:bg-[#f5b84d] hover:shadow-xl hover:shadow-[#F3A736]/40"
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
              className="rounded-full border-2 border-white/30 bg-white/5 px-8 py-6 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
            >
              <Link href="/quienes-somos">Conoce nuestra mision</Link>
            </Button>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ──────────────────── PILLARS ──────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <Badge className="mb-4 border-[#F3A736]/30 bg-[#F3A736]/10 text-[#F3A736]">
              <Sparkles className="mr-1 h-3 w-3" /> Nuestros Pilares
            </Badge>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              Fundamentos de nuestra{" "}
              <span className="text-[#19168D]">vocacion</span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <Card
                  key={pillar.number}
                  className="group relative overflow-hidden border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Left gradient border */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#19168D] to-[#139FCC]" />

                  <CardHeader className="pb-2 pl-6">
                    <span className="text-5xl font-black text-[#F3A736]/80 transition-colors group-hover:text-[#F3A736]">
                      {pillar.number}
                    </span>
                    <CardTitle className="mt-2 text-lg font-bold text-gray-900">
                      {pillar.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pl-6">
                    <CardDescription className="text-sm leading-relaxed text-gray-500">
                      {pillar.description}
                    </CardDescription>
                    <div className="mt-4">
                      <Icon className="h-6 w-6 text-[#139FCC]/50 transition-colors group-hover:text-[#139FCC]" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────── VALUES ──────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#139FCC] to-[#19168D] py-20 lg:py-28">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 right-0 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute bottom-0 -left-20 h-48 w-48 rounded-full bg-[#F3A736]/10 blur-2xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <p className="mb-3 text-sm font-bold tracking-[0.3em] text-[#F3A736] uppercase">
            Notas Distintivas
          </p>
          <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Los valores que nos definen
            <br className="hidden sm:block" />
            como comunidad de fe
          </h2>

          <div className="mt-14 flex flex-col items-center gap-6 sm:gap-4">
            {values.map((value, i) => (
              <div key={value} className="group flex items-center gap-4">
                <span className="inline-block h-3 w-3 rounded-full bg-[#F3A736] shadow-lg shadow-[#F3A736]/40 transition-transform group-hover:scale-125" />
                <span className="text-3xl font-black tracking-wide text-white/90 transition-colors group-hover:text-white sm:text-4xl lg:text-5xl">
                  {value}
                </span>
                {i < values.length - 1 && (
                  <span className="hidden text-3xl text-white/20 lg:inline">
                    /
                  </span>
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
              <Badge className="mb-3 border-[#19168D]/20 bg-[#19168D]/10 text-[#19168D]">
                <Calendar className="mr-1 h-3 w-3" /> Proximos Eventos
              </Badge>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
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

          {/* Horizontal scroll on mobile, 3-col grid on desktop */}
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {activities.map((activity) => (
              <Card
                key={activity.title}
                className="group min-w-[300px] flex-shrink-0 snap-start overflow-hidden border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:min-w-0"
              >
                {/* Gradient header strip */}
                <div className="h-2 bg-gradient-to-r from-[#19168D] to-[#139FCC]" />
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-[#19168D] to-[#139FCC] text-xs font-bold text-white">
                      {activity.type}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#19168D]">
                    {activity.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm leading-relaxed text-gray-500">
                    {activity.desc}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {activity.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {activity.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {activity.location}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── CONTACT ──────────────────── */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        {/* Decorative gradient blob */}
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-gradient-to-br from-[#139FCC]/10 to-[#19168D]/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <Badge className="mb-4 border-[#F3A736]/30 bg-[#F3A736]/10 text-[#F3A736]">
            Contacto
          </Badge>
          <h2 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Conecta con nosotros
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-gray-500">
            Estamos aqui para acompanarte en tu camino de fe y servicio
          </p>

          <div className="mb-12 grid gap-6 sm:grid-cols-3">
            {/* Location */}
            <div className="group rounded-2xl border-2 border-transparent bg-gray-50 p-6 transition-all hover:border-[#139FCC]/30 hover:shadow-lg">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#19168D] to-[#139FCC]">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Ubicacion</p>
              <p className="mt-1 text-sm text-gray-500">
                Santo Domingo, Republica Dominicana
              </p>
            </div>

            {/* Email */}
            <div className="group rounded-2xl border-2 border-transparent bg-gray-50 p-6 transition-all hover:border-[#139FCC]/30 hover:shadow-lg">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#19168D] to-[#139FCC]">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Email</p>
              <p className="mt-1 text-sm text-gray-500">info@jmvrd.org</p>
            </div>

            {/* Phone */}
            <div className="group rounded-2xl border-2 border-transparent bg-gray-50 p-6 transition-all hover:border-[#139FCC]/30 hover:shadow-lg">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#19168D] to-[#139FCC]">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Telefono</p>
              <p className="mt-1 text-sm text-gray-500">+1 (809) 123-4567</p>
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-r from-[#19168D] to-[#139FCC] px-10 py-6 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110"
          >
            <Link href="/unete">
              Unite a JMV
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
