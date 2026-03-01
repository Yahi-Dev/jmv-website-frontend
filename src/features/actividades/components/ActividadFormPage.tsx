// src/features/actividades/components/ActividadFormPage.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { actividadCreateSchema, ActividadCreateData } from "../schema/validation"
import {
  getActividadBySlug,
  createActividad,
  updateActividad,
} from "../service/actividad-service"
import { getCentros } from "@/src/features/centros/service/centro-service"
import { ActividadJmv } from "../model/types"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Badge } from "@/src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form"
import {
  ArrowLeft,
  Activity,
  CalendarDays,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  Plus,
  Save,
  Tag,
  Upload,
  X,
} from "lucide-react"
import { toast } from "sonner"

const PRESET_TAGS = [
  "Misión", "Formación", "Espiritualidad", "Servicio", "Comunidad",
  "Juventud", "Retiro", "Reunión", "Celebración", "Evangelización",
]

interface ActividadFormPageProps {
  mode: "create" | "edit"
  actividadId?: number
}

export function ActividadFormPage({ mode, actividadId }: ActividadFormPageProps) {
  const router = useRouter()

  const [pageLoading, setPageLoading] = useState(mode === "edit")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [actividad, setActividad] = useState<ActividadJmv | null>(null)

  const [centros, setCentros] = useState<{ id: number; nombreParroquia: string }[]>([])
  const [etiquetas, setEtiquetas] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")

  const [imageTab, setImageTab] = useState<"url" | "upload">("url")
  const [imagePreview, setImagePreview] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [fileInputKey, setFileInputKey] = useState(0)

  const form = useForm<ActividadCreateData>({
    resolver: zodResolver(actividadCreateSchema),
    defaultValues: {
      titulo: "",
      centroId: 0,
      resumen: "",
      fecha: "",
      imagenUrl: "",
      etiquetas: [],
    },
  })

  const tituloWatch = form.watch("titulo") || ""
  const resumenWatch = form.watch("resumen") || ""

  // Load centros
  useEffect(() => {
    getCentros({ limit: 200 })
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : []
        setCentros(data.map((c: any) => ({ id: c.id, nombreParroquia: c.nombreParroquia })))
      })
      .catch(() => {})
  }, [])

  // Load actividad for edit
  useEffect(() => {
    if (mode !== "edit" || !actividadId) return
    setPageLoading(true)
    getActividadBySlug(String(actividadId))
      .then((r) => {
        const data = r.data as ActividadJmv | undefined
        if (!data || Array.isArray(data)) {
          toast.error("Actividad no encontrada")
          router.replace("/admin/actividades")
          return
        }
        setActividad(data)
        const fechaStr =
          typeof data.fecha === "string"
            ? data.fecha.split("T")[0]
            : new Date(data.fecha).toISOString().split("T")[0]
        form.reset({
          titulo: data.titulo,
          centroId: data.centroId,
          resumen: data.resumen,
          fecha: fechaStr,
          imagenUrl: data.imagenUrl,
          etiquetas: data.etiquetas,
        })
        setEtiquetas(data.etiquetas)
        setImagePreview(data.imagenUrl)
      })
      .catch(() => {
        toast.error("Error al cargar la actividad")
        router.replace("/admin/actividades")
      })
      .finally(() => setPageLoading(false))
  }, [mode, actividadId, form, router])

  // Sync etiquetas → RHF
  useEffect(() => {
    form.setValue("etiquetas", etiquetas, { shouldValidate: true })
  }, [etiquetas, form])

  // Image handlers
  const handleImageUrlChange = (url: string) => {
    form.setValue("imagenUrl", url, { shouldValidate: true })
    setImagePreview(url)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!allowed.includes(file.type)) {
      toast.error("Solo se permiten imágenes JPEG, PNG, WebP o GIF")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen no puede superar 5 MB")
      return
    }
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("titulo", form.getValues("titulo") || file.name.replace(/\.[^/.]+$/, ""))
      formData.append("modulo", "actividades")
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || "Error al subir imagen")
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

  const toggleTag = (tag: string) =>
    setEtiquetas((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )

  const addCustomTag = () => {
    const tag = customTag.trim()
    if (!tag || etiquetas.includes(tag) || tag.length > 50) return
    setEtiquetas((prev) => [...prev, tag])
    setCustomTag("")
  }

  const handleSubmit = async (data: ActividadCreateData) => {
    setIsSubmitting(true)
    try {
      if (mode === "edit" && actividadId) {
        await updateActividad(actividadId, { ...data, etiquetas })
        toast.success("Actividad actualizada")
      } else {
        await createActividad({ ...data, etiquetas })
        toast.success("Actividad creada")
      }
      router.push("/admin/actividades")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al guardar")
      setIsSubmitting(false)
    }
  }

  const handleInvalid = useCallback((errors: Record<string, any>) => {
    const LABELS: Record<string, string> = {
      imagenUrl: "Imagen",
      titulo: "Título",
      centroId: "Centro",
      resumen: "Resumen",
      fecha: "Fecha",
      etiquetas: "Etiquetas",
    }
    const firstField = Object.keys(errors)[0]
    const label = LABELS[firstField] ?? firstField
    const msg = errors[firstField]?.message ?? "Verifica los campos requeridos"
    toast.error(`${label}: ${msg}`)
  }, [])

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/admin/actividades")}
            className="shrink-0"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver
          </Button>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold truncate">
              {mode === "create" ? "Nueva Actividad" : `Editar: ${actividad?.titulo || "…"}`}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === "create"
                ? "Completa todos los campos para registrar la actividad"
                : "Modifica la información de la actividad"}
            </p>
          </div>
        </div>
        <Button
          disabled={isSubmitting || isUploading}
          onClick={form.handleSubmit(handleSubmit, handleInvalid)}
          className="shrink-0"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {mode === "create" ? "Guardar actividad" : "Guardar cambios"}
        </Button>
      </div>

      {/* Two-column body */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, handleInvalid)}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* Main column */}
            <div className="space-y-6 lg:col-span-2">
              <div className="p-6 bg-white border rounded-xl shadow-sm space-y-4">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  <Activity className="w-4 h-4 text-primary" />
                  Información de la actividad
                </h2>

                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Título de la actividad"
                            maxLength={200}
                            className="text-base pr-16"
                            {...field}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                            {tituloWatch.length}/200
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resumen"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resumen <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="Describe brevemente la actividad"
                            maxLength={2000}
                            className="resize-none min-h-40 pr-16"
                            {...field}
                          />
                          <span className="absolute right-3 bottom-3 text-xs text-muted-foreground pointer-events-none">
                            {resumenWatch.length}/2000
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">

              {/* Imagen */}
              <div className="p-5 bg-white border rounded-xl shadow-sm space-y-3">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  Imagen <span className="text-destructive normal-case font-normal">*</span>
                </h2>

                <Tabs value={imageTab} onValueChange={(v) => setImageTab(v as "url" | "upload")}>
                  <TabsList className="w-full">
                    <TabsTrigger value="url" className="flex-1 gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5" /> URL
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="flex-1 gap-1.5">
                      <Upload className="w-3.5 h-3.5" /> Subir
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="url" className="mt-3">
                    <FormField
                      control={form.control}
                      name="imagenUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="https://ejemplo.com/imagen.jpg"
                              value={field.value}
                              onChange={(e) => handleImageUrlChange(e.target.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="upload" className="mt-3">
                    <label className="flex flex-col items-center gap-2 p-5 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/40 transition-colors text-center">
                      {isUploading ? (
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      ) : (
                        <Upload className="w-6 h-6 text-muted-foreground" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {isUploading ? "Subiendo…" : "Haz clic para seleccionar"}
                      </span>
                      <span className="text-xs text-muted-foreground/60">JPEG, PNG, WebP · Máx. 5 MB</span>
                      <input
                        key={fileInputKey}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                    {form.formState.errors.imagenUrl && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.imagenUrl.message}
                      </p>
                    )}
                  </TabsContent>
                </Tabs>

                {imagePreview ? (
                  <div className="relative mt-1 overflow-hidden rounded-lg aspect-video bg-muted">
                    <img src={imagePreview} alt="Vista previa" className="object-cover w-full h-full" onError={() => setImagePreview("")} />
                    <button
                      type="button"
                      onClick={() => { setImagePreview(""); form.setValue("imagenUrl", "") }}
                      className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="mt-1 flex items-center justify-center rounded-lg aspect-video bg-muted/40 border border-dashed">
                    <ImageIcon className="w-8 h-8 text-muted-foreground/25" />
                  </div>
                )}
              </div>

              {/* Publicación */}
              <div className="p-5 bg-white border rounded-xl shadow-sm space-y-4">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  <CalendarDays className="w-4 h-4 text-primary" />
                  Publicación
                </h2>

                <FormField
                  control={form.control}
                  name="fecha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="date" className="pl-10" {...field} />
                          <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="centroId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Centro <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ? String(field.value) : ""}
                          onValueChange={(v) => field.onChange(Number(v))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un centro…" />
                          </SelectTrigger>
                          <SelectContent>
                            {centros.map((c) => (
                              <SelectItem key={c.id} value={String(c.id)}>
                                {c.nombreParroquia}
                              </SelectItem>
                            ))}
                            {centros.length === 0 && (
                              <div className="px-3 py-2 text-sm text-muted-foreground">
                                Sin centros registrados.
                              </div>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Etiquetas */}
              <div className="p-5 bg-white border rounded-xl shadow-sm space-y-3">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  <Tag className="w-4 h-4 text-primary" />
                  Etiquetas <span className="text-destructive normal-case font-normal">*</span>
                </h2>

                <div className="flex flex-wrap gap-1.5">
                  {PRESET_TAGS.map((tag) => {
                    const active = etiquetas.includes(tag)
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                          active
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary"
                        }`}
                      >
                        {active && <X className="w-2.5 h-2.5" />}
                        {tag}
                      </button>
                    )
                  })}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Etiqueta personalizada…"
                    value={customTag}
                    maxLength={50}
                    onChange={(e) => setCustomTag(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomTag() } }}
                    className="h-8 text-sm"
                  />
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
                  <p className="text-sm text-destructive">
                    {form.formState.errors.etiquetas.message}
                  </p>
                )}
              </div>

              {/* Mobile save */}
              <div className="lg:hidden pt-2">
                <Button
                  className="w-full"
                  disabled={isSubmitting || isUploading}
                  onClick={form.handleSubmit(handleSubmit, handleInvalid)}
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  {mode === "create" ? "Guardar actividad" : "Guardar cambios"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
