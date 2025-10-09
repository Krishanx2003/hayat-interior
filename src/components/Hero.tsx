import Image from "next/image"

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="relative max-w-[1300px] mx-auto px-4 sm:px-8 md:px-28 pt-16 md:pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-serif text-[34px] sm:text-[44px] md:text-[56px] leading-tight text-[var(--neutral-900)] text-balance">
              Interiors that feel
              <br />
              as good as they look.
            </h1>
            <p className="mt-4 text-[var(--neutral-700)] leading-relaxed text-[16px] md:text-[18px]">
              We craft elevated, timeless spaces that reflect who you are—layered with purpose, warmth, and enduring
              beauty.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-md bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-600)] px-5 py-3 text-white text-sm font-semibold transition"
              >
                Explore Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md border border-[var(--brand-gold)] text-[var(--brand-gold)] px-5 py-3 text-sm font-semibold hover:bg-[var(--brand-gold)] hover:text-white transition"
              >
                Get a Quote
              </a>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/Images/project2.jpg"
              alt="Hero collage featuring material palette and styled living"
              width={700}
              height={520}
              className="w-full h-auto rounded-xl shadow-md"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  )
}
