// src/features/consejos/components/ConsejoFormDialog.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/src/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Switch } from "@/src/components/ui/switch"
import { Textarea } from "@/src/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Loader2, Calendar, MapPin, Quote, Image, Upload, Link as LinkIcon, X } from "lucide-react"
import { ConsejoFormData, ConsejoNacional } from "../model/types"
import { consejoCreateSchema, consejoUpdateSchema, ConsejoCreateData } from "../schema/validation"
import { format } from "date-fns"

interface ConsejoFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: ConsejoFormData) => Promise<void>
  isLoading?: boolean
  initialData?: ConsejoNacional
  mode: "create" | "edit"
}

type TabValue = "url" | "upload"

export function ConsejoFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
  initialData,
  mode
}: ConsejoFormDialogProps) {
  const [suggestedPeriod, setSuggestedPeriod] = useState("")
  const [fotoTab, setFotoTab] = useState<TabValue>("url")
  const [actaTab, setActaTab] = useState<TabValue>("url")
  const [fotoPreview, setFotoPreview] = useState<string | null>(null)
  const [fotoFile, setFotoFile] = useState<File | null>(null)
  const [actaFile, setActaFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const fotoInputRef = useRef<HTMLInputElement>(null)
  const actaInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<ConsejoCreateData>({
    resolver: zodResolver(mode === "create" ? consejoCreateSchema : consejoUpdateSchema),
    defaultValues: {
      periodo: "",
      fechaInicio: "",
      fechaFin: "",
      lema: "",
      fotoUrl: "",
      isActual: false
    }
  })

  const fotoUrl = form.watch("fotoUrl")

  // Generar periodo sugerido al abrir el modal en modo creación
  useEffect(() => {
    if (open && mode === "create") {
      const currentYear = new Date().getFullYear()
      const nextYear = currentYear + 2
      setSuggestedPeriod(`${currentYear}-${nextYear}`)

      // Establecer fechas por defecto
      const today = new Date()
      const twoYearsLater = new Date(today)
      twoYearsLater.setFullYear(twoYearsLater.getFullYear() + 2)

      form.setValue("periodo", `${currentYear}-${nextYear}`)
      form.setValue("fechaInicio", today.toISOString().split('T')[0])
      form.setValue("fechaFin", twoYearsLater.toISOString().split('T')[0])
      form.setValue("isActual", true)
    }
  }, [open, mode, form])

  // Cargar datos iniciales en modo edición
  useEffect(() => {
    if (open && initialData && mode === "edit") {
      form.reset({
        periodo: initialData.periodo,
        fechaInicio: format(new Date(initialData.fechaInicio), "yyyy-MM-dd"),
        fechaFin: initialData.fechaFin ? format(new Date(initialData.fechaFin), "yyyy-MM-dd") : "",
        lema: initialData.lema || "",
        fotoUrl: initialData.fotoUrl || "",
        isActual: initialData.isActual
      })

      // Mostrar preview si hay foto URL
      if (initialData.fotoUrl) {
        setFotoPreview(initialData.fotoUrl)
        setFotoTab("url")
      }
    }
  }, [open, initialData, mode, form])

  // Actualizar preview cuando cambia la URL de la foto
  useEffect(() => {
    if (fotoTab === "url" && fotoUrl && fotoUrl.trim() !== "") {
      setFotoPreview(fotoUrl)
    } else if (fotoTab === "url" && (!fotoUrl || fotoUrl.trim() === "")) {
      setFotoPreview(null)
    }
  }, [fotoUrl, fotoTab])

  // Resetear estados cuando se cierra el diálogo
  useEffect(() => {
    if (!open) {
      setFotoPreview(null)
      setFotoFile(null)
      setActaFile(null)
      setFotoTab("url")
      setActaTab("url")
    }
  }, [open])

  const handleFotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        form.setError("fotoUrl", { message: "Formato no válido. Use JPEG, PNG, WebP o GIF" })
        return
      }

      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        form.setError("fotoUrl", { message: "La imagen no debe superar 5MB" })
        return
      }

      setFotoFile(file)

      // Crear preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setFotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Limpiar error si existe
      form.clearErrors("fotoUrl")
    }
  }

  const removeFoto = () => {
    setFotoPreview(null)
    setFotoFile(null)
    form.setValue("fotoUrl", "")
    if (fotoInputRef.current) {
      fotoInputRef.current.value = ""
    }
  }

  const uploadFile = async (file: File, type: 'foto' | 'acta'): Promise<string> => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('titulo', `consejo-${type}-${Date.now()}`)
      formData.append('modulo', 'consejos')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al subir archivo')
      }

      const result = await response.json()

      // Debug: log para ver la estructura real de la respuesta
      console.log('Upload response:', result)

      // Ajusta según la estructura real de tu respuesta
      // Si la respuesta es { Data: { filePath: "...", ... } }
      if (result.Data && result.Data.filePath) {
        return result.Data.filePath
      }

      // Si la respuesta es directa { filePath: "...", ... }
      if (result.filePath) {
        return result.filePath
      }

      // Si la respuesta tiene otra estructura
      if (result.data && result.data.filePath) {
        return result.data.filePath
      }

      throw new Error('Estructura de respuesta inesperada')
    } catch (error) {
      console.error(`Error uploading ${type}:`, error)
      throw new Error(`Error al subir ${type === 'foto' ? 'la foto' : 'el acta'}`)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (data: ConsejoCreateData) => {
    try {
      let finalFotoUrl = data.fotoUrl

      // Subir foto si se seleccionó un archivo
      if (fotoFile && fotoTab === "upload") {
        finalFotoUrl = await uploadFile(fotoFile, 'foto')
      }

      const submitData: ConsejoFormData = {
        ...data,
        fotoUrl: finalFotoUrl,
      }

      await onSubmit(submitData)
      if (mode === "create") {
        form.reset()
        setFotoPreview(null)
        setFotoFile(null)
        setActaFile(null)
      }
      onOpenChange(false)
    } catch (error) {
      console.error("Error en submit:", error)
      // El error ya se maneja en el hook
    }
  }

  const isSubmitting = isLoading || uploading

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Crear Nuevo Consejo" : "Editar Consejo"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Registra un nuevo período del consejo nacional"
              : "Actualiza la información del consejo existente"
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Periodo */}
            <FormField
              control={form.control}
              name="periodo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Periodo *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="2024-2026"
                        {...field}
                        className="pl-10"
                      />
                      <Calendar className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                  {mode === "create" && suggestedPeriod && (
                    <p className="text-xs text-muted-foreground">
                      Sugerencia: {suggestedPeriod}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Fechas */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="fechaInicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Inicio *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fechaFin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Fin</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Lema */}
            <FormField
              control={form.control}
              name="lema"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lema del Consejo</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Lema o frase inspiradora del período..."
                        {...field}
                        value={field.value || ""}
                        className="pl-10 resize-none min-h-20"
                      />
                      <Quote className="absolute w-4 h-4 top-3 left-3 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Foto del Consejo */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Foto del Consejo</FormLabel>
                <Tabs value={fotoTab} onValueChange={(value: string) => setFotoTab(value as TabValue)} className="w-auto">
                  <TabsList className="grid w-40 grid-cols-2">
                    <TabsTrigger value="url" className="text-xs">
                      <LinkIcon className="w-3 h-3 mr-1" />
                      URL
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="text-xs">
                      <Upload className="w-3 h-3 mr-1" />
                      Subir
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {fotoTab === "url" ? (
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="fotoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="https://ejemplo.com/foto-consejo.jpg"
                              {...field}
                              value={field.value || ""}
                              className="pl-10"
                            />
                            <Image className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Preview para URL */}
                  {fotoPreview && (
                    <div className="p-4 border rounded-lg bg-muted/20">
                      <h4 className="mb-2 text-sm font-medium">Vista previa:</h4>
                      <div className="flex items-center gap-3">
                        <img
                          src={fotoPreview}
                          alt="Preview de foto del consejo"
                          className="object-cover w-20 h-20 rounded-lg"
                          onError={(e) => {
                            // Si la imagen no carga, mostrar un placeholder
                            e.currentTarget.src = "/logo_dominicano.png"
                          }}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">
                            Imagen cargada desde URL
                          </p>
                          <p className="text-xs truncate text-muted-foreground">
                            {fotoUrl}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setFotoPreview(null)
                            form.setValue("fotoUrl", "")
                          }}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <Input
                    ref={fotoInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleFotoUpload}
                    className="cursor-pointer"
                  />

                  {/* Preview para archivo subido */}
                  {fotoPreview && (
                    <div className="p-4 border rounded-lg bg-muted/20">
                      <h4 className="mb-2 text-sm font-medium">Vista previa:</h4>
                      <div className="flex items-center gap-3">
                        <img
                          src={fotoPreview}
                          alt="Preview de foto del consejo"
                          className="object-cover w-20 h-20 rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{fotoFile?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {((fotoFile?.size || 0) / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={removeFoto}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Formatos: JPEG, PNG, WebP, GIF. Máximo 5MB.
                  </div>
                </div>
              )}
            </div>

            {/* Consejo Actual */}
            <FormField
              control={form.control}
              name="isActual"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      ¿Es el consejo actual?
                    </FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Al marcar esta opción, este consejo será mostrado como el actual en la página principal
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {mode === "create" ? "Crear Consejo" : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}