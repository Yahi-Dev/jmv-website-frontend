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
    icon: Users,
    title: "Comunidad Juvenil",
    description:
      "Crecimiento espiritual y humano a través de la catequesis y el liderazgo cristiano",
    iconBg: "bg-[#19168D]/10",
    iconColor: "text-[#19168D]",
  },
  {
    icon: Heart,
    title: "Espiritualidad",
    description:
      "Oración y contemplación siguiendo el ejemplo de María y San Vicente",
    iconBg: "bg-[#139FCC]/10",
    iconColor: "text-[#139FCC]",
  },
  {
    icon: HandHeart,
    title: "Apostolado",
    description:
      "Compromiso con los más necesitados a través de obras de caridad",
    iconBg: "bg-[#F3A736]/10",
    iconColor: "text-[#F3A736]",
  },
  {
    icon: BookOpen,
    title: "Formación",
    description:
      "Fraternidad y apoyo mutuo en el camino de fe y servicio",
    iconBg: "bg-[#19168D]/10",
    iconColor: "text-[#19168D]",
  },
]

const values = [
  { name: "Eclesial", dotColor: "bg-[#19168D]" },
  { name: "Laical", dotColor: "bg-[#139FCC]" },
  { name: "Mariana", dotColor: "bg-[#F3A736]" },
  { name: "Misionera", dotColor: "bg-[#19168D]" },
  { name: "Vicentina", dotColor: "bg-[#139FCC]" },
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
    image: "/images/jmv/jmv-2.jpeg",
    featured: true,
  },
  {
    title: "Misión de Verano",
    date: "22 Dic 2024",
    type: "Misión",
    location: "Monte Plata",
    time: "7:00 AM",
    description:
      "Experiencia misionera de servicio a comunidades rurales necesitadas",
    image: null,
    featured: false,
  },
  {
    title: "Vigilia Mariana",
    date: "28 Dic 2024",
    type: "Espiritualidad",
    location: "Santiago",
    time: "8:00 PM",
    description:
      "Noche de oración y reflexión en honor a la Virgen María",
    image: null,
    featured: false,
  },
]

export function HomePageV14() {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <Navbar />

      {/* ── Hero Bento Grid ── */}
      <section className="min-h-[85vh] flex items-center">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4">
            {/* Cell A — Main text */}
            <div className="md:col-span-2 md:row-span-3 bg-white rounded-3xl p-8 md:p-12 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="/logo/jmv-logo.jpg"
                  alt="JMV Logo"
                  width={64}
                  height={64}
                  className="rounded-xl"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#19168D] leading-tight mb-3">
                Juventud Mariana Vicenciana
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-[#F3A736] mb-8">
                República Dominicana
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="bg-[#F3A736] hover:bg-[#e09620] text-white rounded-xl px-6 py-3 text-base font-semibold shadow-md"
                >
                  <Link href="/unete">
                    Únete a JMV
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#19168D] text-[#19168D] hover:bg-[#19168D]/5 rounded-xl px-6 py-3 text-base font-semibold"
                >
                  <Link href="/quienes-somos">Conoce nuestra misión</Link>
                </Button>
              </div>
            </div>

            {/* Cell B — Image */}
            <div className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden shadow-sm min-h-[240px] md:min-h-0">
              <Image
                src="/images/jmv/jmv-6.jpeg"
                alt="JMV Comunidad"
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Cell C — Stats: Pilares */}
            <div className="md:col-span-1 md:row-span-1 bg-[#EEF6FF] rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm">
              <span className="text-4xl font-bold text-[#19168D]">4</span>
              <span className="text-sm font-medium text-[#139FCC] mt-1">
                Pilares
              </span>
            </div>

            {/* Cell D — Stats: Valores */}
            <div className="md:col-span-1 md:row-span-1 bg-[#FFF8ED] rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm">
              <span className="text-4xl font-bold text-[#19168D]">5</span>
              <span className="text-sm font-medium text-[#F3A736] mt-1">
                Valores
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars Bento Grid ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#19168D] text-center mb-12">
            Nuestros Pilares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon
              const colSpan = idx === 0 || idx === 3 ? "md:col-span-2" : "md:col-span-1"
              const bg =
                idx === 0
                  ? "bg-white"
                  : idx === 1
                    ? "bg-[#EEF6FF]"
                    : idx === 2
                      ? "bg-[#FFF8ED]"
                      : "bg-white"
              const border = idx === 3 ? "border-l-4 border-[#F3A736]" : ""
              return (
                <div
                  key={pillar.title}
                  className={`${colSpan} ${bg} rounded-3xl p-8 shadow-sm ${border}`}
                >
                  <div
                    className={`w-14 h-14 ${pillar.iconBg} rounded-2xl flex items-center justify-center mb-5`}
                  >
                    <Icon className={`w-7 h-7 ${pillar.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-[#19168D] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Values Bento Chips ── */}
      <section className="py-20 bg-[#F0F0FF]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#19168D] text-center mb-3">
            Notas Distintivas
          </h2>
          <p className="text-gray-500 text-center mb-12 text-lg">
            Los valores que nos definen como comunidad de fe
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {values.map((value) => (
              <div
                key={value.name}
                className="bg-white rounded-3xl shadow-sm p-6 flex flex-col items-center justify-center min-h-[160px] hover:scale-[1.03] hover:shadow-md transition-all duration-300 cursor-default"
              >
                <div className={`w-3 h-3 rounded-full ${value.dotColor} mb-5`} />
                <span className="text-lg font-bold text-[#19168D] text-center">
                  {value.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <TestimonialsSection />

      {/* ── Activities Bento Grid ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#19168D] text-center mb-12">
            Próximos Eventos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Featured card — large */}
            <div className="md:col-span-2 bg-white rounded-3xl shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={activities[0].image!}
                  alt={activities[0].title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#139FCC] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {activities[0].type}
                </span>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-[#19168D] mb-2">
                  {activities[0].title}
                </h3>
                <p className="text-gray-500 mb-4">
                  {activities[0].description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {activities[0].date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {activities[0].time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {activities[0].location}
                  </span>
                </div>
              </div>
            </div>

            {/* Stacked smaller cards */}
            <div className="md:col-span-1 flex flex-col gap-4">
              {activities.slice(1).map((activity, idx) => (
                <div
                  key={activity.title}
                  className={`flex-1 rounded-3xl p-6 shadow-sm border-l-4 ${
                    idx === 0
                      ? "bg-[#EEF6FF] border-[#139FCC]"
                      : "bg-[#FFF8ED] border-[#F3A736]"
                  }`}
                >
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
                      idx === 0
                        ? "bg-[#139FCC]/10 text-[#139FCC]"
                        : "bg-[#F3A736]/10 text-[#F3A736]"
                    }`}
                  >
                    {activity.type}
                  </span>
                  <h3 className="text-lg font-bold text-[#19168D] mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {activity.description}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {activity.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {activity.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {activity.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Button
              asChild
              className="bg-[#19168D] hover:bg-[#13107a] text-white rounded-xl px-8 py-3 text-base font-semibold shadow-md"
            >
              <Link href="/eventos">
                Ver todos los eventos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Contact Bento Grid ── */}
      <section className="py-20 bg-[#F8F9FC]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Main contact card */}
            <div className="md:col-span-2 bg-white rounded-3xl p-8 md:p-10 shadow-lg">
              <h2 className="text-3xl font-bold text-[#19168D] mb-8">
                Contáctanos
              </h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#19168D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#19168D]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-0.5">Dirección</p>
                    <p className="text-gray-700 font-medium">
                      Santo Domingo, República Dominicana
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#139FCC]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#139FCC]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-0.5">Correo</p>
                    <p className="text-gray-700 font-medium">
                      info@jmvrd.org
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F3A736]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#F3A736]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-0.5">Teléfono</p>
                    <p className="text-gray-700 font-medium">
                      +1 (809) 123-4567
                    </p>
                  </div>
                </div>
              </div>
              <Button
                asChild
                className="bg-[#F3A736] hover:bg-[#e09620] text-white rounded-xl px-8 py-3 text-base font-semibold shadow-md"
              >
                <Link href="/unete">
                  Únete a JMV
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Location highlight cell */}
            <div className="md:col-span-1 bg-[#F0F0FF] rounded-3xl p-8 flex flex-col items-center justify-center shadow-sm">
              <div className="w-16 h-16 bg-[#19168D]/10 rounded-2xl flex items-center justify-center mb-5">
                <MapPin className="w-8 h-8 text-[#19168D]" />
              </div>
              <h3 className="text-xl font-bold text-[#19168D] mb-1">
                Santo Domingo
              </h3>
              <p className="text-gray-500 text-sm">República Dominicana</p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
