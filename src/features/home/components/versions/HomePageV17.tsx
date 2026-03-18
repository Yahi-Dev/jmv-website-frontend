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
  ChevronDown,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Chapter Marker Component                                          */
/* ------------------------------------------------------------------ */
function ChapterMarker({ number }: { number: string }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-10">
      <span className="block h-px w-12 bg-[#F3A736]" />
      <span className="text-sm font-mono tracking-[0.3em] text-[#F3A736]">
        {number}
      </span>
      <span className="block h-px w-12 bg-[#F3A736]" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */
const pillars = [
  {
    icon: Users,
    title: "Comunidad Juvenil",
    description:
      "Crecimiento espiritual y humano a través de la catequesis y el liderazgo cristiano",
    dotColor: "#19168D",
  },
  {
    icon: Heart,
    title: "Espiritualidad",
    description:
      "Oración y contemplación siguiendo el ejemplo de María y San Vicente",
    dotColor: "#139FCC",
  },
  {
    icon: HandHeart,
    title: "Apostolado",
    description:
      "Compromiso con los más necesitados a través de obras de caridad",
    dotColor: "#F3A736",
  },
  {
    icon: BookOpen,
    title: "Formación",
    description:
      "Fraternidad y apoyo mutuo en el camino de fe y servicio",
    dotColor: "#19168D",
  },
]

const values = ["Eclesial", "Laical", "Mariana", "Misionera", "Vicentina"]

const valueColors = ["#19168D", "#139FCC", "#F3A736", "#19168D", "#139FCC"]

const activities = [
  {
    day: "15",
    month: "DIC",
    year: "2024",
    title: "Taller de Liderazgo JMV",
    type: "Formación",
    location: "Santo Domingo",
    time: "9:00 AM",
    description:
      "Desarrollo de habilidades de liderazgo cristiano para jóvenes comprometidos",
    image: "/images/jmv/jmv-2.jpeg",
  },
  {
    day: "22",
    month: "DIC",
    year: "2024",
    title: "Misión de Verano",
    type: "Misión",
    location: "Monte Plata",
    time: "7:00 AM",
    description:
      "Experiencia misionera de servicio a comunidades rurales necesitadas",
    image: null,
  },
  {
    day: "28",
    month: "DIC",
    year: "2024",
    title: "Vigilia Mariana",
    type: "Espiritualidad",
    location: "Santiago",
    time: "8:00 PM",
    description:
      "Noche de oración y reflexión en honor a la Virgen María",
    image: null,
  },
]

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */
export function HomePageV17() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ============================================================ */}
      {/* Chapter 1 — Hero: "Quiénes Somos"                           */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-6">
        {/* Watermark */}
        <span
          aria-hidden
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center text-[15rem] md:text-[22rem] font-black text-[#19168D] opacity-[0.03] leading-none"
        >
          JMV
        </span>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <ChapterMarker number="01" />

          <Image
            src="/logo/jmv-logo.jpg"
            alt="JMV Logo"
            width={80}
            height={80}
            className="rounded-2xl mb-8"
          />

          <h1 className="flex flex-col items-center gap-1 mb-4">
            <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#19168D] leading-tight">
              Juventud
            </span>
            <span className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#19168D] leading-tight">
              Mariana
            </span>
            <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#19168D] leading-tight">
              Vicenciana
            </span>
          </h1>

          <p className="text-xl tracking-wider text-[#139FCC] mb-6">
            República Dominicana
          </p>

          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Una comunidad de jóvenes comprometidos con la fe, el servicio y la
            transformación social.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className="bg-[#F3A736] hover:bg-[#e09620] text-white px-8 py-3 text-base rounded-full"
            >
              <Link href="/unete">Únete a JMV</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[#19168D] text-[#19168D] hover:bg-[#19168D]/5 px-8 py-3 text-base rounded-full"
            >
              <Link href="/quienes-somos">Conoce nuestra misión</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
          <span className="text-xs tracking-wide">Descubre nuestra historia</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* Chapter 2 — Pillars: "Lo Que Creemos"                       */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#FAFBFD] overflow-hidden px-6 py-24">
        {/* Watermark */}
        <span
          aria-hidden
          className="pointer-events-none select-none absolute bottom-0 right-0 text-[18rem] font-black text-[#19168D] opacity-[0.03] leading-none translate-x-8 translate-y-16"
        >
          FE
        </span>

        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <ChapterMarker number="02" />

          <h2 className="text-4xl md:text-5xl font-bold text-[#19168D] text-center mb-3">
            Nuestros Pilares
          </h2>
          <p className="text-gray-500 text-center mb-16 text-lg">
            Los cimientos de nuestra comunidad
          </p>

          {/* Timeline — Desktop */}
          <div className="hidden md:block relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#139FCC]/30 -translate-x-1/2" />

            <div className="flex flex-col gap-20">
              {pillars.map((pillar, i) => {
                const isLeft = i % 2 === 0
                const Icon = pillar.icon
                return (
                  <div key={i} className="relative flex items-center">
                    {/* Dot */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 ring-4 ring-white"
                      style={{ backgroundColor: pillar.dotColor }}
                    />

                    {isLeft ? (
                      <>
                        <div className="w-1/2 pr-12 text-right">
                          <div className="bg-white rounded-2xl shadow-md p-8 inline-block text-left max-w-sm ml-auto">
                            <Icon className="w-8 h-8 mb-4" style={{ color: pillar.dotColor }} />
                            <h3 className="text-xl font-bold text-[#19168D] mb-2">
                              {pillar.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                              {pillar.description}
                            </p>
                          </div>
                        </div>
                        <div className="w-1/2" />
                      </>
                    ) : (
                      <>
                        <div className="w-1/2" />
                        <div className="w-1/2 pl-12">
                          <div className="bg-white rounded-2xl shadow-md p-8 max-w-sm">
                            <Icon className="w-8 h-8 mb-4" style={{ color: pillar.dotColor }} />
                            <h3 className="text-xl font-bold text-[#19168D] mb-2">
                              {pillar.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                              {pillar.description}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Timeline — Mobile */}
          <div className="md:hidden relative pl-10">
            {/* Vertical line on left */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#139FCC]/30" />

            <div className="flex flex-col gap-12">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon
                return (
                  <div key={i} className="relative">
                    {/* Dot */}
                    <div
                      className="absolute -left-[1.625rem] top-8 w-4 h-4 rounded-full z-10 ring-4 ring-[#FAFBFD]"
                      style={{ backgroundColor: pillar.dotColor }}
                    />
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <Icon className="w-7 h-7 mb-3" style={{ color: pillar.dotColor }} />
                      <h3 className="text-lg font-bold text-[#19168D] mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Chapter 3 — Values: "Lo Que Nos Define"                     */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#F0F4FF] overflow-hidden px-6 py-24">
        {/* Watermark */}
        <span
          aria-hidden
          className="pointer-events-none select-none absolute top-0 left-0 text-[10rem] md:text-[16rem] font-black text-[#19168D] opacity-[0.03] leading-none -translate-x-4 -translate-y-4"
        >
          VALORES
        </span>

        <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
          <ChapterMarker number="03" />

          <h2 className="text-4xl md:text-5xl font-bold text-[#19168D] mb-3">
            Notas Distintivas
          </h2>
          <p className="text-gray-500 text-lg mb-16">
            Los valores que nos definen como comunidad de fe
          </p>

          <div className="flex flex-col items-center gap-8 md:gap-10">
            {values.map((value, i) => (
              <div key={i} className="group cursor-default">
                <span className="text-5xl sm:text-6xl md:text-8xl font-black text-[#19168D] leading-none">
                  {value}
                </span>
                <div className="mx-auto mt-2 h-1 w-20 rounded-full transition-all duration-300 group-hover:w-40 group-hover:h-1.5"
                  style={{ backgroundColor: valueColors[i] }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Image Divider                                                */}
      {/* ============================================================ */}
      <div className="relative h-32 w-full overflow-hidden">
        <Image
          src="/images/jmv/jmv-3.jpeg"
          alt="JMV comunidad"
          fill
          className="object-cover grayscale opacity-70"
        />
      </div>

      {/* ============================================================ */}
      {/* Chapter 4 — Testimonials: "Lo Que Dicen"                    */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-6 py-24">
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <ChapterMarker number="04" />
          <TestimonialsSection />
        </div>
      </section>

      {/* ============================================================ */}
      {/* Chapter 5 — Activities: "Lo Que Viene"                      */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] overflow-hidden px-6 py-24">
        {/* Watermark */}
        <span
          aria-hidden
          className="pointer-events-none select-none absolute bottom-0 right-0 text-[15rem] font-black text-[#19168D] opacity-[0.03] leading-none translate-x-8 translate-y-12"
        >
          2024
        </span>

        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <ChapterMarker number="05" />

          <h2 className="text-4xl md:text-5xl font-bold text-[#19168D] text-center mb-3">
            Próximos Eventos
          </h2>
          <p className="text-gray-500 text-center text-lg mb-14">
            Lo que viene en nuestra comunidad
          </p>

          <div className="flex flex-col">
            {activities.map((activity, i) => (
              <div key={i}>
                {/* Activity block */}
                <div className="py-8">
                  {/* Date */}
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#19168D]">
                      {activity.day}
                    </span>
                    <span className="text-4xl font-bold text-[#19168D] ml-2">
                      {activity.month}
                    </span>
                    <span className="text-sm text-gray-400 ml-3">
                      {activity.year}
                    </span>
                  </div>

                  {/* Type tag */}
                  <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#139FCC] bg-[#139FCC]/10 px-3 py-1 rounded-full mb-3">
                    {activity.type}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#19168D] mb-2">
                    {activity.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 leading-relaxed mb-3">
                    {activity.description}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {activity.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {activity.time}
                    </span>
                  </div>
                </div>

                {/* Image after first activity */}
                {i === 0 && activity.image && (
                  <div className="relative w-full h-56 rounded-xl overflow-hidden mb-2">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Separator */}
                {i < activities.length - 1 && (
                  <div className="h-px bg-gray-200" />
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 text-[#F3A736] font-semibold text-lg hover:underline"
            >
              Ver todos los eventos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Chapter 6 — Contact: "Conéctate"                            */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-6 py-24">
        {/* Watermark */}
        <span
          aria-hidden
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center text-[12rem] font-black text-[#19168D] opacity-[0.03] leading-none"
        >
          JUNTOS
        </span>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <ChapterMarker number="06" />

          <h2 className="text-5xl md:text-6xl font-bold text-[#19168D] mb-16">
            Escríbenos
          </h2>

          {/* Contact grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 mb-16">
            {/* Location */}
            <div className="flex flex-col items-center md:border-r md:border-gray-200 px-6">
              <MapPin className="w-10 h-10 text-[#19168D] mb-4" />
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Ubicación
              </span>
              <span className="text-[#19168D] font-medium">
                Santo Domingo, República Dominicana
              </span>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center md:border-r md:border-gray-200 px-6">
              <Mail className="w-10 h-10 text-[#139FCC] mb-4" />
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Email
              </span>
              <a
                href="mailto:info@jmvrd.org"
                className="text-[#139FCC] font-medium hover:underline"
              >
                info@jmvrd.org
              </a>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center px-6">
              <Phone className="w-10 h-10 text-[#F3A736] mb-4" />
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Teléfono
              </span>
              <a
                href="tel:+18091234567"
                className="text-[#F3A736] font-medium hover:underline"
              >
                +1 (809) 123-4567
              </a>
            </div>
          </div>

          {/* CTA */}
          <Button
            asChild
            className="bg-[#F3A736] hover:bg-[#e09620] text-white px-10 py-4 text-lg rounded-full"
          >
            <Link href="/unete">Únete a JMV</Link>
          </Button>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
