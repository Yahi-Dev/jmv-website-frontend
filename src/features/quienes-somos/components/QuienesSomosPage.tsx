import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { HeroQuienes } from "./HeroQuienes"
import { HistoriaSection } from "./HistoriaSection"
import { FundadoresSection } from "./FundadoresSection"
import { CarismaSection } from "./CarismaSection"
import { TimelineSection } from "./TimelineSection"
import { InternacionalSection } from "./InternacionalSection"

export function QuienesSomosPage() {
  return (
    <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />
      <HeroQuienes />
      <HistoriaSection />
      <FundadoresSection />
      <CarismaSection />
      <TimelineSection />
      <InternacionalSection />
      <FooterSection />
    </div>
  )
}
