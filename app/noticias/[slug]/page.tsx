import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, Calendar, User, ArrowLeft, Share2, Clock } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Dummy news data (in a real app, this would come from a database)
const newsArticles = {
  "mision-monte-plata-2024": {
    id: "mision-monte-plata-2024",
    title: "Exitosa Misión de Verano en Monte Plata",
    excerpt:
      "Más de 30 jóvenes participaron en la misión anual llevando esperanza y servicios básicos a comunidades rurales",
    content: `
      La misión de verano 2024 en Monte Plata fue un éxito rotundo, con la participación de más de 30 jóvenes de diferentes capítulos de JMV República Dominicana. Durante dos semanas intensas, nuestros misioneros llevaron esperanza, servicios básicos y el mensaje del Evangelio a comunidades rurales que más lo necesitan.

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
            <Link href="/noticias" className="text-sm font-medium text-primary">
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

      {/* Back Button */}
      <div className="container py-4">
        <Button variant="ghost" asChild>
          <Link href="/noticias">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a noticias
          </Link>
        </Button>
      </div>

      {/* Article Content */}
      <article className="py-8">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{article.category}</Badge>
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{article.excerpt}</p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {article.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.date).toLocaleDateString("es-DO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {article.readTime} de lectura
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-video overflow-hidden rounded-lg mb-8">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Article Body */}
            <div className="prose prose-gray max-w-none mb-12">
              <div className="whitespace-pre-line leading-relaxed">
                {article.content.split("\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                        {paragraph.replace("## ", "")}
                      </h2>
                    )
                  }
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                        {paragraph.replace("### ", "")}
                      </h3>
                    )
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <li key={index} className="ml-4">
                        {paragraph.replace("- ", "")}
                      </li>
                    )
                  }
                  if (paragraph.trim() === "") {
                    return <br key={index} />
                  }
                  return (
                    <p key={index} className="mb-4 text-muted-foreground">
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </div>

            <Separator className="my-12" />

            {/* Related Articles */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Artículos Relacionados</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedArticles.map((relatedArticle) => (
                  <Card
                    key={relatedArticle.id}
                    className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={relatedArticle.image || "/placeholder.svg"}
                        alt={relatedArticle.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {relatedArticle.category}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {new Date(relatedArticle.date).toLocaleDateString("es-DO", {
                            day: "numeric",
                            month: "short",
                          })}
                        </div>
                      </div>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedArticle.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-2">{relatedArticle.excerpt}</CardDescription>
                      <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto" asChild>
                        <Link href={`/noticias/${relatedArticle.id}`}>Leer más →</Link>
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
