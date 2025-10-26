// src/components/ui/sonner.tsx
"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          // Estilos base para todos los toasts
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          
          // Estilos específicos para success
          success: 
            "!bg-green-50 !text-green-900 !border-green-200 [&>div>svg]:!text-green-600",
          
          // Estilos específicos para error
          error: 
            "!bg-red-50 !text-red-900 !border-red-200 [&>div>svg]:!text-red-600",
          
          // Estilos para otros tipos (opcional)
          warning:
            "!bg-yellow-50 !text-yellow-900 !border-yellow-200 [&>div>svg]:!text-yellow-600",
          info:
            "!bg-blue-50 !text-blue-900 !border-blue-200 [&>div>svg]:!text-blue-600",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }