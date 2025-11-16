// components/formacion-detail-dialog.tsx
"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"
import { Button } from "@/src/components/ui/button"
import { Download, ExternalLink, BookOpen, Mic, Users, Heart, Star, Cross, Calendar } from "lucide-react"
import type { FormacionType } from "../model/types"
import { Badge } from "@/src/components/ui/badge"
import { ModulosFormacion } from "@/src/lib/enum/ModulosFormacion"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useMemo } from "react"

interface FormacionDetailDialogProps {
  readonly formacion: FormacionType
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
  readonly getModuleColor: (modulo: ModulosFormacion) => string
}

export function FormacionDetailDialog({ 
  formacion, 
  open, 
  onOpenChange,
  getModuleColor 
}: FormacionDetailDialogProps) {

  const getModuleIcon = (modulo: ModulosFormacion) => {
    const icons = {
      [ModulosFormacion.Voluntario]: Users,
      [ModulosFormacion.Catequesis]: BookOpen,
      [ModulosFormacion.Oraciones]: Cross,
      [ModulosFormacion.Podcast]: Mic,
      [ModulosFormacion.Mision]: Heart,
      [ModulosFormacion.Guia]: Star,
    }
    return icons[modulo] || BookOpen
  }

  // Función para extraer texto plano del HTML
  const getPlainTextFromHTML = useMemo(() => {
    return (html: string) => {
      if (!html) return ""
      
      // Crear un elemento temporal para parsear el HTML
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = html
      
      // Obtener el texto plano
      const text = tempDiv.textContent || tempDiv.innerText || ""
      
      // Limpiar espacios extras
      return text.replace(/\s+/g, ' ').trim()
    }
  }, [])

  // Obtener la descripción en texto plano
  const plainDescription = useMemo(() => {
    return getPlainTextFromHTML(formacion.descripcion || "")
  }, [formacion.descripcion, getPlainTextFromHTML])

  const handleDownload = () => {
    if (formacion.enlace) {
      window.open(formacion.enlace, "_blank")
    } else if (formacion.ruta) {
      const link = document.createElement("a")
      link.href = formacion.ruta
      link.download = formacion.titulo || "documento"
      link.click()
    }
    onOpenChange(false)
  }

  const IconComponent = getModuleIcon(formacion.modulo || ModulosFormacion.Voluntario)
  const moduleColor = getModuleColor(formacion.modulo || ModulosFormacion.Voluntario)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-2xl ${moduleColor.replace('text-', 'bg-').replace('bg-', 'bg-')} bg-opacity-10`}>
              <IconComponent className={`w-6 h-6 ${moduleColor.split(' ')[1]}`} />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold text-foreground line-clamp-2">
                {formacion.titulo}
              </DialogTitle>
              <Badge
                variant="secondary"
                className="mt-2 font-medium border-0 bg-muted/50 text-foreground"
              >
                {formacion.modulo}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 space-y-6 overflow-hidden">
          {/* Información de fecha */}
          {formacion.createdDate && (
            <div className="flex items-center flex-shrink-0 gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>
                Creado el {format(new Date(formacion.createdDate), "dd 'de' MMMM 'de' yyyy", { locale: es })}
              </span>
            </div>
          )}

          {/* Descripción completa en textarea */}
          {plainDescription && (
            <div className="flex flex-col flex-1 min-h-0 space-y-3">
              <h3 className="flex-shrink-0 font-semibold text-foreground">Descripción</h3>
              <div className="flex-1 min-h-0">
                <textarea
                  readOnly
                  value={plainDescription}
                  className="w-full h-full min-h-[140px] max-h-[350px] p-3 text-sm border rounded-md bg-muted/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground/80 leading-relaxed"
                  style={{ 
                    overflowY: 'auto',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap'
                  }}
                />
              </div>
            </div>
          )}

          {/* Botón de acción principal */}
          <div className="flex flex-col flex-shrink-0 gap-3 pt-4">
            <Button
              onClick={handleDownload}
              className="w-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              size="lg"
              disabled={!formacion.enlace && !formacion.ruta}
            >
              {formacion.enlace ? (
                <>
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Acceder al Contenido
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Descargar Recurso
                </>
              )}
            </Button>

            {/* Información adicional del recurso */}
            <div className="text-xs text-center text-muted-foreground">
              {formacion.enlace ? (
                <p>Serás redirigido a una página externa para acceder al contenido</p>
              ) : (
                <p>El archivo se descargará automáticamente a tu dispositivo</p>
              )}
            </div>
          </div>

          {/* Metadatos adicionales */}
          <div className="flex-shrink-0 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-foreground">Módulo:</span>
                <p className="text-muted-foreground">{formacion.modulo}</p>
              </div>
              <div>
                <span className="font-medium text-foreground">Tipo:</span>
                <p className="text-muted-foreground">
                  {formacion.enlace ? "Enlace externo" : "Archivo descargable"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}