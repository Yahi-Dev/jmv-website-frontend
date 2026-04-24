import Image from "next/image"
import Link from "next/link"
import { JMV, FONT_DISPLAY, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"

const socialIcons = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
      <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.5C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.92 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" />
    </svg>
  ),
}

const communityLinks = [
  { label: "Quiénes Somos", href: "/quienes-somos" },
  { label: "Consejo Nacional", href: "/consejos" },
  { label: "Centros JMV", href: "/centros" },
  { label: "Notas Distintivas", href: "/quienes-somos#notas" },
]

const participaLinks = [
  { label: "Únete a JMV", href: "/unete" },
  { label: "Formación", href: "/formacion" },
  { label: "Actividades", href: "/actividades" },
  { label: "Libro de Oración", href: "/libro-oracion" },
]

export function FooterSection() {
  return (
    <footer style={{ background: JMV.ink, color: "#fff", fontFamily: FONT_BODY, padding: "40px 40px 20px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 48,
          alignItems: "start",
          paddingBottom: 32,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <Image
                src="/logo/jmv-logo-removebg-preview.png"
                alt="JMV"
                width={72}
                height={72}
                style={{ borderRadius: "50%", objectFit: "contain" }}
              />
              <div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 17, letterSpacing: "-0.01em", lineHeight: 1.15 }}>
                  Juventud Mariana Vicenciana
                </div>
                <div style={{ fontFamily: FONT_UI, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
                  República Dominicana
                </div>
              </div>
            </div>
            <p style={{ fontFamily: FONT_BODY, fontSize: 13.5, lineHeight: 1.55, color: "rgba(255,255,255,0.6)", marginBottom: 16, maxWidth: 280 }}>
              Formando jóvenes líderes cristianos al estilo de María y San Vicente de Paúl.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {(Object.keys(socialIcons) as (keyof typeof socialIcons)[]).map((label) => (
                <a
                  key={label}
                  aria-label={label}
                  className="jmv-ft-social"
                  style={{
                    display: "inline-flex",
                    width: 30,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.8)",
                    cursor: "pointer",
                    transition: "color .15s, background .15s, border-color .15s",
                  }}
                >
                  {socialIcons[label]}
                </a>
              ))}
            </div>
          </div>

          {/* Comunidad */}
          <div>
            <p style={{ fontFamily: FONT_UI, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 14 }}>
              Comunidad
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {communityLinks.map((l) => (
                <li key={l.href} style={{ lineHeight: 1.8 }}>
                  <Link
                    href={l.href}
                    className="jmv-ft-link"
                    style={{ fontFamily: FONT_UI, fontSize: 13.5, color: "rgba(255,255,255,0.8)", textDecoration: "none", transition: "color .15s" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Participa */}
          <div>
            <p style={{ fontFamily: FONT_UI, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 14 }}>
              Participa
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {participaLinks.map((l) => (
                <li key={l.href} style={{ lineHeight: 1.8 }}>
                  <Link
                    href={l.href}
                    className="jmv-ft-link"
                    style={{ fontFamily: FONT_UI, fontSize: 13.5, color: "rgba(255,255,255,0.8)", textDecoration: "none", transition: "color .15s" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p style={{ fontFamily: FONT_UI, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 14 }}>
              Contacto
            </p>
            <div style={{ lineHeight: 1.5 }}>
              <span style={{ display: "block", fontFamily: FONT_UI, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>Ubicación</span>
              <span style={{ display: "block", color: "rgba(255,255,255,0.9)", fontWeight: 450 }}>Santo Domingo, RD</span>

              <span style={{ display: "block", fontFamily: FONT_UI, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: 10 }}>Correo</span>
              <span style={{ display: "block", color: "rgba(255,255,255,0.9)", fontWeight: 450 }}>info@jmvrd.org</span>

              <span style={{ display: "block", fontFamily: FONT_UI, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: 10 }}>Teléfono</span>
              <span style={{ display: "block", color: "rgba(255,255,255,0.9)", fontWeight: 450 }}>+1 (809) 123-4567</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 18, fontFamily: FONT_UI, fontSize: 11.5, color: "rgba(255,255,255,0.45)", flexWrap: "wrap", gap: 12 }}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/bandera/bandera-nacional-mundo-republica-dominicana.avif"
              alt="RD"
              width={18}
              height={12}
              style={{ borderRadius: 2, marginRight: 8, display: "inline-block", verticalAlign: "middle", boxShadow: "0 0 0 1px rgba(255,255,255,0.15)" }}
            />
            © {new Date().getFullYear()} JMV República Dominicana
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <Link href="#" className="jmv-ft-bottom-link" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color .15s" }}>Privacidad</Link>
            <Link href="#" className="jmv-ft-bottom-link" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color .15s" }}>Términos</Link>
            <a href="https://jmvinter.org/" target="_blank" rel="noopener noreferrer" className="jmv-ft-bottom-link" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color .15s" }}>JMV Internacional</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
