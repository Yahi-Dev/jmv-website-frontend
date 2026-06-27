import type { Metadata } from "next"
import { LegalPage } from "@/src/features/legal/components/LegalPage"
import { privacidadDoc } from "@/src/features/legal/data/privacidad"

export const metadata: Metadata = {
  title: "Política de Privacidad | JMV República Dominicana",
  description:
    "Cómo recogemos, usamos y protegemos tus datos personales en el sitio de la Juventud Mariana Vicenciana de República Dominicana.",
}

export default function Page() {
  return <LegalPage doc={privacidadDoc} />
}
