import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, Filter, Calendar, User } from "lucide-react"
import Link from "next/link"

// Dummy news data
const news = [
  {
    id: "mision-monte-plata-2024",
    title: "Exitosa Misión de Verano en Monte Plata",
    excerpt:
      "Más de 30 jóvenes participaron en la misión anual llevando esperanza y servicios básicos a comunidades rurales",
    content: "La misión de verano 2024 en Monte Plata fue un éxito rotundo...",
    date: "2024-11-28",
    author: "Coordinación Nacional JMV",
    category: "Misiones",
    image: "/dominican-republic-mission.png",
    featured: true,
  },
  {
    id: "nuevo-capitulo-barahona",
    title: "Inauguración del Capítulo JMV Barahona",
    excerpt:
      "Se establece un nuevo capítulo en la región sur del país, expandiendo la presencia de JMV a nivel nacional",
    content: "Con gran alegría anunciamos la inauguración del capítulo JMV Barahona...",
    date: "2024-11-25",
    author: "Equipo de Comunicaciones",
    category: "Noticias",
    image: "/youth-group-inauguration.png",
    featured: false,
  },
  {
    id: "encuentro-formadores-2024",
    title: "Encuentro Nacional de Formadores",
    excerpt:
      "Formadores de todo el país se reunieron para compartir experiencias y actualizar metodologías de enseñanza",
    content: "El pasado fin de semana se realizó el Encuentro Nacional de Formadores...",
    date: "2024-11-20",
    author: "Área de Formación",
    category: "Formación",
    image: "/teachers-training.png",
    featured: false,
  },
  {
    id: "donacion-alimentos-navidad",
    title: "Campaña Navideña de Donación de Alimentos",
    excerpt: "JMV lanza su campaña anual para recolectar alimentos y regalos para familias necesitadas en Navidad",
    content: "Como cada año, JMV República Dominicana lanza su campaña navideña...",
    date: "2024-11-15",
    author: "Área de Servicio Social",
    category: "Servicio",
    image: "/christmas-food-donation.png",
    featured: true,
  },
  {
    id: "retiro-adviento-2024",
    title: "Retiro de Adviento: Preparando el Corazón",
    excerpt: "Jóvenes de diferentes capítulos participaron en un retiro espiritual de preparación para la Navidad",
    content: "En el marco de la preparación para la Navidad, se realizó el retiro de Adviento...",
    date: "2024-11-10",
    author: "Área de Espiritualidad",
    category: "Espiritualidad",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: "reconocimiento-unesco",
    title: "JMV RD Recibe Reconocimiento de UNESCO",
    excerpt: "La organización fue reconocida por su trabajo en educación para la paz y desarrollo sostenible",
    content: "Es un honor para JMV República Dominicana haber recibido el reconocimiento...",
    date: "2024-11-05",
    author: "Dirección Nacional",
    category: "Reconocimientos",
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
  },
]

export default function NoticiasPage() {
  const featuredNews = news.filter((article) => article.featured)
  const regularNews = news.filter((article) => !article.featured)

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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-card via-background to-card py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Calendar className="mr-2 h-4 w-4" />
              Últimas Noticias
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">Noticias JMV</h1>
            <p className="text-xl text-muted-foreground">
              Mantente informado sobre nuestras actividades, logros y el impacto de nuestro trabajo
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
                <Input placeholder="Buscar noticias..." className="pl-10 w-full sm:w-64" />
              </div>

              <Select>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="noticias">Noticias</SelectItem>
                  <SelectItem value="misiones">Misiones</SelectItem>
                  <SelectItem value="formacion">Formación</SelectItem>
                  <SelectItem value="espiritualidad">Espiritualidad</SelectItem>
                  <SelectItem value="servicio">Servicio</SelectItem>
                  <SelectItem value="reconocimientos">Reconocimientos</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Fecha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las fechas</SelectItem>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mes</SelectItem>
                  <SelectItem value="year">Este año</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              {news.length} artículos encontrados
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-16">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8">Noticias Destacadas</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {featuredNews.map((article) => (
                <Card key={article.id} className="group cursor-pointer transition-all hover:shadow-lg">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="text-sm text-muted-foreground">
                        {new Date(article.date).toLocaleDateString("es-DO", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 line-clamp-3">{article.excerpt}</CardDescription>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="mr-2 h-4 w-4" />
                        {article.author}
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/noticias/${article.id}`}>Leer más</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular News Grid */}
      <section className="py-16 bg-card">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Todas las Noticias</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularNews.map((article) => (
              <Card
                key={article.id}
                className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{article.category}</Badge>
                    <div className="text-sm text-muted-foreground">
                      {new Date(article.date).toLocaleDateString("es-DO", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-2">{article.excerpt}</CardDescription>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">Por {article.author}</div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/noticias/${article.id}`}>Leer más</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Cargar más noticias
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
