// src/features/testimonios/components/testimonio-form-dialog.tsx
"use client"

import { useState } from "react"
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

export function TestimonioFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
  initialData,
  mode
}: TestimonioFormDialogProps) {
  const form = useForm<TestimonioCreateData>({
    resolver: zodResolver(testimonioCreateSchema),
    defaultValues: {
      nombre: initialData?.nombre || "",
      mensaje: initialData?.mensaje || "",
      reputacion: initialData?.reputacion || 5,
      iglesia: initialData?.iglesia || "",
    }
  })

  const handleSubmit = async (data: TestimonioCreateData) => {
    try {
      await onSubmit(data)
      form.reset()
      onOpenChange(false)
    } catch (error) {
      // El error ya se maneja en el hook
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
                  <FormLabel>Testimonio *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Comparte tu experiencia en JMV..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
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
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
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