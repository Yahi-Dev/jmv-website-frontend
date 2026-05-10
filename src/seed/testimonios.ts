// src/seed/testimonios.ts
import { PrismaClient } from "@prisma/client"

const testimonios = [
  { nombre: "María Fernanda Rodríguez", iglesia: "Catedral Primada de América", reputacion: 5, mensaje: "JMV cambió mi vida. Encontré una familia que me acompaña en los momentos más difíciles y celebra conmigo los más alegres. Hoy soy quien soy gracias al carisma vicentino." },
  { nombre: "Joel Andrés Pichardo", iglesia: "Parroquia Nuestra Señora de la Altagracia", reputacion: 5, mensaje: "Llegué buscando un grupo donde tocar música cristiana. Salí con un compromiso de servicio que no esperaba. Llevo doce años sirviendo y cada día agradezco haber dicho que sí." },
  { nombre: "Lucía Brito", iglesia: "Catedral Inmaculada Concepción, La Vega", reputacion: 5, mensaje: "La formación que recibí en JMV me preparó para servir a la Iglesia de manera profunda. Hoy formo a otros jóvenes con la misma alegría con la que me formaron." },
  { nombre: "Yahaira del Rosario", iglesia: "Basílica de Higüey", reputacion: 5, mensaje: "Las misiones a parajes me enseñaron lo que es la fe encarnada. Llevar la Medalla Milagrosa a una madre que llora por su hijo es algo que no se olvida." },
  { nombre: "Andrés Felipe Cruz", iglesia: "Catedral Primada", reputacion: 4, mensaje: "Como contador, pensaba que mi servicio era pequeño. JMV me mostró que cuidar las finanzas con transparencia también es servir a Dios y a los pobres." },
  { nombre: "Patricia Castillo", iglesia: "Catedral Primada", reputacion: 5, mensaje: "Coordinar a JMV-RD es la misión más exigente y gratificante de mi vida. Ver a los jóvenes crecer en fe es el verdadero salario." },
  { nombre: "Carla Beatriz Polanco", iglesia: "Parroquia de la Altagracia, Santiago", reputacion: 5, mensaje: "Como periodista católica, JMV me dio un escenario donde mi profesión sirve a la evangelización. Cada nota que escribo es una pequeña catequesis." },
  { nombre: "Roselyn Féliz", iglesia: "Parroquia del Rosario, Barahona", reputacion: 5, mensaje: "Vivimos en el sur lejano y a veces sentimos olvido. JMV nos hace sentir parte de algo más grande. La Virgen de la Medalla Milagrosa nos une." },
  { nombre: "Adriana Pimentel", iglesia: "Parroquia Nuestra Señora de Regla, Baní", reputacion: 5, mensaje: "Trabajar con pre-juveniles es sembrar para el futuro. Esos niños serán los líderes JMV del mañana. Ver sus ojos brillar al rezar es un regalo." },
  { nombre: "Génesis Almonte", iglesia: "Catedral San Felipe, Puerto Plata", reputacion: 4, mensaje: "Acompañar la apertura de nuevos centros me ha llevado a descubrir que el Espíritu Santo trabaja siempre, especialmente donde menos esperamos." },
  { nombre: "Esperanza Mateo", iglesia: "Catedral San Juan Bautista", reputacion: 4, mensaje: "Somos un centro pequeño en San Juan, pero nuestro espíritu es grande. JMV nos ha enseñado que el tamaño no importa, importa la entrega." },
  { nombre: "Henry Daniel Sánchez", iglesia: "Centro JMV Puerto Plata", reputacion: 5, mensaje: "Crecí en JMV desde aspirante hasta comprometido. El proceso formativo me dio herramientas para mi vida personal, profesional y espiritual." },
  { nombre: "Vianca Soto", iglesia: "Centro JMV Catedral Primada", reputacion: 5, mensaje: "Después de tres años en el consejo nacional puedo decir que JMV es mucho más que un grupo: es una familia, es una vocación, es un camino." },
  { nombre: "Wilkin Rivera", iglesia: "Centro JMV La Vega", reputacion: 4, mensaje: "Las misiones a Constanza son mi tradición favorita del año. Esa semana aprendo más de Dios que en meses de catequesis formal." },
  { nombre: "Camila Espinal", iglesia: "Centro JMV Catedral Primada", reputacion: 5, mensaje: "Soy aspirante recién entrada y ya siento que encontré mi lugar. Los miembros más antiguos nos acogen con un cariño que se siente verdadero." },
]

export async function seedTestimonios(prisma: PrismaClient, _userId: string) {
  console.log("💬 Sembrando testimonios...")
  await prisma.testimonios.deleteMany()
  for (const t of testimonios) {
    await prisma.testimonios.create({
      data: {
        nombre: t.nombre,
        mensaje: t.mensaje.slice(0, 250),
        reputacion: t.reputacion,
        iglesia: t.iglesia,
      },
    })
  }
  console.log(`✅ ${testimonios.length} testimonios creados`)
}
