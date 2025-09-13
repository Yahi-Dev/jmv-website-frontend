import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, Filter, Calendar, User, Clock, ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"

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
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="px-6 py-3 mb-6 text-sm font-medium bg-gradient-to-r from-secondary/20 to-accent/20 border-secondary/30"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Últimas Noticias JMV
            </Badge>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl bg-gradient-to-br from-foreground via-primary to-secondary bg-clip-text">
              Noticias JMV
            </h1>
            <p className="max-w-2xl mx-auto text-xl leading-relaxed text-muted-foreground">
              Mantente informado sobre nuestras actividades, logros y el impacto transformador de nuestro trabajo en las
              comunidades
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-10 py-8 border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute w-4 h-4 -translate-y-1/2 left-4 top-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar noticias..."
                  className="w-full pl-12 sm:w-80 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>

              <Select>
                <SelectTrigger className="w-full sm:w-48 bg-background/80 backdrop-blur-sm border-border/50">
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
                <SelectTrigger className="w-full sm:w-48 bg-background/80 backdrop-blur-sm border-border/50">
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

            <div className="flex items-center gap-3 px-4 py-2 text-sm rounded-lg text-muted-foreground bg-background/50 backdrop-blur-sm">
              <Filter className="w-4 h-4" />
              <span className="font-medium">{news.length} artículos encontrados</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-20 px-15">
          <div className="container">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
              <h2 className="text-3xl font-bold">Noticias Destacadas</h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {featuredNews.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-card to-background border-border/50"
                >
                  <div className="overflow-hidden aspect-video">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant="secondary"
                        className="font-medium bg-gradient-to-r from-secondary/20 to-accent/20 text-primary border-secondary/30"
                      >
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.date).toLocaleDateString("es-DO", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <CardTitle className="text-2xl leading-tight transition-colors duration-300 line-clamp-2 group-hover:text-primary">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <CardDescription className="mb-6 text-base leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </CardDescription>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="w-4 h-4 mr-2" />
                        <span className="font-medium">{article.author}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="group/btn hover:bg-primary/10 hover:text-primary"
                      >
                        <Link href={`/noticias/${article.id}`} className="flex items-center gap-2">
                          Leer más
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
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
      <section className="py-20 px-15 bg-gradient-to-br from-card/20 via-background to-card/20">
        <div className="container">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-1 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
            <h2 className="text-3xl font-bold">Todas las Noticias</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regularNews.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-background to-card border-border/50"
              >
                <div className="overflow-hidden aspect-video">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="font-medium border-primary/30 text-primary bg-primary/5">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString("es-DO", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight transition-colors duration-300 line-clamp-2 group-hover:text-primary">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <CardDescription className="mb-4 leading-relaxed line-clamp-2">{article.excerpt}</CardDescription>

                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-muted-foreground">Por {article.author}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="transition-all duration-300 group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    >
                      <Link href={`/noticias/${article.id}`} className="flex items-center gap-1">
                        Leer más
                        <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
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
              className="transition-all duration-300 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              Cargar más noticias
            </Button>
          </div>
        </div>
      </section>

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
