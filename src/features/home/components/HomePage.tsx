import Navbar from "@/src/components/Navbar"
import { HeroSection } from "./HeroSection"
import { ValuesSection } from "./ValuesSection"
import { ActivitiesSection } from "./ActivitiesSection"
import { ContactSection } from "./ContactSection"
import { FooterSection } from "../../../components/shared/FooterSection"
import { PillarsSection } from "./PillarsSection"
import { TestimonialsSection } from "../../testimonios/components/TestimonialsSection"

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PillarsSection />
      <ValuesSection />
      <TestimonialsSection />
      <ActivitiesSection />
      <ContactSection />
      <FooterSection />
    </div>
  )
}
