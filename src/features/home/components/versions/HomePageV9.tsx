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

export function HomePageV9() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ═══════════════ HERO — Asymmetric Split Screen ═══════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Left — White content side */}
        <div className="relative z-10 w-full lg:w-[55%] min-h-screen flex flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-28 py-32 bg-white">
          {/* Decorative gold accent bar */}
          <div className="w-16 h-1 bg-[#F3A736] mb-8" />

          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/logo/jmv-logo.jpg"
              alt="JMV Logo"
              width={80}
              height={80}
              className="rounded-2xl shadow-lg"
            />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#19168D] leading-[1.05] tracking-tight mb-4">
            Juventud
            <br />
            Mariana
            <br />
            <span className="relative inline-block">
              Vicenciana
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#F3A736]" />
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#139FCC] font-medium mt-6 mb-10 tracking-wide">
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

        {/* Right — Image side with diagonal clip */}
        <div
          className="hidden lg:block absolute top-0 right-0 w-[55%] h-full"
          style={{
            clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        >
          <Image
            src="/images/jmv/jmv-6.jpeg"
            alt="JMV Comunidad"
            fill
            className="object-cover"
            priority
          />
          {/* Light blue tint overlay */}
          <div className="absolute inset-0 bg-[#139FCC]/10" />
          {/* White fade from left for blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent" />
        </div>

        {/* Mobile image background */}
        <div className="lg:hidden absolute inset-0 -z-10">
          <Image
            src="/images/jmv/jmv-6.jpeg"
            alt="JMV Comunidad"
            fill
            className="object-cover opacity-10"
          />
        </div>

        {/* Scroll chevron */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-8 h-8 text-[#19168D]/40" />
        </div>
      </section>

      {/* ═══════════════ PILLARS — Alternating Rows ═══════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-[#F3A736]/10 text-[#F3A736] border-[#F3A736]/20 mb-4 text-sm px-4 py-1">
              Nuestros Pilares
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#19168D]">
              Fundamentos de nuestra fe
            </h2>
          </div>

          <div className="space-y-0">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              const isEven = i % 2 === 0
              return (
                <div
                  key={pillar.number}
                  className="group relative border-t border-gray-100 last:border-b transition-colors duration-500 hover:bg-[#F0F4FF]/50"
                >
                  <div
                    className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 py-12 sm:py-16 lg:py-20 ${
                      isEven ? "" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* Large background number */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-8 sm:right-16 pointer-events-none select-none">
                      <span className="text-[120px] sm:text-[180px] font-black text-[#139FCC]/[0.06] leading-none">
                        {pillar.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#19168D] flex items-center justify-center shadow-lg shadow-[#19168D]/20">
                        <Icon className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1">
                      {/* Accent bar */}
                      <div
                        className={`w-10 h-0.5 mb-4 ${
                          i % 2 === 0 ? "bg-[#F3A736]" : "bg-[#139FCC]"
                        }`}
                      />
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#19168D] mb-3">
                        {pillar.title}
                      </h3>
                      <p className="text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ VALUES — Angled Background with Large Text ═══════════════ */}
      <section className="relative py-28 sm:py-36 overflow-hidden">
        {/* Angled background */}
        <div
          className="absolute inset-0 bg-[#F0F4FF]"
          style={{
            clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-lg sm:text-xl font-bold tracking-[0.3em] uppercase text-[#F3A736] mb-4">
            Notas Distintivas
          </h2>
          <p className="text-gray-500 text-base sm:text-lg mb-16 max-w-xl mx-auto">
            Los valores que nos definen como comunidad de fe
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 gap-y-4">
            {values.map((value, i) => (
              <div key={value} className="flex items-center gap-3 sm:gap-6">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#19168D] tracking-tight">
                  {value}
                </span>
                {i < values.length - 1 && (
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#F3A736]">
                    /
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <TestimonialsSection />

      {/* ═══════════════ ACTIVITIES — Alternating Image/Text ═══════════════ */}
      <section className="py-24 sm:py-32 bg-[#FAFBFD]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-[#139FCC]/10 text-[#139FCC] border-[#139FCC]/20 mb-4 text-sm px-4 py-1">
              Próximos Eventos
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#19168D]">
              Actividades
            </h2>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {activities.map((activity, i) => {
              const isImageLeft = i % 2 === 0
              return (
                <div
                  key={activity.title}
                  className={`flex flex-col ${
                    isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 lg:gap-14 items-center`}
                >
                  {/* Image */}
                  <div className="relative w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-white/90 text-[#19168D] border-0 backdrop-blur-sm">
                      {activity.type}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-[#139FCC] mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {activity.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {activity.time}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-[#19168D] mb-3">
                      {activity.title}
                    </h3>

                    <p className="text-gray-500 text-base leading-relaxed mb-4">
                      {activity.desc}
                    </p>

                    <div className="flex items-center gap-1.5 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {activity.location}
                    </div>
                  </div>
                </div>
              )
            })}
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

      {/* ═══════════════ CONTACT — Split Asymmetric ═══════════════ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-xl">
            {/* Left — Location info on light blue */}
            <div className="relative w-full lg:w-1/2 bg-[#F0F4FF] p-10 sm:p-14 lg:p-16 flex flex-col justify-center">
              {/* Angled divider visible on desktop */}
              <div
                className="hidden lg:block absolute top-0 right-0 w-24 h-full bg-white z-10"
                style={{
                  clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                }}
              />

              <h2 className="text-3xl sm:text-4xl font-bold text-[#19168D] mb-8">
                Contáctanos
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#19168D]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#19168D]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#139FCC] font-medium mb-1">
                      Ubicación
                    </p>
                    <p className="text-[#19168D] font-medium">
                      Santo Domingo, República Dominicana
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#19168D]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#19168D]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#139FCC] font-medium mb-1">
                      Email
                    </p>
                    <p className="text-[#19168D] font-medium">
                      info@jmvrd.org
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#19168D]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#19168D]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#139FCC] font-medium mb-1">
                      Teléfono
                    </p>
                    <p className="text-[#19168D] font-medium">
                      +1 (809) 123-4567
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — CTA on white */}
            <div className="w-full lg:w-1/2 bg-white p-10 sm:p-14 lg:p-16 flex flex-col justify-center items-start">
              <div className="w-12 h-1 bg-[#F3A736] mb-6" />
              <h3 className="text-2xl sm:text-3xl font-bold text-[#19168D] mb-4">
                Forma parte de nuestra comunidad
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8 max-w-md">
                Únete a miles de jóvenes que viven su fe con alegría y
                compromiso siguiendo el carisma vicentino.
              </p>
              <Link href="/unete">
                <Button className="bg-[#F3A736] hover:bg-[#e09620] text-white px-10 py-6 text-lg rounded-full shadow-lg shadow-[#F3A736]/20 transition-all duration-300 hover:shadow-xl">
                  Únete a JMV
                  <ArrowRight className="ml-2 w-5 h-5" />
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
