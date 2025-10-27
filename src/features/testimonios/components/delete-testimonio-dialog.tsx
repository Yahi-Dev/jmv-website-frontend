// src/features/testimonios/components/delete-testimonio-dialog.tsx
"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog"
import { Button } from "@/src/components/ui/button"
import { Loader2, AlertTriangle } from "lucide-react"

interface DeleteTestimonioDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => Promise<void>
  isLoading?: boolean
  testimonioName: string
}

export function DeleteTestimonioDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
  testimonioName
}: DeleteTestimonioDialogProps) {
  const handleConfirm = async () => {
    try {
      await onConfirm()
      onOpenChange(false)
    } catch (error) {
      // El error ya se maneja en el hook
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            ¿Estás seguro de eliminar este testimonio?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. El testimonio de{" "}
            <strong>{testimonioName}</strong> será eliminado permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Cancelar
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Eliminar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}