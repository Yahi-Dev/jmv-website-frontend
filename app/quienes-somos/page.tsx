import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Users, BookOpen, Calendar, Award, Target } from "lucide-react"
import Link from "next/link"

export default function QuienesSomosPage() {
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
            <Link href="/quienes-somos" className="text-sm font-medium text-primary">
              Quiénes Somos
            </Link>
            <Link href="/formacion" className="text-sm font-medium hover:text-primary transition-colors">
              Formación
            </Link>
            <Link href="/eventos" className="text-sm font-medium hover:text-primary transition-colors">
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
              <Star className="mr-2 h-4 w-4" />
              Nuestra Historia
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">Quiénes Somos</h1>
            <p className="text-xl text-muted-foreground">
              Conoce la historia, misión y carisma de la Juventud Mariana Vicenciana en República Dominicana
            </p>
          </div>
        </div>
      </section>

      {/* Historia Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="mb-6 text-3xl font-bold">Nuestra Historia</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    La Juventud Mariana Vicenciana (JMV) nace del carisma de San Vicente de Paúl y Santa Luisa de
                    Marillac, quienes dedicaron sus vidas al servicio de los más necesitados siguiendo el ejemplo de
                    María.
                  </p>
                  <p>
                    En República Dominicana, JMV inició sus actividades en 1995, estableciendo el primer capítulo en
                    Santo Domingo. Desde entonces, hemos crecido hasta convertirnos en una red nacional de jóvenes
                    comprometidos con la evangelización y el servicio social.
                  </p>
                  <p>
                    Nuestra presencia se extiende por todo el territorio nacional, con capítulos activos en las
                    principales ciudades del país, formando líderes juveniles que transforman sus comunidades desde la
                    fe y el amor cristiano.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="h-64 w-64 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="h-48 w-48 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="h-24 w-24 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carisma Vicenciano Section */}
      <section className="bg-card py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Carisma Vicenciano</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Nuestro carisma se fundamenta en cuatro pilares esenciales que guían nuestra misión
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Formación</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Crecimiento integral de la persona a través de la catequesis, el estudio de la Doctrina Social de la
                  Iglesia y el desarrollo de habilidades de liderazgo cristiano.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Oración</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Vida espiritual profunda centrada en la Eucaristía, la devoción mariana y la contemplación, siguiendo
                  el ejemplo de María en su entrega total a Dios.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Servicio</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Compromiso activo con los más pobres y marginados, llevando esperanza y dignidad a través de obras
                  concretas de caridad y justicia social.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Misión</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Evangelización activa y testimonio de vida cristiana, llevando el mensaje del Evangelio a todos los
                  rincones de nuestra sociedad.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestra Trayectoria</h2>
            <p className="text-muted-foreground text-lg">Momentos clave en la historia de JMV República Dominicana</p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="h-16 w-px bg-border"></div>
                </div>
                <div className="flex-1 pb-8">
                  <div className="mb-2 text-sm text-muted-foreground">1995</div>
                  <h3 className="mb-2 text-xl font-semibold">Fundación del Primer Capítulo</h3>
                  <p className="text-muted-foreground">
                    Se establece el primer capítulo de JMV en Santo Domingo, marcando el inicio de nuestro movimiento
                    juvenil en República Dominicana.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="h-16 w-px bg-border"></div>
                </div>
                <div className="flex-1 pb-8">
                  <div className="mb-2 text-sm text-muted-foreground">2001</div>
                  <h3 className="mb-2 text-xl font-semibold">Expansión Nacional</h3>
                  <p className="text-muted-foreground">
                    Apertura de capítulos en Santiago, La Vega y otras ciudades importantes, consolidando nuestra
                    presencia a nivel nacional.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="h-16 w-px bg-border"></div>
                </div>
                <div className="flex-1 pb-8">
                  <div className="mb-2 text-sm text-muted-foreground">2008</div>
                  <h3 className="mb-2 text-xl font-semibold">Reconocimiento Oficial</h3>
                  <p className="text-muted-foreground">
                    La Conferencia del Episcopado Dominicano reconoce oficialmente a JMV como movimiento juvenil
                    católico nacional.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div className="h-16 w-px bg-border"></div>
                </div>
                <div className="flex-1 pb-8">
                  <div className="mb-2 text-sm text-muted-foreground">2015</div>
                  <h3 className="mb-2 text-xl font-semibold">Programa de Misiones</h3>
                  <p className="text-muted-foreground">
                    Lanzamiento del programa nacional de misiones juveniles, llevando esperanza a comunidades rurales y
                    marginadas del país.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Star className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-2 text-sm text-muted-foreground">2024</div>
                  <h3 className="mb-2 text-xl font-semibold">Renovación Digital</h3>
                  <p className="text-muted-foreground">
                    Implementación de nuevas plataformas digitales para fortalecer la formación y comunicación entre
                    todos los capítulos del país.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold">¿Te sientes llamado a servir?</h2>
          <p className="mb-8 text-xl text-primary-foreground/80">
            Únete a nuestra familia y descubre tu vocación de servicio
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/unete">Únete a JMV</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/formacion">Conoce nuestra formación</Link>
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
