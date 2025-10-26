import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Star, BookOpen, Users, Heart, Download, ExternalLink, FileText, Video, Headphones, ArrowRight, User } from "lucide-react"
import Link from "next/link"
import Navbar from "@/src/components/shared/Navbar"

export default function FormacionPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-card via-background to-card lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="px-4 py-2 mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
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
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Módulos de Formación</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Nuestro programa formativo está estructurado en ciclos progresivos que acompañan el crecimiento espiritual
              y humano
            </p>
          </div>

          <Tabs defaultValue="catequesis" className="max-w-6xl mx-auto">
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
                    <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <li>• Historia de la salvación</li>
                      <li>• Los sacramentos</li>
                      <li>• Vida de San Vicente de Paúl</li>
                      <li>• Devoción mariana</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
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
                    <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <li>• Oración contemplativa</li>
                      <li>• Discernimiento vocacional</li>
                      <li>• Espiritualidad vicenciana</li>
                      <li>• Compromiso social</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
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
                    <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <li>• Comunicación efectiva</li>
                      <li>• Trabajo en equipo</li>
                      <li>• Resolución de conflictos</li>
                      <li>• Planificación pastoral</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
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
                    <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <li>• Diagnóstico comunitario</li>
                      <li>• Diseño de proyectos</li>
                      <li>• Gestión de recursos</li>
                      <li>• Evaluación de impacto</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
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
                    <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <li>• Dignidad de la persona humana</li>
                      <li>• Bien común y solidaridad</li>
                      <li>• Justicia social</li>
                      <li>• Opción preferencial por los pobres</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
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
                    <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <li>• Análisis de la realidad social</li>
                      <li>• Promoción humana integral</li>
                      <li>• Advocacy y incidencia</li>
                      <li>• Construcción de paz</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
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
                    <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <li>• Espiritualidad misionera</li>
                      <li>• Metodología de evangelización</li>
                      <li>• Trabajo con comunidades</li>
                      <li>• Primeros auxilios</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
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
                    <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <li>• Convivencia comunitaria</li>
                      <li>• Actividades pastorales</li>
                      <li>• Proyectos de desarrollo</li>
                      <li>• Reflexión y sistematización</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
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
      <section className="py-16 bg-card lg:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Recursos de Formación</h2>
            <p className="text-lg text-muted-foreground">Materiales complementarios para profundizar en tu formación</p>
          </div>

          <div className="grid gap-6 px-10 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <FileText className="w-5 h-5 text-primary" />
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
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Video className="w-5 h-5 text-primary" />
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
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver online
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Headphones className="w-5 h-5 text-primary" />
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
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Escuchar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <BookOpen className="w-5 h-5 text-primary" />
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
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Acceder
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Users className="w-5 h-5 text-primary" />
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
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Heart className="w-5 h-5 text-primary" />
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
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
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
      <footer className="py-12 bg-foreground text-background">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center mb-4 space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background">
                  <Star className="w-4 h-4 text-foreground" />
                </div>
                <span className="text-lg font-semibold font-heading">JMV RD</span>
              </div>
              <p className="text-sm text-background/80">Juventud Mariana Vicenciana República Dominicana</p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Enlaces</h3>
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
              <h3 className="mb-4 font-semibold">Contacto</h3>
              <ul className="space-y-2 text-sm text-background/80">
                <li>Santo Domingo, RD</li>
                <li>info@jmvrd.org</li>
                <li>+1 (809) 123-4567</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Síguenos</h3>
              <div className="flex space-x-4">
                <Link href="#" className="transition-colors hover:text-secondary">
                  Instagram
                </Link>
                <Link href="#" className="transition-colors hover:text-secondary">
                  Facebook
                </Link>
                <Link href="#" className="transition-colors hover:text-secondary">
                  YouTube
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 text-sm text-center border-t border-background/20 text-background/80">
            <p>&copy; 2024 JMV República Dominicana. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
