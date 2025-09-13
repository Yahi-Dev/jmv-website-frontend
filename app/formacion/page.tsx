import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, BookOpen, Users, Heart, Download, ExternalLink, FileText, Video, Headphones } from "lucide-react"
import Link from "next/link"

export default function FormacionPage() {
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
            <Link href="/formacion" className="text-sm font-medium text-primary">
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
              <BookOpen className="mr-2 h-4 w-4" />
              Crecimiento Integral
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">Formación JMV</h1>
            <p className="text-xl text-muted-foreground">
              Programas de formación integral que fortalecen la fe, desarrollan el liderazgo y preparan para el servicio
            </p>
          </div>
        </div>
      </section>

      {/* Módulos de Formación */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Módulos de Formación</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Nuestro programa formativo está estructurado en ciclos progresivos que acompañan el crecimiento espiritual
              y humano
            </p>
          </div>

          <Tabs defaultValue="catequesis" className="mx-auto max-w-6xl">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="catequesis">Catequesis</TabsTrigger>
              <TabsTrigger value="liderazgo">Liderazgo</TabsTrigger>
              <TabsTrigger value="doctrina">Doctrina Social</TabsTrigger>
              <TabsTrigger value="mision">Misión</TabsTrigger>
            </TabsList>

            <TabsContent value="catequesis" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Nivel Básico</Badge>
                      <Badge variant="outline">12 semanas</Badge>
                    </div>
                    <CardTitle>Fundamentos de la Fe</CardTitle>
                    <CardDescription>
                      Introducción a los principios básicos de la fe católica y el carisma vicenciano
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                      <li>• Historia de la salvación</li>
                      <li>• Los sacramentos</li>
                      <li>• Vida de San Vicente de Paúl</li>
                      <li>• Devoción mariana</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar material
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Nivel Intermedio</Badge>
                      <Badge variant="outline">16 semanas</Badge>
                    </div>
                    <CardTitle>Profundización Espiritual</CardTitle>
                    <CardDescription>
                      Desarrollo de la vida espiritual y comprensión del llamado vocacional
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                      <li>• Oración contemplativa</li>
                      <li>• Discernimiento vocacional</li>
                      <li>• Espiritualidad vicenciana</li>
                      <li>• Compromiso social</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar material
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="liderazgo" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Habilidades</Badge>
                      <Badge variant="outline">10 semanas</Badge>
                    </div>
                    <CardTitle>Liderazgo Cristiano</CardTitle>
                    <CardDescription>
                      Desarrollo de habilidades de liderazgo basadas en valores cristianos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                      <li>• Comunicación efectiva</li>
                      <li>• Trabajo en equipo</li>
                      <li>• Resolución de conflictos</li>
                      <li>• Planificación pastoral</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar material
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Práctica</Badge>
                      <Badge variant="outline">8 semanas</Badge>
                    </div>
                    <CardTitle>Gestión de Proyectos</CardTitle>
                    <CardDescription>
                      Herramientas prácticas para la gestión de proyectos sociales y pastorales
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                      <li>• Diagnóstico comunitario</li>
                      <li>• Diseño de proyectos</li>
                      <li>• Gestión de recursos</li>
                      <li>• Evaluación de impacto</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar material
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="doctrina" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Fundamentos</Badge>
                      <Badge variant="outline">14 semanas</Badge>
                    </div>
                    <CardTitle>Doctrina Social de la Iglesia</CardTitle>
                    <CardDescription>Principios fundamentales de la enseñanza social católica</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                      <li>• Dignidad de la persona humana</li>
                      <li>• Bien común y solidaridad</li>
                      <li>• Justicia social</li>
                      <li>• Opción preferencial por los pobres</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar material
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Aplicación</Badge>
                      <Badge variant="outline">12 semanas</Badge>
                    </div>
                    <CardTitle>Compromiso Social</CardTitle>
                    <CardDescription>
                      Aplicación práctica de la doctrina social en el contexto dominicano
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                      <li>• Análisis de la realidad social</li>
                      <li>• Promoción humana integral</li>
                      <li>• Advocacy y incidencia</li>
                      <li>• Construcción de paz</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar material
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="mision" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Preparación</Badge>
                      <Badge variant="outline">6 semanas</Badge>
                    </div>
                    <CardTitle>Formación Misionera</CardTitle>
                    <CardDescription>Preparación integral para la experiencia misionera</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                      <li>• Espiritualidad misionera</li>
                      <li>• Metodología de evangelización</li>
                      <li>• Trabajo con comunidades</li>
                      <li>• Primeros auxilios</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar material
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Experiencia</Badge>
                      <Badge variant="outline">2 semanas</Badge>
                    </div>
                    <CardTitle>Misión de Verano</CardTitle>
                    <CardDescription>Experiencia práctica de servicio misionero en comunidades rurales</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                      <li>• Convivencia comunitaria</li>
                      <li>• Actividades pastorales</li>
                      <li>• Proyectos de desarrollo</li>
                      <li>• Reflexión y sistematización</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar material
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Recursos Descargables */}
      <section className="bg-card py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recursos de Formación</h2>
            <p className="text-muted-foreground text-lg">Materiales complementarios para profundizar en tu formación</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Manual del Formador</CardTitle>
                    <CardDescription>Guía completa para formadores JMV</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Videos Formativos</CardTitle>
                    <CardDescription>Serie de videos sobre carisma vicenciano</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ver online
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Headphones className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Podcast JMV</CardTitle>
                    <CardDescription>Reflexiones y testimonios semanales</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Escuchar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Biblioteca Digital</CardTitle>
                    <CardDescription>Textos clásicos de espiritualidad vicenciana</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Acceder
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Dinámicas Grupales</CardTitle>
                    <CardDescription>Actividades para encuentros formativos</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Oraciones JMV</CardTitle>
                    <CardDescription>Colección de oraciones y reflexiones</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold">¿Listo para comenzar tu formación?</h2>
          <p className="mb-8 text-xl text-primary-foreground/80">
            Inicia tu camino de crecimiento espiritual y liderazgo cristiano
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/unete">Inscríbete ahora</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/eventos">Ver próximos talleres</Link>
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
