import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { HeroSection, ModulesSection, ResourcesSection } from "@/src/features/formacion"

export default function FormacionPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ModulesSection />
      <ResourcesSection />
      <FooterSection />
    </div>
  )
}