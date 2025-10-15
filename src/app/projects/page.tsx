"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Play, Pause, ArrowRight } from "lucide-react";

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
  title: string;
  description: string;
  heading?: string;
  list?: string;
  location: string;
  images: string[];
  reverse?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } gap-12 items-start mb-18`}
    >
      {/* Project Images */}
      <div className="w-full md:w-1/2 flex gap-4">
        {images.length === 3 ? (
          <>
            <div className="w-1/2 rounded-xl overflow-hidden group">
              <Image
                src={images[0]}
                alt={`${title} image 1`}
                width={400}
                height={500}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              <div className="rounded-xl overflow-hidden h-1/2 group">
                <Image
                  src={images[1]}
                  alt={`${title} image 2`}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-1/2 group">
                <Image
                  src={images[2]}
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
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden h-[250px] group"
                  >
                    <Image
                      src={img}
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
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden h-[250px] group"
                  >
                    <Image
                      src={img}
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

      {/* Project Details */}
      <div className="w-full md:w-1/2 py-16">
        <h2 className="text-[40px] md:text-[42px] font-semibold mb-4">
          {title}
        </h2>
        <p className="text-muted leading-relaxed mb-6">{description}</p>

        {heading && (
          <h3 className="text-[28px] md:text-[32px] font-semibold mb-4">
            {heading}
          </h3>
        )}

        {list && (
          <ul className="text-muted leading-relaxed mb-6 list-disc pl-5">
            {list.split("\n").map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-2 mb-8">
          <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="font-medium">{location}</span>
        </div>

        <Button
          variant="ghost"
          className="flex items-center gap-2 px-0 text-primary hover:bg-primary/90 hover:text-white transition"
        >
          View Project
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// ✅ Main Project Page Component
const Project = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying((prev) => !prev);
  };

  // ✅ Fetch projects from your API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch projects");

        setProjects(data.projects || []);
      } catch (err: any) {
        console.error("Error fetching projects:", err);
        setError(err.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="bg-background w-full min-h-screen relative">
      {/* Hero Section */}
      <section className="relative h-[520px] md:h-[620px]">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
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

      {/* Projects Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-[88px] py-16 md:py-24">
        {loading && <p className="text-center text-muted">Loading projects...</p>}
        {error && (
          <p className="text-center text-red-500">
            ❌ {error}
          </p>
        )}
        {!loading && !error && projects.length === 0 && (
          <p className="text-center text-muted">No projects found.</p>
        )}
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id || index}
            title={project.title}
            description={project.description}
            heading={project.heading}
            list={project.list}
            location={project.location}
            images={project.images || []}
            reverse={index % 2 !== 0}
          />
        ))}
      </section>
    </div>
  );
};

export default Project;
