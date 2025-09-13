import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Users, BookOpen, MapPin } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
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
      <section className="relative overflow-hidden bg-gradient-to-br from-card via-background to-card py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/dominican-youth-service.png')] bg-cover bg-center opacity-10" />
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Star className="mr-2 h-4 w-4" />
                Juventud Mariana Vicenciana
              </Badge>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Juventud Mariana Vicenciana
              <span className="block text-primary">República Dominicana</span>
            </h1>

            <p className="mb-8 text-xl text-muted-foreground sm:text-2xl">
              Formación, oración y servicio, al estilo de María y San Vicente de Paúl
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/unete">Únete a JMV</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent">
                <Link href="/quienes-somos">Conoce nuestra misión</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Cards Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Formación</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Crecimiento espiritual y humano a través de la catequesis y el liderazgo cristiano
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Espiritualidad</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Oración y contemplación siguiendo el ejemplo de María y San Vicente
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Servicio</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Compromiso con los más necesitados a través de obras de caridad
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Comunidad</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Fraternidad y apoyo mutuo en el camino de fe y servicio
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Banner */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-8 text-3xl font-bold">Nuestros Valores</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mb-4 text-4xl font-bold">Fe</div>
                <p className="text-primary-foreground/80">Confianza plena en Dios</p>
              </div>
              <div className="text-center">
                <div className="mb-4 text-4xl font-bold">Caridad</div>
                <p className="text-primary-foreground/80">Amor al prójimo en acción</p>
              </div>
              <div className="text-center">
                <div className="mb-4 text-4xl font-bold">Misión</div>
                <p className="text-primary-foreground/80">Evangelización y servicio</p>
              </div>
              <div className="text-center">
                <div className="mb-4 text-4xl font-bold">Juventud</div>
                <p className="text-primary-foreground/80">Energía y esperanza</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Testimonios</h2>
            <p className="text-muted-foreground text-lg">Escucha las experiencias de nuestros jóvenes</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mb-4 text-sm italic">
                  "JMV me ha ayudado a crecer en mi fe y a descubrir mi vocación de servicio. Aquí he encontrado una
                  familia que me acompaña en mi caminar cristiano."
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold">María González</div>
                  <div className="text-muted-foreground">Capítulo Santo Domingo</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mb-4 text-sm italic">
                  "La formación que recibimos nos prepara para ser líderes en nuestras comunidades. Es increíble ver
                  cómo podemos impactar vidas siguiendo el ejemplo de San Vicente."
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold">Carlos Martínez</div>
                  <div className="text-muted-foreground">Capítulo Santiago</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mb-4 text-sm italic">
                  "Las misiones de verano han sido transformadoras. Servir a los más necesitados me ha enseñado el
                  verdadero significado del amor cristiano."
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold">Ana Rodríguez</div>
                  <div className="text-muted-foreground">Capítulo La Vega</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="bg-card py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Próximas Actividades</h2>
            <p className="text-muted-foreground text-lg">Únete a nuestros próximos eventos y actividades</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Formación</Badge>
                  <div className="text-sm text-muted-foreground">15 Dic 2024</div>
                </div>
                <CardTitle className="text-xl">Taller de Liderazgo JMV</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2 text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  Santo Domingo
                </div>
                <CardDescription>
                  Desarrollo de habilidades de liderazgo cristiano para jóvenes comprometidos
                </CardDescription>
                <Button className="mt-4 w-full bg-transparent" variant="outline">
                  Más información
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Misión</Badge>
                  <div className="text-sm text-muted-foreground">22 Dic 2024</div>
                </div>
                <CardTitle className="text-xl">Misión de Verano</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2 text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  Monte Plata
                </div>
                <CardDescription>Experiencia misionera de servicio a comunidades rurales necesitadas</CardDescription>
                <Button className="mt-4 w-full bg-transparent" variant="outline">
                  Más información
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Espiritualidad</Badge>
                  <div className="text-sm text-muted-foreground">28 Dic 2024</div>
                </div>
                <CardTitle className="text-xl">Vigilia Mariana</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2 text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  Santiago
                </div>
                <CardDescription>Noche de oración y reflexión en honor a la Virgen María</CardDescription>
                <Button className="mt-4 w-full bg-transparent" variant="outline">
                  Más información
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link href="/eventos">Ver todos los eventos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground">
                  <Star className="h-4 w-4 text-primary" />
                </div>
                <span className="font-heading text-lg font-semibold">JMV RD</span>
              </div>
              <p className="text-sm text-primary-foreground/80">Juventud Mariana Vicenciana República Dominicana</p>
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
              <ul className="space-y-2 text-sm text-primary-foreground/80">
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

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
            <p>&copy; 2024 JMV República Dominicana. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
