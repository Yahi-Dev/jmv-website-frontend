"use client"

import Navbar from "@/src/components/Navbar"
import { TestimonialsSection } from "@/src/features/testimonios/components/TestimonialsSection"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  ChevronDown,
  Users,
  Flame,
  HandHeart,
  GraduationCap,
} from "lucide-react"

const pillars = [
  {
    number: "01",
    title: "Comunidad Juvenil",
    description:
      "Crecimiento espiritual y humano a trav\u00e9s de la catequesis y el liderazgo cristiano",
    icon: Users,
  },
  {
    number: "02",
    title: "Espiritualidad",
    description:
      "Oraci\u00f3n y contemplaci\u00f3n siguiendo el ejemplo de Mar\u00eda y San Vicente",
    icon: Flame,
  },
  {
    number: "03",
    title: "Apostolado",
    description:
      "Compromiso con los m\u00e1s necesitados a trav\u00e9s de obras de caridad",
    icon: HandHeart,
  },
  {
    number: "04",
    title: "Formaci\u00f3n",
    description:
      "Fraternidad y apoyo mutuo en el camino de fe y servicio",
    icon: GraduationCap,
  },
]

const values = [
  { name: "Eclesial", description: "Arraigados en la Iglesia Cat\u00f3lica" },
  { name: "Laical", description: "Compromiso activo del laicado" },
  { name: "Mariana", description: "Devoci\u00f3n a la Virgen Mar\u00eda" },
  { name: "Misionera", description: "Llamados a evangelizar" },
  { name: "Vicentina", description: "Espiritualidad vicenciana" },
]

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

export function HomePageV7() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* HERO - Full viewport cinematic */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/jmv/jmv-7.jpeg"
            alt="JMV"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
        </div>

        <div className="relative z-10 px-6 pb-24 md:px-12 lg:px-24 xl:px-32">
          <div className="flex items-center gap-5 mb-8">
            <Image
              src="/logo/jmv-logo.jpg"
              alt="JMV Logo"
              width={80}
              height={80}
              className="rounded-2xl shadow-2xl"
            />
            <div className="h-16 w-px bg-[#F3A736]/50" />
            <span className="text-[#F3A736] text-sm tracking-[0.3em] uppercase font-medium">
              {"Rep\u00fablica Dominicana"}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight mb-8">
            <span className="block">Juventud</span>
            <span className="block text-[#F3A736]">Mariana</span>
            <span className="block">Vicenciana</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/unete">
              <Button
                size="lg"
                className="bg-[#F3A736] hover:bg-[#F3A736]/90 text-black font-semibold text-lg px-8 py-6 rounded-none transition-all duration-300 hover:translate-x-1"
              >
                {"\u00danete a JMV"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/quienes-somos">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-medium text-lg px-8 py-6 rounded-none transition-all duration-300"
              >
                {"Conoce nuestra misi\u00f3n"}
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs tracking-[0.2em] uppercase text-white/40">Scroll</span>
          <ChevronDown className="h-5 w-5 text-white/40" />
        </div>
      </section>

      {/* PILLARS - Film credits aesthetic */}
      <section className="bg-black py-20 md:py-32">
        <div className="px-6 md:px-12 lg:px-24 xl:px-32">
          <p className="text-[#F3A736] text-sm tracking-[0.3em] uppercase mb-4">
            Nuestros Pilares
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-20 max-w-2xl">
            Los fundamentos de nuestra comunidad
          </h2>

          <div className="space-y-0">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="group border-t border-white/10 py-10 md:py-16 transition-colors duration-500 hover:bg-white/[0.02]"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16">
                  <span className="text-[#F3A736] text-5xl md:text-7xl font-bold opacity-40 group-hover:opacity-100 transition-opacity duration-500 font-mono">
                    {pillar.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-4xl font-bold mb-4 group-hover:text-[#F3A736] transition-colors duration-500">
                      {pillar.title}
                    </h3>
                    <p className="text-white/50 text-lg md:text-xl max-w-xl group-hover:text-white/70 transition-colors duration-500">
                      {pillar.description}
                    </p>
                  </div>
                  <pillar.icon className="h-10 w-10 text-white/10 group-hover:text-[#F3A736]/60 transition-all duration-500 hidden md:block" />
                </div>
              </div>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      {/* VALUES - Parallax backdrop with blur cards */}
      <section
        className="relative min-h-screen flex items-center justify-center py-20 md:py-32"
        style={{
          backgroundImage: "url('/images/jmv/jmv-10.jpeg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 px-6 md:px-12 lg:px-24 xl:px-32 w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#F3A736] text-sm tracking-[0.3em] uppercase mb-4">
              Notas Distintivas
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Los valores que nos definen
              <br />
              <span className="text-[#F3A736]">como comunidad de fe</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((value, i) => (
              <div
                key={i}
                className={`group backdrop-blur-xl bg-white/5 border border-white/10 p-8 md:p-10 transition-all duration-500 hover:bg-white/10 hover:border-[#F3A736]/30 hover:scale-[1.02] ${
                  i === 3 ? "sm:col-span-1 lg:col-start-1" : ""
                } ${i === 4 ? "sm:col-span-1 lg:col-start-2" : ""}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#F3A736] group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-white/30 text-sm font-mono">0{i + 1}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold group-hover:text-[#F3A736] transition-colors duration-500">
                  {value.name}
                </h3>
                <p className="text-white/40 mt-3 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* ACTIVITIES - Dark cinema cards */}
      <section className="bg-[#19168D] py-20 md:py-32">
        <div className="px-6 md:px-12 lg:px-24 xl:px-32 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p className="text-[#F3A736] text-sm tracking-[0.3em] uppercase mb-4">
                Calendario
              </p>
              <h2 className="text-3xl md:text-5xl font-bold">
                {"Pr\u00f3ximos Eventos"}
              </h2>
            </div>
            <Link href="/eventos" className="mt-6 md:mt-0">
              <Button
                variant="outline"
                className="border-[#F3A736]/30 text-[#F3A736] hover:bg-[#F3A736]/10 rounded-none px-6 py-5 transition-all duration-300 hover:border-[#F3A736]"
              >
                Ver todos los eventos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.map((activity, i) => (
              <div
                key={i}
                className="group relative bg-white/5 border border-white/10 p-8 transition-all duration-500 hover:bg-white/10 hover:border-[#F3A736]/30 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(243,167,54,0.1)]"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#F3A736] text-xs tracking-[0.2em] uppercase font-medium px-3 py-1 border border-[#F3A736]/30 rounded-full">
                    {activity.type}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>{activity.date}</span>
                  <span className="mx-2 text-white/20">|</span>
                  <Clock className="h-4 w-4" />
                  <span>{activity.time}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-[#F3A736] transition-colors duration-500">
                  {activity.title}
                </h3>

                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                  {activity.desc}
                </p>

                <div className="flex items-center gap-2 text-white/30 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{activity.location}</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F3A736]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - Dramatic split */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full">
          <Image
            src="/images/jmv/jmv-3.jpeg"
            alt="JMV Comunidad"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/80 to-black" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 xl:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="md:ml-auto md:w-1/2 lg:w-5/12">
              <p className="text-[#F3A736] text-sm tracking-[0.3em] uppercase mb-6">
                Contacto
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight">
                {"Escr\u00edbenos"}
              </h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-center gap-5">
                  <MapPin className="h-5 w-5 text-[#F3A736] flex-shrink-0" />
                  <span className="text-white/70 text-lg">
                    {"Santo Domingo, Rep\u00fablica Dominicana"}
                  </span>
                </div>
                <div className="flex items-center gap-5">
                  <Mail className="h-5 w-5 text-[#F3A736] flex-shrink-0" />
                  <a
                    href="mailto:info@jmvrd.org"
                    className="text-white/70 text-lg hover:text-[#F3A736] transition-colors duration-300"
                  >
                    info@jmvrd.org
                  </a>
                </div>
                <div className="flex items-center gap-5">
                  <Phone className="h-5 w-5 text-[#F3A736] flex-shrink-0" />
                  <a
                    href="tel:+18091234567"
                    className="text-white/70 text-lg hover:text-[#F3A736] transition-colors duration-300"
                  >
                    +1 (809) 123-4567
                  </a>
                </div>
              </div>

              <Link href="/unete">
                <Button
                  size="lg"
                  className="bg-[#F3A736] hover:bg-[#F3A736]/90 text-black font-semibold text-lg px-10 py-6 rounded-none transition-all duration-300 hover:translate-x-1"
                >
                  {"\u00danete a JMV"}
                  <ArrowRight className="ml-2 h-5 w-5" />
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
