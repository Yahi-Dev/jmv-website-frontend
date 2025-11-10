import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { HeroSection } from "./HeroSection"
import { ModulesSection } from "./ModulesSection"
import { ResourcesSection } from "./ResourcesSection"

export default function FormacionPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ModulesSection />
      {/* <FormacionSection /> */}
      <ResourcesSection />
      <FooterSection />
    </div>
  )
}