import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Calendar, MapPin, Users, Filter, Search } from "lucide-react"
import Link from "next/link"

// Dummy events data
const events = [
  {
    id: "taller-liderazgo-2024",
    title: "Taller de Liderazgo JMV",
    description: "Desarrollo de habilidades de liderazgo cristiano para jóvenes comprometidos con el servicio",
    date: "2024-12-15",
    time: "9:00 AM - 5:00 PM",
    location: "Santo Domingo",
    region: "Santo Domingo",
    type: "Formación",
    capacity: 50,
    registered: 32,
    image: "/young-leadership-workshop.png",
    organizer: "Capítulo Santo Domingo",
  },
  {
    id: "mision-verano-2024",
    title: "Misión de Verano",
    description: "Experiencia misionera de servicio a comunidades rurales necesitadas durante las vacaciones",
    date: "2024-12-22",
    time: "Todo el día",
    location: "Monte Plata",
    region: "Monte Plata",
    type: "Misión",
    capacity: 30,
    registered: 28,
    image: "/rural-mission-work.png",
    organizer: "Coordinación Nacional",
  },
  {
    id: "vigilia-mariana-2024",
    title: "Vigilia Mariana",
    description: "Noche de oración y reflexión en honor a la Virgen María, Madre de los pobres",
    date: "2024-12-28",
    time: "7:00 PM - 6:00 AM",
    location: "Santiago",
    region: "Santiago",
    type: "Espiritualidad",
    capacity: 100,
    registered: 67,
    image: "/prayer-vigil-candles-mary.png",
    organizer: "Capítulo Santiago",
  },
  {
    id: "encuentro-nacional-2025",
    title: "Encuentro Nacional JMV",
    description: "Encuentro anual que reúne a todos los capítulos del país para compartir experiencias y planificar",
    date: "2025-01-15",
    time: "8:00 AM - 6:00 PM",
    location: "La Vega",
    region: "La Vega",
    type: "Encuentro",
    capacity: 200,
    registered: 145,
    image: "/youth-conference.png",
    organizer: "Coordinación Nacional",
  },
  {
    id: "retiro-cuaresmal-2025",
    title: "Retiro Cuaresmal",
    description: "Retiro espiritual de preparación para la Semana Santa con reflexiones y oración",
    date: "2025-02-08",
    time: "9:00 AM - 5:00 PM",
    location: "San Cristóbal",
    region: "San Cristóbal",
    type: "Espiritualidad",
    capacity: 80,
    registered: 23,
    image: "/lenten-retreat-prayer.png",
    organizer: "Capítulo San Cristóbal",
  },
  {
    id: "taller-doctrina-social-2025",
    title: "Taller de Doctrina Social",
    description: "Profundización en la enseñanza social de la Iglesia aplicada al contexto dominicano",
    date: "2025-02-22",
    time: "2:00 PM - 6:00 PM",
    location: "Santo Domingo",
    region: "Santo Domingo",
    type: "Formación",
    capacity: 40,
    registered: 18,
    image: "/social-doctrine-workshop.png",
    organizer: "Capítulo Santo Domingo",
  },
]

export default function EventosPage() {
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-card via-background to-card py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Calendar className="mr-2 h-4 w-4" />
              Próximas Actividades
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">Eventos JMV</h1>
            <p className="text-xl text-muted-foreground">
              Descubre nuestras próximas actividades de formación, espiritualidad y servicio
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar eventos..." className="pl-10 w-full sm:w-64" />
              </div>

              <Select>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Región" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las regiones</SelectItem>
                  <SelectItem value="santo-domingo">Santo Domingo</SelectItem>
                  <SelectItem value="santiago">Santiago</SelectItem>
                  <SelectItem value="la-vega">La Vega</SelectItem>
                  <SelectItem value="monte-plata">Monte Plata</SelectItem>
                  <SelectItem value="san-cristobal">San Cristóbal</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="formacion">Formación</SelectItem>
                  <SelectItem value="espiritualidad">Espiritualidad</SelectItem>
                  <SelectItem value="mision">Misión</SelectItem>
                  <SelectItem value="encuentro">Encuentro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              {events.length} eventos encontrados
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{event.type}</Badge>
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("es-DO", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-2">{event.description}</CardDescription>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-2 h-4 w-4" />
                      {event.registered}/{event.capacity} inscritos
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/eventos/${event.id}`}>Ver detalles</Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      Compartir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Cargar más eventos
            </Button>
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
