import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Skeleton } from "@/src/components/ui/skeleton"

export function FormacionSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <Card key={`formacion-skeleton-${index}`} className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex gap-2 mb-2">
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-20 h-6" />
            </div>
            <Skeleton className="w-3/4 h-6 mb-2" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-4/5 h-4" />
          </CardHeader>
          <CardContent>
            <div className="mb-4 space-y-2">
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-2/3 h-3" />
            </div>
            <Skeleton className="w-full h-10" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}