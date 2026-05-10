"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Eyebrow, Icon, Serif } from "@/src/features/home/ui-kit/Primitives"
import { Reveal } from "@/src/features/home/ui-kit/Reveal"
import { JMV, FONT_UI, FONT_BODY } from "@/src/features/home/ui-kit/tokens"
import { ModulosFormacion } from "@/src/lib/enum/ModulosFormacion"
import { useGetAllFormaciones } from "../hook/use-formacion"
import { getClientUser } from "@/src/lib/client-auth"
import { FormacionCardEditorial } from "./FormacionCardEditorial"

const MODULES = Object.values(ModulosFormacion)

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

export function ModulosFormacionSection() {
  const [search, setSearch] = useState("")
  const [active, setActive] = useState<ModulosFormacion>(MODULES[0])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { formaciones, fetchAll } = useGetAllFormaciones()

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  useEffect(() => {
    getClientUser()
      .then((u) => setIsLoggedIn(!!u))
      .catch(() => setIsLoggedIn(false))
  }, [])

  const filtered = useMemo(() => {
    const inModule = formaciones.filter((f) => f.modulo === active)
    if (!search.trim()) return inModule
    const q = search.toLowerCase()
    return inModule.filter(
      (f) =>
        f.titulo?.toLowerCase().includes(q) ||
        f.descripcion?.toLowerCase().includes(q)
    )
  }, [formaciones, active, search])

  return (
    <section style={{ background: JMV.white, padding: "120px 32px", borderTop: "1px solid " + JMV.line }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <Reveal delay={0} y={24}>
          <div style={{ maxWidth: 720, marginBottom: 64 }}>
            <Eyebrow>Módulos de Formación</Eyebrow>
            <Serif size={56} weight={300} style={{ display: "block", marginTop: 24 }}>
              Camina con tu <span style={{ fontStyle: "italic", color: JMV.gold }}>propio</span> ritmo.
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
              Nuestro programa formativo está estructurado en ciclos progresivos que acompañan el crecimiento
              espiritual y humano de cada miembro.
            </p>
          </div>
        </Reveal>

        {/* Tabs row */}
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          {MODULES.map((m) => {
            const isActive = m === active
            return (
              <button
                key={m}
                onClick={() => setActive(m)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 999,
                  background: isActive ? JMV.ink : "transparent",
                  color: isActive ? "#fff" : JMV.body,
                  border: "1px solid " + (isActive ? JMV.ink : JMV.line),
                  fontFamily: FONT_UI,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all .2s ease",
                  letterSpacing: "0.01em",
                }}
              >
                {m}
              </button>
            )
          })}
        </div>

        {/* Search + admin */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 56,
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", maxWidth: 380, width: "100%" }}>
            <span
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: JMV.mute,
                pointerEvents: "none",
              }}
            >
              <Icon name="search" size={15} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Buscar en ${active}...`}
              style={{
                width: "100%",
                padding: "12px 40px 12px 42px",
                background: JMV.white,
                border: "1px solid " + JMV.line,
                borderRadius: 999,
                fontFamily: FONT_UI,
                fontSize: 13.5,
                color: JMV.ink,
                outline: "none",
                transition: "border-color .15s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = JMV.ink)}
              onBlur={(e) => (e.currentTarget.style.borderColor = JMV.line)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Limpiar búsqueda"
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: JMV.mute,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="plus" size={14} />
              </button>
            )}
          </div>

          {isLoggedIn && (
            <Link
              href="/admin/formacion"
              className="jmv-ghost-pill"
              style={{ textDecoration: "none" }}
            >
              Administrar Formación <Icon name="arrowUR" size={13} />
            </Link>
          )}
        </div>

        {/* Cards grid */}
        {filtered.length === 0 ? (
          <div
            style={{
              padding: "60px 32px",
              textAlign: "center",
              fontFamily: FONT_BODY,
              fontSize: 15,
              color: JMV.mute,
              border: "1px dashed " + JMV.line,
              borderRadius: 4,
            }}
          >
            {search
              ? `No se encontraron formaciones que coincidan con "${search}" en ${active}.`
              : `No hay formaciones disponibles en ${active}.`}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 28,
            }}
          >
            {filtered.map((f, i) => (
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
