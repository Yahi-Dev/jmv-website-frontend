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
    color: "bg-[#19168D]",
  },
  {
    icon: Heart,
    title: "Espiritualidad",
    description: "Oracion y contemplacion siguiendo el ejemplo de Maria y San Vicente",
    color: "bg-[#139FCC]",
  },
  {
    icon: HandHeart,
    title: "Apostolado",
    description: "Compromiso con los mas necesitados a traves de obras de caridad",
    color: "bg-[#F3A736]",
  },
  {
    icon: BookOpen,
    title: "Formacion",
    description: "Fraternidad y apoyo mutuo en el camino de fe y servicio",
    color: "bg-[#19168D]",
  },
]

const values = [
  { name: "Eclesial", borderColor: "border-[#19168D]", textColor: "text-[#19168D]" },
  { name: "Laical", borderColor: "border-[#139FCC]", textColor: "text-[#139FCC]" },
  { name: "Mariana", borderColor: "border-[#F3A736]", textColor: "text-[#F3A736]" },
  { name: "Misionera", borderColor: "border-[#19168D]", textColor: "text-[#19168D]" },
  { name: "Vicentina", borderColor: "border-[#139FCC]", textColor: "text-[#139FCC]" },
]

const activities = [
  {
    title: "Taller de Liderazgo JMV",
    date: "15 Dic 2024",
    type: "Formacion",
    location: "Santo Domingo",
    time: "9:00 AM",
    desc: "Desarrollo de habilidades de liderazgo cristiano para jovenes comprometidos",
    image: "/images/jmv/jmv-3.jpeg",
    dotColor: "bg-[#19168D]",
  },
  {
    title: "Mision de Verano",
    date: "22 Dic 2024",
    type: "Mision",
    location: "Monte Plata",
    time: "7:00 AM",
    desc: "Experiencia misionera de servicio a comunidades rurales necesitadas",
    image: "/images/jmv/jmv-7.jpeg",
    dotColor: "bg-[#139FCC]",
  },
  {
    title: "Vigilia Mariana",
    date: "28 Dic 2024",
    type: "Espiritualidad",
    location: "Santiago",
    time: "8:00 PM",
    desc: "Noche de oracion y reflexion en honor a la Virgen Maria",
    image: "/images/jmv/jmv-9.jpeg",
    dotColor: "bg-[#F3A736]",
  },
]

export function HomePageV5() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#FFF8F0] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #19168D 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="container relative z-10 px-6 py-20 lg:py-28">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
            {/* Image with decorative frame */}
            <div className="relative flex-shrink-0">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Gold decorative frame */}
                <div className="absolute -inset-3 rounded-[2rem] border-[3px] border-[#F3A736] opacity-60" />
                <div className="absolute -inset-6 rounded-[2.5rem] border border-[#F3A736]/30" />
                {/* Corner accents */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-[3px] border-l-[3px] border-[#F3A736] rounded-tl-xl" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-[3px] border-r-[3px] border-[#F3A736] rounded-tr-xl" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-[3px] border-l-[3px] border-[#F3A736] rounded-bl-xl" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-[3px] border-r-[3px] border-[#F3A736] rounded-br-xl" />
                <Image
                  src="/images/jmv/jmv-5.jpeg"
                  alt="Comunidad JMV"
                  fill
                  className="object-cover rounded-[1.5rem]"
                  priority
                />
              </div>
            </div>

            {/* Text content */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/logo/jmv-logo.jpg"
                  alt="JMV Logo"
                  width={80}
                  height={80}
                  className="rounded-2xl"
                />
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[#19168D]">
                Juventud Mariana Vicenciana
              </h1>
              <p className="mt-3 text-xl font-medium text-[#139FCC] sm:text-2xl">
                Republica Dominicana
              </p>
              <p className="max-w-lg mt-6 text-lg leading-relaxed text-gray-600">
                Una comunidad de jovenes comprometidos con la fe, el servicio y la transformacion social desde el carisma vicentino.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[#F3A736] hover:bg-[#e09520] text-white px-8 text-base font-semibold shadow-lg shadow-[#F3A736]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#F3A736]/30"
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
                  className="rounded-full border-[#19168D] text-[#19168D] hover:bg-[#19168D] hover:text-white px-8 text-base font-semibold transition-all duration-300"
                >
                  <Link href="/quienes-somos">
                    Conoce nuestra mision
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container px-6">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4 text-[#F3A736] border-[#F3A736]/40 bg-[#F3A736]/5 px-4 py-1.5 text-sm font-medium rounded-full">
              Nuestros Pilares
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl text-[#19168D]">
              Los cimientos de nuestra comunidad
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-500">
              Cuatro pilares fundamentales que guian nuestra mision y fortalecen nuestro caminar en la fe
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <Card
                  key={i}
                  className="relative overflow-hidden transition-all duration-300 border-0 shadow-md rounded-3xl bg-[#FFFBF5] hover:shadow-xl hover:-translate-y-1 group"
                >
                  {/* Bottom gradient border */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${pillar.color} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <div className={`flex items-center justify-center w-16 h-16 mb-6 rounded-full ${pillar.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-[#FFF8F0]">
        <div className="container px-6">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4 text-[#19168D] border-[#19168D]/30 bg-[#19168D]/5 px-4 py-1.5 text-sm font-medium rounded-full uppercase tracking-wider">
              Notas Distintivas
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl text-[#19168D]">
              Los valores que nos definen como comunidad de fe
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {values.map((value, i) => (
              <div
                key={i}
                className="group cursor-default"
              >
                <div className={`flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[3px] ${value.borderColor} bg-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                  <span className={`text-base sm:text-lg font-bold ${value.textColor}`}>
                    {value.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Activities Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container px-6">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4 text-[#139FCC] border-[#139FCC]/40 bg-[#139FCC]/5 px-4 py-1.5 text-sm font-medium rounded-full">
              Proximos Eventos
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl text-[#19168D]">
              Actividades y encuentros
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-500">
              Participa en nuestras proximas actividades y fortalece tu caminar en la fe
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {activities.map((activity, i) => (
              <Card
                key={i}
                className="overflow-hidden transition-all duration-300 border-0 shadow-md rounded-3xl bg-[#FFFBF5] hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute flex items-center gap-2 top-4 left-4">
                    <div className={`w-2.5 h-2.5 rounded-full ${activity.dotColor}`} />
                    <Badge className="text-xs font-medium text-white bg-black/40 border-0 backdrop-blur-sm rounded-full">
                      {activity.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {activity.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-500">
                    {activity.desc}
                  </p>
                  <div className="flex flex-col gap-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#F3A736]" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#F3A736]" />
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#F3A736]" />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[#19168D] hover:bg-[#120f6e] text-white px-8 text-base font-semibold transition-all duration-300"
            >
              <Link href="/eventos">
                Ver todos los eventos
                <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-28 bg-[#FFF8F0]">
        <div className="container px-6">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4 text-[#F3A736] border-[#F3A736]/40 bg-[#F3A736]/5 px-4 py-1.5 text-sm font-medium rounded-full">
              Contacto
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl text-[#19168D]">
              Somos familia
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-lg text-gray-500">
              Nos encantaria saber de ti. Contactanos o visitanos en persona.
            </p>
          </div>

          <div className="grid max-w-3xl gap-6 mx-auto sm:grid-cols-3">
            <Card className="overflow-hidden transition-all duration-300 border-0 shadow-md rounded-3xl bg-white hover:shadow-xl hover:-translate-y-1">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#19168D]/10">
                  <MapPin className="w-6 h-6 text-[#19168D]" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-gray-900">Ubicacion</h3>
                <p className="text-sm text-gray-500">Santo Domingo, Republica Dominicana</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all duration-300 border-0 shadow-md rounded-3xl bg-white hover:shadow-xl hover:-translate-y-1">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#139FCC]/10">
                  <Mail className="w-6 h-6 text-[#139FCC]" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-gray-900">Email</h3>
                <p className="text-sm text-gray-500">info@jmvrd.org</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all duration-300 border-0 shadow-md rounded-3xl bg-white hover:shadow-xl hover:-translate-y-1">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#F3A736]/10">
                  <Phone className="w-6 h-6 text-[#F3A736]" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-gray-900">Telefono</h3>
                <p className="text-sm text-gray-500">+1 (809) 123-4567</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[#F3A736] hover:bg-[#e09520] text-white px-10 text-base font-semibold shadow-lg shadow-[#F3A736]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#F3A736]/30"
            >
              <Link href="/unete">
                Unete a JMV
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
