"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormacionCreateData, formacionCreateSchema, FormacionUpdateData } from "../schema/validation"
import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Loader2, Upload, Link, FileText } from "lucide-react"
import { FormacionType } from "../model/types"
import { ModulosFormacion } from "@/src/lib/enum/ModulosFormacion"
import { MinimalTiptap } from "@/src/components/ui/io/minimal-tiptap"
import { uploadDocument } from "../service/formacion-service"

interface FormacionFormDialogProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
  readonly onSubmit: (data: FormacionCreateData | FormacionUpdateData) => Promise<void>
  readonly isLoading?: boolean
  readonly initialData?: FormacionType
  readonly mode: "create" | "edit"
}

const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export function FormacionFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
  initialData,
  mode
}: Readonly<FormacionFormDialogProps>) {
  const [uploadType, setUploadType] = useState<"link" | "file">("link")
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Usar el tipo correcto según el modo
  const form = useForm<FormacionCreateData>({
    resolver: zodResolver(formacionCreateSchema),
    defaultValues: {
      titulo: initialData?.titulo || "",
      descripcion: initialData?.descripcion || "",
      modulo: initialData?.modulo || ModulosFormacion.Voluntario,
      enlace: initialData?.enlace || "",
      ruta: initialData?.ruta || "",
    }
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        titulo: initialData.titulo || "",
        descripcion: initialData.descripcion || "",
        modulo: initialData.modulo || ModulosFormacion.Voluntario,
        enlace: initialData.enlace || "",
        ruta: initialData.ruta || "",
      })
      setUploadType(initialData.enlace ? "link" : "file")
    } else {
      // Resetear el formulario cuando no hay initialData (modo create)
      form.reset({
        titulo: "",
        descripcion: "",
        modulo: ModulosFormacion.Voluntario,
        enlace: "",
        ruta: "",
      })
      setUploadType("link")
      setFile(null)
    }
  }, [open, initialData, form])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
        form.setError("ruta", {
          type: "manual",
          message: "Tipo de archivo no permitido. Solo se permiten imágenes, PDF y documentos Word"
        })
        return
      }
      if (selectedFile.size > MAX_FILE_SIZE) {
        form.setError("ruta", {
          type: "manual",
          message: "El archivo es demasiado grande. Máximo 30MB"
        })
        return
      }
      setFile(selectedFile)
      form.clearErrors("ruta")
    }
  }

  const handleSubmit = async (data: FormacionCreateData) => {
    try {
      let finalData = { ...data }

      // Si es upload de archivo, subirlo primero
      if (uploadType === "file" && file) {
        setIsUploading(true)
        const uploadResult = await uploadDocument(file, data.titulo)
        if (uploadResult.success && uploadResult.filePath) {
          finalData.ruta = uploadResult.filePath
          finalData.enlace = "" // Limpiar enlace si se subió archivo
        } else {
          throw new Error(uploadResult.message || "Error al subir archivo")
        }
      } else {
        finalData.ruta = "" // Limpiar ruta si se usa enlace
      }

      await onSubmit(finalData as FormacionCreateData | FormacionUpdateData)
      form.reset()
      setFile(null)
      setUploadType("link")
      onOpenChange(false)
    } catch (error) {
      console.error("Error submitting form:", error)
      // El error ya se maneja en el hook
    } finally {
      setIsUploading(false)
    }
  }

  const isSubmitting = isLoading || isUploading

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Agregar Formación" : "Editar Formación"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" 
              ? "Crea un nuevo contenido de formación para JMV" 
              : "Actualiza la información de la formación"
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Introducción a la Espiritualidad Vicenciana" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="modulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Módulo *</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value as string}
                    value={field.value as string}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un módulo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(ModulosFormacion).map((modulo) => (
                        <SelectItem key={modulo} value={modulo}>
                          {modulo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción *</FormLabel>
                  <FormControl>
                    <MinimalTiptap
                      content={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Escribe la descripción de la formación..."
                      className="min-h-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Tipo de recurso</FormLabel>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={uploadType === "link" ? "default" : "outline"}
                  onClick={() => setUploadType("link")}
                  className="flex-1"
                >
                  <Link className="w-4 h-4 mr-2" />
                  Enlace URL
                </Button>
                <Button
                  type="button"
                  variant={uploadType === "file" ? "default" : "outline"}
                  onClick={() => setUploadType("file")}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Subir Archivo
                </Button>
              </div>
            </div>

            {uploadType === "link" ? (
              <FormField
                control={form.control}
                name="enlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enlace URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://ejemplo.com/recurso" 
                        {...field} 
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormItem>
                <FormLabel>Archivo *</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept={ALLOWED_FILE_TYPES.join(',')}
                      onChange={handleFileChange}
                    />
                    {file && (
                      <div className="flex items-center gap-2 p-2 text-sm border rounded-md">
                        <FileText className="w-4 h-4" />
                        <span className="flex-1 truncate">{file.name}</span>
                        <span className="text-muted-foreground">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
                <div className="text-xs text-muted-foreground">
                  Formatos permitidos: JPG, PNG, GIF, WebP, PDF, DOC, DOCX. Máximo 30MB
                </div>
              </FormItem>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false)
                  setFile(null)
                  setUploadType("link")
                }}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || (uploadType === "file" && !file)}
              >
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {mode === "create" ? "Crear Formación" : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}