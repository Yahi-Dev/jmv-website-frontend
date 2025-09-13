import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, Calendar, MapPin, Users, Mail, Phone, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Dummy event data (in a real app, this would come from a database)
const events = {
  "taller-liderazgo-2024": {
    id: "taller-liderazgo-2024",
    title: "Taller de Liderazgo JMV",
    description: "Desarrollo de habilidades de liderazgo cristiano para jóvenes comprometidos con el servicio",
    fullDescription: `
      Este taller intensivo está diseñado para jóvenes que desean desarrollar sus habilidades de liderazgo desde una perspectiva cristiana y vicenciana. Durante una jornada completa, los participantes explorarán los fundamentos del liderazgo servicial, aprenderán técnicas de comunicación efectiva y desarrollarán herramientas prácticas para la gestión de equipos y proyectos pastorales.

      El programa incluye dinámicas grupales, estudios de caso basados en la vida de San Vicente de Paúl, y ejercicios prácticos de planificación pastoral. Los facilitadores son líderes experimentados de JMV con formación en desarrollo organizacional y espiritualidad vicenciana.

      Al finalizar el taller, los participantes habrán desarrollado un plan personal de crecimiento en liderazgo y estarán preparados para asumir mayores responsabilidades en sus capítulos locales.
    `,
    date: "2024-12-15",
    time: "9:00 AM - 5:00 PM",
    location: "Centro Pastoral San Vicente, Santo Domingo",
    region: "Santo Domingo",
    type: "Formación",
    capacity: 50,
    registered: 32,
    image: "/young-leadership-workshop.png",
    organizer: "Capítulo Santo Domingo",
    contact: {
      email: "liderazgo@jmvrd.org",
      phone: "+1 (809) 555-0123",
    },
    requirements: [
      "Ser miembro activo de JMV",
      "Tener al menos 6 meses de participación en el movimiento",
      "Completar formulario de inscripción",
      "Traer cuaderno y materiales de escritura",
    ],
    agenda: [
      { time: "9:00 - 9:30", activity: "Registro y bienvenida" },
      { time: "9:30 - 11:00", activity: "Fundamentos del liderazgo cristiano" },
      { time: "11:00 - 11:15", activity: "Receso" },
      { time: "11:15 - 12:30", activity: "Comunicación efectiva y escucha activa" },
      { time: "12:30 - 1:30", activity: "Almuerzo" },
      { time: "1:30 - 3:00", activity: "Gestión de equipos pastorales" },
      { time: "3:00 - 3:15", activity: "Receso" },
      { time: "3:15 - 4:30", activity: "Planificación y evaluación de proyectos" },
      { time: "4:30 - 5:00", activity: "Compromiso personal y cierre" },
    ],
  },
}

interface EventDetailPageProps {
  params: {
    slug: string
  }
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const event = events[params.slug as keyof typeof events]

  if (!event) {
    notFound()
  }

  const availableSpots = event.capacity - event.registered

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Star className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-semibold">JMV RD</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link href="/quienes-somos" className="text-sm font-medium hover:text-primary transition-colors">
              Quiénes Somos
            </Link>
            <Link href="/formacion" className="text-sm font-medium hover:text-primary transition-colors">
              Formación
            </Link>
            <Link href="/eventos" className="text-sm font-medium text-primary">
              Eventos
            </Link>
            <Link href="/noticias" className="text-sm font-medium hover:text-primary transition-colors">
              Noticias
            </Link>
            <Link href="/unete" className="text-sm font-medium hover:text-primary transition-colors">
              Únete
            </Link>
          </div>

          <Button asChild>
            <Link href="/unete">Únete a JMV</Link>
          </Button>
        </div>
      </nav>

      {/* Back Button */}
      <div className="container py-4">
        <Button variant="ghost" asChild>
          <Link href="/eventos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a eventos
          </Link>
        </Button>
      </div>

      {/* Event Header */}
      <section className="py-8">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{event.type}</Badge>
                <Badge variant="outline">{event.organizer}</Badge>
              </div>

              <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{event.description}</p>

              <div className="grid gap-4 sm:grid-cols-2 mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {new Date(event.date).toLocaleDateString("es-DO", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground">{event.time}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{event.location}</div>
                    <div className="text-sm text-muted-foreground">{event.region}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {event.registered}/{event.capacity} inscritos
                    </div>
                    <div className="text-sm text-muted-foreground">{availableSpots} cupos disponibles</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Contacto</div>
                    <div className="text-sm text-muted-foreground">{event.contact.email}</div>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <div className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-bold mb-4">Descripción del evento</h2>
                <div className="whitespace-pre-line text-muted-foreground leading-relaxed">{event.fullDescription}</div>
              </div>

              <Separator className="my-8" />

              <div>
                <h2 className="text-2xl font-bold mb-4">Agenda</h2>
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 rounded-lg bg-card">
                      <div className="flex items-center justify-center w-20 h-10 rounded bg-primary/10 text-primary font-medium text-sm">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.activity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-8" />

              <div>
                <h2 className="text-2xl font-bold mb-4">Requisitos</h2>
                <ul className="space-y-2">
                  {event.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Registration Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Inscripción</CardTitle>
                  <CardDescription>
                    {availableSpots > 0
                      ? `${availableSpots} cupos disponibles`
                      : "Evento completo - Lista de espera disponible"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">Gratis</div>
                    <div className="text-sm text-muted-foreground">Evento sin costo</div>
                  </div>

                  <Button className="w-full" size="lg" disabled={availableSpots === 0}>
                    {availableSpots > 0 ? "Inscribirse ahora" : "Unirse a lista de espera"}
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartir
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-semibold">Información de contacto</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${event.contact.email}`} className="hover:underline">
                          {event.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${event.contact.phone}`} className="hover:underline">
                          {event.contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background">
                  <Star className="h-4 w-4 text-foreground" />
                </div>
                <span className="font-heading text-lg font-semibold">JMV RD</span>
              </div>
              <p className="text-sm text-background/80">Juventud Mariana Vicenciana República Dominicana</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/quienes-somos" className="hover:underline">
                    Quiénes Somos
                  </Link>
                </li>
                <li>
                  <Link href="/formacion" className="hover:underline">
                    Formación
                  </Link>
                </li>
                <li>
                  <Link href="/eventos" className="hover:underline">
                    Eventos
                  </Link>
                </li>
                <li>
                  <Link href="/noticias" className="hover:underline">
                    Noticias
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm text-background/80">
                <li>Santo Domingo, RD</li>
                <li>info@jmvrd.org</li>
                <li>+1 (809) 123-4567</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-secondary transition-colors">
                  Instagram
                </Link>
                <Link href="#" className="hover:text-secondary transition-colors">
                  Facebook
                </Link>
                <Link href="#" className="hover:text-secondary transition-colors">
                  YouTube
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/80">
            <p>&copy; 2024 JMV República Dominicana. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
