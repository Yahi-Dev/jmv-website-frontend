// src/features/centros/components/MiembroCentroFormDialog.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { miembroCreateSchema, MiembroCreateData } from "../schema/validation"
import { useCargoCentros } from "../hook/use-centros"
import { MiembroCentroJmv } from "../model/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Loader2, Link as LinkIcon, Plus, Upload, X } from "lucide-react"
import { toast } from "sonner"

interface MiembroCentroFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: MiembroCreateData) => Promise<void>
  isLoading: boolean
  initialData?: MiembroCentroJmv
  mode: "create" | "edit"
}

export function MiembroCentroFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  initialData,
  mode,
}: MiembroCentroFormDialogProps) {
  const { cargos, isCreating, addCargo, refetch: refetchCargos } = useCargoCentros()
  const [imageTab, setImageTab] = useState<"url" | "upload">("url")
  const [imagePreview, setImagePreview] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [fileInputKey, setFileInputKey] = useState(0)
  const [newCargo, setNewCargo] = useState("")
  const [showNewCargo, setShowNewCargo] = useState(false)

  const form = useForm<MiembroCreateData>({
    resolver: zodResolver(miembroCreateSchema),
    defaultValues: { nombre: "", imagenUrl: "", descripcion: "", cargo: "" },
  })

  const nombreWatch = form.watch("nombre") || ""
  const descripcionWatch = form.watch("descripcion") || ""

  useEffect(() => {
    if (open) {
      if (initialData) {
        form.reset({
          nombre: initialData.nombre,
          imagenUrl: initialData.imagenUrl,
          descripcion: initialData.descripcion,
          cargo: initialData.cargo,
        })
        setImagePreview(initialData.imagenUrl)
      } else {
        form.reset({ nombre: "", imagenUrl: "", descripcion: "", cargo: "" })
        setImagePreview("")
        setImageTab("url")
      }
      setNewCargo("")
      setShowNewCargo(false)
    }
  }, [open, initialData, form])

  const handleImageUrl = (url: string) => {
    form.setValue("imagenUrl", url, { shouldValidate: true })
    setImagePreview(url)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!allowed.includes(file.type)) { toast.error("Solo imágenes JPEG, PNG, WebP o GIF"); return }
    if (file.size > 5 * 1024 * 1024) { toast.error("Máx. 5 MB"); return }
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("titulo", form.getValues("nombre") || file.name.replace(/\.[^/.]+$/, ""))
      formData.append("modulo", "centros")
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message)
      const url = json.data?.filePath
      form.setValue("imagenUrl", url, { shouldValidate: true })
      setImagePreview(url)
      toast.success("Imagen subida")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al subir imagen")
    } finally {
      setIsUploading(false)
      setFileInputKey((k) => k + 1)
    }
  }

  const handleAddCargo = async () => {
    const t = newCargo.trim()
    if (!t) return
    const created = await addCargo(t)
    if (created) {
      form.setValue("cargo", created.nombre, { shouldValidate: true })
      setNewCargo("")
      setShowNewCargo(false)
    }
  }

  const handleSubmit = async (data: MiembroCreateData) => {
    await onSubmit(data)
    onOpenChange(false)
  }

  const handleInvalid = useCallback((errors: Record<string, any>) => {
    const LABELS: Record<string, string> = {
      nombre: "Nombre", imagenUrl: "Imagen", descripcion: "Descripción", cargo: "Cargo",
    }
    const firstField = Object.keys(errors)[0]
    const label = LABELS[firstField] ?? firstField
    const msg = errors[firstField]?.message ?? "Verifica los campos"
    toast.error(`${label}: ${msg}`)
  }, [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[92vh] flex flex-col overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <DialogTitle>{mode === "create" ? "Agregar miembro" : "Editar miembro"}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-5">
          <Form {...form}>
            <form className="space-y-4">
              {/* Nombre */}
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Nombre completo" maxLength={200} className="pr-16" {...field} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                          {nombreWatch.length}/200
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Imagen */}
              <div className="space-y-2">
                <p className="text-sm font-medium leading-none">
                  Imagen <span className="text-destructive">*</span>
                </p>
                <Tabs value={imageTab} onValueChange={(v) => setImageTab(v as "url" | "upload")}>
                  <TabsList className="w-full">
                    <TabsTrigger value="url" className="flex-1 gap-1.5"><LinkIcon className="w-3.5 h-3.5" /> URL</TabsTrigger>
                    <TabsTrigger value="upload" className="flex-1 gap-1.5"><Upload className="w-3.5 h-3.5" /> Subir</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url" className="mt-2">
                    <FormField
                      control={form.control}
                      name="imagenUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="https://..." value={field.value} onChange={(e) => handleImageUrl(e.target.value)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="upload" className="mt-2">
                    <label className="flex flex-col items-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/40 transition-colors text-center">
                      {isUploading ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <Upload className="w-5 h-5 text-muted-foreground" />}
                      <span className="text-xs text-muted-foreground">{isUploading ? "Subiendo…" : "Seleccionar imagen"}</span>
                      <input key={fileInputKey} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    </label>
                    {form.formState.errors.imagenUrl && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.imagenUrl.message}</p>
                    )}
                  </TabsContent>
                </Tabs>
                {imagePreview && (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-muted mx-auto">
                    <img src={imagePreview} alt="Vista previa" className="w-full h-full object-cover" onError={() => setImagePreview("")} />
                    <button type="button" onClick={() => { setImagePreview(""); form.setValue("imagenUrl", "") }}
                      className="absolute top-0 right-0 bg-black/60 text-white rounded-full p-0.5 hover:bg-black/80">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Descripción */}
              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Textarea placeholder="Qué hace o representa en el centro…" maxLength={1000} className="resize-none min-h-24 pr-16" {...field} />
                        <span className="absolute right-3 bottom-3 text-xs text-muted-foreground pointer-events-none">
                          {descripcionWatch.length}/1000
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cargo */}
              <FormField
                control={form.control}
                name="cargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un cargo…" />
                          </SelectTrigger>
                          <SelectContent>
                            {cargos.map((c) => (
                              <SelectItem key={c.id} value={c.nombre}>{c.nombre}</SelectItem>
                            ))}
                            {cargos.length === 0 && (
                              <div className="px-3 py-2 text-sm text-muted-foreground">Sin cargos. Crea uno abajo.</div>
                            )}
                          </SelectContent>
                        </Select>
                        {!showNewCargo ? (
                          <button type="button" onClick={() => setShowNewCargo(true)}
                            className="flex items-center gap-1 text-xs text-primary hover:underline">
                            <Plus className="w-3.5 h-3.5" /> Crear nuevo cargo
                          </button>
                        ) : (
                          <div className="flex gap-2">
                            <Input
                              placeholder="Nombre del cargo…"
                              value={newCargo}
                              maxLength={100}
                              onChange={(e) => setNewCargo(e.target.value)}
                              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCargo() } }}
                              className="h-8 text-sm"
                            />
                            <Button type="button" size="sm" className="h-8 px-2" onClick={handleAddCargo} disabled={isCreating || !newCargo.trim()}>
                              {isCreating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                            </Button>
                            <Button type="button" variant="ghost" size="sm" className="h-8 px-2" onClick={() => setShowNewCargo(false)}>
                              <X className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DialogFooter className="px-6 py-4 border-t shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button
            disabled={isLoading || isUploading}
            onClick={form.handleSubmit(handleSubmit, handleInvalid)}
          >
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            {mode === "create" ? "Agregar" : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
