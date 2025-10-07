"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"
import Image from "next/image"
import WhatsAppClick from "@/components/WhatsAppClick"
import { categories, projects } from "@/lib/portfolio-data"

export default function PortfolioPage() {
  const [active, setActive] = useState<(typeof categories)[number]["id"]>("all")

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 pt-8 pb-16">
        {/* Heading */}
        <section className="mb-8">
          <h1 className="text-pretty text-3xl md:text-4xl font-semibold">Our Portfolio</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Explore our recent interior design projects across Delhi NCR.
          </p>
        </section>

        {/* Category filter as segmented control */}
        <div role="tablist" aria-label="Project categories" className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => {
            const isActive = c.id === active
            return (
              <Button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                variant={isActive ? "default" : "outline"}
                onClick={() => setActive(c.id)}
                className="h-9"
              >
                {c.name}
              </Button>
            )
          })}
        </div>

        {/* Projects grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/portfolio/${p.id}`}
              className="group focus:outline-none focus:ring-2 focus:ring-ring rounded-lg"
            >
              <Card className="overflow-hidden transition hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    width={1000}
                    height={1000}
                    src={p.images[0] || "/placeholder.svg"}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-semibold text-balance">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      <span>{p.location}</span>
                    </div>
                    <span className="font-medium">{p.budget}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-3">
          <Button asChild className="group">
            <Link href="/portfolio">
              View Full Portfolio
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <WhatsAppClick
            className="bg-foreground text-background hover:opacity-90"
            message="Hello, I'm interested in exploring your portfolio with Elite Interiors. Can we discuss your projects?"
          />
        </div>
      </main>

    </div>
  )
}
