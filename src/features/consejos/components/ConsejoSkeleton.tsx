// src/features/consejos/components/ConsejoSkeleton.tsx
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Skeleton } from "@/src/components/ui/skeleton"

export function ConsejoSkeleton() {
  return (
    <div className="container max-w-6xl px-4 py-16 mx-auto space-y-8">
      {/* Header Skeleton */}
      <div className="max-w-4xl mx-auto mb-12 space-y-4 text-center">
        <Skeleton className="w-48 h-6 mx-auto" />
        <Skeleton className="h-12 mx-auto w-96" />
        <Skeleton className="h-6 mx-auto w-80" />
      </div>

      {/* Tabs Skeleton */}
      <div className="flex justify-center mb-8">
        <Skeleton className="w-64 h-10" />
      </div>

      {/* Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Card key={`consejo-skeleton-${index}`} className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-3/4 h-5" />
                  <Skeleton className="w-1/2 h-4" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-4/5 h-4" />
              <Skeleton className="w-3/4 h-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}