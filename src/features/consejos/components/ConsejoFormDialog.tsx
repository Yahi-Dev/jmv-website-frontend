// src/features/consejos/components/ConsejoFormDialog.tsx
"use client"

import { useState, useEffect } from "react"
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
import { Loader2, Calendar, MapPin, Quote, FileText, Image } from "lucide-react"
import { ConsejoFormData, ConsejoNacional } from "../model/types"
import { consejoCreateSchema, consejoUpdateSchema, ConsejoCreateData } from "../schema/validation"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface ConsejoFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: ConsejoFormData) => Promise<void>
  isLoading?: boolean
  initialData?: ConsejoNacional
  mode: "create" | "edit"
}

export function ConsejoFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
  initialData,
  mode
}: ConsejoFormDialogProps) {
  const [suggestedPeriod, setSuggestedPeriod] = useState("")

  const form = useForm<ConsejoCreateData>({
    resolver: zodResolver(mode === "create" ? consejoCreateSchema : consejoUpdateSchema),
    defaultValues: {
      periodo: "",
      fechaInicio: "",
      fechaFin: "",
      sede: "",
      lema: "",
      actaUrl: "",
      fotoUrl: "",
      isActual: false
    }
  })

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
      form.setValue("isActual", true) // Por defecto marcar como actual al crear
    }
  }, [open, mode, form])

  // Cargar datos iniciales en modo edición
  useEffect(() => {
    if (open && initialData && mode === "edit") {
      form.reset({
        periodo: initialData.periodo,
        fechaInicio: format(new Date(initialData.fechaInicio), "yyyy-MM-dd"),
        fechaFin: initialData.fechaFin ? format(new Date(initialData.fechaFin), "yyyy-MM-dd") : "",
        sede: initialData.sede || "",
        lema: initialData.lema || "",
        actaUrl: initialData.actaUrl || "",
        fotoUrl: initialData.fotoUrl || "",
        isActual: initialData.isActual
      })
    }
  }, [open, initialData, mode, form])

  const handleSubmit = async (data: ConsejoCreateData) => {
    await onSubmit(data as ConsejoFormData)
    if (mode === "create") {
      form.reset()
    }
    onOpenChange(false)
  }

  const isSubmitting = isLoading

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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

            {/* Sede */}
            <FormField
              control={form.control}
              name="sede"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sede Nacional</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Ciudad/Región sede..." 
                        {...field} 
                        value={field.value || ""}
                        className="pl-10"
                      />
                      <MapPin className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                        placeholder="Lema o frase inspiradora..." 
                        {...field} 
                        value={field.value || ""}
                        className="pl-10 min-h-[80px] resize-none"
                      />
                      <Quote className="absolute w-4 h-4 top-3 left-3 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URLs */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="fotoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de Foto del Consejo</FormLabel>
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

              <FormField
                control={form.control}
                name="actaUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL del Acta de Constitución</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="https://ejemplo.com/acta-consejo.pdf" 
                          {...field} 
                          value={field.value || ""}
                          className="pl-10"
                        />
                        <FileText className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      Al marcar esta opción, este consejo será mostrado como el actual
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