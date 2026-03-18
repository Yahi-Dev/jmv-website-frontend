"use client"

import Navbar from "@/src/components/Navbar"
import { TestimonialsSection } from "@/src/features/testimonios/components/TestimonialsSection"
import { FooterSection } from "@/src/components/shared/FooterSection"
import Link from "next/link"
import Image from "next/image"
import { Users, Heart, HandHeart, BookOpen, Calendar, Clock, MapPin, Mail, Phone, ArrowRight } from "lucide-react"

const pillars = [
  {
    number: "1",
    icon: Users,
    title: "Comunidad Juvenil",
    description: "Crecimiento espiritual y humano a través de la catequesis y el liderazgo cristiano",
  },
  {
    number: "2",
    icon: Heart,
    title: "Espiritualidad",
    description: "Oración y contemplación siguiendo el ejemplo de María y San Vicente",
  },
  {
    number: "3",
    icon: HandHeart,
    title: "Apostolado",
    description: "Compromiso con los más necesitados a través de obras de caridad",
  },
  {
    number: "4",
    icon: BookOpen,
    title: "Formación",
    description: "Fraternidad y apoyo mutuo en el camino de fe y servicio",
  },
]

const values = ["Eclesial", "Laical", "Mariana", "Misionera", "Vicentina"]

const activities = [
  {
    day: "15",
    month: "Dic",
    year: "2024",
    type: "Formación",
    title: "Taller de Liderazgo JMV",
    description: "Desarrollo de habilidades de liderazgo cristiano para jóvenes comprometidos",
    location: "Santo Domingo",
    time: "9:00 AM",
  },
  {
    day: "22",
    month: "Dic",
    year: "2024",
    type: "Misión",
    title: "Misión de Verano",
    description: "Experiencia misionera de servicio a comunidades rurales necesitadas",
    location: "Monte Plata",
    time: "7:00 AM",
  },
  {
    day: "28",
    month: "Dic",
    year: "2024",
    type: "Espiritualidad",
    title: "Vigilia Mariana",
    description: "Noche de oración y reflexión en honor a la Virgen María",
    location: "Santiago",
    time: "8:00 PM",
  },
]

export function HomePageV15() {
  return (
    <main className="min-h-screen bg-[#FEFDFB]">
      <Navbar />

      {/* HERO — Magazine Cover */}
      <section className="min-h-screen px-6 md:px-12 lg:px-20 pt-24 pb-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 lg:gap-16 items-start">
          {/* Left column */}
          <div className="flex flex-col justify-between min-h-[70vh] py-8">
            <div>
              <Image
                src="/logo/jmv-logo.jpg"
                alt="JMV Logo"
                width={48}
                height={48}
                className="rounded-lg mb-12"
              />
              <h1 className="font-serif leading-[0.9] tracking-tight text-[#19168D]">
                <span className="block text-5xl sm:text-7xl lg:text-[8rem]">JUVENTUD</span>
                <span className="block text-5xl sm:text-7xl lg:text-[8rem]">MARIANA</span>
                <span className="block text-5xl sm:text-7xl lg:text-[8rem]">VICENCIANA</span>
              </h1>
              <div className="mt-8 w-32 h-px bg-[#F3A736]" />
              <p className="mt-6 text-sm font-sans uppercase tracking-[0.3em] text-[#139FCC]">
                República Dominicana
              </p>
              <p className="mt-6 text-xl text-[#666] italic font-serif max-w-lg">
                &ldquo;Una comunidad de jóvenes comprometidos con la fe, el servicio y la transformación social.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-10 mt-12">
              <Link
                href="/unete"
                className="font-serif text-lg text-[#F3A736] hover:underline underline-offset-4 decoration-[#F3A736] transition-all inline-flex items-center gap-2"
              >
                Únete <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/quienes-somos"
                className="font-serif text-lg text-[#19168D] hover:underline underline-offset-4 decoration-[#19168D] transition-all"
              >
                Nuestra misión
              </Link>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col">
            <div className="relative min-h-[50vh] lg:min-h-[70vh] border border-[#E5E5E5]">
              <Image
                src="/images/jmv/jmv-7.jpeg"
                alt="Jóvenes en misión"
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-gray-400 font-serif italic">
              Jóvenes en misión, Santo Domingo
            </p>
          </div>
        </div>
      </section>

      {/* PILLARS — Editorial Feature */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="w-full h-px bg-[#E5E5E5] mb-12" />

          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-[#F3A736]" />
            <span className="font-serif text-sm text-[#19168D] uppercase tracking-[0.4em]">
              Nuestros Pilares
            </span>
          </div>
          <h2 className="font-serif text-4xl text-[#19168D] mb-16">
            Los cimientos de nuestra comunidad
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div key={pillar.number} className="py-8 border-b border-[#E5E5E5]">
                  <div className="flex gap-6">
                    <span className="text-6xl font-serif text-[#19168D]/15 leading-none select-none shrink-0">
                      {pillar.number}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-5 h-5 text-[#139FCC]" />
                        <h3 className="font-serif text-2xl font-bold text-[#19168D]">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-base text-[#666] leading-relaxed">
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

      {/* VALUES — Typographic Spread */}
      <section className="bg-[#FAF8F5] border-y border-[#E5E5E5] px-6 md:px-12 lg:px-20 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-[#F3A736]" />
            <span className="font-serif text-sm text-[#19168D] uppercase tracking-[0.4em]">
              Notas Distintivas
            </span>
          </div>
          <h2 className="font-serif text-4xl text-[#19168D] mb-16">
            Los valores que nos definen como comunidad de fe
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 md:gap-x-6">
            {values.map((value, index) => (
              <div key={value} className="flex items-center gap-4 md:gap-6">
                <span className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#19168D] hover:underline underline-offset-8 decoration-[#F3A736] decoration-2 cursor-default transition-all duration-300">
                  {value}
                </span>
                {index < values.length - 1 && (
                  <span className="text-4xl sm:text-5xl lg:text-6xl text-[#F3A736] font-serif select-none">
                    ·
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* ACTIVITIES — Magazine Listings */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="w-full h-px bg-[#E5E5E5] mb-12" />

          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-[#F3A736]" />
            <span className="font-serif text-sm text-[#19168D] uppercase tracking-[0.4em]">
              Próximos Eventos
            </span>
          </div>
          <h2 className="font-serif text-4xl text-[#19168D] mb-12">
            Agenda de actividades
          </h2>

          {/* Editorial photo spread */}
          <div className="mb-12">
            <div className="relative h-64 w-full">
              <Image
                src="/images/jmv/jmv-2.jpeg"
                alt="Actividades JMV"
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-gray-400 font-serif italic">
              Jóvenes participando en actividades comunitarias
            </p>
          </div>

          {/* Activity listings */}
          <div className="space-y-0">
            {activities.map((activity, index) => (
              <div
                key={index}
                className={`flex flex-col sm:flex-row gap-6 sm:gap-12 py-8 ${
                  index < activities.length - 1 ? "border-b border-[#E5E5E5]" : ""
                }`}
              >
                {/* Date */}
                <div className="shrink-0 sm:w-24 text-center sm:text-left">
                  <span className="font-serif text-3xl text-[#19168D] block leading-none">
                    {activity.day}
                  </span>
                  <span className="text-sm text-gray-400 font-serif">
                    {activity.month} {activity.year}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <span className="text-xs text-[#139FCC] uppercase tracking-widest font-sans block mb-2">
                    {activity.type}
                  </span>
                  <h3 className="font-serif text-xl text-[#19168D] mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-[#666] text-base mb-3">
                    {activity.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {activity.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/eventos"
              className="font-serif text-lg text-[#F3A736] hover:underline underline-offset-4 decoration-[#F3A736] transition-all inline-flex items-center gap-2"
            >
              Ver todos los eventos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT — Editorial Closing */}
      <section className="bg-[#FEFDFB] px-6 md:px-12 lg:px-20 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-5xl text-[#19168D] mb-6">Escríbenos</h2>
          <div className="mx-auto w-16 h-px bg-[#F3A736] mb-12" />

          <div className="space-y-0">
            <div className="py-5 border-b border-[#E5E5E5]">
              <div className="inline-flex items-center gap-3 font-serif text-lg text-[#2D2D2D]">
                <MapPin className="w-5 h-5 text-[#139FCC] shrink-0" />
                Santo Domingo, República Dominicana
              </div>
            </div>
            <div className="py-5 border-b border-[#E5E5E5]">
              <a
                href="mailto:info@jmvrd.org"
                className="inline-flex items-center gap-3 font-serif text-lg text-[#2D2D2D] hover:text-[#19168D] transition-colors"
              >
                <Mail className="w-5 h-5 text-[#139FCC] shrink-0" />
                info@jmvrd.org
              </a>
            </div>
            <div className="py-5 border-b border-[#E5E5E5]">
              <a
                href="tel:+18091234567"
                className="inline-flex items-center gap-3 font-serif text-lg text-[#2D2D2D] hover:text-[#19168D] transition-colors"
              >
                <Phone className="w-5 h-5 text-[#139FCC] shrink-0" />
                +1 (809) 123-4567
              </a>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/unete"
              className="font-serif text-xl italic text-[#F3A736] hover:underline underline-offset-4 decoration-[#F3A736] transition-all inline-flex items-center gap-2"
            >
              Únete a nuestra comunidad <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
