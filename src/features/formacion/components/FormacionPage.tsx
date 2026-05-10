import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { HeroFormacion } from "./HeroFormacion"
import { ModulosFormacionSection } from "./ModulosFormacionSection"
import { RecursosFormacionSection } from "./RecursosFormacionSection"

export default function FormacionPage() {
  return (
    <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />
      <HeroFormacion />
      <ModulosFormacionSection />
      <RecursosFormacionSection />
      <FooterSection />
    </div>
  )
}
