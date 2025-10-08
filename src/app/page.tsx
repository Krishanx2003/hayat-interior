import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import Image from 'next/image';
import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />

        {/* Section 2 */}
        <section>
          <div className="px-4 sm:px-8 md:px-28 py-20">
            <h2 className="text-[#444444] font-['Playfair_Display'] text-[40px] sm:text-[55px] text-center">
              We Create Unique <br /> Designs That Reflect You.
            </h2>
            <Image
              src="/Images/section2.png"
              alt="Unique Interior Design Concepts"
              className="mt-8 mx-auto"
              width={1300}
              height={1300}
              priority
            />
            <p className="text-[#444444] font-['Urbanist'] text-[20px] sm:text-[28px] mt-6 px-2 py-2 text-center">
              At <strong>Hayat Interior</strong>, every design begins with a story—yours. 
              We blend creativity, functionality, and craftsmanship to create interiors 
              that inspire and feel timeless. Our collaborative process ensures that your 
              dream space becomes a stunning reality.
            </p>
          </div>
        </section>

        {/* Section 3 - Projects */}
        <section className="w-full py-24 bg-[#fefcf8]">
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6">
            {/* Left Feature Project */}
            <div>
              <p className="uppercase text-[#b88b4a] tracking-widest mb-4 font-semibold">
                Signature Projects
              </p>
              <h2 className="text-[#2d2d2d] font-['Playfair_Display'] text-[36px] sm:text-[48px] font-semibold leading-snug mb-8">
                Crafting Spaces <br /> With Heart & Precision
              </h2>
              <div className="relative w-full h-[480px] overflow-hidden shadow-lg group">
                <Image
                  src="/Images/image1.png"
                  alt="Villa Furnishing & Interior"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:-translate-y-full"
                />
                <Image
                  src="/Images/variant1.png"
                  alt="Villa Furnishing & Interior Hover"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover absolute top-full left-0 transition-transform duration-700 ease-in-out group-hover:-translate-y-full"
                />
              </div>
              <h3 className="text-[#2d2d2d] text-[22px] font-semibold mt-6">
                Villa Furnishing & Interior
              </h3>
              <p className="text-[#555] text-[16px] mt-2 leading-relaxed">
                A luxurious transformation blending modern elegance with serene functionality. 
                Every corner is designed to balance beauty and purpose, turning daily living into an art form.
              </p>
              <button className="mt-8 bg-[#9e7b47] hover:bg-[#83673b] text-white px-6 py-3 rounded-md text-sm uppercase tracking-wide transition">
                Contact Us →
              </button>
            </div>

            {/* Right Project List */}
            <div className="flex flex-col gap-10">
              {[
                {
                  src: "/Images/image2.png",
                  variant: "/Images/variant2.png",
                  alt: "Luxury Hotel Renovation",
                  title: "Luxury Hotel Renovation",
                  desc: "An opulent redesign where sophistication meets comfort, redefining guest experiences with immersive spatial storytelling.",
                },
                {
                  src: "/Images/image3.png",
                  variant: "/Images/variant3.png",
                  alt: "Residence Swimming Pool",
                  title: "Residence Swimming Pool",
                  desc: "A sleek and serene pool area that merges natural textures with modern design, creating a personal sanctuary of calm.",
                },
              ].map((project, index) => (
                <div key={index} className="flex flex-col">
                  <div className="relative w-full h-[390px] overflow-hidden shadow-lg group">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:-translate-y-full"
                    />
                    <Image
                      src={project.variant}
                      alt={`${project.alt} Hover`}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover absolute top-full left-0 transition-transform duration-700 ease-in-out group-hover:-translate-y-full"
                    />
                  </div>
                  <h3 className="text-[#2d2d2d] text-[22px] font-semibold mt-4">
                    {project.title}
                  </h3>
                  <p className="text-[#555] text-[16px] mt-2 leading-relaxed">
                    {project.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="flex flex-col lg:flex-row justify-center items-center px-4 py-16 gap-8">
          <div className="py-16 max-w-lg">
            <h2 className="text-[#2d2d2d] font-['Playfair_Display'] text-[36px] sm:text-[48px] font-semibold leading-snug mb-8">
              We Don’t Just Design Rooms.<br /> We Shape Emotions.
            </h2>
            <p className="text-[#555] text-[16px] leading-relaxed">
              Your home isn’t only where you live — it’s where your story unfolds.  
              At <strong>Hayat Interior</strong>, we create environments that breathe with personality — 
              from the morning light on your kitchen tiles to the quiet comfort of your favorite chair.
            </p>
          </div>
          <div className="flex gap-6">
            <Image
              src="/Images/lay2.png"
              alt="Interior Design Aesthetic"
              height={700}
              width={300}
              className="mb-12"
            />
            <Image
              src="/Images/lay1.png"
              alt="Elegant Interior Mood"
              height={700}
              width={300}
              className="mt-12"
            />
          </div>
        </section>

        {/* Section 5 */}
        <section className="relative py-20 px-4 sm:px-8 md:px-30 flex flex-col lg:flex-row items-center justify-between gap-12 bg-[#fffefa]">
          <div className="relative flex-shrink-0">
            <Image
              src="/Images/layer1.png"
              alt="Design Layers Background"
              width={350}
              height={350}
              className="absolute top-16 mt-48 left-0 opacity-80"
            />
            <Image
              src="/Images/layer2.png"
              alt="Design Layers Foreground"
              width={350}
              height={350}
              className="relative z-10 ml-8 lg:ml-34"
            />
          </div>
          <div className="max-w-xl mt-12 lg:mt-48">
            <h2 className="text-[#2d2d2d] font-['Playfair_Display'] text-[36px] sm:text-[42px] font-semibold leading-tight mb-4">
              We Design in Layers,<br /> Not Just Layouts.
            </h2>
            <h3 className="text-[#9e7b47] text-lg font-semibold tracking-wide mb-6">
              Raw · Refined · Real
            </h3>
            <p className="text-[#555] text-[18px] leading-relaxed mb-6">
              From bare concrete to soft fabrics, sunlight to shadows — every texture, tone, and line 
              carries intention. Our spaces are built to evolve with your life and emotions.
            </p>
            <ul className="text-[#444] text-[17px] space-y-2">
              <li>✨ A home that welcomes warmth,</li>
              <li>🪴 A kitchen that inspires creativity,</li>
              <li>💭 A workspace that nurtures focus —</li>
              <li>We turn your daily experiences into timeless design.</li>
            </ul>
          </div>
        </section>

        {/* Section 6 */}
        <section className="w-full bg-[#fffefa] py-24 px-4 sm:px-10">
          <div className="max-w-[1300px] mx-auto text-center">
            <div className="flex items-center justify-center mb-12">
              <span className="w-16 h-[2px] bg-[#b88b4a] mr-4"></span>
              <h2 className="text-[#2d2d2d] font-['Playfair_Display'] text-[36px] sm:text-[42px] font-semibold">
                Our Latest Creations
              </h2>
              <span className="w-16 h-[2px] bg-[#b88b4a] ml-4"></span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  src: "/Images/project1.png",
                  alt: "Modern Loft Living Room",
                  title: "Modern Loft Living",
                  comment: "A seamless blend of contemporary form and functional design for urban lifestyles.",
                },
                {
                  src: "/Images/project2.png",
                  alt: "Dining Room Design",
                  title: "Rustic Chic Cottage",
                  comment: "A warm blend of rustic textures and modern finishes that feels effortlessly inviting.",
                },
                {
                  src: "/Images/project3.png",
                  alt: "Zen Retreat Interior",
                  title: "Zen Garden Retreat",
                  comment: "Minimalist aesthetics meet nature’s calm in this thoughtfully designed sanctuary.",
                },
                {
                  src: "/Images/project4.png",
                  alt: "Modern Apartment Design",
                  title: "Modern Loft Renovation",
                  comment: "A redefined living experience crafted with balance, symmetry, and emotion.",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl shadow-md group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl"
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    width={400}
                    height={400}
                    className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 mt-40 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                    <div className="relative bg-white text-[#2d2d2d] text-sm font-medium px-4 py-3 rounded-lg shadow-lg w-64">
                      <div className="font-semibold mb-1 text-[15px]">{card.title}</div>
                      <div>{card.comment}</div>
                      <div className="absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7 - About */}
        <section className="w-full bg-[#fffefa] py-20 relative">
          <div className="relative w-full flex justify-center items-center mt-10">
            <Image
              src="/Images/about.png"
              alt="About Hayat Interior"
              width={1510}
              height={700}
              className="w-[1510px] h-[700px] object-cover shadow-lg"
            />
            <div className="absolute bottom-[-180px] bg-white w-[1300px] flex flex-col lg:flex-row justify-between px-8 sm:px-16 py-14 shadow-lg">
              <div className="w-full lg:w-[35%] relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-[2px] bg-[#b88b4a]"></div>
                  <p className="text-[#b88b4a] font-['Urbanist'] text-xl">About Us</p>
                </div>
                <h2 className="text-[#2d2d2d] font-['Playfair_Display'] text-[36px] sm:text-[42px] font-bold leading-snug mb-10">
                  WHO WE <br /> ARE
                </h2>
              </div>
              <div className="w-full lg:w-[60%] mt-8 lg:mt-0">
                <p className="text-[#555] text-[17px] leading-relaxed mb-4">
                  At <span className="font-semibold text-[#b88b4a]">Hayat Interior</span>, we believe that design should tell a story — 
                  your story. Every space we create is an artful balance of form, function, and feeling.
                </p>
                <p className="text-[#555] text-[17px] leading-relaxed">
                  Our team of experienced designers, architects, and craftsmen bring passion and precision 
                  to every project — from cozy homes to grand villas and commercial interiors. 
                  With over 5 years of excellence, we’ve redefined interiors across Delhi NCR with elegance, warmth, and individuality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
};

export default Home;
