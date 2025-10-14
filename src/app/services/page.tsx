"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

type Service = {
  id: string;
  image_url: string;
  alt: string;
  title: string;
  description: string;
};

type Renovation = {
  id: string;
  image_url: string;
  title: string;
  description: string;
};

type ServiceCardProps = {
  image: string;
  alt: string;
  title: string;
  description: string;
};

const ServiceCard = ({ image, alt, title, description }: ServiceCardProps) => (
  <div className="overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0px_8px_30px_rgba(153,104,48,0.15)] transition-shadow duration-300 group relative h-[500px] bg-white">
    <div className="absolute inset-0 flex flex-col">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-white p-6 transition-all duration-700 ease-in-out opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
        <h3 className="font-bold text-[#18191f] text-2xl mb-3">{title}</h3>
        <p className="text-[#18191f] text-base leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const RenovationCard = ({
  image,
  title,
  description,
  isActive,
}: {
  image: string;
  title: string;
  description: string;
  isActive: boolean;
}) => (
  <div
    className={`transition-all duration-700 ${
      isActive ? "opacity-100 scale-100" : "opacity-50 scale-95"
    }`}
  >
    <div className="max-w-[900px] mx-auto bg-white overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 p-8">
          <div className="overflow-hidden shadow-lg rounded-lg relative h-[400px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 text-center md:text-left">
          <h3 className="text-[#996830] text-[34px] font-semibold tracking-wide mb-4 uppercase">
            {title}
          </h3>
          <p className="text-[#2c2c2c] text-[22px] leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function ServicesRenovations() {
  const [services, setServices] = useState<Service[]>([]);
  const [renovations, setRenovations] = useState<Renovation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isScrollingRef = useRef(false);

  // ✅ Fetch from API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/services", { method: "GET" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch data");

        setServices(data.services || []);
        setRenovations(data.renovations || []);
      } catch (error) {
        console.error("❌ Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 🎡 Renovation scroll wheel navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      if (e.deltaY > 0 && activeIndex < renovations.length - 1) {
        setActiveIndex((prev) => prev + 1);
      } else if (e.deltaY < 0 && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 700);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [activeIndex, renovations.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading services...
      </div>
    );
  }

  return (
    <div className="bg-[#fffefa] min-h-screen">
      {/* Services Section */}
      <section className="mx-auto px-4 md:px-16 lg:px-[88px] py-20">
        <div className="flex flex-col items-center gap-16 mb-20">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-black text-4xl md:text-6xl lg:text-[72px] leading-tight text-center font-light">
              Our Interior Design Services
            </h1>
            <p className="text-[#18191f] text-lg md:text-2xl lg:text-[28px] leading-relaxed text-center max-w-3xl">
              From cozy homes to smart commercial spaces &mdash; we design it all
            </p>
          </div>
        </div>

        {services.length === 0 ? (
          <p className="text-center text-gray-500">No services available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                image={service.image_url}
                alt={service.alt || service.title}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        )}
      </section>

      {/* Renovations Section */}
      <section className="px-4 md:px-16 lg:px-[88px] py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-[#2c2c2c] text-4xl md:text-5xl lg:text-[56px] font-light tracking-wide mb-4">
            Renovation & Space Makeover
          </h2>
          <p className="text-[#666] text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Whether it&apos;s a single room or your whole home, we redesign with a
            modern, aesthetic, and super-functional approach.
          </p>
        </div>

        {renovations.length === 0 ? (
          <p className="text-center text-gray-500">No renovations uploaded yet.</p>
        ) : (
          <>
            <div
              ref={scrollContainerRef}
              className="relative overflow-hidden h-[500px] md:h-[550px]"
            >
              <div
                className="flex flex-col transition-transform duration-700 ease-out"
                style={{ transform: `translateY(-${activeIndex * 550}px)` }}
              >
                {renovations.map((renovation, index) => (
                  <div
                    key={renovation.id}
                    className="h-[550px] flex justify-center items-center w-full"
                  >
                    <RenovationCard
                      image={renovation.image_url}
                      title={renovation.title}
                      description={renovation.description}
                      isActive={index === activeIndex}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              {renovations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-[#996830] w-8"
                      : "bg-[#d4c5b5] hover:bg-[#b8a28e]"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="text-center mt-6">
              <span className="text-[#666] text-lg">
                {activeIndex + 1} of {renovations.length}
              </span>
            </div>

            <div className="flex justify-center mt-6">
              <ChevronDown className="text-[#996830] animate-bounce" size={32} />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
