// src/components/ui/phone-input.tsx
"use client"

import PhoneInput, { type FlagProps } from "react-phone-number-input"
import "react-phone-number-input/style.css"
import Flags from "country-flag-icons/react/3x2"

// Render country flags as inline SVGs from country-flag-icons (no HTTP requests)
function SvgFlag({ country, countryName }: FlagProps) {
  const Flag = Flags[country as keyof typeof Flags]
  if (!Flag) return <span style={{ width: 20, display: "inline-block" }} />
  return <Flag title={countryName} style={{ width: 20, height: "auto", display: "block" }} />
}

interface PhoneInputFieldProps {
  value: string | undefined
  onChange: (value: string) => void
  error?: string
  label?: string
  required?: boolean
  focusColor?: string
  className?: string
}

export function PhoneInputField({
  value,
  onChange,
  error,
  label = "Teléfono",
  required = false,
  focusColor = "#001689",
  className,
}: PhoneInputFieldProps) {
  // react-phone-number-input requires E.164 format (starts with '+').
  // Values stored before this component was used may not have '+', so
  // we pass undefined to avoid the library warning and let the user re-enter.
  const safeValue = value && value.startsWith("+") ? value : undefined

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`phone-input-wrapper flex items-center border rounded-md bg-white transition-all ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        style={{ "--phone-focus-color": focusColor } as React.CSSProperties}
      >
        <PhoneInput
          defaultCountry="DO"
          value={safeValue}
          onChange={(val) => onChange(val ?? "")}
          international
          countryCallingCodeEditable={false}
          flagComponent={SvgFlag}
          className="w-full"
        />
      </div>
      {/* If old value exists but isn't E.164, hint the user to re-enter */}
      {value && !value.startsWith("+") && !error && (
        <p className="text-xs text-amber-600 mt-1">
          Número anterior: {value}. Por favor vuelve a ingresar el teléfono.
        </p>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
