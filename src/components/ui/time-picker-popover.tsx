// src/components/ui/time-picker-popover.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { Clock, Check, X, Timer } from "lucide-react"
import { cn } from "@/src/lib/utils"

// ── Time generation ────────────────────────────────────────────────────────────
// Every 15 min from 5:00 AM to 11:00 PM
function generateTimes(): string[] {
  const out: string[] = []
  for (let h = 5; h <= 23; h++) {
    const increments = h === 23 ? [0] : [0, 15, 30, 45]
    for (const m of increments) {
      const period = h >= 12 ? "PM" : "AM"
      const h12 = h % 12 || 12
      out.push(`${h12}:${String(m).padStart(2, "0")} ${period}`)
    }
  }
  return out
}

const ALL_TIMES = generateTimes()

// ── Duration helper ────────────────────────────────────────────────────────────
function parseMinutes(t: string): number {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!m) return -1
  let h = parseInt(m[1])
  const min = parseInt(m[2])
  const period = m[3].toUpperCase()
  if (period === "PM" && h !== 12) h += 12
  if (period === "AM" && h === 12) h = 0
  return h * 60 + min
}

function calcDuration(start: string, end: string): string {
  if (!start || !end) return ""
  const s = parseMinutes(start)
  const e = parseMinutes(end)
  if (s < 0 || e < 0 || e <= s) return ""
  const diff = e - s
  const hours = Math.floor(diff / 60)
  const mins = diff % 60
  if (hours === 0) return `${mins} min`
  if (mins === 0) return hours === 1 ? "1 hora" : `${hours} horas`
  return `${hours} h ${mins} min`
}

// ── Single time picker ─────────────────────────────────────────────────────────
interface TimePickerPopoverProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
  clearable?: boolean
}

export function TimePickerPopover({
  value,
  onChange,
  placeholder = "Seleccionar hora",
  className,
  clearable = false,
}: TimePickerPopoverProps) {
  const [open, setOpen] = useState(false)
  const activeRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Scroll selected item into view when popover opens — native scroll
  useEffect(() => {
    if (open) {
      // Small delay so PopoverContent has finished mounting
      const id = setTimeout(() => {
        activeRef.current?.scrollIntoView({ block: "center", behavior: "instant" })
      }, 30)
      return () => clearTimeout(id)
    }
  }, [open])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "justify-start gap-2 font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <Clock className="w-3.5 h-3.5 shrink-0 text-primary" />
          <span className="flex-1 text-left">{value || placeholder}</span>
          {clearable && value && (
            <span
              role="button"
              tabIndex={0}
              className="ml-auto transition-colors text-muted-foreground hover:text-destructive"
              onClick={(e) => { e.stopPropagation(); onChange("") }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); onChange("") }
              }}
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-40 p-0" align="start" side="bottom">
        {/* Plain div — respects mouse-wheel natively, unlike Radix ScrollArea in portals */}
        <div
          ref={listRef}
          className="h-56 overflow-y-auto overscroll-contain"
        >
          <div className="p-1 space-y-0.5">
            {ALL_TIMES.map((t) => {
              const isActive = value === t
              return (
                <button
                  key={t}
                  ref={isActive ? activeRef : undefined}
                  type="button"
                  onClick={() => { onChange(t); setOpen(false) }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm transition-colors cursor-pointer",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  {t}
                  {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ── Range time picker ──────────────────────────────────────────────────────────
// Stores value as "9:00 AM - 5:00 PM" or "Todo el día"
interface RangeTimePickerProps {
  value: string
  onChange: (v: string) => void
}

function parseRange(value: string): { start: string; end: string } {
  if (!value || value === "Todo el día") return { start: "", end: "" }
  const [start, end] = value.split(" - ")
  return { start: start?.trim() ?? "", end: end?.trim() ?? "" }
}

export function RangeTimePicker({ value, onChange }: RangeTimePickerProps) {
  const isTodoDia = value === "Todo el día"
  const { start, end } = parseRange(value)
  const duration = calcDuration(start, end)

  const setStart = (s: string) => {
    if (!s) { onChange(end || ""); return }
    onChange(end ? `${s} - ${end}` : s)
  }

  const setEnd = (e: string) => {
    if (!e) { onChange(start || ""); return }
    onChange(start ? `${start} - ${e}` : e)
  }

  return (
    <div className="space-y-2.5">
      {/* Todo el día toggle */}
      {/* <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange(isTodoDia ? "" : "Todo el día")}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-150",
            isTodoDia
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary"
          )}
        >
          ☀️ Todo el día
        </button>
      </div> */}

      {/* Range selectors */}
      {!isTodoDia && (
        <>
          <div className="flex items-center gap-2">
            <TimePickerPopover
              value={start}
              onChange={setStart}
              placeholder="Desde"
              className="flex-1 text-sm h-9"
              clearable
            />
            <span className="text-sm font-medium text-muted-foreground shrink-0">—</span>
            <TimePickerPopover
              value={end}
              onChange={setEnd}
              placeholder="Hasta"
              className="flex-1 text-sm h-9"
              clearable
            />
          </div>

          {/* Duration badge */}
          {duration && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground pl-0.5">
              <Timer className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Duración total:</span>
              <span className="font-semibold text-foreground">{duration}</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
