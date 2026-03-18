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
    accent: "#139FCC",
  },
  {
    title: "Espiritualidad",
    description:
      "Oración y contemplación siguiendo el ejemplo de María y San Vicente",
    icon: Flame,
    color: "#139FCC",
    accent: "#F3A736",
  },
  {
    title: "Apostolado",
    description:
      "Compromiso con los más necesitados a través de obras de caridad",
    icon: HandHeart,
    color: "#F3A736",
    accent: "#19168D",
  },
  {
    title: "Formación",
    description:
      "Fraternidad y apoyo mutuo en el camino de fe y servicio",
    icon: GraduationCap,
    color: "#19168D",
    accent: "#139FCC",
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

export function HomePageV11() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Diagonal color block */}
        <div
          className="absolute inset-0"
          style={{
            background: "#EEF2FF",
            clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 100%)",
          }}
        />
        {/* White base */}
        <div className="absolute inset-0 bg-white" style={{ zIndex: 0 }} />
        {/* Diagonal overlay on top */}
        <div
          className="absolute inset-0"
          style={{
            background: "#EEF2FF",
            clipPath: "polygon(45% 0, 100% 0, 100% 85%, 45% 100%)",
            zIndex: 1,
          }}
        />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[70vh]">
            {/* Left — Text */}
            <div className="flex flex-col justify-center space-y-8">
              <Image
                src="/logo/jmv-logo.jpg"
                alt="JMV Logo"
                width={80}
                height={80}
                className="rounded-2xl"
              />
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight" style={{ color: "#19168D" }}>
                  Juventud
                  <br />
                  Mariana
                  <br />
                  Vicenciana
                </h1>
                <p className="text-2xl sm:text-3xl font-semibold" style={{ color: "#F3A736" }}>
                  República Dominicana
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
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

            {/* Right — Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div
                className="relative w-full max-w-[500px] h-[400px] sm:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "20px 20px 60px rgba(25, 22, 141, 0.15), -5px -5px 20px rgba(255,255,255,0.8)",
                }}
              >
                <Image
                  src="/images/jmv/jmv-4.jpeg"
                  alt="Jóvenes JMV"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative diagonal accent */}
              <div
                className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl"
                style={{ backgroundColor: "#F3A736", opacity: 0.6 }}
              />
              <div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-lg"
                style={{ backgroundColor: "#139FCC", opacity: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-sm font-medium" style={{ color: "#19168D" }}>Descubre más</span>
          <ChevronDown className="h-5 w-5" style={{ color: "#19168D" }} />
        </div>
      </section>

      {/* ============ PILLARS ============ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-20">
            <Badge
              className="mb-4 text-sm px-4 py-1.5 rounded-full font-medium"
              style={{ backgroundColor: "#EEF2FF", color: "#19168D" }}
            >
              Nuestros Pilares
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "#19168D" }}>
              Cuatro columnas de nuestra fe
            </h2>
          </div>

          <div className="space-y-12 md:space-y-16">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              const isEven = i % 2 === 0
              const num = String(i + 1).padStart(2, "0")

              return (
                <div
                  key={pillar.title}
                  className={`relative group flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Watermark number */}
                  <span
                    className="absolute top-0 text-[120px] md:text-[180px] font-black leading-none select-none pointer-events-none"
                    style={{
                      color: "#139FCC",
                      opacity: 0.06,
                      left: isEven ? "0" : "auto",
                      right: isEven ? "auto" : "0",
                    }}
                  >
                    {num}
                  </span>

                  {/* Diagonal accent stripe */}
                  <div
                    className="hidden md:block w-2 group-hover:w-5 transition-all duration-500 rounded-full self-stretch"
                    style={{
                      backgroundColor: pillar.color,
                      transform: "skewX(-3deg)",
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="relative z-10 flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${pillar.color}12` }}
                  >
                    <Icon className="h-9 w-9" style={{ color: pillar.color }} />
                  </div>

                  {/* Content */}
                  <div className={`relative z-10 flex-1 ${isEven ? "text-left" : "md:text-right"}`}>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "#19168D" }}>
                      {pillar.title}
                    </h3>
                    <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#EEF2FF",
            clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
          }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
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

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-8 md:gap-12">
            {values.map((value) => (
              <div key={value.name} className="flex flex-col items-center group">
                <div
                  className="w-12 h-1.5 rounded-full mb-5 group-hover:w-20 transition-all duration-500"
                  style={{ backgroundColor: value.color }}
                />
                <span
                  className="text-2xl md:text-3xl lg:text-4xl font-bold"
                  style={{ color: "#19168D" }}
                >
                  {value.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <TestimonialsSection />

      {/* ============ ACTIVITIES ============ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#FAFBFD" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <Badge
              className="mb-4 text-sm px-4 py-1.5 rounded-full font-medium"
              style={{ backgroundColor: "#EEF2FF", color: "#19168D" }}
            >
              Próximos Eventos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "#19168D" }}>
              Actividades que transforman
            </h2>
          </div>

          <div className="space-y-16">
            {activities.map((activity, i) => {
              const isEven = i % 2 === 0
              return (
                <div
                  key={activity.title}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Image */}
                  <div className="w-full md:w-[55%] relative">
                    <div className="relative h-[280px] sm:h-[340px] md:h-[380px] rounded-2xl overflow-hidden">
                      <Image
                        src={activity.image}
                        alt={activity.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Diagonal divider (visible on md+) */}
                  <div
                    className="hidden md:block w-16 h-[380px] -mx-8 relative z-10"
                    style={{
                      background: isEven
                        ? "linear-gradient(to right, transparent, #FAFBFD)"
                        : "linear-gradient(to left, transparent, #FAFBFD)",
                    }}
                  />

                  {/* Content */}
                  <div className={`flex-1 space-y-4 ${isEven ? "md:pl-4" : "md:pr-4"}`}>
                    <Badge
                      className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{ backgroundColor: "#139FCC", color: "white" }}
                    >
                      {activity.type}
                    </Badge>
                    <div className="flex items-center gap-3 text-sm" style={{ color: "#139FCC" }}>
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">{activity.date}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{activity.time}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold" style={{ color: "#19168D" }}>
                      {activity.title}
                    </h3>
                    <p className="text-gray-500 text-lg leading-relaxed">{activity.desc}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </div>
              )
            })}
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

      {/* ============ CONTACT ============ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl">
            {/* Left — Map placeholder with angled edge */}
            <div
              className="relative flex flex-col items-center justify-center p-12 md:p-16 min-h-[350px]"
              style={{ backgroundColor: "#EEF2FF" }}
            >
              {/* Angled right edge overlay (visible on md+) */}
              <div
                className="hidden md:block absolute top-0 right-0 w-16 h-full bg-white"
                style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%, 100% 0)" }}
              />
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: "white" }}
              >
                <MapPin className="h-10 w-10" style={{ color: "#19168D" }} />
              </div>
              <p className="text-xl font-bold text-center" style={{ color: "#19168D" }}>
                Santo Domingo
              </p>
              <p className="text-gray-500 text-center">República Dominicana</p>
            </div>

            {/* Right — Contact info */}
            <div className="bg-white p-12 md:p-16 flex flex-col justify-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#19168D" }}>
                Contáctanos
              </h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#EEF2FF" }}
                  >
                    <MapPin className="h-5 w-5" style={{ color: "#19168D" }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Ubicación</p>
                    <p className="font-semibold" style={{ color: "#19168D" }}>
                      Santo Domingo, República Dominicana
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#EEF2FF" }}
                  >
                    <Mail className="h-5 w-5" style={{ color: "#139FCC" }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Email</p>
                    <p className="font-semibold" style={{ color: "#19168D" }}>info@jmvrd.org</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#EEF2FF" }}
                  >
                    <Phone className="h-5 w-5" style={{ color: "#F3A736" }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Teléfono</p>
                    <p className="font-semibold" style={{ color: "#19168D" }}>+1 (809) 123-4567</p>
                  </div>
                </div>
              </div>

              <Link href="/unete">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: "#F3A736", color: "white" }}
                >
                  Únete a JMV
                  <ArrowUpRight className="ml-2 h-5 w-5" />
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
