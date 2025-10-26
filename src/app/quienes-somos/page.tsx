import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Star, Heart, Users, BookOpen, Calendar, Award, Target, ArrowRight, MapPin, Phone, Mail, Church, User } from "lucide-react"
import Link from "next/link"
import Navbar from "@/src/components/shared/Navbar"

export default function QuienesSomosPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="px-6 py-3 mb-8 text-sm font-medium shadow-lg">
              <Star className="w-4 h-4 mr-2" />
              Nuestra Historia y Misión
            </Badge>
            <h1 className="mb-8 text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text">
              Quiénes Somos
            </h1>
            <p className="max-w-3xl mx-auto text-xl leading-relaxed text-muted-foreground">
              Descubre la historia, misión y carisma de la Juventud Mariana Vicenciana en República Dominicana. Una
              comunidad de jóvenes comprometidos con la fe, el servicio y la transformación social.
            </p>
            <div className="flex flex-col justify-center gap-4 mt-10 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="shadow-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                <Link href="/unete">
                  Únete a Nosotros
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-2 hover:bg-primary/5">
                <Link href="/formacion">Conoce nuestra Formación</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-2 hover:bg-primary/5">
                <Link href="/consejos">Miembros Nacionales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Historia Section */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
              <div className="space-y-8">
                <div>
                  <Badge variant="outline" className="mb-4">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Nuestra Historia
                  </Badge>
                  <h2 className="mb-6 text-4xl font-bold text-balance">Una Tradición de Servicio y Fe</h2>
                </div>
                <div className="space-y-6 leading-relaxed text-muted-foreground">
                  <p className="text-lg">
                    La Juventud Mariana Vicenciana (JMV) nace del carisma de{" "}
                    <strong className="text-primary">San Vicente de Paúl</strong> y
                    <strong className="text-primary"> Santa Luisa de Marillac</strong>, quienes dedicaron sus vidas al
                    servicio de los más necesitados siguiendo el ejemplo de María.
                  </p>
                  <p className="text-lg">
                    En República Dominicana, JMV inició sus actividades en{" "}
                    <strong className="text-secondary">1995</strong>, estableciendo el primer capítulo en Santo Domingo.
                    Desde entonces, hemos crecido hasta convertirnos en una red nacional de jóvenes comprometidos con la
                    evangelización y el servicio social.
                  </p>
                  <p className="text-lg">
                    Nuestra presencia se extiende por todo el territorio nacional, con capítulos activos en las
                    principales ciudades del país, formando líderes juveniles que transforman sus comunidades desde la
                    fe y el amor cristiano.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">29</div>
                    <div className="text-sm text-muted-foreground">Años de Historia</div>
                  </div>
                  <div className="w-px h-12 bg-border"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary">15+</div>
                    <div className="text-sm text-muted-foreground">Capítulos Activos</div>
                  </div>
                  <div className="w-px h-12 bg-border"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">500+</div>
                    <div className="text-sm text-muted-foreground">Jóvenes Activos</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="flex items-center justify-center shadow-2xl h-80 w-80 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                    <div className="flex items-center justify-center w-64 h-64 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-sm">
                      <Church className="w-32 h-32 text-primary drop-shadow-lg" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center w-16 h-16 rounded-full shadow-lg -top-4 -right-4 bg-accent">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute flex items-center justify-center w-12 h-12 rounded-full shadow-lg -bottom-4 -left-4 bg-secondary">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carisma Vicenciano Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-card via-background to-muted">
        <div className="container">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-6">
              <Target className="w-4 h-4 mr-2" />
              Nuestro Carisma
            </Badge>
            <h2 className="mb-6 text-4xl font-bold text-balance">Carisma Vicenciano</h2>
            <p className="max-w-3xl mx-auto text-xl leading-relaxed text-muted-foreground">
              Nuestro carisma se fundamenta en cuatro pilares esenciales que guían nuestra misión y dan sentido a
              nuestro servicio
            </p>
          </div>

          <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4">
            <Card className="transition-all duration-300 border-0 shadow-lg group hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-background to-card">
              <CardHeader className="pb-4 text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-all duration-300 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30">
                  <BookOpen className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-primary">Formación</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Crecimiento integral de la persona a través de la catequesis, el estudio de la Doctrina Social de la
                  Iglesia y el desarrollo de habilidades de liderazgo cristiano.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 border-0 shadow-lg group hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-background to-card">
              <CardHeader className="pb-4 text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-all duration-300 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/20 group-hover:from-secondary/20 group-hover:to-secondary/30">
                  <Star className="w-10 h-10 text-secondary" />
                </div>
                <CardTitle className="text-2xl font-bold text-secondary">Oración</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Vida espiritual profunda centrada en la Eucaristía, la devoción mariana y la contemplación, siguiendo
                  el ejemplo de María en su entrega total a Dios.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 border-0 shadow-lg group hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-background to-card">
              <CardHeader className="pb-4 text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-all duration-300 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/20 group-hover:from-accent/20 group-hover:to-accent/30">
                  <Heart className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="text-2xl font-bold text-accent">Servicio</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Compromiso activo con los más pobres y marginados, llevando esperanza y dignidad a través de obras
                  concretas de caridad y justicia social.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 border-0 shadow-lg group hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-background to-card">
              <CardHeader className="pb-4 text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-all duration-300 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/20 group-hover:from-primary/20 group-hover:to-secondary/30">
                  <Target className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-primary">Misión</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Evangelización activa y testimonio de vida cristiana, llevando el mensaje del Evangelio a todos los
                  rincones de nuestra sociedad.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              Nuestra Trayectoria
            </Badge>
            <h2 className="mb-6 text-4xl font-bold text-balance">Momentos que Marcaron Historia</h2>
            <p className="max-w-3xl mx-auto text-xl leading-relaxed text-muted-foreground">
              Un recorrido por los hitos más importantes en la historia de JMV República Dominicana
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-12">
              <div className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground group-hover:shadow-xl">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <div className="w-px h-20 bg-gradient-to-b from-primary to-transparent"></div>
                </div>
                <div className="flex-1 pb-12">
                  <div className="inline-block px-3 py-1 mb-3 text-sm font-semibold rounded-full text-primary bg-primary/10">
                    1995
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">Fundación del Primer Capítulo</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Se establece el primer capítulo de JMV en Santo Domingo, marcando el inicio de nuestro movimiento
                    juvenil en República Dominicana con un grupo de 12 jóvenes visionarios.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-br from-secondary to-accent text-primary-foreground group-hover:shadow-xl">
                    <Users className="w-8 h-8" />
                  </div>
                  <div className="w-px h-20 bg-gradient-to-b from-secondary to-transparent"></div>
                </div>
                <div className="flex-1 pb-12">
                  <div className="inline-block px-3 py-1 mb-3 text-sm font-semibold rounded-full text-secondary bg-secondary/10">
                    2001
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">Expansión Nacional</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Apertura de capítulos en Santiago, La Vega y otras ciudades importantes, consolidando nuestra
                    presencia a nivel nacional con más de 150 jóvenes activos.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-br from-accent to-primary text-primary-foreground group-hover:shadow-xl">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="w-px h-20 bg-gradient-to-b from-accent to-transparent"></div>
                </div>
                <div className="flex-1 pb-12">
                  <div className="inline-block px-3 py-1 mb-3 text-sm font-semibold rounded-full text-accent bg-accent/10">
                    2008
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">Reconocimiento Oficial</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    La Conferencia del Episcopado Dominicano reconoce oficialmente a JMV como movimiento juvenil
                    católico nacional, validando nuestro compromiso y dedicación.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground group-hover:shadow-xl">
                    <Heart className="w-8 h-8" />
                  </div>
                  <div className="w-px h-20 bg-gradient-to-b from-primary to-transparent"></div>
                </div>
                <div className="flex-1 pb-12">
                  <div className="inline-block px-3 py-1 mb-3 text-sm font-semibold rounded-full text-primary bg-primary/10">
                    2015
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">Programa de Misiones</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Lanzamiento del programa nacional de misiones juveniles, llevando esperanza a comunidades rurales y
                    marginadas del país, impactando más de 50 comunidades.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-br from-secondary to-accent text-primary-foreground group-hover:shadow-xl">
                    <Star className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 mb-3 text-sm font-semibold rounded-full text-secondary bg-secondary/10">
                    2024
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">Renovación Digital</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Implementación de nuevas plataformas digitales para fortalecer la formación y comunicación entre
                    todos los capítulos del país, alcanzando una nueva generación de jóvenes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 overflow-hidden lg:py-28 bg-gradient-to-br from-primary via-secondary to-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="container relative text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-8 text-white bg-white/20 border-white/30">
              <Heart className="w-4 h-4 mr-2" />
              Únete a Nosotros
            </Badge>
            <h2 className="mb-6 text-4xl font-bold lg:text-5xl text-balance">¿Te Sientes Llamado a Servir?</h2>
            <p className="max-w-3xl mx-auto mb-10 text-xl leading-relaxed text-primary-foreground/90">
              Únete a nuestra familia y descubre tu vocación de servicio. Juntos podemos transformar vidas y construir
              un mundo más justo y fraterno.
            </p>
            <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-white shadow-xl text-primary hover:bg-white/90"
              >
                <Link href="/unete">
                  Únete a JMV
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-white bg-transparent border-2 border-white shadow-xl hover:bg-white hover:text-primary"
              >
                <Link href="/formacion">Conoce nuestra Formación</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-white bg-gray-900">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6 space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold font-heading">JMV RD</span>
                  <p className="text-sm text-white/80">Juventud Mariana Vicenciana</p>
                </div>
              </div>
              <p className="max-w-md leading-relaxed text-white/80">
                Formando jóvenes líderes comprometidos con la fe, el servicio y la transformación social desde 1995.
              </p>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold">Enlaces Rápidos</h3>
              <ul className="space-y-3">
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
              <h3 className="mb-6 text-lg font-semibold">Contacto</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-white/80">Santo Domingo, RD</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-white/80">info@jmvrd.org</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-white/80">+1 (809) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-12 border-t border-white/20 md:flex-row">
            <p className="text-sm text-white/60">
              &copy; 2024 JMV República Dominicana. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-sm transition-colors text-white/60 hover:text-primary">
                Instagram
              </Link>
              <Link href="#" className="text-sm transition-colors text-white/60 hover:text-primary">
                Facebook
              </Link>
              <Link href="#" className="text-sm transition-colors text-white/60 hover:text-primary">
                YouTube
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
