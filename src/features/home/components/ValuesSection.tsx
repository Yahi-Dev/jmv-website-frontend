"use client"

export function ValuesSection() {
  const values = [
    { title: "Eclesial", subtitle: "Confianza plena en Dios" },
    { title: "Laical", subtitle: "Amor al prójimo en acción" },
    { title: "Mariana", subtitle: "Evangelización y servicio" },
    { title: "Misionera", subtitle: "Energía y esperanza" },
    { title: "Vicentina", subtitle: "Energía y esperanza" },
  ]

  return (
    <section className="relative py-20 overflow-hidden text-white bg-black">
      <div className="absolute inset-0 bg-[url('/images/jmv/jmv-11.jpeg')] bg-cover bg-position-[center_50%]" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="container relative z-10 px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold">NOTAS DISTINTIVAS</h2>
          <p className="max-w-2xl mx-auto text-xl text-white/80">
            Los valores que nos definen como comunidad de fe
          </p>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v, i) => (
            <div key={i} className="text-center group">
              <div className="mb-6 text-6xl font-black transition-transform duration-300 group-hover:scale-110">{v.title}</div>
              {/* <p className="text-lg font-medium text-white/90">{v.subtitle}</p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
