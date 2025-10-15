"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";

export default function Home() {
  const [introData, setIntroData] = useState<any[]>([]);
  const [emotionData, setEmotionData] = useState<any[]>([]);
  const [layersData, setLayersData] = useState<any[]>([]);
  const [aboutData, setAboutData] = useState<any[]>([]);
  const [latestData, setLatestData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSections() {
      try {
        const [introRes, emotionRes, layersRes, aboutRes, latestRes] = await Promise.all([
          fetch("/api/intro-section"),
          fetch("/api/emotion-section"),
          fetch("/api/layers-section"),
          fetch("/api/about-section"), // ✅ Added
          fetch("/api/latest-creations"),
        ]);

        const introJson = await introRes.json();
        const emotionJson = await emotionRes.json();
        const layersJson = await layersRes.json();
        const aboutJson = await aboutRes.json(); // ✅ Added
        const latestJson = await latestRes.json();

        if (!introRes.ok) throw new Error(introJson.error || "Failed to load intro section");
        if (!emotionRes.ok) throw new Error(emotionJson.error || "Failed to load emotion section");
        if (!layersRes.ok) throw new Error(layersJson.error || "Failed to load layers section");
        if (!aboutRes.ok) throw new Error(aboutJson.error || "Failed to load about section"); // ✅ Added
        if (!latestRes.ok) throw new Error(latestJson.error || "Failed to load latest creations");

        setIntroData(introJson);
        setEmotionData(emotionJson);
        setLayersData(layersJson);
        setAboutData(aboutJson); // ✅ Added
        setLatestData(latestJson);
      } catch (err) {
        console.error("❌ Error loading sections:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSections();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-[var(--neutral-700)] text-lg">
        Loading content...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main>
        <Hero />

        {/* Intro Section */}
        {introData.length > 0 && (
          <section aria-labelledby="intro-heading" className="px-4 sm:px-8 md:px-28 py-20 text-center">
            <h2 className="text-[var(--neutral-700)] font-serif text-[36px] sm:text-[48px] md:text-[55px] font-semibold">
              {introData[0].heading}
            </h2>
            <Image
              src={introData[0].image_url || "/Images/image1.jpg"}
              alt="Intro image"
              width={1300}
              height={900}
              className="mt-8 mx-auto rounded-xl shadow-md"
            />
            <p className="text-[var(--neutral-600)] text-[18px] sm:text-[20px] md:text-[22px] mt-6 leading-relaxed">
              {introData[0].description}
            </p>
          </section>
        )}

        {/* Emotion Section */}
        {emotionData.length > 0 && (
          <section className="flex flex-col lg:flex-row justify-center items-center px-4 py-16 gap-8">
            <div className="py-8 md:py-16 max-w-xl">
              <h2 className="text-[var(--neutral-900)] font-serif text-[32px] sm:text-[42px] md:text-[48px] font-semibold mb-6">
                {emotionData[0].heading}
              </h2>
              <h3 className="text-[var(--brand-gold)] font-semibold mb-4">{emotionData[0].subheading}</h3>
              <p className="text-[var(--neutral-600)] text-[16px] leading-relaxed">{emotionData[0].description}</p>
            </div>
            <div className="flex gap-6">
              <Image
                src={emotionData[0].image_left || "/Images/image1.jpg"}
                alt="Emotion left image"
                height={700}
                width={300}
                className="rounded-xl shadow"
              />
              <Image
                src={emotionData[0].image_right || "/Images/variant1.jpg"}
                alt="Emotion right image"
                height={700}
                width={300}
                className="rounded-xl shadow"
              />
            </div>
          </section>
        )}

        {/* Layers Section */}
        {layersData.length > 0 && (
          <section className="relative py-20 px-4 sm:px-8 md:px-28 flex flex-col lg:flex-row items-center justify-between gap-12 bg-[var(--bg-cream)]">
            <div className="relative flex-shrink-0">
              <Image
                src={layersData[0].image_bottom || "/Images/image2.jpg"}
                alt="Layers bottom"
                width={350}
                height={350}
                className="absolute top-16 mt-48 left-0 opacity-80"
              />
              <Image
                src={layersData[0].image_top || "/Images/variant2.jpg"}
                alt="Layers top"
                width={350}
                height={350}
                className="relative z-10 ml-8 lg:ml-24"
              />
            </div>
            <div className="max-w-xl mt-12 lg:mt-48">
              <h2 className="text-[var(--neutral-900)] font-serif text-[32px] sm:text-[38px] md:text-[42px] font-semibold mb-4">
                {layersData[0].heading}
              </h2>
              <h3 className="text-[var(--brand-gold)] text-base md:text-lg font-semibold mb-6">
                {layersData[0].tagline}
              </h3>
              <p className="text-[var(--neutral-600)] text-[16px] md:text-[18px] leading-relaxed mb-6">
                {layersData[0].description}
              </p>
              {layersData[0].list_items && (
                <ul className="text-[var(--neutral-700)] text-[16px] space-y-2">
                  {layersData[0].list_items.split("\n").map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* About Section */}
        {aboutData.length > 0 && (
          <section className="w-full bg-[var(--bg-cream)] py-20 relative" aria-labelledby="about-heading">
            <div className="relative w-full flex justify-center items-center mt-10">
              <Image
                src={aboutData[0].image_url || "/Images/project4.jpg"}
                width={1510}
                height={700}
                className="w-[1510px] h-[300px] md:h-[700px] object-cover shadow-lg rounded-xl"
                alt="About image"
              />
              <div className="absolute -bottom-40 md:-bottom-44 bg-white w-[92%] md:w-[1300px] flex flex-col lg:flex-row justify-between px-6 sm:px-10 md:px-16 py-10 md:py-14 shadow-lg rounded-xl">
                <div className="w-full lg:w-[35%] relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-[2px] bg-[var(--brand-gold)]" />
                    <p className="text-[var(--brand-gold)] font-sans text-lg md:text-xl">About Us</p>
                  </div>
                  <h2 className="text-[var(--neutral-900)] font-serif text-[32px] sm:text-[38px] md:text-[42px] font-bold leading-snug mb-8 md:mb-10">
                    {aboutData[0].heading}
                  </h2>
                </div>
                <div className="w-full lg:w-[60%] mt-6 lg:mt-0">
                  <p className="text-[var(--neutral-600)] text-[16px] md:text-[17px] leading-relaxed mb-4">
                    {aboutData[0].description_1}
                  </p>
                  <p className="text-[var(--neutral-600)] text-[16px] md:text-[17px] leading-relaxed">
                    {aboutData[0].description_2}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Latest Creations Section */}
        {latestData.length > 0 && (
          <section className="w-full bg-[var(--bg-cream)] py-24 px-4 sm:px-10">
            <div className="max-w-[1300px] mx-auto text-center">
              <div className="flex items-center justify-center mb-10 md:mb-12">
                <span className="w-16 h-[2px] bg-[var(--brand-gold)] mr-4" />
                <h2 className="text-[var(--neutral-900)] font-serif text-[32px] sm:text-[38px] md:text-[42px] font-semibold">
                  Our Latest Creations
                </h2>
                <span className="w-16 h-[2px] bg-[var(--brand-gold)] ml-4" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {latestData.map((card, index) => (
                  <div
                    key={card.id || index}
                    className="relative overflow-hidden rounded-xl shadow-md group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl"
                  >
                    <Image
                      src={card.image_url || "/Images/placeholder.svg"}
                      alt={card.alt_text || card.title}
                      width={600}
                      height={600}
                      className="w-full h-[280px] md:h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-6 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 px-2">
                      <div className="relative bg-white/95 backdrop-blur text-[var(--neutral-900)] text-sm font-medium px-4 py-3 rounded-lg shadow-lg w-full max-w-[260px]">
                        <div className="font-semibold mb-1 text-[15px]">{card.title}</div>
                        <div className="text-[var(--neutral-700)]">{card.comment}</div>
                        <div className="absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
                      </div>
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
  );
}
