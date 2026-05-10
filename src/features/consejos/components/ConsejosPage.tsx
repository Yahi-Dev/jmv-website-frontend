import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { HeroConsejos } from "./HeroConsejos"
import { ConsejoActualSectionEditorial } from "./ConsejoActualSectionEditorial"
import { HistorialConsejosEditorial } from "./HistorialConsejosEditorial"
import "@/src/features/home/ui-kit/jmv-ui-kit.css"

export function ConsejosPage() {
  return (
    <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />
      <HeroConsejos />
      <ConsejoActualSectionEditorial />
      <HistorialConsejosEditorial />
      <FooterSection />
    </div>
  )
}
