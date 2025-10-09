"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Play, Pause, ArrowRight } from "lucide-react"



// ✅ ProjectCard Component
const ProjectCard = ({
  title,
  description,
  heading,
  list,
  location,
  images,
  reverse = false,
}: {
  title: string
  description: string
  heading?: string
  list?: string
  location: string
  images: string[]
  reverse?: boolean
}) => {
  return (
    <div className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} gap-12 items-start mb-18`}>
      <div className="w-full md:w-1/2 flex gap-4">
        {images.length === 3 ? (
          <>
            <div className="w-1/2 rounded-xl overflow-hidden group">
              <Image
                src={images[0] || "/placeholder.svg?height=500&width=400&query=project-image"}
                alt={`${title} image 1`}
                width={400}
                height={500}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              <div className="rounded-xl overflow-hidden h-1/2 group">
                <Image
                  src={images[1] || "/placeholder.svg?height=250&width=400&query=project-image"}
                  alt={`${title} image 2`}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-1/2 group">
                <Image
                  src={images[2] || "/placeholder.svg?height=250&width=400&query=project-image"}
                  alt={`${title} image 3`}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 w-1/3">
              {images
                .filter((_, i) => i % 2 === 0)
                .map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden h-[250px] group">
                    <Image
                      src={img || "/placeholder.svg?height=250&width=200&query=project-image"}
                      alt={`${title} image ${idx + 1}`}
                      width={200}
                      height={250}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ))}
            </div>
            <div className="flex flex-col gap-2 w-2/3">
              {images
                .filter((_, i) => i % 2 !== 0)
                .map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden h-[250px] group">
                    <Image
                      src={img || "/placeholder.svg?height=250&width=400&query=project-image"}
                      alt={`${title} image ${idx + 1}`}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>

      <div className="w-full md:w-1/2 py-16">
        <h2 className="font-sans text-foreground text-[40px] md:text-[42px] font-semibold leading-tight mb-4 text-balance">
          {title}
        </h2>
        <p className="font-sans text-foreground text-muted leading-relaxed mb-6">{description}</p>

        {heading && (
          <h3 className="font-sans text-foreground text-[28px] md:text-[32px] font-semibold leading-tight mb-4">
            {heading}
          </h3>
        )}

        {list && (
          <ul className="font-sans text-muted leading-relaxed mb-6 list-disc pl-5">
            {list.split("\n").map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-2 mb-8">
          <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="font-sans text-foreground font-medium">{location}</span>
        </div>

        <Button
          variant="ghost"
          className="font-sans text-primary hover:text-primary-foreground hover:bg-primary/90 transition flex items-center gap-2 px-0"
        >
          View Project
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}

// ✅ Main Project Page Component
const Project = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const toggleVideo = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying((prev) => !prev)
  }

  const projects = [
    {
      title: "The Mehta Residence",
      description:
        "A warm, modern living space crafted for a young professional couple. The Mehta Residence showcases a balance of comfort and contemporary elegance. We designed the entire home interior, including a modular kitchen, custom furniture, and soft decor elements. The design theme focused on subtle wooden textures, neutral color palettes, and open, airy layouts.",
      location: "Gurgaon - 3BHK Apartment",
      images: [
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg", 
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
      ],
    },
    {
      title: "Greenleaf Office Renovation",
      description:
        "Greenleaf, a fast-growing eco-consulting firm, approached us with a clear vision — to create a modern, vibrant and sustainable workspace that inspires productivity and well-being. Their old office was dull and overly corporate. Our goal was to reimagine it into a biophilic-inspired environment with minimal waste and maximum creative energy.",
      location: "Noida | 🌿 2500 sq ft. Workspace",
      images: [
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg", 
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
      ],
    },
    {
      title: "The Kapoor Villa",
      description:
        "The Kapoor family wanted their new bungalow to reflect timeless elegance and modern sophistication—with every corner speaking of luxury, comfort, and personality. Our challenge was to balance opulence with warmth creating a space that feels both grand and inviting. The result? A bespoke villa experience that merges architectural finesse with handcrafted interior design.",
      heading: "✨ Design Highlights :",
      list: "Double-height foyer with a crystal chandelier and gold accents\nA sunken seating area in the living room, designed for elite entertaining\nWalk-in wardrobe with island dresser in the master suite\nIndoor-outdoor transition in dining space via sliding glass walls\nSmart home integration: lighting, blinds, and climate control",
      location: "📍Noida | 🧱 2500 sq. ft. Workspace",
      images: [
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg", 
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
      ],
    },
    // ✅ Mehta Residence 2 (3-image layout)
    {
      title: "The Mehta Residence",
      description:
        "A warm, modern living space crafted for a young professional couple, the Mehta Residence showcases a perfect blend of functionality and elegance. Our team designed the entire home interior, including a modular kitchen, custom furniture, and soft decor elements. The design theme focused on subtle wooden textures, neutral color palettes, and open, clutter-free layouts.",
      location: "📍Gurgaon – 3BHK Apartment",
      images: [
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg", 
        "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
      ],
    },
  ]

  return (
    <div className="bg-background w-full min-h-screen relative">
      <section className="relative h-[520px] md:h-[620px]">
        {/* <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/Images/project-video.mp4"
          autoPlay
          muted
          loop
          aria-label="Featured interior project highlights"
        /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground text-balance">
            Our Featured Projects
          </h1>
          <p className="mt-4 max-w-2xl text-muted leading-relaxed">
            Thoughtfully crafted spaces that balance function and beauty.
          </p>
        </div>

        <div className="absolute bottom-6 right-6">
          <Button
            aria-label={isPlaying ? "Pause background video" : "Play background video"}
            className="size-14 md:size-16 rounded-full bg-white/70 hover:bg-white text-foreground backdrop-blur border border-border flex items-center justify-center"
            onClick={toggleVideo}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
        </div>
      </section>

      <section className="max-w-[1240px] md:max-w-[1400px] mx-auto px-6 md:px-12 lg:px-[88px] py-16 md:py-24">
       

        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            heading={project.heading}
            list={project.list}
            location={project.location}
            images={project.images}
            reverse={index % 2 !== 0}
          />
        ))}
      </section>

      <section className="py-6">
        <div className="max-w-[1400px] mx-auto px-6 md:px-[88px] text-center">
          <Button className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition">
            View All Projects
          </Button>
        </div>
      </section>

      <section className="w-full py-16 overflow-hidden bg-background">
        <div className="relative">
          <div className="flex gap-6 marquee-track">
            {/* track A */}
            <div className="flex gap-6 min-w-max">
              {[
                  "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
                  "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
                  "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
              ].map((src, i) => (
                <div
                  key={`a-${i}`}
                  className="w-[360px] md:w-[400px] h-[260px] md:h-[300px] bg-card rounded-xl overflow-hidden border border-border shadow-[0_6px_24px_rgba(0,0,0,0.06)] flex-shrink-0 group"
                >
                  <Image
                   src={ "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg"}
                    alt={`Interior ${i + 1}`}
                    height={300}
                    width={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
              ))}
            </div>
            {/* track B (duplicate for seamless loop) */}
            <div className="flex gap-6 min-w-max" aria-hidden="true">
              {[
                "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
                "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
                "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg",
             
              ].map((src, i) => (
                <div
                  key={`b-${i}`}
                  className="w-[360px] md:w-[400px] h-[260px] md:h-[300px] bg-card rounded-xl overflow-hidden border border-border shadow-[0_6px_24px_rgba(0,0,0,0.06)] flex-shrink-0 group"
                >
                  <Image
                    src={ "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg"}
                    alt={`Interior alt ${i + 1}`}
                    height={300}
                    width={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Project
