// src/features/noticias/components/NoticiaShareButtons.tsx
"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Share2, Link2, Check } from "lucide-react"
import { toast } from "sonner"

interface NoticiaShareButtonsProps {
  titulo: string
  descripcion: string
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.99.576 3.848 1.573 5.41L2 22l4.704-1.542A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182a8.18 8.18 0 01-4.426-1.295l-.317-.189-3.28 1.074 1.1-3.184-.206-.326A8.18 8.18 0 013.818 12C3.818 7.476 7.476 3.818 12 3.818c4.524 0 8.182 3.658 8.182 8.182 0 4.524-3.658 8.182-8.183 8.182z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function TwitterXIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

export function NoticiaShareButtons({ titulo, descripcion }: NoticiaShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [igCopied, setIgCopied] = useState(false)

  const getUrl = () =>
    typeof window !== "undefined" ? window.location.href : ""

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: titulo, text: descripcion, url: getUrl() })
      } catch {
        // user cancelled
      }
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl())
      setCopied(true)
      toast.success("Enlace copiado al portapapeles")
      setTimeout(() => setCopied(false), 2500)
    } catch {
      toast.error("No se pudo copiar el enlace")
    }
  }

  const openShare = (url: string) => window.open(url, "_blank", "noopener,noreferrer,width=600,height=500")

  const shareLinks = [
    {
      label: "WhatsApp",
      icon: <WhatsAppIcon />,
      color: "hover:bg-green-50 hover:border-green-300 hover:text-green-700",
      action: () =>
        openShare(`https://wa.me/?text=${encodeURIComponent(`${titulo}\n${getUrl()}`)}`),
    },
    {
      label: "Facebook",
      icon: <FacebookIcon />,
      color: "hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700",
      action: () =>
        openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`),
    },
    {
      label: "Twitter / X",
      icon: <TwitterXIcon />,
      color: "hover:bg-neutral-100 hover:border-neutral-400 hover:text-neutral-800",
      action: () =>
        openShare(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(titulo)}&url=${encodeURIComponent(getUrl())}`
        ),
    },
    {
      label: "Telegram",
      icon: <TelegramIcon />,
      color: "hover:bg-sky-50 hover:border-sky-400 hover:text-sky-700",
      action: () =>
        openShare(
          `https://t.me/share/url?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(titulo)}`
        ),
    },
    {
      label: "Instagram",
      icon: <InstagramIcon />,
      color: "hover:bg-pink-50 hover:border-pink-400 hover:text-pink-700",
      action: async () => {
        try {
          await navigator.clipboard.writeText(getUrl())
          setIgCopied(true)
          toast.success("Enlace copiado — pégalo en tu historia o publicación de Instagram", {
            duration: 4000,
          })
          setTimeout(() => setIgCopied(false), 4000)
        } catch {
          toast.error("No se pudo copiar el enlace")
        }
      },
    },
  ]

  return (
    <div className="p-6 border rounded-2xl bg-card/80 backdrop-blur-sm border-border/50 shadow-lg space-y-4">
      <div className="flex items-center gap-2">
        <Share2 className="w-4 h-4 text-primary" />
        <h3 className="font-bold text-foreground">Compartir noticia</h3>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {shareLinks.map(({ label, icon, color, action }) => (
          <button
            key={label}
            onClick={action}
            className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium border rounded-lg transition-colors duration-150 border-border/60 text-muted-foreground ${color} ${
              label === "Instagram" && igCopied ? "bg-pink-50 border-pink-400 text-pink-700" : ""
            }`}
          >
            {icon}
            {label === "Instagram" && igCopied ? "¡Copiado!" : label}
          </button>
        ))}
      </div>

      <Button variant="outline" className="w-full gap-2" onClick={handleCopy}>
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4" />}
        {copied ? "¡Enlace copiado!" : "Copiar enlace"}
      </Button>

      {typeof navigator !== "undefined" && "share" in navigator && (
        <Button
          variant="default"
          className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          onClick={handleNativeShare}
        >
          <Share2 className="w-4 h-4" />
          Compartir
        </Button>
      )}
    </div>
  )
}
