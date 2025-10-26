import Navbar from "@/src/components/shared/Navbar"
import { HeroSection } from "./HeroSection"
import { ValuesSection } from "./ValuesSection"
import { ActivitiesSection } from "./ActivitiesSection"
import { FooterSection } from "../../../components/shared/FooterSection"
import { PillarsSection } from "./PillarsSection"
import { TestimonialsSection } from "./TestimonialsSection"

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PillarsSection />
      <ValuesSection />
      <TestimonialsSection />
      <ActivitiesSection />
      <FooterSection />
    </div>
  )
}
