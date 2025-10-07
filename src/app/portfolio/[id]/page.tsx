import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppClick from "@/components/WhatsAppClick"
import { MapPin, Calendar, Square, Clock, ArrowLeft } from "lucide-react"
import { projects } from "@/lib/portfolio-data"
import Image from "next/image"

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) return notFound()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-2">
        {/* Hero */}
        <section className="relative h-[360px] sm:h-[420px] overflow-hidden">
          <Image
            width={1000}
            height={1000}
            src={project.images[0] || "/placeholder.svg"}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
          <div className="absolute inset-0">
            <div className="container mx-auto px-4 h-full flex items-end pb-8">
              <div>
                <Button asChild variant="outline" className="mb-4 bg-white/70 dark:bg-background/50 backdrop-blur">
                  <Link href="/portfolio">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
                  </Link>
                </Button>
                <h1 className="text-3xl md:text-5xl font-semibold text-foreground">{project.title}</h1>
                <p className="mt-2 text-foreground/80 max-w-2xl">{project.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Meta cards */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border bg-card p-5 text-center">
                <MapPin className="mx-auto mb-2 h-7 w-7" aria-hidden="true" />
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-medium">{project.location}</div>
              </div>
              <div className="rounded-lg border bg-card p-5 text-center">
                <Square className="mx-auto mb-2 h-7 w-7" aria-hidden="true" />
                <div className="text-sm text-muted-foreground">Area</div>
                <div className="font-medium">{project.area}</div>
              </div>
              <div className="rounded-lg border bg-card p-5 text-center">
                <Clock className="mx-auto mb-2 h-7 w-7" aria-hidden="true" />
                <div className="text-sm text-muted-foreground">Duration</div>
                <div className="font-medium">{project.duration}</div>
              </div>
              <div className="rounded-lg border bg-card p-5 text-center">
                <Calendar className="mx-auto mb-2 h-7 w-7" aria-hidden="true" />
                <div className="text-sm text-muted-foreground">Budget</div>
                <div className="font-medium">{project.budget}</div>
              </div>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-3">
              {/* Overview */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">{project.fullDescription}</p>

                <h3 className="text-xl md:text-2xl font-semibold mb-2">Challenge</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{project.challenges}</p>

                <h3 className="text-xl md:text-2xl font-semibold mb-2">Our Solution</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{project.solution}</p>

                <h3 className="text-xl md:text-2xl font-semibold mb-3">Key Features</h3>
                <ul className="space-y-3">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-2 h-2 w-2 rounded-full bg-foreground/60" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sidebar */}
              <aside className="lg:sticky lg:top-24 h-fit">
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm text-muted-foreground">Client</dt>
                      <dd className="font-medium">{project.client}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Year</dt>
                      <dd className="font-medium">{project.year}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Category</dt>
                      <dd className="font-medium capitalize">{project.category}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 flex flex-col gap-3">
                    <WhatsAppClick
                      className="bg-foreground text-background hover:opacity-90"
                      message={`Hello, I'm interested in a similar design to the ${project.title} project by Elite Interiors.`}
                    />
                    <Button asChild variant="outline">
                      <Link href="/contact">Get Free Consultation</Link>
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="pb-14">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Project Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.images.slice(1).map((src, i) => (
                <div key={i} className="aspect-video overflow-hidden rounded-lg">
                  <Image
                    width={1000}
                    height={1000}
                    src={src || "/placeholder.svg"}
                    alt={`${project.title} - Image ${i + 2}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 border-t bg-accent/20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold mb-3">Love This Design?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Get a similar design for your space. Our experts are ready to help you create your dream interior.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <WhatsAppClick
                className="bg-foreground text-background hover:opacity-90"
                message={`Hello, I'm inspired by the ${project.title} project by Elite Interiors. Can we discuss a similar design?`}
              />
              <Button asChild variant="outline">
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
