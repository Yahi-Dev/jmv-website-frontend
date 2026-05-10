"use client"

import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { HeroConsejos } from "./HeroConsejos"
import { ConsejoActualSectionEditorial } from "./ConsejoActualSectionEditorial"
import { HistorialConsejosEditorial } from "./HistorialConsejosEditorial"
import { useConsejoActual } from "../hook/use-consejos"

export function ConsejosPage() {
  // Una única llamada compartida entre Hero y la sección de consejo actual,
  // así evitamos un doble fetch al cargar la página de consejos.
  const { consejo, loading, error, isEmpty } = useConsejoActual()

  return (
    <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />
      <HeroConsejos consejo={consejo} />
      <ConsejoActualSectionEditorial
        consejo={consejo}
        loading={loading}
        error={error}
        isEmpty={isEmpty}
      />
      <HistorialConsejosEditorial />
      <FooterSection />
    </div>
  )
}
