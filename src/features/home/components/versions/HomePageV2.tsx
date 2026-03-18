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
  Sparkles,
  HandHeart,
  GraduationCap,
} from "lucide-react"

const pillars = [
  {
    title: "Comunidad Juvenil",
    description:
      "Crecimiento espiritual y humano a traves de la catequesis y el liderazgo cristiano",
    icon: Users,
  },
  {
    title: "Espiritualidad",
    description:
      "Oracion y contemplacion siguiendo el ejemplo de Maria y San Vicente",
    icon: Sparkles,
  },
  {
    title: "Apostolado",
    description:
      "Compromiso con los mas necesitados a traves de obras de caridad",
    icon: HandHeart,
  },
  {
    title: "Formacion",
    description:
      "Fraternidad y apoyo mutuo en el camino de fe y servicio",
    icon: GraduationCap,
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

export function HomePageV2() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ===== HERO SECTION — Split Layout ===== */}
      <section className="pt-8 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text (60%) */}
          <div className="flex-1 lg:max-w-[60%] text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-8">
              <Image
                src="/logo/jmv-logo.jpg"
                alt="JMV Logo"
                width={80}
                height={80}
                className="rounded-2xl"
              />
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4"
              style={{ color: "#19168D" }}
            >
              Juventud Mariana
              <br />
              Vicenciana
            </h1>
            <p
              className="text-lg sm:text-xl font-medium mb-8"
              style={{ color: "#139FCC" }}
            >
              Republica Dominicana
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="text-base font-semibold px-8 py-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: "#19168D" }}
              >
                <Link href="/unete">
                  Unete a JMV
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base font-semibold px-8 py-6 rounded-full border-2 transition-all duration-300 hover:bg-gray-50"
                style={{ borderColor: "#19168D", color: "#19168D" }}
              >
                <Link href="/quienes-somos">Conoce nuestra mision</Link>
              </Button>
            </div>
          </div>
          {/* Right: Image (40%) */}
          <div className="w-full lg:max-w-[40%] aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/jmv/jmv-2.jpeg"
              alt="JMV Comunidad"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ===== PILLARS SECTION — Horizontal Rows ===== */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <p
            className="text-xs font-bold tracking-[0.3em] uppercase mb-3 text-center"
            style={{ color: "#139FCC" }}
          >
            Nuestros Pilares
          </p>
          <h2
            className="text-2xl sm:text-3xl font-bold text-center mb-16"
            style={{ color: "#19168D" }}
          >
            Lo que nos define
          </h2>
          <div className="space-y-0">
            {pillars.map((pillar, i) => (
              <div key={pillar.title}>
                <div className="flex items-start gap-6 py-8 group">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: "#19168D" }}
                  >
                    <pillar.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-lg font-bold mb-1"
                      style={{ color: "#19168D" }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
                {i < pillars.length - 1 && (
                  <div className="h-px bg-gray-100" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES SECTION — Pill Badges ===== */}
      <section className="py-20 sm:py-24 px-4" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
            style={{ color: "#139FCC" }}
          >
            Notas Distintivas
          </p>
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "#19168D" }}
          >
            Los valores que nos definen como comunidad de fe
          </h2>
          <div className="w-12 h-0.5 mx-auto mb-14 rounded-full bg-gray-300" />
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {values.map((value) => (
              <span
                key={value}
                className="px-6 py-3 rounded-full text-sm sm:text-base font-semibold text-white transition-transform duration-300 hover:scale-105 cursor-default"
                style={{ backgroundColor: "#19168D" }}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== ACTIVITIES SECTION — Minimal Cards ===== */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
              style={{ color: "#139FCC" }}
            >
              Calendario
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: "#19168D" }}
            >
              Proximos eventos
            </h2>
          </div>
          <div className="space-y-4">
            {activities.map((act) => (
              <div
                key={act.title}
                className="group flex flex-col sm:flex-row border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-all duration-300"
              >
                {/* Date block */}
                <div
                  className="sm:w-36 flex-shrink-0 flex flex-col items-center justify-center py-4 sm:py-6 px-4"
                  style={{ backgroundColor: "#F8F9FA" }}
                >
                  <Calendar
                    className="h-5 w-5 mb-2"
                    style={{ color: "#19168D" }}
                  />
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#19168D" }}
                  >
                    {act.date}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">{act.time}</span>
                </div>
                {/* Content */}
                <div className="flex-1 p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium rounded-full px-3"
                      style={{ backgroundColor: "#E8F7FC", color: "#139FCC" }}
                    >
                      {act.type}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="h-3 w-3" />
                      {act.location}
                    </span>
                  </div>
                  <h3
                    className="text-base font-bold mb-1 group-hover:text-[#19168D] transition-colors"
                  >
                    {act.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {act.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base font-semibold px-8 py-6 rounded-full border-2 transition-all duration-300 hover:bg-gray-50"
              style={{ borderColor: "#19168D", color: "#19168D" }}
            >
              <Link href="/eventos">
                Ver todos los eventos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION — Centered Minimal ===== */}
      <section className="py-24 sm:py-32 px-4" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "#19168D" }}
          >
            Contactanos
          </h2>
          <p className="text-gray-500 text-base mb-16 max-w-lg mx-auto">
            Unete a la Juventud Mariana Vicenciana y vive tu fe con alegria y compromiso
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col items-center gap-4">
              <MapPin className="h-6 w-6" style={{ color: "#19168D" }} />
              <span className="text-sm text-gray-600">
                Santo Domingo,
                <br />
                Republica Dominicana
              </span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Mail className="h-6 w-6" style={{ color: "#19168D" }} />
              <a
                href="mailto:info@jmvrd.org"
                className="text-sm text-gray-600 hover:text-[#19168D] transition-colors"
              >
                info@jmvrd.org
              </a>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Phone className="h-6 w-6" style={{ color: "#19168D" }} />
              <a
                href="tel:+18091234567"
                className="text-sm text-gray-600 hover:text-[#19168D] transition-colors"
              >
                +1 (809) 123-4567
              </a>
            </div>
          </div>
          <Button
            asChild
            size="lg"
            className="text-base font-semibold px-10 py-6 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: "#F3A736", color: "white" }}
          >
            <Link href="/unete">
              Unete a JMV
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
