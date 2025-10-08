"use client"

import Image from "next/image"
import { Home, ChefHat, Building2, Wrench, Palette, Sofa } from "lucide-react"
import type { ReactNode } from "react"

type Service = {
  icon: ReactNode
  title: string
  description: string
  image: string
}

const services: Service[] = [
  {
    icon: <Home className="h-6 w-6" aria-hidden="true" />,
    title: "Home Interior Design",
    description: "Complete residential solutions, tailored to your lifestyle—from living to bedrooms.",
    image:
      "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
  },
  {
    icon: <ChefHat className="h-6 w-6" aria-hidden="true" />,
    title: "Modular Kitchen",
    description: "Smart storage, premium finishes, and ergonomic workflows for everyday living.",
    image:
      "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
  },
  {
    icon: <Building2 className="h-6 w-6" aria-hidden="true" />,
    title: "Office & Commercial",
    description: "Productive workspaces that elevate brand presence and well-being.",
    image:
      "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
  },
  {
    icon: <Wrench className="h-6 w-6" aria-hidden="true" />,
    title: "Turnkey Solutions",
    description: "End-to-end execution from concept to handover with a single point of contact.",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
  },
  {
    icon: <Palette className="h-6 w-6" aria-hidden="true" />,
    title: "Space Planning",
    description: "Optimized layouts for effortless flow, balance, and comfort.",
    image:
      "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
  },
  {
    icon: <Sofa className="h-6 w-6" aria-hidden="true" />,
    title: "Renovation Services",
    description: "Complete makeovers to rejuvenate your spaces with contemporary detail.",
    image:
      "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
  },
]

export default function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {services.map((s, idx) => (
        <article
          key={idx}
          className="group relative rounded-xl overflow-hidden bg-card border border-border hover:shadow-lg transition-shadow"
        >
          <div className="relative h-64 md:h-72">
            <Image
              src={s.image || "/placeholder.svg"}
              alt={s.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              priority={idx < 3}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-2 text-sm text-foreground border border-border shadow-sm">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground ring-1 ring-primary/30">
                {s.icon}
              </span>
              <span className="font-medium">{s.title}</span>
            </div>
          </div>

          <div className="p-5 md:p-6">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{s.description}</p>
          </div>

          {/* Slide-up panel inspired by the second service variant */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <div className="mx-4 mb-4 rounded-lg bg-card border border-border/70 shadow-sm p-4">
              <p className="text-sm text-muted-foreground">
                Discover materials, finishes, and tailored layouts crafted for your space.
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
