"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Download, ExternalLink, Edit, Trash2, BookOpen, Mic, Users, Heart, Star, Cross, Eye } from "lucide-react"
import type { FormacionType } from "../model/types"
import { Badge } from "@/src/components/ui/badge"
import { ModulosFormacion } from "@/src/lib/enum/ModulosFormacion"
import { useMemo, useState } from "react"
import { FormacionDetailDialog } from "./formacion-detail-dialog"

interface FormacionCardProps {
  readonly formacion: FormacionType
  readonly isLoggedIn: boolean
  readonly onEdit: () => void
  readonly onDelete: () => void
  readonly getModuleColor: (modulo: ModulosFormacion) => string
}

export function FormacionCard({ formacion, isLoggedIn, onEdit, onDelete, getModuleColor }: FormacionCardProps) {
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  
  // Función para extraer texto plano del HTML
  const getPlainTextFromHTML = useMemo(() => {
    return (html: string) => {
      if (!html) return ""
      
      // Crear un elemento temporal para parsear el HTML
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = html
      
      // Obtener el texto plano
      const text = tempDiv.textContent || tempDiv.innerText || ""
      
      // Limpiar espacios extras y limitar longitud
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
  }

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

  const IconComponent = getModuleIcon(formacion.modulo || ModulosFormacion.Voluntario)

  return (
    <>
      <Card 
        className="relative flex flex-col h-full overflow-hidden transition-all duration-300 border-0 shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1 group bg-gradient-to-br from-card to-background"
        onClick={() => setShowDetailDialog(true)}
      >
        {/* Icono decorativo */}
        <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${getModuleColor(formacion.modulo || ModulosFormacion.Voluntario).split(' ')[0]} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}>
          <IconComponent className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
        </div>

        <CardHeader className="relative z-10 flex-shrink-0 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${getModuleColor(formacion.modulo || ModulosFormacion.Voluntario).replace('text-', 'bg-').replace('bg-', 'bg-')} bg-opacity-10`}>
                <IconComponent className={`w-6 h-6 ${getModuleColor(formacion.modulo || ModulosFormacion.Voluntario).split(' ')[1]}`} />
              </div>
              <Badge
                variant="secondary"
                className="font-medium border-0 bg-muted/50 text-foreground"
              >
                {formacion.modulo}
              </Badge>
            </div>

            {isLoggedIn && (
              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onEdit}
                  className="w-7 h-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <Edit className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onDelete}
                  className="w-7 h-7 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>

          <CardTitle className="text-lg font-bold leading-tight text-balance text-foreground line-clamp-2">
            {formacion.titulo}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10 flex flex-col flex-grow pb-6">
          {plainDescription && (
            <div className="flex-grow mb-6">
              <p className="text-sm leading-relaxed break-words text-muted-foreground line-clamp-3 text-pretty">
                {plainDescription}
              </p>
            </div>
          )}

          <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
            <Button
              onClick={handleDownload}
              className="w-full font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
              disabled={!formacion.enlace && !formacion.ruta}
            >
              {formacion.enlace ? (
                <>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Acceder al Contenido
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Recurso
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de detalles */}
      <FormacionDetailDialog
        formacion={formacion}
        open={showDetailDialog}
        onOpenChange={setShowDetailDialog}
        getModuleColor={getModuleColor}
      />
    </>
  )
}