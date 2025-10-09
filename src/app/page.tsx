import Image from "next/image"
import Hero from "@/components/Hero"
import Contact from "@/components/Contact"

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />

        {/* Section 2 */}
        <section aria-labelledby="intro-heading">
          <div className="px-4 sm:px-8 md:px-28 py-20">
            <h2
              id="intro-heading"
              className="text-[var(--neutral-700)] font-serif text-[36px] sm:text-[48px] md:text-[55px] text-center font-semibold text-balance"
            >
              We Create Unique
              <br />
              Designs That Reflect You.
            </h2>

            <Image
              src="/Images/image1.jpg"
              alt="A thoughtfully designed living space with warm textures and balanced composition"
              className="mt-8 mx-auto rounded-xl shadow-md"
              width={1300}
              height={900}
              priority
            />

            <p className="text-[var(--neutral-600)] font-sans text-[18px] sm:text-[20px] md:text-[22px] mt-6 px-2 py-2 text-center leading-relaxed">
              At <strong className="text-[var(--brand-gold)]">Hayat Interior</strong>, every design begins with a
              story—yours. We blend creativity, functionality, and craftsmanship to create interiors that inspire and
              feel timeless. Our collaborative process ensures your dream space becomes a stunning reality.
            </p>
          </div>
        </section>

        {/* Section 3 - Projects */}
        <section id="projects" className="w-full py-24 bg-[var(--bg-cream)]" aria-labelledby="projects-heading">
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6">
            {/* Left Feature Project */}
            <div>
              <p className="uppercase text-[var(--brand-gold)] tracking-widest mb-4 font-semibold">
                Signature Projects
              </p>
              <h2
                id="projects-heading"
                className="text-[var(--neutral-900)] font-serif text-[32px] sm:text-[44px] md:text-[48px] font-semibold leading-snug mb-8 text-balance"
              >
                Crafting Spaces
                <br /> With Heart & Precision
              </h2>

              <div className="relative w-full h-[420px] md:h-[480px] overflow-hidden shadow-lg group rounded-xl">
                <Image
                  src="/Images/project1.jpg"
                  alt="Villa furnished interior with warm timber, soft textiles, and ambient lighting"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:-translate-y-full"
                />
                <Image
                  src="/Images/variant2.jpg"
                  alt="Alternate angle showcasing the crafted living zone"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover absolute top-full left-0 transition-transform duration-700 ease-in-out group-hover:-translate-y-full"
                />
              </div>

              <h3 className="text-[var(--neutral-900)] text-[20px] md:text-[22px] font-semibold mt-6">
                Villa Furnishing & Interior
              </h3>
              <p className="text-[var(--neutral-600)] text-[16px] mt-2 leading-relaxed">
                A luxurious transformation blending modern elegance with serene functionality. Every corner balances
                beauty and purpose, turning daily living into an art form.
              </p>

              <a
                href="#contact"
                className="inline-block mt-8 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-600)] text-white px-6 py-3 rounded-md text-sm uppercase tracking-wide transition"
                aria-label="Go to contact section"
              >
                Contact Us →
              </a>
            </div>

            {/* Right Project List */}
            <div className="flex flex-col gap-10">
              {[
                {
                  src: "/Images/project2.jpg",
                  variant: "/Images/variant3.jpg",
                  alt: "Luxury Hotel Renovation suite with ambient lighting and layered textures",
                  title: "Luxury Hotel Renovation",
                  desc: "An opulent redesign where sophistication meets comfort, redefining guest experiences with immersive spatial storytelling.",
                },
                {
                  src: "/Images/project3.jpg",
                  variant: "/Images/variant1.jpg",
                  alt: "Residence Swimming Pool with stone edges and serene landscaping",
                  title: "Residence Swimming Pool",
                  desc: "A sleek and serene pool area merging natural textures with modern design to create a personal sanctuary of calm.",
                },
              ].map((project, index) => (
                <div key={index} className="flex flex-col">
                  <div className="relative w-full h-[320px] md:h-[390px] overflow-hidden shadow-lg group rounded-xl">
                    <Image
                      src={project.src || "/placeholder.svg"}
                      alt={project.alt}
                      width={1000}
                      height={700}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:-translate-y-full"
                    />
                    <Image
                      src={project.variant || "/placeholder.svg"}
                      alt={`${project.alt} alternate angle`}
                      width={1000}
                      height={700}
                      className="w-full h-full object-cover absolute top-full left-0 transition-transform duration-700 ease-in-out group-hover:-translate-y-full"
                    />
                  </div>
                  <h3 className="text-[var(--neutral-900)] text-[20px] md:text-[22px] font-semibold mt-4">
                    {project.title}
                  </h3>
                  <p className="text-[var(--neutral-600)] text-[16px] mt-2 leading-relaxed">{project.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section
          className="flex flex-col lg:flex-row justify-center items-center px-4 py-16 gap-8"
          aria-labelledby="emotion-heading"
        >
          <div className="py-8 md:py-16 max-w-xl">
            <h2
              id="emotion-heading"
              className="text-[var(--neutral-900)] font-serif text-[32px] sm:text-[42px] md:text-[48px] font-semibold leading-snug mb-6 md:mb-8 text-balance"
            >
              We Don’t Just Design Rooms.
              <br /> We Shape Emotions.
            </h2>
            <p className="text-[var(--neutral-600)] text-[16px] leading-relaxed">
              Your home isn’t only where you live — it’s where your story unfolds. At{" "}
              <strong className="text-[var(--brand-gold)]">Hayat Interior</strong>, we create environments that breathe
              with personality — from the morning light on your kitchen tiles to the quiet comfort of your favorite
              chair.
            </p>
          </div>

          <div className="flex gap-6">
            <Image
              src="/Images/image1.jpg"
              alt="Tall room vignette with sculptural lighting"
              height={700}
              width={300}
              className="mb-12 rounded-xl shadow"
            />
            <Image
              src="/Images/variant1.jpg"
              alt="Elegant interior mood with soft textiles and oak"
              height={700}
              width={300}
              className="mt-12 rounded-xl shadow"
            />
          </div>
        </section>

        {/* Section 5 */}
        <section
          className="relative py-20 px-4 sm:px-8 md:px-28 flex flex-col lg:flex-row items-center justify-between gap-12 bg-[var(--bg-cream)]"
          aria-labelledby="layers-heading"
        >
          <div className="relative flex-shrink-0">
            <Image
              src="/Images/image2.jpg"
              alt="Architectural diagram layered shapes"
              width={350}
              height={350}
              className="absolute top-16 mt-48 left-0 opacity-80"
            />
            <Image
              src="/Images/variant2.jpg"
              alt="Material palette closeup"
              width={350}
              height={350}
              className="relative z-10 ml-8 lg:ml-24"
            />
          </div>

          <div className="max-w-xl mt-12 lg:mt-48">
            <h2
              id="layers-heading"
              className="text-[var(--neutral-900)] font-serif text-[32px] sm:text-[38px] md:text-[42px] font-semibold leading-tight mb-4 text-pretty"
            >
              We Design in Layers,
              <br /> Not Just Layouts.
            </h2>
            <h3 className="text-[var(--brand-gold)] text-base md:text-lg font-semibold tracking-wide mb-6">
              Raw · Refined · Real
            </h3>
            <p className="text-[var(--neutral-600)] text-[16px] md:text-[18px] leading-relaxed mb-6">
              From bare concrete to soft fabrics, sunlight to shadows — every texture, tone, and line carries intention.
              Our spaces are built to evolve with your life and emotions.
            </p>
            <ul className="text-[var(--neutral-700)] text-[16px] space-y-2">
              <li>A home that welcomes warmth,</li>
              <li>A kitchen that inspires creativity,</li>
              <li>A workspace that nurtures focus —</li>
              <li>We turn your daily experiences into timeless design.</li>
            </ul>
          </div>
        </section>

        {/* Section 6 - Latest */}
        <section className="w-full bg-[var(--bg-cream)] py-24 px-4 sm:px-10" aria-labelledby="latest-heading">
          <div className="max-w-[1300px] mx-auto text-center">
            <div className="flex items-center justify-center mb-10 md:mb-12">
              <span className="w-16 h-[2px] bg-[var(--brand-gold)] mr-4" />
              <h2
                id="latest-heading"
                className="text-[var(--neutral-900)] font-serif text-[32px] sm:text-[38px] md:text-[42px] font-semibold text-balance"
              >
                Our Latest Creations
              </h2>
              <span className="w-16 h-[2px] bg-[var(--brand-gold)] ml-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  src: "/Images/project1.jpg",
                  alt: "Modern Loft Living Room",
                  title: "Modern Loft Living",
                  comment: "A seamless blend of contemporary form and functional design for urban lifestyles.",
                },
                {
                  src: "/Images/project2.jpg",
                  alt: "Dining Room Design",
                  title: "Rustic Chic Cottage",
                  comment: "A warm blend of rustic textures and modern finishes that feels effortlessly inviting.",
                },
                {
                  src: "/Images/project3.jpg",
                  alt: "Zen Retreat Interior",
                  title: "Zen Garden Retreat",
                  comment: "Minimalist aesthetics meet nature’s calm in this thoughtfully designed sanctuary.",
                },
                {
                  src: "/Images/project4.jpg",
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
                    src={card.src || "/placeholder.svg"}
                    alt={card.alt}
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

        {/* Section 7 - About */}
        <section className="w-full bg-[var(--bg-cream)] py-20 relative" aria-labelledby="about-heading">
          <div className="relative w-full flex justify-center items-center mt-10">
            <Image
              src="/Images/project4.jpg"
              width={1510}
              height={700}
              className="w-[1510px] h-[300px] md:h-[700px] object-cover shadow-lg rounded-xl"
              alt="Studio showcase panoramic image"
            />
            <div className="absolute -bottom-40 md:-bottom-44 bg-white w-[92%] md:w-[1300px] flex flex-col lg:flex-row justify-between px-6 sm:px-10 md:px-16 py-10 md:py-14 shadow-lg rounded-xl">
              <div className="w-full lg:w-[35%] relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-[2px] bg-[var(--brand-gold)]" />
                  <p className="text-[var(--brand-gold)] font-sans text-lg md:text-xl">About Us</p>
                </div>
                <h2
                  id="about-heading"
                  className="text-[var(--neutral-900)] font-serif text-[32px] sm:text-[38px] md:text-[42px] font-bold leading-snug mb-8 md:mb-10"
                >
                  WHO WE
                  <br /> ARE
                </h2>
              </div>

              <div className="w-full lg:w-[60%] mt-6 lg:mt-0">
                <p className="text-[var(--neutral-600)] text-[16px] md:text-[17px] leading-relaxed mb-4">
                  At <span className="font-semibold text-[var(--brand-gold)]">Hayat Interior</span>, we believe design
                  should tell a story — your story. Every space we create balances form, function, and feeling.
                </p>
                <p className="text-[var(--neutral-600)] text-[16px] md:text-[17px] leading-relaxed">
                  Our team of experienced designers, architects, and craftsmen bring passion and precision to every
                  project — from cozy homes to grand villas and commercial interiors. With over 5 years of excellence,
                  we redefine interiors with elegance, warmth, and individuality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  )
}
