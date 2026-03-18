"use client"

import Navbar from "@/src/components/Navbar"
import { TestimonialsSection } from "@/src/features/testimonios/components/TestimonialsSection"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
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
} from "lucide-react"

const pillars = [
  {
    icon: Users,
    title: "Comunidad Juvenil",
    description: "Crecimiento espiritual y humano a traves de la catequesis y el liderazgo cristiano",
    accentColor: "bg-[#19168D]",
  },
  {
    icon: Heart,
    title: "Espiritualidad",
    description: "Oracion y contemplacion siguiendo el ejemplo de Maria y San Vicente",
    accentColor: "bg-[#139FCC]",
  },
  {
    icon: HandHeart,
    title: "Apostolado",
    description: "Compromiso con los mas necesitados a traves de obras de caridad",
    accentColor: "bg-[#F3A736]",
  },
  {
    icon: BookOpen,
    title: "Formacion",
    description: "Fraternidad y apoyo mutuo en el camino de fe y servicio",
    accentColor: "bg-[#19168D]",
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
    image: "/images/jmv/jmv-2.jpeg",
  },
  {
    title: "Mision de Verano",
    date: "22 Dic 2024",
    type: "Mision",
    location: "Monte Plata",
    time: "7:00 AM",
    desc: "Experiencia misionera de servicio a comunidades rurales necesitadas",
    image: "/images/jmv/jmv-8.jpeg",
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

export function HomePageV6() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section — Split Screen */}
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row overflow-hidden">
        {/* Left side — Dark with text */}
        <div className="relative z-10 flex flex-col justify-center w-full px-8 py-20 lg:w-1/2 lg:px-16 xl:px-24 bg-[#19168D]">
          <div className="max-w-lg mx-auto lg:mx-0 lg:ml-auto lg:mr-0">
            <Image
              src="/logo/jmv-logo.jpg"
              alt="JMV Logo"
              width={80}
              height={80}
              className="mb-8 rounded-2xl"
            />
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl xl:text-6xl">
              Juventud
              <br />
              Mariana
              <br />
              Vicenciana
            </h1>
            <p className="mt-4 text-xl font-medium text-[#139FCC] sm:text-2xl">
              Republica Dominicana
            </p>
            <p className="max-w-md mt-6 text-base leading-relaxed text-white/70">
              Una comunidad de jovenes comprometidos con la fe, el servicio y la transformacion social.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Button
                asChild
                size="lg"
                className="bg-[#F3A736] hover:bg-[#e09520] text-white px-8 text-base font-semibold transition-all duration-300"
              >
                <Link href="/unete">
                  Unete a JMV
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 text-base font-semibold transition-all duration-300 bg-transparent"
              >
                <Link href="/quienes-somos">
                  Conoce nuestra mision
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right side — Image with diagonal clip */}
        <div className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-0">
          <div
            className="absolute inset-0"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            <Image
              src="/images/jmv/jmv-6.jpeg"
              alt="Comunidad JMV"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[#19168D]/20" />
          </div>
          {/* Diagonal divider overlay on desktop */}
          <div
            className="absolute inset-0 hidden lg:block bg-[#19168D]"
            style={{ clipPath: "polygon(0 0, 12% 0, 0 100%)" }}
          />
        </div>
      </section>

      {/* Pillars Section — Alternating left/right */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container px-6">
          <div className="mb-16 text-center">
            <p className="text-sm font-bold tracking-widest uppercase text-[#139FCC] mb-3">Nuestros Pilares</p>
            <h2 className="text-3xl font-bold sm:text-4xl text-[#19168D]">
              Los cimientos de nuestra comunidad
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-0">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              const isEven = i % 2 === 1
              return (
                <div
                  key={i}
                  className={`group flex items-start gap-6 py-10 border-b border-gray-100 last:border-b-0 transition-all duration-300 hover:bg-gray-50/50 px-6 rounded-lg ${isEven ? "flex-row-reverse text-right" : ""}`}
                >
                  {/* Accent bar + icon */}
                  <div className={`flex items-center gap-4 shrink-0 ${isEven ? "flex-row-reverse" : ""}`}>
                    <div className={`w-1 h-16 rounded-full ${pillar.accentColor} transition-all duration-300 group-hover:h-20`} />
                    <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${pillar.accentColor} text-white transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="pt-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed max-w-md">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values Section — Diagonal background */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Angled background */}
        <div
          className="absolute inset-0 bg-[#139FCC]"
          style={{ clipPath: "polygon(0 8%, 100% 0, 100% 92%, 0 100%)" }}
        />
        <div className="container relative z-10 px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold tracking-widest uppercase text-white/70 mb-3">
              NOTAS DISTINTIVAS
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Los valores que nos definen como comunidad de fe
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
            {values.map((value, i) => (
              <div key={i} className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide transition-all duration-300 hover:text-[#F3A736] cursor-default">
                  {value}
                </span>
                {i < values.length - 1 && (
                  <span className="text-2xl sm:text-3xl text-[#F3A736] font-light select-none">/</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Activities Section — Alternating image/text */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container px-6">
          <div className="mb-16 text-center">
            <p className="text-sm font-bold tracking-widest uppercase text-[#F3A736] mb-3">Proximos Eventos</p>
            <h2 className="text-3xl font-bold sm:text-4xl text-[#19168D]">
              Actividades y encuentros
            </h2>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            {activities.map((activity, i) => {
              const isReversed = i % 2 === 1
              return (
                <div
                  key={i}
                  className={`flex flex-col overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl group ${isReversed ? "md:flex-row-reverse" : "md:flex-row"}`}
                >
                  {/* Image */}
                  <div className="relative w-full md:w-2/5 min-h-[240px]">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r" />
                    <Badge className="absolute text-white border-0 top-4 left-4 bg-[#19168D]/80 backdrop-blur-sm">
                      {activity.type}
                    </Badge>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col justify-center w-full p-8 md:w-3/5">
                    <h3 className="mb-3 text-xl font-bold text-gray-900">
                      {activity.title}
                    </h3>
                    <p className="mb-5 text-base leading-relaxed text-gray-500">
                      {activity.desc}
                    </p>
                    <div className="flex flex-wrap gap-5 text-sm text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#139FCC]" />
                        <span>{activity.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#139FCC]" />
                        <span>{activity.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#139FCC]" />
                        <span>{activity.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-14 text-center">
            <Button
              asChild
              size="lg"
              className="bg-[#19168D] hover:bg-[#120f6e] text-white px-8 text-base font-semibold transition-all duration-300"
            >
              <Link href="/eventos">
                Ver todos los eventos
                <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section — Split layout */}
      <section className="relative overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[500px]">
          {/* Left — Dark with location info */}
          <div className="relative flex items-center justify-center w-full px-8 py-16 lg:w-1/2 bg-[#19168D] lg:px-16">
            {/* Angled divider for desktop */}
            <div
              className="absolute top-0 right-0 bottom-0 hidden lg:block w-20 bg-white"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
            />
            <div className="relative z-10 max-w-sm">
              <MapPin className="w-10 h-10 mb-6 text-[#F3A736]" />
              <h3 className="mb-4 text-2xl font-bold text-white">
                Visitanos
              </h3>
              <p className="text-lg leading-relaxed text-white/70">
                Santo Domingo, Republica Dominicana
              </p>
              <div className="w-16 h-0.5 bg-[#F3A736] my-8" />
              <p className="text-sm text-white/50">
                Somos una comunidad abierta. Te esperamos con los brazos abiertos para caminar juntos en la fe.
              </p>
            </div>
          </div>

          {/* Right — Light with contact + CTA */}
          <div className="flex items-center justify-center w-full px-8 py-16 bg-white lg:w-1/2 lg:px-16">
            <div className="max-w-sm">
              <h3 className="mb-8 text-2xl font-bold text-[#19168D]">
                Contactanos
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#139FCC]/10 transition-colors duration-300 group-hover:bg-[#139FCC]/20">
                    <Mail className="w-5 h-5 text-[#139FCC]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email</p>
                    <p className="text-base font-semibold text-gray-900">info@jmvrd.org</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#F3A736]/10 transition-colors duration-300 group-hover:bg-[#F3A736]/20">
                    <Phone className="w-5 h-5 text-[#F3A736]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Telefono</p>
                    <p className="text-base font-semibold text-gray-900">+1 (809) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#F3A736] hover:bg-[#e09520] text-white text-base font-semibold transition-all duration-300 shadow-lg shadow-[#F3A736]/20 hover:shadow-xl hover:shadow-[#F3A736]/30"
                >
                  <Link href="/unete">
                    Unete a JMV
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
