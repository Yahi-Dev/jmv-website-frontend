"use client"

import Navbar from "@/src/components/Navbar"
import { TestimonialsSection } from "@/src/features/testimonios/components/TestimonialsSection"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Button } from "@/src/components/ui/button"
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
  ChevronDown,
  ArrowUpRight,
} from "lucide-react"

const pillars = [
  {
    title: "Comunidad Juvenil",
    description:
      "Crecimiento espiritual y humano a través de la catequesis y el liderazgo cristiano",
    icon: Users,
    color: "#19168D",
  },
  {
    title: "Espiritualidad",
    description:
      "Oración y contemplación siguiendo el ejemplo de María y San Vicente",
    icon: Flame,
    color: "#139FCC",
  },
  {
    title: "Apostolado",
    description:
      "Compromiso con los más necesitados a través de obras de caridad",
    icon: HandHeart,
    color: "#F3A736",
  },
  {
    title: "Formación",
    description:
      "Fraternidad y apoyo mutuo en el camino de fe y servicio",
    icon: GraduationCap,
    color: "#19168D",
  },
]

const values = [
  { name: "Eclesial", color: "#19168D" },
  { name: "Laical", color: "#139FCC" },
  { name: "Mariana", color: "#F3A736" },
  { name: "Misionera", color: "#19168D" },
  { name: "Vicentina", color: "#139FCC" },
]

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

export function HomePageV12() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background image — top portion */}
        <div className="relative w-full h-[55vh] sm:h-[60vh]">
          <Image
            src="/images/jmv/jmv-1.jpeg"
            alt="Juventud Mariana Vicenciana"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/40" />
          {/* Gradient fade to white */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/90 to-transparent" />
        </div>

        {/* Content overlapping the fade */}
        <div className="relative -mt-32 sm:-mt-40 z-10 flex-1 flex flex-col items-center justify-start px-6 pb-20">
          {/* Logo with white ring */}
          <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center mb-8 ring-4 ring-white">
            <Image
              src="/logo/jmv-logo.jpg"
              alt="JMV Logo"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-center leading-[0.95] tracking-tight"
            style={{ color: "#19168D" }}
          >
            Juventud
            <br />
            Mariana
            <br />
            Vicenciana
          </h1>

          <p
            className="mt-6 text-xl sm:text-2xl md:text-3xl font-semibold text-center"
            style={{ color: "#139FCC" }}
          >
            República Dominicana
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link href="/unete">
              <Button
                size="lg"
                className="text-base px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: "#F3A736", color: "white" }}
              >
                Únete a JMV
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/quienes-somos">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 rounded-xl font-semibold transition-all"
                style={{ borderColor: "#19168D", color: "#19168D" }}
              >
                Conoce nuestra misión
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <ChevronDown className="h-6 w-6" style={{ color: "#19168D" }} />
        </div>
      </section>

      {/* ============ PILLARS — Floating Staggered Cards ============ */}
      <section className="py-24 md:py-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-20">
            <Badge
              className="mb-4 text-sm px-4 py-1.5 rounded-full font-medium"
              style={{ backgroundColor: "#EEF2FF", color: "#19168D" }}
            >
              Nuestros Pilares
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: "#19168D" }}>
              Cuatro columnas de nuestra fe
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              const num = String(i + 1).padStart(2, "0")
              // Stagger: odd cards pushed down
              const staggerClass = i % 2 === 1 ? "sm:mt-12" : ""

              return (
                <div
                  key={pillar.title}
                  className={`group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${staggerClass}`}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl"
                    style={{ backgroundColor: pillar.color }}
                  />

                  {/* Number watermark */}
                  <span
                    className="absolute top-4 right-6 text-6xl font-black select-none pointer-events-none"
                    style={{ color: pillar.color, opacity: 0.07 }}
                  >
                    {num}
                  </span>

                  {/* Icon */}
                  <div
                    className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${pillar.color}10` }}
                  >
                    <Icon className="h-8 w-8" style={{ color: pillar.color }} />
                  </div>

                  <h3 className="text-xl font-bold mb-3 relative z-10" style={{ color: "#19168D" }}>
                    {pillar.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed relative z-10">
                    {pillar.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ VALUES — Tall Portrait Cards ============ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#FFFBF5" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <p
              className="text-sm font-bold tracking-[0.25em] uppercase mb-4"
              style={{ color: "#F3A736" }}
            >
              Notas Distintivas
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#19168D" }}>
              Los valores que nos definen como comunidad de fe
            </h2>
          </div>

          {/* Horizontal scroll on mobile, flex row on desktop */}
          <div className="flex gap-6 overflow-x-auto pb-4 sm:overflow-visible sm:flex-wrap sm:justify-center lg:flex-nowrap lg:justify-between scrollbar-hide">
            {values.map((value) => (
              <div
                key={value.name}
                className="group flex-shrink-0 w-40 sm:w-44 lg:w-auto lg:flex-1 bg-white rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-end min-h-[200px] sm:min-h-[240px] hover:-translate-y-3 hover:shadow-xl transition-all duration-500 cursor-default"
                style={{
                  boxShadow: "0 4px 20px rgba(25,22,141,0.05)",
                }}
              >
                <span
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-center"
                  style={{ color: "#19168D" }}
                >
                  {value.name}
                </span>
                <div
                  className="w-12 h-1 rounded-full mt-5 group-hover:w-20 transition-all duration-500"
                  style={{ backgroundColor: "#F3A736" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <TestimonialsSection />

      {/* ============ ACTIVITIES — Bento/Masonry Grid ============ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <Badge
              className="mb-4 text-sm px-4 py-1.5 rounded-full font-medium"
              style={{ backgroundColor: "#EEF2FF", color: "#19168D" }}
            >
              Próximos Eventos
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: "#19168D" }}>
              Actividades que transforman
            </h2>
          </div>

          {/* Bento grid: first card large, second and third stacked */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Large card */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 md:row-span-2">
              <div className="relative h-[280px] sm:h-[340px] md:h-[55%]">
                <Image
                  src={activities[0].image}
                  alt={activities[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
              </div>
              <div className="p-8 space-y-4">
                <Badge
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{ backgroundColor: "#139FCC", color: "white" }}
                >
                  {activities[0].type}
                </Badge>
                <div className="flex items-center gap-3 text-sm" style={{ color: "#139FCC" }}>
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">{activities[0].date}</span>
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{activities[0].time}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold" style={{ color: "#19168D" }}>
                  {activities[0].title}
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed">{activities[0].desc}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>{activities[0].location}</span>
                </div>
              </div>
            </div>

            {/* Stacked smaller cards */}
            {activities.slice(1).map((activity) => (
              <div
                key={activity.title}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-[200px] sm:h-[220px]">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge
                      className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{ backgroundColor: "#139FCC", color: "white" }}
                    >
                      {activity.type}
                    </Badge>
                    <span className="text-sm font-medium" style={{ color: "#139FCC" }}>
                      {activity.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: "#19168D" }}>
                    {activity.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{activity.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/eventos">
              <Button
                size="lg"
                className="text-base px-8 py-6 rounded-xl font-semibold"
                style={{ backgroundColor: "#19168D", color: "white" }}
              >
                Ver todos los eventos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CONTACT — Floating Card ============ */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#F5F6FA" }}>
        {/* Decorative circles */}
        <div
          className="absolute top-20 left-10 w-64 h-64 rounded-full"
          style={{ backgroundColor: "rgba(19,159,204,0.04)" }}
        />
        <div
          className="absolute bottom-10 right-20 w-96 h-96 rounded-full"
          style={{ backgroundColor: "rgba(243,167,54,0.04)" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full"
          style={{ backgroundColor: "rgba(25,22,141,0.03)" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12">
          <div
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ borderTop: "4px solid #F3A736" }}
          >
            <div className="p-10 md:p-16 space-y-10">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#19168D" }}>
                  Contáctanos
                </h2>
                <p className="text-gray-500 text-lg">
                  Estamos para servirte y acompañarte en tu camino de fe
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#EEF2FF" }}
                  >
                    <MapPin className="h-6 w-6" style={{ color: "#19168D" }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Ubicación</p>
                    <p className="text-lg font-semibold" style={{ color: "#19168D" }}>
                      Santo Domingo, República Dominicana
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#EEF2FF" }}
                  >
                    <Mail className="h-6 w-6" style={{ color: "#139FCC" }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Email</p>
                    <p className="text-lg font-semibold" style={{ color: "#19168D" }}>info@jmvrd.org</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#EEF2FF" }}
                  >
                    <Phone className="h-6 w-6" style={{ color: "#F3A736" }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Teléfono</p>
                    <p className="text-lg font-semibold" style={{ color: "#19168D" }}>+1 (809) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <Link href="/unete">
                  <Button
                    size="lg"
                    className="text-base px-10 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    style={{ backgroundColor: "#F3A736", color: "white" }}
                  >
                    Únete a JMV
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
