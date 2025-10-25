import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Star, MapPin, Users, Filter, Search, Clock, ArrowRight, Sparkles, User } from "lucide-react"
import Link from "next/link"
import Navbar from "@/src/components/Navbar"

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
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 border rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Próximas Actividades</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text">
                Eventos JMV
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl leading-relaxed text-muted-foreground">
              Descubre nuestras próximas actividades de formación, espiritualidad y servicio. Únete a una comunidad que
              transforma vidas.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-10 py-8 border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative group">
                <Search className="absolute w-4 h-4 transition-colors -translate-y-1/2 left-4 top-1/2 text-muted-foreground group-focus-within:text-primary" />
                <Input
                  placeholder="Buscar eventos..."
                  className="w-full h-12 pl-12 sm:w-80 bg-background/80 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>

              <Select>
                <SelectTrigger className="w-full h-12 sm:w-48 bg-background/80 border-border/50">
                  <SelectValue placeholder="Todas las regiones" />
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
                <SelectTrigger className="w-full h-12 sm:w-48 bg-background/80 border-border/50">
                  <SelectValue placeholder="Todos los tipos" />
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

            <div className="flex items-center gap-3 px-4 py-2 text-sm border rounded-lg text-muted-foreground bg-background/60 border-border/50">
              <Filter className="w-4 h-4" />
              <span className="font-medium">{events.length} eventos encontrados</span>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-10 py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <Card
                key={event.id}
                className="overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/50"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={
                      event.image || `/placeholder.svg?height=240&width=400&query=${encodeURIComponent(event.title)}`
                    }
                    alt={event.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 text-primary border-primary/20">
                      {event.type}
                    </Badge>
                  </div>
                  <div className="absolute px-3 py-1 text-sm font-medium rounded-full top-4 right-4 bg-background/90 text-primary">
                    {new Date(event.date).toLocaleDateString("es-DO", {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl transition-colors duration-200 line-clamp-2 group-hover:text-primary">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed line-clamp-2 text-muted-foreground">
                    {event.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mb-6 space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-lg bg-primary/10">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-lg bg-secondary/10">
                        <MapPin className="w-4 h-4 text-secondary" />
                      </div>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-lg bg-accent/10">
                        <Users className="w-4 h-4 text-accent" />
                      </div>
                      <span>
                        {event.registered}/{event.capacity} inscritos
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      asChild
                      className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 group"
                    >
                      <Link href={`/eventos/${event.id}`}>
                        Ver detalles
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent border-primary/20 hover:bg-primary/5">
                      Compartir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-16 text-center">
            <Button
              variant="outline"
              size="lg"
              className="bg-background/80 border-primary/20 hover:bg-primary/5 hover:border-primary/40"
            >
              Cargar más eventos
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-white bg-gradient-to-br from-primary via-primary to-secondary">
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
