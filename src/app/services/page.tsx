import { Suspense } from "react"
import RenovationScroller from "./_components/renovation-scroller"
import ServicesGrid from "./_components/services-grid"


export default function ServicesPage() {
  return (
    <main className="bg-background text-foreground">
      <header className="container mx-auto px-4 md:px-8 pt-16 md:pt-20 pb-8 md:pb-12">
        <div className="max-w-3xl">
          <span className="inline-block text-sm md:text-base font-medium tracking-wide text-primary mb-3">
            Our Expertise
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Interior design services that blend aesthetics, function, and timeless craftsmanship
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            From residences to refined workspaces, we craft elevated interiors with thoughtful space planning, premium
            materials, and meticulous execution.
          </p>
        </div>
      </header>

      <section aria-labelledby="services-heading" className="container mx-auto px-4 md:px-8 pb-16 md:pb-24">
        <h2 id="services-heading" className="sr-only">
          Service categories
        </h2>
        <Suspense fallback={<div className="text-muted-foreground">Loading services…</div>}>
          <ServicesGrid />
        </Suspense>
      </section>

      <section aria-labelledby="renovation-heading" className="bg-card border-t border-border">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="text-center mb-10 md:mb-14">
            <h2 id="renovation-heading" className="text-2xl md:text-4xl font-semibold tracking-tight">
              Renovation & Space Makeover
            </h2>
            <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Whether it&apos;s a single room or your entire home, we redesign with a modern, luxurious, and highly
              functional approach.
            </p>
          </div>

          <Suspense fallback={<div className="text-muted-foreground">Loading showcase…</div>}>
            <RenovationScroller />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
