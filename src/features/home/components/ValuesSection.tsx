"use client"

export function ValuesSection() {
  const values = [
    { title: "Fe", subtitle: "Confianza plena en Dios" },
    { title: "Caridad", subtitle: "Amor al prójimo en acción" },
    { title: "Misión", subtitle: "Evangelización y servicio" },
    { title: "Juventud", subtitle: "Energía y esperanza" },
  ]

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-10" />
      <div className="container relative z-10 px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold">Nuestros Valores</h2>
          <p className="max-w-2xl mx-auto text-xl text-primary-foreground/80">
            Los valores que nos definen como comunidad de fe
          </p>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={i} className="text-center group">
              <div className="mb-6 text-6xl font-black transition-transform duration-300 group-hover:scale-110">{v.title}</div>
              <p className="text-lg font-medium text-primary-foreground/90">{v.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
