"use client"

import { useMemo, useState } from "react"
import Navbar from "@/src/components/Navbar"
import { FooterSection } from "@/src/components/shared/FooterSection"
import { Eyebrow, Icon, Serif, type IconName } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion"

// ── Razones para unirse ──────────────────────────────────────────────────────
const razones: { num: string; title: string; body: string; icon: IconName }[] = [
  {
    num: "01",
    title: "Comunidad fraterna",
    icon: "users",
    body:
      "Forma parte de una familia de jóvenes católicos que se acompañan en el camino de la fe, comparten alegrías y se sostienen en los momentos difíciles.",
  },
  {
    num: "02",
    title: "Formación integral",
    icon: "book",
    body:
      "Itinerario formativo en seis módulos: catequesis, oraciones, voluntariado, misión, podcast y guías. Recursos para crecer humana y espiritualmente.",
  },
  {
    num: "03",
    title: "Servicio transformador",
    icon: "heart",
    body:
      "Misiones a parajes rurales, visitas a hogares de ancianos, acompañamiento a niños en bateyes. El servicio es donde el carisma vicentino se hace vida.",
  },
  {
    num: "04",
    title: "Espiritualidad mariana",
    icon: "star",
    body:
      "Rosario, Liturgia de las Horas, novenas, retiros y peregrinaciones. María como modelo de discípula y la Medalla Milagrosa como signo cotidiano.",
  },
]

// ── Provincias para el select ────────────────────────────────────────────────
const PROVINCIAS = [
  "Santo Domingo", "Distrito Nacional", "Santiago", "La Vega", "Higüey", "San Pedro de Macorís",
  "Barahona", "Mao", "Puerto Plata", "San Juan de la Maguana", "Baní", "Moca", "Azua",
  "Bonao", "Cotuí", "San Cristóbal", "San Francisco de Macorís", "Otra",
]

const FAQS = [
  {
    q: "¿Qué requisitos necesito para unirme?",
    a:
      "Tener entre 16 y 35 años, ser católico practicante (o estar en camino), y tener disposición para crecer en fe y servir a los más necesitados. No se requiere experiencia previa — te acompañamos en cada paso.",
  },
  {
    q: "¿Cuál es el proceso después de enviar mi solicitud?",
    a:
      "El coordinador del centro más cercano te contactará en los próximos días. Te invitará a un encuentro de bienvenida, donde conocerás a la comunidad. Empiezas como aspirante, sin compromiso formal — para discernir si JMV es tu camino.",
  },
  {
    q: "¿Es necesario aportar dinero para participar?",
    a:
      "No. Ser parte de JMV es completamente gratuito. Algunas actividades especiales (retiros, misiones, encuentros nacionales) tienen un aporte voluntario para alimentación y transporte, pero siempre buscamos que ningún joven quede fuera por motivos económicos.",
  },
  {
    q: "¿Cuánto tiempo debo dedicar?",
    a:
      "El compromiso mínimo es asistir al encuentro semanal del centro (aproximadamente 2 horas) y participar en al menos una actividad de servicio al mes. A partir de ahí, cada miembro dedica el tiempo que su vida le permite.",
  },
  {
    q: "¿Qué actividades realizan?",
    a:
      "Encuentros formativos semanales, retiros espirituales, misiones a comunidades rurales, peregrinaciones marianas, vigilias, talleres de liderazgo, proyectos de servicio social y encuentros nacionales que reúnen a centros de todo el país.",
  },
  {
    q: "¿Hay un centro cerca de mi parroquia?",
    a:
      "Tenemos centros en las principales diócesis del país: Santo Domingo, Santiago, La Vega, Higüey, Barahona, Puerto Plata, San Pedro, Baní, Moca y otras. En la sección de Centros puedes ver la lista completa con sus contactos.",
  },
]

export default function UnetePage() {
  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    provincia: "",
    parroquia: "",
    motivacion: "",
    disponibilidad: "",
    terms: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const onChange = (k: keyof typeof form, v: string | boolean) =>
    setForm((prev) => ({ ...prev, [k]: v }))

  const isValid = useMemo(() => {
    return (
      form.firstName.trim().length >= 2 &&
      form.lastName.trim().length >= 2 &&
      /^\S+@\S+\.\S+$/.test(form.email) &&
      form.phone.trim().length >= 7 &&
      form.age.trim().length > 0 &&
      form.provincia.trim().length > 0 &&
      form.motivacion.trim().length >= 10 &&
      form.terms
    )
  }, [form])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setSubmitting(true)
    // TODO: wire up real API endpoint
    await new Promise((r) => setTimeout(r, 800))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div className="jmv-kit-root" style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />

      {/* HERO */}
      <section
        style={{
          background: JMV.white,
          padding: "56px 32px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          className="jmv-spin-slow"
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 480,
            height: 480,
            borderRadius: "50%",
            border: "1px dashed rgba(243,167,54,0.16)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          className="jmv-pulse-soft"
          style={{
            position: "absolute",
            top: 80,
            right: 80,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(19,159,204,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          className="jmv-float-slow"
          style={{
            position: "absolute",
            top: 220,
            right: 220,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: JMV.gold,
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <Reveal delay={0} y={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontFamily: FONT_UI,
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: JMV.mute,
                marginBottom: 40,
              }}
            >
              <span style={{ display: "inline-block", width: 36, height: 1, background: JMV.gold }} />
              <span>Únete</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>JMV República Dominicana</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span style={{ color: JMV.celeste }}>Tu vocación te espera</span>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "end" }}>
            <div>
              <Reveal delay={120} y={20}>
                <Eyebrow color={JMV.gold}>Únete a JMV</Eyebrow>
              </Reveal>
              <Reveal delay={220} y={32}>
                <h1
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "clamp(3rem, 7vw, 6.4rem)",
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: "-0.025em",
                    color: JMV.ink,
                    margin: "28px 0 0",
                    fontVariationSettings: '"opsz" 144, "SOFT" 50',
                  }}
                >
                  Camina con{" "}
                  <span style={{ fontStyle: "italic", color: JMV.gold, fontWeight: 300 }}>nosotros</span>
                  ,
                  <br />
                  vive el <span style={{ fontStyle: "italic", color: JMV.celeste, fontWeight: 300 }}>llamado</span>.
                </h1>
              </Reveal>
            </div>

            <Reveal delay={380} y={20}>
              <div>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 17,
                    lineHeight: 1.65,
                    color: JMV.body,
                    margin: 0,
                    maxWidth: 440,
                  }}
                >
                  Descubre tu vocación de servicio y forma parte de una familia que transforma vidas siguiendo el
                  ejemplo de María y San Vicente de Paúl.
                </p>
                <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
                  <a href="#solicitud" className="jmv-ghost-pill" style={{ textDecoration: "none" }}>
                    Completar solicitud <Icon name="arrowUR" size={13} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RAZONES */}
      <section style={{ background: JMV.mist, padding: "120px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal delay={0} y={24}>
            <div style={{ maxWidth: 720, marginBottom: 72 }}>
              <Eyebrow>Por qué unirte</Eyebrow>
              <Serif size={56} weight={300} style={{ display: "block", marginTop: 24 }}>
                Cuatro <span style={{ fontStyle: "italic", color: JMV.gold }}>razones</span> para dar el paso.
              </Serif>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: JMV.body,
                  marginTop: 28,
                  maxWidth: 560,
                }}
              >
                JMV no es un grupo más — es un estilo de vida cristiano al servicio de los más necesitados.
                Estas son las cuatro dimensiones que harán crecer tu fe y tu humanidad.
              </p>
            </div>
          </Reveal>

          <div style={{ borderTop: "1px solid " + JMV.line }}>
            {razones.map((r, i) => (
              <Reveal key={i} delay={i * 110} y={22}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 1.3fr auto",
                    gap: 48,
                    alignItems: "center",
                    padding: "40px 0",
                    borderBottom: "1px solid " + JMV.line,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT_UI,
                      fontSize: 13,
                      color: JMV.gold,
                      letterSpacing: "0.18em",
                      fontWeight: 500,
                    }}
                  >
                    {r.num}
                  </div>
                  <Serif size={42} weight={300}>
                    {r.title}
                  </Serif>
                  <p
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 15.5,
                      lineHeight: 1.65,
                      color: JMV.body,
                      margin: 0,
                      maxWidth: 520,
                    }}
                  >
                    {r.body}
                  </p>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 999,
                      border: "1px solid " + JMV.line,
                      background: JMV.white,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: JMV.ink,
                    }}
                  >
                    <Icon name={r.icon} size={20} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOLICITUD */}
      <section
        id="solicitud"
        style={{
          background: JMV.white,
          padding: "120px 32px",
          borderTop: "1px solid " + JMV.line,
        }}
      >
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <Reveal delay={0} y={24}>
            <div style={{ marginBottom: 56, textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Eyebrow align="center">Solicitud</Eyebrow>
              </div>
              <Serif size={56} weight={300} style={{ display: "block", marginTop: 24 }}>
                Cuéntanos un poco sobre <span style={{ fontStyle: "italic", color: JMV.gold }}>ti</span>.
              </Serif>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: JMV.body,
                  marginTop: 24,
                  maxWidth: 560,
                  marginInline: "auto",
                }}
              >
                Completa el formulario y el coordinador del centro más cercano te contactará para
                acompañarte en tu proceso. Sin compromiso, sin costo — solo el primer paso.
              </p>
            </div>
          </Reveal>

          {submitted ? (
            <Reveal delay={0} y={20}>
              <div
                style={{
                  background: JMV.paper,
                  border: "1px solid " + JMV.line,
                  borderLeft: `4px solid ${JMV.gold}`,
                  borderRadius: 4,
                  padding: "56px 48px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 999,
                    background: JMV.gold,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    marginBottom: 20,
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <Serif size={42} weight={300} style={{ display: "block" }}>
                  Recibimos tu <span style={{ fontStyle: "italic", color: JMV.gold }}>solicitud</span>.
                </Serif>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: JMV.body,
                    marginTop: 18,
                    marginBottom: 0,
                  }}
                >
                  Gracias, <strong style={{ color: JMV.ink }}>{form.firstName}</strong>. El coordinador del centro más
                  cercano a {form.provincia} te contactará pronto al correo o teléfono que nos diste.
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0} y={20}>
              <form
                onSubmit={handleSubmit}
                style={{
                  background: JMV.paper,
                  border: "1px solid " + JMV.line,
                  borderRadius: 4,
                  padding: "48px",
                }}
              >
                <FormGrid>
                  <Field label="Nombre" required>
                    <FormInput
                      value={form.firstName}
                      onChange={(v) => onChange("firstName", v)}
                      placeholder="Tu nombre"
                      required
                    />
                  </Field>
                  <Field label="Apellidos" required>
                    <FormInput
                      value={form.lastName}
                      onChange={(v) => onChange("lastName", v)}
                      placeholder="Tus apellidos"
                      required
                    />
                  </Field>
                </FormGrid>

                <FormGrid>
                  <Field label="Correo electrónico" required>
                    <FormInput
                      value={form.email}
                      onChange={(v) => onChange("email", v)}
                      placeholder="tu@email.com"
                      type="email"
                      required
                    />
                  </Field>
                  <Field label="Teléfono" required>
                    <FormInput
                      value={form.phone}
                      onChange={(v) => onChange("phone", v)}
                      placeholder="+1 (809) 000-0000"
                      type="tel"
                      required
                    />
                  </Field>
                </FormGrid>

                <FormGrid>
                  <Field label="Edad" required>
                    <FormInput
                      value={form.age}
                      onChange={(v) => onChange("age", v)}
                      placeholder="Tu edad"
                      type="number"
                      required
                    />
                  </Field>
                  <Field label="Provincia" required>
                    <FormSelect
                      value={form.provincia}
                      onChange={(v) => onChange("provincia", v)}
                      placeholder="Selecciona tu provincia"
                      options={PROVINCIAS}
                      required
                    />
                  </Field>
                </FormGrid>

                <Field label="Parroquia">
                  <FormInput
                    value={form.parroquia}
                    onChange={(v) => onChange("parroquia", v)}
                    placeholder="Nombre de tu parroquia (opcional)"
                  />
                </Field>

                <Field label="¿Por qué quieres unirte a JMV?" required>
                  <FormTextarea
                    value={form.motivacion}
                    onChange={(v) => onChange("motivacion", v)}
                    placeholder="Cuéntanos brevemente qué te motiva a dar este paso..."
                    rows={5}
                    required
                  />
                </Field>

                <Field label="Disponibilidad de tiempo">
                  <FormSelect
                    value={form.disponibilidad}
                    onChange={(v) => onChange("disponibilidad", v)}
                    placeholder="¿Cuánto tiempo puedes dedicar?"
                    options={[
                      "Pocas horas a la semana",
                      "Principalmente fines de semana",
                      "Varias horas durante la semana",
                      "Disponibilidad amplia",
                    ]}
                  />
                </Field>

                {/* Terms */}
                <label
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    padding: "16px 18px",
                    background: JMV.white,
                    border: "1px solid " + JMV.line,
                    borderRadius: 4,
                    marginTop: 24,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.terms}
                    onChange={(e) => onChange("terms", e.target.checked)}
                    style={{ marginTop: 3, accentColor: JMV.gold, cursor: "pointer" }}
                    required
                  />
                  <span
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: JMV.body,
                    }}
                  >
                    Acepto que JMV República Dominicana use mis datos para contactarme sobre mi solicitud,
                    según su política de privacidad. <span style={{ color: JMV.gold }}>*</span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  style={{
                    marginTop: 32,
                    width: "100%",
                    padding: "16px 28px",
                    borderRadius: 999,
                    background: !isValid || submitting ? JMV.line : JMV.ink,
                    color: !isValid || submitting ? JMV.mute : "#fff",
                    border: "none",
                    fontFamily: FONT_UI,
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    cursor: !isValid || submitting ? "not-allowed" : "pointer",
                    transition: "background .2s ease, color .2s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  {submitting ? "Enviando..." : "Enviar mi solicitud"}
                  {!submitting && <Icon name="arrowUR" size={14} color={!isValid ? JMV.mute : "#fff"} />}
                </button>

                <p
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: 12,
                    color: JMV.mute,
                    textAlign: "center",
                    marginTop: 16,
                    marginBottom: 0,
                  }}
                >
                  Sin costo · Sin compromiso · Tu información es confidencial
                </p>
              </form>
            </Reveal>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: JMV.paper, padding: "120px 32px", borderTop: "1px solid " + JMV.line }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <Reveal delay={0} y={20}>
            <div style={{ marginBottom: 56, textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Eyebrow align="center">Preguntas frecuentes</Eyebrow>
              </div>
              <Serif size={56} weight={300} style={{ display: "block", marginTop: 24 }}>
                Antes de dar el <span style={{ fontStyle: "italic", color: JMV.gold }}>paso</span>.
              </Serif>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: JMV.body,
                  marginTop: 24,
                  maxWidth: 560,
                  marginInline: "auto",
                }}
              >
                Las preguntas más comunes sobre cómo unirte a la familia JMV.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0} y={20}>
            <Accordion type="single" collapsible className="space-y-2">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`q-${i}`}
                  className="border-0"
                  style={{
                    background: JMV.white,
                    border: "1px solid " + JMV.line,
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <AccordionTrigger
                    className="px-6 py-5 hover:no-underline"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 18,
                      fontWeight: 400,
                      color: JMV.ink,
                      letterSpacing: "-0.005em",
                      textAlign: "left",
                    }}
                  >
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="px-6 pb-5"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 15.5,
                      lineHeight: 1.75,
                      color: JMV.body,
                    }}
                  >
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}

// ── Form helpers ─────────────────────────────────────────────────────────────

function FormGrid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
      {children}
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          display: "block",
          fontFamily: FONT_UI,
          fontSize: 11.5,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: JMV.body,
          marginBottom: 10,
        }}
      >
        {label}
        {required && <span style={{ color: JMV.gold, marginLeft: 4 }}>*</span>}
      </label>
      {children}
    </div>
  )
}

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  background: JMV.white,
  border: "1px solid " + JMV.line,
  borderRadius: 4,
  fontFamily: FONT_BODY,
  fontSize: 14.5,
  color: JMV.ink,
  outline: "none",
  transition: "border-color .15s",
}

function FormInput({
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  return (
    <input
      type={type}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onFocus={(e) => (e.currentTarget.style.borderColor = JMV.ink)}
      onBlur={(e) => (e.currentTarget.style.borderColor = JMV.line)}
      style={inputBase}
    />
  )
}

function FormSelect({
  value,
  onChange,
  options,
  placeholder,
  required,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder?: string
  required?: boolean
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      onFocus={(e) => (e.currentTarget.style.borderColor = JMV.ink)}
      onBlur={(e) => (e.currentTarget.style.borderColor = JMV.line)}
      style={{
        ...inputBase,
        cursor: "pointer",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
        paddingRight: 38,
      }}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}

function FormTextarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  required,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
  required?: boolean
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      rows={rows}
      onFocus={(e) => (e.currentTarget.style.borderColor = JMV.ink)}
      onBlur={(e) => (e.currentTarget.style.borderColor = JMV.line)}
      style={{
        ...inputBase,
        resize: "vertical",
        minHeight: 100,
        lineHeight: 1.55,
      }}
    />
  )
}
