// src/features/centros/components/CentroFormPage.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { centroCreateSchema, CentroCreateData } from "../schema/validation"
import { getCentroBySlug, createCentro, updateCentro } from "../service/centro-service"
import { getActividades } from "@/src/features/actividades/service/actividad-service"
import {
  useMiembroCentroForm, useComunidadJmvForm,
} from "../hook/use-centros"
import { CentroJmv, MiembroCentroJmv, ComunidadJmv, getTagColor } from "../model/types"
import { MiembroCentroFormDialog } from "./MiembroCentroFormDialog"
import { ComunidadJmvFormDialog } from "./ComunidadJmvFormDialog"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Badge } from "@/src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/src/components/ui/select"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/src/components/ui/form"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/src/components/ui/alert-dialog"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import {
  ArrowLeft, Building2, Edit, Image as ImageIcon, Link as LinkIcon, Loader2,
  MoreHorizontal, Plus, Save, Tag, Trash2, Upload, Users, X, Calendar,
} from "lucide-react"
import { PhoneInputField } from "@/src/components/ui/phone-input"
import { toast } from "sonner"

const PRESET_TAGS = ["Parroquial", "Urbano", "Rural", "Universitario", "Juvenil", "Familiar", "Escolar", "Misión"]

interface CentroFormPageProps {
  mode: "create" | "edit"
  centroId?: number
}

export function CentroFormPage({ mode, centroId }: CentroFormPageProps) {
  const router = useRouter()
  const [pageLoading, setPageLoading] = useState(mode === "edit")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [centro, setCentro] = useState<CentroJmv | null>(null)

  const [etiquetas, setEtiquetas] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")
  const [imageTab, setImageTab] = useState<"url" | "upload">("url")
  const [imagePreview, setImagePreview] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [fileInputKey, setFileInputKey] = useState(0)
  const [actividadesDelCentro, setActividadesDelCentro] = useState<{ id: number; titulo: string }[]>([])

  // Nested entity state
  const [miembros, setMiembros] = useState<MiembroCentroJmv[]>([])
  const [comunidades, setComunidades] = useState<ComunidadJmv[]>([])
  const [miembroDialog, setMiembroDialog] = useState<{ open: boolean; data?: MiembroCentroJmv }>({ open: false })
  const [comunidadDialog, setComunidadDialog] = useState<{ open: boolean; data?: ComunidadJmv }>({ open: false })
  const [deleteMiembro, setDeleteMiembro] = useState<MiembroCentroJmv | null>(null)
  const [deleteComunidad, setDeleteComunidad] = useState<ComunidadJmv | null>(null)

  const miembroForm = useMiembroCentroForm(centroId ?? 0)
  const comunidadForm = useComunidadJmvForm(centroId ?? 0)

  const form = useForm<CentroCreateData>({
    resolver: zodResolver(centroCreateSchema),
    defaultValues: {
      nombreParroquia: "", ubicacion: "", cantidadMiembrosActivos: 0,
      nombreCoordinadora: "", telefono: "", correo: "", resumen: "",
      anioFundacion: new Date().getFullYear(), imagenUrl: "", etiquetas: [],
      ultimaActividadId: null,
    },
  })

  const nombreWatch = form.watch("nombreParroquia") || ""
  const ubicacionWatch = form.watch("ubicacion") || ""
  const coordinadoraWatch = form.watch("nombreCoordinadora") || ""
  const resumenWatch = form.watch("resumen") || ""
  const correoWatch = form.watch("correo") || ""

  // Load actividades when centroId is known (edit mode)
  useEffect(() => {
    if (!centroId) return
    getActividades({ centroId, limit: 100 })
      .then((r) => {
        const list = Array.isArray(r.data) ? r.data : []
        setActividadesDelCentro(list.map((a: any) => ({ id: a.id, titulo: a.titulo })))
      })
      .catch(() => {})
  }, [centroId])

  // Load centro in edit mode
  useEffect(() => {
    if (mode !== "edit" || !centroId) return
    setPageLoading(true)
    getCentroBySlug(String(centroId))
      .then((r) => {
        const data = r.data as CentroJmv | undefined
        if (!data || Array.isArray(data)) {
          toast.error("Centro no encontrado")
          router.replace("/admin/centros")
          return
        }
        setCentro(data)
        form.reset({
          nombreParroquia: data.nombreParroquia,
          ubicacion: data.ubicacion,
          cantidadMiembrosActivos: data.cantidadMiembrosActivos,
          nombreCoordinadora: data.nombreCoordinadora,
          telefono: data.telefono,
          correo: data.correo,
          resumen: data.resumen,
          anioFundacion: data.anioFundacion,
          imagenUrl: data.imagenUrl,
          etiquetas: data.etiquetas,
          ultimaActividadId: data.ultimaActividadId ?? null,
        })
        setEtiquetas(data.etiquetas)
        setImagePreview(data.imagenUrl)
        setMiembros(data.miembros ?? [])
        setComunidades(
          (data.comunidades ?? []).map((c) => ({
            ...c,
            etiquetas: Array.isArray(c.etiquetas) ? c.etiquetas : [],
          }))
        )
      })
      .catch(() => {
        toast.error("Error al cargar el centro")
        router.replace("/admin/centros")
      })
      .finally(() => setPageLoading(false))
  }, [mode, centroId, form, router])

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
      formData.append("titulo", form.getValues("nombreParroquia") || file.name.replace(/\.[^/.]+$/, ""))
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

  const toggleTag = (tag: string) =>
    setEtiquetas((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])

  const addCustomTag = () => {
    const tag = customTag.trim()
    if (!tag || etiquetas.includes(tag) || tag.length > 50) return
    setEtiquetas((prev) => [...prev, tag])
    setCustomTag("")
  }

  const handleSubmit = async (data: CentroCreateData) => {
    setIsSubmitting(true)
    try {
      if (mode === "edit" && centroId) {
        await updateCentro(centroId, { ...data, etiquetas })
        toast.success("Centro actualizado")
      } else {
        const r = await createCentro({ ...data, etiquetas })
        const newId = (r.data as CentroJmv | undefined)?.id
        toast.success("Centro creado")
        if (newId) {
          router.push(`/admin/centros/${newId}/edit`)
          return
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al guardar")
      setIsSubmitting(false)
    }
  }

  const handleInvalid = useCallback((errors: Record<string, any>) => {
    const LABELS: Record<string, string> = {
      nombreParroquia: "Nombre", ubicacion: "Ubicación", cantidadMiembrosActivos: "Miembros activos",
      nombreCoordinadora: "Coordinadora", telefono: "Teléfono", correo: "Correo",
      resumen: "Resumen", anioFundacion: "Año de fundación", imagenUrl: "Imagen", etiquetas: "Etiquetas",
    }
    const firstField = Object.keys(errors)[0]
    const label = LABELS[firstField] ?? firstField
    const msg = errors[firstField]?.message ?? "Verifica los campos requeridos"
    toast.error(`${label}: ${msg}`)
  }, [])

  // Refresh nested lists
  const refreshCentro = useCallback(async () => {
    if (!centroId) return
    const r = await getCentroBySlug(String(centroId))
    const data = r.data as CentroJmv | undefined
    if (data && !Array.isArray(data)) {
      setMiembros(data.miembros ?? [])
      setComunidades((data.comunidades ?? []).map((c) => ({
        ...c, etiquetas: Array.isArray(c.etiquetas) ? c.etiquetas : [],
      })))
    }
  }, [centroId])

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  // ── Info form (shared between create and edit tab) ──────────────────────────
  const InfoForm = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit, handleInvalid)}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main */}
          <div className="space-y-6 lg:col-span-2">
            <div className="p-6 bg-white border rounded-xl shadow-sm space-y-4">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                <Building2 className="w-4 h-4 text-primary" />
                Información del centro
              </h2>

              <FormField control={form.control} name="nombreParroquia" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la parroquia <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Ej: Parroquia San Juan Bosco" maxLength={200} className="pr-16" {...field} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">{nombreWatch.length}/200</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="ubicacion" render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Dirección o sector" maxLength={300} className="pr-16" {...field} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">{ubicacionWatch.length}/300</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="resumen" render={({ field }) => (
                <FormItem>
                  <FormLabel>Resumen <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea placeholder="Describe el centro…" maxLength={2000} className="resize-none min-h-32 pr-16" {...field} />
                      <span className="absolute right-3 bottom-3 text-xs text-muted-foreground pointer-events-none">{resumenWatch.length}/2000</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="nombreCoordinadora" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coordinadora <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Nombre de la coordinadora" maxLength={200} className="pr-16" {...field} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">{coordinadoraWatch.length}/200</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="cantidadMiembrosActivos" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Miembros activos <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="telefono" render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneInputField
                        label="Teléfono"
                        value={field.value || ""}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="correo" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="email" placeholder="correo@parroquia.org" maxLength={150} className="pr-12" {...field} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">{correoWatch.length}/150</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
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
                  <TabsTrigger value="url" className="flex-1 gap-1.5"><LinkIcon className="w-3.5 h-3.5" /> URL</TabsTrigger>
                  <TabsTrigger value="upload" className="flex-1 gap-1.5"><Upload className="w-3.5 h-3.5" /> Subir</TabsTrigger>
                </TabsList>
                <TabsContent value="url" className="mt-3">
                  <FormField control={form.control} name="imagenUrl" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="https://…" value={field.value} onChange={(e) => handleImageUrl(e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TabsContent>
                <TabsContent value="upload" className="mt-3">
                  <label className="flex flex-col items-center gap-2 p-5 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/40 transition-colors text-center">
                    {isUploading ? <Loader2 className="w-6 h-6 animate-spin text-primary" /> : <Upload className="w-6 h-6 text-muted-foreground" />}
                    <span className="text-xs text-muted-foreground">{isUploading ? "Subiendo…" : "Haz clic para seleccionar"}</span>
                    <input key={fileInputKey} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                  {form.formState.errors.imagenUrl && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.imagenUrl.message}</p>
                  )}
                </TabsContent>
              </Tabs>
              {imagePreview ? (
                <div className="relative mt-1 overflow-hidden rounded-lg aspect-video bg-muted">
                  <img src={imagePreview} alt="Vista previa" className="object-cover w-full h-full" onError={() => setImagePreview("")} />
                  <button type="button" onClick={() => { setImagePreview(""); form.setValue("imagenUrl", "") }}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="mt-1 flex items-center justify-center rounded-lg aspect-video bg-muted/40 border border-dashed">
                  <ImageIcon className="w-8 h-8 text-muted-foreground/25" />
                </div>
              )}
            </div>

            {/* Año + Última actividad */}
            <div className="p-5 bg-white border rounded-xl shadow-sm space-y-4">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                <Calendar className="w-4 h-4 text-primary" />
                Datos adicionales
              </h2>
              <FormField control={form.control} name="anioFundacion" render={({ field }) => (
                <FormItem>
                  <FormLabel>Año de fundación <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input type="number" min={1900} max={new Date().getFullYear()} placeholder="2005" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              {mode === "edit" && (
                <FormField control={form.control} name="ultimaActividadId" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Última actividad</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ? String(field.value) : "none"}
                        onValueChange={(v) => field.onChange(v === "none" ? null : Number(v))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sin actividad seleccionada" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">— Sin actividad —</SelectItem>
                          {actividadesDelCentro.map((a) => (
                            <SelectItem key={a.id} value={String(a.id)}>{a.titulo}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              )}
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

            <div className="lg:hidden pt-2">
              <Button className="w-full" disabled={isSubmitting || isUploading}
                onClick={form.handleSubmit(handleSubmit, handleInvalid)}>
                {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                {mode === "create" ? "Guardar centro" : "Guardar cambios"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Button variant="ghost" size="sm" onClick={() => router.push("/admin/centros")} className="shrink-0">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver
          </Button>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold truncate">
              {mode === "create" ? "Nuevo Centro" : `Editar: ${centro?.nombreParroquia || "…"}`}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === "create" ? "Completa la información para crear el centro" : "Gestiona la información del centro y sus miembros"}
            </p>
          </div>
        </div>
        <Button disabled={isSubmitting || isUploading}
          onClick={form.handleSubmit(handleSubmit, handleInvalid)} className="shrink-0">
          {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {mode === "create" ? "Guardar centro" : "Guardar cambios"}
        </Button>
      </div>

      {/* Create: single form */}
      {mode === "create" ? InfoForm : (
        <Tabs defaultValue="info">
          <TabsList className="mb-2">
            <TabsTrigger value="info" className="gap-2">
              <Building2 className="w-4 h-4" /> Información
            </TabsTrigger>
            <TabsTrigger value="consejo" className="gap-2">
              <Users className="w-4 h-4" /> Consejo de Centro
              {miembros.length > 0 && <Badge variant="secondary" className="ml-1 text-xs">{miembros.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="comunidades" className="gap-2">
              <Building2 className="w-4 h-4" /> Comunidades
              {comunidades.length > 0 && <Badge variant="secondary" className="ml-1 text-xs">{comunidades.length}</Badge>}
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Info */}
          <TabsContent value="info">{InfoForm}</TabsContent>

          {/* Tab 2: Consejo */}
          <TabsContent value="consejo">
            <div className="p-6 bg-white border rounded-xl shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold">Consejo de Centro</h2>
                  <p className="text-sm text-muted-foreground">{miembros.length} miembro{miembros.length !== 1 ? "s" : ""}</p>
                </div>
                <Button size="sm" onClick={() => setMiembroDialog({ open: true })}>
                  <Plus className="w-4 h-4 mr-2" /> Agregar miembro
                </Button>
              </div>

              {miembros.length === 0 ? (
                <div className="py-12 text-center">
                  <Users className="w-10 h-10 mx-auto mb-3 text-muted-foreground/25" />
                  <p className="text-sm text-muted-foreground">Aún no hay miembros en el consejo</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {miembros.map((m) => (
                    <div key={m.id} className="flex gap-3 p-3 border rounded-lg">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-muted shrink-0">
                        {m.imagenUrl ? (
                          <img src={m.imagenUrl} alt={m.nombre} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-muted-foreground/40" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{m.nombre}</p>
                        <Badge variant="outline" className="text-xs mt-0.5">{m.cargo}</Badge>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{m.descripcion}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="w-7 h-7 shrink-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setMiembroDialog({ open: true, data: m })}>
                            <Edit className="w-4 h-4 mr-2" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteMiembro(m)}>
                            <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Tab 3: Comunidades */}
          <TabsContent value="comunidades">
            <div className="p-6 bg-white border rounded-xl shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold">Comunidades</h2>
                  <p className="text-sm text-muted-foreground">{comunidades.length} comunidad{comunidades.length !== 1 ? "es" : ""}</p>
                </div>
                <Button size="sm" onClick={() => setComunidadDialog({ open: true })}>
                  <Plus className="w-4 h-4 mr-2" /> Agregar comunidad
                </Button>
              </div>

              {comunidades.length === 0 ? (
                <div className="py-12 text-center">
                  <Building2 className="w-10 h-10 mx-auto mb-3 text-muted-foreground/25" />
                  <p className="text-sm text-muted-foreground">Aún no hay comunidades registradas</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {comunidades.map((c) => (
                    <div key={c.id} className="border rounded-lg overflow-hidden">
                      <div className="h-28 bg-muted overflow-hidden">
                        {c.imagenUrl ? (
                          <img src={c.imagenUrl} alt={c.nombre} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium">{c.nombre}</p>
                            <Badge variant="outline" className="text-xs mt-0.5">{c.etapa}</Badge>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="w-7 h-7 shrink-0">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setComunidadDialog({ open: true, data: c })}>
                                <Edit className="w-4 h-4 mr-2" /> Editar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteComunidad(c)}>
                                <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {c.cantidadMiembros} miembros</span>
                          <span>Desde {new Date(c.inicioDate).getFullYear()}</span>
                        </div>
                        {c.etiquetas.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {c.etiquetas.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className={`text-xs px-1.5 py-0.5 ${getTagColor(tag)}`}>{tag}</Badge>
                            ))}
                            {c.etiquetas.length > 3 && <Badge variant="outline" className="text-xs px-1.5 py-0.5">+{c.etiquetas.length - 3}</Badge>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Dialogs */}
      <MiembroCentroFormDialog
        open={miembroDialog.open}
        onOpenChange={(v) => setMiembroDialog({ open: v })}
        mode={miembroDialog.data ? "edit" : "create"}
        initialData={miembroDialog.data}
        isLoading={miembroForm.isLoading}
        onSubmit={async (data) => {
          if (miembroDialog.data) {
            await miembroForm.update(miembroDialog.data.id, data, refreshCentro)
          } else {
            await miembroForm.create(data, refreshCentro)
          }
        }}
      />

      <ComunidadJmvFormDialog
        open={comunidadDialog.open}
        onOpenChange={(v) => setComunidadDialog({ open: v })}
        mode={comunidadDialog.data ? "edit" : "create"}
        initialData={comunidadDialog.data}
        isLoading={comunidadForm.isLoading}
        onSubmit={async (data) => {
          if (comunidadDialog.data) {
            await comunidadForm.update(comunidadDialog.data.id, data, refreshCentro)
          } else {
            await comunidadForm.create(data, refreshCentro)
          }
        }}
      />

      {/* Delete miembro */}
      <AlertDialog open={!!deleteMiembro} onOpenChange={(v) => !v && setDeleteMiembro(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar miembro?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará a <strong>"{deleteMiembro?.nombre}"</strong> del consejo del centro.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="text-white bg-destructive hover:bg-destructive/90"
              onClick={async () => {
                if (!deleteMiembro) return
                await miembroForm.remove(deleteMiembro.id, refreshCentro)
                setDeleteMiembro(null)
              }}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete comunidad */}
      <AlertDialog open={!!deleteComunidad} onOpenChange={(v) => !v && setDeleteComunidad(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar comunidad?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará la comunidad <strong>"{deleteComunidad?.nombre}"</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="text-white bg-destructive hover:bg-destructive/90"
              onClick={async () => {
                if (!deleteComunidad) return
                await comunidadForm.remove(deleteComunidad.id, refreshCentro)
                setDeleteComunidad(null)
              }}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
