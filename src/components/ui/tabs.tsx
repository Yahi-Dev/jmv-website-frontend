"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/src/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const [activeRect, setActiveRect] = React.useState<DOMRect | null>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        "relative bg-muted text-muted-foreground inline-flex h-9 w-full items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
      onFocusCapture={(e) => {
        const target = e.target as HTMLElement
        if (target.dataset.state === "active") {
          setActiveRect(target.getBoundingClientRect())
        }
      }}
    >
      {/* Indicador animado */}
      <AnimatePresence>
        {activeRect && (
          <motion.div
            layout
            className="absolute h-[calc(100%-6px)] rounded-md bg-background shadow-sm"
            initial={false}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{
              width: activeRect.width - 6,
              left: activeRect.left - listRef.current!.getBoundingClientRect().left + 3,
            }}
          />
        )}
      </AnimatePresence>

      {props.children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative z-10 inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-foreground transition-colors whitespace-nowrap data-[state=active]:text-primary focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
