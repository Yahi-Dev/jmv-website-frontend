// src/features/centros/components/ComunidadJmvFormDialog.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { comunidadCreateSchema, ComunidadCreateData } from "../schema/validation"
import { useEtapasComunidad } from "../hook/use-centros"
import { ComunidadJmv, getTagColor } from "../model/types"
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
import { Badge } from "@/src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Loader2, Link as LinkIcon, Plus, Upload, X } from "lucide-react"
import { toast } from "sonner"

const PRESET_TAGS = ["Fe", "Servicio", "Fraternidad", "Oración", "Misión", "Juventud", "Familia", "Evangelización"]

interface ComunidadJmvFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: ComunidadCreateData) => Promise<void>
  isLoading: boolean
  initialData?: ComunidadJmv
  mode: "create" | "edit"
}

export function ComunidadJmvFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  initialData,
  mode,
}: ComunidadJmvFormDialogProps) {
  const { etapas, isCreating, addEtapa } = useEtapasComunidad()
  const [imageTab, setImageTab] = useState<"url" | "upload">("url")
  const [imagePreview, setImagePreview] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [fileInputKey, setFileInputKey] = useState(0)
  const [newEtapa, setNewEtapa] = useState("")
  const [showNewEtapa, setShowNewEtapa] = useState(false)
  const [etiquetas, setEtiquetas] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")

  const form = useForm<ComunidadCreateData>({
    resolver: zodResolver(comunidadCreateSchema),
    defaultValues: { nombre: "", imagenUrl: "", cantidadMiembros: 0, inicioDate: "", etapa: "", etiquetas: [] },
  })

  const nombreWatch = form.watch("nombre") || ""

  useEffect(() => {
    if (open) {
      if (initialData) {
        const fecha = typeof initialData.inicioDate === "string"
          ? initialData.inicioDate.split("T")[0]
          : new Date(initialData.inicioDate).toISOString().split("T")[0]
        form.reset({
          nombre: initialData.nombre,
          imagenUrl: initialData.imagenUrl,
          cantidadMiembros: initialData.cantidadMiembros,
          inicioDate: fecha,
          etapa: initialData.etapa,
          etiquetas: initialData.etiquetas,
        })
        setEtiquetas(initialData.etiquetas)
        setImagePreview(initialData.imagenUrl)
      } else {
        form.reset({ nombre: "", imagenUrl: "", cantidadMiembros: 0, inicioDate: "", etapa: "", etiquetas: [] })
        setEtiquetas([])
        setImagePreview("")
        setImageTab("url")
      }
      setNewEtapa("")
      setShowNewEtapa(false)
      setCustomTag("")
    }
  }, [open, initialData, form])

  // Sync etiquetas → RHF
  useEffect(() => {
    form.setValue("etiquetas", etiquetas, { shouldValidate: true })
  }, [etiquetas, form])

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

  const handleAddEtapa = async () => {
    const t = newEtapa.trim()
    if (!t) return
    const created = await addEtapa(t)
    if (created) {
      form.setValue("etapa", created.nombre, { shouldValidate: true })
      setNewEtapa("")
      setShowNewEtapa(false)
    }
  }

  const toggleTag = (tag: string) =>
    setEtiquetas((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])

  const addCustomTag = () => {
    const tag = customTag.trim()
    if (!tag || etiquetas.includes(tag) || tag.length > 50) return
    setEtiquetas((prev) => [...prev, tag])
    setCustomTag("")
  }

  const handleSubmit = async (data: ComunidadCreateData) => {
    await onSubmit({ ...data, etiquetas })
    onOpenChange(false)
  }

  const handleInvalid = useCallback((errors: Record<string, any>) => {
    const LABELS: Record<string, string> = {
      nombre: "Nombre", imagenUrl: "Imagen", cantidadMiembros: "Cantidad de miembros",
      inicioDate: "Fecha de inicio", etapa: "Etapa", etiquetas: "Etiquetas",
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
          <DialogTitle>{mode === "create" ? "Agregar comunidad" : "Editar comunidad"}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-5">
          <Form {...form}>
            <form className="space-y-4">
              {/* Nombre */}
              <FormField control={form.control} name="nombre" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Nombre de la comunidad" maxLength={200} className="pr-16" {...field} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                        {nombreWatch.length}/200
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Imagen */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Imagen <span className="text-destructive">*</span></p>
                <Tabs value={imageTab} onValueChange={(v) => setImageTab(v as "url" | "upload")}>
                  <TabsList className="w-full">
                    <TabsTrigger value="url" className="flex-1 gap-1.5"><LinkIcon className="w-3.5 h-3.5" /> URL</TabsTrigger>
                    <TabsTrigger value="upload" className="flex-1 gap-1.5"><Upload className="w-3.5 h-3.5" /> Subir</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url" className="mt-2">
                    <FormField control={form.control} name="imagenUrl" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="https://…" value={field.value} onChange={(e) => handleImageUrl(e.target.value)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </TabsContent>
                  <TabsContent value="upload" className="mt-2">
                    <label className="flex flex-col items-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/40 transition-colors">
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
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border">
                    <img src={imagePreview} alt="Vista previa" className="w-full h-full object-cover" onError={() => setImagePreview("")} />
                    <button type="button" onClick={() => { setImagePreview(""); form.setValue("imagenUrl", "") }}
                      className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Cantidad miembros + Fecha */}
              <div className="grid grid-cols-2 gap-3">
                <FormField control={form.control} name="cantidadMiembros" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Miembros <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="inicioDate" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desde <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Etapa */}
              <FormField control={form.control} name="etapa" render={({ field }) => (
                <FormItem>
                  <FormLabel>Etapa <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una etapa…" />
                        </SelectTrigger>
                        <SelectContent>
                          {etapas.map((e) => (
                            <SelectItem key={e.id} value={e.nombre}>{e.nombre}</SelectItem>
                          ))}
                          {etapas.length === 0 && (
                            <div className="px-3 py-2 text-sm text-muted-foreground">Sin etapas. Crea una abajo.</div>
                          )}
                        </SelectContent>
                      </Select>
                      {!showNewEtapa ? (
                        <button type="button" onClick={() => setShowNewEtapa(true)}
                          className="flex items-center gap-1 text-xs text-primary hover:underline">
                          <Plus className="w-3.5 h-3.5" /> Crear nueva etapa
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <Input placeholder="Nombre de la etapa…" value={newEtapa} maxLength={100}
                            onChange={(e) => setNewEtapa(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddEtapa() } }}
                            className="h-8 text-sm" />
                          <Button type="button" size="sm" className="h-8 px-2" onClick={handleAddEtapa} disabled={isCreating || !newEtapa.trim()}>
                            {isCreating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                          </Button>
                          <Button type="button" variant="ghost" size="sm" className="h-8 px-2" onClick={() => setShowNewEtapa(false)}>
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Etiquetas */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Etiquetas <span className="text-destructive">*</span></p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_TAGS.map((tag) => {
                    const active = etiquetas.includes(tag)
                    return (
                      <button key={tag} type="button" onClick={() => toggleTag(tag)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                          active ? "bg-primary text-primary-foreground border-primary" : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary"
                        }`}>
                        {active && <X className="w-2.5 h-2.5" />}{tag}
                      </button>
                    )
                  })}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Etiqueta personalizada…" value={customTag} maxLength={50}
                    onChange={(e) => setCustomTag(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomTag() } }}
                    className="h-8 text-sm" />
                  <Button type="button" variant="outline" size="sm" className="h-8" onClick={addCustomTag} disabled={!customTag.trim()}>
                    <Plus className="w-3.5 h-3.5" />
                  </Button>
                </div>
                {etiquetas.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {etiquetas.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1 pr-1.5 text-xs">
                        {tag}
                        <button type="button" onClick={() => toggleTag(tag)} className="hover:text-destructive">
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                {form.formState.errors.etiquetas && (
                  <p className="text-sm text-destructive">{form.formState.errors.etiquetas.message}</p>
                )}
              </div>
            </form>
          </Form>
        </div>

        <DialogFooter className="px-6 py-4 border-t shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button disabled={isLoading || isUploading} onClick={form.handleSubmit(handleSubmit, handleInvalid)}>
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            {mode === "create" ? "Agregar" : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
