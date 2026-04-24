import Navbar from "@/src/components/Navbar"
import { HeroSection } from "./HeroSection"
import { MissionQuote } from "./MissionQuote"
import { PillarsSection } from "./PillarsSection"
import { ValuesSection } from "./ValuesSection"
import { Numbers } from "./Numbers"
import { ActivitiesSection } from "./ActivitiesSection"
import { ContactSection } from "./ContactSection"
import { FooterSection } from "../../../components/shared/FooterSection"
import "../ui-kit/jmv-ui-kit.css"

export function HomePage() {
  return (
    <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />
      <HeroSection />
      <MissionQuote />
      <PillarsSection />
      <ValuesSection />
      <Numbers />
      <ActivitiesSection />
      <ContactSection />
      <FooterSection />
    </div>
  )
}
