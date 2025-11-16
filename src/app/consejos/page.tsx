// src/app/consejos/page.tsx
import Navbar from "@/src/components/Navbar"
import { ConsejoNacionalSection } from "@/src/features/consejos"

export default function ConsejoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <Navbar />
      <ConsejoNacionalSection />
    </div>
  )
}