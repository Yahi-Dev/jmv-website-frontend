// src/features/testimonios/components/testimonios-skeleton.tsx
import { Card, CardContent } from "@/src/components/ui/card"
import { Skeleton } from "@/src/components/ui/skeleton"

export function TestimoniosSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="border-0 shadow-lg">
          <CardContent className="pt-8 pb-6">
            <div className="flex justify-center mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, starIndex) => (
                  <Skeleton key={starIndex} className="w-5 h-5 rounded-sm" />
                ))}
              </div>
            </div>
            
            <div className="mb-6 space-y-3">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-4/5 h-4" />
              <Skeleton className="w-3/4 h-4" />
              <Skeleton className="w-2/3 h-4" />
            </div>
            
            <div className="space-y-2 text-center">
              <Skeleton className="w-32 h-5 mx-auto" />
              <Skeleton className="w-24 h-4 mx-auto" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}