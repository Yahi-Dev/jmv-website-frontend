// src/features/testimonios/components/testimonio-form-dialog.tsx
"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TestimonioCreateData, testimonioCreateSchema, TestimonioUpdateData } from "../schema/validation"
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
import { Textarea } from "@/src/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { TestimonioType } from "../model/types"
import { StarRating } from "@/src/components/shared/star-rating"

interface TestimonioFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: TestimonioCreateData | TestimonioUpdateData) => Promise<void>
  isLoading?: boolean
  initialData?: TestimonioType
  mode: "create" | "edit"
}

// Constantes para los límites de caracteres
const MAX_MESSAGE_LENGTH = 200
const MIN_MESSAGE_LENGTH = 10

export function TestimonioFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
  initialData,
  mode
}: TestimonioFormDialogProps) {
  const [charCount, setCharCount] = useState(0)

  const form = useForm<TestimonioCreateData>({
    resolver: zodResolver(testimonioCreateSchema),
    defaultValues: {
      nombre: initialData?.nombre || "",
      mensaje: initialData?.mensaje || "",
      reputacion: initialData?.reputacion || 5,
      iglesia: initialData?.iglesia || "",
    }
  })

  // Actualizar el contador cuando cambia el mensaje
  const messageValue = form.watch("mensaje")
  useEffect(() => {
    setCharCount(messageValue?.length || 0)
  }, [messageValue])

  // Resetear el contador cuando se abre/cierra el dialog
  useEffect(() => {
    if (initialData) {
      form.reset({
        nombre: initialData.nombre || "",
        mensaje: initialData.mensaje || "",
        reputacion: initialData.reputacion || 5,
        iglesia: initialData.iglesia || "",
      })
    }
  }, [open, initialData, form])

  const handleSubmit = async (data: TestimonioCreateData) => {
    try {
      await onSubmit(data)
      form.reset()
      setCharCount(0)
      onOpenChange(false)
    } catch (error) {
      // El error ya se maneja en el hook
    }
  }

  // Función para manejar el cambio del textarea y limitar caracteres
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>, onChange: (value: string) => void) => {
    const value = e.target.value
    if (value.length <= MAX_MESSAGE_LENGTH) {
      onChange(value)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Agregar Testimonio" : "Editar Testimonio"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" 
              ? "Comparte una experiencia transformadora en JMV" 
              : "Actualiza la información del testimonio"
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: María González" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mensaje"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <span>Testimonio *</span>
                    <span className={`text-sm font-normal ${
                      charCount > MAX_MESSAGE_LENGTH ? 'text-destructive' : 
                      charCount >= MIN_MESSAGE_LENGTH ? 'text-green-600' : 'text-muted-foreground'
                    }`}>
                      {charCount}/{MAX_MESSAGE_LENGTH}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Comparte tu experiencia en JMV..."
                        className="min-h-[100px] pr-12 break-words break-all whitespace-pre-wrap"
                        {...field}
                        onChange={(e) => handleMessageChange(e, field.onChange)}
                        value={field.value || ""}
                      />
                      {charCount > MAX_MESSAGE_LENGTH && (
                        <div className="absolute right-3 top-3">
                          <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                  <div className="mt-1 text-xs text-muted-foreground">
                    {charCount < MIN_MESSAGE_LENGTH && (
                      <span>Mínimo {MIN_MESSAGE_LENGTH} caracteres</span>
                    )}
                    {charCount >= MIN_MESSAGE_LENGTH && charCount <= MAX_MESSAGE_LENGTH && (
                      <span className="text-green-600">✓ Longitud adecuada</span>
                    )}
                    {charCount > MAX_MESSAGE_LENGTH && (
                      <span className="text-destructive">✗ Límite excedido</span>
                    )}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reputacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evaluación *</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <StarRating
                        rating={field.value || 5}
                        onRatingChange={field.onChange}
                        readonly={false}
                      />
                      <span className="text-sm text-muted-foreground">
                        {field.value} de 5 estrellas
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="iglesia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Iglesia/Capítulo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Parroquia San José" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false)
                  setCharCount(0)
                }}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading || charCount < MIN_MESSAGE_LENGTH || charCount > MAX_MESSAGE_LENGTH}
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {mode === "create" ? "Crear Testimonio" : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}