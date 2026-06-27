import type { Metadata } from "next"
import { LegalPage } from "@/src/features/legal/components/LegalPage"
import { terminosDoc } from "@/src/features/legal/data/terminos"

export const metadata: Metadata = {
  title: "Términos y Condiciones | JMV República Dominicana",
  description:
    "Términos y condiciones de uso del sitio web de la Juventud Mariana Vicenciana de República Dominicana.",
}

export default function Page() {
  return <LegalPage doc={terminosDoc} />
}
