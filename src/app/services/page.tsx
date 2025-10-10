"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image"; // Add this import
import { ChevronDown } from "lucide-react";

type ServiceCardProps = {
  image: string;
  alt: string;
  title: string;
  description: string;
};

const ServiceCard = ({ image, alt, title, description }: ServiceCardProps) => {
  return (
    <div className="overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0px_8px_30px_rgba(153,104,48,0.15)] transition-shadow duration-300 group relative h-[500px] bg-white">
      <div className="absolute inset-0 flex flex-col">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-white p-6 transition-all duration-700 ease-in-out opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
          <h3 className="font-bold text-[#18191f] text-2xl mb-3">
            {title}
          </h3>
          <p className="text-[#18191f] text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

type RenovationCardProps = {
  image: string;
  title: string;
  description: string;
  isActive: boolean;
};

const RenovationCard = ({ image, title, description, isActive }: RenovationCardProps) => {
  return (
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
                priority={false}
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 text-center md:text-left">
            <h3 className="text-[#996830] text-[34px] font-semibold tracking-wide mb-4 uppercase">
              {title}
            </h3>
            <p className="text-[#2c2c2c] text-[22px] leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isScrollingRef = useRef(false);

  const services = [
    {
      image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Living Room Design",
      title: "Living Room Design",
      description:
        "Transform your living space into a cozy and elegant retreat with our custom design solutions.",
    },
    {
      image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Modern Kitchen",
      title: "Modern Kitchen",
      description:
        "Create the perfect culinary space with contemporary designs that blend style and functionality.",
    },
    {
      image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Office Space",
      title: "Office Space",
      description:
        "Design productive work environments that inspire creativity and enhance business performance.",
    },
  ];

  const renovations = [
    {
      image: "https://images.pexels.com/photos/7534555/pexels-photo-7534555.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "3D Visualization",
      description:
        "Preview your future interiors with photorealistic 3D renders and walkthroughs that bring your vision to life.",
    },
    {
      image: "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Vastu Compliant Interiors",
      description:
        "Design interiors that harmonize aesthetics with positive energy flow and ancient wisdom.",
    },
    {
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Smart Home Interior",
      description:
        "Integrate cutting-edge technology seamlessly into your interiors for modern, removed connected living.",
    },
    {
      image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Furniture Design & Fittings",
      description:
        "Bespoke furniture pieces crafted with precision to fit your space and style perfectly.",
    },
    {
      image: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Modular Kitchen",
      description:
        "Efficient and stylish modular kitchens tailored to your cooking lifestyle and space requirements.",
    },
  ];

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

  return (
    <div className="bg-[#fffefa] min-h-screen">
      <section className="mx-auto px-4 md:px-16 lg:px-[88px] py-20">
        <div className="flex flex-col items-center gap-16 mb-20">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-black text-4xl md:text-6xl lg:text-[72px] leading-tight text-center font-light">
              Our Interior Design Services
            </h1>
            <p className="text-[#18191f] text-lg md:text-2xl lg:text-[28px] leading-relaxed text-center max-w-3xl">
              From cozy homes to smart commercial spaces — we design it all
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>

      <section className="px-4 md:px-16 lg:px-[88px] py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-[#2c2c2c] text-4xl md:text-5xl lg:text-[56px] font-light tracking-wide mb-4">
            Renovation & Space Makeover
          </h2>
          <p className="text-[#666] text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Whether it's a single room or your whole home, we redesign with a
            modern, aesthetic, and super-functional approach.
          </p>
        </div>

        <div
          ref={scrollContainerRef}
          className="relative overflow-hidden h-[500px] md:h-[550px]"
        >
          <div
            className="flex flex-col transition-transform duration-700 ease-out"
            style={{ transform: `translateY(-${activeIndex * 550}px)` }}
          >
            {renovations.map((renovation, index) => (
              <div key={index} className="h-[550px] flex justify-center items-center w-full">
                <RenovationCard
                  {...renovation}
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
      </section>
    </div>
  );
}

export default App;