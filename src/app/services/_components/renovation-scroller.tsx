"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"

type Card = {
  image: string
  title: string
  description: string
}

const items: Card[] = [
  {
    image:  "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    title: "3D Visualization",
    description: "Preview your future interiors with photorealistic renders and immersive walkthroughs.",
  },
  {
    image: "https://i.pinimg.com/736x/5f/cb/cd/5fcbcd3e342da653481e5c330a12b117.jpg",
    title: "Vastu Compliant Interiors",
    description: "Design in harmony with positive energy flow while maintaining modern aesthetics.",
  },
  {
    image: "https://i.pinimg.com/736x/5f/cb/cd/5fcbcd3e342da653481e5c330a12b117.jpg",
    title: "Smart Home Interior",
    description: "Integrate discreet technology for comfort, security, and effortless control.",
  },
  {
    image: "https://i.pinimg.com/736x/5f/cb/cd/5fcbcd3e342da653481e5c330a12b117.jpg",
    title: "Furniture & Fittings",
    description: "Bespoke furniture tailored to your proportions, materials, and lifestyle.",
  },
  {
    image: "https://i.pinimg.com/736x/5f/cb/cd/5fcbcd3e342da653481e5c330a12b117.jpg",
    title: "Modular Kitchen",
    description: "Efficient layouts, durable finishes, and refined detailing for daily ease.",
  },
]

export default function RenovationScroller() {
  const [active, setActive] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isScrollingRef = useRef(false)

  // Wheel navigation inspired by provided variant, with passive: false
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isScrollingRef.current) return
      isScrollingRef.current = true

      if (e.deltaY > 0 && active < items.length - 1) {
        setActive((p) => p + 1)
      } else if (e.deltaY < 0 && active > 0) {
        setActive((p) => p - 1)
      }

      setTimeout(() => {
        isScrollingRef.current = false
      }, 500)
    }

    const el = containerRef.current
    if (el) el.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      if (el) el.removeEventListener("wheel", onWheel)
    }
  }, [active])

  // Keyboard navigation for accessibility
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && active < items.length - 1) {
        setActive((p) => p + 1)
      } else if (e.key === "ArrowUp" && active > 0) {
        setActive((p) => p - 1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active])

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative overflow-hidden h-[480px] rounded-xl border border-border bg-card"
        aria-live="polite"
      >
        <div
          className="transition-transform duration-500 ease-out"
          style={{ transform: `translateY(-${active * 520}px)` }}
        >
          {items.map((c, i) => (
            <section
              key={i}
              className="h-[520px] flex flex-col md:flex-row items-center justify-between gap-6 p-4 md:p-6"
              aria-hidden={i !== active}
            >
              <div className="w-full md:w-1/2">
                <div className="overflow-hidden rounded-lg border border-border">
                  <Image
                    src={c.image || "/placeholder.svg"}
                    alt={c.title}
                    width={900}
                    height={450}
                    className="w-full h-[260px] md:h-[360px] object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 md:pl-4">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-primary uppercase">{c.title}</h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">{c.description}</p>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Previous item"
        >
          <ChevronUp className="h-4 w-4" aria-hidden="true" />
          Prev
        </button>
        <div className="text-sm text-muted-foreground">
          {active + 1} / {items.length}
        </div>
        <button
          type="button"
          onClick={() => setActive((a) => Math.min(items.length - 1, a + 1))}
          className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Next item"
        >
          Next
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
