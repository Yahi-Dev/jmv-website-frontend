import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Star, Heart, Users, MapPin, Phone, Mail, MessageCircle, Send, CheckCircle } from "lucide-react"
import Link from "next/link"

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
            <Link href="/unete" className="text-sm font-medium text-primary">
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
              <Heart className="mr-2 h-4 w-4" />
              Únete a Nosotros
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">Únete a JMV</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Descubre tu vocación de servicio y forma parte de una familia que transforma vidas siguiendo el ejemplo de
              María y San Vicente de Paúl
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <a href="#formulario">Completa tu solicitud</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent">
                <a href="#capitulos">Encuentra tu capítulo</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">¿Por qué unirte a JMV?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ser parte de JMV significa crecer integralmente mientras sirves a los más necesitados
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Comunidad Fraterna</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Forma parte de una familia de jóvenes comprometidos que se apoyan mutuamente en el crecimiento
                  espiritual y humano
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Formación Integral</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Accede a programas de formación en liderazgo, espiritualidad, doctrina social y habilidades para la
                  vida
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Servicio Transformador</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Participa en misiones, proyectos sociales y actividades que impactan positivamente en las comunidades
                  más vulnerables
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="formulario" className="bg-card py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Solicitud de Membresía</h2>
              <p className="text-muted-foreground">
                Completa este formulario y nos pondremos en contacto contigo para iniciar tu proceso de integración
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Información Personal
                </CardTitle>
                <CardDescription>
                  Todos los campos marcados con * son obligatorios. Tu información será tratada con total
                  confidencialidad.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre *</Label>
                      <Input id="firstName" placeholder="Tu nombre" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellidos *</Label>
                      <Input id="lastName" placeholder="Tus apellidos" required />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input id="email" type="email" placeholder="tu@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input id="phone" type="tel" placeholder="+1 (809) 000-0000" required />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="age">Edad *</Label>
                      <Input id="age" type="number" min="16" max="35" placeholder="18" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="occupation">Ocupación</Label>
                      <Input id="occupation" placeholder="Estudiante, Profesional, etc." />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="province">Provincia/Diócesis *</Label>
                      <Select required>
                        <SelectTrigger>
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
                    <div className="space-y-2">
                      <Label htmlFor="parish">Parroquia</Label>
                      <Input id="parish" placeholder="Nombre de tu parroquia" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experiencia en Movimientos Juveniles</Label>
                    <Select>
                      <SelectTrigger>
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

                  <div className="space-y-2">
                    <Label htmlFor="motivation">¿Por qué quieres unirte a JMV? *</Label>
                    <Textarea
                      id="motivation"
                      placeholder="Compártenos tu motivación para formar parte de JMV..."
                      className="min-h-24"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Disponibilidad de Tiempo</Label>
                    <Select>
                      <SelectTrigger>
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

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje Adicional</Label>
                    <Textarea
                      id="message"
                      placeholder="¿Hay algo más que te gustaría compartir con nosotros?"
                      className="min-h-20"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="terms" className="rounded" required />
                    <Label htmlFor="terms" className="text-sm">
                      Acepto los términos y condiciones y autorizo el tratamiento de mis datos personales según la
                      política de privacidad de JMV RD *
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Solicitud
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Local Chapters Section */}
      <section id="capitulos" className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Capítulos Locales</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Encuentra el capítulo más cercano a ti y conecta directamente con nuestros coordinadores locales
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((chapter) => (
              <Card key={chapter.name} className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{chapter.name}</CardTitle>
                    <Badge variant="secondary">Activo</Badge>
                  </div>
                  <CardDescription>{chapter.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{chapter.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{chapter.meetingDay}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <span>Coord: {chapter.coordinator}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" asChild>
                      <a
                        href={`https://wa.me/${chapter.contact.whatsapp}?text=Hola, me interesa unirme al capítulo JMV ${chapter.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`mailto:${chapter.contact.email}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`tel:${chapter.contact.phone}`}>
                        <Phone className="h-4 w-4" />
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
      <section className="bg-card py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
              <p className="text-muted-foreground text-lg">Resolvemos las dudas más comunes sobre cómo unirse a JMV</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">¿Cuáles son los requisitos para unirme a JMV?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Para unirte a JMV debes tener entre 16 y 35 años, ser católico practicante, tener disponibilidad para
                  participar en las actividades formativas y de servicio, y mostrar compromiso con los valores
                  cristianos y el carisma vicenciano. No se requiere experiencia previa en movimientos juveniles.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">¿Cuál es el proceso de integración?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  El proceso incluye: 1) Completar el formulario de solicitud, 2) Entrevista personal con el coordinador
                  del capítulo, 3) Período de acompañamiento de 3 meses participando en actividades, 4) Formación básica
                  sobre el carisma vicenciano, y 5) Compromiso formal con la misión de JMV.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  ¿Qué actividades realizan los miembros de JMV?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Los miembros participan en encuentros formativos semanales, retiros espirituales, misiones de verano,
                  proyectos de servicio social, visitas a comunidades necesitadas, actividades de evangelización,
                  talleres de liderazgo, y eventos de fraternidad. También hay oportunidades de liderazgo en diferentes
                  áreas.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">¿Hay algún costo por pertenecer a JMV?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  La membresía en JMV es completamente gratuita. Sin embargo, para algunas actividades especiales como
                  retiros, misiones o encuentros nacionales, puede haber una contribución voluntaria para cubrir gastos
                  de alimentación y hospedaje. Siempre buscamos alternativas para que la situación económica no sea un
                  impedimento.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">¿Cuánto tiempo debo dedicar a JMV?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  El compromiso mínimo incluye participar en el encuentro semanal (2-3 horas) y en al menos una
                  actividad de servicio al mes. Los miembros más comprometidos pueden dedicar tiempo adicional a
                  coordinación, formación de otros jóvenes, o proyectos especiales. La participación se adapta a tu
                  disponibilidad y nivel de compromiso.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  ¿Puedo participar si no vivo cerca de un capítulo?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Si no hay un capítulo cerca de tu ubicación, puedes participar en actividades virtuales, eventos
                  nacionales, y misiones. También te ayudamos a conectar con otros jóvenes de tu zona para eventualmente
                  formar un nuevo capítulo. Contáctanos para explorar las opciones disponibles en tu región.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">¿Qué formación recibiré como miembro de JMV?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
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
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container text-center">
          <div className="mx-auto max-w-2xl">
            <CheckCircle className="mx-auto mb-6 h-16 w-16" />
            <h2 className="mb-4 text-3xl font-bold">¿Listo para dar el primer paso?</h2>
            <p className="mb-8 text-xl text-primary-foreground/80">
              Tu vocación de servicio te está esperando. Únete a una familia que transforma vidas y construye un mundo
              más justo y fraterno.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="#formulario">Completar solicitud</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <a href="mailto:info@jmvrd.org">Contactar directamente</a>
              </Button>
            </div>
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
