"use client"

import Navbar from "@/src/components/Navbar"
import { TestimonialsSection } from "@/src/features/testimonios/components/TestimonialsSection"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import {
  Users,
  Heart,
  HandHelping,
  BookOpen,
  ChevronDown,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react"

const pillars = [
  {
    number: "01",
    title: "Comunidad Juvenil",
    description:
      "Crecimiento espiritual y humano a través de la catequesis y el liderazgo cristiano",
    icon: Users,
  },
  {
    number: "02",
    title: "Espiritualidad",
    description:
      "Oración y contemplación siguiendo el ejemplo de María y San Vicente",
    icon: Heart,
  },
  {
    number: "03",
    title: "Apostolado",
    description:
      "Compromiso con los más necesitados a través de obras de caridad",
    icon: HandHelping,
  },
  {
    number: "04",
    title: "Formación",
    description:
      "Fraternidad y apoyo mutuo en el camino de fe y servicio",
    icon: BookOpen,
  },
]

const values = ["Eclesial", "Laical", "Mariana", "Misionera", "Vicentina"]

const activities = [
  {
    title: "Taller de Liderazgo JMV",
    date: "15 Dic 2024",
    type: "Formación",
    location: "Santo Domingo",
    time: "9:00 AM",
    desc: "Desarrollo de habilidades de liderazgo cristiano para jóvenes comprometidos",
    image: "/images/jmv/jmv-2.jpeg",
  },
  {
    title: "Misión de Verano",
    date: "22 Dic 2024",
    type: "Misión",
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
    desc: "Noche de oración y reflexión en honor a la Virgen María",
    image: "/images/jmv/jmv-10.jpeg",
  },
]

export function HomePageV10() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ═══════════════ HERO — Full Viewport Cinematic ═══════════════ */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/jmv/jmv-7.jpeg"
          alt="JMV Comunidad"
          fill
          className="object-cover"
          priority
        />

        {/* Light overlay — white fade from left/bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />

        {/* Content positioned bottom-left */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 pb-24 sm:pb-32 pt-40">
          <div className="flex items-center gap-4 mb-8">
            <Image
              src="/logo/jmv-logo.jpg"
              alt="JMV Logo"
              width={80}
              height={80}
              className="rounded-2xl shadow-lg"
            />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#19168D] leading-[1.0] tracking-tight mb-2">
            Juventud
            <br />
            Mariana
            <br />
            Vicenciana
          </h1>

          {/* Gold accent line */}
          <div className="w-20 h-1 bg-[#F3A736] my-6" />

          <p className="text-xl sm:text-2xl text-[#139FCC] font-medium tracking-wide mb-10">
            República Dominicana
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/unete">
              <Button className="bg-[#F3A736] hover:bg-[#e09620] text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-[#F3A736]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#F3A736]/30">
                Únete a JMV
              </Button>
            </Link>
            <Link href="/quienes-somos">
              <Button
                variant="outline"
                className="border-[#19168D] text-[#19168D] hover:bg-[#19168D] hover:text-white px-8 py-6 text-lg rounded-full transition-all duration-300"
              >
                Conoce nuestra misión
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-8 h-8 text-[#19168D]/50" />
        </div>
      </section>

      {/* ═══════════════ PILLARS — Film Credits Aesthetic ═══════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-20">
            <Badge className="bg-[#F3A736]/10 text-[#F3A736] border-[#F3A736]/20 mb-4 text-sm px-4 py-1">
              Nuestros Pilares
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#19168D]">
              Fundamentos de nuestra fe
            </h2>
          </div>

          <div>
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.number}
                  className="relative border-t border-[#F5F6FA] py-12 sm:py-16 lg:py-20 group"
                >
                  {/* Faint icon on the right */}
                  <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Icon className="w-24 h-24 sm:w-32 sm:h-32 text-[#19168D]/[0.05]" />
                  </div>

                  <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6 sm:gap-12">
                    {/* Large number */}
                    <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-[#139FCC]/[0.12] leading-none select-none flex-shrink-0">
                      {pillar.number}
                    </span>

                    <div className="flex-1 pt-2">
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#19168D] mb-3">
                        {pillar.title}
                      </h3>
                      <p className="text-gray-500 text-base sm:text-lg max-w-2xl leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
            {/* Bottom border for last item */}
            <div className="border-t border-[#F5F6FA]" />
          </div>
        </div>
      </section>

      {/* ═══════════════ VALUES — Light Parallax with Image Texture ═══════════════ */}
      <section className="relative py-28 sm:py-36 overflow-hidden">
        {/* Background image as subtle texture */}
        <Image
          src="/images/jmv/jmv-11.jpeg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        {/* Heavy white overlay */}
        <div className="absolute inset-0 bg-white/[0.88]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-lg sm:text-xl font-bold tracking-[0.3em] uppercase text-[#19168D] mb-2">
              Notas{" "}
              <span className="text-[#F3A736]">Distintivas</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
              Los valores que nos definen como comunidad de fe
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {values.map((value, i) => (
              <div
                key={value}
                className="bg-white/95 backdrop-blur-sm border border-[#19168D]/10 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:border-[#F3A736]/30 group"
              >
                <span className="block text-3xl sm:text-4xl font-black text-[#F3A736]/80 mb-3 transition-colors group-hover:text-[#F3A736]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="block text-xl sm:text-2xl font-bold text-[#19168D]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <TestimonialsSection />

      {/* ═══════════════ ACTIVITIES — Cards on Light Gray ═══════════════ */}
      <section className="py-24 sm:py-32 bg-[#F5F6FA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-[#139FCC]/10 text-[#139FCC] border-[#139FCC]/20 mb-4 text-sm px-4 py-1">
              Próximos Eventos
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#19168D]">
              Actividades
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-[#F3A736]/40 hover:-translate-y-1"
              >
                {/* Gold top accent */}
                <div className="h-1 bg-[#F3A736]" />

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <Badge
                    variant="outline"
                    className="mb-4 border-[#139FCC]/30 text-[#139FCC]"
                  >
                    {activity.type}
                  </Badge>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#19168D] mb-3">
                    {activity.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {activity.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-[#139FCC]">
                      <Calendar className="w-4 h-4" />
                      {activity.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-[#139FCC]">
                      <Clock className="w-4 h-4" />
                      {activity.time}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {activity.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/eventos">
              <Button className="bg-[#19168D] hover:bg-[#13107a] text-white px-10 py-6 text-lg rounded-full shadow-lg shadow-[#19168D]/20 transition-all duration-300 group">
                Ver todos los eventos
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT — Cinematic with Image Texture ═══════════════ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Subtle background image on left */}
        <div className="absolute inset-0">
          <Image
            src="/images/jmv/jmv-6.jpeg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
          {/* Fade to white from right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/90 to-white" />
          <div className="absolute inset-0 bg-white/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left spacer area (image shows through) */}
            <div className="hidden lg:block lg:w-2/5" />

            {/* Right — Contact content */}
            <div className="w-full lg:w-3/5">
              <div className="w-16 h-1 bg-[#F3A736] mb-8" />

              <h2 className="text-4xl sm:text-5xl font-bold text-[#19168D] mb-10">
                Contáctanos
              </h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#F0F4FF] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#19168D]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#139FCC] font-medium mb-1">
                      Ubicación
                    </p>
                    <p className="text-[#19168D] text-lg font-medium">
                      Santo Domingo, República Dominicana
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#F0F4FF] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#19168D]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#139FCC] font-medium mb-1">
                      Email
                    </p>
                    <p className="text-[#19168D] text-lg font-medium">
                      info@jmvrd.org
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#F0F4FF] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#19168D]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#139FCC] font-medium mb-1">
                      Teléfono
                    </p>
                    <p className="text-[#19168D] text-lg font-medium">
                      +1 (809) 123-4567
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/unete">
                <Button className="bg-[#F3A736] hover:bg-[#e09620] text-white px-10 py-6 text-lg rounded-full shadow-lg shadow-[#F3A736]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#F3A736]/30 group">
                  Únete a JMV
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
