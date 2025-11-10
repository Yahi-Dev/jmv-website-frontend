"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog"
import { Button } from "@/src/components/ui/button"
import { Loader2, AlertTriangle } from "lucide-react"

interface DeleteFormacionDialogProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
  readonly onConfirm: () => Promise<void>
  readonly isLoading?: boolean
  readonly formacionName: string
}

export function DeleteFormacionDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
  formacionName
}: DeleteFormacionDialogProps) {
  const handleConfirm = async () => {
    await onConfirm()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            ¿Estás seguro de eliminar esta formación?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. La formación{" "}
            <strong>{formacionName}</strong> será eliminada permanentemente.
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