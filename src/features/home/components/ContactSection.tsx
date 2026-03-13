import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contactanos" className="py-20 lg:py-28 bg-gradient-to-br from-muted/50 via-background to-card">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-6">
              <Mail className="w-4 h-4 mr-2" />
              Contáctanos
            </Badge>
            <h2 className="mb-4 text-4xl font-bold text-balance">¿Tienes alguna pregunta?</h2>
            <p className="max-w-2xl mx-auto text-xl leading-relaxed text-muted-foreground">
              Estamos aquí para ayudarte. Comunícate con nosotros y te responderemos a la brevedad.
            </p>
          </div>

          <div className="grid gap-8 mb-10 md:grid-cols-3">
            <div className="flex flex-col items-center p-6 text-center border shadow-sm rounded-2xl bg-card">
              <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-xl bg-primary/10">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Ubicación</h3>
              <p className="text-sm text-muted-foreground">Santo Domingo, República Dominicana</p>
            </div>

            <div className="flex flex-col items-center p-6 text-center border shadow-sm rounded-2xl bg-card">
              <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-xl bg-primary/10">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Correo</h3>
              <p className="text-sm text-muted-foreground">info@jmvrd.org</p>
            </div>

            <div className="flex flex-col items-center p-6 text-center border shadow-sm rounded-2xl bg-card">
              <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-xl bg-primary/10">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Teléfono</h3>
              <p className="text-sm text-muted-foreground">+1 (809) 123-4567</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              asChild
              className="shadow-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              <Link href="/unete">
                Únete a JMV
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
