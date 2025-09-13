import type React from "react"
import type { Metadata } from "next"
import { Inter, Source_Sans_3 } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
})

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans-3",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "JMV República Dominicana | Juventud Mariana Vicenciana",
  description:
    "Formación, oración y servicio, al estilo de María y San Vicente de Paúl. Únete a la Juventud Mariana Vicenciana en República Dominicana.",
  keywords: [
    "JMV",
    "Juventud Mariana Vicenciana",
    "República Dominicana",
    "formación católica",
    "servicio",
    "oración",
    "San Vicente de Paúl",
  ],
  authors: [{ name: "JMV República Dominicana" }],
  creator: "JMV República Dominicana",
  publisher: "JMV República Dominicana",
  openGraph: {
    title: "JMV República Dominicana | Juventud Mariana Vicenciana",
    description: "Formación, oración y servicio, al estilo de María y San Vicente de Paúl",
    type: "website",
    locale: "es_DO",
    siteName: "JMV República Dominicana",
  },
  twitter: {
    card: "summary_large_image",
    title: "JMV República Dominicana",
    description: "Formación, oración y servicio, al estilo de María y San Vicente de Paúl",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${sourceSans3.variable} antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>{` ... `}</style>

        <style>{`
html {
  font-family: ${sourceSans3.style.fontFamily};
  --font-sans: ${sourceSans3.variable};
  --font-heading: ${inter.variable};
}
        `}</style>
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  )
}
