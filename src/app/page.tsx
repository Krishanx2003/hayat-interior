"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Hero from "@/components/Hero"
import Contact from "@/components/Contact"

export default function Home() {
  interface IntroItem {
    id?: number
    heading: string
    description: string
    image_url?: string | null
  }

  interface EmotionItem {
    id?: number
    heading: string
    subheading: string
    description: string
    image_left?: string | null
    image_right?: string | null
  }

  interface LayersItem {
    id?: number
    heading: string
    tagline: string
    description: string
    list_items?: string | null
    image_top?: string | null
    image_bottom?: string | null
  }

  interface AboutItem {
    id?: number
    heading: string
    description_1: string
    description_2: string
    image_url?: string | null
  }

  interface LatestCreationItem {
    id?: number
    title: string
    comment: string
    image_url?: string | null
    alt_text: string
    sort_order?: number
  }

  const [introData, setIntroData] = useState<IntroItem[]>([])
  const [emotionData, setEmotionData] = useState<EmotionItem[]>([])
  const [layersData, setLayersData] = useState<LayersItem[]>([])
  const [aboutData, setAboutData] = useState<AboutItem[]>([])
  const [latestData, setLatestData] = useState<LatestCreationItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSections() {
      try {
        const [introRes, emotionRes, layersRes, aboutRes, latestRes] = await Promise.all([
          fetch("/api/intro-section"),
          fetch("/api/emotion-section"),
          fetch("/api/layers-section"),
          fetch("/api/about-section"),
          fetch("/api/latest-creations"),
        ])

        const introJson = await introRes.json()
        const emotionJson = await emotionRes.json()
        const layersJson = await layersRes.json()
        const aboutJson = await aboutRes.json()
        const latestJson = await latestRes.json()

        if (!introRes.ok) throw new Error(introJson.error || "Failed to load intro section")
        if (!emotionRes.ok) throw new Error(emotionJson.error || "Failed to load emotion section")
        if (!layersRes.ok) throw new Error(layersJson.error || "Failed to load layers section")
        if (!aboutRes.ok) throw new Error(aboutJson.error || "Failed to load about section")
        if (!latestRes.ok) throw new Error(latestJson.error || "Failed to load latest creations")

        setIntroData(introJson)
        setEmotionData(emotionJson)
        setLayersData(layersJson)
        setAboutData(aboutJson)
        setLatestData(latestJson)
      } catch (err) {
        console.error("❌ Error loading sections:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSections()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-foreground text-lg">Loading content...</div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />

        {/* Intro Section - Modern Clean Layout */}
        {introData.length > 0 && (
          <section aria-labelledby="intro-heading" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
            <div className="max-w-6xl mx-auto">
              <h2
                id="intro-heading"
                className="text-foreground font-sans text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-center mb-12 sm:mb-16"
              >
                {introData[0].heading}
              </h2>

              <div className="mb-12 sm:mb-16">
                <Image
                  src={introData[0].image_url || "/placeholder.svg?height=600&width=1200&query=interior design"}
                  alt="Intro image"
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                />
              </div>

              <p className="text-secondary text-center text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
                {introData[0].description}
              </p>
            </div>
          </section>
        )}

        {/* Emotion Section - Balanced Grid Layout */}
        {emotionData.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <h2 className="text-foreground font-sans text-3xl sm:text-4xl lg:text-4xl font-light tracking-tight mb-6">
                    {emotionData[0].heading}
                  </h2>
                  <p className="text-accent font-medium text-sm sm:text-base mb-6 uppercase tracking-wide">
                    {emotionData[0].subheading}
                  </p>
                  <p className="text-secondary text-base sm:text-lg leading-relaxed">{emotionData[0].description}</p>
                </div>

                <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 sm:gap-6">
                  <Image
                    src={
                      emotionData[0].image_left || "/placeholder.svg?height=400&width=300&query=interior design detail"
                    }
                    alt="Emotion left image"
                    height={400}
                    width={300}
                    className="w-full h-auto rounded-lg shadow-sm object-cover"
                  />
                  <Image
                    src={
                      emotionData[0].image_right || "/placeholder.svg?height=400&width=300&query=interior design space"
                    }
                    alt="Emotion right image"
                    height={400}
                    width={300}
                    className="w-full h-auto rounded-lg shadow-sm object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Layers Section - Modern Asymmetric Layout */}
        {layersData.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 bg-background">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="order-2 lg:order-1 relative h-96 sm:h-[500px] lg:h-[600px]">
                  <Image
                    src={
                      layersData[0].image_bottom ||
                      "/placeholder.svg?height=500&width=400&query=interior design texture"
                    }
                    alt="Layers bottom"
                    width={400}
                    height={500}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md opacity-70"
                  />
                  <Image
                    src={
                      layersData[0].image_top || "/placeholder.svg?height=500&width=400&query=interior design element"
                    }
                    alt="Layers top"
                    width={400}
                    height={500}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>

                <div className="order-1 lg:order-2">
                  <h2 className="text-foreground font-sans text-3xl sm:text-4xl lg:text-4xl font-light tracking-tight mb-4">
                    {layersData[0].heading}
                  </h2>
                  <p className="text-accent font-medium text-sm sm:text-base mb-6 uppercase tracking-wide">
                    {layersData[0].tagline}
                  </p>
                  <p className="text-secondary text-base sm:text-lg leading-relaxed mb-8">
                    {layersData[0].description}
                  </p>
                  {layersData[0].list_items && (
                    <ul className="space-y-3">
                      {layersData[0].list_items.split("\n").map((item: string, index: number) => (
                        <li key={index} className="text-foreground text-base flex items-start gap-3">
                          <span className="text-accent font-semibold mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* About Section - Full Width Image with Overlay Card */}
        {aboutData.length > 0 && (
          <section className="w-full py-16 sm:py-20 lg:py-28 bg-muted/30" aria-labelledby="about-heading">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative">
                <Image
                  src={aboutData[0].image_url || "/placeholder.svg?height=600&width=1200&query=interior design project"}
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-lg shadow-md object-cover"
                  alt="About image"
                />

                <div className="mt-8 sm:mt-12 bg-background rounded-lg shadow-md p-8 sm:p-12 lg:p-16">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-px bg-accent" />
                        <p className="text-accent font-medium text-sm uppercase tracking-wide">About Us</p>
                      </div>
                      <h2
                        id="about-heading"
                        className="text-foreground font-sans text-2xl sm:text-3xl lg:text-3xl font-light tracking-tight leading-snug"
                      >
                        {aboutData[0].heading}
                      </h2>
                    </div>
                    <div className="lg:col-span-2">
                      <p className="text-secondary text-base sm:text-lg leading-relaxed mb-6">
                        {aboutData[0].description_1}
                      </p>
                      <p className="text-secondary text-base sm:text-lg leading-relaxed">
                        {aboutData[0].description_2}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Latest Creations Section - Modern Grid Gallery */}
        {latestData.length > 0 && (
          <section className="w-full py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 sm:mb-20">
                <h2 className="text-foreground font-sans text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                  Our Latest Creations
                </h2>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <div className="w-12 h-px bg-accent" />
                  <p className="text-accent font-medium text-sm uppercase tracking-wide">Explore Our Work</p>
                  <div className="w-12 h-px bg-accent" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {latestData.map((card, index) => (
                  <div
                    key={card.id || index}
                    className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <Image
                      src={card.image_url || "/placeholder.svg?height=400&width=400&query=interior design project"}
                      alt={card.alt_text || card.title}
                      width={400}
                      height={400}
                      className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white font-medium text-lg mb-2">{card.title}</h3>
                      <p className="text-white/90 text-sm">{card.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Contact />
      </main>
    </div>
  )
}
