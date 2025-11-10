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
      const link = document.createElement('a')
      link.href = formacion.ruta
      link.download = formacion.titulo || 'documento'
      link.click()
    }
  }

  return (
    <Card className="flex flex-col h-full transition-shadow duration-200 border border-gray-200 shadow-sm hover:shadow-md">
      <CardHeader className="flex-shrink-0 pb-3">
        <div className="flex items-center justify-between mb-3">
          {formacion.modulo && (
            <Badge 
              variant="secondary" 
              className="font-medium text-gray-700 bg-gray-100 border-0 hover:bg-gray-200"
            >
              {formacion.modulo}
            </Badge>
          )}
          {formacion.createdDate && (
            <span className="text-xs font-medium text-gray-500">
              {new Date(formacion.createdDate).toLocaleDateString('es-ES')}
            </span>
          )}
        </div>
        
        <CardTitle className="text-lg font-semibold leading-tight text-gray-900 line-clamp-2">
          {formacion.titulo}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-grow">
        {formacion.descripcion && (
          <div 
            className="flex-grow mb-4 text-sm leading-relaxed text-gray-600 line-clamp-4"
            dangerouslySetInnerHTML={{ __html: formacion.descripcion }}
          />
        )}
        
        <div className="mt-auto">
          <Button 
            onClick={handleDownload} 
            variant="outline" 
            className="w-full text-gray-700 transition-colors duration-200 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-900"
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
        </div>
      </CardContent>
    </Card>
  )
}