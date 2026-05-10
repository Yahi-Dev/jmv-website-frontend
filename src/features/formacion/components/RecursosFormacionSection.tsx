"use client"

import { useEffect, useMemo } from "react"
import { Eyebrow, Serif } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import { ModulosFormacion } from "@/src/lib/enum/ModulosFormacion"
import { useGetAllFormaciones } from "../hook/use-formacion"
import { FormacionCardEditorial } from "./FormacionCardEditorial"

const moduleColor = (modulo: ModulosFormacion) => {
  const map: Record<ModulosFormacion, string> = {
    [ModulosFormacion.Voluntario]: "bg-blue-100 text-blue-800",
    [ModulosFormacion.Catequesis]: "bg-green-100 text-green-800",
    [ModulosFormacion.Oraciones]: "bg-purple-100 text-purple-800",
    [ModulosFormacion.Podcast]: "bg-orange-100 text-orange-800",
    [ModulosFormacion.Mision]: "bg-red-100 text-red-800",
    [ModulosFormacion.Guia]: "bg-indigo-100 text-indigo-800",
  }
  return map[modulo] || "bg-gray-100 text-gray-800"
}

export function RecursosFormacionSection() {
  const { formaciones, fetchAll, isLoading } = useGetAllFormaciones()

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const latest = useMemo(() => {
    return [...formaciones]
      .sort((a, b) => {
        const da = a.createdDate ? new Date(a.createdDate).getTime() : 0
        const db = b.createdDate ? new Date(b.createdDate).getTime() : 0
        return db - da
      })
      .slice(0, 6)
  }, [formaciones])

  return (
    <section style={{ background: JMV.paper, padding: "120px 32px", borderTop: "1px solid " + JMV.line }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <Reveal delay={0} y={24}>
          <div style={{ maxWidth: 720, marginBottom: 64 }}>
            <Eyebrow>Recursos Recientes</Eyebrow>
            <Serif size={56} weight={300} style={{ display: "block", marginTop: 24 }}>
              Materiales para <span style={{ fontStyle: "italic", color: JMV.gold }}>profundizar</span>.
            </Serif>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 17,
                lineHeight: 1.65,
                color: JMV.body,
                marginTop: 24,
                maxWidth: 560,
              }}
            >
              Los últimos materiales y recursos publicados para acompañar tu formación. Catequesis, oraciones,
              guías y herramientas de servicio.
            </p>
          </div>
        </Reveal>

        {isLoading ? (
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 15,
              color: JMV.mute,
              textAlign: "center",
              padding: "40px 0",
            }}
          >
            Cargando recursos...
          </p>
        ) : latest.length === 0 ? (
          <div
            style={{
              padding: "60px 32px",
              textAlign: "center",
              fontFamily: FONT_BODY,
              fontSize: 15,
              color: JMV.mute,
              border: "1px dashed " + JMV.line,
              borderRadius: 4,
              background: JMV.white,
            }}
          >
            No hay recursos de formación disponibles aún.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 28,
            }}
          >
            {latest.map((f, i) => (
              <Reveal key={f.id} delay={i * 90} y={28}>
                <FormacionCardEditorial
                  formacion={f}
                  getModuleColor={moduleColor}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
