import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Star,
  Heart,
  Users,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Send,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Globe,
  User,
} from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"

// Local chapters data
const chapters = [
  {
    name: "Santo Domingo",
    description: "Capítulo principal ubicado en la capital del país",
    contact: {
      email: "santodomingo@jmvrd.org",
      phone: "+1 (809) 555-0101",
      whatsapp: "18095550101",
    },
    meetingDay: "Sábados 3:00 PM",
    location: "Centro Pastoral San Vicente",
    coordinator: "Ana María Rodríguez",
  },
  {
    name: "Santiago",
    description: "Sirviendo a la región del Cibao con amor y dedicación",
    contact: {
      email: "santiago@jmvrd.org",
      phone: "+1 (809) 555-0102",
      whatsapp: "18095550102",
    },
    meetingDay: "Domingos 4:00 PM",
    location: "Parroquia San Vicente de Paúl",
    coordinator: "Carlos Martínez",
  },
  {
    name: "La Vega",
    description: "Comprometidos con el desarrollo integral de la región central",
    contact: {
      email: "lavega@jmvrd.org",
      phone: "+1 (809) 555-0103",
      whatsapp: "18095550103",
    },
    meetingDay: "Sábados 2:00 PM",
    location: "Casa Parroquial La Inmaculada",
    coordinator: "María González",
  },
  {
    name: "San Cristóbal",
    description: "Llevando esperanza a las comunidades del sur",
    contact: {
      email: "sancristobal@jmvrd.org",
      phone: "+1 (809) 555-0104",
      whatsapp: "18095550104",
    },
    meetingDay: "Domingos 3:00 PM",
    location: "Centro Juvenil San Vicente",
    coordinator: "Pedro Jiménez",
  },
  {
    name: "Barahona",
    description: "Nuevo capítulo sirviendo a la región suroeste",
    contact: {
      email: "barahona@jmvrd.org",
      phone: "+1 (809) 555-0105",
      whatsapp: "18095550105",
    },
    meetingDay: "Sábados 4:00 PM",
    location: "Parroquia Nuestra Señora del Rosario",
    coordinator: "Luisa Fernández",
  },
  {
    name: "Puerto Plata",
    description: "Evangelizando en la costa norte con alegría",
    contact: {
      email: "puertoplata@jmvrd.org",
      phone: "+1 (809) 555-0106",
      whatsapp: "18095550106",
    },
    meetingDay: "Domingos 2:00 PM",
    location: "Centro Pastoral San Felipe",
    coordinator: "Roberto Díaz",
  },
]

export default function UnetePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="px-6 py-3 mb-8 text-sm font-medium bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/20"
            >
              <Heart className="w-4 h-4 mr-2 text-primary" />
              Únete a Nosotros
            </Badge>
            <h1 className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-transparent bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text">
                Únete a JMV
              </span>
            </h1>
            <p className="max-w-3xl mx-auto mb-12 text-xl leading-relaxed text-foreground/70">
              Descubre tu vocación de servicio y forma parte de una familia que transforma vidas siguiendo el ejemplo de
              María y San Vicente de Paúl
            </p>
            <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="px-8 py-4 text-lg shadow-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                asChild
              >
                <a href="#formulario">
                  Completa tu solicitud
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg bg-transparent border-2 border-primary/20 hover:bg-primary/5"
                asChild
              >
                <a href="#capitulos">Encuentra tu capítulo</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="px-4 py-2 mb-6 border-primary/20">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              Beneficios
            </Badge>
            <h2 className="mb-6 text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              ¿Por qué unirte a JMV?
            </h2>
            <p className="max-w-3xl mx-auto text-xl leading-relaxed text-foreground/70">
              Ser parte de JMV significa crecer integralmente mientras sirves a los más necesitados
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-all duration-300 border-0 group hover:shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader className="pb-4 text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-transform duration-300 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:scale-110">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">Comunidad Fraterna</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Forma parte de una familia de jóvenes comprometidos que se apoyan mutuamente en el crecimiento
                  espiritual y humano
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 border-0 group hover:shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader className="pb-4 text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-transform duration-300 rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/10 group-hover:scale-110">
                  <Target className="w-10 h-10 text-secondary" />
                </div>
                <CardTitle className="text-2xl font-bold">Formación Integral</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Accede a programas de formación en liderazgo, espiritualidad, doctrina social y habilidades para la
                  vida
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 border-0 group hover:shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-4 text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-transform duration-300 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 group-hover:scale-110">
                  <Heart className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="text-2xl font-bold">Servicio Transformador</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Participa en misiones, proyectos sociales y actividades que impactan positivamente en las comunidades
                  más vulnerables
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="formulario" className="py-20 lg:py-32 bg-gradient-to-br from-card/30 to-muted/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <Badge variant="outline" className="px-4 py-2 mb-6 border-primary/20">
                <Send className="w-4 h-4 mr-2 text-primary" />
                Solicitud
              </Badge>
              <h2 className="mb-6 text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                Solicitud de Membresía
              </h2>
              <p className="text-lg text-foreground/70">
                Completa este formulario y nos pondremos en contacto contigo para iniciar tu proceso de integración
              </p>
            </div>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-background to-card/50 backdrop-blur-sm">
              <CardHeader className="pb-8">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary">
                    <Send className="w-5 h-5 text-primary-foreground" />
                  </div>
                  Información Personal
                </CardTitle>
                <CardDescription className="text-base">
                  Todos los campos marcados con * son obligatorios. Tu información será tratada con total
                  confidencialidad.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        Nombre *
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Tu nombre"
                        className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Apellidos *
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Tus apellidos"
                        className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Correo Electrónico *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Teléfono *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (809) 000-0000"
                        className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="age" className="text-sm font-medium">
                        Edad *
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        min="16"
                        max="35"
                        placeholder="18"
                        className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="occupation" className="text-sm font-medium">
                        Ocupación
                      </Label>
                      <Input
                        id="occupation"
                        placeholder="Estudiante, Profesional, etc."
                        className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="province" className="text-sm font-medium">
                        Provincia/Diócesis *
                      </Label>
                      <Select required>
                        <SelectTrigger className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50">
                          <SelectValue placeholder="Selecciona tu provincia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="santo-domingo">Santo Domingo</SelectItem>
                          <SelectItem value="santiago">Santiago</SelectItem>
                          <SelectItem value="la-vega">La Vega</SelectItem>
                          <SelectItem value="san-cristobal">San Cristóbal</SelectItem>
                          <SelectItem value="barahona">Barahona</SelectItem>
                          <SelectItem value="puerto-plata">Puerto Plata</SelectItem>
                          <SelectItem value="san-pedro">San Pedro de Macorís</SelectItem>
                          <SelectItem value="azua">Azua</SelectItem>
                          <SelectItem value="moca">Moca</SelectItem>
                          <SelectItem value="higuey">Higüey</SelectItem>
                          <SelectItem value="otra">Otra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="parish" className="text-sm font-medium">
                        Parroquia
                      </Label>
                      <Input
                        id="parish"
                        placeholder="Nombre de tu parroquia"
                        className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="experience" className="text-sm font-medium">
                      Experiencia en Movimientos Juveniles
                    </Label>
                    <Select>
                      <SelectTrigger className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50">
                        <SelectValue placeholder="Selecciona tu experiencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ninguna">Ninguna experiencia</SelectItem>
                        <SelectItem value="poca">Poca experiencia (menos de 1 año)</SelectItem>
                        <SelectItem value="moderada">Experiencia moderada (1-3 años)</SelectItem>
                        <SelectItem value="amplia">Amplia experiencia (más de 3 años)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="motivation" className="text-sm font-medium">
                      ¿Por qué quieres unirte a JMV? *
                    </Label>
                    <Textarea
                      id="motivation"
                      placeholder="Compártenos tu motivación para formar parte de JMV..."
                      className="border-2 resize-none min-h-32 border-border/50 focus:border-primary/50 bg-background/50"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="availability" className="text-sm font-medium">
                      Disponibilidad de Tiempo
                    </Label>
                    <Select>
                      <SelectTrigger className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50">
                        <SelectValue placeholder="¿Cuánto tiempo puedes dedicar?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pocas-horas">Pocas horas a la semana</SelectItem>
                        <SelectItem value="fin-semana">Principalmente fines de semana</SelectItem>
                        <SelectItem value="varias-horas">Varias horas durante la semana</SelectItem>
                        <SelectItem value="tiempo-completo">Disponibilidad amplia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Mensaje Adicional
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="¿Hay algo más que te gustaría compartir con nosotros?"
                      className="border-2 resize-none min-h-24 border-border/50 focus:border-primary/50 bg-background/50"
                    />
                  </div>

                  <div className="flex items-start p-4 space-x-3 bg-muted/30 rounded-xl">
                    <input type="checkbox" id="terms" className="mt-1 border-2 rounded border-border/50" required />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      Acepto los términos y condiciones y autorizo el tratamiento de mis datos personales según la
                      política de privacidad de JMV RD *
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-lg shadow-xl h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    size="lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Solicitud
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Local Chapters Section */}
      <section id="capitulos" className="py-20 lg:py-32">
        <div className="container">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="px-4 py-2 mb-6 border-primary/20">
              <Globe className="w-4 h-4 mr-2 text-primary" />
              Capítulos
            </Badge>
            <h2 className="mb-6 text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              Capítulos Locales
            </h2>
            <p className="max-w-3xl mx-auto text-xl leading-relaxed text-foreground/70">
              Encuentra el capítulo más cercano a ti y conecta directamente con nuestros coordinadores locales
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((chapter) => (
              <Card
                key={chapter.name}
                className="transition-all duration-300 border-0 group hover:shadow-2xl bg-gradient-to-br from-background to-card/50 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-xl font-bold">{chapter.name}</CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20"
                    >
                      Activo
                    </Badge>
                  </div>
                  <CardDescription className="text-base leading-relaxed">{chapter.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                      <MapPin className="flex-shrink-0 w-4 h-4 text-primary" />
                      <span>{chapter.location}</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                      <Users className="flex-shrink-0 w-4 h-4 text-secondary" />
                      <span>{chapter.meetingDay}</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                      <Star className="flex-shrink-0 w-4 h-4 text-accent" />
                      <span>Coord: {chapter.coordinator}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90"
                      asChild
                    >
                      <a
                        href={`https://wa.me/${chapter.contact.whatsapp}?text=Hola, me interesa unirme al capítulo JMV ${chapter.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent border-2 border-primary/20 hover:bg-primary/5"
                      asChild
                    >
                      <a href={`mailto:${chapter.contact.email}`}>
                        <Mail className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent border-2 border-primary/20 hover:bg-primary/5"
                      asChild
                    >
                      <a href={`tel:${chapter.contact.phone}`}>
                        <Phone className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-card/30 to-muted/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center">
              <Badge variant="outline" className="px-4 py-2 mb-6 border-primary/20">
                <MessageCircle className="w-4 h-4 mr-2 text-primary" />
                FAQ
              </Badge>
              <h2 className="mb-6 text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                Preguntas Frecuentes
              </h2>
              <p className="text-xl text-foreground/70">Resolvemos las dudas más comunes sobre cómo unirse a JMV</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="px-6 border-2 border-border/50 rounded-2xl bg-gradient-to-br from-background to-card/30 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-lg font-semibold text-left transition-colors hover:text-primary">
                  ¿Cuáles son los requisitos para unirme a JMV?
                </AccordionTrigger>
                <AccordionContent className="pt-2 text-base leading-relaxed text-foreground/80">
                  Para unirte a JMV debes tener entre 16 y 35 años, ser católico practicante, tener disponibilidad para
                  participar en las actividades formativas y de servicio, y mostrar compromiso con los valores
                  cristianos y el carisma vicenciano. No se requiere experiencia previa en movimientos juveniles.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="px-6 border-2 border-border/50 rounded-2xl bg-gradient-to-br from-background to-card/30 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-lg font-semibold text-left transition-colors hover:text-primary">
                  ¿Cuál es el proceso de integración?
                </AccordionTrigger>
                <AccordionContent className="pt-2 text-base leading-relaxed text-foreground/80">
                  El proceso incluye: 1) Completar el formulario de solicitud, 2) Entrevista personal con el coordinador
                  del capítulo, 3) Período de acompañamiento de 3 meses participando en actividades, 4) Formación básica
                  sobre el carisma vicenciano, y 5) Compromiso formal con la misión de JMV.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="px-6 border-2 border-border/50 rounded-2xl bg-gradient-to-br from-background to-card/30 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-lg font-semibold text-left transition-colors hover:text-primary">
                  ¿Qué actividades realizan los miembros de JMV?
                </AccordionTrigger>
                <AccordionContent className="pt-2 text-base leading-relaxed text-foreground/80">
                  Los miembros participan en encuentros formativos semanales, retiros espirituales, misiones de verano,
                  proyectos de servicio social, visitas a comunidades necesitadas, actividades de evangelización,
                  talleres de liderazgo, y eventos de fraternidad. También hay oportunidades de liderazgo en diferentes
                  áreas.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="px-6 border-2 border-border/50 rounded-2xl bg-gradient-to-br from-background to-card/30 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-lg font-semibold text-left transition-colors hover:text-primary">
                  ¿Hay algún costo por pertenecer a JMV?
                </AccordionTrigger>
                <AccordionContent className="pt-2 text-base leading-relaxed text-foreground/80">
                  La membresía en JMV es completamente gratuita. Sin embargo, para algunas actividades especiales como
                  retiros, misiones o encuentros nacionales, puede haber una contribución voluntaria para cubrir gastos
                  de alimentación y hospedaje. Siempre buscamos alternativas para que la situación económica no sea un
                  impedimento.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="px-6 border-2 border-border/50 rounded-2xl bg-gradient-to-br from-background to-card/30 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-lg font-semibold text-left transition-colors hover:text-primary">
                  ¿Cuánto tiempo debo dedicar a JMV?
                </AccordionTrigger>
                <AccordionContent className="pt-2 text-base leading-relaxed text-foreground/80">
                  El compromiso mínimo incluye participar en el encuentro semanal (2-3 horas) y en al menos una
                  actividad de servicio al mes. Los miembros más comprometidos pueden dedicar tiempo adicional a
                  coordinación, formación de otros jóvenes, o proyectos especiales. La participación se adapta a tu
                  disponibilidad y nivel de compromiso.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-6"
                className="px-6 border-2 border-border/50 rounded-2xl bg-gradient-to-br from-background to-card/30 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-lg font-semibold text-left transition-colors hover:text-primary">
                  ¿Puedo participar si no vivo cerca de un capítulo?
                </AccordionTrigger>
                <AccordionContent className="pt-2 text-base leading-relaxed text-foreground/80">
                  Si no hay un capítulo cerca de tu ubicación, puedes participar en actividades virtuales, eventos
                  nacionales, y misiones. También te ayudamos a conectar con otros jóvenes de tu zona para eventualmente
                  formar un nuevo capítulo. Contáctanos para explorar las opciones disponibles en tu región.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-7"
                className="px-6 border-2 border-border/50 rounded-2xl bg-gradient-to-br from-background to-card/30 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-lg font-semibold text-left transition-colors hover:text-primary">
                  ¿Qué formación recibiré como miembro de JMV?
                </AccordionTrigger>
                <AccordionContent className="pt-2 text-base leading-relaxed text-foreground/80">
                  Recibirás formación integral que incluye: espiritualidad vicenciana, liderazgo cristiano, doctrina
                  social de la Iglesia, habilidades de comunicación, gestión de proyectos sociales, y desarrollo
                  personal. La formación es progresiva y se adapta a tu nivel de experiencia y responsabilidades dentro
                  del movimiento.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 overflow-hidden text-white bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="mb-6 text-4xl font-bold">¿Listo para dar el primer paso?</h2>
            <p className="mb-12 text-xl leading-relaxed text-white/90">
              Tu vocación de servicio te está esperando. Únete a una familia que transforma vidas y construye un mundo
              más justo y fraterno.
            </p>
            <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-4 text-lg bg-white text-primary hover:bg-white/90"
                asChild
              >
                <a href="#formulario">Completar solicitud</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg text-white bg-transparent border-2 border-white hover:bg-white hover:text-primary"
                asChild
              >
                <a href="mailto:info@jmvrd.org">Contactar directamente</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-br from-foreground to-foreground/90 text-background">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-4">
            <div>
              <div className="flex items-center mb-6 space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold font-heading">JMV RD</span>
                  <p className="text-sm text-background/80">Juventud Mariana Vicenciana</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-background/70">República Dominicana</p>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold">Enlaces</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/quienes-somos" className="transition-colors hover:text-secondary">
                    Quiénes Somos
                  </Link>
                </li>
                <li>
                  <Link href="/formacion" className="transition-colors hover:text-secondary">
                    Formación
                  </Link>
                </li>
                <li>
                  <Link href="/eventos" className="transition-colors hover:text-secondary">
                    Eventos
                  </Link>
                </li>
                <li>
                  <Link href="/noticias" className="transition-colors hover:text-secondary">
                    Noticias
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold">Contacto</h3>
              <ul className="space-y-3 text-sm text-background/80">
                <li>Santo Domingo, RD</li>
                <li>info@jmvrd.org</li>
                <li>+1 (809) 123-4567</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold">Síguenos</h3>
              <div className="flex space-x-6">
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

          <div className="pt-8 mt-12 text-sm text-center border-t border-background/20 text-background/70">
            <p>&copy; 2024 JMV República Dominicana. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
