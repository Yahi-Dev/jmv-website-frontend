// src/features/noticias/components/NoticiaFormDialog.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { noticiaCreateSchema, NoticiaCreateData } from "../schema/validation"
import { Noticia } from "../model/types"
import { useNoticiaTipos } from "../hook/use-noticias"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Separator } from "@/src/components/ui/separator"
import { Badge } from "@/src/components/ui/badge"
import { Switch } from "@/src/components/ui/switch"
import { MinimalTiptap } from "@/src/components/ui/io/minimal-tiptap"
import {
  Loader2,
  Upload,
  Link,
  Image as ImageIcon,
  X,
  Plus,
  Tag,
  Star,
  Clock,
} from "lucide-react"
import { toast } from "sonner"

interface NoticiaFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: NoticiaCreateData) => Promise<void>
  isLoading?: boolean
  initialData?: Noticia
  mode: "create" | "edit"
}

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

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_IMG_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

export function NoticiaFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
  initialData,
  mode,
}: NoticiaFormDialogProps) {
  const { tipos, isCreating, addTipo } = useNoticiaTipos()

  const [imageTab, setImageTab] = useState<"url" | "upload">("url")
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollableRef = useRef<HTMLDivElement>(null)

  const [etiquetas, setEtiquetas] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")

  const [newTipoInput, setNewTipoInput] = useState("")
  const [showNewTipoInput, setShowNewTipoInput] = useState(false)

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

  // Populate form when editing
  useEffect(() => {
    if (open && initialData) {
      form.reset({
        titulo: initialData.titulo,
        descripcionBreve: initialData.descripcionBreve,
        descripcionCompleta: initialData.descripcionCompleta || "",
        imagenUrl: initialData.imagenUrl,
        ubicacion: initialData.ubicacion,
        fecha: typeof initialData.fecha === "string"
          ? initialData.fecha.split("T")[0]
          : new Date(initialData.fecha).toISOString().split("T")[0],
        hora: initialData.hora || "",
        tipo: initialData.tipo,
        etiquetas: initialData.etiquetas,
        destacada: initialData.destacada ?? false,
      })
      setEtiquetas(initialData.etiquetas)
      setImagePreview(initialData.imagenUrl)
    } else if (open && !initialData) {
      form.reset({
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
      })
      setEtiquetas([])
      setImagePreview("")
    }
  }, [open, initialData, form])

  // Sync etiquetas array → RHF
  useEffect(() => {
    form.setValue("etiquetas", etiquetas, { shouldValidate: true })
  }, [etiquetas, form])

  const handleImageUrlChange = (url: string) => {
    form.setValue("imagenUrl", url, { shouldValidate: true })
    setImagePreview(url)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!ALLOWED_IMG_TYPES.includes(file.type)) {
      toast.error("Solo se permiten imágenes JPEG, PNG, WebP o GIF")
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("La imagen no puede superar 5MB")
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || "Error al subir imagen")
      const url = json.data?.url || json.url
      form.setValue("imagenUrl", url, { shouldValidate: true })
      setImagePreview(url)
      toast.success("Imagen subida exitosamente")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al subir imagen")
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const toggleTag = (tag: string) => {
    setEtiquetas((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const addCustomTag = () => {
    const tag = customTag.trim()
    if (!tag || etiquetas.includes(tag) || tag.length > 50) return
    setEtiquetas((prev) => [...prev, tag])
    setCustomTag("")
  }

  const handleCreateTipo = async () => {
    const nombre = newTipoInput.trim()
    if (!nombre) return
    const created = await addTipo(nombre)
    if (created) {
      form.setValue("tipo", created.nombre, { shouldValidate: true })
      setNewTipoInput("")
      setShowNewTipoInput(false)
    }
  }

  const handleSubmit = async (data: NoticiaCreateData) => {
    try {
      await onSubmit({ ...data, etiquetas })
    } catch {
      // error handled by parent
    }
  }

  const tituloWatch = form.watch("titulo") || ""
  const descripcionBreveWatch = form.watch("descripcionBreve") || ""

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl flex flex-col max-h-[92vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
          <DialogTitle>
            {mode === "create" ? "Nueva Noticia" : "Editar Noticia"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Completa los campos para publicar una nueva noticia."
              : "Modifica los campos de la noticia."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col flex-1 min-h-0 overflow-hidden"
          >
            {/* Scrollable body */}
            <div ref={scrollableRef} className="flex-1 min-h-0 overflow-y-auto px-6 space-y-6 pb-4">

              {/* ── Imagen ──────────────────────────────────────────────── */}
              <div>
                <p className="text-sm font-medium mb-2">Imagen <span className="text-destructive">*</span></p>
                <Tabs value={imageTab} onValueChange={(v) => setImageTab(v as "url" | "upload")}>
                  <TabsList className="mb-3">
                    <TabsTrigger value="url" className="gap-1.5">
                      <Link className="w-3.5 h-3.5" /> URL
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="gap-1.5">
                      <Upload className="w-3.5 h-3.5" /> Subir archivo
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="url">
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

                  <TabsContent value="upload">
                    <div
                      className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/40 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {isUploading ? (
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      ) : (
                        <Upload className="w-6 h-6 text-muted-foreground" />
                      )}
                      <p className="text-sm text-muted-foreground">
                        {isUploading ? "Subiendo..." : "Haz clic para seleccionar una imagen"}
                      </p>
                      <p className="text-xs text-muted-foreground">JPEG, PNG, WebP, GIF · Máx. 5MB</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </div>
                    {form.formState.errors.imagenUrl && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.imagenUrl.message}
                      </p>
                    )}
                  </TabsContent>
                </Tabs>

                {imagePreview && (
                  <div className="mt-3 relative overflow-hidden rounded-lg aspect-video bg-muted max-h-48">
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
                      className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                {!imagePreview && (
                  <div className="mt-3 flex items-center justify-center rounded-lg aspect-video bg-muted/50 max-h-48">
                    <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                )}
              </div>

              <Separator />

              {/* ── Información básica ───────────────────────────────────── */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-foreground">Información básica</p>

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
                            {...field}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
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
                          <Input
                            placeholder="Resumen corto de la noticia"
                            maxLength={300}
                            {...field}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                            {descripcionBreveWatch.length}/300
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ubicacion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ubicación <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Santo Domingo, RD" maxLength={200} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fecha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* ── Hora ──────────────────────────────────────────────── */}
                <FormField
                  control={form.control}
                  name="hora"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between mb-2">
                        <FormLabel className="flex items-center gap-2 mb-0">
                          <Clock className="w-4 h-4 text-primary" />
                          Hora
                        </FormLabel>
                        {field.value && (
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                            {formatHora(field.value)}
                          </span>
                        )}
                      </div>

                      {/* Preset chips */}
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {HORA_PRESETS.map((p) => {
                          const isActive = field.value === p.value
                          return (
                            <button
                              key={p.value}
                              type="button"
                              onClick={() => field.onChange(isActive ? "" : p.value)}
                              className={`flex flex-col items-center gap-0.5 px-2 py-2.5 rounded-lg border text-xs transition-all duration-150 ${
                                isActive
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm scale-[1.02]"
                                  : "border-border/60 text-muted-foreground bg-muted/20 hover:border-primary/40 hover:text-foreground hover:bg-muted/40"
                              }`}
                            >
                              <span className="text-base leading-none">{p.emoji}</span>
                              <span className="font-bold">{p.value}</span>
                              <span className="text-[10px] opacity-75 leading-tight text-center">{p.label}</span>
                            </button>
                          )
                        })}
                      </div>

                      {/* Custom time input */}
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
                              className="shrink-0 w-9 h-9 text-muted-foreground hover:text-destructive"
                              onClick={() => field.onChange("")}
                              title="Quitar hora"
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
              </div>

              <Separator />

              {/* ── Tipo ────────────────────────────────────────────────── */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">Tipo de noticia</p>

                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo <span className="text-destructive">*</span></FormLabel>
                      <div className="flex gap-2">
                        <FormControl className="flex-1">
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un tipo..." />
                            </SelectTrigger>
                            <SelectContent>
                              {tipos.map((t) => (
                                <SelectItem key={t.id} value={t.nombre}>
                                  {t.nombre}
                                </SelectItem>
                              ))}
                              {tipos.length === 0 && (
                                <div className="px-3 py-2 text-sm text-muted-foreground">
                                  No hay tipos. Crea uno nuevo.
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
                          title="Agregar nuevo tipo"
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
                      placeholder="Nombre del nuevo tipo (ej: Coordinación Regional)"
                      value={newTipoInput}
                      onChange={(e) => setNewTipoInput(e.target.value)}
                      maxLength={100}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleCreateTipo()
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={handleCreateTipo}
                      disabled={!newTipoInput.trim() || isCreating}
                      size="sm"
                    >
                      {isCreating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Crear"}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowNewTipoInput(false)
                        setNewTipoInput("")
                      }}
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              {/* ── Etiquetas ────────────────────────────────────────────── */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">
                    Etiquetas <span className="text-destructive">*</span>
                  </p>
                </div>

                {/* Preset chips */}
                <div className="flex flex-wrap gap-2">
                  {PRESET_TAGS.map((tag) => {
                    const active = etiquetas.includes(tag)
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                          active
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary"
                        }`}
                      >
                        {active && <X className="w-3 h-3" />}
                        {tag}
                      </button>
                    )
                  })}
                </div>

                {/* Custom tag input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Agregar etiqueta personalizada..."
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    maxLength={50}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addCustomTag()
                      }
                    }}
                    className="h-8 text-sm"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addCustomTag}
                    disabled={!customTag.trim()}
                    className="h-8"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {/* Selected tags */}
                {etiquetas.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {etiquetas.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1 pr-1.5">
                        {tag}
                        <button
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className="hover:text-destructive transition-colors"
                        >
                          <X className="w-3 h-3" />
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

              <Separator />

              {/* ── Destacada ────────────────────────────────────────────── */}
              <FormField
                control={form.control}
                name="destacada"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3 bg-muted/20">
                      <div className="flex items-center gap-2.5">
                        <Star className="w-4 h-4 text-amber-500" />
                        <div>
                          <p className="text-sm font-medium">Noticia destacada</p>
                          <p className="text-xs text-muted-foreground">
                            Aparecerá en la sección de noticias destacadas en el sitio público
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

              <Separator />

              {/* ── Descripción completa (MinimalTiptap) ─────────────────── */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Descripción completa</p>
                <p className="text-xs text-muted-foreground">
                  Contenido completo de la noticia. Puedes usar formato de texto enriquecido.
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
                          placeholder="Escribe el contenido completo de la noticia..."
                          className="min-h-[250px]"
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

            {/* Pinned footer */}
            <DialogFooter className="px-6 py-4 border-t shrink-0 bg-background">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                disabled={isLoading || isUploading}
                onClick={form.handleSubmit(handleSubmit, (errors) => {
                  const FIELD_LABELS: Record<string, string> = {
                    imagenUrl: "Imagen",
                    titulo: "Título",
                    descripcionBreve: "Descripción breve",
                    ubicacion: "Ubicación",
                    fecha: "Fecha",
                    tipo: "Tipo de noticia",
                    etiquetas: "Etiquetas",
                  }
                  const firstField = Object.keys(errors)[0]
                  const firstError = (errors as any)[firstField]
                  const label = FIELD_LABELS[firstField] ?? firstField
                  const msg = firstError?.message ?? "Verifica los campos requeridos"
                  toast.error(`${label}: ${msg}`)
                  scrollableRef.current?.scrollTo({ top: 0, behavior: "smooth" })
                })}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {mode === "create" ? "Creando..." : "Guardando..."}
                  </>
                ) : mode === "create" ? (
                  "Crear noticia"
                ) : (
                  "Guardar cambios"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
