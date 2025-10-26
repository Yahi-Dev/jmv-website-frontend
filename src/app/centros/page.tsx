import Navbar from "@/src/components/Navbar"
import CentrosGrid from "./ui/CentroCard"

export default function CentrosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <Navbar />
      <CentrosGrid />
    </div>
  )
}
