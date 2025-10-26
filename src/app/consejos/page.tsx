import Navbar from "@/src/components/shared/Navbar"
import ConsejoNacionalSection from "./ui/ConsejoCard"

export default function ConsejoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <Navbar />
      <ConsejoNacionalSection />
    </div>
  )
}
