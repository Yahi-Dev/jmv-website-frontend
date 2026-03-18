"use client"

import Navbar from "@/src/components/Navbar"
import { TestimonialsSection } from "@/src/features/testimonios/components/TestimonialsSection"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  BookOpen,
  Heart,
  Users,
  Sparkles,
  Cross,
  Church,
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

export function HomePageV1() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/jmv/jmv-1.jpeg"
          alt="JMV Comunidad"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo/jmv-logo.jpg"
              alt="JMV Logo"
              width={80}
              height={80}
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div
            className="w-24 h-1 mx-auto mb-8 rounded-full"
            style={{ backgroundColor: "#F3A736" }}
          />
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
            Juventud Mariana
            <br />
            Vicenciana
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-white/80 mb-2 italic">
            Republica Dominicana
          </p>
          <div
            className="w-24 h-1 mx-auto mt-6 mb-10 rounded-full"
            style={{ backgroundColor: "#F3A736" }}
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-8 py-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
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
              className="text-base font-semibold px-8 py-6 rounded-lg border-2 bg-transparent hover:bg-white/10 transition-all duration-300"
              style={{ borderColor: "#F3A736", color: "#F3A736" }}
            >
              <Link href="/quienes-somos">Conoce nuestra mision</Link>
            </Button>
          </div>
        </div>
        {/* Decorative bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
            <path d="M0,60 L0,20 Q720,0 1440,20 L1440,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== PILLARS SECTION ===== */}
      <section className="relative z-20 -mt-16 pb-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const borderColor = i % 2 === 0 ? "#19168D" : "#139FCC"
            return (
              <Card
                key={pillar.title}
                className="group relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-xl border-0"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 rounded-t-xl"
                  style={{ backgroundColor: borderColor }}
                />
                <CardContent className="pt-8 pb-6 px-6 text-center">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center shadow-md"
                    style={{ backgroundColor: "#F3A736" }}
                  >
                    <pillar.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-serif text-lg font-bold mb-3 text-gray-900">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* ===== VALUES SECTION ===== */}
      <section className="py-24 px-4" style={{ backgroundColor: "#19168D" }}>
        <div className="max-w-5xl mx-auto text-center">
          <p
            className="text-sm font-bold tracking-[0.3em] uppercase mb-4"
            style={{ color: "#F3A736" }}
          >
            Notas Distintivas
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Los valores que nos definen
            <br className="hidden sm:block" />
            como comunidad de fe
          </h2>
          <div
            className="w-16 h-1 mx-auto mb-16 rounded-full"
            style={{ backgroundColor: "#F3A736" }}
          />
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 sm:gap-x-6 md:gap-x-8">
            {values.map((value, i) => (
              <div key={value} className="flex items-center gap-4 sm:gap-6 md:gap-8">
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
                  {value}
                </span>
                {i < values.length - 1 && (
                  <Cross
                    className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0"
                    style={{ color: "#F3A736" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== ACTIVITIES SECTION ===== */}
      <section className="py-24 px-4" style={{ backgroundColor: "#FFFBF5" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm font-bold tracking-[0.3em] uppercase mb-4"
              style={{ color: "#F3A736" }}
            >
              Proximos Eventos
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
              Actividades y encuentros
            </h2>
          </div>
          <div className="space-y-6">
            {activities.map((act) => (
              <Card
                key={act.title}
                className="group overflow-hidden bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl"
              >
                <div className="flex">
                  <div
                    className="w-1.5 flex-shrink-0 rounded-l-xl"
                    style={{ backgroundColor: "#F3A736" }}
                  />
                  <CardContent className="flex-1 p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full text-white"
                            style={{ backgroundColor: "#139FCC" }}
                          >
                            {act.type}
                          </span>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 group-hover:text-[#19168D] transition-colors">
                          {act.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {act.desc}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 text-sm text-gray-500 md:text-right md:min-w-[160px] flex-shrink-0">
                        <span className="flex items-center md:justify-end gap-2">
                          <Calendar className="h-4 w-4" style={{ color: "#F3A736" }} />
                          {act.date}
                        </span>
                        <span className="flex items-center md:justify-end gap-2">
                          <Clock className="h-4 w-4" style={{ color: "#F3A736" }} />
                          {act.time}
                        </span>
                        <span className="flex items-center md:justify-end gap-2">
                          <MapPin className="h-4 w-4" style={{ color: "#F3A736" }} />
                          {act.location}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: "#19168D" }}
            >
              <Link href="/eventos">
                Ver todos los eventos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section
        className="relative py-24 px-4 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #19168D 0%, #139FCC 100%)",
        }}
      >
        {/* Decorative stained glass pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: "#F3A736" }}
          />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: "#19168D" }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Church className="h-12 w-12 mx-auto mb-6 text-white/60" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Se parte de nuestra comunidad
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
            Unete a la Juventud Mariana Vicenciana y vive tu fe con alegria y compromiso
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14">
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(243, 167, 54, 0.2)" }}
              >
                <MapPin className="h-6 w-6" style={{ color: "#F3A736" }} />
              </div>
              <span className="text-white text-sm">
                Santo Domingo, Republica Dominicana
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(243, 167, 54, 0.2)" }}
              >
                <Mail className="h-6 w-6" style={{ color: "#F3A736" }} />
              </div>
              <a
                href="mailto:info@jmvrd.org"
                className="text-white text-sm hover:underline"
              >
                info@jmvrd.org
              </a>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(243, 167, 54, 0.2)" }}
              >
                <Phone className="h-6 w-6" style={{ color: "#F3A736" }} />
              </div>
              <a
                href="tel:+18091234567"
                className="text-white text-sm hover:underline"
              >
                +1 (809) 123-4567
              </a>
            </div>
          </div>
          <Button
            asChild
            size="lg"
            className="text-base font-bold px-10 py-6 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: "#F3A736", color: "#19168D" }}
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
