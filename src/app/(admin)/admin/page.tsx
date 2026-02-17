"use client"

import Link from "next/link"
import { MessageSquare, BookOpen, UsersRound, ArrowRight } from "lucide-react"

const ADMIN_SECTIONS = [
  {
    title: "Testimonios",
    description: "Gestiona los testimonios de los jóvenes de JMV",
    href: "/admin/testimonios",
    icon: MessageSquare,
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    title: "Formación",
    description: "Administra los módulos y recursos de formación",
    href: "/admin/formacion",
    icon: BookOpen,
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    title: "Consejo Nacional",
    description: "Gestiona el consejo nacional y sus miembros",
    href: "/admin/consejos",
    icon: UsersRound,
    color: "from-violet-500 to-violet-600",
    bgLight: "bg-violet-50",
    textColor: "text-violet-600",
  },
]

export default function AdminDashboardPage() {
  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Panel Administrativo
        </h1>
        <p className="mt-2 text-muted-foreground">
          Gestiona el contenido del sitio web de JMV República Dominicana.
        </p>
      </div>

      {/* Section Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ADMIN_SECTIONS.map((section) => {
          const Icon = section.icon
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group block overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${section.bgLight} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${section.textColor}`} />
                  </div>
                  <ArrowRight className="w-5 h-5 transition-transform text-muted-foreground group-hover:translate-x-1" />
                </div>
                <h2 className="mb-2 text-xl font-semibold text-foreground">
                  {section.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
              </div>
              <div className={`h-1 bg-gradient-to-r ${section.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
