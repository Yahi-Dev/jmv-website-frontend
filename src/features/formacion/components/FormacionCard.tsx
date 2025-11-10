"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Download, ExternalLink } from "lucide-react"
import { FormacionType } from "../model/types"
import { Badge } from "@/src/components/ui/badge"
import { ModulosFormacion } from "@/src/lib/enum/ModulosFormacion"

interface FormacionCardProps {
  readonly formacion: FormacionType
  readonly isLoggedIn: boolean
  readonly onEdit: () => void
  readonly onDelete: () => void
  readonly getModuleColor: (modulo: ModulosFormacion) => string
}

export function FormacionCard({ 
  formacion, 
  isLoggedIn, 
  onEdit, 
  onDelete,
  getModuleColor
}: FormacionCardProps) {
  const handleDownload = () => {
    if (formacion.enlace) {
      window.open(formacion.enlace, '_blank')
    } else if (formacion.ruta) {
      // Para archivos locales, crear enlace de descarga
      const link = document.createElement('a')
      link.href = formacion.ruta
      link.download = formacion.titulo || 'documento'
      link.click()
    }
  }

  return (
    <Card className="relative transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-card to-background group">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-3">
          {formacion.modulo && (
            <Badge variant="secondary" className={getModuleColor(formacion.modulo)}>
              {formacion.modulo}
            </Badge>
          )}
          <Badge variant="outline" className="text-green-800 bg-green-100">
            Dinámico
          </Badge>
        </div>

        <CardTitle className="text-lg line-clamp-2">{formacion.titulo}</CardTitle>
      </CardHeader>

      <CardContent>
        {formacion.descripcion && (
          <div 
            className="mb-4 text-sm prose-sm prose text-muted-foreground line-clamp-3 max-w-none"
            dangerouslySetInnerHTML={{ __html: formacion.descripcion }}
          />
        )}

        <Button 
          onClick={handleDownload} 
          variant="outline" 
          className="w-full bg-transparent"
          disabled={!formacion.enlace && !formacion.ruta}
        >
          {formacion.enlace ? (
            <>
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver Recurso
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </>
          )}
        </Button>

        <div className="mt-3 text-xs text-muted-foreground">
          {formacion.createdDate && new Date(formacion.createdDate).toLocaleDateString('es-ES')}
        </div>
      </CardContent>
    </Card>
  )
}