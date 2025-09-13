import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, Calendar, MapPin, Users, Mail, Phone, ArrowLeft, Share2, CheckCircle, Sparkles, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"

// Dummy event data (in a real app, this would come from a database)
const events = {
  "taller-liderazgo-2024": {
    id: "taller-liderazgo-2024",
    title: "Taller de Liderazgo JMV",
    description: "Desarrollo de habilidades de liderazgo cristiano para jóvenes comprometidos con el servicio",
    fullDescription: `Este taller intensivo está diseñado para jóvenes que desean desarrollar sus habilidades de liderazgo desde una perspectiva cristiana y vicenciana. Durante una jornada completa, los participantes explorarán los fundamentos del liderazgo servicial, aprenderán técnicas de comunicación efectiva y desarrollarán herramientas prácticas para la gestión de equipos y proyectos pastorales.

      El programa incluye dinámicas grupales, estudios de caso basados en la vida de San Vicente de Paúl, y ejercicios prácticos de planificación pastoral. Los facilitadores son líderes experimentados de JMV con formación en desarrollo organizacional y espiritualidad vicenciana.

      Al finalizar el taller, los participantes habrán desarrollado un plan personal de crecimiento en liderazgo y estarán preparados para asumir mayores responsabilidades en sus capítulos locales.`,
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
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      {/* Navigation */}
      <Navbar />

      <div className="px-10">
        <div className="container py-6 ">
          <Button variant="ghost" asChild className="hover:bg-primary/5 hover:text-primary">
            <Link href="/eventos">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a eventos
            </Link>
          </Button>
        </div>

        {/* Event Header */}
        <section className="pb-12">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="relative mb-8 overflow-hidden shadow-2xl aspect-video rounded-2xl">
                  <img
                    src={event.image || `/placeholder.svg?height=400&width=800&query=${encodeURIComponent(event.title)}`}
                    alt={event.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary" className="bg-white/90 text-primary border-primary/20">
                        {event.type}
                      </Badge>
                      <Badge variant="outline" className="bg-white/90 border-white/50">
                        {event.organizer}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h1 className="mb-4 text-4xl font-bold leading-tight text-transparent lg:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text">
                      {event.title}
                    </h1>
                    <p className="text-xl leading-relaxed text-muted-foreground">{event.description}</p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex items-center gap-4 p-6 border rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
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

                    <div className="flex items-center gap-4 p-6 border rounded-xl bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/20">
                        <MapPin className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{event.location}</div>
                        <div className="text-sm text-muted-foreground">{event.region}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-6 border rounded-xl bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20">
                        <Users className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {event.registered}/{event.capacity} inscritos
                        </div>
                        <div className="text-sm text-muted-foreground">{availableSpots} cupos disponibles</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-6 border rounded-xl bg-gradient-to-br from-muted/20 to-muted/30 border-border">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted/40">
                        <Mail className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Contacto</div>
                        <div className="text-sm text-muted-foreground">{event.contact.email}</div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-12" />

                  <div className="prose prose-lg max-w-none">
                    <h2 className="mb-6 text-3xl font-bold text-foreground">Descripción del evento</h2>
                    <div className="p-8 text-lg leading-relaxed whitespace-pre-line border text-muted-foreground bg-card/50 rounded-xl border-border/50">
                      {event.fullDescription}
                    </div>
                  </div>

                  <Separator className="my-12" />

                  <div>
                    <h2 className="mb-8 text-3xl font-bold text-foreground">Agenda del evento</h2>
                    <div className="space-y-4">
                      {event.agenda.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-6 p-6 transition-all duration-200 border rounded-xl bg-card/80 border-border/50 hover:shadow-lg"
                        >
                          <div className="flex items-center justify-center min-w-[100px] h-12 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm shadow-lg">
                            {item.time}
                          </div>
                          <div className="flex items-center flex-1">
                            <div className="text-lg font-medium text-foreground">{item.activity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-12" />

                  <div>
                    <h2 className="mb-8 text-3xl font-bold text-foreground">Requisitos</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {event.requirements.map((requirement, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 border rounded-lg bg-card/50 border-border/50"
                        >
                          <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-primary/20">
                            <CheckCircle className="w-4 h-4 text-primary" />
                          </div>
                          <span className="leading-relaxed text-muted-foreground">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky shadow-2xl top-24 bg-card/80 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mx-auto mb-4 border rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">Inscripción</span>
                    </div>
                    <CardTitle className="text-2xl">{availableSpots > 0 ? "¡Únete ahora!" : "Lista de espera"}</CardTitle>
                    <CardDescription className="text-base">
                      {availableSpots > 0
                        ? `${availableSpots} cupos disponibles`
                        : "Evento completo - Lista de espera disponible"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-6 text-center border rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                      <div className="mb-2 text-4xl font-bold text-primary">Gratis</div>
                      <div className="text-sm text-muted-foreground">Evento sin costo</div>
                    </div>

                    <Button
                      className="w-full h-12 text-lg font-semibold shadow-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                      size="lg"
                      disabled={availableSpots === 0}
                    >
                      {availableSpots > 0 ? "Inscribirse ahora" : "Unirse a lista de espera"}
                    </Button>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-background/80 border-primary/20 hover:bg-primary/5"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartir
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-background/80 border-primary/20 hover:bg-primary/5"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Información de contacto</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3 p-3 border rounded-lg bg-card/50 border-border/50">
                          <Mail className="w-4 h-4 text-primary" />
                          <a
                            href={`mailto:${event.contact.email}`}
                            className="transition-colors hover:underline text-muted-foreground hover:text-primary"
                          >
                            {event.contact.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-3 p-3 border rounded-lg bg-card/50 border-border/50">
                          <Phone className="w-4 h-4 text-primary" />
                          <a
                            href={`tel:${event.contact.phone}`}
                            className="transition-colors hover:underline text-muted-foreground hover:text-primary"
                          >
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
      </div>
      {/* Back Button */}


      {/* Footer */}
      <footer className="py-16 mt-20 text-white bg-gradient-to-br from-primary via-primary to-secondary">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center mb-6 space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold font-heading">JMV RD</span>
                  <p className="text-sm text-white/90">Juventud Mariana Vicenciana</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/80">
                Formando jóvenes comprometidos con el servicio y la fe cristiana.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-white">Enlaces</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/quienes-somos" className="transition-colors text-white/80 hover:text-white">
                    Quiénes Somos
                  </Link>
                </li>
                <li>
                  <Link href="/formacion" className="transition-colors text-white/80 hover:text-white">
                    Formación
                  </Link>
                </li>
                <li>
                  <Link href="/eventos" className="transition-colors text-white/80 hover:text-white">
                    Eventos
                  </Link>
                </li>
                <li>
                  <Link href="/noticias" className="transition-colors text-white/80 hover:text-white">
                    Noticias
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-white">Contacto</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li>Santo Domingo, RD</li>
                <li>info@jmvrd.org</li>
                <li>+1 (809) 123-4567</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-white">Síguenos</h3>
              <div className="flex space-x-4">
                <Link href="#" className="transition-colors text-white/80 hover:text-white">
                  Instagram
                </Link>
                <Link href="#" className="transition-colors text-white/80 hover:text-white">
                  Facebook
                </Link>
                <Link href="#" className="transition-colors text-white/80 hover:text-white">
                  YouTube
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-12 text-sm text-center border-t border-white/20 text-white/80">
            <p>&copy; 2024 JMV República Dominicana. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
