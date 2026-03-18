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

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    icon: Users,
    title: "Comunidad Juvenil",
    description:
      "Crecimiento espiritual y humano a través de la catequesis y el liderazgo cristiano",
    color: "#19168D",
    glowColor: "rgba(25,22,141,0.15)",
  },
  {
    icon: Heart,
    title: "Espiritualidad",
    description:
      "Oración y contemplación siguiendo el ejemplo de María y San Vicente",
    color: "#139FCC",
    glowColor: "rgba(19,159,204,0.15)",
  },
  {
    icon: HandHeart,
    title: "Apostolado",
    description:
      "Compromiso con los más necesitados a través de obras de caridad",
    color: "#F3A736",
    glowColor: "rgba(243,167,54,0.15)",
  },
  {
    icon: BookOpen,
    title: "Formación",
    description:
      "Fraternidad y apoyo mutuo en el camino de fe y servicio",
    color: "#19168D",
    glowColor: "rgba(25,22,141,0.15)",
  },
]

const values = ["Eclesial", "Laical", "Mariana", "Misionera", "Vicentina"]

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
  },
  {
    title: "Misión de Verano",
    date: "22 Dic 2024",
    type: "Misión",
    location: "Monte Plata",
    time: "7:00 AM",
    description:
      "Experiencia misionera de servicio a comunidades rurales necesitadas",
    image: "/images/jmv/jmv-8.jpeg",
  },
  {
    title: "Vigilia Mariana",
    date: "28 Dic 2024",
    type: "Espiritualidad",
    location: "Santiago",
    time: "8:00 PM",
    description:
      "Noche de oración y reflexión en honor a la Virgen María",
    image: "/images/jmv/jmv-10.jpeg",
  },
]

/* ------------------------------------------------------------------ */
/*  Decorative dots component                                          */
/* ------------------------------------------------------------------ */

function DecorativeDots() {
  return (
    <div className="flex items-center justify-center gap-0 my-6">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#19168D]/30" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#19168D] mx-1" />
      <div className="h-px w-6 bg-gradient-to-r from-[#19168D]/30 to-[#139FCC]/30" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#139FCC] mx-1" />
      <div className="h-px w-6 bg-gradient-to-r from-[#139FCC]/30 to-[#F3A736]/30" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#F3A736] mx-1" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#F3A736]/30" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Aurora orbs helper                                                 */
/* ------------------------------------------------------------------ */

function AuroraOrbs({
  variant = "default",
}: {
  variant?: "default" | "intense" | "light"
}) {
  const opacity =
    variant === "intense" ? 1.4 : variant === "light" ? 0.7 : 1

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[800px] h-[800px] -top-40 -left-40"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(19,159,204,${0.15 * opacity}) 0%, transparent 50%)`,
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] top-1/3 -right-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(243,167,54,${0.12 * opacity}) 0%, transparent 50%)`,
        }}
      />
      <div
        className="absolute w-[700px] h-[700px] -bottom-20 left-1/3"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(25,22,141,${0.1 * opacity}) 0%, transparent 50%)`,
        }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function HomePageV16() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ============================================================ */}
      {/*  HERO — Aurora Glass                                         */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Aurora orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[900px] h-[900px]"
            style={{
              top: "-10%",
              left: "-5%",
              background:
                "radial-gradient(circle at 20% 30%, rgba(19,159,204,0.15) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute w-[700px] h-[700px]"
            style={{
              top: "20%",
              right: "-10%",
              background:
                "radial-gradient(circle at 80% 60%, rgba(243,167,54,0.12) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute w-[800px] h-[800px]"
            style={{
              bottom: "-15%",
              left: "25%",
              background:
                "radial-gradient(circle at 50% 80%, rgba(25,22,141,0.1) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Glass card */}
        <div className="relative z-10 max-w-4xl w-full bg-white/60 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-10 md:p-16 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="ring-4 ring-white/50 rounded-2xl overflow-hidden">
              <Image
                src="/logo/jmv-logo.jpg"
                alt="JMV Logo"
                width={72}
                height={72}
                className="rounded-2xl"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#19168D] leading-tight">
            Juventud Mariana Vicenciana
          </h1>
          <p className="text-xl text-[#139FCC] font-medium mt-3">
            República Dominicana
          </p>

          {/* Decorative dots */}
          <DecorativeDots />

          {/* Subtitle */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Una comunidad de jóvenes comprometidos con la fe, el servicio y la
            transformación social.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button
              asChild
              className="rounded-2xl bg-[#F3A736] hover:bg-[#e09620] text-white shadow-lg shadow-[#F3A736]/25 px-8 py-6 text-lg font-semibold"
            >
              <Link href="/unete">
                Únete a JMV
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-2xl bg-white/50 backdrop-blur border border-[#19168D]/20 text-[#19168D] hover:bg-white/80 px-8 py-6 text-lg font-semibold"
            >
              <Link href="/quienes-somos">Conoce nuestra misión</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PILLARS — Floating Glass Cards                              */}
      {/* ============================================================ */}
      <section className="relative py-24 px-4 overflow-hidden">
        <AuroraOrbs variant="light" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-[#19168D]">
              Nuestros Pilares
            </h2>
            <p className="text-lg text-gray-500 mt-3">
              Los cimientos de nuestra comunidad
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="group bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 p-8 hover:bg-white/80 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
                  style={{
                    // @ts-expect-error CSS custom property
                    "--glow-color": pillar.glowColor,
                  }}
                >
                  <div
                    className="bg-white/50 backdrop-blur rounded-full w-14 h-14 flex items-center justify-center mb-5"
                    style={{ boxShadow: `0 4px 15px ${pillar.glowColor}` }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color: pillar.color }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#19168D] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  VALUES — Aurora Ribbon                                      */}
      {/* ============================================================ */}
      <section className="relative py-24 px-4 overflow-hidden">
        <AuroraOrbs variant="intense" />

        {/* Extra overlapping orbs for intensity */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2"
            style={{
              background:
                "radial-gradient(circle, rgba(19,159,204,0.08) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F3A736] mb-3">
            Notas Distintivas
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#19168D] mb-12">
            Los valores que nos definen como comunidad de fe
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {values.map((value) => (
              <div
                key={value}
                className="bg-white/50 backdrop-blur-xl rounded-full px-8 py-4 border border-white/40 hover:bg-white/70 hover:shadow-lg hover:shadow-[#139FCC]/15 hover:scale-105 transition-all duration-300 cursor-default"
              >
                <span className="text-xl md:text-2xl font-bold text-[#19168D]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                */}
      {/* ============================================================ */}
      <TestimonialsSection />

      {/* ============================================================ */}
      {/*  ACTIVITIES — Glass Event Cards                              */}
      {/* ============================================================ */}
      <section className="relative py-24 px-4 overflow-hidden">
        <AuroraOrbs variant="light" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-[#19168D]">
              Próximos Eventos
            </h2>
            <p className="text-lg text-gray-500 mt-3">
              Actividades para crecer en comunidad y servicio
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="group bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 overflow-hidden hover:bg-white/80 hover:shadow-xl hover:scale-[1.02] transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Glass badge */}
                  <div className="absolute top-3 left-3 bg-white/70 backdrop-blur-lg rounded-full px-3 py-1">
                    <span className="text-xs font-semibold text-[#19168D]">
                      {activity.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#19168D] mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {activity.description}
                  </p>

                  {/* Metadata */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4 text-[#139FCC]" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4 text-[#139FCC]" />
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4 text-[#139FCC]" />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              asChild
              className="rounded-2xl bg-[#F3A736] hover:bg-[#e09620] text-white shadow-lg shadow-[#F3A736]/25 px-8 py-6 text-lg font-semibold"
            >
              <Link href="/eventos">
                Ver todos los eventos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CONTACT — Frosted Glass Panel                               */}
      {/* ============================================================ */}
      <section className="relative py-24 px-4 overflow-hidden">
        <AuroraOrbs variant="default" />

        {/* Extra depth orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[400px] h-[400px] top-10 right-10"
            style={{
              background:
                "radial-gradient(circle, rgba(243,167,54,0.1) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute w-[350px] h-[350px] bottom-10 left-10"
            style={{
              background:
                "radial-gradient(circle, rgba(19,159,204,0.1) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="bg-white/60 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-8 md:p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#19168D]">
              Contáctanos
            </h2>

            <DecorativeDots />

            {/* Contact rows */}
            <div className="space-y-6 mt-8 mb-10 max-w-md mx-auto">
              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="bg-white/50 backdrop-blur rounded-full w-12 h-12 flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5 text-[#139FCC]" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">Ubicación</p>
                  <p className="font-bold text-[#19168D]">
                    Santo Domingo, República Dominicana
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="bg-white/50 backdrop-blur rounded-full w-12 h-12 flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-5 h-5 text-[#139FCC]" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">Correo electrónico</p>
                  <p className="font-bold text-[#19168D]">info@jmvrd.org</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="bg-white/50 backdrop-blur rounded-full w-12 h-12 flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-5 h-5 text-[#139FCC]" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-bold text-[#19168D]">
                    +1 (809) 123-4567
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button
              asChild
              className="rounded-2xl bg-[#F3A736] hover:bg-[#e09620] text-white shadow-lg shadow-[#F3A736]/25 px-8 py-6 text-lg font-semibold"
            >
              <Link href="/unete">
                Únete a JMV
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}
      <FooterSection />
    </div>
  )
}
