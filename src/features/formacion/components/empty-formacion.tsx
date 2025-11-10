import { Button } from "@/src/components/ui/button"
import { Plus, BookOpen } from "lucide-react"

interface EmptyFormacionProps {
  readonly isLoggedIn: boolean
  readonly onAddClick: () => void
}

export function EmptyFormacion({ isLoggedIn, onAddClick }: EmptyFormacionProps) {
  return (
    <div className="py-16 text-center border-2 border-dashed rounded-lg border-muted-foreground/20 bg-muted/10">
      <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
      <h3 className="mb-2 text-2xl font-bold text-foreground">No hay formaciones aún</h3>
      <p className="max-w-md mx-auto mb-6 text-muted-foreground">
        Sé el primero en crear contenido formativo para la Juventud Mariana Vicenciana.
      </p>
      {isLoggedIn && (
        <Button onClick={onAddClick} className="text-white bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Crear la primera formación
        </Button>
      )}
    </div>
  )
}