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
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  Users,
  Flame,
  HandHeart,
  GraduationCap,
  Building2,
  Heart,
  Globe,
  ChevronRight,
} from "lucide-react"

const stats = [
  { label: "Centros", value: "10+", icon: Building2, color: "#19168D" },
  { label: "J\u00f3venes", value: "500+", icon: Users, color: "#139FCC" },
  { label: "Comunidades", value: "8+", icon: Globe, color: "#F3A736" },
  { label: "Pilares", value: "4", icon: Heart, color: "#19168D" },
]

const pillars = [
  {
    title: "Comunidad Juvenil",
    description:
      "Crecimiento espiritual y humano a trav\u00e9s de la catequesis y el liderazgo cristiano",
    icon: Users,
    color: "#19168D",
  },
  {
    title: "Espiritualidad",
    description:
      "Oraci\u00f3n y contemplaci\u00f3n siguiendo el ejemplo de Mar\u00eda y San Vicente",
    icon: Flame,
    color: "#139FCC",
  },
  {
    title: "Apostolado",
    description:
      "Compromiso con los m\u00e1s necesitados a trav\u00e9s de obras de caridad",
    icon: HandHeart,
    color: "#F3A736",
  },
  {
    title: "Formaci\u00f3n",
    description:
      "Fraternidad y apoyo mutuo en el camino de fe y servicio",
    icon: GraduationCap,
    color: "#19168D",
  },
]

const values = [
  { name: "Eclesial" },
  { name: "Laical" },
  { name: "Mariana" },
  { name: "Misionera" },
  { name: "Vicentina" },
]

const valueColors = ["#19168D", "#139FCC", "#F3A736", "#19168D", "#139FCC"]

const activities = [
  {
    title: "Taller de Liderazgo JMV",
    date: "15 Dic 2024",
    type: "Formaci\u00f3n",
    location: "Santo Domingo",
    time: "9:00 AM",
    desc: "Desarrollo de habilidades de liderazgo cristiano para j\u00f3venes comprometidos",
  },
  {
    title: "Misi\u00f3n de Verano",
    date: "22 Dic 2024",
    type: "Misi\u00f3n",
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
    desc: "Noche de oraci\u00f3n y reflexi\u00f3n en honor a la Virgen Mar\u00eda",
  },
]

export function HomePageV8() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      {/* HERO - Compact dashboard-style */}
      <section className="bg-[#19168D] pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12">
            <Image
              src="/logo/jmv-logo.jpg"
              alt="JMV Logo"
              width={80}
              height={80}
              className="rounded-2xl shadow-lg"
            />
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Juventud Mariana Vicenciana
              </h1>
              <p className="text-[#139FCC] text-lg mt-2 font-medium">
                {"Rep\u00fablica Dominicana"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Link href="/unete">
              <Button
                size="lg"
                className="bg-[#F3A736] hover:bg-[#F3A736]/90 text-black font-semibold px-6 py-5 transition-all duration-200"
              >
                {"\u00danete a JMV"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/quienes-somos">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-6 py-5 transition-all duration-200"
              >
                {"Conoce nuestra misi\u00f3n"}
              </Button>
            </Link>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <Card
                key={i}
                className="bg-white border-0 shadow-lg overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className="h-1"
                  style={{ backgroundColor: stat.color }}
                />
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {stat.label}
                      </p>
                    </div>
                    <stat.icon
                      className="h-8 w-8 opacity-20"
                      style={{ color: stat.color }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS - 2x2 grid of cards */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Nuestros Pilares
            </h2>
            <p className="text-gray-500 mt-2">
              Los fundamentos de nuestra comunidad
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar, i) => (
              <Card
                key={i}
                className="group border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div
                      className="p-2.5 rounded-lg"
                      style={{ backgroundColor: `${pillar.color}10` }}
                    >
                      <pillar.icon
                        className="h-5 w-5"
                        style={{ color: pillar.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {pillar.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-500 text-sm leading-relaxed mb-4">
                    {pillar.description}
                  </CardDescription>
                  <span className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all duration-200" style={{ color: pillar.color }}>
                    {"Leer m\u00e1s"}
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES - Horizontal chip row */}
      <section className="bg-gray-100 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#F3A736] font-semibold mb-1">
                Notas Distintivas
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Los valores que nos definen como comunidad de fe
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {values.map((value, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 bg-white rounded-full px-5 py-3 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-default"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-200"
                  style={{ backgroundColor: valueColors[i] }}
                />
                <span className="text-sm font-semibold text-gray-700">
                  {value.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* ACTIVITIES - Table/list style */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {"Pr\u00f3ximos Eventos"}
              </h2>
              <p className="text-gray-500 mt-1 text-sm">
                {"Calendario de actividades pr\u00f3ximas"}
              </p>
            </div>
            <Link href="/eventos">
              <Button
                variant="outline"
                className="border-[#19168D]/20 text-[#19168D] hover:bg-[#19168D]/5 transition-all duration-200"
              >
                Ver todos los eventos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Desktop table header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
            <div className="col-span-2">Fecha</div>
            <div className="col-span-4">Evento</div>
            <div className="col-span-2">Ubicaci&oacute;n</div>
            <div className="col-span-2">Tipo</div>
            <div className="col-span-2">Hora</div>
          </div>

          {/* Activity rows */}
          <div className="divide-y divide-gray-100">
            {activities.map((activity, i) => (
              <div
                key={i}
                className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-5 py-5 hover:bg-gray-50 transition-colors duration-150 rounded-lg"
              >
                {/* Date */}
                <div className="md:col-span-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#139FCC] md:hidden" />
                  <span className="text-sm font-semibold text-gray-900 md:text-gray-600">
                    {activity.date}
                  </span>
                </div>

                {/* Title + desc */}
                <div className="md:col-span-4">
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#19168D] transition-colors duration-200">
                    {activity.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                    {activity.desc}
                  </p>
                </div>

                {/* Location */}
                <div className="md:col-span-2 flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {activity.location}
                  </span>
                </div>

                {/* Type badge */}
                <div className="md:col-span-2 flex items-center">
                  <Badge
                    variant="secondary"
                    className="bg-[#19168D]/5 text-[#19168D] hover:bg-[#19168D]/10 font-medium text-xs"
                  >
                    {activity.type}
                  </Badge>
                </div>

                {/* Time */}
                <div className="md:col-span-2 flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - Grid of 3 cards + CTA banner */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Contacto
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {/* Location card */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#19168D]/5">
                  <MapPin className="h-5 w-5 text-[#19168D]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    {"Ubicaci\u00f3n"}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {"Santo Domingo, Rep\u00fablica Dominicana"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Email card */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#139FCC]/5">
                  <Mail className="h-5 w-5 text-[#139FCC]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:info@jmvrd.org"
                    className="text-sm font-medium text-gray-900 hover:text-[#139FCC] transition-colors duration-200"
                  >
                    info@jmvrd.org
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Phone card */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#F3A736]/5">
                  <Phone className="h-5 w-5 text-[#F3A736]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    {"Tel\u00e9fono"}
                  </p>
                  <a
                    href="tel:+18091234567"
                    className="text-sm font-medium text-gray-900 hover:text-[#F3A736] transition-colors duration-200"
                  >
                    +1 (809) 123-4567
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Full-width CTA banner */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#19168D] via-[#19168D] to-[#139FCC] p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F3A736]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#139FCC]/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {"\u00bfListo para unirte a nuestra comunidad?"}
                </h3>
                <p className="text-white/70 text-sm md:text-base">
                  {"S\u00e9 parte de una comunidad comprometida con la fe y el servicio."}
                </p>
              </div>
              <Link href="/unete" className="flex-shrink-0">
                <Button
                  size="lg"
                  className="bg-[#F3A736] hover:bg-[#F3A736]/90 text-black font-semibold px-8 py-5 transition-all duration-200 hover:scale-105"
                >
                  {"\u00danete a JMV"}
                  <ArrowRight className="ml-2 h-4 w-4" />
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
