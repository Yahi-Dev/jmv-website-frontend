// src/features/noticias/components/NoticiaFormPage.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { noticiaCreateSchema, NoticiaCreateData } from "../schema/validation"
import {
  getNoticiaBySlug,
  createNoticia,
  updateNoticia,
  getNoticiaTipos,
  createNoticiaTipo,
} from "../service/noticia-service"
import { Noticia, NoticiaTipo } from "../model/types"
import { MinimalTiptap } from "@/src/components/ui/io/minimal-tiptap"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Badge } from "@/src/components/ui/badge"
import { Switch } from "@/src/components/ui/switch"
import { Separator } from "@/src/components/ui/separator"
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
  CalendarDays,
  Clock,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  MapPin,
  Newspaper,
  Plus,
  Save,
  Star,
  Tag,
  Upload,
  X,
} from "lucide-react"
import { toast } from "sonner"

const PRESET_TAGS = [
  "Misión", "Formación", "Espiritualidad", "Servicio", "Comunidad",
  "Juventud", "Evento", "Anuncio", "Testimonio", "Internacional",
]

const HORA_PRESETS = [
  { value: "06:00", label: "Amanecer", emoji: "🌅" },
  { value: "08:00", label: "Mañana", emoji: "☀️" },
  { value: "10:00", label: "Media mañana", emoji: "🌤️" },
  { value: "12:00", label: "Mediodía", emoji: "🌞" },
  { value: "15:00", label: "Tarde", emoji: "🌥️" },
  { value: "17:00", label: "Atardecer", emoji: "🌆" },
  { value: "19:00", label: "Noche", emoji: "🌇" },
  { value: "21:00", label: "Noche tardía", emoji: "🌙" },
]

function formatHora(time: string): string {
  if (!time) return ""
  const [h, m] = time.split(":").map(Number)
  const period = h >= 12 ? "PM" : "AM"
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2, "0")} ${period}`
}

interface NoticiaFormPageProps {
  mode: "create" | "edit"
  noticiaId?: number
}

export function NoticiaFormPage({ mode, noticiaId }: NoticiaFormPageProps) {
  const router = useRouter()

  // ── Loading / edit state ──────────────────────────────────────────────────
  const [pageLoading, setPageLoading] = useState(mode === "edit")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [noticia, setNoticia] = useState<Noticia | null>(null)

  // ── Tipos ─────────────────────────────────────────────────────────────────
  const [tipos, setTipos] = useState<NoticiaTipo[]>([])
  const [isCreatingTipo, setIsCreatingTipo] = useState(false)
  const [newTipoInput, setNewTipoInput] = useState("")
  const [showNewTipoInput, setShowNewTipoInput] = useState(false)

  // ── Etiquetas ─────────────────────────────────────────────────────────────
  const [etiquetas, setEtiquetas] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")

  // ── Image ─────────────────────────────────────────────────────────────────
  const [imageTab, setImageTab] = useState<"url" | "upload">("url")
  const [imagePreview, setImagePreview] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [fileInputKey, setFileInputKey] = useState(0)

  // ── Form ──────────────────────────────────────────────────────────────────
  const form = useForm<NoticiaCreateData>({
    resolver: zodResolver(noticiaCreateSchema),
    defaultValues: {
      titulo: "",
      descripcionBreve: "",
      descripcionCompleta: "",
      imagenUrl: "",
      ubicacion: "",
      fecha: "",
      hora: "",
      tipo: "",
      etiquetas: [],
      destacada: false,
    },
  })

  const tituloWatch = form.watch("titulo") || ""
  const descripcionBreveWatch = form.watch("descripcionBreve") || ""

  // ── Load tipos ────────────────────────────────────────────────────────────
  useEffect(() => {
    getNoticiaTipos()
      .then((r) => setTipos(Array.isArray(r.data) ? r.data : []))
      .catch(() => {})
  }, [])

  // ── Load noticia for edit ─────────────────────────────────────────────────
  useEffect(() => {
    if (mode !== "edit" || !noticiaId) return
    setPageLoading(true)
    getNoticiaBySlug(String(noticiaId))
      .then((r) => {
        const data = r.data as Noticia | undefined
        if (!data || Array.isArray(data)) {
          toast.error("Noticia no encontrada")
          router.replace("/admin/noticias")
          return
        }
        setNoticia(data)
        const fechaStr =
          typeof data.fecha === "string"
            ? data.fecha.split("T")[0]
            : new Date(data.fecha).toISOString().split("T")[0]
        form.reset({
          titulo: data.titulo,
          descripcionBreve: data.descripcionBreve,
          descripcionCompleta: data.descripcionCompleta || "",
          imagenUrl: data.imagenUrl,
          ubicacion: data.ubicacion,
          fecha: fechaStr,
          hora: data.hora || "",
          tipo: data.tipo,
          etiquetas: data.etiquetas,
          destacada: data.destacada ?? false,
        })
        setEtiquetas(data.etiquetas)
        setImagePreview(data.imagenUrl)
      })
      .catch(() => {
        toast.error("Error al cargar la noticia")
        router.replace("/admin/noticias")
      })
      .finally(() => setPageLoading(false))
  }, [mode, noticiaId, form, router])

  // ── Sync etiquetas → RHF ─────────────────────────────────────────────────
  useEffect(() => {
    form.setValue("etiquetas", etiquetas, { shouldValidate: true })
  }, [etiquetas, form])

  // ── Image handlers ────────────────────────────────────────────────────────
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
      formData.append("modulo", "noticias")
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

  // ── Tag helpers ───────────────────────────────────────────────────────────
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

  // ── Tipo helpers ──────────────────────────────────────────────────────────
  const handleCreateTipo = async () => {
    const nombre = newTipoInput.trim()
    if (!nombre) return
    setIsCreatingTipo(true)
    try {
      const r = await createNoticiaTipo(nombre)
      if (r.data && !Array.isArray(r.data)) {
        const created = r.data as NoticiaTipo
        setTipos((prev) => [...prev, created].sort((a, b) => a.nombre.localeCompare(b.nombre)))
        form.setValue("tipo", created.nombre, { shouldValidate: true })
        toast.success(`Tipo "${nombre}" creado`)
        setNewTipoInput("")
        setShowNewTipoInput(false)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al crear tipo")
    } finally {
      setIsCreatingTipo(false)
    }
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (data: NoticiaCreateData) => {
    setIsSubmitting(true)
    try {
      if (mode === "edit" && noticiaId) {
        await updateNoticia(noticiaId, { ...data, etiquetas })
        toast.success("Noticia actualizada")
      } else {
        await createNoticia({ ...data, etiquetas })
        toast.success("Noticia publicada")
      }
      router.push("/admin/noticias")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al guardar")
      setIsSubmitting(false)
    }
  }

  const handleInvalid = useCallback(
    (errors: Record<string, any>) => {
      const LABELS: Record<string, string> = {
        imagenUrl: "Imagen",
        titulo: "Título",
        descripcionBreve: "Descripción breve",
        ubicacion: "Ubicación",
        fecha: "Fecha",
        tipo: "Tipo de noticia",
        etiquetas: "Etiquetas",
      }
      const firstField = Object.keys(errors)[0]
      const label = LABELS[firstField] ?? firstField
      const msg = errors[firstField]?.message ?? "Verifica los campos requeridos"
      toast.error(`${label}: ${msg}`)
    },
    []
  )

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* ── Page header ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/admin/noticias")}
            className="shrink-0"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver
          </Button>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold truncate">
              {mode === "create"
                ? "Nueva Noticia"
                : `Editar: ${noticia?.titulo || "…"}`}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === "create"
                ? "Completa todos los campos y publica la noticia"
                : "Modifica la información de la noticia"}
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
          {mode === "create" ? "Publicar noticia" : "Guardar cambios"}
        </Button>
      </div>

      {/* ── Two-column body ───────────────────────────────────────────── */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, handleInvalid)}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* ── Main column (2/3) ──────────────────────────────────── */}
            <div className="space-y-6 lg:col-span-2">

              {/* Título */}
              <div className="p-6 bg-white border rounded-xl shadow-sm space-y-4">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  <Newspaper className="w-4 h-4 text-primary" />
                  Información principal
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
                            placeholder="Título de la noticia"
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
                  name="descripcionBreve"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción breve <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="Resumen corto que aparecerá en la lista de noticias"
                            maxLength={300}
                            className="resize-none min-h-[80px] pr-16"
                            {...field}
                          />
                          <span className="absolute right-3 bottom-3 text-xs text-muted-foreground pointer-events-none">
                            {descripcionBreveWatch.length}/300
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Descripción completa */}
              <div className="p-6 bg-white border rounded-xl shadow-sm space-y-4">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  <Tag className="w-4 h-4 text-primary" />
                  Contenido completo
                </h2>
                <p className="text-xs text-muted-foreground -mt-2">
                  Redacta el artículo completo. Puedes usar negritas, listas, encabezados y más.
                </p>
                <FormField
                  control={form.control}
                  name="descripcionCompleta"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MinimalTiptap
                          content={field.value || ""}
                          onChange={field.onChange}
                          placeholder="Escribe el contenido completo de la noticia…"
                          className="min-h-[400px]"
                          maxLength={50000}
                          showCharacterCount={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* ── Sidebar (1/3) ──────────────────────────────────────── */}
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
                      <span className="text-xs text-muted-foreground/60">
                        JPEG, PNG, WebP · Máx. 5 MB
                      </span>
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

                {/* Preview */}
                {imagePreview ? (
                  <div className="relative mt-1 overflow-hidden rounded-lg aspect-video bg-muted">
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      className="object-cover w-full h-full"
                      onError={() => setImagePreview("")}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview("")
                        form.setValue("imagenUrl", "")
                      }}
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

              {/* Publicación (fecha, hora, ubicación) */}
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
                  name="hora"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="mb-0">Hora</FormLabel>
                        {field.value && (
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            {formatHora(field.value)}
                          </span>
                        )}
                      </div>
                      {/* Preset chips */}
                      <div className="grid grid-cols-4 gap-1.5">
                        {HORA_PRESETS.map((p) => {
                          const isActive = field.value === p.value
                          return (
                            <button
                              key={p.value}
                              type="button"
                              onClick={() => field.onChange(isActive ? "" : p.value)}
                              className={`flex flex-col items-center gap-0.5 px-1 py-2 rounded-lg border text-xs transition-all ${
                                isActive
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                  : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                              }`}
                            >
                              <span className="text-sm leading-none">{p.emoji}</span>
                              <span className="font-bold text-[10px]">{p.value}</span>
                            </button>
                          )
                        })}
                      </div>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                            <Input
                              type="time"
                              className="pl-9"
                              value={field.value || ""}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </div>
                          {field.value && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="shrink-0 h-9 w-9 text-muted-foreground hover:text-destructive"
                              onClick={() => field.onChange("")}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ubicacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ubicación <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Santo Domingo, RD"
                            maxLength={200}
                            className="pl-9 pr-16"
                            {...field}
                          />
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                            {field.value?.length || 0}/200
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Tipo */}
              <div className="p-5 bg-white border rounded-xl shadow-sm space-y-3">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  <Tag className="w-4 h-4 text-primary" />
                  Tipo de noticia
                </h2>

                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2">
                        <FormControl className="flex-1">
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un tipo…" />
                            </SelectTrigger>
                            <SelectContent>
                              {tipos.map((t) => (
                                <SelectItem key={t.id} value={t.nombre}>
                                  {t.nombre}
                                </SelectItem>
                              ))}
                              {tipos.length === 0 && (
                                <div className="px-3 py-2 text-sm text-muted-foreground">
                                  Sin tipos. Crea uno nuevo.
                                </div>
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => setShowNewTipoInput((v) => !v)}
                          title="Crear nuevo tipo"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {showNewTipoInput && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nombre del nuevo tipo…"
                      value={newTipoInput}
                      onChange={(e) => setNewTipoInput(e.target.value)}
                      maxLength={100}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") { e.preventDefault(); handleCreateTipo() }
                      }}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleCreateTipo}
                      disabled={!newTipoInput.trim() || isCreatingTipo}
                    >
                      {isCreatingTipo ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Crear"}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => { setShowNewTipoInput(false); setNewTipoInput("") }}
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Etiquetas */}
              <div className="p-5 bg-white border rounded-xl shadow-sm space-y-3">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  <Tag className="w-4 h-4 text-primary" />
                  Etiquetas <span className="text-destructive normal-case font-normal">*</span>
                </h2>

                {/* Presets */}
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

                {/* Custom tag */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Etiqueta personalizada…"
                    value={customTag}
                    maxLength={50}
                    onChange={(e) => setCustomTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") { e.preventDefault(); addCustomTag() }
                    }}
                    className="h-8 text-sm"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={addCustomTag}
                    disabled={!customTag.trim()}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {/* Selected */}
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

              {/* Destacada */}
              <div className="p-5 bg-white border rounded-xl shadow-sm">
                <FormField
                  control={form.control}
                  name="destacada"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <Star className="w-4 h-4 text-amber-500 shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Noticia destacada</p>
                            <p className="text-xs text-muted-foreground">
                              Aparece en la sección principal del sitio
                            </p>
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value ?? false}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Mobile save button */}
              <div className="lg:hidden">
                <Separator />
                <Button
                  className="w-full mt-4"
                  disabled={isSubmitting || isUploading}
                  onClick={form.handleSubmit(handleSubmit, handleInvalid)}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {mode === "create" ? "Publicar noticia" : "Guardar cambios"}
                </Button>
              </div>

            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
