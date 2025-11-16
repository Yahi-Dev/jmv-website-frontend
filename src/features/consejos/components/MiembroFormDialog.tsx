// src/features/consejos/components/MiembroFormDialog.tsx
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
import { Textarea } from "@/src/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Badge } from "@/src/components/ui/badge"
import { Loader2, Plus, Trash2, User, Mail, Phone, MapPin, Linkedin, Briefcase } from "lucide-react"
import { MiembroFormData, MiembroConsejo, CargoConsejo, EstadoMiembro, TrayectoriaItem } from "../model/types"
import { miembroCreateSchema, miembroUpdateSchema, MiembroCreateData } from "../schema/validation"

interface MiembroFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: MiembroFormData) => Promise<void>
  isLoading?: boolean
  initialData?: MiembroConsejo
  mode: "create" | "edit"
  consejoId?: number
}

const CARGO_OPTIONS = Object.values(CargoConsejo).map(cargo => ({
  value: cargo,
  label: cargo
}))

const ESTADO_OPTIONS = [
  { value: EstadoMiembro.Titular, label: "Titular" },
  { value: EstadoMiembro.Suplente, label: "Suplente" }
]

export function MiembroFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
  initialData,
  mode,
  consejoId
}: MiembroFormDialogProps) {
  const [trayectoriaItems, setTrayectoriaItems] = useState<TrayectoriaItem[]>([])

  const form = useForm<MiembroCreateData>({
    resolver: zodResolver(mode === "create" ? miembroCreateSchema : miembroUpdateSchema),
    defaultValues: {
      nombre: "",
      cargo: CargoConsejo.Vocal,
      ciudad: "",
      fotoUrl: "",
      estado: EstadoMiembro.Titular,
      bioCorta: "",
      bioExtendida: "",
      telefono: "",
      email: "",
      trayectoria: []
    }
  })

  // Cargar datos iniciales
  useEffect(() => {
    if (open && initialData && mode === "edit") {
      form.reset({
        nombre: initialData.nombre,
        cargo: initialData.cargo,
        ciudad: initialData.ciudad || "",
        fotoUrl: initialData.fotoUrl || "",
        estado: initialData.estado,
        bioCorta: initialData.bioCorta || "",
        bioExtendida: initialData.bioExtendida || "",
        telefono: initialData.telefono || "",
        email: initialData.email || "",
        trayectoria: initialData.trayectoria || []
      })
      setTrayectoriaItems(initialData.trayectoria || [])
    } else if (open && mode === "create") {
      form.reset({
        nombre: "",
        cargo: CargoConsejo.Vocal,
        ciudad: "",
        fotoUrl: "",
        estado: EstadoMiembro.Titular,
        bioCorta: "",
        bioExtendida: "",
        telefono: "",
        email: "",
        trayectoria: []
      })
      setTrayectoriaItems([])
    }
  }, [open, initialData, mode, form])

  const addTrayectoriaItem = () => {
    const newItem: TrayectoriaItem = {
      id: Math.random().toString(36).substr(2, 9),
      anio: new Date().getFullYear(),
      rol: "",
      lugar: ""
    }
    setTrayectoriaItems(prev => [...prev, newItem])
  }

  const updateTrayectoriaItem = (id: string, field: keyof TrayectoriaItem, value: any) => {
    setTrayectoriaItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  const removeTrayectoriaItem = (id: string) => {
    setTrayectoriaItems(prev => prev.filter(item => item.id !== id))
  }

  const handleSubmit = async (data: MiembroCreateData) => {
    const submitData: MiembroFormData = {
      ...data,
      trayectoria: trayectoriaItems.filter(item => item.rol.trim() !== ""), // Solo items con rol
      ...(mode === "create" && consejoId && { consejoId })
    }

    await onSubmit(submitData)
    if (mode === "create") {
      form.reset()
      setTrayectoriaItems([])
    }
    onOpenChange(false)
  }

  const isSubmitting = isLoading

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Agregar Miembro" : "Editar Miembro"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" 
              ? "Agrega un nuevo miembro al consejo nacional" 
              : "Actualiza la información del miembro"
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Información Básica */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Nombre del miembro..." {...field} className="pl-10" />
                        <User className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un cargo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CARGO_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="ciudad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Ciudad de residencia..." {...field} value={field.value || ""} className="pl-10" />
                        <MapPin className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ESTADO_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contacto */}
            <div className="space-y-4">
              <h3 className="font-medium">Información de Contacto</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="email@ejemplo.com" {...field} value={field.value || ""} className="pl-10" />
                          <Mail className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="+1 (809) 555-0123" {...field} value={field.value || ""} className="pl-10" />
                          <Phone className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="fotoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de Foto</FormLabel>
                    <FormControl>
                      <Input placeholder="https://ejemplo.com/foto.jpg" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Biografía */}
            <div className="space-y-4">
              <h3 className="font-medium">Biografía</h3>
              <FormField
                control={form.control}
                name="bioCorta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biografía Corta</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Breve descripción para mostrar en tarjetas..." 
                        {...field} 
                        value={field.value || ""}
                        className="min-h-[80px] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="text-xs text-muted-foreground">
                      Máximo 200 caracteres. Actual: {field.value?.length || 0}/200
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bioExtendida"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biografía Extendida</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descripción más detallada para el perfil completo..." 
                        {...field} 
                        value={field.value || ""}
                        className="min-h-[120px] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="text-xs text-muted-foreground">
                      Máximo 2000 caracteres. Actual: {field.value?.length || 0}/2000
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Trayectoria */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Trayectoria en JMV</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTrayectoriaItem}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Experiencia
                </Button>
              </div>

              <div className="space-y-3">
                {trayectoriaItems.map((item, index) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
                      <div>
                        <label className="text-sm font-medium">Año</label>
                        <Input
                          type="number"
                          value={item.anio}
                          onChange={(e) => updateTrayectoriaItem(item.id!, 'anio', parseInt(e.target.value) || new Date().getFullYear())}
                          min="1900"
                          max={new Date().getFullYear() + 1}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Rol *</label>
                        <Input
                          value={item.rol}
                          onChange={(e) => updateTrayectoriaItem(item.id!, 'rol', e.target.value)}
                          placeholder="Coordinador, Voluntario..."
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Lugar</label>
                        <Input
                          value={item.lugar || ""}
                          onChange={(e) => updateTrayectoriaItem(item.id!, 'lugar', e.target.value)}
                          placeholder="Ciudad, Región..."
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTrayectoriaItem(item.id!)}
                      className="mt-6 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                {trayectoriaItems.length === 0 && (
                  <div className="py-8 text-center border-2 border-dashed rounded-lg border-muted-foreground/20">
                    <Briefcase className="w-12 h-12 mx-auto mb-2 text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground">
                      No hay experiencias agregadas
                    </p>
                  </div>
                )}
              </div>
            </div>

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
                {mode === "create" ? "Agregar Miembro" : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}