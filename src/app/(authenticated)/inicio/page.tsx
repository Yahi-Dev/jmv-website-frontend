
import Navbar from "@/src/components/Navbar"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Star, Heart, Users, BookOpen, MapPin, User, ArrowRight, Calendar, Clock, Sparkles } from "lucide-react"
import Link from "next/link"


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-background via-card to-background lg:py-32">
        <div className="absolute inset-0 bg-[url('/young-people-praying-together-in-church.jpg')] bg-cover bg-center opacity-5" />
        <div className="absolute w-20 h-20 rounded-full top-20 left-10 bg-primary/10 blur-xl animate-pulse" />
        <div className="absolute w-32 h-32 delay-1000 rounded-full bottom-20 right-10 bg-secondary/10 blur-xl animate-pulse" />

        <div className="container relative px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Badge
                variant="secondary"
                className="px-6 py-3 text-sm font-medium text-gray-700 border-0 shadow-lg bg-gradient-to-r from-primary/10 to-secondary/10"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-gray-700">Juventud Mariana Vicenciana</span>
              </Badge>
            </div>

            <h1 className="mb-8 text-5xl font-black tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Juventud Mariana
              <span className="block text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                Vicenciana
              </span>
              <span className="block text-4xl font-bold sm:text-5xl lg:text-6xl text-muted-foreground">
                República Dominicana
              </span>
            </h1>

            <p className="max-w-3xl mx-auto mb-12 text-xl leading-relaxed text-muted-foreground sm:text-2xl text-pretty">
              Formación, oración y servicio, al estilo de María y San Vicente de Paúl. Únete a nuestra comunidad de
              jóvenes comprometidos con la fe y el servicio.
            </p>

            <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                asChild
                className="px-10 py-6 text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <Link href="/unete" className="flex items-center gap-2">
                  Únete a JMV
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-10 py-6 text-lg font-semibold transition-all duration-300 bg-transparent border-2 hover:border-primary hover:scale-105"
              >
                <Link href="/quienes-somos">Conoce nuestra misión</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-balance">Nuestros Pilares</h2>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground text-pretty">
              Cuatro pilares fundamentales que guían nuestro caminar cristiano
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="relative overflow-hidden transition-all duration-500 border-0 shadow-lg group hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-card to-background">
              <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:opacity-100" />
              <CardHeader className="relative z-10 pb-4 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-transform duration-300 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">Formación</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base leading-relaxed text-center">
                  Crecimiento espiritual y humano a través de la catequesis y el liderazgo cristiano
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden transition-all duration-500 border-0 shadow-lg group hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-card to-background">
              <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-secondary/5 to-transparent group-hover:opacity-100" />
              <CardHeader className="relative z-10 pb-4 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-transform duration-300 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 group-hover:scale-110">
                  <Star className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl font-bold">Espiritualidad</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base leading-relaxed text-center">
                  Oración y contemplación siguiendo el ejemplo de María y San Vicente
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden transition-all duration-500 border-0 shadow-lg group hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-card to-background">
              <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:opacity-100" />
              <CardHeader className="relative z-10 pb-4 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-transform duration-300 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">Servicio</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base leading-relaxed text-center">
                  Compromiso con los más necesitados a través de obras de caridad
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden transition-all duration-500 border-0 shadow-lg group hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-card to-background">
              <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-secondary/5 to-transparent group-hover:opacity-100" />
              <CardHeader className="relative z-10 pb-4 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-transform duration-300 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 group-hover:scale-110">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl font-bold">Comunidad</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base leading-relaxed text-center">
                  Fraternidad y apoyo mutuo en el camino de fe y servicio
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-10" />
        <div className="container relative z-10 px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold">Nuestros Valores</h2>
            <p className="max-w-2xl mx-auto text-xl text-primary-foreground/80">
              Los valores que nos definen como comunidad de fe
            </p>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center group">
              <div className="mb-6 text-6xl font-black transition-transform duration-300 group-hover:scale-110">Fe</div>
              <p className="text-lg font-medium text-primary-foreground/90">Confianza plena en Dios</p>
            </div>
            <div className="text-center group">
              <div className="mb-6 text-6xl font-black transition-transform duration-300 group-hover:scale-110">
                Caridad
              </div>
              <p className="text-lg font-medium text-primary-foreground/90">Amor al prójimo en acción</p>
            </div>
            <div className="text-center group">
              <div className="mb-6 text-6xl font-black transition-transform duration-300 group-hover:scale-110">
                Misión
              </div>
              <p className="text-lg font-medium text-primary-foreground/90">Evangelización y servicio</p>
            </div>
            <div className="text-center group">
              <div className="mb-6 text-6xl font-black transition-transform duration-300 group-hover:scale-110">
                Juventud
              </div>
              <p className="text-lg font-medium text-primary-foreground/90">Energía y esperanza</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-balance">Testimonios</h2>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground text-pretty">
              Escucha las experiencias transformadoras de nuestros jóvenes
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-card to-background">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mb-6 text-base italic leading-relaxed text-center">
                  "JMV me ha ayudado a crecer en mi fe y a descubrir mi vocación de servicio. Aquí he encontrado una
                  familia que me acompaña en mi caminar cristiano."
                </blockquote>
                <div className="text-center">
                  <div className="text-lg font-bold">María González</div>
                  <div className="text-muted-foreground">Capítulo Santo Domingo</div>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-card to-background">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mb-6 text-base italic leading-relaxed text-center">
                  "La formación que recibimos nos prepara para ser líderes en nuestras comunidades. Es increíble ver
                  cómo podemos impactar vidas siguiendo el ejemplo de San Vicente."
                </blockquote>
                <div className="text-center">
                  <div className="text-lg font-bold">Carlos Martínez</div>
                  <div className="text-muted-foreground">Capítulo Santiago</div>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-card to-background">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mb-6 text-base italic leading-relaxed text-center">
                  "Las misiones de verano han sido transformadoras. Servir a los más necesitados me ha enseñado el
                  verdadero significado del amor cristiano."
                </blockquote>
                <div className="text-center">
                  <div className="text-lg font-bold">Ana Rodríguez</div>
                  <div className="text-muted-foreground">Capítulo La Vega</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-card to-background lg:py-28">
        <div className="container px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-balance">Próximas Actividades</h2>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground text-pretty">
              Únete a nuestros próximos eventos y actividades de formación
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="overflow-hidden transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="font-medium border-0 bg-primary/10 text-primary">
                    Formación
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    15 Dic 2024
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold transition-colors group-hover:text-primary">
                  Taller de Liderazgo JMV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  Santo Domingo
                  <Clock className="w-4 h-4 ml-4 mr-1" />
                  9:00 AM
                </div>
                <CardDescription className="mb-6 text-base leading-relaxed">
                  Desarrollo de habilidades de liderazgo cristiano para jóvenes comprometidos
                </CardDescription>
                <Button
                  className="w-full transition-all duration-200 bg-transparent shadow-md hover:shadow-lg"
                  variant="outline"
                >
                  Más información
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="font-medium border-0 bg-secondary/10 text-secondary">
                    Misión
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    22 Dic 2024
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold transition-colors group-hover:text-primary">
                  Misión de Verano
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  Monte Plata
                  <Clock className="w-4 h-4 ml-4 mr-1" />
                  7:00 AM
                </div>
                <CardDescription className="mb-6 text-base leading-relaxed">
                  Experiencia misionera de servicio a comunidades rurales necesitadas
                </CardDescription>
                <Button
                  className="w-full transition-all duration-200 bg-transparent shadow-md hover:shadow-lg"
                  variant="outline"
                >
                  Más información
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="font-medium border-0 bg-primary/10 text-primary">
                    Espiritualidad
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    28 Dic 2024
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold transition-colors group-hover:text-primary">
                  Vigilia Mariana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  Santiago
                  <Clock className="w-4 h-4 ml-4 mr-1" />
                  8:00 PM
                </div>
                <CardDescription className="mb-6 text-base leading-relaxed">
                  Noche de oración y reflexión en honor a la Virgen María
                </CardDescription>
                <Button
                  className="w-full transition-all duration-200 bg-transparent shadow-md hover:shadow-lg"
                  variant="outline"
                >
                  Más información
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="px-8 py-4 text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Link href="/eventos" className="flex items-center gap-2">
                Ver todos los eventos
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

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
                <li>
                  <Link href="/quienes-somos" className="transition-colors duration-200 hover:text-secondary">
                    Quiénes Somos
                  </Link>
                </li>
                <li>
                  <Link href="/formacion" className="transition-colors duration-200 hover:text-secondary">
                    Formación
                  </Link>
                </li>
                <li>
                  <Link href="/eventos" className="transition-colors duration-200 hover:text-secondary">
                    Eventos
                  </Link>
                </li>
                <li>
                  <Link href="/noticias" className="transition-colors duration-200 hover:text-secondary">
                    Noticias
                  </Link>
                </li>
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
                <Link href="#" className="transition-all duration-200 hover:text-secondary hover:scale-110">
                  Instagram
                </Link>
                <Link href="#" className="transition-all duration-200 hover:text-secondary hover:scale-110">
                  Facebook
                </Link>
                <Link href="#" className="transition-all duration-200 hover:text-secondary hover:scale-110">
                  YouTube
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-12 text-center border-t border-primary-foreground/20 text-primary-foreground/80">
            <p>&copy; 2024 JMV República Dominicana. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
