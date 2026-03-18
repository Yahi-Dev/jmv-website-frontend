"use client"

import Navbar from "@/src/components/Navbar"
import { TestimonialsSection } from "@/src/features/testimonios/components/TestimonialsSection"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import {
  Users,
  Heart,
  HandHeart,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react"

const pillars = [
  {
    number: "01",
    title: "COMUNIDAD JUVENIL",
    description:
      "Crecimiento espiritual y humano a través de la catequesis y el liderazgo cristiano",
    icon: Users,
  },
  {
    number: "02",
    title: "ESPIRITUALIDAD",
    description:
      "Oración y contemplación siguiendo el ejemplo de María y San Vicente",
    icon: Heart,
  },
  {
    number: "03",
    title: "APOSTOLADO",
    description:
      "Compromiso con los más necesitados a través de obras de caridad",
    icon: HandHeart,
  },
  {
    number: "04",
    title: "FORMACIÓN",
    description:
      "Fraternidad y apoyo mutuo en el camino de fe y servicio",
    icon: BookOpen,
  },
]

const values = [
  { name: "Eclesial", color: "#139FCC" },
  { name: "Laical", color: "#F3A736" },
  { name: "Mariana", color: "#139FCC" },
  { name: "Misionera", color: "#F3A736" },
  { name: "Vicentina", color: "#139FCC" },
]

const activities = [
  {
    title: "Taller de Liderazgo JMV",
    date: "15 Dic 2024",
    type: "Formación",
    location: "Santo Domingo",
    time: "9:00 AM",
    description:
      "Desarrollo de habilidades de liderazgo cristiano para jóvenes comprometidos",
  },
  {
    title: "Misión de Verano",
    date: "22 Dic 2024",
    type: "Misión",
    location: "Monte Plata",
    time: "7:00 AM",
    description:
      "Experiencia misionera de servicio a comunidades rurales necesitadas",
  },
  {
    title: "Vigilia Mariana",
    date: "28 Dic 2024",
    type: "Espiritualidad",
    location: "Santiago",
    time: "8:00 PM",
    description:
      "Noche de oración y reflexión en honor a la Virgen María",
  },
]

export function HomePageV13() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ==================== HERO ==================== */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 pb-0">
        {/* Logo top-right */}
        <div className="absolute top-24 right-6 md:right-12 lg:right-20 z-10">
          <div className="border-4 border-[#19168D]">
            <Image
              src="/logo/jmv-logo.jpg"
              alt="JMV Logo"
              width={64}
              height={64}
              className="block"
            />
          </div>
        </div>

        {/* Massive title */}
        <div className="flex-1 flex flex-col justify-center">
          <h1
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black uppercase text-[#19168D] leading-[0.85] tracking-tight select-none"
          >
            Juventud
            <br />
            Mariana
            <br />
            Vicenciana
          </h1>

          <p className="font-mono text-lg sm:text-xl md:text-2xl text-[#F3A736] uppercase mt-6 tracking-widest">
            República Dominicana
          </p>
        </div>

        {/* Thick horizontal rule */}
        <div className="w-full h-2 bg-[#19168D] my-8" />

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link href="/unete">
            <Button
              variant="outline"
              className="rounded-none border-4 border-[#19168D] bg-transparent text-[#19168D] uppercase font-bold text-lg px-10 py-6 tracking-wider hover:bg-[#19168D] hover:text-white transition-colors"
            >
              Únete
            </Button>
          </Link>
          <Link href="/quienes-somos">
            <Button
              variant="outline"
              className="rounded-none border-4 border-[#19168D] bg-transparent text-[#19168D] uppercase font-bold text-lg px-10 py-6 tracking-wider hover:bg-[#19168D] hover:text-white transition-colors"
            >
              Misión
            </Button>
          </Link>
        </div>

        {/* Film strip image band */}
        <div className="w-full h-24 md:h-32 overflow-hidden">
          <Image
            src="/images/jmv/jmv-6.jpeg"
            alt="JMV Film Strip"
            width={1920}
            height={128}
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </section>

      {/* ==================== PILLARS ==================== */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-[#FAFAFA]">
        <h2 className="text-4xl md:text-5xl font-black uppercase text-[#19168D] mb-2">
          Nuestros Pilares
        </h2>
        <div className="w-40 h-1 bg-[#F3A736] mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 border-4 border-[#19168D]">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.number}
                className={`p-8 md:p-10 relative ${
                  index % 2 === 0 ? "md:border-r-4 md:border-[#19168D]" : ""
                } ${
                  index < 2 ? "border-b-4 border-[#19168D]" : ""
                } ${
                  index === 2 ? "md:border-r-4 md:border-[#19168D]" : ""
                }`}
              >
                <span className="font-mono text-6xl font-bold text-[#139FCC]/20 absolute top-4 right-6 select-none">
                  {pillar.number}
                </span>
                <Icon size={40} className="text-[#19168D] mb-4" strokeWidth={2} />
                <h3 className="text-xl md:text-2xl font-black uppercase text-[#19168D] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ==================== VALUES ==================== */}
      <section className="bg-[#19168D] px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <p className="text-white uppercase tracking-[0.4em] text-sm md:text-base mb-12 font-mono">
          Notas Distintivas
        </p>

        <div className="flex flex-col gap-4">
          {values.map((value) => (
            <div
              key={value.name}
              className="group cursor-default transition-all duration-200 hover:translate-x-2"
              style={{ borderLeftColor: value.color }}
            >
              <div
                className="border-l-4 group-hover:border-l-8 pl-6 md:pl-8 py-2 transition-all duration-200"
                style={{ borderLeftColor: value.color }}
              >
                <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white uppercase leading-tight">
                  {value.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <TestimonialsSection />

      {/* ==================== ACTIVITIES ==================== */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-white">
        <h2 className="text-4xl md:text-5xl font-black uppercase text-[#19168D] mb-2">
          Próximos Eventos
        </h2>
        <div className="w-40 h-1 bg-[#F3A736] mb-12" />

        <div className="flex flex-col">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="border-t-4 border-[#19168D] py-8 flex flex-col md:flex-row gap-6 md:gap-0"
            >
              {/* Date block */}
              <div className="md:w-48 lg:w-56 shrink-0 flex flex-col justify-start">
                <span className="font-mono text-2xl md:text-3xl font-bold text-[#19168D]">
                  {activity.date}
                </span>
              </div>

              {/* Vertical divider */}
              <div className="hidden md:block w-1 bg-[#19168D] mx-8 self-stretch" />

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <h3 className="text-xl md:text-2xl font-black uppercase text-[#19168D]">
                    {activity.title}
                  </h3>
                  <span className="border-4 border-[#139FCC] text-[#139FCC] text-xs font-bold uppercase px-3 py-1 tracking-wider">
                    {activity.type}
                  </span>
                </div>
                <p className="text-gray-600 text-base mb-4 leading-relaxed">
                  {activity.description}
                </p>
                <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-mono">
                  <span className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#19168D]" />
                    {activity.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} className="text-[#19168D]" />
                    {activity.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {/* Bottom border for last item */}
          <div className="border-t-4 border-[#19168D]" />
        </div>

        <div className="mt-12">
          <Link href="/eventos">
            <Button
              variant="outline"
              className="rounded-none border-4 border-[#19168D] bg-transparent text-[#19168D] uppercase font-bold text-base px-8 py-6 tracking-wider hover:bg-[#19168D] hover:text-white transition-colors group"
            >
              Ver Todos Los Eventos
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Left block — yellow */}
        <div className="bg-[#F3A736] px-6 md:px-12 lg:px-16 py-16 md:py-20 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight mb-8">
            Visítanos
          </h2>
          <div className="flex items-start gap-3 text-white">
            <MapPin size={24} className="shrink-0 mt-1" />
            <div>
              <p className="text-lg font-bold">Santo Domingo</p>
              <p className="text-white/80">República Dominicana</p>
            </div>
          </div>
        </div>

        {/* Right block — white with thick left border */}
        <div className="bg-white border-l-0 md:border-l-8 md:border-[#19168D] px-6 md:px-12 lg:px-16 py-16 md:py-20 flex flex-col justify-center gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Mail size={24} className="text-[#19168D] shrink-0" />
              <a
                href="mailto:info@jmvrd.org"
                className="text-lg font-mono text-gray-700 hover:text-[#19168D] transition-colors"
              >
                info@jmvrd.org
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={24} className="text-[#19168D] shrink-0" />
              <a
                href="tel:+18091234567"
                className="text-lg font-mono text-gray-700 hover:text-[#19168D] transition-colors"
              >
                +1 (809) 123-4567
              </a>
            </div>
          </div>

          <Link href="/unete">
            <Button className="rounded-none border-4 border-[#19168D] bg-[#19168D] text-white uppercase font-bold text-lg px-10 py-6 tracking-wider hover:bg-[#19168D]/90 transition-colors w-full md:w-auto">
              Únete
            </Button>
          </Link>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
