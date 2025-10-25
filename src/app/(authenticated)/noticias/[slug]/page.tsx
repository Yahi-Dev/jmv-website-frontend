import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Separator } from "@/src/components/ui/separator"
import { Star, Calendar, User, ArrowLeft, Share2, Clock, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import Navbar from "@/src/components/Navbar"

// Dummy news data (in a real app, this would come from a database)
const newsArticles = {
  "mision-monte-plata-2024": {
    id: "mision-monte-plata-2024",
    title: "Exitosa Misión de Verano en Monte Plata",
    excerpt:
      "Más de 30 jóvenes participaron en la misión anual llevando esperanza y servicios básicos a comunidades rurales",
    content: `La misión de verano 2024 en Monte Plata fue un éxito rotundo, con la participación de más de 30 jóvenes de diferentes capítulos de JMV República Dominicana. Durante dos semanas intensas, nuestros misioneros llevaron esperanza, servicios básicos y el mensaje del Evangelio a comunidades rurales que más lo necesitan.

      ## Actividades Realizadas

      Durante la misión se desarrollaron múltiples actividades que impactaron positivamente a más de 500 familias de la región:

      ### Servicios de Salud
      - Jornadas médicas gratuitas con especialistas voluntarios
      - Consultas de medicina general y pediatría
      - Entrega de medicamentos básicos
      - Charlas de prevención y educación sanitaria

      ### Educación y Formación
      - Talleres de alfabetización para adultos
      - Refuerzo escolar para niños y adolescentes
      - Capacitaciones en oficios básicos
      - Formación en valores cristianos

      ### Infraestructura Comunitaria
      - Reparación de la escuela local
      - Construcción de letrinas sanitarias
      - Mejoramiento del sistema de agua potable
      - Pintura y mantenimiento del centro comunitario

      ## Testimonios de los Participantes

      "Esta experiencia ha transformado mi vida. Ver la alegría en los rostros de los niños y la gratitud de las familias me ha enseñado el verdadero significado del servicio cristiano", compartió María González, participante del Capítulo Santo Domingo.

      Carlos Martínez, coordinador de la misión, expresó: "Cada año confirmamos que el carisma vicenciano sigue vivo en nuestros jóvenes. Su entrega y compromiso con los más necesitados es verdaderamente inspirador".

      ## Impacto y Resultados

      Los resultados de la misión superaron las expectativas:
      - 500+ familias beneficiadas directamente
      - 150 consultas médicas realizadas
      - 80 niños participaron en actividades educativas
      - 25 adultos completaron talleres de capacitación
      - 3 proyectos de infraestructura completados

      ## Agradecimientos

      JMV República Dominicana agradece a todos los voluntarios, colaboradores y donantes que hicieron posible esta misión. Especial reconocimiento al Ministerio de Salud Pública, la Alcaldía de Monte Plata y las organizaciones locales que apoyaron nuestro trabajo.

      La próxima misión de verano está programada para julio de 2025. Los interesados en participar pueden contactar a sus capítulos locales para más información sobre los requisitos y proceso de selección.
    `,
    date: "2024-11-28",
    author: "Coordinación Nacional JMV",
    category: "Misiones",
    image: "/dominican-republic-mission.png",
    readTime: "5 min",
    tags: ["Misión", "Servicio Social", "Monte Plata", "Verano 2024"],
  },
}

// Related articles
const relatedArticles = [
  {
    id: "preparacion-mision-2025",
    title: "Convocatoria Abierta: Misión de Verano 2025",
    excerpt: "Ya están abiertas las inscripciones para la próxima misión de verano",
    category: "Misiones",
    date: "2024-12-01",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "impacto-misiones-2024",
    title: "Balance Anual: Impacto de las Misiones JMV 2024",
    excerpt: "Revisamos los logros y el impacto de todas nuestras misiones durante el año",
    category: "Informes",
    date: "2024-11-30",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "formacion-misionera",
    title: "Programa de Formación Misionera 2025",
    excerpt: "Nuevo programa de preparación integral para futuros misioneros",
    category: "Formación",
    date: "2024-11-25",
    image: "/placeholder.svg?height=200&width=300",
  },
]

interface NewsDetailPageProps {
  params: {
    slug: string
  }
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const article = newsArticles[params.slug as keyof typeof newsArticles]

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      {/* Navigation */}
      <Navbar />

      {/* Back Button */}
      <div className="container py-6">
        <Button
          variant="ghost"
          asChild
          className="transition-all duration-300 hover:bg-primary/10 hover:text-primary group"
        >
          <Link href="/noticias" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Volver a noticias
          </Link>
        </Button>
      </div>

      {/* Article Content */}
      <article className="pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Badge
                  variant="secondary"
                  className="px-4 py-2 font-medium bg-gradient-to-r from-secondary/20 to-accent/20 text-primary border-secondary/30"
                >
                  {article.category}
                </Badge>
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-primary/30 text-primary bg-primary/5">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-tight text-transparent lg:text-5xl bg-gradient-to-br from-foreground to-primary bg-clip-text">
                {article.title}
              </h1>
              <p className="max-w-3xl mb-8 text-xl leading-relaxed text-muted-foreground">{article.excerpt}</p>

              <div className="flex flex-wrap items-center justify-between gap-6 p-6 border bg-gradient-to-r from-card/50 to-background/50 rounded-xl border-border/50 backdrop-blur-sm">
                <div className="flex items-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="font-medium">{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>
                      {new Date(article.date).toLocaleDateString("es-DO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{article.readTime} de lectura</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="transition-all duration-300 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12 overflow-hidden shadow-2xl aspect-video rounded-2xl">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Article Body */}
            <div className="mb-16 prose prose-gray max-w-none">
              <div className="text-lg leading-relaxed whitespace-pre-line">
                {article.content.split("\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={index} className="mt-12 mb-6 text-3xl font-bold text-foreground">
                        {paragraph.replace("## ", "")}
                      </h2>
                    )
                  }
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3 key={index} className="mt-8 mb-4 text-2xl font-semibold text-primary">
                        {paragraph.replace("### ", "")}
                      </h3>
                    )
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <li key={index} className="mb-2 ml-6 text-muted-foreground">
                        {paragraph.replace("- ", "")}
                      </li>
                    )
                  }
                  if (paragraph.trim() === "") {
                    return <br key={index} />
                  }
                  return (
                    <p key={index} className="mb-6 leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </div>

            <Separator className="my-16 bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Related Articles */}
            <div>
              <div className="flex items-center gap-3 mb-12">
                <div className="w-12 h-1 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                <h2 className="text-3xl font-bold">Artículos Relacionados</h2>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                {relatedArticles.map((relatedArticle) => (
                  <Card
                    key={relatedArticle.id}
                    className="overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-background to-card border-border/50"
                  >
                    <div className="overflow-hidden aspect-video">
                      <img
                        src={relatedArticle.image || "/placeholder.svg"}
                        alt={relatedArticle.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant="outline"
                          className="text-xs font-medium border-primary/30 text-primary bg-primary/5"
                        >
                          {relatedArticle.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(relatedArticle.date).toLocaleDateString("es-DO", {
                            day: "numeric",
                            month: "short",
                          })}
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight transition-colors duration-300 line-clamp-2 group-hover:text-primary">
                        {relatedArticle.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <CardDescription className="mb-4 leading-relaxed line-clamp-2">
                        {relatedArticle.excerpt}
                      </CardDescription>
                      <Button variant="ghost" size="sm" className="h-auto p-0 group/btn hover:text-primary" asChild>
                        <Link href={`/noticias/${relatedArticle.id}`} className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Leer más
                          <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="relative py-16 overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="container relative">
          <div className="grid gap-12 md:grid-cols-4">
            <div>
              <div className="flex items-center mb-6 space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold font-heading">JMV RD</span>
                  <p className="text-sm text-white/80">Juventud Mariana Vicenciana</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/90">República Dominicana</p>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold">Enlaces</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/quienes-somos"
                    className="flex items-center gap-2 transition-colors hover:text-white/80 group"
                  >
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    Quiénes Somos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formacion"
                    className="flex items-center gap-2 transition-colors hover:text-white/80 group"
                  >
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    Formación
                  </Link>
                </li>
                <li>
                  <Link href="/eventos" className="flex items-center gap-2 transition-colors hover:text-white/80 group">
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    Eventos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/noticias"
                    className="flex items-center gap-2 transition-colors hover:text-white/80 group"
                  >
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    Noticias
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold">Contacto</h3>
              <ul className="space-y-3 text-sm text-white/90">
                <li>Santo Domingo, RD</li>
                <li>info@jmvrd.org</li>
                <li>+1 (809) 123-4567</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold">Síguenos</h3>
              <div className="flex flex-col space-y-3">
                <Link href="#" className="flex items-center gap-2 transition-colors hover:text-white/80 group">
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  Instagram
                </Link>
                <Link href="#" className="flex items-center gap-2 transition-colors hover:text-white/80 group">
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  Facebook
                </Link>
                <Link href="#" className="flex items-center gap-2 transition-colors hover:text-white/80 group">
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
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
