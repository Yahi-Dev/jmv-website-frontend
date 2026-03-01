// src/features/eventos/components/EventoFormDialog.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Button } from "@/src/components/ui/button"
import { Textarea } from "@/src/components/ui/textarea"
import { Badge } from "@/src/components/ui/badge"
import { Separator } from "@/src/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import {
  Loader2,
  Plus,
  Trash2,
  Upload,
  Link as LinkIcon,
  X,
  MapPin,
  Mail,
  Clock,
  CalendarDays,
  Tag,
  ListChecks,
  ScrollText,
  BookOpen,
} from "lucide-react"
import { PhoneInputField } from "@/src/components/ui/phone-input"
import { RangeTimePicker, TimePickerPopover } from "@/src/components/ui/time-picker-popover"
import { toast } from "sonner"
import { eventoCreateSchema, eventoUpdateSchema, EventoCreateData } from "../schema/validation"
import { Evento, AgendaDia, AgendaActividad, EventoFormData, getTagColor } from "../model/types"

const PRESET_TAGS = [
  "Formación", "Misión", "Espiritualidad", "Encuentro",
  "Retiro", "Juvenil", "Coordinación Nacional", "Taller",
]

interface EventoFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: EventoFormData) => Promise<void>
  isLoading?: boolean
  initialData?: Evento
  mode: "create" | "edit"
}

type TabValue = "url" | "upload"

export function EventoFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
  initialData,
  mode,
}: EventoFormDialogProps) {
  // ── Complex array state ──────────────────────────────────────────────────────
  const [etiquetas, setEtiquetas] = useState<string[]>([])
  const [etiquetaInput, setEtiquetaInput] = useState("")
  const [actividades, setActividades] = useState<string[]>([])
  const [actividadInput, setActividadInput] = useState("")
  const [agenda, setAgenda] = useState<AgendaDia[]>([])
  const [requisitos, setRequisitos] = useState<string[]>([])
  const [requisitoInput, setRequisitoInput] = useState("")

  // ── Scrollable body ref (for auto-scroll on validation error) ────────────────
  const scrollableRef = useRef<HTMLDivElement>(null)

  // ── Image state ──────────────────────────────────────────────────────────────
  const [fotoTab, setFotoTab] = useState<TabValue>("url")
  const [fotoPreview, setFotoPreview] = useState<string | null>(null)
  const [fotoFile, setFotoFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const fotoInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<EventoCreateData>({
    resolver: zodResolver(mode === "create" ? eventoCreateSchema : eventoUpdateSchema as any),
    defaultValues: {
      titulo: "",
      descripcionBreve: "",
      descripcionCompleta: "",
      imagenUrl: "",
      ubicacion: "",
      fecha: "",
      hora: "",
      email: "",
      telefono: "",
      etiquetas: [],
      actividades: [],
      agenda: [],
      requisitos: [],
    },
  })

  // ── Load initial data ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return

    if (initialData && mode === "edit") {
      form.reset({
        titulo: initialData.titulo,
        descripcionBreve: initialData.descripcionBreve,
        descripcionCompleta: initialData.descripcionCompleta || "",
        imagenUrl: initialData.imagenUrl,
        ubicacion: initialData.ubicacion,
        fecha: initialData.fecha
          ? new Date(initialData.fecha).toISOString().split("T")[0]
          : "",
        hora: initialData.hora,
        email: initialData.email || "",
        telefono: initialData.telefono || "",
        etiquetas: initialData.etiquetas,
        actividades: initialData.actividades,
        agenda: initialData.agenda,
        requisitos: initialData.requisitos,
      })
      setEtiquetas(initialData.etiquetas)
      setActividades(initialData.actividades)
      setAgenda(initialData.agenda)
      setRequisitos(initialData.requisitos)
      if (initialData.imagenUrl) {
        setFotoPreview(initialData.imagenUrl)
        setFotoTab("url")
      }
    } else if (mode === "create") {
      form.reset({
        titulo: "",
        descripcionBreve: "",
        descripcionCompleta: "",
        imagenUrl: "",
        ubicacion: "",
        fecha: "",
        hora: "",
        email: "",
        telefono: "",
        etiquetas: [],
        actividades: [],
        agenda: [],
        requisitos: [],
      })
      setEtiquetas([])
      setActividades([])
      setAgenda([])
      setRequisitos([])
      setFotoPreview(null)
      setFotoFile(null)
      setFotoTab("url")
      setEtiquetaInput("")
      setActividadInput("")
      setRequisitoInput("")
    }
  }, [open, initialData, mode, form])

  useEffect(() => {
    if (!open) {
      setFotoPreview(null)
      setFotoFile(null)
    }
  }, [open])

  // ── Sync local array state → RHF so Zod validates the correct data ──────────
  useEffect(() => {
    form.setValue("etiquetas", etiquetas, { shouldValidate: true })
  }, [etiquetas, form])

  useEffect(() => {
    form.setValue("actividades", actividades)
  }, [actividades, form])

  useEffect(() => {
    form.setValue("agenda", agenda as any)
  }, [agenda, form])

  useEffect(() => {
    form.setValue("requisitos", requisitos, { shouldValidate: true })
  }, [requisitos, form])

  // ── Image helpers ─────────────────────────────────────────────────────────────
  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!allowed.includes(file.type)) {
      form.setError("imagenUrl", { message: "Formato no válido. Use JPEG, PNG, WebP o GIF" })
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      form.setError("imagenUrl", { message: "La imagen no debe superar 5 MB" })
      return
    }
    setFotoFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setFotoPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
    // Mark imagenUrl as non-empty so Zod validation passes.
    // The real URL is set in handleSubmit after uploading to the server.
    form.setValue("imagenUrl", file.name, { shouldValidate: true })
  }

  const removeFoto = () => {
    setFotoPreview(null)
    setFotoFile(null)
    form.setValue("imagenUrl", "")
    if (fotoInputRef.current) fotoInputRef.current.value = ""
  }

  const uploadFile = async (file: File): Promise<string> => {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("titulo", `evento-img-${Date.now()}`)
      fd.append("modulo", "eventos")
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      if (!res.ok) throw new Error("Error al subir imagen")
      const result = await res.json()
      return (
        result.Data?.filePath ??
        result.data?.filePath ??
        result.filePath ??
        (() => { throw new Error("Respuesta inesperada del servidor") })()
      )
    } finally {
      setUploading(false)
    }
  }

  // ── Tag helpers ───────────────────────────────────────────────────────────────
  const addTag = (tag: string) => {
    const trimmed = tag.trim()
    if (!trimmed || etiquetas.includes(trimmed)) return
    setEtiquetas((prev) => [...prev, trimmed])
    setEtiquetaInput("")
  }

  const removeTag = (tag: string) =>
    setEtiquetas((prev) => prev.filter((t) => t !== tag))

  // ── Activity helpers ──────────────────────────────────────────────────────────
  const addActividad = () => {
    const trimmed = actividadInput.trim()
    if (!trimmed) return
    setActividades((prev) => [...prev, trimmed])
    setActividadInput("")
  }

  // ── Agenda helpers ────────────────────────────────────────────────────────────
  const addDia = () =>
    setAgenda((prev) => [
      ...prev,
      { dia: `Día ${prev.length + 1}`, actividades: [] },
    ])

  const updateDiaLabel = (idx: number, dia: string) =>
    setAgenda((prev) => prev.map((d, i) => (i === idx ? { ...d, dia } : d)))

  const removeDia = (idx: number) =>
    setAgenda((prev) => prev.filter((_, i) => i !== idx))

  const addActividadAgenda = (diaIdx: number) =>
    setAgenda((prev) =>
      prev.map((d, i) =>
        i === diaIdx
          ? { ...d, actividades: [...d.actividades, { hora: "", actividad: "" }] }
          : d
      )
    )

  const updateActividadAgenda = (
    diaIdx: number,
    actIdx: number,
    field: keyof AgendaActividad,
    value: string
  ) =>
    setAgenda((prev) =>
      prev.map((d, i) =>
        i === diaIdx
          ? {
              ...d,
              actividades: d.actividades.map((a, j) =>
                j === actIdx ? { ...a, [field]: value } : a
              ),
            }
          : d
      )
    )

  const removeActividadAgenda = (diaIdx: number, actIdx: number) =>
    setAgenda((prev) =>
      prev.map((d, i) =>
        i === diaIdx
          ? { ...d, actividades: d.actividades.filter((_, j) => j !== actIdx) }
          : d
      )
    )

  // ── Requirement helpers ───────────────────────────────────────────────────────
  const addRequisito = () => {
    const trimmed = requisitoInput.trim()
    if (!trimmed) return
    setRequisitos((prev) => [...prev, trimmed])
    setRequisitoInput("")
  }

  // ── Submit ────────────────────────────────────────────────────────────────────
  const handleSubmit = async (data: EventoCreateData) => {
    try {
      let finalImagenUrl = data.imagenUrl
      if (fotoFile && fotoTab === "upload") {
        finalImagenUrl = await uploadFile(fotoFile)
      }

      const submitData: EventoFormData = {
        ...data,
        imagenUrl: finalImagenUrl,
        etiquetas,
        actividades,
        agenda,
        requisitos,
        email: data.email?.trim() || undefined,
        telefono: data.telefono?.trim() || undefined,
        descripcionCompleta: data.descripcionCompleta?.trim() || undefined,
      }

      await onSubmit(submitData)
      onOpenChange(false)
    } catch {
      // error already handled by hook
    }
  }

  const isSubmitting = isLoading || uploading

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[750px] max-h-[92vh] flex flex-col overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
          <DialogTitle>
            {mode === "create" ? "Nuevo Evento" : "Editar Evento"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Completa los datos para publicar un nuevo evento"
              : "Actualiza la información del evento"}
          </DialogDescription>
        </DialogHeader>

        <div ref={scrollableRef} className="flex-1 min-h-0 overflow-y-auto px-6 pb-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">

              {/* ── Imagen ─────────────────────────────────────────────────── */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 font-semibold text-sm">
                  <Upload className="w-4 h-4 text-primary" />
                  Imagen del evento *
                </h3>
                <Tabs
                  value={fotoTab}
                  onValueChange={(v) => setFotoTab(v as TabValue)}
                  className="w-full"
                >
                  <TabsList className="grid w-44 grid-cols-2">
                    <TabsTrigger value="url" className="text-xs">
                      <LinkIcon className="w-3 h-3 mr-1" /> URL
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="text-xs">
                      <Upload className="w-3 h-3 mr-1" /> Subir
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {fotoTab === "url" ? (
                  <FormField
                    control={form.control}
                    name="imagenUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="https://ejemplo.com/imagen-evento.jpg"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => {
                              field.onChange(e)
                              setFotoPreview(e.target.value || null)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <div className="space-y-3">
                    <Input
                      ref={fotoInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={handleFotoUpload}
                      className="cursor-pointer"
                    />
                    {fotoPreview && (
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <img
                          src={fotoPreview}
                          alt="Preview"
                          className="w-20 h-14 object-cover rounded"
                        />
                        <div className="flex-1 text-sm">
                          <p className="font-medium">{fotoFile?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {((fotoFile?.size || 0) / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={removeFoto}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Formatos: JPEG, PNG, WebP, GIF. Máximo 5 MB.
                    </p>
                  </div>
                )}

                {fotoPreview && (
                  <div className="relative aspect-video w-full max-h-48 overflow-hidden rounded-lg border bg-muted">
                    <img
                      src={fotoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <Separator />

              {/* ── Información básica ──────────────────────────────────────── */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-semibold text-sm">
                  <ScrollText className="w-4 h-4 text-primary" />
                  Información básica
                </h3>

                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Nombre del evento..."
                            maxLength={200}
                            {...field}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                            {field.value?.length || 0}/200
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
                      <FormLabel>Descripción breve *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Resumen del evento (máximo 300 caracteres)..."
                          {...field}
                          value={field.value || ""}
                          className="resize-none min-h-[80px]"
                          maxLength={300}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground">
                        {field.value?.length || 0}/300
                      </p>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fecha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="date" {...field} value={field.value || ""} className="pl-10" />
                            <CalendarDays className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
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
                        <FormLabel>Horario *</FormLabel>
                        <FormControl>
                          <RangeTimePicker
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="ubicacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ubicación *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Centro Pastoral San Vicente, Santo Domingo"
                            maxLength={200}
                            {...field}
                            value={field.value || ""}
                            className="pl-10 pr-16"
                          />
                          <MapPin className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
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

              <Separator />

              {/* ── Contacto ────────────────────────────────────────────────── */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-semibold text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  Contacto <span className="text-muted-foreground font-normal">(al menos uno)</span>
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email de contacto</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="eventos@jmvrd.org"
                              {...field}
                              value={field.value || ""}
                              className="pl-10"
                            />
                            <Mail className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <PhoneInputField
                            label="Teléfono de contacto"
                            value={field.value || ""}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* ── Etiquetas ────────────────────────────────────────────────── */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 font-semibold text-sm">
                  <Tag className="w-4 h-4 text-primary" />
                  Etiquetas / Categorías *
                </h3>

                {/* Preset tags */}
                <div className="flex flex-wrap gap-2">
                  {PRESET_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addTag(tag)}
                      disabled={etiquetas.includes(tag)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-opacity ${
                        etiquetas.includes(tag) ? "opacity-30 cursor-default" : "hover:opacity-80 cursor-pointer"
                      } ${getTagColor(tag)}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Custom tag input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Etiqueta personalizada..."
                    value={etiquetaInput}
                    maxLength={50}
                    onChange={(e) => setEtiquetaInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag(etiquetaInput)
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addTag(etiquetaInput)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Selected tags */}
                {etiquetas.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {etiquetas.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className={`gap-1 pr-1 ${getTagColor(tag)}`}
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-0.5 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                {etiquetas.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    Selecciona o escribe etiquetas para categorizar el evento.
                  </p>
                )}
              </div>

              <Separator />

              {/* ── Descripción completa ─────────────────────────────────────── */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 font-semibold text-sm">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Descripción completa
                </h3>
                <FormField
                  control={form.control}
                  name="descripcionCompleta"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Descripción detallada del evento, objetivos, ponentes, etc."
                          maxLength={10000}
                          {...field}
                          value={field.value || ""}
                          className="min-h-[140px] resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* ── Actividades del evento ──────────────────────────────────── */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-semibold text-sm">
                    <ListChecks className="w-4 h-4 text-primary" />
                    Actividades del evento
                  </h3>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Ej: Jornadas médicas, Talleres de formación..."
                    value={actividadInput}
                    maxLength={200}
                    onChange={(e) => setActividadInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addActividad()
                      }
                    }}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addActividad}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {actividades.length > 0 ? (
                  <ul className="space-y-2">
                    {actividades.map((act, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 px-3 py-2 border rounded-lg bg-card/60"
                      >
                        <span className="flex-1 text-sm">{act}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive hover:bg-destructive/10"
                          onClick={() =>
                            setActividades((prev) => prev.filter((_, i) => i !== idx))
                          }
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Agrega las principales actividades que se realizarán en el evento.
                  </p>
                )}
              </div>

              <Separator />

              {/* ── Agenda ──────────────────────────────────────────────────── */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-semibold text-sm">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    Agenda del evento
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addDia}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Agregar día
                  </Button>
                </div>

                {agenda.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    Opcional. Agrega días con sus actividades para eventos de varios días.
                  </p>
                )}

                <div className="space-y-4">
                  {agenda.map((dia, diaIdx) => (
                    <div key={diaIdx} className="border rounded-lg p-4 space-y-3 bg-card/40">
                      <div className="flex items-center gap-2">
                        <Input
                          value={dia.dia}
                          onChange={(e) => updateDiaLabel(diaIdx, e.target.value)}
                          placeholder="Ej: Día 1, Lunes 15 de enero..."
                          maxLength={100}
                          className="flex-1 font-medium"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => removeDia(diaIdx)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-2 pl-2">
                        {dia.actividades.map((act, actIdx) => (
                          <div key={actIdx} className="flex items-center gap-2">
                            <TimePickerPopover
                              value={act.hora}
                              onChange={(v) =>
                                updateActividadAgenda(diaIdx, actIdx, "hora", v)
                              }
                              placeholder="Hora"
                              className="w-36 h-8 text-xs px-2"
                              clearable
                            />
                            <Input
                              value={act.actividad}
                              onChange={(e) =>
                                updateActividadAgenda(diaIdx, actIdx, "actividad", e.target.value)
                              }
                              placeholder="Descripción de la actividad..."
                              maxLength={200}
                              className="flex-1 text-xs"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
                              onClick={() => removeActividadAgenda(diaIdx, actIdx)}
                            >
                              <X className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7 text-muted-foreground"
                          onClick={() => addActividadAgenda(diaIdx)}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Agregar actividad
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* ── Requisitos ──────────────────────────────────────────────── */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 font-semibold text-sm">
                  <ListChecks className="w-4 h-4 text-primary" />
                  Requisitos *
                </h3>

                <div className="flex gap-2">
                  <Input
                    placeholder="Ej: Ser miembro activo de JMV..."
                    value={requisitoInput}
                    maxLength={200}
                    onChange={(e) => setRequisitoInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addRequisito()
                      }
                    }}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addRequisito}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {requisitos.length > 0 ? (
                  <ul className="space-y-2">
                    {requisitos.map((req, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 px-3 py-2 border rounded-lg bg-card/60"
                      >
                        <span className="flex-1 text-sm">{req}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive hover:bg-destructive/10"
                          onClick={() =>
                            setRequisitos((prev) => prev.filter((_, i) => i !== idx))
                          }
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Agrega los requisitos o condiciones para participar en el evento.
                  </p>
                )}
              </div>

              <div className="pb-4" />

            </form>
          </Form>
        </div>

        <DialogFooter className="px-6 py-4 border-t shrink-0 bg-background">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={form.handleSubmit(handleSubmit, (errors) => {
              const FIELD_LABELS: Record<string, string> = {
                imagenUrl: "Imagen",
                titulo: "Título",
                descripcionBreve: "Descripción breve",
                fecha: "Fecha",
                hora: "Horario",
                ubicacion: "Ubicación",
                etiquetas: "Etiquetas",
                requisitos: "Requisitos",
                email: "Contacto (email o teléfono)",
              }
              const firstField = Object.keys(errors)[0]
              const firstError = (errors as any)[firstField]
              const label = FIELD_LABELS[firstField] ?? firstField
              const msg = firstError?.message ?? "Verifica los campos requeridos"
              toast.error(`${label}: ${msg}`)
              // Scroll to top so field errors are visible
              scrollableRef.current?.scrollTo({ top: 0, behavior: "smooth" })
            })}
          >
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {mode === "create" ? "Publicar Evento" : "Guardar Cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
