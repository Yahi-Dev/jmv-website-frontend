// src/components/ui/star-rating.tsx
"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
}

export function StarRating({ 
  rating, 
  onRatingChange, 
  readonly = false,
  size = "md" 
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value)
    }
  }

  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      setHoverRating(value)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0)
    }
  }

  const displayRating = hoverRating || rating

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "p-0 hover:bg-transparent",
            readonly && "cursor-default"
          )}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
        >
          <Star
            className={cn(
              sizeClasses[size],
              star <= displayRating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300",
              "transition-colors duration-200"
            )}
          />
        </Button>
      ))}
    </div>
  )
}