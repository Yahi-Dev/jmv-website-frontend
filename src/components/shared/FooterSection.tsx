"use client"

import { Star, MapPin } from "lucide-react"
import Link from "next/link"

export function FooterSection() {
  return (
    <footer className="relative py-16 overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />
      <div className="container relative z-10 px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-center mb-6 space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-foreground">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-xl font-bold">JMV RD</span>
                <p className="text-sm text-white/90">Juventud Mariana Vicenciana</p>
              </div>
            </div>
            <p className="leading-relaxed text-primary-foreground/80">
              Formando jóvenes líderes cristianos comprometidos con la fe, el servicio y la comunidad.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Enlaces</h3>
            <ul className="space-y-3">
              {[
                { href: "/quienes-somos", label: "Quiénes Somos" },
                { href: "/formacion", label: "Formación" },
                { href: "/eventos", label: "Eventos" },
                { href: "/noticias", label: "Noticias" },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="transition-colors duration-200 hover:text-secondary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Contacto</h3>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Santo Domingo, RD
              </li>
              <li>info@jmvrd.org</li>
              <li>+1 (809) 123-4567</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Síguenos</h3>
            <div className="flex space-x-6">
              {["Instagram", "Facebook", "YouTube"].map((social, i) => (
                <Link
                  key={i}
                  href="#"
                  className="transition-all duration-200 hover:text-secondary hover:scale-110"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 mt-12 text-center border-t border-primary-foreground/20 text-primary-foreground/80">
          <p>&copy; 2024 JMV República Dominicana. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
